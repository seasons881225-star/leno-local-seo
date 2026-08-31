import Head from "next/head";
import { REGIONS } from "../data/regions";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site-content";
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

const SERVICE_KEYS = Object.keys(SERVICES);

function hashPick(str, arr) {
  let sum = 0;
  for (const ch of str) sum += ch.charCodeAt(0);
  return arr[sum % arr.length];
}

// 지역명은 길이가 긴 것부터 확인해야 "역곡동"이 "역곡1동"을 잘못 가로채지 않습니다.
const REGIONS_BY_LENGTH = [...REGIONS].sort((a, b) => b.length - a.length);

// "선부동창틀누수"처럼 하이픈 없이 들어와도, 앞부분이 지역명이고 뒷부분이
// 서비스명인 조합을 찾아냅니다.
function matchWithoutDash(slug) {
  for (const region of REGIONS_BY_LENGTH) {
    if (slug.startsWith(region)) {
      const rest = slug.slice(region.length);
      if (SERVICES[rest]) {
        return { region, serviceKey: rest };
      }
    }
  }
  return null;
}

export async function getStaticPaths() {
  const paths = [];
  for (const region of REGIONS) {
    for (const key of Object.keys(SERVICES)) {
      paths.push({ params: { slug: `${region}-${key}` } });
    }
  }
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slug = (params.slug || "").replace(/\s+/g, "");
  const dashIndex = slug.indexOf("-");

  let region = null;
  let serviceKey = null;

  if (dashIndex !== -1) {
    const r = slug.slice(0, dashIndex);
    const s = slug.slice(dashIndex + 1);
    if (REGIONS.includes(r) && SERVICES[s]) {
      region = r;
      serviceKey = s;
    }
  }

  if (!region) {
    const matched = matchWithoutDash(slug);
    if (matched) {
      return {
        redirect: {
          destination: encodeURI(`/${matched.region}-${matched.serviceKey}`),
          permanent: true,
        },
      };
    }
    return { notFound: true };
  }

  const service = SERVICES[serviceKey];
  const heading = hashPick(region, service.headings)(region);
  const intro = hashPick(region + "_intro", service.intros)(region);
  const bullets = service.bullets.map((b) => b(region));

  const svcIndex = SERVICE_KEYS.indexOf(serviceKey);
  const relatedServices = [1, 2, 3, 4].map((offset) => {
    const key = SERVICE_KEYS[(svcIndex + offset) % SERVICE_KEYS.length];
    return { key, label: SERVICES[key].label };
  });

  const regionIndex = REGIONS.indexOf(region);
  const relatedRegions = [1, 2, 3, 4].map((offset) => {
    return REGIONS[(regionIndex + offset) % REGIONS.length];
  });

  return {
    props: {
      region,
      serviceKey,
      serviceLabel: service.label,
      ogImage: service.ogImage || "/images/hero-main.jpg",
      heading,
      intro,
      bullets,
      relatedServices,
      relatedRegions,
    },
    revalidate: 3600,
  };
}

export default function LocalLandingPage({
  region,
  serviceKey,
  serviceLabel,
  ogImage,
  heading,
  intro,
  bullets,
  relatedServices,
  relatedRegions,
}) {
  const metaDescription = `${region} ${serviceLabel}. ${intro}`;
  const { trust, principles } = SITE;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceLabel,
    description: metaDescription,
    areaServed: { "@type": "Place", name: region },
    provider: {
      "@type": "LocalBusiness",
      name: SITE.brandName,
      telephone: SITE.phone,
    },
  };

  return (
    <>
      <Head>
        <title>{heading} | {SITE.brandName}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${heading} | ${SITE.brandName}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${SITE.domain}${ogImage}`} />
        <meta property="og:url" content={`${SITE.domain}/${region}-${serviceKey}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
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
                fontSize: "clamp(34px, 4.5vw, 50px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "0 0 6px",
                lineHeight: 1.2,
              }}
            >
              {region}
            </h1>
            <h2
              style={{
                fontSize: "clamp(18px, 2vw, 22px)",
                fontWeight: 700,
                color: "var(--signal-deep)",
                margin: "0 0 22px",
              }}
            >
              {serviceLabel}
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
              <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-signal">
                💬 카카오톡으로 문의
              </a>
              <a href={`tel:${SITE.phone}`} className="btn btn-ghost">
                📞 {SITE.phone}
              </a>
            </div>
          </div>

          <BuildingVisual />
        </div>
      </section>

      <AboutSection />

      <CardGridSection data={trust} columns={3} />

      <ProcessSection />

      <CasesSection />

      <BeforeAfterGallery />

      <CardGridSection data={principles} columns={4} />

      <BrandPhotoSection />

      <section style={{ padding: "8px 0 40px" }}>
        <div className="container">
          <div className="eyebrow">관련 페이지</div>
          <div
            className="hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            <div>
              <h3 style={{ fontSize: 15.5, fontWeight: 800, margin: "0 0 12px" }}>
                {region}의 다른 시공
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {relatedServices.map((s) => (
                  <li key={s.key} style={{ marginBottom: 8 }}>
                    <a
                      href={`/${region}-${s.key}`}
                      style={{ fontSize: 14, color: "var(--steel)", textDecoration: "none" }}
                    >
                      {region} {s.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 15.5, fontWeight: 800, margin: "0 0 12px" }}>
                다른 지역의 {serviceLabel}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {relatedRegions.map((r) => (
                  <li key={r} style={{ marginBottom: 8 }}>
                    <a
                      href={`/${r}-${serviceKey}`}
                      style={{ fontSize: 14, color: "var(--steel)", textDecoration: "none" }}
                    >
                      {r} {serviceLabel} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
      <StickyContactBar />
    </>
  );
}
