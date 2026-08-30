import { SITE } from "../data/site-content";

// 헬로클린데이의 "회사소개 + 통계 3박스" 구조를 오마주했습니다.
// 아이콘 없이 라벨 + 큰 숫자만 깔끔하게 배치합니다.

export default function AboutSection() {
  const { eyebrow, titleLine1, titleHighlight, titleLine2, description, statBoxes } = SITE.about;

  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container" style={{ maxWidth: 760, textAlign: "center", margin: "0 auto" }}>
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          {eyebrow}
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(21px, 3.2vw, 30px)", fontWeight: 700, lineHeight: 1.45, margin: "0 0 20px" }}>
          {titleLine1}
          <br />
          <span style={{ color: "var(--signal-deep)" }}>{titleHighlight}</span>
          {titleLine2}
        </h2>
        <p style={{ color: "var(--steel)", fontSize: 15.5, lineHeight: 1.75, margin: "0 auto 36px", maxWidth: 620 }}>
          {description}
        </p>

        <div
          className="stat-strip"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${statBoxes.length}, 1fr)`,
            gap: 12,
            textAlign: "center",
          }}
        >
          {statBoxes.map((s, i) => (
            <div
              key={i}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--paper-line)",
                borderRadius: "var(--radius)",
                padding: "24px 14px",
                boxShadow: "0 2px 10px rgba(11,18,32,0.04)",
              }}
            >
              <div style={{ fontSize: 13.5, color: "var(--steel)", whiteSpace: "pre-line", marginBottom: 10, lineHeight: 1.4 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(27px, 3.4vw, 34px)", fontWeight: 700, color: "var(--signal-deep)" }}>
                {s.value}
              </div>
              {s.sub && (
                <div style={{ fontSize: 11.5, color: "var(--steel-soft)", marginTop: 6 }}>{s.sub}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
