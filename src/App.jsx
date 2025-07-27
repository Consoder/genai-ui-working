import React, { useRef, useState, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from "framer-motion";
import { MessageCircle, Zap, FileText, Link, BarChart, Sparkles, Sun, Moon, ChevronLeft, ChevronRight, Rocket, Database, Server, Terminal, Layers, Code, Users, BadgeCheck } from "lucide-react"; // premium icons
import clsx from "clsx";

/* ==== THEME PROVIDER: ANIMATED/SYSTEM ==== */
const ThemeContext = createContext();
function useTheme() { return useContext(ThemeContext); }
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  useEffect(() => {
    const root = document.documentElement;
    root.style.colorScheme = theme;
    root.classList.add("theme-transition");
    root.classList.toggle("dark", theme === "dark");
    setTimeout(() => root.classList.remove("theme-transition"), 350);
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => !localStorage.getItem("theme") && setTheme(mql.matches ? "dark" : "light");
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.13, filter: "brightness(1.15)" }}
      className="fixed top-4 right-4 z-[1101] rounded-xl p-2 border border-accent-blue bg-glass-light dark:bg-night text-night dark:text-paper focus:ring-2 focus:ring-accent-blue"
      style={{ backdropFilter: "blur(8px)", transition: "background 0.3s, color 0.3s, box-shadow 0.2s" }}
    >
      {theme === "dark" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
    </motion.button>
  );
}

/* ========== COMPONENTIZED BUTTON/INPUT/CARD ========== */
function Button({ children, icon, variant = "primary", ...rest }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.07 }}
      className={clsx(
        "inline-flex gap-2 items-center justify-center px-6 py-3 rounded-pill font-bold transition-all duration-250 shadow-feature text-lg focus:outline-none focus:ring-2 focus:ring-accent-blue",
        variant === "primary"
          ? "bg-accent-blue text-white hover:bg-accent-gold active:bg-accent-pink"
          : "bg-paper text-night dark:bg-night dark:text-paper border border-glass-dark hover:bg-glass-light"
      )}
      {...rest}
    >{icon && <span>{icon}</span>}{children}</motion.button>
  );
}
function Input({ ...props }) {
  return (
    <input
      {...props}
      className="px-4 py-3 rounded-xl border border-glass-dark bg-paper dark:bg-night text-night dark:text-paper w-full focus:ring-2 focus:ring-accent-blue transition placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
  );
}
function Card({ children, className }) {
  return (
    <div className={clsx("p-8 rounded-glass shadow-glass-morph bg-white dark:bg-night transition-colors duration-300 border border-glass-light", className)}>
      {children}
    </div>
  );
}

