import { SITE } from "../data/site-content";

// ⭐ 사진만 추가/교체하려면 data/site-content.js 의 beforeAfterGallery.pairs 배열과
// public/images/before-after/ 폴더의 사진 파일을 수정하면 됩니다. (문구 없이 사진만 비교)

export default function BeforeAfterGallery() {
  const { eyebrow, title, pairs } = SITE.beforeAfterGallery;

  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 22px" }}>{title}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {pairs.map((pair, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              <img
                src={pair.before}
                alt="시공 전"
                style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
              />
              <img
                src={pair.after}
                alt="시공 후"
                style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
