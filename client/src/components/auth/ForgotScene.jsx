import { useMemo } from "react";

const fpCloud = (cx, cy, s, cls) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <g className={`cloud ${cls}`}>
      <g fill="#8fa3b0">
        <circle cx="0" cy="40" r="42" /><circle cx="60" cy="10" r="52" /><circle cx="130" cy="30" r="46" /><circle cx="190" cy="50" r="34" /><rect x="-20" y="40" width="230" height="44" rx="22" />
      </g>
      <g fill="#c4d0d8" opacity=".55"><circle cx="60" cy="0" r="38" /><circle cx="130" cy="18" r="30" /></g>
    </g>
  </g>
);

export default function ForgotScene() {
  const drops = useMemo(
    () => Array.from({ length: 100 }, (_, i) => {
      const far = i % 3 === 0;
      return {
        x: (i * 67) % 700, y: (i * 131) % 460, far,
        len: far ? 12 + ((i * 7) % 10) : 24 + ((i * 7) % 26),
        d: far ? 1.7 + ((i * 13) % 10) / 10 : 0.9 + ((i * 13) % 8) / 10,
        delay: -((i * 37) % 20) / 10,
      };
    }), []);
  return (
    <svg className="scene" viewBox="0 0 630 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="shd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#14506b" /><stop offset="1" stopColor="#0a2f45" /></linearGradient>
      </defs>
      {/* ground + puddles */}
      <path d="M0 640c80-24 200-30 320-22s230 4 310-10v142H0z" fill="#0a3a52" opacity=".8" />
      <ellipse cx="320" cy="640" rx="230" ry="26" fill="#3b86bd" opacity=".55" />
      {[[200, 640, 0], [330, 648, 1], [450, 636, 1.9], [90, 660, .6]].map(([x, y, d], i) => (
        <ellipse key={i} className="ring" cx={x} cy={y} rx="38" ry="8" style={{ animationDelay: d + "s" }} />
      ))}

      {/* shield + lock */}
      <g className="shield">
        <ellipse className="aura" cx="315" cy="410" rx="130" ry="150" />
        <ellipse className="aura" cx="315" cy="410" rx="130" ry="150" style={{ animationDelay: "1.6s" }} />
        <path d="M315 250L430 295V420C430 495 382 540 315 572C248 540 200 495 200 420V295Z" fill="url(#shd)" stroke="#19f7a2" strokeWidth="4" />
        <path d="M315 270L412 307V420C412 484 372 522 315 549C258 522 218 484 218 420V307Z" fill="none" stroke="rgba(25,247,162,.25)" strokeWidth="2" />
        <g className="shackle"><path d="M290 396V372a25 25 0 0150 0V396" fill="none" stroke="#19f7a2" strokeWidth="10" strokeLinecap="round" /></g>
        <rect x="270" y="394" width="90" height="74" rx="14" fill="#19f7a2" />
        <circle cx="315" cy="424" r="9" fill="#0d1b3a" /><rect x="311" y="428" width="8" height="20" rx="3" fill="#0d1b3a" />
      </g>

      {/* flying reset email */}
      <g className="mail">
        <path d="M470 232q-40 20-60 60" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" strokeDasharray="4 6" />
        <rect x="462" y="206" width="74" height="52" rx="8" fill="#fff" />
        <path d="M462 214l37 28 37-28" fill="none" stroke="#1d6a82" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="530" cy="206" r="11" fill="#19f7a2" /><path d="M525 206l4 4 7-8" fill="none" stroke="#04130d" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* key */}
      <g className="key">
        <circle cx="130" cy="452" r="20" fill="none" stroke="#f9c61a" strokeWidth="8" />
        <path d="M148 462l52 28M180 480l8-14M194 488l8-14" fill="none" stroke="#f9c61a" strokeWidth="8" strokeLinecap="round" />
      </g>

      {[[240, 215, 0], [400, 560, .6], [160, 330, 1.2], [500, 400, .3]].map(([x, y, d], i) => (
        <path key={i} className="spark" d={`M${x} ${y - 9}l2.5 6.500 6.500 2.500-6.500 2.500-2.500 6.500-2.500-6.500-6.500-2.500 6.500-2.500z`} fill="#bff7e2" style={{ animationDelay: d + "s", transformBox: "fill-box", transformOrigin: "center" }} />
      ))}

      <g className="rain">
        {drops.map((d, i) => (
          <line key={i} className={d.far ? "far" : ""} x1={d.x} y1={d.y} x2={d.x - 6} y2={d.y + d.len} style={{ animationDuration: d.d + "s", animationDelay: d.delay + "s" }} />
        ))}
      </g>
      {fpCloud(-110, -70, 1.5, "d c")}
      {fpCloud(230, -60, 1.5, "d b")}
      {fpCloud(470, -40, 1.2, "d a")}
      {fpCloud(-40, -10, 1.15, "a")}
      {fpCloud(150, 20, 1.0, "b")}
      {fpCloud(375, 60, 1.05, "a")}
    </svg>
  );
}
