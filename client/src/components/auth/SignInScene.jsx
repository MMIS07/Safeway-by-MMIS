import { useMemo } from "react";

export default function SignInScene() {
  const drops = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => {
        const far = i % 3 === 0;
        const x = (i * 67) % 700;
        const y = (i * 131) % 460;
        const len = far ? 12 + ((i * 7) % 10) : 24 + ((i * 7) % 26);
        const d = far ? 1.7 + ((i * 13) % 10) / 10 : 0.9 + ((i * 13) % 8) / 10;
        return { x, y, len, far, d, delay: -((i * 37) % 20) / 10 };
      }),
    []
  );
  const cloud = (cx, cy, s, cls) => (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <g className={`cloud ${cls}`}>
      <g fill="#8fa3b0">
        <circle cx="0" cy="40" r="42" /><circle cx="60" cy="10" r="52" /><circle cx="130" cy="30" r="46" /><circle cx="190" cy="50" r="34" /><rect x="-20" y="40" width="230" height="44" rx="22" />
      </g>
      <g fill="#c4d0d8" opacity=".55"><circle cx="60" cy="0" r="38" /><circle cx="130" cy="18" r="30" /></g>
    </g>
    </g>
  );
  const grid = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const y = 250 + 520 * t * t;
    grid.push(<line key={"h" + i} x1="0" x2="616" y1={y} y2={y} />);
  }
  for (let i = -8; i <= 18; i++) {
    grid.push(<line key={"v" + i} x1={308 + (i - 5) * 22} y1="250" x2={308 + (i - 5) * 95} y2="751" />);
  }
  return (
    <svg className="scene" viewBox="0 0 616 751" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="pud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7cc0ea" stopOpacity=".85" /><stop offset="1" stopColor="#3b86bd" stopOpacity=".8" />
        </linearGradient>
      </defs>
      <g stroke="rgba(120,200,215,.22)" strokeWidth="1.5">{grid}</g>
      <g fill="url(#pud)">
        <path className="puddle" d="M5 345c20-14 70-20 115-12 55-6 100 8 95 22-8 14-60 14-100 12-40 8-90 2-110-22z" />
        <path className="puddle" d="M398 308c20-10 65-12 95-4 25 4 40 10 30 18-20 8-70 8-105 4-18-4-28-12-20-18z" />
        <path className="puddle" d="M300 470c40-30 150-40 240-30 40 5 76 4 76 20v70H275c-10-20 0-40 25-60z" />
        <path className="puddle" d="M60 462c15-10 45-12 62-4 12 6 8 20-10 26-20 4-52 6-62-4-6-6-2-14 10-18z" />
        <path className="puddle" d="M85 535c18-6 50-6 60 2 4 8-22 12-48 10-20-1-26-8-12-12z" />
      </g>
      <g>
        {[[110, 352, 0], [450, 314, 0.7], [400, 500, 1.4], [520, 478, 0.3], [95, 472, 1.1], [340, 520, 1.9], [120, 540, 0.5]].map(([x, y, dl], i) => (
          <g key={i}>
            <ellipse className="ring" cx={x} cy={y} rx="22" ry="6" style={{ animationDelay: dl + "s" }} />
            <ellipse className="ring" cx={x} cy={y} rx="22" ry="6" style={{ animationDelay: dl + 1.2 + "s" }} />
          </g>
        ))}
      </g>
      <g className="rain">
        {drops.map((d, i) => (
          <line key={i} className={d.far ? "far" : ""} x1={d.x} y1={d.y} x2={d.x - 6} y2={d.y + d.len} style={{ animationDuration: d.d + "s", animationDelay: d.delay + "s" }} />
        ))}
      </g>
      <path className="route" pathLength="1" d="M157 422 L175 365 L298 365 L298 340 L458 340 L445 312" />
      <path className="route two" pathLength="1" d="M157 422 L430 430 L447 495 L525 495" />
      <circle className="dot" cx="157" cy="422" r="7" fill="#e24b4b" opacity=".6" />
      <ellipse cx="157" cy="422" rx="8" ry="6" fill="#d83a3a" stroke="#fff" strokeWidth="1.5" />
      <g className="pin p1"><g className="pin-float">
        <path d="M468 296c-14-14-22-24-22-36a22 22 0 0144 0c0 12-8 22-22 36z" fill="#d94a45" />
        <circle cx="468" cy="262" r="8" fill="#6b2c33" />
      </g></g>
      <g className="pin p2"><g className="pin-float" style={{ animationDelay: "4.4s" }}>
        <path d="M526 478c-22-22-36-38-36-58a36 36 0 0172 0c0 20-14 36-36 58z" fill="#e0504a" />
        <circle cx="526" cy="425" r="14" fill="#fff" />
      </g></g>
      {cloud(-110, -70, 1.5, "d c")}
      {cloud(230, -60, 1.5, "d b")}
      {cloud(470, -40, 1.2, "d a")}
      {cloud(-40, -10, 1.15, "a")}
      {cloud(150, 20, 1.0, "b")}
      {cloud(375, 60, 1.05, "a")}
      <g className="bolt" fill="#f9c61a" stroke="#ffe27a" strokeWidth="2">
        <path d="M498 110l-34 48 20 4-22 52 52-66-22-4z" />
      </g>
      <g className="sp-searchsvg">
        <rect x="66" y="236" width="298" height="47" rx="10" fill="#e9edf0" />
        <text x="81" y="266" fontSize="19" fontFamily="Roboto, sans-serif" fill="#4a5560">Search routes...</text>
        <rect x="318" y="240" width="40" height="40" rx="7" fill="#6b7d8b" />
        <circle cx="335" cy="257" r="7" fill="none" stroke="#fff" strokeWidth="2.5" />
        <path d="M340 262l7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
