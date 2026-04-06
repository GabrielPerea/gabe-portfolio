import { useState, useEffect, useRef } from "react";

// ─── Brand Palette ───────────────────────────────────────────
const NAVY = "#1b3a4f";
const NAVY_DEEP = "#142d3e";
const NAVY_LIGHT = "#2a5068";
const GOLD = "#f5a623";
const GOLD_LIGHT = "#fdf3e0";
const GOLD_HOVER = "#e69710";
const DARK = "#1a1a1a";
const MEDIUM = "#4a4a4a";
const LIGHT_TEXT = "#6b6b6b";
const BG = "#faf9f7";
const CARD_BG = "#ffffff";
const BORDER = "#e8e6e1";

// ─── Data ────────────────────────────────────────────────────

const agencyCaseStudies = [
  {
    tag: "Franchise · Retail",
    title: "Restructured a national retail franchise's paid search program",
    challenge:
      "Inherited an underperforming account structure across a large franchise network with inconsistent campaign architecture and rising CPLs.",
    actions: [
      "Designed and rolled out a new account structure across the full franchise network",
      "Rebuilt campaign segmentation, keyword architecture, and bidding strategy",
      "Aligned conversion tracking with actual business outcomes",
    ],
    results: [
      { metric: "27%", label: "CPL reduction" },
      { metric: "107%", label: "Leads/location growth YoY" },
    ],
  },
  {
    tag: "Franchise · Healthcare",
    title: "Rebuilt Search and PMax from scratch for a national chiropractic brand",
    challenge:
      "Campaign structure lacked scalability and performance visibility. No PMax presence. Lead volume per clinic was stagnant.",
    actions: [
      "Rebuilt Search and Performance Max structure from the ground up",
      "Launched a store-visit PMax test that expanded from one state to national markets",
      "Implemented new measurement framework for per-clinic performance",
    ],
    results: [
      { metric: "23%", label: "Leads per clinic growth in 3 months" },
      { metric: "1→National", label: "PMax market expansion" },
    ],
  },
  {
    tag: "DTC · E-Commerce",
    title: "Scaled two subscription brands through Google Ads and Meta optimization",
    challenge:
      "National subscription brands needed to grow online orders while improving unit economics across Search, PMax, Shopping, and Meta.",
    actions: [
      "Managed and optimized Google Ads and Meta campaigns end-to-end",
      "Advanced Merchant Center optimizations aligned with seasonal promotions",
      "Improved product feed health and delivery timing",
    ],
    results: [
      { metric: "134%", label: "Online order increase" },
      { metric: "40%", label: "CPA reduction" },
      { metric: "65%", label: "ROAS improvement" },
    ],
  },
  {
    tag: "Operations · Automation",
    title: "Engineered scalable campaign and QA systems for 800+ campaigns",
    challenge:
      "Manual campaign builds and QA across a massive franchise network created bottlenecks, errors, and inconsistent deployment standards.",
    actions: [
      "Built a custom Campaign Builder that auto-generates 100+ campaigns, keywords, and RSAs",
      "Created JavaScript, Make, and Google Sheets automation workflows for QA",
      "Developed pacing, reporting, and optimization tooling for the full network",
    ],
    results: [
      { metric: "60%", label: "Faster campaign deployment" },
      { metric: "50%", label: "QA workload reduction" },
    ],
  },
];

