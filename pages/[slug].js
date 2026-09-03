// ⭐⭐ 이 파일 하나가 아래 4종류 페이지를 전부 만듭니다 ⭐⭐
//
//  1) /일동                → 일동 지역 허브 (그 지역의 16개 시공 전부 링크)
//  2) /안산시  /단원구      → 시·구 허브
//  3) /일동-창틀누수        → 지역 + 서비스 랜딩페이지
//  4) /안산시-창틀누수      → 시·구 + 서비스 랜딩페이지
//
// 문구를 바꾸고 싶으면 data/ 폴더의 파일들을 고치면 됩니다.
//   지역 목록      → data/regions.js
//   서비스 문구    → data/services.js
//   FAQ            → data/faq-sets.js
//   시공사례       → data/cases.js
//   공용 문구      → data/site-content.js

import Head from "next/head";
import { REGIONS } from "../data/regions";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site-content";
import { AREAS, AREA_KEYS, REGION_TO_AREA } from "../data/region-meta";
import { getFaqs } from "../data/faq-sets";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BuildingVisual from "../components/BuildingVisual";
import AboutSection from "../components/AboutSection";
import CardGridSection from "../components/CardGridSection";
import ProcessSection from "../components/ProcessSection";
import CasesSection from "../components/CasesSection";
import BeforeAfterGallery from "../components/BeforeAfterGallery";
import FinalCtaSection from "../components/FinalCtaSection";
import BrandPhotoSection from "../components/BrandPhotoSection";
import StickyContactBar from "../components/StickyContactBar";
import WhySection from "../components/WhySection";
import FaqSection from "../components/FaqSection";
import BlogCasesSection, { WATERPROOF_PHOTOS } from "../components/BlogCasesSection";
import DamageCasesSection from "../components/DamageCasesSection";

const SERVICE_KEYS = Object.keys(SERVICES);
const AREA_BY_KEY = Object.fromEntries(AREAS.map((a) => [a.key, a]));

// 지역명은 긴 것부터 확인해야 "역곡동"이 "역곡1동"을 잘못 가로채지 않습니다.
const PLACE_KEYS_BY_LENGTH = [...REGIONS, ...AREA_KEYS].sort((a, b) => b.length - a.length);

function hashPick(str, arr) {
  let sum = 0;
  for (const ch of str) sum += ch.charCodeAt(0);
  return arr[sum % arr.length];
}

// "선부동창틀누수"처럼 하이픈 없이 들어와도 올바른 주소로 넘겨줍니다.
function matchWithoutDash(slug) {
  for (const place of PLACE_KEYS_BY_LENGTH) {
    if (slug.startsWith(place)) {
      const rest = slug.slice(place.length);
      if (SERVICES[rest]) return { place, serviceKey: rest };
    }
  }
  return null;
}

export async function getStaticPaths() {
  const paths = [];
  for (const region of REGIONS) {
    paths.push({ params: { slug: region } }); // 지역 허브
    for (const key of SERVICE_KEYS) {
      paths.push({ params: { slug: `${region}-${key}` } });
    }
  }
  for (const area of AREAS) {
    paths.push({ params: { slug: area.key } }); // 시·구 허브
    for (const key of SERVICE_KEYS) {
      paths.push({ params: { slug: `${area.key}-${key}` } });
    }
  }
  return { paths, fallback: "blocking" };
}

// 화면에 보여줄 "장소" 정보를 정리해서 돌려줍니다.
function buildPlace(name) {
  if (AREA_BY_KEY[name]) {
    const a = AREA_BY_KEY[name];
    return {
      name,
      kind: a.type, // "city" | "district"
      label: a.label, // 예: "안산시 단원구"
      parentKey: a.type === "district" ? a.cityKey : null,
      childRegions: a.regions,
    };
  }
  const meta = REGION_TO_AREA[name] || {};
  return {
    name,
    kind: "region",
    label: [meta.city, meta.district, name].filter(Boolean).join(" "),
    cityKey: meta.city || null,
    districtKey: meta.district || null,
    childRegions: [],
  };
}

