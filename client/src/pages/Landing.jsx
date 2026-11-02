import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

/* =====================================================================
   SAFEWAY LANDING PAGE  (React + CSS in ONE file)
   ---------------------------------------------------------------------
   Where to edit things:
   1. landingImages  -> change image paths (one line per image)
   2. landingRoutes  -> change where buttons and links go
   3. CSS variables  -> search for ".sw-landing" and "[data-theme" in
                        the CSS string at the bottom to change colors
   Theme: the header uses your project's <ThemeToggle /> component. The page
   follows your app's global theme by watching the "dark" class on <html>.
   ===================================================================== */

/* ---------- 1. IMAGES (edit these paths) ---------- */
// If an image is missing or fails to load, a built-in illustration
// is shown instead, so the page never shows a broken image.
// Put your files in the Vite "public/images" folder, or change the paths.
const landingImages = {
  heroMap: null, // null = use the built-in SVG map
  waterlogging: "/images/waterlogging.jpg",
  blockedRoad: "/images/blocked-road.jpg",
  floodAlert: "/images/flood-alert.jpg",
  ctaBackground: "/images/safe-road-banner.jpg",
};

/* ---------- 2. ROUTES (edit these to match your router) ---------- */
// Normal links are used on purpose, so this file works with any router
// setup and needs no extra imports. Replace the paths with your real ones.
const landingRoutes = {
  home: "/",
  login: "/login",
  register: "/signup",
  map: "/navigate",
  report: "/report",
  community: "/dashboard", // no community route exists yet
  communityReports: "/dashboard",
  sos: "/report", // no SOS route exists yet
  trackReport: "/my-reports",
  thresholds: "/settings",
  about: "#", // no About page yet
  privacy: "#", // no Privacy page yet
  terms: "#", // no Terms page yet
};

/* ---------- Page content ---------- */
const navLinks = [
  { label: "Home", href: landingRoutes.home, active: true },
  { label: "Track Report", href: landingRoutes.trackReport },
  { label: "Thresholds", href: landingRoutes.thresholds },
];

const featureCards = [
  {
    id: "map",
    title: "Interactive Road map",
    color: "blue",
    icon: "map",
    href: landingRoutes.map,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  {
    id: "community",
    title: "Community Alert",
    color: "teal",
    icon: "users",
    href: landingRoutes.community,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  {
    id: "sos",
    title: "Emergency SOS",
    color: "red",
    icon: "siren",
    href: landingRoutes.sos,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
];

const recentUpdates = [
  {
    id: "waterlogging",
    badge: "Waterlogging",
    badgeColor: "blue",
    image: landingImages.waterlogging,
    imageAlt: "Cars driving through a waterlogged road",
    location: "Broadway St",
    time: "2h ago",
    title: "Heavy Waterlogging on Broadway Street",
    scene: "flood",
  },
  {
    id: "blocked",
    badge: "Blocked Road",
    badgeColor: "red",
    image: landingImages.blockedRoad,
    imageAlt: "Road blocked by red and white barriers",
    location: "Main St",
    time: "3h ago",
    title: "Road Blocked at Main Street",
    scene: "blocked",
  },
  {
    id: "flood",
    badge: "Flood Alert",
    badgeColor: "yellow",
    image: landingImages.floodAlert,
    imageAlt: "Flooded urban street in the rain",
    location: "Elm Ave",
    time: "6h ago",
    title: "Severe Flooding on Elm Avenue",
    scene: "flood",
  },
];

const quickLinks = [
  { label: "Home", href: landingRoutes.home },
  { label: "Track Report", href: landingRoutes.trackReport },
  { label: "Thresholds", href: landingRoutes.thresholds },
  { label: "Community Reports", href: landingRoutes.communityReports },
  { label: "About Us", href: landingRoutes.about },
];

const legalLinks = [
  { label: "Privacy Policy", href: landingRoutes.privacy },
  { label: "Terms & Conditions", href: landingRoutes.terms },
];

const socialLinks = [
  { label: "Facebook", icon: "facebook" },
  { label: "X (Twitter)", icon: "x" },
  { label: "Instagram", icon: "instagram" },
  { label: "YouTube", icon: "youtube" },
  { label: "LinkedIn", icon: "linkedin" },
];

/* ---------- Small helpers ---------- */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Read the app's global theme (adds/removes the "dark" class on <html>)
function readAppTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark") || html.dataset.theme === "dark";
  return isDark ? "dark" : "light";
}

// Follows the global theme. It only READS it and never changes it.
function useAppTheme() {
  const [theme, setTheme] = useState(readAppTheme);
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readAppTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return theme;
}

// Internal paths use React Router <Link>; "#" or full URLs use a plain <a>
function SiteLink({ to, children, ...props }) {
  if (to.startsWith("/")) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}

// Returns true only when an image file loads successfully
function useImageLoads(src) {
  const [loads, setLoads] = useState(false);
  useEffect(() => {
    if (!src) return undefined;
    let cancelled = false;
    const probe = new Image();
    probe.onload = () => {
      if (!cancelled) setLoads(true);
    };
    probe.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);
  return loads;
}

// Reveals elements with the class "sw-reveal" when they scroll into view
function useScrollReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // No animation support or reduced motion: leave everything visible
    if (reduceMotion || !("IntersectionObserver" in window)) return undefined;

    root.classList.add("sw-anim");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    root.querySelectorAll(".sw-reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("sw-anim");
    };
  }, [rootRef]);
}

