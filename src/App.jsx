import { useState, useEffect, useRef } from "react";

// ============================================================
// CONFIGURATION — paste your recording/video links here
// ============================================================
const surveyRecordingLinks = [
  "https://mahindraecolecentrale-my.sharepoint.com/personal/se24ucse239_mahindrauniversity_edu_in/_layouts/15/stream.aspx?id=%2Fpersonal%2Fse24ucse239%5Fmahindrauniversity%5Fedu%5Fin%2FDocuments%2Fdt%2Fstudent%2Dm%2Dcollege%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E87678375%2D296e%2D46ce%2Dba97%2Dd4f447452b0b",
  "https://mahindraecolecentrale-my.sharepoint.com/personal/se24ucse239_mahindrauniversity_edu_in/_layouts/15/stream.aspx?sw=bypass&bypassReason=abandoned&id=%2Fpersonal%2Fse24ucse239_mahindrauniversity_edu_in%2FDocuments%2Fdt%2FSr-daily-commuter%2Emp4&startedResponseCatch=true&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ec71e084b-a475-48c7-b6a1-9adfd559c08a",
  "https://mahindraecolecentrale-my.sharepoint.com/personal/se24ucse239_mahindrauniversity_edu_in/_layouts/15/stream.aspx?sw=bypass&bypassReason=abandoned&id=%2Fpersonal%2Fse24ucse239_mahindrauniversity_edu_in%2FDocuments%2Fdt%2Fghmc-worker-F-interview%2Emp4&startedResponseCatch=true&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E17b385eb-28bd-4125-a245-f6433951521a",
  "https://mahindraecolecentrale-my.sharepoint.com/personal/se24ucse239_mahindrauniversity_edu_in/_layouts/15/stream.aspx?id=%2Fpersonal%2Fse24ucse239%5Fmahindrauniversity%5Fedu%5Fin%2FDocuments%2Fdt%2FF%2Dschool%2Ddaily%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E0496aa8c%2Da02c%2D4686%2D84e7%2Dd7a2ff7466b7",
];

const prototypeScreenshots = [
  `${import.meta.env.BASE_URL}images/prototype.png`,
];
// ============================================================

// ---- EMBEDDED IMAGE DATA (auto-generated) ----
const IMGS = {
  senior: `${import.meta.env.BASE_URL}images/senior.png`,
  ghmc: `${import.meta.env.BASE_URL}images/ghmc.png`,
  office: `${import.meta.env.BASE_URL}images/office.png`,
  female: `${import.meta.env.BASE_URL}images/female.png`,
  student: `${import.meta.env.BASE_URL}images/student.png`,
  problems: `${import.meta.env.BASE_URL}images/problems.png`,
  rootcause: `${import.meta.env.BASE_URL}images/rootcause.png`,
};

// ---- DATA ----

const teamMembers = [
  { name: "Shashanth Reddy Mannem", id: "SE24UCSE060", role: "" },
  { name: "Mayank Rao Ponnala",      id: "SE24UCSE026", role: "" },
  { name: "Krishna Pali",            id: "SE24UCSE001", role: "" },
  { name: "Surampally Aryan",        id: "SE24UCSE239", role: "" },
  { name: "Muhammad Muzaffar Shaik", id: "SE24UCSE252", role: "" },
  { name: "Pothuraju Satya Keerthi", id: "SE24UCSE061", role: "" },
  { name: "Shreeji Kunawat",         id: "SE24UMEE033", role: "" },
  { name: "Rashmika Santra",         id: "SE24UCIE007", role: "" },
];

