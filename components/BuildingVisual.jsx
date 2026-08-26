// ⭐ 사진 교체 방법 ⭐
// public/images/hero-main.jpg 파일을 실제 현장 사진으로 "같은 파일명"으로
// 덮어쓰기만 하면 자동으로 이 자리에 반영됩니다. 가로형 사진이 잘 어울립니다.

export default function BuildingVisual({ src = "/images/hero-main.jpg" }) {
  return (
    <img
      src={src}
      alt="레노베이 로프 접근 시공 현장"
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "4 / 3",
        objectFit: "cover",
        borderRadius: 18,
        display: "block",
      }}
    />
  );
}
