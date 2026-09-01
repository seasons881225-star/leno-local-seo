// ⭐ 지역 페이지의 "자주 묻는 질문" 섹션입니다.
// 질문/답변 문구는 data/faq-sets.js 에서 수정하세요.

export default function FaqSection({ place, keyword, faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <section style={{ padding: "8px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">Q&A</div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(21px, 2.8vw, 28px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
          }}
        >
          {`${place} ${keyword} 자주 묻는 질문`}
        </h2>
        <p style={{ color: "var(--steel)", fontSize: 14.5, margin: "0 0 24px" }}>
          {`${place} 지역 고객님들이 가장 많이 물어보시는 내용을 정리했습니다.`}
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          {faqs.map((f, i) => (
            <div
              key={i}
              style={{
                background: "var(--white)",
                border: "1px solid var(--paper-line)",
                borderRadius: 14,
                padding: "22px 24px",
              }}
            >
              <h3
                style={{
                  fontSize: 15.5,
                  fontWeight: 800,
                  margin: "0 0 10px",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "var(--signal-deep)" }}>Q</span>
                {f.q}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.8,
                  color: "var(--steel)",
                  margin: 0,
                  paddingLeft: 24,
                }}
              >
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