const consultingCaseStudies = [
  {
    tag: "SEO · Local Jewelry",
    title: "Grew a custom jewelry brand from 10K to 100K+ monthly visitors",
    challenge:
      "A Santa Barbara jeweler had built steady traffic through blogging but needed a structured SEO and content strategy to break through the plateau at 10,000 monthly visitors.",
    actions: [
      "Conducted keyword research to identify high-intent jewelry comparison topics",
      "Developed a content strategy centered on 'vs' comparison posts that captured search demand",
      "Promoted content across social channels and built an email capture system with a free E-Book",
      "Tracked analytics closely to double down on what was driving traffic and leads",
    ],
    results: [
      { metric: "550%", label: "Traffic growth (2013-2017)" },
      { metric: "300+", label: "Page 1 keyword rankings" },
      { metric: "~50%", label: "Revenue now from web leads" },
    ],
  },
  {
    tag: "SEO · Local Services",
    title: "Increased leads 25% for a 30-year-old dog boarding business",
    challenge:
      "A well-established dog boarding and daycare business had redesigned their site but had no analytics tracking and no SEO strategy in place. They needed more leads from search.",
    actions: [
      "Ran a full site audit and installed analytics tracking as a baseline",
      "Performed keyword research and optimized on-page content and technical elements",
      "Listed the business on 60+ quality directories through Yext partnership",
      "Developed monthly blog content and added on-site elements like a review carousel",
    ],
    results: [
      { metric: "25%", label: "Increase in daily leads" },
      { metric: "60+", label: "Monthly website leads" },
      { metric: "280", label: "Monthly calls from directories" },
    ],
  },
  {
    tag: "SEO · Commercial Services",
    title: "Took a commercial refrigeration company from zero search traffic to steady lead flow",
    challenge:
      "After a site redesign, the business was receiving zero visits from search engines. The site's robots.txt was blocking all search engine crawlers, and the design wasn't mobile-responsive.",
    actions: [
      "Diagnosed the robots.txt file blocking all search engine bots from crawling the site",
      "Replaced the existing theme with a custom responsive build, recreating the visual design",
      "Built citations on 60+ business directories to establish presence in a new service area",
      "Provided ongoing site monitoring, management, and malware removal",
    ],
    results: [
      { metric: "0→Steady", label: "Search traffic recovery" },
      { metric: "16", label: "New clients from search (Jan-Oct 2019)" },
      { metric: "60+", label: "Directory listings created" },
    ],
  },
];

const tools = [
  "Google Ads",
  "Performance Max",
  "Microsoft Ads",
  "Meta Ads",
  "GA4",
  "Google Tag Manager",
  "Looker Studio",
  "Optmyzr",
  "Make (Integromat)",
  "JavaScript (Ads Scripts)",
  "Google Sheets",
  "Ahrefs",
  "SEMrush",
  "Screaming Frog",
];

const specialties = [
  "Franchise Campaign Scaling",
  "Multi-Location Strategy",
  "Attribution Modeling",
  "Offline Conversion Tracking",
  "Budget Forecasting",
  "A/B Testing Frameworks",
];

const career = [
  {
    period: "2022 – Present",
    role: "Sr. Paid Search Strategist",
    company: "Over the Top Marketing",
    note: "Promoted Jan 2026",
  },
  {
    period: "2020 – 2023",
    role: "Digital Marketing Manager",
    company: "Gold Medal Wine Club & Craft Beer Club",
  },
  {
    period: "2021",
    role: "Search Marketing Specialist",
    company: "Yardi",
  },
  {
    period: "2013 – Present",
    role: "Founder / Consultant",
    company: "Independent Practice",
  },
];

// ─── Hooks ───────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Shared Components ───────────────────────────────────────

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: GOLD,
        marginBottom: 8,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
        color: NAVY,
        fontWeight: 400,
        marginBottom: 12,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function GPLogo({ size = 36 }) {
  return (
    <img
      src="/gabe-perea-logo-transparent-background.png"
      alt="GP Logo"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        borderRadius: 4,
      }}
    />
  );
}

// ─── Section Components ──────────────────────────────────────

function Stat({ number, label, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ textAlign: "center", padding: "12px 0" }}>
        <div
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: GOLD,
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          {number}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>
    </FadeIn>
  );
}

function CaseStudyCard({ study, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeIn delay={index * 0.1}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          background: CARD_BG,
          border: `1px solid ${expanded ? NAVY : BORDER}`,
          borderRadius: 8,
          padding: "clamp(20px, 3vw, 32px)",
          cursor: "pointer",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          boxShadow: expanded
            ? "0 8px 32px rgba(0,0,0,0.08)"
            : "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: NAVY_LIGHT,
            marginBottom: 10,
            fontWeight: 500,
          }}
        >
          {study.tag}
        </div>
        <h3
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            color: DARK,
            margin: 0,
            lineHeight: 1.35,
            fontWeight: 400,
          }}
        >
          {study.title}
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: 16,
          }}
        >
          {study.results.map((r, i) => (
            <div
              key={i}
              style={{
                background: GOLD_LIGHT,
                borderRadius: 6,
                padding: "8px 14px",
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                border: `1px solid ${GOLD}22`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "1.25rem",
                  color: NAVY,
                  fontWeight: 400,
                }}
              >
                {r.metric}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: MEDIUM,
                }}
              >
                {r.label}
              </span>
            </div>
          ))}
        </div>

        {expanded && (
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: `1px solid ${BORDER}`,
              animation: "fadeDown 0.3s ease",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: MEDIUM,
                lineHeight: 1.6,
                margin: "0 0 14px",
              }}
            >
              <strong style={{ color: DARK }}>Challenge:</strong>{" "}
              {study.challenge}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: LIGHT_TEXT,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: "0 0 8px",
                fontWeight: 500,
              }}
            >
              What I did
            </p>
            {study.actions.map((a, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  color: MEDIUM,
                  lineHeight: 1.5,
                  padding: "4px 0 4px 16px",
                  borderLeft: `2px solid ${GOLD_LIGHT}`,
                  marginBottom: 6,
                }}
              >
                {a}
              </div>
            ))}
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: LIGHT_TEXT,
                marginTop: 14,
              }}
            >
              Click to collapse ↑
            </div>
          </div>
        )}

        {!expanded && (
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              color: LIGHT_TEXT,
              marginTop: 12,
            }}
          >
            Click to expand →
          </div>
        )}
      </div>
    </FadeIn>
  );
}

