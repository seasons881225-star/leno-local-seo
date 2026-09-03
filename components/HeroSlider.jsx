"use client";
import { useEffect, useState } from "react";

// ⭐ 사진을 바꾸려면 public/images/hero/1.jpg ~ 5.jpg 파일을 같은 이름으로
// 덮어쓰기만 하면 됩니다. 2초마다 부드럽게(페이드) 다음 사진으로 전환됩니다.

// ⚠️ alt(사진 설명글)는 사진마다 다르게 적어야 합니다.
//    네이버가 사진을 이해하는 단서이고, 검색결과 썸네일 선택에도 영향을 줍니다.
const SLIDES = [
  { src: "/images/hero/1.jpg", alt: "아파트 외벽 로프 접근 창틀코킹 시공 현장 - 레노베이" },
  { src: "/images/hero/2.jpg", alt: "빌라 외벽 빗물누수 보수 작업 현장 - 레노베이" },
  { src: "/images/hero/3.jpg", alt: "고층 건물 외벽방수 로프 작업 현장 - 레노베이" },
  { src: "/images/hero/4.jpg", alt: "창틀 실리콘 재시공 현장 - 레노베이" },
  { src: "/images/hero/5.jpg", alt: "외벽 크랙 보수 및 방수 시공 현장 - 레노베이" },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", borderRadius: 18, overflow: "hidden" }}>
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
      ))}
    </div>
  );
}
