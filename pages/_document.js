import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 네이버 서치어드바이저 사이트 소유 확인 */}
        <meta
          name="naver-site-verification"
          content="1825da7ec96de1be9730fe28f37898082c07f558"
        />
        {/* Pretendard: 한글 웹폰트 (본문 공용) */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        {/* IBM Plex Mono: 숫자/라벨용 유틸리티 폰트 (01/02/03, 10+ 등) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
