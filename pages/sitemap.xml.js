import { REGIONS } from "../data/regions";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site-content";

// ⭐ 실제 도메인은 data/site-content.js 의 domain 값만 바꾸면 여기 자동 반영됩니다.
const BASE_URL = SITE.domain;

function generateSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${url}</loc></url>`)
  .join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const urls = [BASE_URL];

  for (const region of REGIONS) {
    for (const key of Object.keys(SERVICES)) {
      urls.push(`${BASE_URL}/${region}-${key}`);
    }
  }

  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemapXml(urls));
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  // 실제 화면에는 아무것도 렌더링되지 않고, XML만 응답됩니다.
  return null;
}
