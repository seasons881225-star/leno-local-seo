import { SITE } from "../data/site-content";

// 화면 어디에 있든 항상 최하단에 고정되어 따라오는 문의 바입니다.
// 본문 콘텐츠가 이 바에 가려지지 않도록, layout에서 body 하단에 여백을 줍니다.

export default function StickyContactBar() {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: "flex",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 -4px 16px rgba(11,18,32,0.18)",
      }}
    >
      <a
        href={`tel:${SITE.phone}`}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "14px 10px",
          background: "var(--ink)",
          color: "var(--white)",
          fontWeight: 700,
          fontSize: 14.5,
          textDecoration: "none",
        }}
      >
        📞 전화 문의
      </a>
      <a
        href={SITE.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "14px 10px",
          background: "var(--kakao-yellow)",
          color: "var(--ink)",
          fontWeight: 700,
          fontSize: 14.5,
          textDecoration: "none",
        }}
      >
        💬 카카오톡 문의
      </a>
    </div>
  );
}
