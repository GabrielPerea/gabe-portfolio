import { useState, useEffect, useRef } from "react";

// ─── Brand Palette ───────────────────────────────────────────
const NAVY = "#1b3a4f";
const NAVY_DEEP = "#142d3e";
const NAVY_LIGHT = "#2a5068";
const GOLD = "#f5a623";
const GOLD_LIGHT = "#fdf3e0";
const DARK = "#1a1a1a";
const MEDIUM = "#4a4a4a";
const LIGHT_TEXT = "#6b6b6b";
const BG = "#faf9f7";
const CARD_BG = "#ffffff";
const BORDER = "#e8e6e1";

// ─── Data ────────────────────────────────────────────────────

const agencyCaseStudies = [
  {
    tag: "Franchise · Healthcare · Turnaround",
    title: "Co-led the turnaround of a national chiropractic account through a leadership gap",
    challenge:
      "A leadership transition left the team gutted - from five people down to two - just as the account was sliding (leads falling, cost per lead climbing) and corporate moved a large share of locations to a competing agency (participating clinics dropped from ~940 to ~680). Shianne Ybarra and I took on the turnaround together.",
    actions: [
      "Rebuilt the paid search account structure from the ground up",
      "Reconfigured Performance Max to optimize for store visits instead of lead forms, which had been generating spam through Discovery placements and cannibalizing Search",
      "Won clinics back into the program and grew per-clinic lead volume as the new structure matured over the following two quarters",
      "Validated the gains with an attribution study that separated true lift from leads being recredited between channels",
    ],
    results: [
      { metric: "+19%", label: "Leads per clinic, year over year (attribution-adjusted)" },
      { metric: "+20%", label: "New patients per clinic, year over year (attribution-adjusted)" },
      { metric: "+25%", label: "Clinics won back into the program (683 → 857)" },
    ],
    chart: "turnaround",
    featured: true,
  },
  {
    tag: "Franchise · Wireless Retail",
    title: "Managed a multi-year paid media program for a national wireless retail franchise",
    challenge:
      "A national wireless retail franchise ran paid media across a subset of participating store locations, with hundreds of non-participating locations acting as a natural control. The program needed to prove it was driving incremental in-store activations and upgrades, not just spending budget.",
    actions: [
      "Managed paid media across participating locations and measured per-store performance against non-participating stores",
      "Reallocated regional budgets toward high-efficiency markets and away from underperformers",
      "Drove cost-per-lead efficiency while holding or growing store visits year over year",
      "Tracked the per-store activation advantage across multiple years to demonstrate sustained, growing impact",
    ],
    results: [
      { metric: "+22%", label: "Activations/upgrades per store vs. non-participating (2024)" },
      { metric: "−14%", label: "Cost per lead YoY (2023)" },
      { metric: "2x", label: "Per-store advantage grew vs. 2022 (~10 → ~20/store/mo)" },
    ],
    chart: "comparison",
    featured: true,
  },
  {
    tag: "Franchise · Fitness",
    title: "Launched paid media for a boutique fitness franchise from zero",
    challenge:
      "A boutique fitness franchise had no paid media presence and needed to drive lead volume from scratch while scaling to new locations, in a category with notoriously high CPLs.",
    actions: [
      "Built campaign architecture, conversion tracking, and budget pacing from the ground up",
      "Launched Search and PMax campaigns aligned with location-level performance",
      "Iterated on creative, bidding, and audience strategy month over month",
      "Scaled the program across new locations without diluting per-location lead volume",
    ],
    results: [
      { metric: "+72%", label: "Lead volume since launch (+131% at holiday peak)" },
      { metric: "−33%", label: "Cost per lead since launch" },
      { metric: "67%", label: "Below industry CPL benchmark" },
    ],
    chart: "launch",
    featured: true,
  },
  {
    tag: "Franchise · Personal Care",
    title: "More than doubled per-store lead volume for a personal-care franchise",
    challenge:
      "A personal-care franchise ran a small, underinvested paid program. The opportunity was to lift per-location lead volume and scale the program to more studios without letting cost per lead climb. (The account was later wound down as the parent company restructured - outside the program's control.)",
    actions: [
      "Improved per-store lead volume through tighter campaign structure, bidding, and creative",
      "Scaled the program to ~1.7x more studios as per-location performance proved out",
      "Held cost discipline throughout, improving CPL even while expanding spend",
      "Grew new-customer (NDC) volume in step with lead growth",
    ],
    results: [
      { metric: "2.3x", label: "Leads per store at peak (vs. 2023 average)" },
      { metric: "−16%", label: "Cost per lead, even while scaling" },
      { metric: "1.7x", label: "Studios scaled into the program" },
    ],
    chart: "scaleup",
  },
  {
    tag: "Franchise · Hair Care",
    title: "Doubled per-store lead volume while scaling a hair-care franchise 3.5x",
    challenge:
      "A hair-care franchise was running a small paid program with room to grow. The opportunity was to lift per-location lead volume while scaling the program to many more studios and pushing cost per lead down. (The account was later wound down as the parent company restructured - outside the program's control.)",
    actions: [
      "Doubled per-store lead volume through tight campaign structure and bidding",
      "Scaled the program across ~3.5x more studios as per-location performance held",
      "Drove cost per lead down ~22% during the peak scaling period",
      "Grew new-customer (NDC) volume roughly 5x at peak, keeping acquisition cost in check",
    ],
    results: [
      { metric: "~2x", label: "Leads per store at peak (vs. 2023 average)" },
      { metric: "−22%", label: "Cost per lead during peak scaling" },
      { metric: "3.5x", label: "Studios scaled into the program" },
    ],
    chart: "scaleup_hair",
    featured: true,
  },
  {
    tag: "Franchise · Beauty",
    title: "Held per-studio performance for a beauty franchise as its managed footprint shrank",
    challenge:
      "Over the engagement, the brand's parent company progressively pulled studios out of the agency-managed program - the managed book shrank from ~240 studios to ~35, driven by the parent's restructuring rather than performance. The goal was to keep the remaining studios performing and improve lead quality as the managed footprint shrank.",
    actions: [
      "Reallocated budgets toward the strongest-performing geos and studios as the program shrank",
      "Refined bidding, negative keyword coverage, and creative to protect efficiency as scale (and algorithmic data density) declined",
      "Tightened conversion tracking so budget followed real new-customer signals, not just raw leads",
      "Held per-studio lead volume steady and improved lead-to-customer quality across multiple years",
    ],
    results: [
      { metric: "Held", label: "Per-studio lead volume as the managed program shrank ~85%" },
      { metric: "~44%", label: "Lead-to-customer rate, up from ~35% (peaks to 59%)" },
      { metric: "Stable", label: "CPL maintained despite lost scale" },
    ],
    chart: "resilience",
  },
  {
    tag: "Diagnostic · Bing Ads",
    title: "Resolved a conversion tracking failure across 400 Bing campaigns that had stumped prior attempts",
    challenge:
      "A national franchise's 400-campaign Bing account had a conversion tracking failure that broke tCPA optimization. Multiple prior escalation attempts had failed to resolve it. Budget pacing had collapsed to roughly 10% of target.",
    actions: [
      "Performed a deep diagnostic across the conversion tracking pipeline to isolate the root cause",
      "Rebuilt the tracking implementation to restore reliable signal back to Bing",
      "Re-enabled tCPA optimization across the 400-campaign account",
      "Monitored recovery and adjusted pacing to scale safely back toward target",
    ],
    results: [
      { metric: "10% → ~50%", label: "Monthly budget pacing recovered" },
      { metric: "tCPA Restored", label: "Optimization capability re-enabled across 400 campaigns" },
    ],
  },
  {
    tag: "Operations · Automation",
    title: "Engineered scalable campaign and QA systems for 800+ campaigns",
    challenge:
      "Manual campaign builds and QA across a massive franchise network created bottlenecks, errors, and inconsistent deployment standards.",
    actions: [
      "Built a custom Campaign Builder that auto-generates 100+ campaigns, keywords, and RSAs",
      "Built a URL QA script that validates campaign-to-location mapping across hundreds of paid media campaigns",
      "Built a budget recommendation calculator that auto-creates assigned tasks in Monday.com with a ready-to-send script for account managers",
      "Created JavaScript, Make, and Google Sheets automation workflows for QA, pacing, and reporting",
    ],
    results: [
      { metric: "60%", label: "Faster campaign deployment" },
      { metric: "50%", label: "QA workload reduction" },
      { metric: "800+", label: "Campaigns governed by automated tooling" },
    ],
  },
];

