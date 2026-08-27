import Head from "next/head";
import { REGIONS } from "../data/regions";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site-content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BuildingVisual from "../components/BuildingVisual";
import StatStrip from "../components/StatStrip";
import CardGridSection from "../components/CardGridSection";
import ProcessSection from "../components/ProcessSection";
import CasesSection from "../components/CasesSection";
import BeforeAfterGallery from "../components/BeforeAfterGallery";
import FinalCtaSection from "../components/FinalCtaSection";

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
  const slug = params.slug || "";
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

  // 하이픈 조합으로 못 찾았다면, 하이픈 없는 형태(예: 선부동창틀누수)로도 시도합니다.
  if (!region) {
    const matched = matchWithoutDash(slug);
    if (matched) {
      // 정식 주소(하이픈 있는 형태)로 영구 이동시켜서 페이지가 두 개로
      // 나뉘어 보이지 않게 합니다 (검색엔진 중복 콘텐츠 방지).
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

  return {
    props: { region, serviceLabel: service.label, heading, intro, bullets },
    revalidate: 3600,
  };
}

export default function LocalLandingPage({ region, serviceLabel, heading, intro, bullets }) {
  const metaDescription = `${region} ${serviceLabel}. ${intro}`;
  const { trust, principles } = SITE;

  return (
    <>
      <Head>
        <title>{heading} | {SITE.brandName}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      {/* ===== 히어로 ===== */}
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
                fontSize: "clamp(30px, 4vw, 44px)",
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
                fontSize: 16,
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
                    fontSize: 14,
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

      {/* ===== 신뢰도 스탯바 ===== */}
      <section style={{ padding: "8px 0 40px" }}>
        <div className="container">
          <StatStrip />
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <CardGridSection data={trust} columns={3} />

      {/* ===== PROCESS ===== */}
      <ProcessSection />

      {/* ===== CASES ===== */}
      <CasesSection />

      {/* ===== 아파트 창틀 코킹 전/후 비교 ===== */}
      <BeforeAfterGallery />

      {/* ===== PRINCIPLES ===== */}
      <CardGridSection data={principles} columns={4} />

      {/* ===== 최종 CTA ===== */}
      <FinalCtaSection />
      <Footer />
    </>
  );
}
