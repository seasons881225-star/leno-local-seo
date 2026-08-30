"use client";
import { useState } from "react";
import { SITE } from "../data/site-content";

// ⭐ 사진만 추가/교체하려면 data/site-content.js 의 beforeAfterGallery.pairs 배열과
// public/images/before-after/ 폴더의 사진 파일을 수정하면 됩니다.
// PC는 마우스를 올리면, 모바일은 터치하면 시공 전 → 후 사진으로 부드럽게 바뀝니다.

function SwapImage({ before, after }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
      onClick={() => setShowAfter((v) => !v)}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <img
        src={before}
        alt="시공 전"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <img
        src={after}
        alt="시공 후"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: showAfter ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          background: "rgba(11,18,32,0.55)",
          padding: "4px 10px",
          borderRadius: 999,
          transition: "opacity 0.3s ease",
          opacity: showAfter ? 0 : 1,
        }}
      >
        마우스를 올려보세요
      </span>
    </div>
  );
}

export default function BeforeAfterGallery() {
  const { eyebrow, title, pairs } = SITE.beforeAfterGallery;

  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 22px" }}>{title}</h2>

        <div
          className="cases-grid-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {pairs.map((pair, i) => (
            <SwapImage key={i} before={pair.before} after={pair.after} />
          ))}
        </div>
      </div>
    </section>
  );
}