const consultingCaseStudies = [
  {
    tag: "DTC · E-Commerce",
    title: "Scaled two national subscription brands through Google Ads and Meta optimization",
    challenge:
      "Two national subscription brands (wine and craft beer) needed to grow online orders while improving unit economics. The Google Ads account was running on tCPA with broad match keywords, limited negative keyword coverage, and product feeds that lacked keyword-optimized descriptions.",
    actions: [
      "Switched bidding strategy from tCPA to tROAS, unlocking better optimization toward revenue-qualified conversions",
      "Overhauled Merchant Center product feed hygiene with keyword-rich descriptions and seasonal alignment",
      "Built out extensive negative keyword lists to eliminate wasteful spend and improve traffic quality",
      "Adjusted bids across device, geo, audience, and dayparting dimensions based on performance data",
      "Managed and optimized campaigns across Search, Performance Max, Shopping, and Meta end-to-end",
    ],
    results: [
      { metric: "134%", label: "Online order increase" },
      { metric: "40%", label: "CPA reduction" },
      { metric: "65%", label: "ROAS improvement" },
    ],
    chart: "seasonal",
  },
  {
    tag: "SEO · Local Jewelry",
    title: "Grew a custom jewelry brand from 5K to 100K+ monthly visitors",
    challenge:
      "A Santa Barbara jeweler had built steady traffic through blogging but needed a structured SEO and content strategy to break through the plateau.",
    actions: [
      "Conducted keyword research to identify high-intent jewelry comparison topics",
      "Developed a content strategy centered on 'vs' comparison posts that captured search demand",
      "Promoted content across social channels and built an email capture system with a free E-Book",
      "Tracked analytics closely to double down on what was driving traffic and leads",
    ],
    results: [
      { metric: "20x", label: "Traffic growth (5K → 100K+ monthly visitors)" },
      { metric: "300+", label: "Page 1 keyword rankings" },
      { metric: "~50%", label: "Revenue now from web-driven leads" },
    ],
    chart: "growth",
    testimonial: {
      quote:
        "I used to get three to four sales a year off my website. Now, three to seven local people call me per week. Two to four people per week call me from out of town. My sales have been impacted greatly by these internet-driven clients. The sales from these calls vary from week to week but the total can be up to 50 percent of my business.",
      attribution: "Calla Gold, Calla Gold Jewelry",
    },
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
      { metric: "25%", label: "Increase in business (≈10 more calls per day)" },
      { metric: "60+", label: "Monthly leads to the website" },
      { metric: "280", label: "Monthly calls from Google & Yelp" },
    ],
    chart: "keywords",
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
  {
    tag: "Nonprofit · Foster Care",
    title: "Built and scaled the lead-generation system for a foster-care nonprofit",
    challenge:
      "Alternative Family Services (AFS), a foster-care and adoption nonprofit, needed to recruit resource (foster) parents through its website but had no conversion tracking and no real lead-capture funnel. Online was a negligible channel, with just 8 referrals in FY2017/18.",
    actions: [
      "Built conversion tracking and a resource-parent lead-capture funnel from scratch (ads to form to recruiter handoff to applicant follow-up)",
      "Ran cost-effective foster-parent recruitment campaigns across Google Ads and Facebook/Instagram",
      "Expanded lead capture over the years into donor recruitment and, alongside HR, new intern and volunteer forms",
      "Delivered ongoing analytics reporting on demographics, geography, and device trends to refine targeting and spend",
    ],
    results: [
      { metric: "7+ yrs", label: "Ongoing partnership since 2017" },
      { metric: "$11.51", label: "Cost per foster-parent lead on paid social" },
      { metric: "8.65%", label: "Google Ads lead conversion rate (≈$24 per lead)" },
    ],
  },
];

