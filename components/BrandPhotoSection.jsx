// ⭐ 사진을 바꾸려면 public/images/brand/bottom-photo.jpg 파일을 같은 이름으로
// 덮어쓰기만 하면 됩니다. 가로형 사진이 잘 어울립니다.
//
// 사진 뒤에 같은 사진을 크게 확대해서 흐리게 깐 다음, 그 위에 선명한 사진을
// 부드러운 페더(feather) 마스크로 얹는 방식입니다. 그래서 사진 가장자리가
// 배경색으로 뚝 끊기지 않고, 흐릿한 자기 자신 위로 자연스럽게 녹아듭니다.

export default function BrandPhotoSection({ src = "/images/brand/bottom-photo.jpg" }) {
  const featherMask = {
    maskImage:
      "radial-gradient(ellipse 68% 62% at center, black 45%, transparent 92%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 68% 62% at center, black 45%, transparent 92%)",
  };

  return (
    <section style={{ padding: "64px 0" }}>
      <div
        className="container"
        style={{
          maxWidth: 920,
          position: "relative",
          aspectRatio: "16 / 9",
        }}
      >
        {/* 배경: 같은 사진을 크게 확대 + 강하게 블러 처리 */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(60px) saturate(1.1)",
            transform: "scale(1.25)",
            opacity: 0.9,
          }}
        />
        {/* 전경: 선명한 사진, 가장자리를 부드럽게 페더 처리 */}
        <img
          src={src}
          alt="레노베이 현장"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            ...featherMask,
          }}
        />
      </div>
    </section>
  );
}
