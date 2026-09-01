// ⭐ 지역 페이지의 "01 / 02 / 03" 3단 설명 섹션입니다.
// 네이버 검색결과에서 제목 아래에 클릭 가능한 메뉴(01, 02, 03)가 만들어지려면
// "번호 붙은 소제목 + 설명 문단 + 항목 3개"가 규칙적으로 반복되는 구조가 필요합니다.
// 형식은 바꾸지 마시고, 문구만 고쳐주세요.

// place(지역명)를 넘기지 않으면 홈페이지용으로 지역명 없이 렌더링됩니다.
export default function WhySection({ place = "", keyword, isWaterproof = false }) {
  const P = place ? `${place} ${keyword}` : keyword;
  const steps = [
    {
      n: "01",
      title: "비슷한 사례 시공 데이터 비교, 진단",
      desc: `${P} 문제, 물이 보이는 자리와 실제 유입 지점이 다른 경우가 많습니다. 겉으로 드러난 부위만 막지 않고 접합부와 구조를 함께 확인해 원인을 먼저 파악합니다.`,
      items: [
        "체계적인 정밀 소견 안내",
        "외벽 크랙, 이질재 조인트, 프레임 구조 동시 점검",
        "하자부위 확인 후 작업 범위 산정",
      ],
    },
    {
      n: "02",
      title: "정석 공정 책임시공",
      desc: `${P} 시공은 의뢰주신 시공 절차와 방법을 준수하여 빗물누수 전문가가 책임시공 합니다.`,
      items: [
        isWaterproof
          ? "조달청 등록된 정식 방수 자재 사용"
          : "조달청 등록된 정식 자재 사용",
        "각 부위에 맞는 ISO 11600 기준 F-25LM 등급의 고품질 실란트 사용",
        "누수분쟁 300건 이상 해결↑",
      ],
    },
    {
      n: "03",
      title: "애프터 서비스 관리",
      desc: `${P} 작업만 받으면 끝? 시공 부위를 데이터로 남기고, 비가 온 뒤 고객님과 커뮤니케이션을 통해 사후관리까지 책임집니다.`,
      items: [
        "점검 후 누수원인 및 시공 진행",
        "시공 후 주의사항과 관리방법 안내",
        "시공부위 하자 발생 시 100% 무상A/S",
      ],
    },
  ];

  return (
    <section style={{ padding: "16px 0 40px" }}>
      <div className="container">
        <div className="eyebrow">Renobay solution</div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 10px",
            lineHeight: 1.35,
          }}
        >
          {`${P}, 밥 먹고 누수해결만 고민하는 사람들이 해결해드립니다.`}
        </h2>
        <p style={{ color: "var(--steel)", fontSize: 15, margin: "0 0 28px" }}>
          {`빗물 누수는 방치할수록 더 큰 보수비용이 발생합니다. ${P} 때문에 고민이신가요? ${keyword} 시공은 물론 주위 원인을 파악하여 반복되는 보수를 끊을 수 있습니다.`}
        </p>

        <div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                background: "var(--white)",
                border: "1px solid var(--paper-line)",
                borderRadius: 14,
                padding: "24px 22px",
              }}
            >
              <h3
                style={{
                  fontSize: 16.5,
                  fontWeight: 800,
                  margin: "0 0 10px",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.45,
                }}
              >
                <span style={{ color: "var(--signal-deep)" }}>{s.n}.</span> {s.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--steel)",
                  margin: "0 0 14px",
                }}
              >
                {s.desc}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {s.items.map((it, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 13.5,
                      color: "var(--ink)",
                      display: "flex",
                      gap: 7,
                      alignItems: "flex-start",
                      marginBottom: 7,
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "var(--signal-deep)", fontWeight: 800 }}>✓</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {place ? (
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "var(--steel)",
              margin: "28px 0 0",
              lineHeight: 1.8,
            }}
          >
            {`※ 레노베이는 ${place} ${keyword} 작업을 현장 상황에 맞는 방식으로 진행합니다.`}
            <br />
            {`본 페이지는 ${place} 지역 고객님을 위한 시공 안내입니다.`}
          </p>
        ) : null}
      </div>
    </section>
  );
}