const analyses = [
  {
    tag: "Lift Study",
    title: "Performance Max incrementality across a national chiropractic network",
    description:
      "A national chiropractic franchise tested Performance Max across a participating group of clinics versus a non-participating control. The analysis isolated PMax's incremental contribution by comparing test vs. control performance, checked for cannibalization by comparing Organic NDC growth across groups (similar rates ruled it out), and used YoY checks to confirm gains exceeded normal seasonality.",
    findings: [
      { metric: "+28%", label: "Net lift in Paid Search leads vs. control" },
      { metric: "+17%", label: "Net lift in NDCs" },
      { metric: "−9.5%", label: "CPL improvement beyond market trends" },
    ],
  },
  {
    tag: "Daypart Test",
    title: "Sunday schedule restriction and account-wide budget density",
    description:
      "A national chiropractic franchise's Google Ads account was running 24-hour Sunday schedules. The test restricted Sundays to an 8 AM-4 PM window. The follow-up analysis revealed something larger than the daypart finding itself: the Google Ads algorithm reallocated the saved Sunday budget into more efficient weekday inventory, lifting overall account performance.",
    findings: [
      { metric: "25%", label: "Sunday CPL improvement" },
      { metric: "+43%", label: "Increase in total monthly leads" },
      { metric: "−27%", label: "Overall account CPL reduction" },
    ],
  },
  {
    tag: "Cross-Channel Correlation",
    title: "Social activity correlates with measurable lift in Search performance",
    description:
      "Performance data across channels for a national franchise account revealed a consistent pattern between Social campaign activity and Search efficiency. In windows where Social was active, Search produced both more new customer leads and lower CPLs - the kind of holistic signal single-channel reporting tends to hide.",
    findings: [
      { metric: "+8%", label: "Increase in new customer leads during Social-active windows" },
      { metric: "−6%", label: "Reduction in Search CPL during the same windows" },
    ],
  },
];

const tools = [
  "Google Ads",
  "Performance Max",
  "Microsoft Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "Google Merchant Center",
  "GA4",
  "Google Tag Manager",
  "Looker Studio",
  "Optmyzr",
  "Make (Integromat)",
  "Monday.com",
  "JavaScript (Ads Scripts)",
  "Google Sheets",
  "Ahrefs",
  "SEMrush",
  "Screaming Frog",
  "Whitespark",
  "Yext",
];