const personas = [
  {
    name: "Anaya", role: "School Student", age: 14,
    quote: "I just want to reach school safely and on time without getting pushed around.",
    goals: ["Reach school safely and on time every day", "Avoid overcrowded buses and unsafe travel conditions", "Travel independently without worrying parents", "Have reliable bus timings to plan her routine"],
    frustrations: ["Overcrowded buses — physically uncomfortable and unsafe", "Long waiting times and unreliable schedules", "Heavy books during long walks to bus stops", "Limited visibility of travel status for parents"],
    scenario: "Anaya wakes early, checks the time carefully, and walks to the bus stop with a friend. She becomes anxious when buses arrive overcrowded. During the journey, pushing and crowding make her uncomfortable — she worries about missing her stop in heavy crowds.",
    color: "#f97316", emoji: "🎒",
  },
  {
    name: "James Naidu", role: "Office Commuter (IT Professional)", age: 32,
    quote: "Every minute I lose on the commute is time I can\\'t get back.",
    goals: ["Reach office on time consistently", "Minimize commute uncertainty and delays", "Use travel time productively", "Reduce dependency on expensive cab rides"],
    frustrations: ["Unreliable bus frequency and inconsistent timings", "Overcrowding during peak office hours", "Poor real-time information makes planning difficult", "Forced to book expensive cabs due to delays"],
    scenario: "James checks traffic and bus timings on his phone before leaving. At the stop he monitors arrivals, often frustrated. He tries to work on the bus but overcrowding reduces concentration. Some days he spends extra on cabs to avoid exhaustion.",
    color: "#3b82f6", emoji: "💼",
  },
  {
    name: "Priya Joseph", role: "Female Commuter (School Teacher)", age: 27,
    quote: "I just want my commute to feel predictable, comfortable, and safe.",
    goals: ["Reach destinations safely and on time", "Avoid stressful or unsafe travel situations", "Experience smoother and more comfortable rides", "Have reliable timing and route information"],
    frustrations: ["Overcrowding, long waits, uneven roads near stops", "Sometimes feels unsafe in crowded conditions or poor lighting", "Rough driving and unclear announcements increase anxiety", "Unpredictable schedules exhaust energy before work begins"],
    scenario: "Priya prepares early and checks transport timings before leaving. She walks carefully to the stop, avoiding damaged footpaths. Inside the bus, sudden braking and lack of personal space make the commute uncomfortable. She stays alert throughout to feel secure.",
    color: "#ec4899", emoji: "👩‍🏫",
  },
  {
    name: "Maryama", role: "GHMC Sanitation Worker", age: 35,
    quote: "I wake before the city, not for ambition, but for survival.",
    goals: ["Earn stable income to support family", "Manage expenses within limited salary", "Keep job secure — no risk of losing it", "Stay physically fit enough to continue working daily"],
    frustrations: ["Very low salary relative to physical effort", "Work is exhausting with no real growth path", "No reserved seating or dignity-recognising system", "No benefit over walking felt — cost incurred, dignity not gained"],
    scenario: "She wakes at 4–5 AM, walks in darkness carrying work tools, waits alone at a cold bus stop. Stands if full, silent and enduring. Returns late, depleted. The cycle of cyclic hopelessness continues — survival over everything else.",
    color: "#10b981", emoji: "🧹",
  },
  {
    name: "Ramesh Rao", role: "Senior Citizen (Retired)", age: 68,
    quote: "I don\\'t need speed, I need safety and certainty every day.",
    goals: ["Travel safely and comfortably without confusion", "Buses on time — no long waits", "Easy boarding and seating given physical limitations", "Stay independent, not dependent on family for travel"],
    frustrations: ["Irregular bus timings and no clear info at stops", "Long waits physically tiring, especially in sun", "Overcrowded buses make boarding difficult and risky", "Most transport updates are digital — inaccessible to him"],
    scenario: "Ramesh plans trips carefully to avoid peak hours. He walks slowly to the stop, unsure when the bus arrives. When it comes it is crowded — boarding is difficult. Sudden stops and jerks during the journey make him anxious. He returns home exhausted.",
    color: "#8b5cf6", emoji: "👴",
  },
];

const journeyMaps = [
  { key: "senior", label: "Ramesh Rao — Senior Citizen", persona: "68 • Retired • Bachupally", scores: [0, -3, -6, -4, -8, -5], theme: "#8b5cf6" },
  { key: "ghmc",   label: "Maryama — GHMC Worker",      persona: "35 • Sanitation Worker • Bachupally", scores: [-2, -4, -6, -5, -6, -7], theme: "#10b981" },
  { key: "office", label: "James Naidu — Office Commuter", persona: "32 • IT Professional • Bachupally→Hitech City", scores: [1, 0, -4, -3, -5, -2], theme: "#3b82f6" },
  { key: "female", label: "Priya Joseph — Female Commuter", persona: "27 • School Teacher • Bachupally", scores: [-1, -2, -3, -1, -4, 2], theme: "#ec4899" },
  { key: "student", label: "Anaya — School Student", persona: "14 • 9th Grade • Bachupally", scores: [-1, 2, -3, -4, -5, 3], theme: "#f97316" },
];

const hmwQuestions = [
  { q: "How might we make public transport more reliable for daily commuters?", category: "Reliability" },
  { q: "How might we create safer bus stops for early morning and late night travel?", category: "Safety" },
  { q: "How might we provide real-time bus tracking and travel updates?", category: "Technology" },
  { q: "How might we reduce overcrowding and improve commuter comfort?", category: "Comfort" },
  { q: "How might we integrate buses, metro, autos, and walking into one connected system?", category: "Integration" },
  { q: "How might we design a transport ecosystem that supports essential workers with dignity and accessibility?", category: "Equity" },
  { q: "How might we reduce waiting frustration at bus stops?", category: "Comfort" },
  { q: "How might we make bus stops more accessible for elderly and disabled people?", category: "Accessibility" },
  { q: "How might we reduce delays in public transport during peak hours?", category: "Reliability" },
  { q: "How might we improve schedule accuracy for buses and trains?", category: "Reliability" },
  { q: "How might we predict and prevent overcrowding before it happens?", category: "Technology" },
  { q: "How might we ensure public transport remains reliable during bad weather or traffic congestion?", category: "Reliability" },
  { q: "How might we improve passenger safety during night travel?", category: "Safety" },
  { q: "How might we reduce harassment and theft in public transport?", category: "Safety" },
  { q: "How might we build commuter trust in public transport systems?", category: "Trust" },
  { q: "How might we make daily commuting less stressful and exhausting?", category: "Comfort" },
  { q: "How might we improve cleanliness inside buses and stations?", category: "Comfort" },
  { q: "How might we simplify ticket booking and payment systems?", category: "Technology" },
  { q: "How might we help commuters plan faster and more efficient routes?", category: "Technology" },
  { q: "How might we encourage private vehicle users to shift to public transport?", category: "Adoption" },
];

