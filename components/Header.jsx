import { SITE } from "../data/site-content";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--paper-line)",
        background: "rgba(246,247,249,0.9)",
        backdropFilter: "blur(6px)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 19,
            textDecoration: "none",
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {SITE.brandName}
          <span style={{ color: "var(--signal-deep)" }}>.</span>
        </a>

        <nav
          className="header-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
          }}
        >
          {SITE.nav.map((item) => {
            // "블로그" 메뉴는 항상 실제 블로그 주소(SITE.blogUrl)로 연결됩니다.
            const isBlog = item.label === "블로그";
            const href = isBlog ? SITE.blogUrl : item.href;
            const isExternal = href.startsWith("http");
            return (
              <a
                key={item.label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="header-nav-link"
                style={{
                  fontSize: 14.5,
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "var(--steel)",
                }}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={`tel:${SITE.phone}`}
            className="btn btn-primary"
            style={{ fontSize: 14, padding: "10px 18px" }}
          >
            무료 상담
          </a>
        </nav>
      </div>
    </header>
  );
}