const specialties = [
  "Performance Marketing Strategy",
  "Cross-Channel Media Planning",
  "Franchise & Multi-Location Scaling",
  "Marketing Automation",
  "Attribution Modeling",
  "Budget Forecasting",
  "A/B Testing Frameworks",
  "Team Mentorship & Training",
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
    role: "Digital Marketing Manager (Contract)",
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
      style={{ width: size, height: size, objectFit: "contain" }}
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

// Scale-up data sets (real data, anonymized, leads per store indexed to 2023 avg = 100)
const RADIANT_SCALEUP = {
  leads: [125, 102, 99, 119, 123, 158, 172, 183, 183, 217, 225, 202],
  cpl: [74, 88, 114, 111, 92, 76, 69, 94, 87, 83, 79, 81],
  maxV: 250,
  yearTicks: [{ i: 0, label: "Mid 2023" }, { i: 6, label: "2024" }],
};
const DRYBAR_SCALEUP = {
  leads: [88, 86, 130, 139, 116, 88, 79, 86, 110, 97, 85, 94, 128, 144, 181, 199, 159, 144, 124, 161, 160, 155, 153, 179],
  cpl: [114, 135, 83, 67, 84, 98, 116, 107, 96, 97, 94, 109, 97, 88, 75, 69, 87, 95, 107, 93, 91, 99, 108, 96],
  maxV: 250,
  yearTicks: [{ i: 0, label: "2023" }, { i: 12, label: "2024" }],
};

// Efficient scale-up - leads up while CPL holds, indexed to 2023 avg
function ScaleUpChart({ leads, cpl, maxV = 400, yearTicks = [{ i: 0, label: "2023" }, { i: 12, label: "2024" }] }) {
  const W = 600;
  const H = 250;
  const padL = 30;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const n = leads.length;

  const x = (i) => padL + (i / (n - 1)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;
  const toPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const axis = "#9a958c";
  const cplColor = "#9aa6ad";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Leads and cost per lead through 2024 scale-up, indexed to 2023 average"
    >
      <line x1={padL} y1={y(100)} x2={W - padR} y2={y(100)} stroke={axis} strokeWidth="1" opacity="0.3" strokeDasharray="2 3" />
      <text x={padL - 6} y={y(100) + 3} textAnchor="end" fontSize="9" fill={axis}>100</text>
      <path d={toPath(cpl)} fill="none" stroke={cplColor} strokeWidth="2" strokeDasharray="5 4" />
      <path d={toPath(leads)} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {yearTicks.map((t) => (
        <text key={t.label} x={x(t.i)} y={H - 14} textAnchor="middle" fontSize="10" fill={axis}>
          {t.label}
        </text>
      ))}
    </svg>
  );
}

// Network contraction vs per-studio resilience - indexed to start (real Lash data, anonymized)
function ResilienceChart() {
  const studios = [100, 101, 99, 99, 96, 97, 97, 92, 84, 82, 80, 80, 75, 74, 72, 71, 65, 60, 58, 55, 51, 28, 22, 21, 20, 14, 15, 15, 15, 14, 14, 15, 15, 15, 15, 15];
  const lps = [100, 92, 102, 100, 95, 75, 71, 71, 71, 99, 102, 97, 94, 109, 100, 80, 73, 72, 70, 71, 65, 70, 83, 88, 80, 80, 91, 80, 71, 73, 71, 79, 80, 83, 93, 85];
  // Year tick positions (approx index in the 36-point series)
  const yearTicks = [{ i: 0, label: "2023" }, { i: 12, label: "2024" }, { i: 20, label: "2025" }, { i: 32, label: "2026" }];

  const W = 600;
  const H = 250;
  const padL = 30;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxV = 110;
  const n = studios.length;

  const x = (i) => padL + (i / (n - 1)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;
  const toPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const axis = "#9a958c";
  const studioColor = "#9aa6ad";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Studio network size versus leads per studio, indexed to start"
    >
      {[0, 50, 100].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={axis} strokeWidth="1" opacity="0.15" />
          <text x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fill={axis}>{v}</text>
        </g>
      ))}
      {/* studios - dashed gray, collapsing */}
      <path d={toPath(studios)} fill="none" stroke={studioColor} strokeWidth="2" strokeDasharray="5 4" />
      {/* leads per studio - solid gold, holding */}
      <path d={toPath(lps)} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {yearTicks.map((t) => (
        <text key={t.label} x={x(t.i)} y={H - 14} textAnchor="middle" fontSize="10" fill={axis}>
          {t.label}
        </text>
      ))}
    </svg>
  );
}

// Launch trajectory - leads up vs CPL down, indexed to launch month (anonymized)
function LaunchChart() {
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  // Indexed to launch month = 100
  const leads = [100, 130, 127, 154, 191, 231, 178, 167, 174, 172];
  const cpl = [100, 78, 91, 90, 86, 80, 62, 65, 67, 67];

  const W = 600;
  const H = 250;
  const padL = 30;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxV = 240;

  const x = (i) => padL + (i / (months.length - 1)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;
  const toPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const axis = "#9a958c";
  const cplColor = "#9aa6ad";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Leads and cost per lead since launch, indexed to launch month"
    >
      {/* baseline at 100 */}
      <line x1={padL} y1={y(100)} x2={W - padR} y2={y(100)} stroke={axis} strokeWidth="1" opacity="0.3" strokeDasharray="2 3" />
      <text x={padL - 6} y={y(100) + 3} textAnchor="end" fontSize="9" fill={axis}>100</text>
      {/* CPL - dashed gray, falling */}
      <path d={toPath(cpl)} fill="none" stroke={cplColor} strokeWidth="2" strokeDasharray="5 4" />
      {/* Leads - solid gold, rising */}
      <path d={toPath(leads)} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {/* month labels */}
      {months.map((m, i) => (
        <text key={i} x={x(i)} y={H - 14} textAnchor="middle" fontSize="10" fill={axis}>
          {m}
        </text>
      ))}
    </svg>
  );
}

// DM vs Non-DM per-store comparison - 2024 monthly (real VHA data, anonymized)
function ComparisonChart() {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N"];
  const monthFull = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const dm = [89.9, 116.1, 121.2, 99.1, 121.3, 111.2, 111.0, 120.1, 112.7, 115.1, 99.4];
  const nonDm = [75.7, 94.3, 101.0, 85.3, 100.1, 91.7, 91.7, 98.8, 88.1, 89.5, 78.6];

  const W = 600;
  const H = 250;
  const padL = 34;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxV = 140;

  const x = (i) => padL + (i / (months.length - 1)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;
  const toPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const axis = "#9a958c";
  const nonDmColor = "#9aa6ad";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Activations and upgrades per store per month, participating versus non-participating locations, 2024"
    >
      {/* gridlines */}
      {[0, 35, 70, 105, 140].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={axis} strokeWidth="1" opacity="0.15" />
          <text x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fill={axis}>
            {v}
          </text>
        </g>
      ))}
      {/* non-DM - dashed gray */}
      <path d={toPath(nonDm)} fill="none" stroke={nonDmColor} strokeWidth="2" strokeDasharray="5 4" />
      {/* DM - solid gold */}
      <path d={toPath(dm)} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {/* month labels */}
      {months.map((m, i) => (
        <text key={i} x={x(i)} y={H - 14} textAnchor="middle" fontSize="10" fill={axis}>
          {m}
        </text>
      ))}
    </svg>
  );
}

