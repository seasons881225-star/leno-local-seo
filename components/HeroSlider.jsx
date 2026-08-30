"use client";
import { useEffect, useState } from "react";

// ⭐ 사진을 바꾸려면 public/images/hero/1.jpg ~ 5.jpg 파일을 같은 이름으로
// 덮어쓰기만 하면 됩니다. 2초마다 부드럽게(페이드) 다음 사진으로 전환됩니다.

const SLIDES = [
  "/images/hero/1.jpg",
  "/images/hero/2.jpg",
  "/images/hero/3.jpg",
  "/images/hero/4.jpg",
  "/images/hero/5.jpg",
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
      {SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="레노베이 시공 현장"
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
