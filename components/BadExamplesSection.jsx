import { SITE } from "../data/site-content";

// ⭐ 사진을 추가/수정하려면 data/site-content.js 의 badExamples.images 배열을 수정하세요.
// public/images/bad-examples/ 폴더에 넣으면 됩니다. 설명 문구는 이미지 안에 포함되어 있습니다.

export default function BadExamplesSection() {
  const { eyebrow, title, description, images } = SITE.badExamples;

  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>{title}</h2>
        <p style={{ color: "var(--steel)", fontSize: 15, margin: "0 0 26px" }}>{description}</p>

        <div
          className="card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 18,
            maxWidth: 760,
          }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="잘못된 시공 사례"
              style={{
                width: "100%",
                borderRadius: "var(--radius)",
                border: "1px solid var(--paper-line)",
                display: "block",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