// Multi-year traffic growth - annual visitors (real Calla Gold GA data)
function GrowthChart() {
  const data = [
    { year: 2012, v: 54490 },
    { year: 2013, v: 198312 },
    { year: 2016, v: 1305060 },
    { year: 2017, v: 1012917 },
  ];
  const years = [2012, 2013, 2014, 2015, 2016, 2017];
  const W = 600;
  const H = 250;
  const padL = 40;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxV = 1400000;

  const x = (yr) => padL + ((yr - 2012) / (2017 - 2012)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.year).toFixed(1)} ${y(d.v).toFixed(1)}`).join(" ");
  const fmt = (v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${Math.round(v / 1000)}K`);
  const axis = "#9a958c";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Annual website visitors growing from 2012 to 2017"
    >
      {[0, 500000, 1000000].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={axis} strokeWidth="1" opacity="0.15" />
          <text x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fill={axis}>{fmt(v)}</text>
        </g>
      ))}
      <path d={path} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {data.map((d) => (
        <circle key={d.year} cx={x(d.year)} cy={y(d.v)} r="3.5" fill={GOLD} />
      ))}
      {years.map((yr) => (
        <text key={yr} x={x(yr)} y={H - 14} textAnchor="middle" fontSize="10" fill={axis}>{yr}</text>
      ))}
    </svg>
  );
}

// Multi-year traffic growth end

