export const EyeIcon = ({ off }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M3 3l18 18" />}
  </svg>
);

export const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export const WaterSplash = ({ flip, id }) => (
  <svg viewBox="0 0 200 200" style={flip ? { transform: "scaleY(-1)" } : undefined} width="100%" height="100%">
    <defs>
      <linearGradient id={id} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bfe6ff" /><stop offset=".5" stopColor="#4aa6e8" /><stop offset="1" stopColor="#12356b" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M200 0v150c-20-10-30-30-55-30 12-15 5-35-10-45 20 0 30-20 25-40 10 15 25 15 40 5V0z" fill={`url(#${id})`} opacity=".9" />
    <path d="M200 0v90c-15-8-18-25-35-30 8-12 2-30-12-40z" fill="#e8f6ff" opacity=".6" />
    {[[120, 60, 3], [105, 95, 2.5], [90, 40, 2], [140, 140, 3], [70, 80, 1.8], [160, 175, 2]].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="#cfeaff" opacity=".85" />
    ))}
  </svg>
);