export async function getStaticProps({ params }) {
  const slug = decodeURIComponent(params.slug || "").replace(/\s+/g, "");

  // ── 1) 허브 페이지 (지역명 또는 시/구명만 들어온 경우)
  if (REGIONS.includes(slug) || AREA_KEYS.includes(slug)) {
    const place = buildPlace(slug);
    return {
      props: {
        pageType: "hub",
        place,
        services: SERVICE_KEYS.map((key) => ({
          key,
          keyword: SERVICES[key].keyword || key,
          label: SERVICES[key].label,
        })),
      },
      revalidate: 3600,
    };
  }

  // ── 2) 랜딩페이지 (지역-서비스)
  const dashIndex = slug.indexOf("-");
  let placeName = null;
  let serviceKey = null;

  if (dashIndex !== -1) {
    const p = slug.slice(0, dashIndex);
    const s = slug.slice(dashIndex + 1);
    if ((REGIONS.includes(p) || AREA_KEYS.includes(p)) && SERVICES[s]) {
      placeName = p;
      serviceKey = s;
    }
  }

  if (!placeName) {
    const matched = matchWithoutDash(slug);
    if (matched) {
      return {
        redirect: {
          destination: encodeURI(`/${matched.place}-${matched.serviceKey}`),
          permanent: true,
        },
      };
    }
    return { notFound: true };
  }

  const service = SERVICES[serviceKey];
  const place = buildPlace(placeName);
  const keyword = service.keyword || serviceKey;
  const heading = hashPick(placeName, service.headings)(placeName);
  const intro = hashPick(placeName + "_intro", service.intros)(placeName);
  const bullets = service.bullets.map((b) => b(placeName));

  // ⭐ 핵심 변경: 예전에는 "다른 지역의 같은 서비스"를 링크했는데,
  // 그 구조 때문에 검색로봇이 창틀누수 페이지들만 옆으로 돌아다니고
  // 나머지 서비스는 발견조차 못 했습니다. 이제는 "같은 지역의 다른 시공"을
  // 전부 링크해서, 지역 하나가 발견되면 16개 서비스가 함께 발견되도록 합니다.
  return {
    props: {
      pageType: "landing",
      place,
      serviceKey,
      keyword,
      serviceLabel: service.label,
      ogImage: service.ogImage || "/images/hero-main.jpg",
      heading,
      intro,
      bullets,
      faqs: getFaqs(serviceKey, placeName, keyword),
      noSuffix: !!service.noSuffix,
      isWaterproof: !!service.isWaterproof,
    },
    revalidate: 3600,
  };
}

/* ────────────────────────── 허브 페이지 ────────────────────────── */

