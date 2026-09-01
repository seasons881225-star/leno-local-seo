// ⭐⭐ 검색로봇이 373개 지역 페이지로 들어오는 "정문" 역할을 하는 페이지입니다 ⭐⭐
//
// 예전에는 지역 목록이 사이트 어디에도 없어서, 검색엔진이 사이트맵만 보고
// 페이지를 찾아야 했습니다. 그래서 대부분의 페이지가 발견되지 못했습니다.
// 이 페이지가 모든 시/구/동을 링크하기 때문에, 로봇이 여기서부터 타고 들어갑니다.
//
// ⚠️ 이 페이지는 지우면 안 됩니다. 지우면 다시 예전 상태로 돌아갑니다.

import Head from "next/head";
import { SITE } from "../data/site-content";
import { CITIES } from "../data/region-meta";
import { SERVICES } from "../data/services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FinalCtaSection from "../components/FinalCtaSection";
import StickyContactBar from "../components/StickyContactBar";

const SERVICE_KEYS = Object.keys(SERVICES);

function RegionChips({ regions }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {regions.map((r) => (
        <a
          key={r}
          href={`/${encodeURIComponent(r)}`}
          style={{
            display: "inline-block",
            background: "var(--white)",
            border: "1px solid var(--paper-line)",
            borderRadius: 999,
            padding: "7px 14px",
            textDecoration: "none",
            color: "var(--steel)",
            fontSize: 13.5,
          }}
        >
          {r}
        </a>
      ))}
    </div>
  );
}

export default function ServiceArea() {
  const title = `서비스 지역 전체보기 | 창틀누수·외벽방수 ${SITE.brandName}`;
  const description =
    "레노베이는 경기 남부 14개 시 373개 지역별로 창틀누수, 외벽누수, 옥상방수, 창틀코킹 안내 페이지를 운영하고 있습니다. 원하시는 지역을 선택해 자세한 시공 안내를 확인해 보세요.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "서비스 지역 전체보기" },
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
        <meta property="og:url" content={`${SITE.domain}/service-area`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${SITE.domain}/service-area`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Header />

      <section style={{ padding: "48px 0 28px" }}>
        <div className="container">
          <div className="eyebrow">SERVICE AREA</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}
          >
            서비스 지역 전체보기
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--steel)",
              margin: 0,
              maxWidth: 680,
            }}
          >
            레노베이는 지역별로 창틀누수, 외벽누수, 옥상방수, 창틀코킹 등 시공 안내
            페이지를 운영하고 있습니다. 아래에서 지역을 선택하시면 해당 지역 기준의
            자세한 안내를 확인하실 수 있습니다. 목록에 없는 지역도 문의는 가능합니다.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 36px" }}>
        <div className="container">
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 14px" }}>
            시 단위로 보기
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CITIES.map((c) => (
              <a
                key={c.key}
                href={`/${encodeURIComponent(c.key)}`}
                style={{
                  display: "inline-block",
                  background: "var(--signal-deep)",
                  borderRadius: 999,
                  padding: "9px 18px",
                  textDecoration: "none",
                  color: "var(--white)",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {c.key}
              </a>
            ))}
          </div>
        </div>
      </section>

      {CITIES.map((city) => (
        <section key={city.key} style={{ padding: "0 0 34px" }}>
          <div className="container">
            <h2
              style={{
                fontSize: 19,
                fontWeight: 800,
                margin: "0 0 6px",
                letterSpacing: "-0.01em",
              }}
            >
              <a
                href={`/${encodeURIComponent(city.key)}`}
                style={{ color: "var(--ink)", textDecoration: "none" }}
              >
                {city.key}
              </a>
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--steel)", margin: "0 0 14px" }}>
              {city.key} 창틀누수 · 외벽누수 · 옥상방수 · 창틀코킹 시공 가능 지역입니다.
            </p>

            {city.districts ? (
              city.districts.map((d) => (
                <div key={d.key} style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 10px" }}>
                    <a
                      href={`/${encodeURIComponent(d.key)}`}
                      style={{ color: "var(--signal-deep)", textDecoration: "none" }}
                    >
                      {city.key} {d.key} →
                    </a>
                  </h3>
                  <RegionChips regions={d.regions} />
                </div>
              ))
            ) : (
              <RegionChips regions={city.regions} />
            )}
          </div>
        </section>
      ))}

      <section style={{ padding: "8px 0 44px" }}>
        <div className="container">
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 14px" }}>
            시공 항목별로 보기
          </h2>
          <div
            className="hero-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}
          >
            {SERVICE_KEYS.map((key) => (
              <a
                key={key}
                href={`/안산시-${encodeURIComponent(key)}`}
                style={{
                  display: "block",
                  background: "var(--white)",
                  border: "1px solid var(--paper-line)",
                  borderRadius: 10,
                  padding: "13px 15px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--steel)",
                  textDecoration: "none",
                }}
              >
                {SERVICES[key].keyword || key} →
              </a>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
      <StickyContactBar />
    </>
  );
}
