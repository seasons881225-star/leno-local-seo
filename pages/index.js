import Head from "next/head";
import { SITE } from "../data/site-content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BuildingVisual from "../components/BuildingVisual";
import StatStrip from "../components/StatStrip";
import VideoEmbed from "../components/VideoEmbed";
import CardGridSection from "../components/CardGridSection";
import ProcessSection from "../components/ProcessSection";
import CasesSection from "../components/CasesSection";
import BeforeAfterGallery from "../components/BeforeAfterGallery";
import BadExamplesSection from "../components/BadExamplesSection";
import FinalCtaSection from "../components/FinalCtaSection";

export default function Home() {
  const { hero, video, trust, principles } = SITE;

  return (
    <>
      <Head>
        <title>{SITE.brandName} | 실경력 14년 창틀누수·외벽방수 전문</title>
        <meta
          name="description"
          content="실경력 14년, 작업블로그 11년째 운영 중인 레노베이. 로프 접근 방식으로 창틀누수, 외벽방수, 실리콘 시공을 정밀 진단부터 책임 시공까지 진행합니다."
        />
      </Head>

      <Header />

      {/* ===== 히어로 ===== */}
      <section style={{ padding: "56px 0 32px" }}>
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
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "0 0 18px",
                lineHeight: 1.3,
              }}
            >
              {hero.headlineLine1}
              <br />
              <span style={{ color: "var(--signal-deep)" }}>{hero.headlineHighlight}</span>
              {hero.headlineLine2}
            </h1>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "var(--steel)",
                margin: "0 0 24px",
                maxWidth: 480,
              }}
            >
              {hero.description}
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 28px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 20px",
                maxWidth: 420,
              }}
            >
              {hero.checklist.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--ink)",
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "var(--signal-deep)", fontWeight: 800 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-signal">
                실시간 무료 견적 신청
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

      {/* ===== 유튜브 대표 영상 ===== */}
      <section id="blog" style={{ padding: "0 0 8px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="eyebrow">{video.sectionEyebrow}</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 18px" }}>
            {video.sectionTitle}
          </h2>
          <VideoEmbed videoId={video.videoId} />
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

      {/* ===== 잘못된 시공 사례 ===== */}
      <BadExamplesSection />

      {/* ===== PRINCIPLES ===== */}
      <CardGridSection data={principles} columns={4} />

      {/* ===== 최종 CTA ===== */}
      <FinalCtaSection />

      <Footer />
    </>
  );
}