// Organic keyword growth - faithful redraw of Ahrefs trend (real Camp Canine data)
function KeywordChart() {
  const data = [
    { t: 2016, v: 0 },
    { t: 2018, v: 1 },
    { t: 2018.75, v: 400 },
    { t: 2019.5, v: 470 },
    { t: 2020.1, v: 410 },
    { t: 2020.5, v: 726 },
  ];
  const years = [2016, 2017, 2018, 2019, 2020];
  const W = 600;
  const H = 250;
  const padL = 36;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxV = 800;
  const t0 = 2016;
  const t1 = 2020.5;

  const x = (t) => padL + ((t - t0) / (t1 - t0)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.t).toFixed(1)} ${y(d.v).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${x(data[data.length - 1].t).toFixed(1)} ${y(0)} L ${x(data[0].t).toFixed(1)} ${y(0)} Z`;
  const axis = "#9a958c";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Organic keywords growing from near zero in 2018 to 726"
    >
      {[0, 250, 500, 750].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={axis} strokeWidth="1" opacity="0.15" />
          <text x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fill={axis}>{v}</text>
        </g>
      ))}
      <path d={areaPath} fill={GOLD} opacity="0.12" />
      <path d={linePath} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {years.map((yr) => (
        <text key={yr} x={x(yr)} y={H - 14} textAnchor="middle" fontSize="10" fill={axis}>{yr}</text>
      ))}
    </svg>
  );
}
// Organic keyword growth end

// Turnaround - leads recover to record highs while clinic count stays below peak (real TJ data, anonymized)
function TurnaroundChart() {
  const leads = [100, 88, 95, 90, 82, 89, 95, 101, 87, 74, 71, 69, 74, 77, 84, 81, 81, 84, 106, 127, 127];
  const clinics = [100, 100, 101, 101, 101, 102, 102, 103, 97, 79, 80, 75, 77, 80, 83, 85, 87, 87, 87, 92, 94];
  const tookLead = 12; // Aug 2025
  const yearTicks = [{ i: 0, label: "Aug 2024" }, { i: 17, label: "Jan 2026" }];

  const W = 600;
  const H = 262;
  const padL = 30;
  const padR = 16;
  const padT = 26;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxV = 140;
  const n = leads.length;

  const x = (i) => padL + (i / (n - 1)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;
  const toPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const axis = "#9a958c";
  const clinicColor = "#9aa6ad";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Leads and participating clinics before and after taking lead, indexed to start"
    >
      <line x1={padL} y1={y(100)} x2={W - padR} y2={y(100)} stroke={axis} strokeWidth="1" opacity="0.25" strokeDasharray="2 3" />
      <text x={padL - 6} y={y(100) + 3} textAnchor="end" fontSize="9" fill={axis}>100</text>
      {/* Sep-Dec 2025 search structure rollout band */}
      <rect x={x(13)} y={padT} width={x(16) - x(13)} height={plotH} fill={GOLD} opacity="0.09" />
      {/* took lead marker (behind lines) */}
      <line x1={x(tookLead)} y1={padT - 4} x2={x(tookLead)} y2={padT + plotH} stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65" />
      {/* Feb 2026 GBP optimizations marker (behind lines) */}
      <line x1={x(18)} y1={padT - 4} x2={x(18)} y2={padT + plotH} stroke={clinicColor} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      {/* participating clinics - dashed gray */}
      <path d={toPath(clinics)} fill="none" stroke={clinicColor} strokeWidth="2" strokeDasharray="5 4" />
      {/* leads - solid gold */}
      <path d={toPath(leads)} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {/* annotation labels (on top) */}
      <text x={x(tookLead)} y={padT - 10} textAnchor="middle" fontSize="9.5" fill={GOLD} fontWeight="600">Took lead</text>
      <text x={(x(13) + x(16)) / 2} y={padT + plotH - 74} textAnchor="middle" fontSize="9" fill={LIGHT_TEXT}>New search</text>
      <text x={(x(13) + x(16)) / 2} y={padT + plotH - 63} textAnchor="middle" fontSize="9" fill={LIGHT_TEXT}>structure</text>
      <text x={(x(13) + x(16)) / 2} y={padT + plotH - 52} textAnchor="middle" fontSize="9" fill={LIGHT_TEXT}>(batched, Sep–Dec)</text>
      <text x={x(18)} y={padT - 10} textAnchor="middle" fontSize="9.5" fill={NAVY_LIGHT} fontWeight="600">GBP optimizations</text>
      {yearTicks.map((t) => (
        <text key={t.label} x={x(t.i)} y={H - 14} textAnchor="middle" fontSize="10" fill={axis}>
          {t.label}
        </text>
      ))}
    </svg>
  );
}

// Seasonal line chart - current vs prior period, indexed (no absolute values)
function SeasonalChart({ dark = false }) {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  // Indexed shape (0-100), modeled on the real current-vs-prior seasonal curve
  const current = [9, 12, 17, 45, 100, 33, 13];
  const prior = [6, 8, 11, 28, 62, 19, 8];

  const W = 600;
  const H = 240;
  const padL = 16;
  const padR = 16;
  const padT = 20;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxV = 100;

  const x = (i) => padL + (i / (months.length - 1)) * plotW;
  const y = (v) => padT + plotH - (v / maxV) * plotH;

  const toPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const axis = dark ? "rgba(255,255,255,0.4)" : "#9a958c";
  const priorColor = dark ? "rgba(255,255,255,0.45)" : "#9aa6ad";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", fontFamily: "'DM Sans', sans-serif" }}
      role="img"
      aria-label="Conversion value, current period versus prior period, indexed"
    >
      {/* baseline */}
      <line x1={padL} y1={y(0)} x2={W - padR} y2={y(0)} stroke={axis} strokeWidth="1" opacity="0.3" />
      {/* prior period - dashed */}
      <path d={toPath(prior)} fill="none" stroke={priorColor} strokeWidth="2" strokeDasharray="5 4" />
      {/* current period - solid gold */}
      <path d={toPath(current)} fill="none" stroke={GOLD} strokeWidth="2.5" />
      {/* peak marker on current */}
      <circle cx={x(4)} cy={y(100)} r="4" fill={GOLD} />
      {/* month labels */}
      {months.map((m, i) => (
        <text
          key={m}
          x={x(i)}
          y={H - 14}
          textAnchor="middle"
          fontSize="11"
          fill={axis}
        >
          {m}
        </text>
      ))}
    </svg>
  );
}

// Horizontal lift bars for analysis cards
function LiftBars({ data }) {
  const max = Math.max(...data.map((d) => Math.abs(d.value)));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {data.map((d, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.76rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {d.label}
            </span>
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "1rem",
                color: GOLD,
              }}
            >
              {d.display}
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(Math.abs(d.value) / max) * 100}%`,
                background: GOLD,
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CaseStudyCard({ study, index, featured = false }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <FadeIn delay={index * 0.08}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
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

        <div style={{
          marginTop: 16,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: NAVY_LIGHT,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          {expanded ? "Hide details" : "View details"}
          <span style={{
            display: "inline-block",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            fontSize: "0.7rem",
          }}>▾</span>
        </div>

        {(
          <div
            style={{
              display: expanded ? "block" : "none",
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

            {study.testimonial && (
              <div
                style={{
                  marginTop: 20,
                  padding: "16px 20px",
                  background: `${NAVY}06`,
                  borderLeft: `3px solid ${GOLD}`,
                  borderRadius: 4,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: DARK,
                    lineHeight: 1.6,
                    margin: "0 0 10px",
                  }}
                >
                  "{study.testimonial.quote}"
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: NAVY,
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  — {study.testimonial.attribution}
                </p>
              </div>
            )}

            {study.chart === "keywords" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  Organic keywords ranked · Ahrefs
                </div>
                <KeywordChart />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Organic keywords ranked grew from roughly 1 in early 2018 to 726, climbing as the SEO work took hold (trend traced from Ahrefs).
                </div>
              </div>
            )}

            {study.chart === "growth" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  Annual website visitors
                </div>
                <GrowthChart />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Visitors grew roughly 20x over five years (peaking near 1.3M in 2016). Points mark the years with reported figures.
                </div>
              </div>
            )}

            {study.chart === "turnaround" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Leads vs. participating clinics · indexed to start
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: MEDIUM }}>
                    <span style={{ width: 16, height: 2.5, background: GOLD, display: "inline-block" }} />
                    Leads
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: LIGHT_TEXT }}>
                    <span style={{ width: 16, height: 0, borderTop: "2px dashed #9aa6ad", display: "inline-block" }} />
                    Participating clinics
                  </span>
                </div>
                <TurnaroundChart />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Both fell as clinics moved to a competing agency. We rebuilt the search structure in batches (Sep–Dec 2025); in February 2026,{" "}
                  <a
                    href="https://www.linkedin.com/in/shianne-ybarra-a62856191/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: NAVY_LIGHT, textDecoration: "underline", fontWeight: 500 }}
                  >
                    Shianne Ybarra
                  </a>{" "}
                  designed account-wide Google Business Profile optimizations that the specialist team executed. Reported Search leads then jumped, though much of that reflected leads being correctly reattributed from Organic rather than net-new volume - the true, attribution-adjusted lift was a more modest but durable ~19% per clinic year over year.
                </div>
              </div>
            )}

            {study.chart === "scaleup_hair" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Leads per store vs. cost per lead · indexed to 2023 average
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: MEDIUM }}>
                    <span style={{ width: 16, height: 2.5, background: GOLD, display: "inline-block" }} />
                    Leads per store
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: LIGHT_TEXT }}>
                    <span style={{ width: 16, height: 0, borderTop: "2px dashed #9aa6ad", display: "inline-block" }} />
                    Cost per lead
                  </span>
                </div>
                <ScaleUpChart leads={DRYBAR_SCALEUP.leads} cpl={DRYBAR_SCALEUP.cpl} maxV={DRYBAR_SCALEUP.maxV} yearTicks={DRYBAR_SCALEUP.yearTicks} />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Per-store lead volume roughly doubled while cost per lead fell below the 2023 average.
                </div>
              </div>
            )}

            {study.chart === "scaleup" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Leads per store vs. cost per lead · indexed to 2023 average
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: MEDIUM }}>
                    <span style={{ width: 16, height: 2.5, background: GOLD, display: "inline-block" }} />
                    Leads per store
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: LIGHT_TEXT }}>
                    <span style={{ width: 16, height: 0, borderTop: "2px dashed #9aa6ad", display: "inline-block" }} />
                    Cost per lead
                  </span>
                </div>
                <ScaleUpChart leads={RADIANT_SCALEUP.leads} cpl={RADIANT_SCALEUP.cpl} maxV={RADIANT_SCALEUP.maxV} yearTicks={RADIANT_SCALEUP.yearTicks} />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Per-store lead volume more than doubled while cost per lead stayed at or below the 2023 average.
                </div>
              </div>
            )}

            {study.chart === "resilience" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Studios in program vs. per-studio leads · indexed to start
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: MEDIUM }}>
                    <span style={{ width: 16, height: 2.5, background: GOLD, display: "inline-block" }} />
                    Leads per studio
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: LIGHT_TEXT }}>
                    <span style={{ width: 16, height: 0, borderTop: "2px dashed #9aa6ad", display: "inline-block" }} />
                    Studios in program
                  </span>
                </div>
                <ResilienceChart />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  The managed program shrank ~85% as studios were pulled, but per-studio lead volume held steady. Indexed to start = 100.
                </div>
              </div>
            )}

            {study.chart === "launch" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Leads vs. cost per lead · indexed to launch month
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: MEDIUM }}>
                    <span style={{ width: 16, height: 2.5, background: GOLD, display: "inline-block" }} />
                    Leads
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: LIGHT_TEXT }}>
                    <span style={{ width: 16, height: 0, borderTop: "2px dashed #9aa6ad", display: "inline-block" }} />
                    Cost per lead
                  </span>
                </div>
                <LaunchChart />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Leads climbed while cost per lead fell. Indexed to launch = 100.
                </div>
              </div>
            )}

            {study.chart === "comparison" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Activations + upgrades per store / month · 2024
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: MEDIUM }}>
                    <span style={{ width: 16, height: 2.5, background: GOLD, display: "inline-block" }} />
                    Participating stores
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: LIGHT_TEXT }}>
                    <span style={{ width: 16, height: 0, borderTop: "2px dashed #9aa6ad", display: "inline-block" }} />
                    Non-participating
                  </span>
                </div>
                <ComparisonChart />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Participating stores outperformed non-participating locations every month of the year.
                </div>
              </div>
            )}

            {study.chart === "seasonal" && (
              <div
                style={{
                  marginTop: 20,
                  padding: "20px 16px 8px",
                  background: `${NAVY}05`,
                  borderRadius: 6,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  Conversion value · holiday season
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: MEDIUM }}>
                    <span style={{ width: 16, height: 2.5, background: GOLD, display: "inline-block" }} />
                    This period
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: LIGHT_TEXT }}>
                    <span style={{ width: 16, height: 0, borderTop: "2px dashed #9aa6ad", display: "inline-block" }} />
                    Prior period
                  </span>
                </div>
                <SeasonalChart />
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: LIGHT_TEXT,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Indexed to peak. Values relative, not absolute.
                </div>
              </div>
            )}

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
    { id: "insight", label: "Analysis" },
    { id: "tools", label: "Tools" },
    { id: "about", label: "About" },
  ];

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        ::selection { background: ${NAVY}; color: ${GOLD}; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-headshot {
            order: -1;
            justify-self: center;
            width: 120px !important;
            height: 120px !important;
            margin-bottom: 12px;
          }
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
        <div className="hero-grid" style={{
          animation: "fadeUp 0.8s ease",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "clamp(32px, 5vw, 60px)",
          alignItems: "center",
        }}>
          <div>
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
              Senior Performance Marketing Strategist
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
              Paid media strategy, campaign operations, and marketing automation.
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
              10+ years working with franchise networks, national brands, and
              DTC e-commerce. $1M+ in monthly ad spend managed since 2020, plus
              an independent consulting practice running since 2013. Based in
              Santa Barbara, CA.
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
                Contact
              </button>
            </div>
          </div>

          <div className="hero-headshot" style={{
            width: "clamp(160px, 18vw, 220px)",
            height: "clamp(160px, 18vw, 220px)",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: `4px solid ${BORDER}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}>
            <img
              src="/gabriel-perea.jpg"
              alt="Gabe Perea"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
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
          <Stat number="25+" label="SMB Clients" delay={0.2} />
          <Stat number="10+" label="Years Experience" delay={0.3} />
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
              maxWidth: 680,
              lineHeight: 1.6,
              marginBottom: 36,
            }}
          >
            A selection of work across agency and independent consulting. Clients anonymized.
          </p>
        </FadeIn>

        <FadeIn>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: GOLD,
            marginBottom: 16,
            fontWeight: 600,
            paddingBottom: 8,
            borderBottom: `1px solid ${BORDER}`,
          }}>Featured</h3>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 44 }}>
          {agencyCaseStudies
            .filter((s) => s.featured)
            .map((study, i) => (
              <CaseStudyCard key={`featured-${i}`} study={study} index={i} featured={true} />
            ))}
        </div>

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
          }}>Agency — Paid Search & Operations</h3>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {agencyCaseStudies
            .filter((s) => !s.featured)
            .map((study, i) => (
              <CaseStudyCard key={`agency-${i}`} study={study} index={i} />
            ))}
        </div>

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
          }}>Independent Consulting — DTC, SEO & Web</h3>
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

      {/* ── Analysis ──────────────────────────────────────── */}
      <section
        id="insight"
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)",
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
          color: "white",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
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
              Analysis
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                color: "white",
                fontWeight: 400,
                marginBottom: 12,
                letterSpacing: "-0.01em",
              }}
            >
              Studies and investigations
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.7)",
                maxWidth: 680,
                lineHeight: 1.6,
                marginBottom: 36,
              }}
            >
              Tests and analyses across agency and independent work. Clients anonymized.
            </p>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: 20,
            }}
          >
            {analyses.map((a, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: "clamp(20px, 3vw, 28px)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: GOLD,
                      marginBottom: 10,
                      fontWeight: 600,
                    }}
                  >
                    {a.tag}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)",
                      color: "white",
                      lineHeight: 1.3,
                      fontWeight: 400,
                      marginBottom: 14,
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.86rem",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.6,
                      marginBottom: 20,
                      flex: 1,
                    }}
                  >
                    {a.description}
                  </p>
                  <div
                    style={{
                      paddingTop: 16,
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {a.liftData ? (
                      <LiftBars data={a.liftData} />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {a.findings.map((f, j) => (
                          <div
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 10,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Instrument Serif', Georgia, serif",
                                fontSize: "1.2rem",
                                color: GOLD,
                                minWidth: "fit-content",
                              }}
                            >
                              {f.metric}
                            </span>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.78rem",
                                color: "rgba(255,255,255,0.7)",
                                lineHeight: 1.4,
                              }}
                            >
                              {f.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
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
            Day-to-day tools and areas of focus.
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
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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
              <SectionLabel>About</SectionLabel>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: MEDIUM,
                  lineHeight: 1.7,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 12,
                }}
              >
                <p style={{ margin: 0 }}>
                  I'm a senior performance marketing strategist based in Santa
                  Barbara, CA. I work on paid media strategy, campaign
                  operations, and marketing automation for franchise networks,
                  national brands, and DTC e-commerce. Over a decade in the
                  field; managing $1M+ in monthly ad spend since 2020.
                </p>
                <p style={{ margin: 0 }}>
                  Most of my work sits at the intersection of execution and
                  analysis - running paid media programs, building the
                  measurement and automation systems behind them, and digging
                  into the data to understand what's actually working.
                </p>
                <p style={{ margin: 0 }}>
                  I also mentor junior team members and lead internal training
                  on things like tCPA strategy, conversion tracking, Google Tag
                  Manager, JavaScript for paid search, and budget forecasting.
                </p>
                <p style={{ margin: 0, color: LIGHT_TEXT }}>
                  Outside of paid media, I work on side projects involving
                  systems, research, and writing. They keep me sharp on the
                  parts of the job that aren't strictly platform mechanics.
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
                  Certifications
                </h3>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: MEDIUM,
                    lineHeight: 1.7,
                  }}
                >
                  <div>Google Ads Search Certified</div>
                  <div>CXL Certified in Conversion Rate Optimization</div>
                  <div>Blue Array Certified SEO Manager & Technical SEO Specialist</div>
                </div>
              </div>

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
                    fontSize: "0.82rem",
                    color: MEDIUM,
                    lineHeight: 1.6,
                  }}
                >
                  <div>BA, Psychology - Cal State Long Beach</div>
                  <div>AS, Criminology - Santa Barbara City College</div>
                  <div>AA, Social and Behavioral Sciences - Santa Barbara City College</div>
                </div>
              </div>

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
                  Outside work
                </h3>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: MEDIUM,
                    lineHeight: 1.6,
                  }}
                >
                  Long-distance Sierra mountaineering - summited Mt. Whitney via the High Sierra and John Muir trails, and joined the first group to summit Mt. Tyndall in the 2025 season. Competed in three amateur Muay Thai bouts, winning two.
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
          <SectionLabel>Contact</SectionLabel>
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
            Get in touch.
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
            Open to conversations about new roles, consulting engagements, or
            interesting problems. Consulting work spans Google Ads, SEO,
            analytics, and web - typically on a monthly retainer or
            project basis, async-friendly.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 16,
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
            <a
              href="/Gabriel_Perea_Resume_2026.pdf"
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
              Download Resume
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
            Santa Barbara, CA · 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