/* ---------- Icons (inline SVG, no extra packages) ---------- */
function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 16.8 15.8 7.2M8.5 18h7" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v.7A6.5 6.5 0 0 1 18.5 10.5v3.2l1.7 2.5a1 1 0 0 1-.8 1.55H4.6a1 1 0 0 1-.8-1.55l1.7-2.5v-3.2A6.5 6.5 0 0 1 10.5 4.2v-.7A1.5 1.5 0 0 1 12 2Zm-2.2 17h4.4a2.2 2.2 0 0 1-4.4 0Z" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20V6.5Z" />
          <path d="M9 4v13.5M15 6.5V20" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" />
          <circle cx="5.5" cy="10" r="2.2" />
          <circle cx="18.5" cy="10" r="2.2" />
          <path d="M6.5 19v-1a5.5 5.5 0 0 1 11 0v1M1.5 17.5v-.5a3.5 3.5 0 0 1 3.5-3.5M22.5 17.5v-.5a3.5 3.5 0 0 0-3.5-3.5" />
        </svg>
      );
    case "siren":
      return (
        <svg {...common}>
          <path d="M7 18v-6a5 5 0 0 1 10 0v6M5 21h14M4 18h16v3H4zM12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4M2 12h2M20 12h2" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2a7.5 7.5 0 0 0-7.5 7.5C4.5 15.2 12 22 12 22s7.5-6.8 7.5-12.5A7.5 7.5 0 0 0 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3Zm-1.2 13.2-3-3 1.4-1.4 1.6 1.6 4-4 1.4 1.4-5.4 5.4Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3C16.7 2.3 15.7 2.2 14.6 2.2 12.2 2.2 10.5 3.700 10.500 6.400v2.100H8v3.400h2.500V21.800H14V11.900h2.600l.4-3.400H14Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M5 4.500 19 19.500M19 4.500 5 19.500" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.8" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800ZM10 15V9l5.200 3L10 15Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M4 9h3.500v11H4V9Zm1.750-5.500a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM10 9h3.300v1.500h.1c.5-.9 1.600-1.800 3.300-1.800 3.500 0 4.100 2.300 4.100 5.300V20h-3.500v-5.200c0-1.200 0-2.800-1.700-2.800s-2 1.300-2 2.700V20H10V9Z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- Logo (location pin) ---------- */
function Logo() {
  return (
    <svg
      className="sw-logo-pin"
      width="34"
      height="38"
      viewBox="0 0 34 38"
      aria-hidden="true"
    >
      <path
        d="M17 1C8.700 1 2 7.600 2 15.800 2 26.500 17 37 17 37s15-10.500 15-21.200C32 7.600 25.300 1 17 1Z"
        fill="currentColor"
      />
      <circle cx="17" cy="15.500" r="6.500" fill="var(--sw-bg)" />
      <circle cx="17" cy="15.500" r="2.800" fill="currentColor" />
    </svg>
  );
}

/* ---------- Built-in SVG map for the hero ---------- */
function HeroMap() {
  return (
    <svg
      className="sw-map-svg"
      viewBox="0 0 520 320"
      role="img"
      aria-label="Map showing a blue route with waterlogged and blocked roads marked along the way"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Base, green areas and river */}
      <rect width="520" height="320" className="sw-map-ground" />
      <path d="M0 215 C40 195 90 210 120 250 L100 320 L0 320Z" className="sw-map-green" />
      <path d="M330 0 H520 V60 C470 70 420 40 330 0Z" className="sw-map-green" />
      <path d="M470 120 C500 110 520 125 520 150 V210 C495 200 470 170 470 120Z" className="sw-map-green" />
      <path d="M62 0 C95 70 40 120 75 190 C95 235 110 280 120 320" className="sw-map-water" fill="none" strokeWidth="26" strokeLinecap="round" />

      {/* Roads */}
      <g className="sw-map-roads" fill="none" strokeLinecap="round">
        <path d="M0 95 L520 80" strokeWidth="6" />
        <path d="M0 175 L520 190" strokeWidth="6" />
        <path d="M0 270 L520 255" strokeWidth="6" />
        <path d="M150 0 L170 320" strokeWidth="6" />
        <path d="M300 0 L285 320" strokeWidth="6" />
        <path d="M440 0 L455 320" strokeWidth="6" />
        <path d="M0 40 L240 140 L520 300" strokeWidth="4" />
        <path d="M200 0 L330 120 L520 140" strokeWidth="4" />
      </g>

      {/* Blue route */}
      <path
        d="M96 44 L180 58 L209 166 L288 178 L311 246 L412 256 L424 258"
        className="sw-map-route"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Start marker */}
      <circle cx="96" cy="44" r="17" className="sw-map-start-ring" />
      <circle cx="96" cy="44" r="12" className="sw-map-start" />
      <circle cx="96" cy="44" r="4.500" fill="#fff" />

      {/* Destination marker */}
      <ellipse cx="424" cy="276" rx="14" ry="5" className="sw-map-dest-shadow" />
      <path
        d="M424 276C416 266 408 258 408 247a16 16 0 0 1 32 0c0 11-8 19-16 29Z"
        className="sw-map-dest"
      />
      <circle cx="424" cy="247" r="6" fill="#fff" />

      {/* Hazard: medium waterlogging (left) */}
      <rect x="43" y="98" width="92" height="40" rx="8" className="sw-map-label-green" />
      <text x="89" y="115" textAnchor="middle" className="sw-map-label-text sw-dark-text">
        <tspan x="89" dy="0">Medium</tspan>
        <tspan x="89" dy="14">Waterlogging</tspan>
      </text>
      <circle cx="88" cy="150" r="8" className="sw-map-dot-green" />

      {/* Hazard: blocked road (top right) */}
      <rect x="345" y="86" width="62" height="40" rx="8" className="sw-map-label-red" />
      <text x="376" y="103" textAnchor="middle" className="sw-map-label-text sw-light-text">
        <tspan x="376" dy="0">Blocked</tspan>
        <tspan x="376" dy="14">Road</tspan>
      </text>
      <circle cx="378" cy="138" r="8" className="sw-map-dot-red" />

      {/* Hazard: medium waterlogging (right) */}
      <rect x="388" y="163" width="92" height="40" rx="8" className="sw-map-label-green" />
      <text x="434" y="180" textAnchor="middle" className="sw-map-label-text sw-dark-text">
        <tspan x="434" dy="0">Medium</tspan>
        <tspan x="434" dy="14">Waterlogging</tspan>
      </text>
      <circle cx="432" cy="217" r="8" className="sw-map-dot-green" />

      {/* Hazard: waterlogged and blocked (bottom) */}
      <rect x="190" y="232" width="104" height="40" rx="8" className="sw-map-label-red" />
      <text x="242" y="249" textAnchor="middle" className="sw-map-label-text sw-light-text">
        <tspan x="242" dy="0">Waterlogging/</tspan>
        <tspan x="242" dy="14">Blocked Roads</tspan>
      </text>
      <path d="M205 300 L238 286" className="sw-map-hazard-line" strokeWidth="4" strokeLinecap="round" />
      <circle cx="243" cy="285" r="8" className="sw-map-dot-red" />
    </svg>
  );
}