function HubPage({ place, services }) {
  const title = `${place.name} 창틀누수·외벽방수 전문업체 | ${SITE.brandName}`;
  const description = `${place.name} 지역에서 가능한 시공 목록입니다. ${place.name} 창틀누수, 외벽누수, 옥상방수, 창틀코킹 등 원하시는 항목을 선택해 자세한 안내를 확인해 보세요.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "서비스 지역", item: `${SITE.domain}/service-area` },
      { "@type": "ListItem", position: 3, name: place.name },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE.domain}/images/thumbs/9.jpg`} />
        <meta property="og:url" content={`${SITE.domain}/${encodeURIComponent(place.name)}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Header />

      <section style={{ padding: "48px 0 32px" }}>
        <div className="container">
          <div className="eyebrow">
            <a href="/service-area" style={{ color: "inherit", textDecoration: "none" }}>
              서비스 지역
            </a>
            {place.label !== place.name ? ` · ${place.label}` : ""}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "0 0 10px",
            }}
          >
            {`${place.name} 시공 안내`}
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--steel)",
              margin: "0 0 8px",
              maxWidth: 640,
            }}
          >
            {`${place.name} 지역으로 출장 가능합니다. 아래에서 필요한 항목을 선택하시면 ${place.name} 지역 기준의 자세한 시공 안내를 확인하실 수 있습니다.`}
          </p>
        </div>
      </section>

      {/* ⭐ 검색결과 썸네일용 대표 사진.
          네이버는 og:image 보다 본문의 첫 이미지를 쓰는 경우가 많아서,
          허브 페이지에도 사진이 한 장은 있어야 검색결과에 썸네일이 붙습니다. */}
      <section style={{ padding: "0 0 36px" }}>
        <div className="container">
          <img
            src="/images/thumbs/9.jpg"
            alt={`${place.name} 창틀누수·외벽방수 시공 현장 - 레노베이`}
            style={{
              width: "100%",
              maxWidth: 760,
              height: "auto",
              aspectRatio: "16 / 10",
              objectFit: "cover",
              borderRadius: 16,
              display: "block",
            }}
          />
        </div>
      </section>

      <section style={{ padding: "0 0 44px" }}>
        <div className="container">
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 16px" }}>
            {`${place.name}에서 가능한 시공`}
          </h2>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            {services.map((s) => (
              <a
                key={s.key}
                href={`/${encodeURIComponent(place.name)}-${encodeURIComponent(s.key)}`}
                style={{
                  display: "block",
                  background: "var(--white)",
                  border: "1px solid var(--paper-line)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  textDecoration: "none",
                  color: "var(--ink)",
                  fontSize: 14.5,
                  fontWeight: 700,
                }}
              >
                {`${place.name} ${s.keyword}`}
                <span style={{ color: "var(--signal-deep)" }}> →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {place.childRegions && place.childRegions.length > 0 && (
        <section style={{ padding: "0 0 44px" }}>
          <div className="container">
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 16px" }}>
              {`${place.name} 세부 지역`}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {place.childRegions.map((r) => (
                <a
                  key={r}
                  href={`/${encodeURIComponent(r)}`}
                  style={{
                    display: "inline-block",
                    background: "var(--white)",
                    border: "1px solid var(--paper-line)",
                    borderRadius: 999,
                    padding: "8px 15px",
                    textDecoration: "none",
                    color: "var(--steel)",
                    fontSize: 13.5,
                  }}
                >
                  {r}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <AboutSection />
      <ProcessSection />
      <BrandPhotoSection place={place.name} keyword="창틀누수" />

      <FinalCtaSection
        title={`${place.name} 빗물누수 상담`}
        subtitle={`${place.name} 현장 사진이나 의심부위 사진을 보내주시면 소견과 예상 견적을 안내드리겠습니다.`}
      />
      <Footer
        localLine={`레노베이는 ${place.name} 지역의 창틀누수·외벽방수·코킹 시공을 진행하는 로프 접근 전문업체입니다.`}
      />
      <StickyContactBar />
    </>
  );
}

/* ────────────────────────── 랜딩페이지 ────────────────────────── */

function LandingPage({
  place,
  serviceKey,
  keyword,
  serviceLabel,
  ogImage,
  heading,
  intro,
  bullets,
  faqs,
  noSuffix,
  isWaterproof,
}) {
  const region = place.name;
  const metaDescription = noSuffix ? `${region} ${keyword}. ${intro}` : `${region} ${keyword} 전문시공. ${intro}`;
  // ⚠️ <title> 안에는 반드시 "하나의 문자열"만 넣어야 합니다.
  // 여러 조각으로 나눠 넣으면 검색결과 제목에 이상한 기호가 섞여 나옵니다.
  const pageTitle = noSuffix
    ? `${region} ${keyword} | ${SITE.brandName}`
    : `${region} ${keyword} 전문시공 | ${SITE.brandName}`;
  const subHeading = noSuffix
    ? `${region} ${keyword} 레노베이 · 출장시공 전문`
    : `${region} ${keyword} 출장시공 전문업체 레노베이`;
  const { trust, principles } = SITE;

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "홈", item: SITE.domain },
    { "@type": "ListItem", position: 2, name: "서비스 지역", item: `${SITE.domain}/service-area` },
  ];
  if (place.cityKey) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: breadcrumbItems.length + 1,
      name: place.cityKey,
      item: `${SITE.domain}/${encodeURIComponent(place.cityKey)}`,
    });
  }
  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: region,
    item: `${SITE.domain}/${encodeURIComponent(region)}`,
  });
  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: `${region} ${keyword}`,
  });

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: noSuffix ? `${region} ${keyword}` : `${region} ${keyword} 전문시공`,
      serviceType: serviceLabel,
      description: metaDescription,
      areaServed: { "@type": "Place", name: place.label || region },
      provider: {
        "@type": "LocalBusiness",
        name: SITE.brandName,
        telephone: SITE.phone,
        url: SITE.domain,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
  ];

  if (faqs && faqs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={`${SITE.domain}/${encodeURIComponent(region)}-${encodeURIComponent(serviceKey)}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${SITE.domain}${ogImage}`} />
        <meta
          property="og:url"
          content={`${SITE.domain}/${encodeURIComponent(region)}-${encodeURIComponent(serviceKey)}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        {schemas.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </Head>

      <Header />

      <section style={{ padding: "56px 0 40px" }}>
        <div
          className="container hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div className="eyebrow">{region} 출장 가능 지역</div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4.2vw, 46px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "0 0 6px",
                lineHeight: 1.2,
              }}
            >
              {heading}
            </h1>
            <h2
              style={{
                fontSize: "clamp(17px, 2vw, 20px)",
                fontWeight: 700,
                color: "var(--signal-deep)",
                margin: "0 0 22px",
              }}
            >
              {subHeading}
            </h2>
            <p
              style={{
                fontSize: 16.5,
                lineHeight: 1.75,
                color: "var(--steel)",
                margin: "0 0 28px",
                maxWidth: 480,
              }}
            >
              {intro}
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 32px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 20px",
                maxWidth: 480,
              }}
            >
              {bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14.5,
                    color: "var(--ink)",
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "var(--signal-deep)", fontWeight: 800 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href={SITE.kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-signal"
              >
                💬 카카오톡으로 문의
              </a>
              <a href={`tel:${SITE.phone}`} className="btn btn-ghost">
                📞 {SITE.phone}
              </a>
            </div>
          </div>

          <BuildingVisual src={ogImage} alt={`${region} ${keyword} 시공 현장`} />
        </div>
      </section>

      <WhySection place={region} keyword={keyword} isWaterproof={isWaterproof} />

      <AboutSection />

      <CardGridSection data={trust} columns={3} />

      <ProcessSection />

      <FaqSection place={region} keyword={keyword} faqs={faqs} />

      <BlogCasesSection
        place={region}
        keyword={keyword}
        photos={isWaterproof ? WATERPROOF_PHOTOS : undefined}
      />

      <DamageCasesSection place={region} />

      <CasesSection place={region} />

      {isWaterproof ? null : <BeforeAfterGallery place={region} />}

      <CardGridSection data={principles} columns={4} />

      <BrandPhotoSection place={region} keyword={keyword} />

      <FinalCtaSection
        title={`${region} ${keyword} 실시간 상담`}
        subtitle={`${region} 현장 사진이나 의심부위 사진을 보내주시면 소견 및 작업방식 제안, 예상되는 견적을 안내드리겠습니다.`}
      />
      <Footer
        localLine={`레노베이는 ${region} ${keyword} 문제를 근본 원인부터 해결하는 코킹·방수 전문업체입니다. 로프 접근 방식으로 비계 없이 시공합니다.`}
      />
      <StickyContactBar />
    </>
  );
}

export default function SlugPage(props) {
  if (props.pageType === "hub") return <HubPage {...props} />;
  return <LandingPage {...props} />;
}
