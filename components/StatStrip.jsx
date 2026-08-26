import { SITE } from "../data/site-content";

export default function StatStrip() {
  const STATS = SITE.stats;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
        gap: 1,
        background: "var(--paper-line)",
        border: "1px solid var(--paper-line)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
      }}
      className="stat-strip"
    >
      {STATS.map((s) => (
        <div
          key={s.value}
          style={{
            background: "var(--white)",
            padding: "22px 16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: "clamp(22px, 3vw, 30px)",
              color: "var(--signal-deep)",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "var(--steel)",
              lineHeight: 1.4,
              whiteSpace: "pre-line",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
