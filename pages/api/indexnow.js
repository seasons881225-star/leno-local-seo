// ⭐ 네이버에 전체 주소를 한꺼번에 통보하는 기능입니다.
// 브라우저 주소창에 아래 주소를 넣고 엔터를 치면 실행됩니다.
//   /api/indexnow?secret=(data/indexnow.js 의 secret 값)
//
// 옵션:
//   &group=core        → 지역 허브/시공사례만 통보
//   &group=창틀누수    → 창틀누수 페이지만 통보
//   &limit=1000        → 앞에서부터 1000개만 통보
// 옵션을 안 붙이면 사이트 전체를 통보합니다.

import { INDEXNOW } from "../../data/indexnow";
import { SITE } from "../../data/site-content";
import { getAllUrls, getGroupNames, getUrlsForGroup } from "../../lib/site-urls";

const BATCH = 10000; // IndexNow 1회 제출 상한

export default async function handler(req, res) {
  const { secret, group, limit } = req.query;

  if (!secret || secret !== INDEXNOW.secret) {
    return res.status(401).json({ ok: false, message: "secret 값이 올바르지 않습니다." });
  }

  let urls;
  if (group) {
    if (!getGroupNames().includes(group)) {
      return res
        .status(400)
        .json({ ok: false, message: "group 이름이 올바르지 않습니다.", 사용가능: getGroupNames() });
    }
    urls = getUrlsForGroup(group);
  } else {
    urls = getAllUrls();
  }

  const max = limit ? parseInt(limit, 10) : urls.length;
  if (!Number.isNaN(max) && max > 0) urls = urls.slice(0, max);

  const host = SITE.domain.replace(/^https?:\/\//, "");
  const keyLocation = `${SITE.domain}/${INDEXNOW.key}.txt`;

  const results = [];
  for (let i = 0; i < urls.length; i += BATCH) {
    const chunk = urls.slice(i, i + BATCH);
    try {
      const r = await fetch(INDEXNOW.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host, key: INDEXNOW.key, keyLocation, urlList: chunk }),
      });
      results.push({ 묶음: `${i + 1}~${i + chunk.length}`, 응답코드: r.status });
    } catch (e) {
      results.push({ 묶음: `${i + 1}~${i + chunk.length}`, 오류: String(e) });
    }
  }

  return res.status(200).json({
    ok: true,
    안내:
      "응답코드가 200 또는 202면 정상 접수된 것입니다. 색인은 네이버 쪽 일정에 따라 순차적으로 진행됩니다.",
    통보한주소수: urls.length,
    결과: results,
    예시주소: urls.slice(0, 3),
  });
}