/* ---------- Photo with built-in illustration fallback ---------- */
function UpdatePhoto({ src, alt, scene }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        className="sw-photo"
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  // Fallback illustration (shown when the image is missing)
  return (
    <svg
      className="sw-photo sw-photo-fallback"
      viewBox="0 0 300 130"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
    >
      <rect width="300" height="130" className="sw-scene-sky" />
      <rect x="10" y="30" width="40" height="70" className="sw-scene-building" />
      <rect x="58" y="14" width="34" height="86" className="sw-scene-building" />
      <rect x="210" y="22" width="38" height="78" className="sw-scene-building" />
      <rect x="254" y="38" width="40" height="62" className="sw-scene-building" />
      <polygon points="100,100 200,100 300,130 0,130" className="sw-scene-road" />
      <polygon points="40,112 260,112 300,130 0,130" className="sw-scene-water" />
      <path d="M60 118 H110 M150 122 H220 M90 126 H140" className="sw-scene-ripple" strokeWidth="2" strokeLinecap="round" />
      {scene === "blocked" && (
        <g>
          <rect x="85" y="84" width="130" height="14" rx="3" className="sw-scene-barrier-white" />
          <path d="M95 84 l10 14 M115 84 l10 14 M135 84 l10 14 M155 84 l10 14 M175 84 l10 14 M195 84 l10 14" className="sw-scene-barrier-red" strokeWidth="6" />
          <rect x="95" y="98" width="4" height="12" className="sw-scene-barrier-leg" />
          <rect x="201" y="98" width="4" height="12" className="sw-scene-barrier-leg" />
        </g>
      )}
      {scene === "flood" && (
        <g>
          <rect x="128" y="94" width="44" height="14" rx="6" className="sw-scene-car" />
          <rect x="136" y="88" width="28" height="10" rx="4" className="sw-scene-car" />
        </g>
      )}
    </svg>
  );
}

/* =====================================================================
   MAIN COMPONENT
   ===================================================================== */
