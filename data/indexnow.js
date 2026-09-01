// ⭐⭐ 네이버에 "페이지가 바뀌었어요"라고 바로 알려주는 기능(IndexNow) 설정입니다 ⭐⭐
//
// 지금까지는 네이버 서치어드바이저에서 하루 50개씩 손으로 수집 요청을 넣으셨는데,
// 이 기능을 쓰면 브라우저 주소창에 아래 주소를 한 번 넣는 것으로
// 사이트 전체 주소를 한꺼번에 네이버에 통보할 수 있습니다.
//
//   https://www.renobay.co.kr/api/indexnow?secret=aecffea6bb8e2981
//
// ⚠️ 위 주소는 남에게 알려주지 마세요. (아무나 실행할 수 있게 되면 곤란합니다)
// ⚠️ public/368acf69b9b4e28add678a2f68cb54c9.txt 파일은 절대 지우면 안 됩니다.
//    네이버가 "정말 이 사이트 주인이 맞는지" 확인하려고 읽어가는 파일입니다.

export const INDEXNOW = {
  // 네이버가 확인하는 인증 키 (public 폴더의 txt 파일 이름/내용과 같아야 합니다)
  key: "368acf69b9b4e28add678a2f68cb54c9",

  // 위 주소 뒤에 붙이는 비밀번호. 바꾸고 싶으면 여기 글자만 바꾸면 됩니다.
  secret: "aecffea6bb8e2981",

  // 네이버 서치어드바이저 IndexNow 접수 주소
  endpoint: "https://searchadvisor.naver.com/indexnow",
};
