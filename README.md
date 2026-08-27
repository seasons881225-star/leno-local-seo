# 레노베이 홈페이지 (renobay.co.kr)

## 🔧 코드를 몰라도 바로 수정할 수 있는 것들

### 1. 사진 바꾸기
GitHub 저장소에서 아래 경로로 들어가서 "Upload files"로 **같은 파일명**으로
사진을 올리면 자동으로 덮어써집니다.

| 바꾸고 싶은 사진 | 파일 위치 |
|---|---|
| 홈/지역페이지 상단 큰 사진 | `public/images/hero-main.jpg` (가로형) |
| 시공사례 11장 | `public/images/cases/1.jpg` ~ `11.jpg` |
| 아파트 창틀 코킹 전/후 비교 | `public/images/before-after/1-before.jpg`, `1-after.jpg`, `2-before.jpg`, `2-after.jpg` |
| 잘못된 시공 사례 | `public/images/bad-examples/1.jpg`, `2.jpg` |

`public/images/before-after/4-before.jpg`는 짝이 되는 "시공후" 사진이 아직
없어서 대기 중입니다. 나중에 짝 사진이 생기면 `4-after.jpg`로 올리고
`data/site-content.js`의 `beforeAfterGallery.pairs`에 추가하면 됩니다.

### 2. 문구(텍스트) 바꾸기
`data/site-content.js` 파일 하나에 사이트 전체 문구가 정리되어 있습니다.
따옴표(" ") 안의 내용만 수정하고 저장(Commit)하세요.

- 전화번호 → `phone`
- 카카오톡 채팅 링크 → `kakaoUrl`
- 유튜브 대표영상/채널, 블로그 주소 → `video.videoId`, `youtubeUrl`, `blogUrl`
- 메인 헤드라인 → `hero`
- 상단 숫자 → `stats`
- TRUST 카드 3개 → `trust.cards`
- 시공 순서 3단계 → `process.steps`
- 시공사례 → `cases.items`
- 창틀 코킹 전/후 비교 → `beforeAfterGallery.pairs`
- 잘못된 시공 사례 → `badExamples.images`
- 약속(PRINCIPLES) 카드 4개 → `principles.cards`
- 최종 CTA 문구 → `finalCta`
- 사업자 정보(상호/대표자/사업자등록번호) → `business`
- 사이트 도메인 → `domain` (현재 `https://www.renobay.co.kr`)

> ⚠️ 헤더 상단의 "블로그" 메뉴는 `nav` 안의 href가 아니라 항상 `blogUrl` 값을
> 그대로 따라갑니다. 블로그 주소를 바꾸고 싶으면 `blogUrl`만 수정하세요.

### 3. 서비스 지역 추가/삭제 (검색엔진 노출용, 홈에는 목록으로 표시되지 않음)
`data/regions.js`에 현재 9개 시(안산·부천·광명·시흥·수원·화성·군포·안양·의왕)의
행정동 209개가 들어있습니다. 새 지역을 추가하려면 목록에 동 이름만 추가하면
`/동이름-서비스명` 페이지가 자동으로 생깁니다.

⚠️ 이름이 같은 동이 다른 시에 있는 경우(예: 대야동, 반월동, 부곡동)
시 이름을 붙여서 구분해뒀습니다 (`시흥대야동`, `군포대야동`, `안산반월동`,
`화성반월동`, `안산부곡동`, `의왕부곡동`). 새로 추가할 때도 이름이 겹치는
동이 있는지 한 번 확인해주세요.

### 4. 서비스 항목별 소개 문구
`data/services.js`에서 서비스별 문구(지역 SEO 페이지용)를 수정할 수 있습니다.
서비스당 헤딩/설명 문장을 4개씩 변형해뒀는데, 지역이 많아 문장이 반복되는 걸
줄이기 위해서입니다. 더 다양하게 하고 싶으면 배열에 문장을 더 추가하면 됩니다.

---

## 폴더 구조 요약

```
data/
  site-content.js   ← 전화번호·헤드라인·통계·카드·사업자정보 등 거의 모든 문구
  regions.js        ← 서비스 지역(동) 목록 209개 (SEO 페이지 생성용)
  services.js       ← 서비스별 상세 문구 템플릿 8종 (SEO 페이지용)
public/images/
  hero-main.jpg          ← 메인 히어로 사진
  cases/1~11.jpg          ← 시공사례 사진
  before-after/           ← 창틀 코킹 전/후 비교 사진
  bad-examples/1~2.jpg    ← 잘못된 시공 사례 (문구 포함 이미지)
pages/
  index.js          ← 홈페이지
  [slug].js         ← 지역-서비스 SEO 페이지 (총 1,673개, 홈에서 링크 없음)
  sitemap.xml.js    ← 검색엔진 제출용 사이트맵 (자동 생성)
```

## 배포 방법

1. 이 zip 파일 압축을 풀어주세요.
2. GitHub 저장소에 압축 푼 파일 전부를 업로드하세요 (기존 파일이 있다면 저장소를
   통째로 삭제하고 새로 만든 뒤 업로드하는 걸 추천드립니다 — 예전 파일이 안 섞여서 깔끔합니다).
3. vercel.com에서 GitHub으로 로그인 → "Add New → Project" → 저장소 선택 → Deploy.
4. Vercel Settings → Domains 에서 `renobay.co.kr` / `www.renobay.co.kr` 연결
   (가비아/후이즈 등 도메인 등록업체 DNS에 Vercel이 안내하는 A/CNAME 레코드 입력).
5. searchadvisor.naver.com, search.google.com/search-console 에 도메인 등록 후
   `https://www.renobay.co.kr/sitemap.xml` 제출.

## 확인해주세요

- `data/site-content.js`의 `kakaoUrl`, `youtubeUrl`, `blogUrl`, `business` 값은
  모두 실제 정보로 채워져 있습니다. 바뀌면 이 파일만 수정하면 됩니다.
- `data/regions.js`에 없는 동 이름으로 접속하면 페이지가 뜨지 않습니다 (스팸 방지 설계).
