import { SITE } from "../data/site-content";

// ⭐ 사례를 추가/수정하려면 data/site-content.js 의 cases.items 배열을 수정하세요.
// 사진은 public/images/cases/ 폴더에 넣고, 파일명을 items 안의 image 경로와 맞추면 됩니다.

export default function CasesSection() {
  const { eyebrow, title, description, items } = SITE.cases;

  return (
    <section id="cases" style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, margin: "0 0 10px" }}>{title}</h2>
        <p style={{ color: "var(--steel)", fontSize: 15.5, margin: "0 0 26px" }}>{description}</p>

        <div
          className="cases-grid-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "var(--white)",
                border: "1px solid var(--paper-line)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: "12px 14px" }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                {item.postUrl && (
                  <a
                    href={item.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--signal-deep)",
                      textDecoration: "none",
                    }}
                  >
                    블로그에서 보기 →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
