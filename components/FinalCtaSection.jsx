import { SITE } from "../data/site-content";

export default function FinalCtaSection() {
  const { title, subtitle, primaryLabel, secondaryLabel } = SITE.finalCta;

  return (
    <section id="contact" style={{ padding: "24px 0 0" }}>
      <div
        style={{
          background: "var(--ink)",
          padding: "64px 24px 48px",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              color: "var(--white)",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 800,
              margin: "0 0 12px",
            }}
          >
            {title}
          </h2>
          <p style={{ color: "#aab2c0", margin: "0 0 28px", fontSize: 15 }}>{subtitle}</p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={SITE.kakaoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-signal">
              {primaryLabel}
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="btn"
              style={{
                background: "transparent",
                color: "var(--white)",
                border: "1.5px solid #3b4a5a",
              }}
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
