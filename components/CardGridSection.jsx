// TRUST / PRINCIPLES 처럼 "아이콘 + 제목 + 설명" 카드가 여러 개 나열되는
// 섹션에 공용으로 쓰는 컴포넌트입니다.

import Icon from "./Icon";

export default function CardGridSection({ data, columns = 3 }) {
  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{data.eyebrow}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, margin: "0 0 10px" }}>{data.title}</h2>
        <p style={{ color: "var(--steel)", fontSize: 15.5, margin: "0 0 28px" }}>
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
                boxShadow: "0 2px 10px rgba(11,18,32,0.04)",
              }}
            >
              <div style={{ marginBottom: 14 }}>
                <Icon name={c.icon} />
              </div>
              <h3 style={{ fontSize: 16.5, fontWeight: 800, margin: "0 0 8px" }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "var(--steel)", lineHeight: 1.65, margin: 0 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
