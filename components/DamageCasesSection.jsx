// ⭐ "빗물누수 피해사례" 섹션입니다. (메인페이지 + 지역 랜딩페이지 공통)
//
// 한 줄에 4장씩 배치되고, 각 카드는 좌우 화살표와 아래 점(●)으로 넘겨봅니다.
// 사진과 설명은 data/damage-cases.js 에서 수정하세요.

import { useState } from "react";
import { DAMAGE_CASES } from "../data/damage-cases";

function DamageCard({ item, place }) {
  const [index, setIndex] = useState(0);
  const total = item.photos.length;

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    background: "rgba(17,24,39,0.55)",
    color: "#fff",
    fontSize: 16,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  };

  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--paper-line)",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", background: "#0f172a" }}>
        <img
          src={item.photos[index]}
          alt={`${place ? place + " " : ""}빗물누수 피해사례 - ${item.caption}`}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "4 / 3",
            objectFit: "cover",
            display: "block",
          }}
        />

        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(17,24,39,0.7)",
            color: "#fff",
            fontSize: 11.5,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          피해 {index + 1} / {total}
        </span>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="이전 사진"
              onClick={() => go(-1)}
              style={{ ...arrowStyle, left: 8 }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="다음 사진"
              onClick={() => go(1)}
              style={{ ...arrowStyle, right: 8 }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            padding: "10px 0 2px",
          }}
        >
          {item.photos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}번째 사진 보기`}
              onClick={() => setIndex(i)}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === index ? "var(--signal-deep)" : "#d1d5db",
              }}
            />
          ))}
        </div>
      )}

      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.65,
          color: "var(--ink)",
          margin: 0,
          padding: "12px 16px 18px",
          fontWeight: 600,
        }}
      >
        {item.caption}
      </p>
    </div>
  );
}

export default function DamageCasesSection({ place = "" }) {
  if (!DAMAGE_CASES.length) return null;

  return (
    <section style={{ padding: "8px 0 44px" }}>
      <div className="container">
        <div className="eyebrow">DAMAGE CASES</div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(21px, 2.8vw, 28px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
          }}
        >
          {place ? `${place} 빗물누수 피해사례` : "빗물누수 피해사례"}
        </h2>
        <p style={{ color: "var(--steel)", fontSize: 14.5, margin: "0 0 22px" }}>
          방치하면 이렇게 됩니다. 실제 현장에서 확인한 피해 상황입니다. 사진을 좌우로
          넘겨 보실 수 있습니다.
        </p>

        <div
          className="damage-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {DAMAGE_CASES.map((item) => (
            <DamageCard key={item.id} item={item} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}
