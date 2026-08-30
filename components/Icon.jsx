// 이모지 대신 쓰는 심플한 라인 아이콘 세트입니다. name으로 골라 씁니다.

const PATHS = {
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.2 13.9 7 22l5-2.5L17 22l-1.2-8.1" />
    </>
  ),
  check: (
    <>
      <path d="M21 11.5A9.5 9.5 0 1 1 12 2c1.7 0 3.3.4 4.7 1.2" />
      <path d="M9 11.5l2.5 2.5L20 5.5" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
      <circle cx="8" cy="8" r="3.5" />
      <path d="M21.5 20v-1.5a3.7 3.7 0 0 0-2.7-3.6" />
      <path d="M15 4.3a3.7 3.7 0 0 1 0 7.1" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M20.5 20.5 15.7 15.7" />
    </>
  ),
  tool: (
    <path d="M13.7 6.3a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l3.5-3.5a5.5 5.5 0 0 1-7.3 7.3L6.7 21.3a2 2 0 0 1-2.8-2.8L11.1 11a5.5 5.5 0 0 1 7.3-7.3l-3.5 3.5Z" />
  ),
  shield: (
    <path d="M12 21.5s7.5-3.6 7.5-9.5V5.6L12 2.5 4.5 5.6V12c0 5.9 7.5 9.5 7.5 9.5Z" />
  ),
  clipboard: (
    <>
      <rect x="4.5" y="4" width="15" height="17" rx="2" />
      <rect x="8.5" y="2" width="7" height="4" rx="1" />
      <path d="M8.5 11h7M8.5 15h7" />
    </>
  ),
};

export default function Icon({ name, size = 26, color = "var(--signal-deep)" }) {
  const content = PATHS[name] || PATHS.check;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {content}
    </svg>
  );
}
