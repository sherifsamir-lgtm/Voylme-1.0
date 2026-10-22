interface WingedVProps {
  size?: number;
  className?: string;
}

export default function WingedV({ size = 58, className = '' }: WingedVProps) {
  const width = size * 3.25;

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 260 70"
      fill="none"
      role="img"
      aria-label="VOYLME — Your Personal Travel Assistant"
      className={className}
    >
      <defs>
        <linearGradient id="voylmeGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff4c7" />
          <stop offset="0.46" stopColor="#f1c45b" />
          <stop offset="1" stopColor="#c88924" />
        </linearGradient>
      </defs>
      <path
        d="M8 17c12-4 24 1 30 11 4-12 12-20 25-24-7 9-10 18-8 29-8-10-19-15-32-13 7 4 11 10 13 18C27 27 18 20 8 17Z"
        fill="url(#voylmeGold)"
      />
      <path
        d="M39 51 25 20c10 1 18 7 25 18L74 7c7-5 15-6 22-3L55 48c-4 5-11 6-16 3Z"
        fill="url(#voylmeGold)"
      />
      <text
        x="82"
        y="42"
        fill="#fff4e8"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="38"
        fontWeight="700"
        letterSpacing="-1.2"
      >
        voylme
      </text>
      <text
        x="84"
        y="60"
        fill="#f1c45b"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="9"
        letterSpacing="1.5"
      >
        YOUR PERSONAL TRAVEL ASSISTANT
      </text>
    </svg>
  );
}
