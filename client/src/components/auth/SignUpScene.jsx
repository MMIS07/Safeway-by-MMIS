
const Pin = ({ x, y, cls }) => (
  <g className={`pin ${cls}`}>
    <path d={`M${x} ${y}c-9.6-9.6-14.4-16.8-14.4-24a14.4 14.4 0 0128.8 0c0 7.2-4.8 14.4-14.4 24z`} fill="#e5483f" />
    <circle cx={x} cy={y - 24} r="5.5" fill="#fff" />
  </g>
);

const Callout = ({ x, y, w, text, cls, tipX, check, delay }) => (
  <g className={`callout-f ${delay ? "d" : ""}`}>
    <g className={`callout ${cls}`}>
      <rect x={x} y={y} width={w} height="34" rx="8" fill="#fff" />
      <path d={`M${tipX - 8} ${y + 33}l8 10 8-10z`} fill="#fff" />
      {check && (<><circle cx={x + 20} cy={y + 17} r="8" fill="#20c997" /><path d={`M${x + 16} ${y + 17}l3 3 5-6`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></>)}
      <text x={x + (check ? 35 : 12)} y={y + 22} fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif" fill="#1b2a38">{text}</text>
    </g>
  </g>
);

export default function SignUpScene() {
  const wave = "M180 452q20-10 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0V540H180z";
  return (
    <svg className="scene" viewBox="0 0 630 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><clipPath id="scr"><rect x="259" y="136" width="182" height="370" rx="24" /></clipPath></defs>
      {/* background blobs & ground */}
      <path d="M105 330c-20-60 30-95 70-85 30-30 70-10 80 40v230H90c-10-60-5-130 15-185z" fill="#0a5470" opacity=".7" />
      <path d="M480 300c40-30 90-10 90 40 10 50-10 110-40 150H470z" fill="#0a5470" opacity=".7" />
      <ellipse cx="318" cy="514" rx="250" ry="22" fill="#082a40" opacity=".75" />
      {[[140, 516, 0], [320, 524, 1.2], [500, 516, 2.1]].map(([x, y, d], i) => (
        <ellipse key={i} className="ring" cx={x} cy={y} rx="46" ry="8" style={{ animationDelay: d + "s" }} />
      ))}
      {[[60, 700, 6, 7], [220, 720, 4, 9], [420, 710, 5, 8], [570, 730, 4, 10], [340, 740, 3, 6]].map(([x, y, r, d], i) => (
        <circle key={i} className="bub" cx={x} cy={y} r={r} style={{ animationDuration: d + "s", animationDelay: -i * 1.5 + "s" }} />
      ))}

      {/* phone */}
      <g className="phone">
        <rect x="250" y="122" width="200" height="396" rx="36" fill="#102a3e" stroke="#1d4a63" strokeWidth="3" />
        <g clipPath="url(#scr)">
          <rect x="259" y="136" width="182" height="370" fill="#eceeee" />
          <rect x="320" y="160" width="46" height="22" rx="6" fill="#cfe6c0" />
          <rect x="392" y="282" width="44" height="30" rx="8" fill="#cfe6c0" />
          <rect x="275" y="380" width="40" height="26" rx="6" fill="#d8ebcc" />
          <path d="M262 180C300 215 286 250 286 282C286 322 262 334 262 376" stroke="#a9d3f2" strokeWidth="16" fill="none" />
          <g stroke="#fff" strokeWidth="6" fill="none">
            <path d="M259 230L441 200M259 300L441 330M259 380L441 360M330 136L300 506M400 136L420 506M355 215L441 250M259 440L441 420" />
          </g>
          <g stroke="#dde1e1" strokeWidth="2" fill="none"><path d="M259 260L441 270M300 136L350 506M270 340L441 300" /></g>
          <g className="waves"><path d={wave} fill="#5aa9dc" transform="translate(-80 0)" /></g>
          <g className="waves b"><path d={wave} fill="#8cc6ec" opacity=".7" transform="translate(-80 14)" /></g>
          <path className="route" pathLength="1" d="M353 411C318 385 322 335 358 312C374 302 380 290 378 276" />
          <path className="route r2" pathLength="1" d="M294 262C300 275 320 275 345 275" />
          <path className="route r3" pathLength="1" d="M345 275C350 240 355 205 363 178" />
          <circle cx="363" cy="178" r="5" fill="#0b4f7a" />
          <circle className="dot" cx="353" cy="411" r="7" fill="#1fcf9a" opacity=".6" />
          <circle cx="353" cy="411" r="7" fill="#1fcf9a" stroke="#fff" strokeWidth="1.5" />
          <Pin x={293} y={262} cls="p1" />
          <Pin x={378} y={288} cls="p2" />
          <g className="warn">
            <path d="M394 412L371 452H417z" fill="#e5483f" stroke="#e5483f" strokeWidth="6" strokeLinejoin="round" />
            <path d="M394 425v13" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" /><circle cx="394" cy="445" r="2.2" fill="#fff" />
          </g>
        </g>
        <rect x="322" y="122" width="56" height="16" rx="8" fill="#102a3e" />
      </g>

      {/* woman */}
      <g className="person">
        <rect x="148" y="322" width="28" height="56" rx="10" fill="#1c2b38" />
        <polygon points="172,380 194,380 176,442 156,500 138,494" fill="#1f2a35" />
        <polygon points="190,380 212,380 216,500 196,500" fill="#26323f" />
        <rect x="190" y="498" width="30" height="12" rx="5" fill="#1b1b1b" /><rect x="190" y="506" width="30" height="4" rx="2" fill="#fff" />
        <rect x="134" y="494" width="28" height="12" rx="5" fill="#1b1b1b" /><rect x="134" y="502" width="28" height="4" rx="2" fill="#fff" />
        <path d="M170 330Q191 320 213 330L211 384H172z" fill="#20c997" />
        <g className="case">
          <line x1="158" y1="396" x2="128" y2="436" stroke="#17a07a" strokeWidth="4" />
          <rect x="78" y="430" width="56" height="78" rx="10" fill="#22d3a0" transform="rotate(-20 106 469)" />
          <rect x="92" y="440" width="6" height="56" rx="3" fill="#17a07a" transform="rotate(-20 106 469)" />
        </g>
        <line x1="176" y1="342" x2="158" y2="396" stroke="#f0b48a" strokeWidth="8" strokeLinecap="round" />
        <line x1="176" y1="342" x2="170" y2="358" stroke="#20c997" strokeWidth="12" strokeLinecap="round" />
        <g className="ticket">
          <line x1="208" y1="338" x2="230" y2="304" stroke="#f0b48a" strokeWidth="8" strokeLinecap="round" />
          <line x1="208" y1="338" x2="216" y2="326" stroke="#20c997" strokeWidth="12" strokeLinecap="round" />
          <rect x="226" y="288" width="18" height="13" rx="2" fill="#fff" transform="rotate(-20 235 294)" />
        </g>
        <circle cx="191" cy="306" r="15" fill="#f0b48a" />
        <path d="M175 305Q176 286 193 288Q211 290 207 307Q200 297 189 298Q181 300 175 305z" fill="#151515" />
      </g>

      {/* man */}
      <g className="person m">
        <rect x="526" y="318" width="32" height="68" rx="11" fill="#1c2b38" />
        <polygon points="490,384 512,384 508,502 488,502" fill="#1f2a35" />
        <polygon points="512,384 530,384 536,502 516,502" fill="#26323f" />
        <rect x="478" y="498" width="30" height="12" rx="5" fill="#1b1b1b" /><rect x="520" y="498" width="30" height="12" rx="5" fill="#1b1b1b" />
        <path d="M488 326Q509 318 531 326L529 388H490z" fill="#20c997" />
        <line x1="530" y1="340" x2="534" y2="374" stroke="#e0a37a" strokeWidth="8" strokeLinecap="round" />
        <line x1="530" y1="340" x2="531" y2="354" stroke="#20c997" strokeWidth="12" strokeLinecap="round" />
        <g className="point">
          <line x1="490" y1="338" x2="458" y2="326" stroke="#e0a37a" strokeWidth="8" strokeLinecap="round" />
          <line x1="490" y1="338" x2="478" y2="333" stroke="#20c997" strokeWidth="12" strokeLinecap="round" />
        </g>
        <circle cx="509" cy="298" r="15" fill="#e0a37a" />
        <path d="M493 297Q495 280 509 281Q525 282 524 298Q516 290 505 292Q497 293 493 297z" fill="#1b1b1b" />
      </g>

      <Callout x={105} y={184} w={200} text="Avoid Waterlogged Roads" cls="c1" tipX={290} check />
      <Callout x={368} y={211} w={192} text="Map and real-time updates" cls="c2" tipX={382} delay />
    </svg>
  );
}
