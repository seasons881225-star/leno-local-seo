import { SITE } from "../data/site-content";
import Icon from "./Icon";

export default function ProcessSection() {
  const { eyebrow, title, description, steps } = SITE.process;

  return (
    <section style={{ padding: "16px 0 48px" }}>
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, margin: "0 0 10px" }}>{title}</h2>
        <p style={{ color: "var(--steel)", fontSize: 15.5, margin: "0 0 36px" }}>{description}</p>

        <div
          className="process-row"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          {steps.map((step, i) => (
            <div key={step.n} style={{ display: "flex", alignItems: "flex-start", flex: 1, minWidth: 0 }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--ink)",
                    color: "var(--white)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: 16.5,
                    margin: "0 auto 14px",
                  }}
                >
                  {step.n}
                </div>
                <div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}>
                  <Icon name={step.icon} />
                </div>
                <h3 style={{ fontSize: 16.5, fontWeight: 800, margin: "0 0 6px" }}>
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--steel)",
                    lineHeight: 1.6,
                    margin: "0 auto",
                    maxWidth: 220,
                  }}
                >
                  {step.desc}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div
                  className="process-line"
                  style={{
                    height: 2,
                    flex: 1,
                    minWidth: 30,
                    marginTop: 27,
                    background:
                      "repeating-linear-gradient(90deg, var(--signal) 0 6px, transparent 6px 12px)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