const categoryColors = {
  Reliability: "#f97316", Safety: "#ef4444", Technology: "#3b82f6",
  Comfort: "#10b981", Integration: "#8b5cf6", Equity: "#ec4899",
  Accessibility: "#f59e0b", Trust: "#06b6d4", Adoption: "#84cc16",
};

const brainwritingIdeas = [
  { q: "Make public transport more reliable for daily commuters", ideas: ["Increase bus frequency during peak hours", "Use AI-based traffic prediction for route planning", "Introduce dedicated bus lanes", "Improve vehicle maintenance schedules", "Provide real-time delay notifications", "Create backup buses for breakdown situations"] },
  { q: "Create safer bus stops for early morning and late night travel", ideas: ["Install bright LED lighting at bus stops", "Add CCTV cameras with live monitoring", "Provide emergency SOS buttons", "Increase police or security patrols nearby", "Design bus stops with open visibility and fewer hidden areas", "Introduce women-only waiting zones during late hours"] },
  { q: "Provide real-time bus tracking and travel updates", ideas: ["Develop a live GPS bus tracking app", "Show arrival timings on digital displays at stops", "Send delay alerts through SMS and notifications", "Integrate voice announcements for visually impaired users", "Use crowd-sourced traffic updates from commuters", "Provide route updates through WhatsApp or chatbot services"] },
  { q: "Reduce overcrowding and improve commuter comfort", ideas: ["Increase the number of buses during rush hours", "Introduce seat reservation options for long routes", "Use occupancy sensors to monitor crowd levels", "Improve ventilation and air conditioning in buses", "Create separate standing and seating zones", "Encourage staggered office timings to spread demand"] },
  { q: "Integrate buses, metro, autos, and walking into one connected system", ideas: ["Create a unified payment smart card", "Build a single transport app for all modes", "Design better pedestrian pathways near stations", "Add shared auto and cycle hubs near metro stations", "Synchronize bus timings with metro arrivals", "Provide integrated route planning with live updates"] },
  { q: "Design a transport ecosystem that supports essential workers", ideas: ["Provide discounted travel passes for essential workers", "Introduce dedicated late-night and early-morning routes", "Ensure all buses and stations are wheelchair accessible", "Add safe rest areas and clean toilets at transit hubs", "Provide multilingual audio and visual travel information", "Create employer-supported transport partnerships for workers"] },
];

const learnings = [
  { icon: "🎯", title: "User-Centered Design", text: "Real empathy with commuters — students, workers, seniors — shaped every decision. Listening first, designing second." },
  { icon: "😣", title: "Commuter Pain Points", text: "Overcrowding, unreliable timings, and lack of real-time info emerged as universal frustrations across all user segments." },
  { icon: "🤝", title: "Team Collaboration", text: "Eight perspectives led to richer insights. Diverse backgrounds caught blind spots and challenged assumptions at every step." },
  { icon: "✨", title: "Accessibility & Dignity", text: "Transport is not just logistics — it is about dignity. Senior citizens, essential workers, and children need systems designed specifically for them." },
  { icon: "🔬", title: "Research-Driven Thinking", text: "Moving from intuition to evidence transformed our approach. Surveys, interviews, and journey maps grounded every HMW question in lived reality." },
  { icon: "🌆", title: "Real-World Complexity", text: "Urban transport challenges are deeply systemic. Fixing one node without understanding the whole network leads to incomplete solutions." },
];

const workflowSteps = [
  { id: 1, label: "Survey Research",     icon: "📋" },
  { id: 2, label: "User Personas",       icon: "👤" },
  { id: 3, label: "Journey Maps and Empathy Maps",        icon: "🗺️" },
  { id: 4, label: "Root Cause Analysis", icon: "🌳" },
  { id: 5, label: "HMW Questions",       icon: "💡" },
  { id: 6, label: "6-5-3 Brainwriting",  icon: "🧠" },
  { id: 7, label: "Prototype",           icon: "🔧" },
];

// ---- HOOKS ----
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ---- REUSABLE COMPONENTS ----
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
      <h2 style={{ fontFamily: "\'Cormorant Garamond\', Georgia, serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
        {children}
      </h2>
      {subtitle && <p style={{ color: "#64748b", marginTop: "0.6rem", fontSize: "1rem", letterSpacing: "0.05em" }}>{subtitle}</p>}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "1.25rem" }}>
        <div style={{ height: 1, width: 40, background: "rgba(249,115,22,0.4)" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316" }} />
        <div style={{ height: 1, width: 40, background: "rgba(249,115,22,0.4)" }} />
      </div>
    </div>
  );
}

function StepBadge({ n }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: "50%",
      background: "linear-gradient(135deg,#f97316,#ec4899)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: "1rem", color: "#fff", flexShrink: 0,
      boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
    }}>{n}</div>
  );
}

// ---- MODAL COMPONENT ----
function ImageModal({ src, caption, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", cursor: "zoom-out" }}>
      <img src={src} alt={caption} onClick={e => e.stopPropagation()} style={{ maxWidth: "94vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 6, boxShadow: "0 0 100px rgba(0,0,0,0.9)" }} />
      {caption && <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "1rem", textAlign: "center" }}>{caption}</p>}
      <button onClick={onClose} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8", borderRadius: 8, padding: "0.4rem 0.85rem", cursor: "pointer", fontSize: "0.85rem" }}>✕ Close</button>
    </div>
  );
}

