export const Logo = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 140 40" className={className} fill="none">
    <text x="0" y="28" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="28">
      <tspan fill="url(#brandGradient)">A</tspan>
      <tspan fill="currentColor">ppEx</tspan>
    </text>
    <defs>
      <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);