export default function Landing() {
  const rootRef = useRef(null);
  const theme = useAppTheme();
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState({
    type: "",
    text: "",
  });
  const ctaImageLoads = useImageLoads(landingImages.ctaBackground);

  useScrollReveal(rootRef);

  // Newsletter: checks the email format only (no server is contacted)
  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setNewsletterMessage({ type: "error", text: "Please enter your email address." });
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setNewsletterMessage({
        type: "error",
        text: "That email looks incorrect. Try name@example.com.",
      });
      return;
    }
    setNewsletterMessage({
      type: "success",
      text: "Email looks good. Newsletter sign-up is not connected to a server yet.",
    });
    setEmail("");
  }

  const ctaStyle = {
    "--sw-cta-image":
      ctaImageLoads && landingImages.ctaBackground
        ? `url("${landingImages.ctaBackground}")`
        : "none",
  };

  return (
    <div className="sw-landing" data-theme={theme} ref={rootRef}>
      <style>{landingCss}</style>

      {/* ============ HEADER ============ */}
      <header className="sw-header">
        <div className="sw-header-inner">
          <SiteLink className="sw-brand" to={landingRoutes.home} aria-label="Safeway home">
            <Logo />
            <span>Safeway</span>
          </SiteLink>

          <nav className="sw-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <SiteLink
                key={link.label}
                className={`sw-nav-link${link.active ? " is-active" : ""}`}
                to={link.href}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </SiteLink>
            ))}
          </nav>

          <div className="sw-header-actions">
            <SiteLink className="sw-btn sw-btn-sm sw-btn-ghost" to={landingRoutes.login}>
              Login
            </SiteLink>
            <SiteLink className="sw-btn sw-btn-sm sw-btn-dark" to={landingRoutes.register}>
              Register
            </SiteLink>
            <span className="sw-theme-slot">
              <ThemeToggle />
            </span>
          </div>
        </div>
      </header>

      <main className="sw-page">
        {/* ============ A. HERO ============ */}
        <section className="sw-hero" aria-labelledby="sw-hero-title">
          <div className="sw-hero-map">
            {landingImages.heroMap ? (
              <img src={landingImages.heroMap} alt="Map of safe routes and flooded roads" />
            ) : (
              <HeroMap />
            )}
          </div>

          <div className="sw-hero-content">
            <span className="sw-badge">
              <Icon name="shield" size={14} />
              Safer Roads, Stronger Communities
            </span>
            <h1 id="sw-hero-title" className="sw-hero-title">
              Reach Your Destination Fast
            </h1>
            <p className="sw-hero-text">
              Find safe routes, avoid waterlogged and blocked roads, and see
              alerts from your community before you leave. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
            <div className="sw-hero-buttons">
              <SiteLink className="sw-btn sw-btn-dark" to={landingRoutes.map}>
                <Icon name="route" size={20} />
                Check Routes
                <Icon name="arrow" size={16} />
              </SiteLink>
              <SiteLink className="sw-btn sw-btn-soft" to={landingRoutes.report}>
                <Icon name="bell" size={20} />
                Report an alert
              </SiteLink>
            </div>
          </div>
        </section>

        {/* ============ B. TRAVEL FAST ============ */}
        <section className="sw-features" aria-labelledby="sw-features-title">
          <h2 id="sw-features-title" className="sw-section-title sw-reveal">
            Travel Fast, With Safeway
          </h2>
          <p className="sw-section-text sw-reveal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>

          <div className="sw-feature-list">
            {featureCards.map((card, index) => (
              <article
                key={card.id}
                className="sw-feature-card sw-reveal"
                style={{ "--sw-delay": `${index * 140}ms` }}
              >
                <div className={`sw-feature-icon sw-feature-icon--${card.color}`}>
                  <Icon name={card.icon} size={36} />
                </div>
                <div className="sw-feature-body">
                  <h3 className="sw-feature-title">{card.title}</h3>
                  <p className="sw-feature-text">{card.text}</p>
                </div>
                <SiteLink
                  className="sw-round-arrow"
                  to={card.href}
                  aria-label={`Open ${card.title}`}
                >
                  <Icon name="arrow" size={18} />
                </SiteLink>
              </article>
            ))}
          </div>
        </section>

        {/* ============ C. RECENT UPDATES ============ */}
        <section className="sw-updates" aria-labelledby="sw-updates-title">
          <div className="sw-updates-head sw-reveal">
            <h2 id="sw-updates-title" className="sw-section-title">
              Recent Updates
            </h2>
            <SiteLink className="sw-view-more" to={landingRoutes.communityReports}>
              View more
              <Icon name="arrow" size={16} />
            </SiteLink>
          </div>

          <div className="sw-updates-grid">
            {recentUpdates.map((item, index) => (
              <article
                key={item.id}
                className="sw-update-card sw-reveal"
                style={{ "--sw-delay": `${index * 120}ms` }}
              >
                <div className="sw-update-media">
                  <UpdatePhoto src={item.image} alt={item.imageAlt} scene={item.scene} />
                  <span className={`sw-update-badge sw-update-badge--${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="sw-update-body">
                  <div className="sw-update-meta">
                    <span className="sw-meta-item">
                      <Icon name="pin" size={15} />
                      {item.location}
                    </span>
                    <span className="sw-meta-item sw-meta-time">
                      <Icon name="clock" size={14} />
                      {item.time}
                    </span>
                  </div>
                  <h3 className="sw-update-title">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ============ D. CALL TO ACTION ============ */}
      <section className="sw-cta sw-reveal" style={ctaStyle} aria-labelledby="sw-cta-title">
        <div className="sw-cta-content">
          <h2 id="sw-cta-title" className="sw-cta-title">
            Every Journey Deserves a safer Route
          </h2>
          <p className="sw-cta-text">
            Reach your destination safely and avoid waterlogged roads. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="sw-cta-buttons">
            <SiteLink className="sw-btn sw-btn-white" to={landingRoutes.map}>
              <Icon name="route" size={20} />
              Explore Route
              <Icon name="arrow" size={16} />
            </SiteLink>
            <SiteLink className="sw-btn sw-btn-outline" to={landingRoutes.community}>
              <Icon name="users" size={20} />
              Visit community
            </SiteLink>
          </div>
        </div>
      </section>

      {/* ============ E. FOOTER ============ */}
      <footer className="sw-footer">
        <div className="sw-footer-grid">
          <div className="sw-footer-brand">
            <SiteLink className="sw-brand" to={landingRoutes.home} aria-label="Safeway home">
              <Logo />
              <span>Safeway</span>
            </SiteLink>
            <p className="sw-footer-tagline">Safer Roads. Stronger Communities.</p>
            <ul className="sw-social-list">
              {socialLinks.map((social) => (
                <li key={social.icon}>
                  <a className="sw-social" href="#top" aria-label={social.label}>
                    <Icon name={social.icon} size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="sw-footer-col" aria-label="Quick links">
            <h4 className="sw-footer-heading">Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <SiteLink to={link.href}>{link.label}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="sw-footer-col" aria-label="Legal">
            <h4 className="sw-footer-heading">Legal</h4>
            <ul>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <SiteLink to={link.href}>{link.label}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sw-footer-col sw-newsletter">
            <h4 className="sw-footer-heading">Stay Informed</h4>
            <p>Get the latest updates and alerts in your area.</p>
            <form className="sw-newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
              <label className="sw-visually-hidden" htmlFor="sw-newsletter-email">
                Email address
              </label>
              <input
                id="sw-newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby="sw-newsletter-message"
                autoComplete="email"
              />
              <button type="submit" aria-label="Subscribe to updates">
                <Icon name="arrow" size={16} />
              </button>
            </form>
            <p
              id="sw-newsletter-message"
              className={`sw-newsletter-message sw-newsletter-message--${newsletterMessage.type}`}
              role="status"
            >
              {newsletterMessage.text}
            </p>
          </div>
        </div>

        <div className="sw-footer-bottom">
          <span>© 2026 Safeway. All rights reserved.</span>
          <span className="sw-footer-safe">
            <Icon name="shield" size={16} />
            Together for a safer tomorrow.
          </span>
        </div>
      </footer>
    </div>
  );
}

/* =====================================================================
   CSS (kept inside this file, scoped under .sw-landing)
   ===================================================================== */
const landingCss = `
/* ---------- Theme colors (change these to restyle the page) ---------- */
.sw-landing {
  --sw-bg: #ffffff;
  --sw-surface: #ffffff;
  --sw-surface-soft: #f3f4f6;
  --sw-heading: #0b0f19;
  --sw-text: #5b6472;
  --sw-border: #e5e7eb;
  --sw-shadow: 0 6px 20px rgba(15, 23, 42, 0.07);
  --sw-shadow-hover: 0 14px 30px rgba(15, 23, 42, 0.13);
  --sw-blue: #0b8cf5;
  --sw-teal: #10b58f;
  --sw-red: #f0293f;
  --sw-yellow: #f6b400;
  --sw-btn-dark-bg: #0b0f19;
  --sw-btn-dark-text: #ffffff;
  --sw-map-ground: #eef1f4;
  --sw-map-road: #ffffff;
  --sw-map-road-edge: #d6dbe1;
  --sw-map-green: #d9ecd2;
  --sw-map-water: #c7e0f2;
  --sw-label-green: #b7e44b;
  --sw-scene-sky: #9aa7b5;
  --sw-scene-building: #6f7c8b;
  --sw-scene-road: #4a5561;
  --sw-scene-water: rgba(150, 195, 230, 0.75);
  --sw-input-bg: #ffffff;
}

.sw-landing[data-theme="dark"] {
  --sw-bg: #080d18;
  --sw-surface: #0f1728;
  --sw-surface-soft: #172036;
  --sw-heading: #f4f7fb;
  --sw-text: #a3afc2;
  --sw-border: #223049;
  --sw-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  --sw-shadow-hover: 0 14px 30px rgba(0, 0, 0, 0.5);
  --sw-blue: #3aa0ff;
  --sw-teal: #19c9a0;
  --sw-red: #ff4a5e;
  --sw-yellow: #ffc533;
  --sw-btn-dark-bg: #f4f7fb;
  --sw-btn-dark-text: #0b0f19;
  --sw-map-ground: #16213a;
  --sw-map-road: #2a3956;
  --sw-map-road-edge: #34466a;
  --sw-map-green: #17382f;
  --sw-map-water: #1d3d63;
  --sw-label-green: #a6d63c;
  --sw-scene-sky: #2a3547;
  --sw-scene-building: #1d2738;
  --sw-scene-road: #131a27;
  --sw-scene-water: rgba(70, 120, 180, 0.6);
  --sw-input-bg: #0f1728;
}

/* ---------- Base ---------- */
.sw-landing,
.sw-landing *,
.sw-landing *::before,
.sw-landing *::after {
  box-sizing: border-box;
}

.sw-landing {
  position: relative;
  overflow-x: clip;
  background: var(--sw-bg);
  color: var(--sw-text);
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif;
  line-height: 1.55;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sw-landing h1,
.sw-landing h2,
.sw-landing h3,
.sw-landing h4,
.sw-landing p,
.sw-landing ul {
  margin: 0;
  padding: 0;
}

.sw-landing ul {
  list-style: none;
}

.sw-landing a {
  color: inherit;
  text-decoration: none;
}

.sw-landing a:focus-visible,
.sw-landing button:focus-visible,
.sw-landing input:focus-visible {
  outline: 3px solid var(--sw-blue);
  outline-offset: 2px;
}

.sw-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.sw-page {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 20px 24px 0;
}

/* ---------- Buttons ---------- */
.sw-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 24px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease,
    border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.sw-btn:hover {
  transform: translateY(-2px);
}

.sw-btn-dark {
  background: var(--sw-btn-dark-bg);
  color: var(--sw-btn-dark-text) !important;
}

.sw-btn-dark:hover {
  box-shadow: 0 8px 18px rgba(11, 15, 25, 0.25);
}

.sw-btn-soft {
  background: var(--sw-surface-soft);
  border-color: var(--sw-border);
  color: var(--sw-heading) !important;
  box-shadow: var(--sw-shadow);
}

.sw-btn-soft:hover {
  border-color: var(--sw-blue);
}

.sw-btn-white {
  background: #ffffff;
  color: #0b0f19 !important;
}

.sw-btn-white:hover {
  background: #e8f3ff;
}

.sw-btn-outline {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.7);
  color: #ffffff !important;
}

.sw-btn-outline:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: #ffffff;
}

/* ---------- Header ---------- */
.sw-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--sw-border);
  background: var(--sw-bg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.sw-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1120px;
  height: 64px;
  margin: 0 auto;
  padding: 0 24px;
}

.sw-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: auto;
}

.sw-nav-link {
  position: relative;
  padding: 21px 0;
  color: var(--sw-text) !important;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.sw-nav-link:hover,
.sw-nav-link.is-active {
  color: var(--sw-heading) !important;
}

.sw-nav-link.is-active {
  font-weight: 700;
}

.sw-nav-link.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  height: 2px;
  border-radius: 2px;
  background: var(--sw-heading);
}

.sw-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sw-btn-sm {
  min-height: 40px;
  padding: 0 22px;
  border-radius: 999px;
  font-size: 0.85rem;
}

.sw-btn-ghost {
  background: var(--sw-bg);
  border-color: var(--sw-border);
  color: var(--sw-heading) !important;
  box-shadow: var(--sw-shadow);
}

.sw-btn-ghost:hover {
  border-color: var(--sw-blue);
}

.sw-theme-slot {
  display: inline-flex;
}

.sw-theme-slot button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--sw-border);
  border-radius: 50%;
  background: var(--sw-surface-soft);
  color: var(--sw-heading);
  cursor: pointer;
}

