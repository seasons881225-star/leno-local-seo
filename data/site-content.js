// ⭐⭐⭐ 이 파일 하나만 수정하면 사이트 곳곳의 문구가 전부 바뀝니다 ⭐⭐⭐
// 코드를 건드릴 필요 없이, 따옴표(" ") 안의 내용만 바꿔주세요.
// "여기에 입력" 이라고 써있는 자리는 반드시 실제 정보로 바꿔야 하는 자리입니다.

export const SITE = {
  // 대표 전화번호 (여기 한 번만 바꾸면 사이트 전체 전화번호 버튼이 다 바뀝니다)
  phone: "010-5619-1119",

  // 카카오톡 채팅 링크 (오픈채팅 또는 카카오톡 채널 링크 주소)
  kakaoUrl: "https://open.kakao.com/o/sSG1p7Cc",

  // 유튜브 채널 주소 (헤더/푸터의 '유튜브' 버튼이 연결되는 곳)
  youtubeUrl: "https://youtube.com/channel/UC5LKKjfKi91kHjuTrvo6WwA",

  // 블로그 주소
  blogUrl: "https://blog.naver.com/seasons0421",

  // 브랜드명
  brandName: "레노베이",

  // ===== 상단 헤더 네비게이션 =====
  // "블로그" 메뉴는 여기 href를 바꿔도 소용없고, 위쪽 blogUrl 값이 그대로 연결됩니다.
  nav: [
    { label: "블로그", href: "#blog" },
    { label: "시공 사례", href: "#cases" },
    { label: "견적 문의", href: "#contact" },
  ],

  // ===== 홈페이지 히어로(맨 위 큰 문구) =====
  hero: {
    eyebrow: "레노베이",
    headlineLine1: "경력을 속이는 가짜가 판치는 세상",
    headlineHighlight: "진짜 전문가",
    headlineLine2: "가 시공합니다",
    description:
      "빗물누수 원인 해결은 무작정 시공이 아닌 구조 분석 기반의 정밀 진단으로 이루어져야 합니다. 실경력 14년, 작업블로그 11년째 운영 중인 전문가에게 맡기세요.",
    checklist: [
      "100% 책임 시공제",
      "체계적 원인 진단",
      "전문가 직접 시공",
      "확실한 사후 관리",
    ],
  },

  // ===== 유튜브 대표 영상 =====
  // 유튜브 주소가 https://youtube.com/watch?v=ABC123 라면 videoId 는 "ABC123" 만 적으면 됩니다.
  video: {
    sectionEyebrow: "현장 영상",
    sectionTitle: "영상으로 먼저 확인하세요",
    videoId: "3idDfE0-dPM",
  },

  // ===== 신뢰도 숫자 =====
  stats: [
    { value: "14+", label: "년\n실경력" },
    { value: "11+", label: "년차\n작업블로그 운영" },
    { value: "100%", label: "책임 시공\n직영 시공팀 + 타공종\n서포트팀으로 구성된 전문가팀" },
  ],

  // ===== TRUST: 신뢰 카드 3개 =====
  trust: {
    eyebrow: "TRUST 레노베이",
    title: "검증된 경력이 책임시공으로 이어집니다",
    description: "모든 실리콘, 방수공사를 전문으로 시공 가능한 업체는 많지 않습니다. 레노베이는 가능합니다.",
    cards: [
      {
        icon: "🎖️",
        title: "실경력 14년, 작업블로그 11년",
        desc: "매 현장을 기록으로 남겨온 시간이 곧 신뢰입니다. 광고 문구가 아닌 실제 현장 기록으로 확인하실 수 있습니다.",
      },
      {
        icon: "✋",
        title: "불필요한 시공은 권하지 않습니다",
        desc: "정확한 진단으로 꼭 필요한 작업만 정직하게 제안합니다.",
      },
      {
        icon: "🤝",
        title: "고객 우선, 투명한 진행",
        desc: "필요한 작업과 이유를 투명하게 설명드리고, 협의를 통해 고객 우선으로 진행합니다.",
      },
    ],
  },

  // ===== 시공 순서 =====
  process: {
    eyebrow: "PROCESS",
    title: "레노베이는 이렇게 작업합니다",
    description: "체계적인 진단부터 사후관리까지, 3단계로 투명하게 진행합니다.",
    steps: [
      {
        n: "01",
        icon: "🔍",
        title: "원인 진단",
        desc: "체계적 점검 리스트로 누수 원인을 정밀하게 파악합니다.",
      },
      {
        n: "02",
        icon: "🛠️",
        title: "맞춤 시공",
        desc: "정석 시공법부터 가성비까지, 현장 상황에 맞춘 방식으로 시공합니다.",
      },
      {
        n: "03",
        icon: "🛡️",
        title: "사후 관리",
        desc: "시공 후 문제 발생 시 확실하게 책임지고 관리합니다.",
      },
    ],
  },

  // ===== 시공 사례 =====
  cases: {
    eyebrow: "CASES",
    title: "시공사례",
    description: "실제 진행한 현장입니다.",
    // ⭐ 사례를 추가/수정하려면 이 배열에 항목을 추가/수정하면 됩니다.
    // image는 public/images/cases/ 폴더 안의 파일명과 맞춰주세요.
    // postUrl에 해당 사례의 블로그 포스팅 주소를 넣으면 카드에 "자세히 보기" 링크가 생깁니다.
    items: [
      { image: "/images/cases/1.jpg", title: "아파트 샷시코킹 및 크랙보수", postUrl: "" },
      { image: "/images/cases/2.jpg", title: "외벽 도막 방수", postUrl: "" },
      { image: "/images/cases/3.jpg", title: "외벽 세라믹 방수", postUrl: "" },
      { image: "/images/cases/4.jpg", title: "외벽 점검 보수", postUrl: "" },
      { image: "/images/cases/5.jpg", title: "고층아파트 말벌집 제거", postUrl: "" },
      { image: "/images/cases/6.jpg", title: "인테리어 실리콘 마감작업", postUrl: "" },
      { image: "/images/cases/7.jpg", title: "지하철 석재 코킹", postUrl: "" },
      { image: "/images/cases/8.jpg", title: "터널 지붕 코킹공사", postUrl: "" },
      { image: "/images/cases/9.jpg", title: "발전소 외벽 크랙 보수", postUrl: "" },
      { image: "/images/cases/10.jpg", title: "포사이드창 코킹공사", postUrl: "" },
      { image: "/images/cases/11.jpg", title: "중앙대 기숙사 석재코킹 공사", postUrl: "" },
      { image: "/images/cases/12.jpg", title: "아파트 크랙보수 후 외벽방수도장", postUrl: "" },
    ],
  },

  // ===== 아파트 창틀 코킹 전/후 비교 (사진만, 문구 없음) =====
  beforeAfterGallery: {
    eyebrow: "BEFORE / AFTER",
    title: "아파트 창틀 코킹",
    // ⭐ 사진만 추가/교체하면 됩니다. public/images/before-after/ 폴더의 파일명과 맞춰주세요.
    pairs: [
      { before: "/images/before-after/1-before.jpg", after: "/images/before-after/1-after.jpg" },
      { before: "/images/before-after/2-before.jpg", after: "/images/before-after/2-after.jpg" },
      { before: "/images/before-after/3-before.jpg", after: "/images/before-after/3-after.jpg" },
      { before: "/images/before-after/4-before.jpg", after: "/images/before-after/4-after.jpg" },
    ],
  },

  // ===== 잘못된 시공 사례 =====
  badExamples: {
    eyebrow: "이런 시공은 피하세요",
    title: "잘못된 시공 사례",
    description: "밑작업 없이 덧방만 한 시공은 얼마 못 가 같은 문제가 반복됩니다.",
    // 이미지 자체에 설명 문구가 포함되어 있습니다.
    images: ["/images/bad-examples/1.jpg", "/images/bad-examples/2.jpg", "/images/bad-examples/3.jpg", "/images/bad-examples/4.jpg"],
  },

  // ===== PRINCIPLES: 약속 4개 =====
  principles: {
    eyebrow: "PRINCIPLES",
    title: "레노베이가 지키는 약속",
    description: "전문성, 투명함, 책임감 — 매 현장 같은 기준으로 일합니다.",
    cards: [
      {
        icon: "🎖️",
        title: "검증된 전문성",
        desc: "작업블로그 11년 차, 실경력 14년의 현장 경험을 바탕으로 직접 시공합니다.",
      },
      {
        icon: "📋",
        title: "투명한 견적과 설명",
        desc: "체계적인 점검 리스트로 원인을 진단하고, 공정별 비용을 상세히 안내합니다.",
      },
      {
        icon: "🔧",
        title: "정석과 실속을 겸비",
        desc: "정석 시공법부터 고객 눈높이에 맞춘 합리적인 시공까지 함께 고려합니다.",
      },
      {
        icon: "🛡️",
        title: "책임 있는 사후관리",
        desc: "시공 완료 후에도 문제가 발생하면 확실하게 책임집니다.",
      },
    ],
  },

  // ===== 최종 CTA =====
  finalCta: {
    title: "빗물 누수, 이제 제대로 해결하세요",
    subtitle: "현장 사진이나 의심부위 사진을 보내주시면 소견 및 작업방식 제안, 예상되는 견적을 안내드리겠습니다.",
    primaryLabel: "💬 카카오톡으로 문의",
    secondaryLabel: "📞 지금 바로 전화하기",
  },

  // ===== 사이트 도메인 (실제 도메인 연결 후 여기만 바꾸면 sitemap.xml에 자동 반영) =====
  domain: "https://www.renobay.co.kr",

  // ===== 푸터: 사업자 정보 =====
  business: {
    name: "레노베이",
    ceo: "김도영",
    registrationNumber: "771-15-01653",
  },

  footerTagline: "빗물누수 해결 전문 — 근본 원인부터 진단하는 레노베이",
};
