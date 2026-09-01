import Head from "next/head";
import { SITE } from "../data/site-content";
import { CITIES } from "../data/region-meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import AboutSection from "../components/AboutSection";
import VideoEmbed from "../components/VideoEmbed";
import CardGridSection from "../components/CardGridSection";
import ProcessSection from "../components/ProcessSection";
import CasesSection from "../components/CasesSection";
import BeforeAfterGallery from "../components/BeforeAfterGallery";
import FinalCtaSection from "../components/FinalCtaSection";
import BrandPhotoSection from "../components/BrandPhotoSection";
import StickyContactBar from "../components/StickyContactBar";
import WhySection from "../components/WhySection";
import BlogCasesSection, { MAIN_PHOTOS } from "../components/BlogCasesSection";
import DamageCasesSection from "../components/DamageCasesSection";

const PAGE_TITLE = `${SITE.brandName} | 빗물누수해결 누적시공 3,000건+ | 창틀누수·외벽방수 전문업체`;
const PAGE_DESC =
  "실경력 14년, 누적 현장 완료 3,000건+, 작업블로그 10년째 운영 중인 레노베이. 로프 접근 방식으로 창틀누수, 외벽방수, 실리콘 시공을 정밀 진단부터 책임 시공까지 진행합니다.";

export default function Home() {
  const { hero, video, trust, principles } = SITE;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.brandName,
    image: `${SITE.domain}/images/thumbs/9.jpg`,
    telephone: SITE.phone,
    url: SITE.domain,
    description: PAGE_DESC,
    areaServed: CITIES.map((c) => ({ "@type": "City", name: c.key })),
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        {/* 네이버·구글 검색결과, 카카오톡 링크 공유 시 썸네일로 쓰일 사진 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESC} />
        <meta property="og:image" content={`${SITE.domain}/images/thumbs/9.jpg`} />
        <meta property="og:url" content={SITE.domain} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* 구조화 데이터 (검색엔진이 업체 정보를 더 명확히 이해하도록) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
                fontSize: "clamp(32px, 4.5vw, 48px)",
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
                fontSize: 16.5,
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
                    fontSize: 14.5,
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
              {/* 클릭하면 새 창(카카오톡)이 아니라, 페이지 맨 아래 문의 섹션으로 스크롤 이동합니다. */}
              <a href="#contact" className="btn btn-signal">
                실시간 무료 견적 신청
              </a>
            </div>
          </div>

          <HeroSlider />
        </div>
      </section>

      {/* ===== Renobay solution (지역 페이지와 같은 3단 섹션) ===== */}
      <WhySection keyword="창틀누수" />

      {/* ===== ABOUT (경력·신뢰 통합 섹션) ===== */}
      <AboutSection />

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

      {/* ===== 빗물누수 피해사례 ===== */}
      <DamageCasesSection />

      {/* ===== 더 많은 시공사례 보기 (블로그 안내) ===== */}
      <BlogCasesSection title="더 많은 시공사례 보기" photos={MAIN_PHOTOS} />

      {/* ===== CASES ===== */}
      <CasesSection />

      {/* ===== 아파트 창틀 코킹 전/후 비교 ===== */}
      <BeforeAfterGallery />

      {/* ===== 잘못된 시공 사례 ===== */}

      {/* ===== PRINCIPLES ===== */}
      <CardGridSection data={principles} columns={4} />

      {/* ===== 하단 브랜드 사진 ===== */}
      <BrandPhotoSection />

      {/* ===== 최종 CTA ===== */}
      <FinalCtaSection />

      <Footer />
      <StickyContactBar />
    </>
  );
}
