// ⭐ 사이트맵 "목차" 파일입니다. 실제 주소 목록은 /sitemaps/... 안에 나눠 담겨 있습니다.
// 이렇게 나눠두면 서치콘솔·서치어드바이저에서 "어떤 서비스가 색인이 안 되는지"를
// 묶음별로 확인할 수 있습니다. 제출은 이 주소 하나만 하면 됩니다.
//   https://www.renobay.co.kr/sitemap.xml

import { BASE_URL, getGroupNames } from "../lib/site-urls";

export async function getServerSideProps({ res }) {
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getGroupNames()
  .map(
    (name) =>
      `  <sitemap><loc>${encodeURI(
        `${BASE_URL}/sitemaps/${name}.xml`
      )}</loc><lastmod>${today}</lastmod></sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function SiteMapIndex() {
  return null;
}
