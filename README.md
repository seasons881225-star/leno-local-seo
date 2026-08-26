# 레노베이 홈페이지

## 🔧 코드를 몰라도 바로 수정할 수 있는 것들

### 1. 사진 바꾸기
GitHub 저장소에서 아래 경로로 들어가서 "Upload files"로 **같은 파일명**으로
사진을 올리면 자동으로 덮어써집니다.

| 바꾸고 싶은 사진 | 파일 위치 |
|---|---|
| 홈페이지 상단 큰 사진 | `public/images/hero-main.jpg` (가로형) |
| 시공사례 11장 | `public/images/cases/1.jpg` ~ `11.jpg` |
| 아파트 창틀 코킹 전/후 비교 | `public/images/before-after/1-before.jpg`, `1-after.jpg`, `2-before.jpg`, `2-after.jpg` |
| 잘못된 시공 사례 | `public/images/bad-examples/1.jpg`, `2.jpg` (이미지 안에 설명 문구 포함) |

사례를 늘리거나 줄이려면 사진 파일을 올린 뒤 `data/site-content.js`의
`cases.items` 또는 `beforeAfterGallery.pairs` 배열에 항목을 추가/삭제하면 됩니다.

`public/images/before-after/4-before.jpg`는 아직 짝이 되는 "시공후" 사진이 없어서
대기 중인 파일입니다 — 나중에 짝 사진이 생기면 `4-after.jpg`로 올리고
`beforeAfterGallery.pairs`에 추가하면 됩니다.

### 2. 문구(텍스트) 바꾸기
`data/site-content.js` 파일 하나만 열면, 사이트에 나오는 거의 모든 문구가
정리되어 있습니다. 따옴표(" ") 안의 내용만 수정하고 저장(Commit)하세요.

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

### 3. 서비스 지역 추가/삭제 (검색엔진 노출용, 홈에는 표시되지 않음)
`data/regions.js` 파일에 동 이름을 추가하거나 지우면
`/등촌동-창틀누수` 같은 개별 페이지가 자동으로 생성/삭제됩니다.
이 페이지들은 홈페이지에는 나오지 않지만, 사이트맵(`sitemap.xml`)에는
포함되어 검색엔진에는 계속 노출됩니다.

### 4. 서비스 항목별 소개 문구
`data/services.js` 파일에서 서비스별 문구(지역 SEO 페이지용)를 수정할 수 있습니다.

---

## 폴더 구조 요약

```
data/
  site-content.js   ← 전화번호·헤드라인·통계·카드·사업자정보 등 거의 모든 문구
  regions.js        ← 서비스 지역(동) 목록 (SEO 페이지 생성용)
  services.js       ← 서비스별 상세 문구 템플릿 (SEO 페이지용)
public/images/
  hero-main.jpg          ← 메인 히어로 사진
  cases/1~11.jpg          ← 시공사례 사진
  before-after/           ← 창틀 코킹 전/후 비교 사진
  bad-examples/1~2.jpg    ← 잘못된 시공 사례 (문구 포함 이미지)
pages/
  index.js          ← 홈페이지
  [slug].js         ← 지역-서비스 SEO 페이지 (예: /등촌동-창틀누수, 홈에서 링크 없음)
  sitemap.xml.js    ← 검색엔진 제출용 사이트맵 (자동 생성)
```

## 배포 방법 (처음이라면)

1. 이 zip 파일 압축을 풀어주세요.
2. GitHub에서 새 저장소를 만들고, 압축 푼 파일 전부를 "Upload files"로 올려주세요.
3. vercel.com에서 GitHub으로 로그인 → "Add New → Project" → 방금 만든 저장소 선택 → Deploy 클릭.
4. 1~2분 후 `프로젝트이름.vercel.app` 주소로 사이트가 뜹니다.
5. 이미 배포해두신 프로젝트가 있다면, 같은 저장소에 파일을 다시 업로드(덮어쓰기)하면
   Vercel이 자동으로 재배포합니다.

## 반드시 확인해주세요 (현재 값 상태)

- `data/site-content.js` → `kakaoUrl`이 실제 카카오톡 채팅 링크로 들어가 있는지 확인해주세요.
- 실제 도메인이 정해지면 `data/site-content.js`의 `domain` 값만 바꾸면
  `sitemap.xml`에 자동 반영됩니다. (`public/robots.txt`는 직접 한 줄 수정)
- `data/regions.js`에 없는 동 이름으로 접속하면 페이지가 뜨지 않습니다 (스팸 방지 설계).
