"use client";
import { useRef, useState, useCallback } from "react";
import { SITE } from "../data/site-content";

// ⭐ 사진만 추가/교체하려면 data/site-content.js 의 beforeAfterGallery.pairs 배열과
// public/images/before-after/ 폴더의 사진 파일을 수정하면 됩니다.
// 가운데 손잡이를 마우스(PC) 또는 손가락(모바일)으로 좌우로 끌면 전/후 사진이
// 갈라져서 비교됩니다.

function DragCompare({ before, after, label }) {
  const containerRef = useRef(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setPercent(p);
  }, []);

  const onDown = (e) => {
    dragging.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateFromClientX(clientX);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateFromClientX(clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        cursor: "ew-resize",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/* 시공 후 사진 (바닥, 항상 전체 표시) */}
      <img
        src={after}
        alt={`${label} 시공 후`}
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* 시공 전 사진: 항상 전체 크기로 겹쳐두고, clip-path로 왼쪽 percent%만 보여줍니다.
          (컨테이너 픽셀 크기를 몰라도 항상 정확하게 동작합니다) */}
      <img
        src={before}
        alt={`${label} 시공 전`}
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          clipPath: `inset(0 ${100 - percent}% 0 0)`,
        }}
      />

      {/* 라벨 */}
      <span style={badgeStyle("left")}>BEFORE</span>
      <span style={badgeStyle("right")}>AFTER</span>

      {/* 드래그 손잡이 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `calc(${percent}% - 1px)`,
          width: 2,
          background: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          ⇔
        </div>
      </div>
    </div>
  );
}

function badgeStyle(side) {
  return {
    position: "absolute",
    top: 8,
    [side]: 8,
    fontSize: 10.5,
    fontWeight: 800,
    letterSpacing: "0.03em",
    padding: "3px 8px",
    borderRadius: 6,
    background: "rgba(11,18,32,0.6)",
    color: "#fff",
    pointerEvents: "none",
  };
}

export default function BeforeAfterGallery({ place = "" }) {
  const { eyebrow, title, pairs } = SITE.beforeAfterGallery;
  const label = [place, "아파트 창틀 코킹"].filter(Boolean).join(" ");

  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
          {title}
        </h2>
        <p style={{ color: "var(--steel)", fontSize: 13.5, margin: "0 0 22px" }}>
          손잡이를 좌우로 끌어보세요 (PC는 마우스, 모바일은 손가락으로 드래그)
        </p>

        <div
          className="cases-grid-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {pairs.map((pair, i) => (
            <DragCompare key={i} before={pair.before} after={pair.after} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
}
