"use client";
import { useState } from "react";
import { SITE } from "../data/site-content";

// ⭐ 사진을 추가/수정하려면 data/site-content.js 의 badExamples.images 배열을 수정하세요.
// public/images/bad-examples/ 폴더에 넣으면 됩니다. 설명 문구는 이미지 안에 포함되어 있습니다.
// 화살표를 눌러 넘겨보는 슬라이더 형태입니다.

export default function BadExamplesSection() {
  const { eyebrow, title, description, images } = SITE.badExamples;
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="eyebrow">{eyebrow}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, margin: "0 0 10px" }}>{title}</h2>
        <p style={{ color: "var(--steel)", fontSize: 15.5, margin: "0 0 26px" }}>{description}</p>

        <div style={{ position: "relative" }}>
          <div
            style={{
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid var(--paper-line)",
              aspectRatio: "1 / 1",
            }}
          >
            <img
              src={images[index]}
              alt="잘못된 시공 사례"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <button
            onClick={prev}
            aria-label="이전 사진"
            style={arrowStyle("left")}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="다음 사진"
            style={arrowStyle("right")}
          >
            ›
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}번 사진 보기`}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: i === index ? "var(--signal-deep)" : "var(--paper-line)",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function arrowStyle(side) {
  return {
    position: "absolute",
    top: "50%",
    [side]: 10,
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "rgba(11,18,32,0.55)",
    color: "#fff",
    fontSize: 22,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
