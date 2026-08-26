import Head from "next/head";
import { REGIONS } from "../data/regions";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site-content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BuildingVisual from "../components/BuildingVisual";
import ProcessSection from "../components/ProcessSection";
import FinalCtaSection from "../components/FinalCtaSection";

function hashPick(str, arr) {
  let sum = 0;
  for (const ch of str) sum += ch.charCodeAt(0);
  return arr[sum % arr.length];
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
  if (dashIndex === -1) return { notFound: true };

  const region = slug.slice(0, dashIndex);
  const serviceKey = slug.slice(dashIndex + 1);

  if (!REGIONS.includes(region) || !SERVICES[serviceKey]) {
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

      <ProcessSection />
      <FinalCtaSection />
      <Footer />
    </>
  );
}