/* ---------- Hero ---------- */
.sw-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 36px;
  align-items: center;
}

.sw-hero-map {
  overflow: hidden;
  aspect-ratio: 455 / 280;
  border-radius: 24px;
  border: 1px solid var(--sw-border);
  box-shadow: var(--sw-shadow-hover);
  background: var(--sw-map-ground);
}

.sw-hero-map img,
.sw-map-svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sw-hero-content {
  animation: sw-fade-in 0.8s ease both;
}

.sw-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--sw-border);
  border-radius: 999px;
  background: var(--sw-surface-soft);
  color: var(--sw-heading);
  font-size: 0.78rem;
  font-weight: 600;
}

.sw-hero-title {
  margin-top: 18px;
  color: var(--sw-heading);
  font-size: clamp(2.4rem, 5.2vw, 3.6rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.03em;
}

.sw-hero-text {
  max-width: 440px;
  margin-top: 18px;
  font-size: 1.05rem;
}

.sw-hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 28px;
}

/* ---------- Map colors ---------- */
.sw-map-ground { fill: var(--sw-map-ground); }
.sw-map-green { fill: var(--sw-map-green); }
.sw-map-water { stroke: var(--sw-map-water); }
.sw-map-roads path { stroke: var(--sw-map-road); }
.sw-map-route { stroke: var(--sw-blue); }
.sw-map-start-ring { fill: rgba(11, 140, 245, 0.25); }
.sw-map-start { fill: var(--sw-blue); }
.sw-map-dest { fill: #0b0f19; stroke: #ffffff; stroke-width: 2; }
.sw-landing[data-theme="dark"] .sw-map-dest { fill: #f4f7fb; }
.sw-landing[data-theme="dark"] .sw-map-dest + circle { fill: #0b0f19; }
.sw-map-dest-shadow { fill: rgba(11, 140, 245, 0.3); }
.sw-map-label-green { fill: var(--sw-label-green); }
.sw-map-label-red { fill: var(--sw-red); }
.sw-map-dot-green { fill: var(--sw-label-green); stroke: rgba(255, 255, 255, 0.85); stroke-width: 2; }
.sw-map-dot-red { fill: var(--sw-red); stroke: rgba(255, 255, 255, 0.85); stroke-width: 2; }
.sw-map-hazard-line { stroke: var(--sw-red); }
.sw-map-label-text { font-size: 11px; font-weight: 700; font-family: inherit; }
.sw-dark-text { fill: #1a2a05; }
.sw-light-text { fill: #ffffff; }

/* ---------- Section titles ---------- */
.sw-section-title {
  color: var(--sw-heading);
  font-size: clamp(1.9rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.sw-section-text {
  max-width: 760px;
  margin-top: 14px;
  font-size: 1.05rem;
}

/* ---------- Features ---------- */
.sw-features {
  max-width: 880px;
  margin: 44px auto 0;
  padding: 0 0 0 0;
}

.sw-features .sw-section-title,
.sw-features .sw-section-text {
  padding-left: 24px;
}

.sw-feature-list {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

.sw-feature-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 28px;
  align-items: center;
  padding: 14px 28px 14px 24px;
  border: 1px solid var(--sw-border);
  border-radius: 14px;
  background: var(--sw-surface);
  box-shadow: var(--sw-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease,
    background-color 0.3s ease;
}

.sw-feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--sw-shadow-hover);
}

.sw-feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  color: #ffffff;
}

.sw-feature-icon--blue { background: var(--sw-blue); }
.sw-feature-icon--teal { background: var(--sw-teal); }
.sw-feature-icon--red { background: var(--sw-red); }

.sw-feature-body {
  min-width: 0;
}

.sw-feature-title {
  color: var(--sw-heading);
  font-size: 1.3rem;
  font-weight: 700;
}

.sw-feature-text {
  max-width: 480px;
  margin-top: 6px;
  font-size: 0.95rem;
}

.sw-round-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--sw-surface-soft);
  color: var(--sw-heading) !important;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.sw-round-arrow:hover {
  background: var(--sw-heading);
  color: var(--sw-bg) !important;
  transform: translateX(3px);
}

/* ---------- Recent updates ---------- */
.sw-updates {
  margin-top: 56px;
}

.sw-updates-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.sw-view-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--sw-heading) !important;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s ease, gap 0.25s ease;
}

.sw-view-more:hover {
  gap: 10px;
  color: var(--sw-blue) !important;
}

.sw-updates-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.sw-update-card {
  overflow: hidden;
  border: 1px solid var(--sw-border);
  border-radius: 16px;
  background: var(--sw-surface);
  box-shadow: var(--sw-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.sw-update-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sw-shadow-hover);
}

.sw-update-media {
  position: relative;
  height: 128px;
  overflow: hidden;
  background: var(--sw-surface-soft);
}

.sw-photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.sw-update-card:hover .sw-photo {
  transform: scale(1.05);
}

.sw-update-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 14px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
}

.sw-update-badge--blue { background: #0b8cf5; }
.sw-update-badge--red { background: #f0293f; }
.sw-update-badge--yellow { background: #f6b400; color: #231a00; }

.sw-update-body {
  padding: 14px 16px 18px;
}

.sw-update-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--sw-heading);
  font-size: 0.78rem;
}

.sw-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.sw-meta-time {
  color: var(--sw-text);
}

.sw-update-title {
  margin-top: 18px;
  color: var(--sw-heading);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.35;
}

/* Fallback scene colors */
.sw-scene-sky { fill: var(--sw-scene-sky); }
.sw-scene-building { fill: var(--sw-scene-building); }
.sw-scene-road { fill: var(--sw-scene-road); }
.sw-scene-water { fill: var(--sw-scene-water); }
.sw-scene-ripple { stroke: rgba(255, 255, 255, 0.55); }
.sw-scene-barrier-white { fill: #f4f4f4; }
.sw-scene-barrier-red { stroke: #f0293f; }
.sw-scene-barrier-leg { fill: #d8d8d8; }
.sw-scene-car { fill: #c9d1da; }

/* ---------- CTA banner ---------- */
.sw-cta {
  position: relative;
  max-width: 1240px;
  margin: 28px auto 0;
  overflow: hidden;
  border-radius: 20px;
  background-color: #0a1426;
  background-image:
    linear-gradient(90deg, rgba(5, 12, 26, 0.92) 0%, rgba(5, 12, 26, 0.7) 55%, rgba(5, 12, 26, 0.35) 100%),
    var(--sw-cta-image, none),
    radial-gradient(circle at 85% 70%, rgba(11, 140, 245, 0.55), transparent 45%),
    linear-gradient(135deg, #0a1426, #14264a);
  background-size: cover;
  background-position: center;
  color: #ffffff;
}

.sw-cta-content {
  max-width: 720px;
  padding: 36px 64px 34px;
}

.sw-cta-title {
  color: #ffffff;
  font-size: clamp(1.7rem, 3.4vw, 2.1rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.sw-cta-text {
  max-width: 560px;
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
}

.sw-cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 22px;
}

.sw-cta .sw-btn {
  min-height: 44px;
}

/* ---------- Footer ---------- */
.sw-footer {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 24px 24px;
}

.sw-footer-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.9fr 0.9fr 1.3fr;
  gap: 32px;
}

.sw-footer-brand {
  min-width: 0;
}

.sw-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--sw-heading) !important;
  font-size: 1.25rem;
  font-weight: 800;
}

.sw-logo-pin {
  color: var(--sw-heading);
}

.sw-footer-tagline {
  margin-top: 4px;
  font-size: 0.75rem;
}

.sw-social-list {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.sw-social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--sw-surface-soft);
  color: var(--sw-heading) !important;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.sw-social:hover {
  background: var(--sw-blue);
  color: #ffffff !important;
  transform: translateY(-2px);
}

.sw-footer-heading {
  color: var(--sw-heading);
  font-size: 0.85rem;
  font-weight: 700;
}

.sw-footer-col li {
  margin-top: 8px;
  font-size: 0.75rem;
}

.sw-footer-col ul {
  margin-top: 4px;
}

.sw-footer-col a {
  transition: color 0.2s ease;
}

.sw-footer-col a:hover {
  color: var(--sw-blue);
}

.sw-newsletter p {
  margin-top: 8px;
  font-size: 0.75rem;
}

.sw-newsletter-form {
  display: flex;
  gap: 0;
  margin-top: 12px;
}

.sw-newsletter-form input {
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--sw-border);
  border-right: 0;
  border-radius: 8px 0 0 8px;
  background: var(--sw-input-bg);
  color: var(--sw-heading);
  font-size: 0.8rem;
  font-family: inherit;
}

.sw-newsletter-form input::placeholder {
  color: var(--sw-text);
  opacity: 0.8;
}

.sw-newsletter-form button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 40px;
  border: 0;
  border-radius: 0 8px 8px 0;
  background: var(--sw-btn-dark-bg);
  color: var(--sw-btn-dark-text);
  cursor: pointer;
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.sw-newsletter-form button:hover {
  background: var(--sw-blue);
  color: #ffffff;
}

.sw-newsletter .sw-newsletter-message {
  min-height: 1.2em;
  margin-top: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.sw-newsletter-message--error { color: var(--sw-red); }
.sw-newsletter-message--success { color: var(--sw-teal); }

.sw-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px solid var(--sw-border);
  font-size: 0.75rem;
}

.sw-footer-safe {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--sw-heading);
}

/* ---------- Scroll reveal (only active when JS adds .sw-anim) ---------- */
.sw-anim .sw-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease,
    border-color 0.3s ease, background-color 0.3s ease;
  transition-delay: var(--sw-delay, 0ms);
}

.sw-anim .sw-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* After the reveal, hover effects should respond instantly */
.sw-anim .sw-feature-card.is-visible:hover,
.sw-anim .sw-update-card.is-visible:hover {
  transition-delay: 0ms;
}

.sw-anim .sw-feature-card.is-visible:hover { transform: translateY(-3px); }
.sw-anim .sw-update-card.is-visible:hover { transform: translateY(-4px); }

@keyframes sw-fade-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- Tablet ---------- */
@media (max-width: 900px) {
  .sw-hero {
    grid-template-columns: 1fr;
  }

  .sw-hero-text {
    max-width: 560px;
  }

  .sw-updates-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sw-footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sw-cta-content {
    padding: 32px 36px;
  }
}

/* ---------- Mobile ---------- */
@media (max-width: 760px) {
  .sw-nav {
    display: none;
  }

  .sw-header-actions {
    margin-left: auto;
  }
}

@media (max-width: 640px) {
  .sw-header-inner {
    padding: 0 16px;
    gap: 12px;
  }

  .sw-header-actions {
    gap: 8px;
  }

  .sw-btn-sm {
    padding: 0 14px;
  }

  .sw-page {
    padding: 16px 16px 0;
  }

  .sw-features .sw-section-title,
  .sw-features .sw-section-text {
    padding-left: 0;
  }

  .sw-feature-card {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 16px;
    padding: 18px 16px;
  }

  .sw-feature-icon {
    width: 56px;
    height: 56px;
  }

  .sw-feature-icon svg {
    width: 26px;
    height: 26px;
  }

  .sw-round-arrow {
    grid-column: 2;
    justify-self: start;
  }

  .sw-hero-buttons .sw-btn,
  .sw-cta-buttons .sw-btn {
    flex: 1 1 100%;
  }

  .sw-updates-grid {
    grid-template-columns: 1fr;
  }

  .sw-update-media {
    height: 170px;
  }

  .sw-cta {
    margin-left: 12px;
    margin-right: 12px;
  }

  .sw-cta-content {
    padding: 28px 20px;
  }

  .sw-footer-grid {
    grid-template-columns: 1fr;
  }

  .sw-footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .sw-landing *,
  .sw-landing *::before,
  .sw-landing *::after {
    animation: none !important;
    transition: none !important;
  }

  .sw-reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
`;