/* ==== FOG/CURSOR - pointer devices only ==== */
function FogOverlays() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(window.matchMedia("(pointer: fine)").matches); }, []);
  if (!show) return null;
  return (
    <>
      <motion.div className="fixed top-[-15vh] left-[5vw] z-0 rounded-full pointer-events-none"
        style={{ width: "400px", height: "300px", background: "radial-gradient(ellipse at center, #d1c3fc44 0%, #75e4b633 70%, transparent 95%)" }}
        animate={{ x: [0, 80, -60, 0], y: [0, 20, -20, 0] }} transition={{ duration: 19, repeat: Infinity, ease: [0.56,0,0.38,1] }} />
      <motion.div className="fixed bottom-[-60px] right-[-50px] z-0 rounded-full pointer-events-none"
        style={{ width: "400px", height: "195px", background: "radial-gradient(ellipse at center, #5e8efd44 0%, #fa92f744 60%, transparent 95%)" }}
        animate={{ x: [0, -80, 50, 0], y: [0, -20, 30, 0] }} transition={{ duration: 27, repeat: Infinity, ease: [0.86,0,0.38,1] }} />
    </>
  );
}
function CustomCursor() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(window.matchMedia("(pointer: fine)").matches); }, []);
  const dotRef = useRef();
  useEffect(() => {
    if (!show) return;
    const move = (e) => { if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [show]);
  if (!show) return null;
  return (
    <motion.div ref={dotRef}
      className="fixed z-[1100] w-7 h-7 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      style={{ filter: "blur(3.7px)", willChange: "transform" }}
      initial={{ scale: 0.9 }} animate={{ scale: 1 }} whileTap={{ scale: 0.7 }}>
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-blue via-accent-gold to-accent-pink opacity-30" />
    </motion.div>
  );
}

/* ====== APP DATA: CUSTOMIZED ====== */
const features = [
  { icon: <MessageCircle strokeWidth={2.3} />, title: "Chat", desc: "Conversational AI with workflow context.", detail: "Switch between support, dev, and creative personas, then automate ops via chat." },
  { icon: <Zap strokeWidth={2.3} />, title: "Auto-Actions", desc: "Automate & integrate your stack.", detail: "Connect and trigger automations, APIs, and 3rd party tools from anywhere in chat." },
  { icon: <FileText strokeWidth={2.3} />, title: "Docs Q&A", desc: "Upload and deeply query docs.", detail: "Drop in any PDF/CSV. Instantly search, summarize, and unlock answers." },
  { icon: <Link strokeWidth={2.3} />, title: "Live Integrations", desc: "Notion, Slack, Email, DB, etc.", detail: "One-click connect with your business tools for truly context-aware AI." },
  { icon: <BarChart strokeWidth={2.3} />, title: "Prompt Analytics", desc: "Visualize usage/saves.", detail: "Monitor prompts, see trends, and optimize workflows for every team." }
];
const techStack = [
  { icon: <Rocket />, color: "#5e8efd", name: "React", desc: "Enterprise UI", details: "Hooks, state, animation—build futureproof SaaS at scale.", badge: "UI", link: "https://react.dev" },
  { icon: <Sparkles />, color: "#04b892", name: "OpenAI", desc: "Next-gen LLMs", details: "GPT-4, fine-tuning, vector search.", badge: "AI", link: "https://openai.com" },
  { icon: <Terminal />, color: "#387eb8", name: "Python", desc: "ML backend", details: "Data, orchestration, workflows.", badge: "Back", link: "https://python.org" },
  { icon: <Server />, color: "#009688", name: "FastAPI", desc: "Async REST", details: "Type-safe, blazing fast APIs.", badge: "API", link: "https://fastapi.tiangolo.com" },
  { icon: <Layers />, color: "#db5afb", name: "TailwindCSS", desc: "Smart CSS", details: "Atomic, scalable styles—faster design.", badge: "Style", link: "https://tailwindcss.com" },
  { icon: <Database />, color: "#0064a5", name: "Postgres", desc: "Vector DB", details: "RDBMS, AI-native, scalable ops.", badge: "Data", link: "https://postgresql.org" }
];
const testimonials = [
  { name: "Tarah L.", org: "ProductOps Partner", img: "https://randomuser.me/api/portraits/women/54.jpg", text: "We replaced two SaaS tools and saved 5h/week per team. The chat AI agent is shockingly helpful." },
  { name: "Anil Patel", org: "ArcOne Cloud", img: "https://randomuser.me/api/portraits/men/48.jpg", text: "Most 'AI dashboards' are vapor. This actually brought business ROI—integrations work, and the UI is 10/10." },
  { name: "Sofia Zhang", org: "Fathomly", img: "https://randomuser.me/api/portraits/women/22.jpg", text: "The onboarding and prompt-assist flow feels like magic. Best design and dev handoff I’ve seen in years." }
];

/* ========== NAVBAR ========== */
function Navbar({ user }) {
  const [mobile, setMobile] = useState(false);
  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#demo", label: "Live Demo" },
    { href: "#features", label: "Features" },
    { href: "#stack", label: "Tech Stack" },
    { href: "#testimonials", label: "Clients" },
    { href: "#contact", label: "Contact" }
  ];
  const [active, setActive] = useState(navLinks[0].href);
  // Animated nav underline
  useEffect(() => {
    const onScroll = () => {
      let found = navLinks[0].href;
      for (const l of navLinks) {
        const el = document.querySelector(l.href);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < 90 && rect.bottom > 40) { found = l.href; break; }
      }
      setActive(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = "hidden";
      const keyClose = e => e.key === "Escape" && setMobile(false);
      window.addEventListener("keydown", keyClose);
      return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", keyClose);}
    }
  }, [mobile]);
  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-paper/90 dark:bg-night/95 backdrop-blur-xl border-b border-glass-dark shadow-xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-5">
        <span className="font-grotesk text-2xl font-heavy text-accent-blue dark:text-accent-gold tracking-tight flex gap-2 items-center">
          <BadgeCheck className="w-7 h-7 text-accent-blue dark:text-accent-gold" />{user ? `Welcome, ${user.split(" ")[0]}` : "NextGen SaaS"}
        </span>
        <div className="hidden md:flex gap-8 relative">
          {navLinks.map((l) => (
            <motion.a key={l.href} href={l.href}
              className={clsx("text-night/75 dark:text-paper/85 font-bold px-2 py-0.5 rounded transition relative focus:outline-none",
                active === l.href && "text-accent-blue dark:text-accent-gold font-extrabold")}
              aria-current={active === l.href ? "page" : undefined}
              tabIndex={0}
              whileHover={{ scale: 1.07 }}>
              {l.label}
              {active === l.href && (
                <motion.div layoutId="nav-underline"
                  className="absolute h-1 rounded-full bg-accent-blue dark:bg-accent-gold left-0 right-0 bottom-0"
                  transition={{ type: "spring", stiffness: 600, damping: 30 }} />
              )}
            </motion.a>
          ))}
        </div>
        <Button icon={mobile ? <>&times;</> : <Layers />} variant="secondary"
          className="md:hidden p-2 rounded-full bg-glass-light dark:bg-night border-0 text-lg" onClick={() => setMobile(v=>!v)}>
          <span className="sr-only">{mobile ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -38 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed flex flex-col items-center justify-center inset-0 z-50 bg-night/92 dark:bg-paper/96 backdrop-blur-2xl"
            onClick={() => setMobile(false)}
          >
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                tabIndex={0}
                className={"text-2xl font-heavy mb-8 focus:outline-none "+ (active === l.href ? "underline text-accent-blue dark:text-accent-gold" : "")}
                onClick={() => setMobile(false)}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ====== HERO ====== */
function HeroSection() {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} id="hero" className="relative flex flex-col items-center justify-center pt-32 pb-20 min-h-[80vh] bg-mesh-gradient dark:bg-gradient-to-b dark:from-night dark:to-accent-blue/10 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.45,0,0.36,1] }}
        style={{ background: "radial-gradient(ellipse at 70% 40%, #db5afb33, #75e4b622)" }}
      />
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 70 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 1.17, type: "spring", stiffness: 260, damping: 28 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-grotesk font-heavy bg-gradient-to-br from-accent-blue via-accent-pink to-accent-gold bg-clip-text text-transparent drop-shadow-hero mb-7 leading-tight"
        >AI-Powered SaaS for Real Teams</motion.h1>
        <motion.p className="max-w-2xl mx-auto text-2xl md:text-3xl text-night/80 dark:text-paper/80 mt-4 mb-8 font-inter">
          <span className="font-grotesk font-black text-accent-blue dark:text-accent-gold">Unlock productivity</span> with custom AI chat, workflow automations, document q&a, and instant integrations. <span className="font-heavy text-accent-pink">Modern. Secure. Yours.</span>
        </motion.p>
        <Button icon={<Sparkles />} href="#demo" variant="primary">Try It Live</Button>
      </motion.div>
      <svg width="100%" height="80" viewBox="0 0 1440 80" className="absolute bottom-0 left-0 dark:hidden pointer-events-none">
        <path fill="#f2f7fb" d="M0,64 Q720,0 1440,64 V80 H0 Z" />
      </svg>
    </section>
  );
}

