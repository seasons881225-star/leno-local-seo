// ⭐ 사진을 바꾸려면 public/images/brand/bottom-photo.jpg 파일을 같은 이름으로
// 덮어쓰기만 하면 됩니다. 가로형 사진이 잘 어울립니다.
//
// 테두리가 서서히 배경색으로 사라지는 비네트(vignette) 효과를 CSS로 줘서,
// 사진을 딱 잘라 붙인 것처럼 보이지 않게 처리했습니다.

export default function BrandPhotoSection({ src = "/images/brand/bottom-photo.jpg" }) {
  const maskStyle = {
    maskImage: "radial-gradient(ellipse 75% 80% at center, black 55%, transparent 100%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 75% 80% at center, black 55%, transparent 100%)",
  };

  return (
    <section style={{ padding: "56px 0" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <img
          src={src}
          alt="레노베이 현장"
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            display: "block",
            ...maskStyle,
          }}
        />
      </div>
    </section>
  );
}
