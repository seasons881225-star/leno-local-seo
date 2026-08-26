// 사용법: 유튜브 영상 URL에서 ID만 뽑아서 아래처럼 넘기면 자동으로 영상이 뜹니다.
// 예) https://youtube.com/watch?v=ABC123  →  videoId="ABC123"
// index.js 에서 <VideoEmbed videoId="여기에_실제_ID" /> 로 바꿔주세요.

export default function VideoEmbed({ videoId = "" }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // 16:9
        borderRadius: "var(--radius)",
        overflow: "hidden",
        background: "var(--ink)",
      }}
    >
      {videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="레노베이 대표 영상"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: "#aab2c0",
          }}
        >
          <div style={{ fontSize: 34 }}>▶</div>
          <div style={{ fontSize: 13.5 }}>
            유튜브 영상 ID를 넣으면 이 자리에 영상이 재생됩니다
          </div>
        </div>
      )}
    </div>
  );
}
