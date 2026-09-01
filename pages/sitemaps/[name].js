// ⭐ 묶음별 사이트맵입니다. (예: /sitemaps/core.xml, /sitemaps/창틀누수.xml)
// 직접 열어볼 일은 거의 없고, /sitemap.xml 이 이 파일들을 가리킵니다.

import { getGroupNames, getUrlsForGroup, toUrlsetXml } from "../../lib/site-urls";

export async function getServerSideProps({ params, res }) {
  // 주소가 /sitemaps/core.xml 로 들어오므로 뒤의 .xml 을 떼어냅니다.
  const name = decodeURIComponent(params.name || "").replace(/\.xml$/i, "");
  if (!getGroupNames().includes(name)) return { notFound: true };

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.write(toUrlsetXml(getUrlsForGroup(name)));
  res.end();
  return { props: {} };
}

export default function GroupSitemap() {
  return null;
}
