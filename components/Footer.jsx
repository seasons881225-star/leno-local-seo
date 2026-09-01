import { SITE } from "../data/site-content";

const QUICK_LINKS = [
  { emoji: "💬", label: "카카오문의", getHref: () => SITE.kakaoUrl, external: true },
  { emoji: "📞", label: "전화상담", getHref: () => `tel:${SITE.phone}`, external: false },
  { emoji: "📝", label: "블로그", getHref: () => SITE.blogUrl, external: true },
  { emoji: "▶️", label: "유튜브", getHref: () => SITE.youtubeUrl, external: true },
];

// localLine 을 넘기면 푸터 소개문이 지역 문구로 바뀝니다 (지역 페이지용).
export default function Footer({ localLine }) {
  const { business } = SITE;

  return (
    <footer style={{ background: "var(--ink)", paddingBottom: 32 }}>
      <div className="container" style={{ paddingTop: 8, paddingBottom: 32 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {QUICK_LINKS.map((q) => (
            <a
              key={q.label}
              href={q.getHref()}
              target={q.external ? "_blank" : undefined}
              rel={q.external ? "noopener noreferrer" : undefined}
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                background: "var(--ink-soft)",
                color: "var(--white)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                textDecoration: "none",
                fontSize: 11.5,
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: 20 }}>{q.emoji}</span>
              {q.label}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #1f2937",
          paddingTop: 24,
        }}
      >
        <div className="container">
          <div style={{ color: "var(--white)", fontWeight: 800, fontSize: 15.5, marginBottom: 6 }}>
            {SITE.brandName}
          </div>
          <p style={{ color: "#8b95a5", fontSize: 12.5, margin: "0 0 10px" }}>
            {localLine || SITE.footerTagline}
          </p>
          {/* ⭐ 검색로봇이 지역 페이지로 들어오는 유일한 통로입니다. 지우지 마세요. */}
          <p style={{ margin: "0 0 14px" }}>
            <a
              href="/service-area"
              style={{ color: "#8b95a5", fontSize: 12.5, textDecoration: "none" }}
            >
              서비스 지역
            </a>
          </p>
          <div style={{ color: "#6b7686", fontSize: 12, lineHeight: 1.9 }}>
            상호: {business.name} &nbsp;·&nbsp; 대표자: {business.ceo} &nbsp;·&nbsp; 사업자등록번호:{" "}
            {business.registrationNumber}
            <br />© {new Date().getFullYear()} {SITE.brandName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
