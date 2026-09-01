// ⭐ 사이트맵과 색인 요청(IndexNow)에서 함께 쓰는 "전체 주소 목록" 계산기입니다.
// 지역이나 서비스를 추가하면 여기를 고칠 필요 없이 자동으로 반영됩니다.

import { REGIONS } from "../data/regions";
import { SERVICES } from "../data/services";
import { AREAS } from "../data/region-meta";
import { SITE } from "../data/site-content";

export const BASE_URL = SITE.domain;
export const SERVICE_KEYS = Object.keys(SERVICES);

const enc = (s) => encodeURI(s);

// 사이트맵 묶음 이름 목록: core + 서비스 16개
export function getGroupNames() {
  return ["core", ...SERVICE_KEYS];
}

// core = 홈, 지역 전체보기, 시/구 허브, 동 허브, 시공사례
export function getCoreUrls() {
  const urls = [BASE_URL, `${BASE_URL}/service-area`];
  for (const area of AREAS) urls.push(enc(`${BASE_URL}/${area.key}`));
  for (const region of REGIONS) urls.push(enc(`${BASE_URL}/${region}`));
  return urls;
}

// 서비스 1개에 대한 지역별 주소 전체
export function getServiceUrls(serviceKey) {
  if (!SERVICES[serviceKey]) return [];
  const urls = [];
  for (const area of AREAS) urls.push(enc(`${BASE_URL}/${area.key}-${serviceKey}`));
  for (const region of REGIONS) urls.push(enc(`${BASE_URL}/${region}-${serviceKey}`));
  return urls;
}

export function getUrlsForGroup(name) {
  if (name === "core") return getCoreUrls();
  return getServiceUrls(name);
}

// 사이트 전체 주소 (IndexNow 일괄 제출용)
export function getAllUrls() {
  const urls = [...getCoreUrls()];
  for (const key of SERVICE_KEYS) urls.push(...getServiceUrls(key));
  return urls;
}

export function toUrlsetXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;
}