// ---- NAV ----
const navLinks = [["About","#about"],["Team","#team"],["Workflow","#workflow"],["Learnings","#learnings"],["Contact","#contact"]];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, backdropFilter: scrolled ? "blur(16px)" : "none", background: scrolled ? "rgba(7,11,20,0.92)" : "transparent", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.4s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <span style={{ fontFamily: "\'Cormorant Garamond\', Georgia, serif", fontWeight: 700, fontSize: "1.2rem", color: "#f97316", letterSpacing: "0.02em" }}>Design Scholars</span>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} style={{ color: "#64748b", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#f97316"} onMouseLeave={e => e.target.style.color = "#64748b"}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ---- HERO BACKGROUND ----
function HeroBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(249,115,22,0.14) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 85% 85%, rgba(236,72,153,0.10) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 15% 70%, rgba(59,130,246,0.07) 0%, transparent 55%)" }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }} viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
        {[...Array(10)].map((_, i) => (
          <line key={i} x1="0" y1={60 + i * 70} x2="1400" y2={60 + i * 70} stroke="#f97316" strokeWidth="1" strokeDasharray="18 14"
            style={{ animation: `slideLine ${5 + i * 0.3}s linear infinite`, animationDelay: `${-i * 0.6}s` }} />
        ))}
        {[...Array(6)].map((_, i) => (
          <circle key={`dot-${i}`} cx={100 + i * 200} cy={40 + (i % 3) * 60} r="3" fill="#f97316" opacity="0.6"
            style={{ animation: `pulseDot ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }} />
        ))}
        <style>{`
          @keyframes slideLine { to { stroke-dashoffset: -32; } }
          @keyframes pulseDot { 0%,100%{r:3;opacity:0.4} 50%{r:5;opacity:0.9} }
        `}</style>
      </svg>
      {[...Array(16)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 4,
          height: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 4,
          background: i % 2 === 0 ? "#f97316" : "#ec4899",
          left: `${(i * 41 + 8) % 98}%`, top: `${(i * 61 + 15) % 90}%`,
          opacity: 0.25,
          animation: `float${i % 3} ${5 + i * 0.45}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }} />
      ))}
      <style>{`
        @keyframes float0{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}
        @keyframes fadeUpHero{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}

// ---- HERO ----
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "7rem 1.5rem 4rem" }}>
      <HeroBg />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 100, padding: "0.3rem 1rem", marginBottom: "2rem", animation: "fadeUpHero 0.8s ease forwards" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", animation: "pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color: "#f97316", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Design Thinking Project · 2025–26</span>
        </div>
        <h1 style={{ fontFamily: "\'Cormorant Garamond\', Georgia, serif", fontSize: "clamp(3.5rem,8vw,6rem)", fontWeight: 700, lineHeight: 1.0, color: "#f1f5f9", marginBottom: "0.4rem", animation: "fadeUpHero 0.9s 0.1s ease both", letterSpacing: "-0.03em" }}>
          Design Scholars
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2.5rem", animation: "fadeUpHero 0.9s 0.2s ease both" }}>
          Mentor: Raj Narayanan &nbsp;·&nbsp; 8 Members
        </p>
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "2.25rem 2.5rem", backdropFilter: "blur(12px)", maxWidth: 780, margin: "0 auto 3rem", animation: "fadeUpHero 0.9s 0.3s ease both" }}>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#f97316", fontWeight: 700, marginBottom: "1rem" }}>Problem Statement</p>
          <p style={{ fontSize: "clamp(1.05rem,2.2vw,1.35rem)", color: "#e2e8f0", fontStyle: "italic", lineHeight: 1.65, fontFamily: "\'Cormorant Garamond\', Georgia, serif", fontWeight: 600 }}>
            "How might we make public transport reliable and attractive for daily commuters to reduce dependence on private vehicles?"
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUpHero 0.9s 0.45s ease both" }}>
          <a href="#workflow" style={{ padding: "0.8rem 2rem", background: "linear-gradient(135deg,#f97316,#ec4899)", color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: "0.9rem", boxShadow: "0 6px 24px rgba(249,115,22,0.3)", letterSpacing: "0.02em" }}>
            View Documentation
          </a>
          <a href="#team" style={{ padding: "0.8rem 2rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
            Meet the Team
          </a>
        </div>
        <div style={{ marginTop: "5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.35, animation: "fadeUpHero 1s 0.7s ease both" }}>
          <span style={{ fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom,#64748b,transparent)" }} />
        </div>
      </div>
    </section>
  );
}

// ---- ABOUT ----
function About() {
  const stats = [
    { n: "5", label: "User Personas", icon: "👤" },
    { n: "5", label: "Journey Maps", icon: "🗺️" },
    { n: "120+", label: "HMW Questions", icon: "💡" },
    { n: "60+", label: "Ideas Generated", icon: "🧠" },
    { n: "6–8", label: "People Surveyed", icon: "📋" },
  ];
  return (
    <section id="about" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><SectionTitle subtitle="What this project is about">About the Project</SectionTitle></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
          {[
            { icon: "🚌", title: "The Challenge", body: "Public transport in Indian cities is often unreliable, overcrowded, and inaccessible — pushing people toward private vehicles and worsening urban congestion." },
            { icon: "🔍", title: "Our Approach", body: "We used Design Thinking — Empathize, Define, Ideate, Prototype, Test — to deeply understand commuter pain points across five diverse user segments." },
            { icon: "🎯", title: "The Goal", body: "Design solutions that make public transport genuinely attractive, reliable, and dignified for every kind of daily commuter — students, workers, elderly, and professionals." },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "2rem", height: "100%", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.35)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "1.2rem" }}>{c.icon}</div>
                <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.75rem", fontFamily: "\'Cormorant Garamond\', Georgia, serif" }}>{c.title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.75, fontSize: "0.9rem" }}>{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "1.25rem" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "1.5rem 1rem", background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.12)", borderRadius: 14, transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.09)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(249,115,22,0.05)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.12)"; }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f97316", fontFamily: "\'Cormorant Garamond\', Georgia, serif" }}>{s.n}</div>
                <div style={{ color: "#64748b", fontSize: "0.78rem", marginTop: "0.25rem", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ---- TEAM ----
function Team() {
  return (
    <section id="team" style={{ padding: "6rem 1.5rem", background: "rgba(255,255,255,0.012)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><SectionTitle subtitle="The minds behind the research">Our Team</SectionTitle></FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ maxWidth: 360, margin: "0 auto 3.5rem", textAlign: "center", padding: "2rem 1.5rem", background: "linear-gradient(135deg,rgba(249,115,22,0.08),rgba(236,72,153,0.06))", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20 }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 1rem" }}>🎓</div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#f97316", fontWeight: 700, marginBottom: "0.4rem" }}>Project Mentor</p>
            <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.5rem", fontFamily: "\'Cormorant Garamond\', Georgia, serif" }}>Raj Narayanan</h3>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "1.1rem" }}>
          {teamMembers.map((m, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ padding: "1.4rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; e.currentTarget.style.background = "rgba(249,115,22,0.04)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: `hsl(${i * 47 + 15},65%,50%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "1rem", marginBottom: "0.9rem", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                  {m.name.charAt(0)}
                </div>
                <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem", lineHeight: 1.3 }}>{m.name}</div>
                <div style={{ color: "#f97316", fontSize: "0.73rem", fontWeight: 600, marginBottom: "0.2rem" }}>{m.role}</div>
                <div style={{ color: "#334155", fontSize: "0.7rem", fontFamily: "monospace" }}>{m.id}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- WORKFLOW ----
function StepSection({ step, children }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} id={`step${step.id}`} style={{ marginBottom: "5.5rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "all 0.8s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <StepBadge n={step.id} />
        <div>
          <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#475569", fontWeight: 700 }}>Step {step.id}</div>
          <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.3rem", fontFamily: "\'Cormorant Garamond\', Georgia, serif", marginTop: "0.1rem" }}>{step.label}</h3>
        </div>
        <div style={{ marginLeft: "auto", fontSize: "2rem" }}>{step.icon}</div>
      </div>
      <div style={{ paddingLeft: "0" }}>{children}</div>
    </div>
  );
}

// Step 1 Survey
function SurveyStep() {
  const highlights = [
    { metric: "Bus-Bypass Rate", icon: "🚌", desc: "Passengers frequently watched buses pass without stopping — already full. A systemic capacity failure." },
    { metric: "Physical Strain Index", icon: "😰", desc: "Standing the entire journey in heat and crowds causes exhaustion before work even begins." },
    { metric: "Productivity Loss", icon: "⏱️", desc: "Students and daily-wage workers reported chronic lateness due to unreliable bus arrival patterns." },
    { metric: "Emotional Mapping", icon: "💭", desc: "Real emotions — anxiety, resignation, invisible frustration — surface beyond basic satisfaction scores." },
  ];
  return (
    <StepSection step={workflowSteps[0]}>
      <p style={{ color: "#64748b", marginBottom: "2rem", lineHeight: 1.8, maxWidth: 720, fontSize: "0.9rem" }}>
        We conducted structured interviews with <strong style={{ color: "#94a3b8" }}>6–8 individuals</strong> from diverse commuter backgrounds — school students, GHMC sanitation workers, office professionals, women commuters, and senior citizens — using rating scales, open-ended questions, and direct observation.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.1rem", marginBottom: "2.5rem" }}>
        {highlights.map((h, i) => (
          <div key={i} style={{ padding: "1.4rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, transition: "border-color 0.25s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
              <span style={{ fontSize: "1.2rem" }}>{h.icon}</span>
              <span style={{ color: "#f97316", fontWeight: 700, fontSize: "0.85rem" }}>{h.metric}</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.65, margin: 0 }}>{h.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "0.75rem" }}>
        <p style={{ color: "#334155", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>Survey Recordings</p>
        <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
          {surveyRecordingLinks.map((link, i) => (
            <div key={i} style={{ padding: "0.875rem 1.25rem", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span>🎥</span>
              {link.startsWith("PUT")
                ? <span style={{ color: "#334155", fontSize: "0.82rem", fontStyle: "italic" }}>Recording {i + 1} — add link to <code style={{ color: "#475569" }}>surveyRecordingLinks</code></span>
                : <a href={link} target="_blank" rel="noreferrer" style={{ color: "#f97316", fontSize: "0.82rem" }}>View Recording {i + 1}</a>}
            </div>
          ))}
        </div>
      </div>
    </StepSection>
  );
}

// Step 2 Personas
function PersonaCard({ p }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${p.color}25`, borderRadius: 16, overflow: "hidden", transition: "all 0.3s", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "1.5rem", borderBottom: `1px solid ${p.color}15` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: `${p.color}15`, border: `2px solid ${p.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>{p.emoji}</div>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{p.name}</div>
            <div style={{ color: p.color, fontSize: "0.75rem", fontWeight: 600, marginTop: "0.2rem" }}>{p.role} · Age {p.age}</div>
          </div>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "0.84rem", fontStyle: "italic", lineHeight: 1.55, borderLeft: `3px solid ${p.color}`, paddingLeft: "0.75rem", margin: 0 }}>"{p.quote}"</p>
      </div>
      {expanded && (
        <div style={{ padding: "1.25rem 1.5rem", flex: 1 }}>
          <div style={{ marginBottom: "1.1rem" }}>
            <p style={{ color: p.color, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>Goals</p>
            {p.goals.map((g, i) => <div key={i} style={{ color: "#64748b", fontSize: "0.82rem", padding: "0.2rem 0", display: "flex", gap: 6 }}><span style={{ color: p.color, flexShrink: 0 }}>›</span>{g}</div>)}
          </div>
          <div style={{ marginBottom: "1.1rem" }}>
            <p style={{ color: "#ef4444", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>Frustrations</p>
            {p.frustrations.map((f, i) => <div key={i} style={{ color: "#64748b", fontSize: "0.82rem", padding: "0.2rem 0", display: "flex", gap: 6 }}><span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>{f}</div>)}
          </div>
          <div>
            <p style={{ color: "#94a3b8", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>A Day in Their Life</p>
            <p style={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.65 }}>{p.scenario}</p>
          </div>
        </div>
      )}
      <button onClick={() => setExpanded(e => !e)} style={{ padding: "0.7rem", background: `${p.color}08`, border: "none", borderTop: `1px solid ${p.color}15`, color: p.color, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", transition: "background 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.background = `${p.color}15`}
        onMouseLeave={e => e.currentTarget.style.background = `${p.color}08`}>
        {expanded ? "▲ Collapse" : "▼ View Full Persona"}
      </button>
    </div>
  );
}

function PersonasStep() {
  return (
    <StepSection step={workflowSteps[1]}>
      <p style={{ color: "#64748b", marginBottom: "2rem", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 720 }}>Five detailed user personas built from primary research — each representing a real, distinct segment of public transport commuters. Click any card to expand the full profile.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.25rem" }}>
        {personas.map((p, i) => <PersonaCard key={i} p={p} />)}
      </div>
    </StepSection>
  );
}

// Step 3 Journey Maps — with mini emotion chart
function EmotionCurve({ scores, color }) {
  const stages = ["Plan","Walk","Wait","Ride","Reality","Return"];
  const min = -10, max = 2;
  const h = 60, w = 280, pad = 20;
  const innerW = w - pad * 2;
  const innerH = h - 16;
  const pts = scores.map((s, i) => {
    const x = pad + (i / (scores.length - 1)) * innerW;
    const y = 8 + ((max - s) / (max - min)) * innerH;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 60 }}>
      <line x1={pad} y1={8 + (max / (max - min)) * innerH} x2={w - pad} y2={8 + (max / (max - min)) * innerH} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={color} opacity="0.9" />
      ))}
    </svg>
  );
}

function JourneyStep() {
  const [modal, setModal] = useState(null);
  const imgKeys = ["senior","ghmc","office","female","student"];
  return (
    <StepSection step={workflowSteps[2]}>
      <p style={{ color: "#64748b", marginBottom: "2rem", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 720 }}>Journey & Empathy Maps trace each persona through six stages: Trip Planning → Walk to Stop → Waiting → On the Bus → Expectation vs Reality → Arrival. Emotion curves reveal where the system fails most. Click any map to view full-size.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.25rem" }}>
        {journeyMaps.map((jm, i) => (
          <div key={i} onClick={() => setModal(i)} style={{ borderRadius: 14, overflow: "hidden", cursor: "zoom-in", border: `1px solid ${jm.theme}20`, background: "#0a0e1a", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${jm.theme}50`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${jm.theme}15`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${jm.theme}20`; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ position: "relative", paddingBottom: "60%", background: "#0a0e1a", overflow: "hidden" }}>
              <img src={IMGS[imgKeys[i]]} alt={jm.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,14,26,0.7) 0%, transparent 40%)" }} />
            </div>
            <div style={{ padding: "0.875rem 1rem" }}>
              <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.2rem" }}>{jm.label}</div>
              <div style={{ color: "#475569", fontSize: "0.72rem", marginBottom: "0.6rem" }}>{jm.persona}</div>
              <EmotionCurve scores={jm.scores} color={jm.theme} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.2rem" }}>
                <span style={{ color: "#334155", fontSize: "0.62rem" }}>Plan</span>
                <span style={{ color: "#334155", fontSize: "0.62rem" }}>Return</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal !== null && (
        <ImageModal
          src={IMGS[imgKeys[modal]]}
          caption={`${journeyMaps[modal].label} — ${journeyMaps[modal].persona}`}
          onClose={() => setModal(null)}
        />
      )}
    </StepSection>
  );
}

// Step 4 Root Cause
function RootCauseStep() {
  const [modal, setModal] = useState(null);
  const items = [
    { key: "rootcause", label: "Root Cause Analysis — 5-Whys Map", sub: "First iteration · Click to enlarge", icon: "🌳" },
    { key: "problems", label: "Field Observation — Problems at Bus Stop", sub: "Bachupally bus stop · Annotated field photo", icon: "🔍" },
  ];
  return (
    <StepSection step={workflowSteps[3]}>
      <p style={{ color: "#64748b", marginBottom: "2rem", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 720 }}>Using the 5-Whys methodology, surface-level complaints were traced to systemic root causes — mapping a complex web of interrelated infrastructure, policy, and behavioral issues at bus stops.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
        {items.map((item) => (
          <div key={item.key} onClick={() => setModal(item.key)} style={{ borderRadius: 14, overflow: "hidden", cursor: "zoom-in", border: "1px solid rgba(255,255,255,0.07)", background: "#0a0e1a", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ position: "relative", paddingBottom: "65%", background: "#0a0e1a" }}>
              <img src={IMGS[item.key]} alt={item.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,14,26,0.6) 0%, transparent 50%)" }} />
            </div>
            <div style={{ padding: "0.875rem 1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                <span>{item.icon}</span>
                <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "0.85rem" }}>{item.label}</span>
              </div>
              <div style={{ color: "#475569", fontSize: "0.75rem" }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      {modal && <ImageModal src={IMGS[modal]} caption={items.find(x => x.key === modal)?.label} onClose={() => setModal(null)} />}
    </StepSection>
  );
}

// Step 5 HMW
function HMWStep() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Object.keys(categoryColors)];
  const filtered = filter === "All" ? hmwQuestions : hmwQuestions.filter(q => q.category === filter);
  return (
    <StepSection step={workflowSteps[4]}>
      <p style={{ color: "#64748b", marginBottom: "1.75rem", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 720 }}>Top 20 "How Might We" questions derived from research — reframing commuter pain points as concrete design opportunities. Filter by category below.</p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "0.35rem 0.85rem", borderRadius: 100, border: "1px solid", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            borderColor: filter === cat ? (categoryColors[cat] || "#f97316") : "rgba(255,255,255,0.1)",
            background: filter === cat ? `${categoryColors[cat] || "#f97316"}18` : "transparent",
            color: filter === cat ? (categoryColors[cat] || "#f97316") : "#475569" }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "0.875rem" }}>
        {filtered.map((item, i) => (
          <div key={i} style={{ padding: "1.1rem 1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, display: "flex", gap: "0.75rem", alignItems: "flex-start", transition: "all 0.2s" }}
            onMouseEnter={e => { const c = categoryColors[item.category]; e.currentTarget.style.borderColor = `${c}35`; e.currentTarget.style.background = `${c}05`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
            <div style={{ flexShrink: 0, marginTop: "0.15rem" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${categoryColors[item.category]}18`, border: `1px solid ${categoryColors[item.category]}50`, display: "flex", alignItems: "center", justifyContent: "center", color: categoryColors[item.category], fontSize: "0.65rem", fontWeight: 700 }}>
                {hmwQuestions.indexOf(item) + 1}
              </div>
            </div>
            <div>
              <p style={{ color: "#94a3b8", fontSize: "0.84rem", lineHeight: 1.55, margin: "0 0 0.4rem" }}>{item.q}</p>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: categoryColors[item.category], background: `${categoryColors[item.category]}12`, padding: "0.15rem 0.5rem", borderRadius: 100 }}>{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </StepSection>
  );
}

// Step 6 Brainwriting
function BrainwritingStep() {
  const [active, setActive] = useState(0);
  return (
    <StepSection step={workflowSteps[5]}>
      <p style={{ color: "#64748b", marginBottom: "1.75rem", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 720 }}>6 participants × 5 ideas × 3 rounds of silent idea generation. Select a question below to see all ideas generated for it (Only top ideas are shown for simplicity).</p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
        {brainwritingIdeas.map((b, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ padding: "0.4rem 0.9rem", borderRadius: 8, border: "1px solid", transition: "all 0.2s", cursor: "pointer",
            borderColor: active === i ? "#f97316" : "rgba(255,255,255,0.1)",
            background: active === i ? "rgba(249,115,22,0.12)" : "transparent",
            color: active === i ? "#f97316" : "#475569", fontSize: "0.8rem", fontWeight: 600 }}>
            Q{i + 1}
          </button>
        ))}
      </div>
      <div style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 12, padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
        <p style={{ color: "#f97316", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>HMW Question {active + 1}</p>
        <p style={{ color: "#e2e8f0", fontSize: "0.95rem", fontStyle: "italic", fontFamily: "\'Cormorant Garamond\', Georgia, serif" }}>How might we {brainwritingIdeas[active].q}?</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "0.875rem" }}>
        {brainwritingIdeas[active].ideas.map((idea, i) => (
          <div key={i} style={{ padding: "1.1rem 1.2rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, display: "flex", gap: "0.65rem", alignItems: "flex-start", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(236,72,153,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
            <span style={{ color: "#ec4899", flexShrink: 0, marginTop: "0.1rem", fontSize: "0.9rem" }}>✦</span>
            <p style={{ color: "#94a3b8", fontSize: "0.84rem", lineHeight: 1.55, margin: 0 }}>{idea}</p>
          </div>
        ))}
      </div>
    </StepSection>
  );
}

// Step 7 Prototype
function PrototypeStep() {
  return (
    <StepSection step={workflowSteps[6]}>
      {prototypeScreenshots.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
          {prototypeScreenshots.map((src, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
              <img src={src} alt={`Prototype ${i+1}`} style={{ width: "100%", display: "block", transition: "transform 0.3s" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "3.5rem 2rem", border: "2px dashed rgba(255,255,255,0.08)", borderRadius: 14 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.875rem" }}>🔧</div>
          <p style={{ color: "#334155", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Prototype screenshots coming soon.</p>
          <p style={{ color: "#1e293b", fontSize: "0.8rem" }}>Add image URLs to the <code style={{ color: "#475569" }}>prototypeScreenshots</code> array at the top of this file.</p>
        </div>
      )}
    </StepSection>
  );
}

// ---- WORKFLOW SECTION ----
function Workflow() {
  return (
    <section id="workflow" style={{ padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionTitle subtitle="Our complete design thinking process, step by step">Documentation Workflow</SectionTitle></FadeIn>
        {/* Visual timeline */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 0, marginBottom: "5rem", flexWrap: "wrap", rowGap: "1.5rem" }}>
            {workflowSteps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <a href={`#step${step.id}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textDecoration: "none", padding: "0 0.4rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "#fff", fontWeight: 800, boxShadow: "0 4px 14px rgba(249,115,22,0.3)", transition: "transform 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    {step.id}
                  </div>
                  <span style={{ color: "#475569", fontSize: "0.63rem", textAlign: "center", maxWidth: 64, lineHeight: 1.3, fontWeight: 500 }}>{step.label}</span>
                </a>
                {i < workflowSteps.length - 1 && (
                  <div style={{ width: 28, height: 2, background: "linear-gradient(90deg,rgba(249,115,22,0.45),rgba(236,72,153,0.25))", flexShrink: 0, marginBottom: "1.2rem" }} />
                )}
              </div>
            ))}
          </div>
        </FadeIn>
        <SurveyStep />
        <PersonasStep />
        <JourneyStep />
        <RootCauseStep />
        <HMWStep />
        <BrainwritingStep />
        <PrototypeStep />
      </div>
    </section>
  );
}

// ---- LEARNINGS ----
function Learnings() {
  return (
    <section id="learnings" style={{ padding: "6rem 1.5rem", background: "rgba(255,255,255,0.012)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionTitle subtitle="Reflections from our design thinking journey">What We Learned</SectionTitle></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.4rem" }}>
          {learnings.map((l, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <div style={{ padding: "2rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, height: "100%", transition: "all 0.35s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{l.icon}</div>
                <h4 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", marginBottom: "0.7rem", fontFamily: "\'Cormorant Garamond\', Georgia, serif" }}>{l.title}</h4>
                <p style={{ color: "#64748b", fontSize: "0.86rem", lineHeight: 1.75 }}>{l.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- FOOTER ----
function Footer() {
  return (
    <footer id="contact" style={{ padding: "4rem 1.5rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ fontFamily: "\'Cormorant Garamond\', Georgia, serif", fontWeight: 700, fontSize: "1.2rem", color: "#f97316", marginBottom: "0.6rem" }}>Design Scholars</div>
            <p style={{ color: "#334155", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "0.5rem" }}>A design thinking project on public transport reliability.</p>
            <p style={{ color: "#1e293b", fontSize: "0.78rem" }}>Academic Year 2025–26</p>
          </div>
          <div>
            <div style={{ color: "#475569", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>Project Info</div>
            {[["Mentor", "Raj Narayanan"],["Team Members","8"],["User Personas","5"],["Journey and Empathy Maps","5"],["HMW Questions","120+"],["Ideas Generated","60+"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.28rem 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                <span style={{ color: "#334155", fontSize: "0.8rem" }}>{k}</span>
                <span style={{ color: "#475569", fontSize: "0.8rem" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
          <p style={{ color: "#1e293b", fontSize: "0.75rem" }}>© 2025 Design Scholars · Problem: Public Transport Reliability · Shashanth</p>
        </div>
      </div>
    </footer>
  );
}

// ---- APP ----
export default function App() {
  return (
    <div style={{ background: "#07080f", minHeight: "100vh", fontFamily: "\'DM Sans\', system-ui, sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <Nav />
      <Hero />
      <About />
      <Team />
      <Workflow />
      <Learnings />
      <Footer />
    </div>
  );
}
