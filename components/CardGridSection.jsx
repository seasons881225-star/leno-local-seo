// TRUST / PRINCIPLES 처럼 "아이콘 + 제목 + 설명" 카드가 여러 개 나열되는
// 섹션에 공용으로 쓰는 컴포넌트입니다.

export default function CardGridSection({ data, columns = 3 }) {
  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{data.eyebrow}</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>{data.title}</h2>
        <p style={{ color: "var(--steel)", fontSize: 15, margin: "0 0 28px" }}>
          {data.description}
        </p>

        <div
          className="card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 16,
          }}
        >
          {data.cards.map((c, i) => (
            <div
              key={i}
              style={{
                background: "var(--white)",
                border: "1px solid var(--paper-line)",
                borderRadius: "var(--radius)",
                padding: 24,
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px" }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--steel)", lineHeight: 1.65, margin: 0 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
