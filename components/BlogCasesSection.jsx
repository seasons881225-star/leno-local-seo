// ⭐ 랜딩페이지의 "실제 시공 사례" 섹션입니다.
// 사례 내용은 네이버 블로그에서 확인하도록 안내하고, 사진 2장만 보여줍니다.
//
// 사진을 바꾸려면 public/images/blog-cases/1.jpg, 2.jpg 를
// "같은 파일명"으로 덮어쓰기만 하면 됩니다.

import { SITE } from "../data/site-content";

const DEFAULT_PHOTOS = [
  { src: "/images/blog-cases/1.jpg", caption: "아파트 창틀 코킹 재시공 현장" },
  { src: "/images/blog-cases/2.jpg", caption: "외벽 접합부 누수 보수 현장" },
];

// 외벽방수 관련 페이지에서 쓰는 사진
export const WATERPROOF_PHOTOS = [
  { src: "/images/waterproof/1.jpg", caption: "외벽 방수 도포 시공 현장" },
  { src: "/images/waterproof/2.jpg", caption: "로프 접근 외벽 방수 작업 현장" },
];

// 메인페이지에서 쓰는 대표 사진 2장
export const MAIN_PHOTOS = [
  { src: "/images/thumbs/9.jpg", caption: "창틀 코킹 시공 현장" },
  { src: "/images/thumbs/10.jpg", caption: "외벽 방수 시공 현장" },
];

export default function BlogCasesSection({ place = "", keyword, title, photos }) {
  const PHOTOS = photos || DEFAULT_PHOTOS;
  return (
    <section style={{ padding: "8px 0 44px" }}>
      <div className="container">
        <div className="eyebrow">REAL CASES</div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(21px, 2.8vw, 28px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
          }}
        >
          {title || `${keyword} 실제 시공 사례`}
        </h2>
        <p style={{ color: "var(--steel)", fontSize: 14.5, margin: "0 0 22px" }}>
          시공사례는 블로그에서 확인하실 수 있습니다.
        </p>

        <div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          {PHOTOS.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={`${place ? place + " " : ""}${keyword} ${p.caption}`}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "4 / 3",
                objectFit: "cover",
                borderRadius: 14,
                display: "block",
              }}
            />
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <a
            href={SITE.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-signal"
            style={{ fontSize: 14.5 }}
          >
            📝 시공사례 블로그에서 보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