function ProcessStep({ number, title, description, delay }) {
  return (
    <FadeIn delay={delay}>
      <div
        style={{
          background: CARD_BG,
          borderRadius: 8,
          padding: "clamp(20px, 3vw, 28px)",
          border: `1px solid ${BORDER}`,
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -4,
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "5rem",
            color: NAVY,
            opacity: 0.04,
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          {number}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: GOLD,
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Step {number}
        </div>
        <h3
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 400,
            color: NAVY,
            margin: "0 0 8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.86rem",
            color: MEDIUM,
            lineHeight: 1.6,
            margin: 0,
            position: "relative",
          }}
        >
          {description}
        </p>
      </div>
    </FadeIn>
  );
}

// ─── Main Component ──────────────────────────────────────────

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "tools", label: "Tools" },
    { id: "about", label: "About" },
  ];

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Global Styles ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        ::selection { background: ${NAVY}; color: ${GOLD}; }

        /* Mobile menu */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ── Navigation ────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(250,249,247,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
          transition: "all 0.3s ease",
          padding: "0 clamp(20px, 5vw, 60px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
          }}
        >
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          >
            <GPLogo size={32} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600 }}>
              <span style={{ color: NAVY }}>Gabe</span>{" "}
              <span style={{ color: GOLD }}>Perea</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navItems.map((item) => (
              <span
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: MEDIUM,
                  cursor: "pointer",
                  letterSpacing: "0.03em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = NAVY)}
                onMouseLeave={(e) => (e.target.style.color = MEDIUM)}
              >
                {item.label}
              </span>
            ))}
            <span
              onClick={() => scrollTo("contact")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "white",
                background: NAVY,
                padding: "7px 18px",
                borderRadius: 5,
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => (e.target.style.background = NAVY_DEEP)}
              onMouseLeave={(e) => (e.target.style.background = NAVY)}
            >
              Contact
            </span>
          </div>

          {/* Mobile hamburger */}
          <div
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: 5,
              cursor: "pointer",
              padding: 8,
            }}
          >
            <span style={{ width: 22, height: 2, background: NAVY, borderRadius: 1, transition: "all 0.2s", transform: mobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ width: 22, height: 2, background: NAVY, borderRadius: 1, transition: "all 0.2s", opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ width: 22, height: 2, background: NAVY, borderRadius: 1, transition: "all 0.2s", transform: mobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            className="mobile-menu"
            style={{
              background: CARD_BG,
              borderTop: `1px solid ${BORDER}`,
              padding: "16px 0",
              animation: "fadeDown 0.2s ease",
            }}
          >
            {[...navItems, { id: "contact", label: "Contact" }].map((item) => (
              <div
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.92rem",
                  color: NAVY,
                  padding: "12px 20px",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(120px, 15vw, 180px) clamp(20px, 5vw, 60px) clamp(60px, 8vw, 100px)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ animation: "fadeUp 0.8s ease" }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: GOLD,
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Senior Paid Search Strategist
          </div>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              color: NAVY,
              lineHeight: 1.12,
              maxWidth: 720,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            I turn paid search into
            <span style={{ color: GOLD }}> scalable systems</span> that drive
            measurable growth.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              color: MEDIUM,
              lineHeight: 1.65,
              maxWidth: 560,
              marginBottom: 32,
            }}
          >
            10+ years building, optimizing, and scaling paid search programs for
            franchise networks, national brands, and DTC e-commerce. $1M+ in
            monthly ad spend. Systems that last.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("work")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 500,
                background: NAVY,
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = NAVY_DEEP)}
              onMouseLeave={(e) => (e.target.style.background = NAVY)}
            >
              View Case Studies
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 500,
                background: "transparent",
                color: NAVY,
                border: `1px solid ${BORDER}`,
                padding: "12px 28px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = NAVY)}
              onMouseLeave={(e) => (e.target.style.borderColor = BORDER)}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(28px, 4vw, 44px) clamp(20px, 5vw, 60px)",
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "clamp(16px, 3vw, 32px)",
          }}
        >
          <Stat number="$1M+" label="Monthly Ad Spend" delay={0} />
          <Stat number="800+" label="Active Campaigns" delay={0.1} />
          <Stat number="10+" label="Years Experience" delay={0.2} />
          <Stat number="107%" label="Best Leads/Location Growth" delay={0.3} />
        </div>
      </section>

      {/* ── Case Studies ──────────────────────────────────── */}
      <section
        id="work"
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <SectionLabel>Selected Work</SectionLabel>
          <SectionTitle>Case Studies</SectionTitle>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.92rem",
              color: LIGHT_TEXT,
              maxWidth: 500,
              lineHeight: 1.6,
              marginBottom: 36,
            }}
          >
            Real outcomes from real accounts across agency and independent consulting work.
          </p>
        </FadeIn>

        {/* Agency Work */}
        <FadeIn>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: NAVY_LIGHT,
            marginBottom: 16,
            fontWeight: 600,
            paddingBottom: 8,
            borderBottom: `1px solid ${BORDER}`,
          }}>Agency - Paid Search & Operations</h3>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {agencyCaseStudies.map((study, i) => (
            <CaseStudyCard key={`agency-${i}`} study={study} index={i} />
          ))}
        </div>

        {/* Consulting Work */}
        <FadeIn>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: NAVY_LIGHT,
            marginBottom: 16,
            fontWeight: 600,
            paddingBottom: 8,
            borderBottom: `1px solid ${BORDER}`,
          }}>Independent Consulting - SEO & Web</h3>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: 20,
          }}
        >
          {consultingCaseStudies.map((study, i) => (
            <CaseStudyCard key={`consult-${i}`} study={study} index={i} />
          ))}
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────── */}
      <section
        id="process"
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)",
          background: CARD_BG,
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel>How I Work</SectionLabel>
            <SectionTitle>Diagnose. Design. Scale.</SectionTitle>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              marginTop: 28,
            }}
          >
            <ProcessStep
              number="01"
              title="Diagnose"
              description="Audit spend, tracking, structure, and attribution. Find the waste, friction, and gaps that are costing you money or hiding signal."
              delay={0.1}
            />
            <ProcessStep
              number="02"
              title="Design"
              description="Rebuild campaigns, measurement frameworks, workflows, and reporting. Create architecture that maps platform performance to actual business outcomes."
              delay={0.2}
            />
            <ProcessStep
              number="03"
              title="Scale"
              description="Automate what works. Build systems teams can maintain. Turn winning tests into repeatable frameworks that hold up across locations and budgets."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── Tools ─────────────────────────────────────────── */}
      <section
        id="tools"
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <SectionLabel>Toolkit</SectionLabel>
          <SectionTitle>Tools & Specialties</SectionTitle>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.92rem",
              color: LIGHT_TEXT,
              maxWidth: 480,
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Deep platform expertise combined with automation, analytics, and
            measurement infrastructure.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tools.map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  background: `${NAVY}08`,
                  color: NAVY,
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: `1px solid ${NAVY}18`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {specialties.map((s, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: MEDIUM,
                  padding: "10px 0",
                  borderBottom: `1px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: GOLD, fontSize: "0.6rem" }}>◆</span>
                {s}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── About ─────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)",
          background: CARD_BG,
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(32px, 5vw, 60px)",
            alignItems: "start",
          }}
        >
          <FadeIn>
            <div>
              <img
                src="/gabriel-perea.jpg"
                alt="Gabe Perea"
                style={{
                  width: "clamp(100px, 20vw, 140px)",
                  height: "clamp(100px, 20vw, 140px)",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  marginBottom: 24,
                  border: `3px solid ${BORDER}`,
                }}
              />
              <SectionLabel>About</SectionLabel>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  color: NAVY,
                  fontWeight: 400,
                  marginBottom: 20,
                  letterSpacing: "-0.01em",
                }}
              >
                Strategist. Systems thinker. Clear communicator.
              </h2>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.92rem",
                  color: MEDIUM,
                  lineHeight: 1.7,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <p style={{ margin: 0 }}>
                  I'm a senior paid search strategist based in Santa Barbara, CA
                  with over a decade of experience managing large-budget search
                  programs for franchise networks, national brands, and DTC
                  e-commerce.
                </p>
                <p style={{ margin: 0 }}>
                  My strength isn't just running campaigns. It's diagnosing why
                  things aren't working, designing better structures, and
                  building the measurement and automation systems that let good
                  work scale without falling apart.
                </p>
                <p style={{ margin: 0 }}>
                  I think clearly about messy problems, I communicate findings in
                  ways stakeholders can actually use, and I care more about real
                  business outcomes than platform vanity metrics.
                </p>
                <p style={{ margin: 0, color: LIGHT_TEXT, fontStyle: "italic" }}>
                  Outside of paid media, I build systems, research and present on
                  complex topics, and produce story-driven work. That range makes
                  me especially good at turning messy information into something
                  clear, useful, and actionable.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              style={{
                background: BG,
                borderRadius: 8,
                padding: "clamp(24px, 3vw, 32px)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: LIGHT_TEXT,
                  marginBottom: 20,
                  fontWeight: 500,
                }}
              >
                Career snapshot
              </h3>
              {career.map((item, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: i < career.length - 1 ? 16 : 0,
                    paddingBottom: i < career.length - 1 ? 16 : 0,
                    borderBottom:
                      i < career.length - 1 ? `1px solid ${BORDER}` : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: GOLD,
                      letterSpacing: "0.04em",
                      marginBottom: 3,
                      fontWeight: 600,
                    }}
                  >
                    {item.period}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem",
                      color: NAVY,
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.role}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: LIGHT_TEXT,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.company}
                    {item.note && (
                      <span
                        style={{
                          color: GOLD,
                          fontSize: "0.72rem",
                          marginLeft: 8,
                          fontWeight: 500,
                        }}
                      >
                        {item.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: `1px solid ${BORDER}`,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: LIGHT_TEXT,
                    marginBottom: 12,
                    fontWeight: 500,
                  }}
                >
                  Education
                </h3>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: MEDIUM,
                    lineHeight: 1.6,
                  }}
                >
                  <div>BA, Psychology - Cal State Long Beach</div>
                  <div>AS, Criminology - Santa Barbara City College</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)",
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <div style={{ marginBottom: 20 }}>
            <GPLogo size={48} />
          </div>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              color: NAVY,
              fontWeight: 400,
              marginBottom: 14,
              letterSpacing: "-0.01em",
            }}
          >
            Let's talk about your paid search program.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.92rem",
              color: LIGHT_TEXT,
              maxWidth: 440,
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Whether you need an audit, a rebuild, or ongoing strategic
            management, I'm happy to have the conversation.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:gabe@gabeperea.me"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 500,
                background: NAVY,
                color: "white",
                padding: "13px 32px",
                borderRadius: 6,
                textDecoration: "none",
                transition: "background 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.target.style.background = NAVY_DEEP)}
              onMouseLeave={(e) => (e.target.style.background = NAVY)}
            >
              gabe@gabeperea.me
            </a>
            <a
              href="https://linkedin.com/in/gabriel-perea"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 500,
                color: NAVY,
                border: `1px solid ${BORDER}`,
                padding: "13px 32px",
                borderRadius: 6,
                textDecoration: "none",
                transition: "border-color 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = NAVY)}
              onMouseLeave={(e) => (e.target.style.borderColor = BORDER)}
            >
              LinkedIn
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${BORDER}`,
          padding: "28px clamp(20px, 5vw, 60px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GPLogo size={22} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <span style={{ color: NAVY }}>Gabe</span>{" "}
              <span style={{ color: GOLD }}>Perea</span>
            </span>
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: LIGHT_TEXT,
              letterSpacing: "0.02em",
            }}
          >
            Strategic search. Better measurement. Smarter systems.
          </div>
        </div>
      </footer>
    </div>
  );
}