/* ====== FEATURES ====== */
function FeaturesSection() {
  const [idx, setIdx] = useState(0);
  return (
    <section id="features" className="container py-section flex flex-col md:flex-row gap-10 items-start justify-between">
      <div className="flex flex-col gap-4 w-full md:w-[370px]">
        {features.map((f, i) => (
          <motion.button
            key={f.title}
            className={clsx(
              "w-full text-left px-7 py-6 rounded-glass border-2 border-glass-dark dark:border-glass-light shadow-feature bg-glass-light dark:bg-night/80 font-grotesk text-lg font-bold transition relative flex items-center gap-5 focus:outline-none focus-visible:ring-2 ring-accent-blue",
              idx === i ? "ring-2 ring-accent-blue dark:ring-accent-gold scale-105 bg-accent-blue/10 dark:bg-accent-gold/15 text-accent-blue dark:text-accent-gold z-20" : "hover:ring-1 hover:ring-accent-pink hover:z-20"
            )}
            aria-pressed={idx === i}
            tabIndex={0}
            onClick={() => setIdx(i)}
            whileHover={{ scale: idx === i ? 1.13 : 1.05, x: idx===i ? 4:2 }}
            whileTap={{ scale: 0.97, x:0 }}
          >
            <span className="w-8 h-8 flex items-center justify-center text-accent-gold dark:text-accent-blue">{f.icon}</span>
            <span className="flex-1">{f.title}</span>
            {idx === i && (
              <motion.div className="absolute right-2 top-2 drop-shadow" initial={{ scale:0.7}} animate={{scale:1.1}}><BadgeCheck /></motion.div>
            )}
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="flex-1 rounded-glass border-2 border-accent-blue/10 dark:border-accent-gold/10 bg-mesh-gradient/40 dark:bg-accent-blue/15 shadow-2xl p-10 min-h-[260px] ml-0 md:ml-12 mt-10 md:mt-0 flex flex-col justify-center"
          key={idx}
          initial={{ opacity: 0, x: 65 }} animate={{ opacity: 1, x: 0, transition: { type: "spring", duration: 0.52, bounce: 0.33 } }} exit={{ opacity: 0, x: -54 }}>
          <span className="w-8 h-8 mb-2 text-accent-blue dark:text-accent-gold">{features[idx].icon}</span>
          <h4 className="text-3xl font-grotesk font-heavy mb-3 mt-2">{features[idx].title}</h4>
          <p className="mb-4 text-xl">{features[idx].detail}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ==== TECH STACK CAROUSEL: premium popover, a11y, momentum ==== */
// "Momentum" scroll rubberband is demoed with CSS-only for demo—see notes for pro lib
function TechStackSection() {
  const carousel = useRef();
  const [canLeft, setCanLeft] = useState(false), [canRight, setCanRight] = useState(true);
  const [focusIdx, setFocusIdx] = useState(0);
  const [arrowShown, setArrowShown] = useState(false);
  const cardRefs = useRef([]);
  // Only show arrows if needed
  const updateArrowState = useCallback(() => {
    const node = carousel.current;
    if (!node) return;
    setCanLeft(node.scrollLeft > 5);
    setCanRight(node.scrollLeft + node.offsetWidth < node.scrollWidth - 5);
    setArrowShown(node.scrollWidth > node.clientWidth + 1);
  }, []);
  function scrollTo(idx) {
    const card = cardRefs.current[idx]; if (card) { card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); card.focus(); setFocusIdx(idx); }
  }
  const scrollLeft = useCallback(() => { if (focusIdx > 0) scrollTo(focusIdx - 1); }, [focusIdx]);
  const scrollRight = useCallback(() => { if (focusIdx < techStack.length - 1) scrollTo(focusIdx + 1); }, [focusIdx]);
  useEffect(() => {
    updateArrowState();
    const node = carousel.current;
    if (!node) return;
    node.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);
    return () => {
      node.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, [updateArrowState]);
  useEffect(() => { scrollTo(focusIdx); }, [focusIdx]);
  useEffect(() => {
    const node = carousel.current; if (!node) return;
    const key = e => {
      if (e.key === "ArrowLeft") { e.preventDefault(); scrollLeft(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); scrollRight(); }
    };
    node.addEventListener("keydown", key);
    return () => node.removeEventListener("keydown", key);
  }, [scrollLeft, scrollRight]);
  // Only show arrows on hover/focus or scrollable
  const [arrowHover, setArrowHover] = useState(false);
  return (
    <section id="stack" className="relative py-section w-full flex flex-col items-center bg-night dark:bg-paper/10 rounded-xl select-none">
      <h2 className="text-3xl md:text-4xl font-heavy mb-7 text-accent-green text-center">
        Our Tech <span className="text-accent-blue dark:text-accent-gold">Stack</span>
      </h2>
      {arrowShown && <>
        <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20"
          onMouseEnter={() => setArrowHover(true)} onMouseLeave={() => setArrowHover(false)}>
          <motion.button aria-label="Scroll left" onClick={scrollLeft}
            className={clsx(
              "mx-2 size-10 flex items-center justify-center rounded-full border-2 shadow-xl font-bold transition",
              canLeft && arrowHover ? "bg-accent-gold/90 text-white scale-110" : canLeft ? "bg-paper/70 dark:bg-night/80 text-accent-blue dark:text-accent-gold" : "bg-paper/40 dark:bg-night/50 text-neutral-400 cursor-not-allowed opacity-35 pointer-events-none"
            )}
            tabIndex={canLeft ? 0 : -1} type="button" disabled={!canLeft}
            initial={false} animate={{ opacity: (arrowHover || canLeft) ? 1 : 0.25}}>
            <ChevronLeft />
          </motion.button>
        </div>
        <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20"
          onMouseEnter={() => setArrowHover(true)} onMouseLeave={() => setArrowHover(false)}>
          <motion.button aria-label="Scroll right" onClick={scrollRight}
            className={clsx(
              "mx-2 size-10 flex items-center justify-center rounded-full border-2 shadow-xl font-bold transition",
              canRight && arrowHover ? "bg-accent-gold/90 text-white scale-110" : canRight ? "bg-paper/70 dark:bg-night/80 text-accent-blue dark:text-accent-gold" : "bg-paper/40 dark:bg-night/50 text-neutral-400 cursor-not-allowed opacity-35 pointer-events-none"
            )}
            tabIndex={canRight ? 0 : -1} type="button" disabled={!canRight}
            initial={false} animate={{ opacity: (arrowHover||canRight) ? 1 : 0.25}}>
            <ChevronRight />
          </motion.button>
        </div>
      </>}
      <div
        ref={carousel}
        role="region"
        aria-label="Technology carousel"
        className="no-scrollbar flex gap-8 md:gap-12 pb-8 overflow-x-auto snap-x snap-mandatory w-full px-4 md:px-16 lg:px-36 focus:outline-none"
        tabIndex={0}
        style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth", overscrollBehaviorX: "contain" }}
        onFocus={() => setArrowHover(true)} onBlur={() => setArrowHover(false)}
      >
        {techStack.map((t, i) => (
          <TechCard
            key={t.name}
            tech={t}
            idx={i}
            ref={el => (cardRefs.current[i] = el)}
            active={focusIdx === i}
            setFocusIdx={setFocusIdx}
          />
        ))}
      </div>
      <style>{`
        .theme-transition { transition: background 0.4s, color 0.4s, border 0.2s, box-shadow .2s; }
        .no-scrollbar::-webkit-scrollbar { display: none }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </section>
  );
}
const TechCard = React.forwardRef(function TechCard({ tech, idx, active, setFocusIdx }, ref) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [11, -11]);
  const rotateY = useTransform(x, [-60, 60], [-10, 10]);
  const [open, setOpen] = useState(false);
  // Clamp popover to view, pointer
  const [popoverPos, setPopoverPos] = useState({ shiftX: 0, pointerX: "50%" });
  useEffect(() => {
    if (!open || !ref?.current) return;
    const r = ref.current.getBoundingClientRect();
    const popW = 285, screenP = 22;
    let shiftX=0, pointerX="50%";
    const left = r.left + r.width / 2 - popW/2, right = r.left + r.width / 2 + popW/2;
    if(left<screenP){ shiftX=screenP-left; pointerX=`${Math.max(((r.width/2)-shiftX)/popW,0.08)*100}%`}
    if(right>window.innerWidth-screenP){ shiftX-=(right-(window.innerWidth-screenP)); pointerX=`${Math.min((((r.width/2)+shiftX)/popW),0.92)*100}%`}
    setPopoverPos({ shiftX, pointerX });
  }, [open, ref]);
  useEffect(() => { if (active && ref?.current) ref.current.focus(); }, [active, ref]);
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const handleMove = (e) => {
      const r = el.getBoundingClientRect(), isTouch = !!e.touches;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX, clientY = isTouch ? e.touches[0].clientY : e.clientY;
      x.set(clientX - r.left - r.width / 2); y.set(clientY - r.top - r.height / 2);
    };
    const handleEnter = () => { setOpen(true); setFocusIdx(idx); };
    const handleLeave = () => { setOpen(false); x.set(0); y.set(0); };
    const handleClickTouch = (e) => { e.preventDefault(); setOpen(v => !v); setFocusIdx(idx); };
    el.addEventListener("mousemove", handleMove); el.addEventListener("mouseenter", handleEnter); el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("touchmove", handleMove); el.addEventListener("touchstart", handleClickTouch);
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseenter", handleEnter); el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("touchmove", handleMove); el.removeEventListener("touchstart", handleClickTouch); };
  }, [x, y, idx, setFocusIdx, ref]);
  // A11y: aria-modal, auto-focus, keyboard trap if desired (see notes)
  return (
    <motion.a
      ref={ref}
      href={tech.link}
      target="_blank" rel="noopener noreferrer"
      role="option"
      aria-selected={active}
      aria-describedby={`tech-${tech.name.replace(/\s+/g, '').toLowerCase()}-desc`}
      tabIndex={0}
      className={clsx(
        "snap-center outline-none bg-gradient-to-br cursor-pointer select-none",
        "from-white/85 to-neutral-200 dark:from-night/95 dark:to-paper/10",
        "rounded-[2.25em] shadow-xl border border-neutral-200 dark:border-neutral-700",
        "flex flex-col items-center justify-start px-6 py-7 min-w-[228px] max-w-[260px]",
        "relative overflow-visible transition will-change-transform hover:shadow-2xl duration-200",
        active && "ring-2 ring-accent-blue dark:ring-accent-gold"
      )}
      style={{
        rotateX, rotateY, zIndex: open || active ? 99 : idx, transformStyle: "preserve-3d",
        boxShadow: open || active ? `0 8px 36px 1px ${tech.color}44, 0 3px 18px #0002` : "0 2px 14px #0001"
      }}
      onFocus={() => { setOpen(true); setFocusIdx(idx); }}
      onBlur={() => setOpen(false)}
    >
      <span className="absolute left-3 top-2 z-20">
        <span className="inline-block text-xs px-2 py-0.5 rounded-full font-bold bg-accent-gold/90 text-night dark:bg-accent-blue/90 dark:text-gold uppercase tracking-wide shadow-sm select-none">{tech.badge}</span>
      </span>
      <motion.div className="absolute top-[14px] left-1/2 -translate-x-1/2 pointer-events-none z-0"
        animate={{ opacity: open ? 0.36 : 0.16, scale: open ? 1.11 : 0.93 }} transition={{ duration: 0.21 }}
        style={{ width: 68, height: 68, borderRadius: 38, background: `${tech.color}16`, boxShadow: `0 0 32px 10px ${tech.color}46`, filter: "blur(8px)" }} />
      <span className="w-12 h-12 flex items-center justify-center text-accent-blue dark:text-accent-gold">{tech.icon}</span>
      <span className="font-heavy text-md text-accent-blue dark:text-accent-gold z-10 mt-4 mb-1 text-center">{tech.name}</span>
      <span id={`tech-${tech.name.replace(/\s+/g, '').toLowerCase()}-desc`} className="block opacity-80 text-xs text-paper/80 dark:text-paper/60 text-center">{tech.desc}</span>
      <motion.div
        className={clsx(
          "absolute w-[285px] max-w-[94vw] px-4 py-3 bg-white/98 dark:bg-night/97 text-night dark:text-paper text-base font-plex rounded-2xl shadow-xl top-[103%] pointer-events-auto select-text transition",
          open ? "opacity-100 scale-100 z-50" : "opacity-0 scale-95 z-0"
        )}
        role="dialog" aria-modal="true"
        style={{ left: `calc(50% + ${popoverPos.shiftX}px)`, transform: "translateX(-50%)" }}
        animate={{ opacity: open ? 1 : 0, y: open ? 13 : 21 }}
        aria-live="polite"
      >
        <div aria-hidden className="absolute left-0 right-0 mx-auto w-fit top-[-12px]" style={{ left: popoverPos.pointerX, transform: "translateX(-50%)" }}>
          <svg width="22" height="12" viewBox="0 0 22 12"><path d="M1 12L11 2L21 12Z" fill="currentColor" className="text-white dark:text-night" /></svg>
        </div>
        <div className="font-bold text-accent-blue dark:text-accent-gold">{tech.name}</div>
        <div className="text-xs font-normal mt-1">{tech.details}</div>
      </motion.div>
    </motion.a>
  );
});

/* ==== TESTIMONIALS with premium animation/dots ==== */
function TestimonialsSection() {
  const [cur, setCur] = useState(0);
  return (
    <section id="testimonials" className="py-section bg-paper dark:bg-night min-h-[30vh] overflow-x-hidden">
      <h2 className="text-3xl md:text-5xl font-heavy text-accent-blue dark:text-accent-gold text-center mb-10">
        What users say
      </h2>
      <div className="relative w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.figure key={testimonials[cur].text}
            className="bg-glass-light dark:bg-night/75 rounded-glass shadow-profile p-7 flex flex-col items-center text-center mx-auto w-[350px] max-w-full min-h-[250px]"
            initial={{ y: 16, opacity: 0, scale:0.97 }} animate={{ y: 0, opacity: 1, scale:1.02 }} exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.43, type: "spring", bounce:0.36 }}>
            <img src={testimonials[cur].img} alt={testimonials[cur].name} className="h-16 w-16 rounded-full border-2 border-accent-gold mb-3" />
            <blockquote className="italic mb-3 text-lg text-night/95 dark:text-paper/95">{testimonials[cur].text}</blockquote>
            <figcaption className="font-heavy text-accent-pink dark:text-accent-gold">{testimonials[cur].name}
              <span className="block font-normal text-night/55 dark:text-paper/60 text-xs">{testimonials[cur].org}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="absolute top-1/2 left-0 flex items-center gap-4 px-4 w-full pointer-events-none select-none justify-center">
          {testimonials.map((_, i) => (
            <motion.button key={i} onClick={() => setCur(i)}
              aria-label={`View testimonial ${i+1}`}
              tabIndex={0}
              className={clsx(
                "mx-2 h-4 w-4 rounded-full border-2 border-accent-gold bg-accent-gold focus:ring-2 focus:ring-accent-gold ring-offset-1 transition",
                cur===i ? "opacity-95 scale-125 shadow-xl" : "opacity-35"
              )}
              whileFocus={{ scale: 1.27 }}
              whileTap={{ scale: 1.08 }}
              style={{pointerEvents:'auto'}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== CONTACT/CTA ====== */
function ContactSection() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSend = e => {
    e.preventDefault();
    if (!email || !email.includes("@")) return setError("Enter a valid email.");
    setSent(true); setTimeout(()=>{ setSent(false); setEmail(""); setError(""); }, 2100);
  };
  return (
    <section id="contact" className="py-section min-h-[22vh] flex flex-col items-center bg-night dark:bg-paper/5 text-paper dark:text-night rounded-xl mt-section">
      <h2 className="text-4xl font-heavy mb-5">Ready to get started?</h2>
      <p className="mb-7 text-lg opacity-85 text-center max-w-xl font-grotesk font-normal">
        Next-gen SaaS, on your terms. Pro onboarding in 24h: reach out, and let's launch something amazing.
      </p>
      <form className="flex flex-col md:flex-row gap-4 items-center w-full max-w-2xl justify-center" onSubmit={handleSend}>
        <Input type="email" required value={email} onChange={e=>{setEmail(e.target.value); setError("");}} placeholder="Your Email" />
        <Button type="submit" icon={<Rocket className="w-5 h-5"/>}>{sent ? "Sent!" : "Send"}</Button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </section>
  );
}

/* ========== WELCOME OVERLAY: Brand, custom greet, animated ========== */
function WelcomeScreen({ state, user, onDone }) {
  // See: To go further, add Lottie/react-lottie for actual animated brand mesh
  const now = new Date(), hr = now.getHours();
  const greet =
    hr < 5 ? "Good night" : hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  const msg =
    state === "init"
      ? <>
        <span className="flex justify-center mb-4 text-accent-gold drop-shadow-hero">
          <Sparkles className="w-11 h-11" strokeWidth={2.3} />
        </span>
        <div>{greet}, new builder!</div>
        <div className="text-lg text-accent-gold opacity-80 mt-6 font-plex font-normal">You’re about to try a product with taste.</div>
      </>
      : state === "login"
        ? <div>{greet}, <span className="text-accent-blue dark:text-accent-gold font-bold">{user ? user.split(" ")[0] : ""}</span>!</div>
        : user
          ? <div>See you soon, <span className="font-bold">{user.split(" ")[0]}</span>!</div>
          : <div>Bye! Thank you for visiting.</div>;
  return (
    <AnimatePresence>
      {state && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: .85, type: "spring", bounce:0.33 }}
          className="fixed inset-0 z-[150] bg-gradient-to-br from-[#2a1157f2] via-[#5e8efdcc] to-[#75e4b6ee] dark:from-night dark:via-accent-blue/80 dark:to-accent-gold/60 flex items-center justify-center"
        >
          <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.09, opacity: 0 }}
            transition={{ type: "spring", delay: .12, duration: 0.57, bounce:0.45 }}
            className="rounded-3xl shadow-2xl bg-glass-light/70 dark:bg-night px-12 py-13 text-center text-3xl font-grotesk text-accent-blue dark:text-accent-gold flex flex-col items-center"
          >
            {msg}
            <Button className="mt-8 w-48 text-lg border-none" onClick={onDone}>
              {state === "logout" ? "Bye" : "Continue"}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ========== DEMO CHAT: animated CTAs, a11y, focus trap ========== */
function LiveDemoSection({ onLogin, onLogout, setUser }) {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const promptInputRef = useRef();
  function handleLogin() {
    setToken("token"); setUser(form.name || form.email || "User");
    onLogin && onLogin(form.name || form.email || "User"); setIsLogin(true);
    setMessages([
      { role: "user", content: "How do I set up automations?" },
      { role: "assistant", content: "Go to Integrations, select a trigger, and connect your favorite tool. No code required!" }
    ]);
    setTimeout(() => promptInputRef.current && promptInputRef.current.focus(), 400);
  }
  function handleLogout() {
    setToken(""); setMessages([]); setIsLogin(false);
    setForm({ email: "", password: "", name: "" }); setUser(""); onLogout && onLogout();
  }
  function handleSend() {
    if (!token) return;
    if (!form.prompt || !form.prompt.trim()) return;
    setMessages(m => [
      ...m,
      { role: "user", content: form.prompt },
      { role: "assistant", content: "This is a sample AI reply for your prompt." }
    ]);
    setForm(f => ({ ...f, prompt: "" }));
    setTimeout(() => promptInputRef.current && promptInputRef.current.focus(), 410);
  }
  return (
    <section id="demo" className="container py-section flex flex-col items-center bg-paper dark:bg-night rounded-glass shadow-glass-morph -mt-14">
      <h2 className="text-4xl md:text-5xl font-grotesk font-heavy text-accent-blue dark:text-accent-gold mb-7 text-center">Your AI, Live:</h2>
      <Card className="w-full max-w-2xl mb-5">
        <div className="mb-8">
          {!token ? (
            <form className="space-y-6" aria-label="Authentication form" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
              {!isLogin && (
                <Input type="text" required autoComplete="name" placeholder="Full Name" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              )}
              <Input type="email" required autoComplete="email" placeholder="Email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <Input type="password" required placeholder="Password" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              />
              <Button type="submit" icon={<Layers />}>{isLogin ? "Login" : "Sign Up"}</Button>
              <div className="text-center text-accent-pink opacity-80 font-medium">
                {isLogin ? "New user? " : "Already have an account? "}
                <button type="button" className="underline font-bold cursor-pointer"
                  onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col min-h-[360px] pt-1">
              <div className="flex items-center justify-between mb-3 z-20">
                <span className="font-bold text-accent-blue dark:text-accent-gold font-plex">Demo Mode</span>
                <Button variant="secondary" onClick={handleLogout} className="ml-2 underline text-sm px-2 py-1 border-none">Logout</Button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-1 pb-1 pt-1 rounded-xl border border-[#e7d9fa] dark:border-[#31334e60] bg-[#181541f2] dark:bg-[#181926] max-h-[280px]"
                role="log" aria-live="polite" tabIndex={-1}>
                {messages.length === 0 ? (
                  <div className="flex flex-col gap-2 h-full justify-center items-center py-8 select-none text-[#b6a1ff] dark:text-[#a1d4fa] font-plex opacity-85">
                    <ChatIcon />Start a new conversation!
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className={`flex items-start gap-2 mb-1 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (<div className="w-7 h-7 rounded-full bg-accent-blue text-xl flex items-center justify-center text-white font-bold"><Sparkles /></div>)}
                      <div className={`max-w-[90%] px-4 py-2 rounded-2xl text-base font-inter ${msg.role === "user"
                        ? "bg-gradient-to-tr from-accent-gold via-accent-pink to-accent-blue text-white font-bold"
                        : "bg-glass-light dark:bg-night/60 text-night dark:text-paper"
                      }`} aria-label={msg.role === "user" ? "You" : "Assistant"}>{msg.content}</div>
                      {msg.role === "user" && (<div className="w-7 h-7 rounded-full bg-accent-gold text-xl flex items-center justify-center text-white font-bold"><Users /></div>)}
                    </div>
                  ))
                )}
              </div>
              <form className="flex flex-col sm:flex-row gap-2 mt-2 border border-[#decafe] dark:border-[#20264e] bg-[#1b1643] dark:bg-[#191c21] rounded-2xl px-3 py-3 ring-1 ring-[#6939eb10]"
                onSubmit={e => { e.preventDefault(); handleSend(); }}>
                <Input ref={promptInputRef} type="text" placeholder="Ask me anything..." maxLength={222}
                  value={form.prompt || ""} onChange={e=>setForm(f => ({ ...f, prompt: e.target.value }))}
                  autoComplete="off" aria-label="Prompt input" spellCheck={false}
                />
                <Button type="submit" icon={<Rocket className="w-5 h-5" />} variant="primary">Send</Button>
              </form>
            </div>
          )}
        </div>
      </Card>
      <p className="text-center opacity-70 mb-2 max-w-xl font-plex">Directly experience your chat, workflow, and AI!</p>
    </section>
  );
}
function ChatIcon() {
  return <svg width={38} height={38} fill="none" stroke="currentColor" strokeWidth={2.3} viewBox="0 0 24 24"><path d="M5 21c-1.1 0-2-.9-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5zm0 0v2m0-2h14m-7-4v2m0-8v2" /></svg>;
}

/* ========== MAIN APP EXPORT ========== */
export default function App() {
  const [welcome, setWelcome] = useState("init");
  const [user, setUser] = useState("");
  return (
    <ThemeProvider>
      <div className="bg-paper dark:bg-night min-h-screen font-inter relative">
        <FogOverlays />
        <CustomCursor />
        <DarkModeToggle />
        <Navbar user={user} />
        <main className="pt-24 z-10 relative space-y-section">
          <WelcomeScreen state={welcome} user={user} onDone={() => setWelcome(null)} />
          <HeroSection />
          <LiveDemoSection
            onLogin={(n) => { setUser(n); setWelcome("login"); }}
            onLogout={() => setWelcome("logout")}
            setUser={setUser}
          />
          <FeaturesSection />
          <TechStackSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
}
const baseUrl = import.meta.env.VITE_API_URL;
