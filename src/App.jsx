// 🔁 Force update check - Kartik test comment
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useSpring
} from "framer-motion";


// -------- Font Injection Once --------
if (
  typeof window !== 'undefined' &&
  !document.getElementById('font-awd')
) {
  const style = document.createElement('style');
  style.id = 'font-awd';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;700&family=JetBrains+Mono&display=swap');
    html, body { font-family: 'Inter', 'Space Grotesk', 'JetBrains Mono', ui-sans-serif; }
  `;
  document.head.appendChild(style);
}

// -------- Toast/Error --------
function Toast({ message, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      className="fixed bottom-8 left-1/2 z-[9999] -translate-x-1/2 px-5 py-3 bg-[#181541] text-white rounded-xl shadow-lg font-bold flex items-center gap-2"
      role="alert"
      aria-live="assertive"
    >
      <span>⚠️</span> {message}
      <button className="ml-3 text-[#db5afb] underline" onClick={onDismiss} aria-label="Dismiss error">&times;</button>
    </motion.div>
  );
}

// -------- Animated Cursor --------
const useCursor = () => {
  const cursor = useRef(null);
  useEffect(() => {
    if (!cursor.current) return;
    const onMove = (e) => {
      cursor.current.style.left = `${e.clientX - 20}px`;
      cursor.current.style.top = `${e.clientY - 20}px`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return cursor;
};
function GelCursor() {
  const ref = useCursor();
  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-[99] w-11 h-11"
      style={{ mixBlendMode: 'lighten' }}
      aria-hidden="true"
    >
      <div className="w-11 h-11 bg-gradient-to-br from-[#52d2fece] via-[#db5afbcc] to-[#75e4b6aa] rounded-full blur-[11px] animate-pulse shadow-xl border border-[#ddf2ff45] opacity-80 transition-all duration-120" />
    </div>
  );
}

// -------- Foggy Overlay --------
function FoggyOverlay({ show, type }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.97 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            background: `linear-gradient(96deg,#233cfacc,#db5afbc1 80%)`,
          }}
        >
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
            {type === 'Logged In' ? 'Welcome!' : 'Logged Out'}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-[#c8bdfb] mt-3"
          >
            {type === 'Logged In'
              ? "Let's get building with AI-powered magic."
              : 'Hope to see you again soon!'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -------- Tech Stack Brutal Grid --------
const stackItems = [
  {
    title: 'Frontend',
    color: '#36c2fc',
    tools: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    desc: 'Ultra-smooth interactive UI with hot reload, state-of-art motion & utility-first design.',
    details: `SPA architecture, zero JS legacy, pixel-perfect UI alignment, accessible out-of-the-box.`,
  },
  {
    title: 'Backend',
    color: '#2af48f',
    tools: ['FastAPI', 'SQLModel', 'PyJWT', 'SQLite'],
    desc: 'Powered by Python FastAPI: blazing REST endpoints, securable, async at the core.',
    details: `Strict type checks, async IO, 100% OpenAPI, rapid prototyping & CI/CD tooling.`,
  },
  {
    title: 'Authentication',
    color: '#fcb900',
    tools: ['OAuth2/JWT', 'SSO Ready', 'No-Cookie'],
    desc: 'JWT bearer, future-proofed for cross-platform, mobile, SSO, and devtools.',
    details: `Zero cookie risk, sessionless API-first login, granular expiry, role-aware endpoints.`,
  },
  {
    title: 'AI Engine',
    color: '#db5afb',
    tools: ['OpenRouter GPT-3.5', 'Multi-Persona', 'Live API'],
    desc: 'Supercharged conversations leveraging OpenRouter: fast streaming, adaptable tone.',
    details: `ChatGPT strategy, multi-role prompt, translation, code-aware, fun modes.`,
  },
  {
    title: 'Deployment',
    color: '#75e4b6',
    tools: ['Docker', 'Local Dev', 'CI/CD', 'Cloud'],
    desc: 'Zero-pain deploy: run local, prod, or CI/CD. Fast container starts, easy scaling.',
    details: `Consistent configuration, minimal cold start, enterprise Docker Compose setup.`,
  },
];

function TechStackGrid() {
  return (
    <section
      id="tech-stack"
      className="relative min-h-[68vh] flex flex-col items-center pt-20 pb-14 px-2"
      aria-label="Project Tech Stack"
    >
      {/* Mesh BG Only for Stack */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1500 900" fill="none"
          className="hidden md:block absolute top-0 left-0 opacity-18">
          <defs>
            <radialGradient id="meshGlow2" cx="45%" cy="40%" r="70%">
              <stop stopColor="#36c2fc" offset="0%" />
              <stop stopColor="#db5afb" offset="70%" />
              <stop stopColor="#75e4b6" offset="100%" />
            </radialGradient>
          </defs>
          <ellipse cx="900" cy="350" rx="600" ry="280" fill="url(#meshGlow2)" opacity="0.28" />
        </svg>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', delay: 0.17 }}
        className="font-black text-white text-3xl md:text-4xl mb-3 text-center drop-shadow-lg"
        style={{ fontFamily: 'Space Grotesk' }}
      >
        <span className="bg-gradient-to-r from-[#34cefb] via-[#db5afb] to-[#75e4b6] bg-clip-text text-transparent">
          🧩 Tech Stack: Built for Brutal Velocity
        </span>
      </motion.h2>
      <div className="mb-10 text-lg font-semibold text-[#cfbef5] max-w-2xl text-center">
        Built on the sharpest modern frameworks, with instant UI feedback and cloud-ready by default.
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
        {stackItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ type: 'spring', delay: i * 0.10 + 0.11, stiffness: 89, damping: 18 }}
            whileHover={{ y: -10, scale: 1.05, boxShadow: `0 12px 44px ${item.color}55, 0 3px 11px #0003` }}
            className="
              flex flex-col items-start gap-2 
              bg-[#23213bf8] dark:bg-[#202028e1]
              border-[2.7px] rounded-[1.6rem] p-7 shadow-xl
              hover:shadow-2xl transition-all duration-200 border-[#db5afb22] hover:border-[#db5afb56]
              ring-[#551ab84d] ring-0 hover:ring-4
              focus-within:ring-8 outline-none
              backdrop-blur-[3px]
              select-text
            "
            tabIndex={0}
            aria-label={`Tech: ${item.title}`}
          >
            <div className="flex gap-2 items-center text-3xl mb-2">{item.icon}</div>
            <div
              className="font-black text-xl mb-1"
              style={{ color: item.color, fontFamily: 'Space Grotesk' }}
            >
              {item.title}
            </div>
            <div className="flex flex-wrap gap-2 mb-1">
              {(item.tools ?? []).map((tool, j) => (
                <span key={tool} className="rounded bg-[#db5afb18] px-3 py-1 text-xs font-mono text-[#db5afb]">
                  {tool}
                </span>
              ))}
            </div>
            <div className="text-[#adc2f1] text-md mb-1">{item.desc}</div>
            <div className="mt-2 text-[#fffcfbaa] text-xs font-mono">{item.details}</div>
          </motion.div>
        ))}
      </div>
      <div className="h-16" />
    </section>
  );
}

// -------- Features Section --------

const features = [
  {
    icon: (
      <span className="w-12 h-12 flex items-center justify-center rounded-xl shadow-[0_2px_24px_#7C7CFB33] bg-gradient-to-br from-[#db5afb3c] via-[#52d2fe2a] to-[#fff4b811] text-[2.3rem] z-20 animate-bounce-slow">🤖</span>
    ),
    badge: "NEW",
    title: "Multi-Persona AI",
    desc: "Effortlessly swap minds: Friendly, Sarcastic, DevGPT, or Translate—all in one, never losing the thread.",
    reveal: "No prompts are ever leaked. Persona state is yours & encrypted."
  },
  {
    icon: (
      <span className="w-12 h-12 flex items-center justify-center rounded-xl shadow-[0_1.5px_16px_#db5afbbc] bg-gradient-to-tr from-[#7fb3fb32] via-[#db5afb35] to-[#75e4b645] text-[2.4rem] z-20 animate-pop2">🔒</span>
    ),
    badge: "SECURE",
    title: "JWT Secure Auth",
    desc: "Passwordless, tamper-proof logins. Tokens, not cookies. Security fit for builders—not marketers.",
    reveal: "Your tokens never leave. Every session is cryptographically unique."
  },
  {
    icon: (
      <span className="w-12 h-12 flex items-center justify-center rounded-xl shadow-[0_2px_14px_#a5a3fd51] bg-gradient-to-br from-[#56DEF81a] via-[#e9d2fb29] to-[#adfcaf1c] text-2xl z-20 animate-pop2">📝</span>
    ),
    badge: "FOREVER",
    title: "Persistent History",
    desc: "Your words, always yours. Auto-save, rename, recover, replay. Never lose your flow, ever.",
    reveal: "You control deletion. Nothing is harvested. History stays local."
  },
  {
    icon: (
      <span className="w-12 h-12 flex items-center justify-center rounded-xl shadow-[0_2px_18px_#7bedfd45] bg-gradient-to-tr from-[#b2bcfb28] via-[#db5afb37] to-[#fdfede18] text-2xl z-20 animate-wiggle">⚡</span>
    ),
    badge: "FAST",
    title: "Modern UI/UX",
    desc: "Glassy cards, kinetic highlights, and true real-time input. Every action stuns. Every pixel flexes.",
    reveal: "Encrypted at every click & move. UI cues never leak data."
  },
  {
    icon: (
      <span className="w-12 h-12 flex items-center justify-center rounded-xl shadow-[0_2px_20px_#db5afb29] bg-gradient-to-tl from-[#db5afb22] via-[#75e4b61f] to-[#e5fffa1a] text-2xl z-20 animate-float">📱</span>
    ),
    badge: <span className="uppercase tracking-wide text-[#75e4b6] text-xs font-mono">Touch<span className="hidden sm:inline"> Ready</span></span>,
    title: "Mobile Adaptive",
    desc: "No breakpoints needed: every tap, swipe and keyboard shortcut is pixel-perfect on any device.",
    reveal: "Fingerprint/FaceID support. Mobile data stays local, never sent."
  },
  {
    icon: (
      <span className="w-12 h-12 flex items-center justify-center rounded-xl shadow-[0_3px_16px_#abf8e655] bg-gradient-to-r from-[#db5afb29] via-[#52d2fe3f] to-[#abf8e634] text-2xl z-20 animate-rotate">🔄</span>
    ),
    badge: <span className="uppercase tracking-wide text-[#db5afb] text-xs font-mono">OSS</span>,
    title: "Open Source DNA",
    desc: "Don’t just use software—own it. Audit, fork, remix for work or pleasure. No vendor lock. Real freedom.",
    reveal: "Every line is public. No black-box trap. Trust by design."
  }
];

export function FeaturesSection() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <section
      ref={ref}
      className="relative w-full max-w-6xl mx-auto px-5 sm:px-10 py-16 sm:py-24 flex flex-col z-10"
      aria-label="Brutally Modern Features"
      tabIndex={-1}
      style={{
        background: "radial-gradient(ellipse at top right,rgba(82,210,254,.04) 2%,rgba(219,90,251,.05) 97%)"
      }}
    >
      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 38, letterSpacing: "-0.16em" }}
        animate={inView ? { opacity: 1, y: 0, letterSpacing: "0em" } : {}}
        transition={{ type: "spring", duration: 1, delay: 0.13 }}
        className="text-4xl sm:text-6xl font-black tracking-tight mb-3 text-center bg-gradient-to-r from-[#db5afb] via-[#5e8efd] to-[#75e4b6] bg-clip-text text-transparent drop-shadow-[0_2px_32px_#db5afb56] select-text"
        style={{ fontFamily: "'Space Grotesk','JetBrains Mono',sans-serif" }}
        tabIndex={0}
      >
        FEATURES
      </motion.h2>
      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", duration: 0.65, delay: 0.24 }}
        className="mx-auto max-w-xl text-center mb-12 text-xl sm:text-2xl font-semibold text-[#c7f7ff] tracking-tight z-10 flex flex-col gap-1"
        style={{ fontFamily: "'JetBrains Mono','Space Grotesk',sans-serif" }}
      >
        <span>
          Coz we secure <b className="text-[#db5afb]">everything you can think of</b>.
        </span>
        <span className="text-[#8dbad6] font-bold text-lg sm:text-xl">
          <span className="inline-block animate-pulse">→</span>{" "}
          <span className="inline-block">Hover/tap any feature to reveal <span className="text-[#75e4b6]">how we protect you</span>.</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 28, filter: "blur(7px)" }}
        animate={inView ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ type: "spring", duration: 1, delay: 0.23 }}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30, filter: "blur(2px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
            transition={{
              delay: 0.12 * i + 0.08,
              type: "spring",
              stiffness: 115,
              duration: 0.63,
            }}
            tabIndex={0}
            aria-label={`Feature: ${f.title}`}
            className={`
              group relative focus:outline-none
              flex flex-col items-start md:items-center gap-5
              bg-white/75 dark:bg-[#181b2be9] bg-clip-padding
              rounded-[2.2rem] border border-[#e6cbfa] dark:border-[#23204c]
              shadow-[0_10px_48px_#db5afb13]
              px-9 py-11 overflow-hidden
              ring-[#6939eb44] transition-all
              hover:scale-[1.055] hover:ring-8 hover:z-20 hover:bg-white/95 dark:hover:bg-[#191933fb]
              focus:ring-8
              cursor-pointer
              will-change-transform
              backdrop-blur-[18px]
              duration-200
            `}
            style={{
              WebkitBackdropFilter: "blur(15px) saturate(1.23)",
              backdropFilter: "blur(15px) saturate(1.23)"
            }}
          >
            {/* Badge */}
            {f.badge && (
              <div className="absolute -top-3 right-5 z-30 drop-shadow-md text-[.97em]">{f.badge}</div>
            )}
            {/* Animated Glass Removal (for Reveal) */}
            <div
              className={
                "absolute inset-0 pointer-events-none transition-all duration-300 z-40 rounded-[2.1rem] " +
                "group-hover:opacity-0 group-focus:opacity-0"
              }
              aria-hidden="true"
              style={{
                background:
                  "rgba(255,255,255,0.18) linear-gradient(135deg,#db5afb26 0%,#5e8efd26 69%,#75e4b60e 100%)",
                WebkitBackdropFilter: "blur(13.5px) saturate(1.17)",
                backdropFilter: "blur(13.5px) saturate(1.17)",
                transition: "opacity 0.25s, filter 0.26s"
              }}
            />
            {/* Icon */}
            <div className="z-20 relative">{f.icon}</div>
            {/* Main Content (fades out on hover) */}
            <div
              className="transition-all duration-300 ease-in-out flex flex-col items-center w-full"
            >
              <div className="font-black text-lg md:text-2xl text-[#db5afb] group-hover:text-[#5e8efd] dark:group-hover:text-[#e7faff] transition tracking-tight leading-tight mb-1">
                {f.title}
              </div>
              <div className="text-[#32405c] dark:text-[#b0a9e6] text-base md:text-lg leading-tight mt-1 font-mono text-center">
                {f.desc}
              </div>
            </div>

            {/* Reveal Layer (shows on hover/focus/tap, pointer-events yes only when visible) */}
            <div
              className={`absolute inset-0 flex flex-col justify-center items-center px-6 py-10
                rounded-[2.1rem] bg-gradient-to-br from-[#1c1a59dd] via-[#52d2fe27] to-[#db5afb19]
                text-[#db5afb] dark:text-[#82eefa] text-center text-lg font-bold opacity-0
                pointer-events-none group-hover:opacity-100 group-focus:opacity-100
                group-hover:pointer-events-auto group-focus:pointer-events-auto
                select-text z-50 transition-all duration-300`}
              role="alert"
              aria-hidden="true"
            >
              
              
            </div>
            {/* Neon Line */}
            <span className="absolute left-6 right-6 bottom-2 h-[2px] bg-gradient-to-r from-[#5e8efd80] via-[#db5afb80] to-[#75e4b6bb] rounded-full opacity-85 pointer-events-none group-hover:opacity-100 transition-all" />
          </motion.div>
        ))}
      </motion.div>

      {/* Section footer or meta, as before */}
      <motion.div
        initial={{ opacity: 0, y: 21 }}
        animate={inView ? { opacity: 0.95, y: 0 } : {}}
        transition={{ duration: 0.7, type: "spring", delay: features.length * 0.12 + 0.23 }}
        className="mt-14 text-center font-mono text-[1.08rem] tracking-tight text-[#a9b2e8] pointer-events-none select-none"
      >
        <b className="font-black text-[#db5afb]">Explore. Touch. Feel safe.</b>  
        Privacy isn’t just a footnote—it’s right here, proven.
      </motion.div>
    </section>
  );
}

// -------- Section Divider --------
const SectionDivider = () => (
  <motion.div
    initial={{ scaleX: 0.6, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.88, type: 'spring' }}
    className="w-[36vw] max-w-lg mx-auto my-14 h-[5px] rounded-full bg-gradient-to-r from-[#db5afb77] via-[#53c9f2cc] to-[#75e4b6ad] blur-[2.8px]"
  />
);

// -------- Hero Section --------
const headline = [
  { text: "BRUTAL.", colors: "from-[#52d2fe] via-[#db5afb] to-[#73eec9]" },
  { text: "EFFECTIVE.", colors: "from-[#db5afb] via-[#75e4b6] to-[#52d2fe]" },
  { text: "GENAI PRO.", colors: "from-[#7C7CFB] via-[#db5afb] to-[#56DEF8]" },
];
const TypewriterHeadline = ({ inView }) => {
  const wordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: i => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: 0.19 + i * 0.29, type: "spring", bounce: 0.5 }
    }),
  };
  return (
    <div
      className="flex flex-col md:flex-row md:gap-2 items-center justify-center mb-1 select-text"
      style={{
        fontFamily: "'Space Grotesk', 'JetBrains Mono', ui-sans-serif",
      }}
    >
      {headline.map((h, i) => (
        <motion.span
          key={h.text}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`text-5xl md:text-7xl inline-block font-black tracking-tight leading-tight bg-gradient-to-r ${h.colors} bg-clip-text text-transparent drop-shadow-[0_2px_10px_#5540bbaa] transition duration-300 hover:saturate-150 hover:scale-105 cursor-pointer`}
          whileHover={{
            textShadow: "0 2px 22px #db5afb,0 1px 7px #52d2fe",
            rotate: i % 2 === 0 ? -1.7 : 1.7,
          }}
        >{h.text}</motion.span>
      ))}
    </div>
  );
};

const TaglineTypewriter = ({ inView }) => {
  const taglinePieces = [
    { text: "Not just fast —", color: "text-[#52d2fe]" },
    { text: "transformative.", color: "text-[#db5afb]" },
    { br: true },
    { text: "Not just smart —", color: "text-[#75e4b6]" },
    { text: "brutal design.", color: "text-[#fa76fa]" },
  ];
  const wordVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: i => ({
      opacity: 1, y: 0,
      transition: { delay: 0.8 + i * 0.11, type: "spring" }
    }),
  };
  let idx = -1;
  return (
    <p className="text-2xl sm:text-3xl font-semibold max-w-2xl mx-auto mt-6 mb-2 text-[#e7faff] flex flex-wrap gap-x-2 justify-center" style={{ fontFamily: "'JetBrains Mono', 'Space Grotesk', sans-serif" }}>
      {taglinePieces.map((piece, i) => {
        if (piece.br) return <br key={i} />;
        idx++;
        return (
          <motion.span
            key={i}
            custom={idx}
            variants={wordVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`transition-colors duration-200 font-bold hover:text-white cursor-pointer ${piece.color}`}
            whileHover={{ scale: 1.08, textShadow: "0 2px 12px #db5afb" }}
          >{piece.text}</motion.span>
        );
      })}
    </p>
  );
};

export function BrutalLandingHero() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mascotControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mascotControls.start({
        scale: [0.85, 1.12, 1],
        opacity: 1,
        rotate: [-6, 2, 0],
        transition: { duration: 0.98, type: "spring", bounce: 0.6, delay: 0.14 }
      });
    }
  }, [inView, mascotControls]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] w-full flex flex-col justify-center items-center text-center bg-[#13151a] overflow-hidden select-none"
      aria-label="GenAI Pro Splash"
    >
      {/* Mesh/Noise brutalist BG */}
      <motion.div
        initial={{ opacity: 0, scale: 1.13 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 2, delay: 0.09 }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 mix-blend-luminosity opacity-70 bg-[url('/textures/mesh-bg.png')] bg-cover"></div>
        <div className="absolute inset-0 opacity-14 pointer-events-none bg-[url('/textures/grain.png')] bg-repeat"></div>
      </motion.div>

    

      {/* Headline with animated/staggered reveal */}
      <TypewriterHeadline inView={inView} />

      {/* Animated tagline */}
      <TaglineTypewriter inView={inView} />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.06, type: "spring", stiffness: 220 }}
        className="pt-6"
      >
        <button
  onClick={() => {
    const el = document.getElementById("aichat");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
  className="px-11 py-5 rounded-full uppercase font-black shadow-xl text-lg tracking-widest
    bg-gradient-to-tr from-[#db5afb] via-[#5e8efd] to-[#75e4b6]
    hover:scale-105 hover:bg-gradient-to-tl border-4 border-[#fff3]
    transition-all duration-200 hover:rotate-[-1.1deg] hover:shadow-pulse focus:outline-none focus:ring-4 focus:ring-[#52d2fe50]"
  aria-label="Unleash GenAI Pro"
>
  <span className="transition-all duration-200 hover:text-[#52d2fe]">UNLEASH GENAI</span>
</button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 0.77, y: 0 } : {}}
        transition={{ delay: 1.2, type: "spring", duration: 1.1 }}
        className="absolute bottom-7 w-full text-center px-3 pointer-events-none font-mono text-[#98a2ec] text-lg"
      >
        Welcome, dev. The future is here.<span className="animate-pulse">_</span>
      </motion.div>
    </section>
  );
}
// -------- Main Functionality Section --------
const FeaturesRow = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="7" fill="#db5afb18"/>
        <path d="M7 17V7h10v10H7z" stroke="#db5afb" strokeWidth="2.2"/>
        <circle cx="12" cy="12" r="2" fill="#56DEF8"/>
      </svg>
    ),
    label: "Realtime AI Chat",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="7" fill="#75e4b622"/>
        <rect x="7" y="11" width="10" height="2" rx="1" fill="#5e8efd"/>
        <rect x="11" y="7" width="2" height="10" rx="1" fill="#fa76fa"/>
      </svg>
    ),
    label: "Persona Switching",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="7" fill="#56DEF81a"/>
        <path d="M8 15l4-6 4 6" stroke="#db5afb" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="2" fill="#db5afb"/>
      </svg>
    ),
    label: "Adaptive Themes",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="7" fill="#5e8efd19"/>
        <path d="M7 12h10M12 7v10" stroke="#75e4b6" strokeWidth="2"/>
      </svg>
    ),
    label: "Saveable History",
  },
];

export const MainFunctionality = () => (
  <section className="w-full px-5 sm:px-8 py-12 max-w-6xl mx-auto relative flex flex-col items-center z-10">
    {/* GLASS/GRADIENT BLUR BG for depth */}
    <div className="absolute inset-0 -z-10 opacity-80 pointer-events-none bg-gradient-to-tr from-[#18143fdd] via-[#db5afb0C] to-[#75e4b60A] blur-md rounded-[2.5rem]" />
    
    {/* Kinetic, brutalist Section Title */}
    <h2
      className="text-4xl md:text-5xl font-black mb-9 bg-gradient-to-r from-[#db5afb] via-[#5e8efd] to-[#75e4b6] bg-clip-text text-transparent text-center tracking-tighter 
        drop-shadow-xl transition-all duration-200 select-text"
      tabIndex={0}
      style={{ fontFamily: "'Space Grotesk', 'JetBrains Mono', ui-sans-serif" }}
    >
      {Array.from("🛠 MAIN FUNCTIONALITY").map((chr, i) =>
        chr === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className="inline-block transition-transform duration-150 hover:scale-125 hover:text-[#fff]"
            style={{
              transitionDelay: `${i * 8}ms`,
              cursor: "pointer",
            }}
            tabIndex={-1}
          >
            {chr}
          </span>
        )
      )}
    </h2>

    {/* Visual Feature "Pills" Row */}
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      {FeaturesRow.map((f, idx) => (
        <div
          key={f.label}
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#1a17342d] border border-[#23223b44] text-base font-mono font-bold uppercase transition hover:shadow-[0_1px_16px_#db5afb33] hover:bg-[#221b36] cursor-pointer"
          tabIndex={0}
        >
          <span className="">{f.icon}</span>
          <span className="transition-colors duration-100 text-[#db5afb] hover:text-[#fff]">{f.label}</span>
        </div>
      ))}
    </div>

    {/* Main two-column layout */}
    <div className="flex flex-col md:flex-row gap-10 w-full items-stretch">
      <div className="w-full md:w-[66%] bg-[#db5afb0e] rounded-3xl shadow-2xl p-10 flex flex-col justify-between border-[1.7px] border-[#2f2f53]">
        <header className="flex items-center gap-3 mb-4">
          <span className="block w-10 h-10 bg-gradient-to-br from-[#db5afb88] to-[#5e8efd44] rounded-lg shadow-md" />
          <h3 className="font-black text-xl md:text-2xl text-[#db5afb] tracking-tighter" style={{
            fontFamily: "'Space Grotesk', 'JetBrains Mono', ui-sans-serif"
          }}>
            LIVE CHAT WORKSPACE
          </h3>
        </header>
        <ul className="list-disc list-inside text-[#b4bfee] space-y-2 ml-2 font-mono text-base">
          <li>Realtime, multi-persona AI collaboration</li>
          <li>Kinetic workspace with dynamic prompt and persona switching</li>
          <li>Animated, message-driven chat bubbles and semantic blocks</li>
          <li>Save/load history — natural flow, developer-grade</li>
        </ul>
        <footer className="mt-8 text-[#db5afb] font-bold italic opacity-80 text-lg">
          Try it below.<span className="ml-2 text-[#75e4b6]">Say "Hello AI!"</span>
        </footer>
      </div>

      {/* SIDE: system/UI highlights */}
      <div className="w-full md:w-[34%] flex flex-col gap-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#5e8efd0b] via-[#db5afb0f] to-[#99f7dd1a] border-2 border-[#c5a8fd33] p-7 shadow-xl text-[#bbd6f7] font-mono text-base transition hover:shadow-[0_2px_24px_#db5afb22]">
          <b className="block mb-3 text-[#db5afb] font-black tracking-wide text-lg">
            HIGHLIGHTS:
          </b>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Modern, micro-animated UI</li>
            <li>Secure backend + JWT login</li>
            <li>Save/restore full chat history</li>
            <li>Adaptive for dark/light themes</li>
          </ul>
        </div>
        <div className="rounded-3xl bg-[#16132a0d] border border-[#4e408c29] p-6 shadow-lg text-[#d1beff] font-mono text-sm">
          <span className="font-semibold tracking-wide uppercase text-[#db5afb] mb-1 block">PRO TIP:</span>
          Every action is <b className="text-[#75e4b6]">instant</b>, every message is <b className="text-[#fa76fa]">recoverable</b>.
        </div>
      </div>
    </div>
  </section>
);

// -------- Chat Message Bubble --------
const roleIcon = role =>
  role === "user"
    ? <span aria-label="You" className="mr-2 select-none">🧑</span>
    : <span aria-label="AI" className="mr-2 select-none">🤖</span>;

export const MessageBubble = ({ msg, i }) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 28, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false }}
    transition={{
      delay: 0.045 * i,
      type: "spring",
      stiffness: 225,
      damping: 21,
    }}
    whileHover={{
      scale: 1.035,
      boxShadow: msg.role === "user"
        ? "0 5px 42px #db5afb22, 0 1px 5px #e1dcff50"
        : "0 5px 44px #73d1f238, 0 1px 5px #1e90fd40",
      borderColor: msg.role === "user" ? "#db5afb" : "#73d1f2"
    }}
    className={`
      w-full flex
      ${msg.role === "user" ? "justify-end" : "justify-start"}
      mb-2 md:mb-3
      pointer-events-auto
      group
    `}
    role="listitem"
  >
    <div
      className={`
        px-5 py-3
        max-w-[85vw] md:max-w-[70%]
        rounded-[1.4em]
        text-[1.12rem] leading-snug font-medium
        relative
        shadow-sm transition
        border-2
        ${
          msg.role === "user"
            ? "bg-gradient-to-br from-[#f4f1fe] to-[#e1dcff] text-[#4931b1] border-[#db5afb60] shadow-[0_1.5px_10px_#db5afb06] self-end"
            : "bg-[#181936e9] text-[#edf6ff] border-[#73d1f250] shadow-[0_1.5px_12px_#7be6fa13] self-start"
        }
        group-hover:scale-[1.035]
        group-hover:border-[#db5afb] group-hover:z-20
        focus:outline-none focus:ring-2 focus:ring-[#52d2fe60]
      `}
      tabIndex={0}
    >
      <span
        className={`inline-block align-middle ${
          msg.role === "user"
            ? "opacity-65 text-[#db5afb] mr-2"
            : "opacity-65 text-[#52d2fe] mr-2"
        }`}
        aria-hidden="true"
      >
        {roleIcon(msg.role)}
      </span>
      <span
        className={`
          break-words hyphens-auto
          ${msg.role === "user" ? "font-bold" : "font-normal"}
          select-text
        `}
      >
        {msg.content}
      </span>
      {/* (Optional) subtle triangle "bubble tail" for chat look */}
      <span
        className={`
          absolute -bottom-2 w-5 h-5 z-0
          ${
            msg.role === "user"
              ? "right-2 rotate-45 bg-[#e1dcff] border-b-2 border-r-2 border-[#db5afb80]"
              : "left-2 rotate-45 bg-[#181936e9] border-b-2 border-l-2 border-[#73d1f250]"
          }
          rounded-sm
        `}
        aria-hidden="true"
        style={{ boxShadow: msg.role === "user" ? "1px 1px 10px #db5afb18" : "1px 1px 10px #52d2fe11" }}
      ></span>
    </div>
  </motion.div>
);

const email = "kartikbhargava1111@gmail.com"; // <--- change as needed!
const linkedin = "https://www.linkedin.com/in/kartik-sharma-dev"; // update for real!
const github = "https://github.com/kartiksharmaweb"; // update for real!

const palette = {
  mainGrad: "from-[#db5afb] via-[#5e8efd] to-[#73eec9]",
  neonBox: "ring-2 ring-[#db5afb77] border-[#5e8efd50]",
};

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function copyToClipboard(mail, setCopied) {
    navigator.clipboard?.writeText(mail);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function handleMail(e) {
    e.preventDefault();
    if (!msg.trim()) return;
    setSending(true);
    const mailto = `mailto:${email}?subject=Contact from GenAI Pro&body=${encodeURIComponent(msg.trim())}`;
    window.open(mailto, "_blank");
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setMsg("");
      setTimeout(() => setSent(false), 2000);
    }, 400);
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", delay: 0.18, duration: 0.5 }}
      className={`
        w-full max-w-4xl mx-auto mt-20 mb-8 py-10 px-4 rounded-[2rem]
        bg-[#181932f0] dark:bg-[#1a1d31f9] shadow-[0_4px_38px_#db5afb16]
        flex flex-col gap-7 items-center border ${palette.neonBox}
        backdrop-blur-[11px] relative z-40
      `}
      style={{
        fontFamily: "'Space Grotesk', 'JetBrains Mono', ui-sans-serif, system-ui, sans-serif"
      }}
      aria-label="Project footer and contact"
    >
      {/* Brand & stack badge */}
      <div className="flex flex-col items-center gap-1 mb-3">
        <span className={`font-black text-2xl tracking-tight bg-gradient-to-r ${palette.mainGrad} bg-clip-text text-transparent select-text`}>GenAI Pro</span>
        <span className="text-base font-mono text-[#e5eaff] dark:text-[#81bfdd] font-bold tracking-widest bg-[#271a39]/60 px-4 py-1 rounded-xl mt-1 shadow ring-1 ring-[#5e8efd14] select-all">
          Solo Project • React • Tailwind • Framer • FastAPI
        </span>
      </div>
      {/* Name + Social icons */}
      <div className="flex flex-col items-center gap-0.5 mb-1">
        <span className="font-black text-[1.09rem] sm:text-xl tracking-wide text-[#db5afb] select-text">Kartik Sharma</span>
        <span className="font-mono text-[#75e4b6] text-sm font-bold uppercase tracking-widest">
          Indie Creator &nbsp;
          <span className="text-[#8caeff]">|</span>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="mx-2 text-[#5e8efd] hover:text-[#db5afb] hover:underline transition group"
          >
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" className="inline align-text-bottom mr-1 group-hover:scale-110 transition" fill="currentColor"><path d="M19 0h-14c-2.75 0-5 2.25-5 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5v-14c0-2.75-2.25-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.16c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.16h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.51 0-1.74 1.18-1.74 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.83-1.54 3.03 0 3.59 1.99 3.59 4.58v5.73z"/></svg>
            LinkedIn
          </a>
          <span className="mx-2 text-[#8caeff]">|</span>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="mx-1 text-[#db5afb] hover:text-[#5e8efd] hover:underline transition group"
          >
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" className="inline align-text-bottom mr-1 group-hover:scale-110 transition" fill="currentColor"><path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.799 8.207 11.386.6.111.82-.259.82-.577v-2.022c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.842 1.236 1.842 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.774.419-1.304.762-1.604-2.665-.305-5.466-1.334-5.466-5.932 0-1.311.469-2.382 1.235-3.222-.123-.305-.535-1.537.117-3.205 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.668.241 2.9.118 3.205.77.84 1.234 1.911 1.234 3.222 0 4.61-2.804 5.624-5.475 5.921.43.372.824 1.104.824 2.228v3.301c0 .321.219.694.825.576 4.765-1.589 8.199-6.088 8.199-11.386 0-6.63-5.373-12-12-12z" /></svg>
            GitHub
          </a>
        </span>
      </div>
      {/* Message/email form */}
      <form
        className="max-w-md w-full mx-auto px-3 flex flex-col sm:flex-row gap-3 items-center"
        onSubmit={handleMail}
        autoComplete="off"
      >
        <input
          type="text"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Say hi, collab, or feedback…"
          disabled={sending || sent}
          required
          minLength={2}
          className={`
            flex-1 px-5 py-3 rounded-xl font-mono text-base bg-[#cddaee29] border border-[#db5afb44]
            focus:ring-2 focus:ring-[#5e8efd] outline-none transition
            text-[#f6f4f3] placeholder-[#aab3cc] shadow
          `}
          aria-label="Your message"
        />
        <button
          type="submit"
          disabled={sending || !msg.trim()}
          className={`
            flex items-center gap-2 px-7 py-3 rounded-xl font-black text-base
            uppercase tracking-wide bg-gradient-to-tr from-[#db5afb] via-[#5e8efd] to-[#75e4b6]
            hover:bg-gradient-to-tl border-2 border-[#fff1] transition-all
            focus:outline-none focus:ring-2 focus:ring-[#db5afb] active:scale-97
            text-[#191733] shadow-xl
          `}
          aria-label="Send message by email"
        >
          ✉ {sending ? "Sending…" : sent ? "Sent!" : "Mail Me"}
        </button>
      </form>
      {sent && (
        <div className="font-bold mt-1 text-[#db5afb] animate-pulse">
          Thanks! Check your mail app 💌
        </div>
      )}
      {/* Copy-to-clipboard */}
      <div className="mt-3 flex items-center gap-3 justify-center">
        <button
          type="button"
          onClick={() => copyToClipboard(email, setCopied)}
          className="flex items-center gap-1 font-mono font-bold text-[#5e8efd] hover:text-[#db5afb] px-3 py-1 rounded-lg bg-[#25265520] border border-[#5e8efd44] transition shadow"
          aria-label="Copy my email address"
        >
          <span>Copy Email</span>
          <span className="text-[#98eecf] select-all">{email}</span>
          {copied && (
            <span className="ml-2 text-[#db5afb] animate-bounce">✓ Copied!</span>
          )}
        </button>
      </div>
      {/* Tech stack badges */}
      <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-[15px] font-bold opacity-90">
        <span className="bg-gradient-to-tr from-[#db5afb3a] to-[#75e4b622] px-3 py-1 rounded-lg text-[#db5afb]">React</span>
        <span className="bg-gradient-to-tr from-[#5e8efd38] to-[#db5afb19] px-3 py-1 rounded-lg text-[#5e8efd]">Tailwind</span>
        <span className="bg-gradient-to-tr from-[#73eec941] to-[#5e8efd1a] px-3 py-1 rounded-lg text-[#73eec9]">Framer</span>
        <span className="bg-gradient-to-tr from-[#f0c84c38] to-[#db5afb25] px-3 py-1 rounded-lg text-[#f0c84c]">FastAPI</span>
      </div>
      {/* Legal */}
      <div className="mt-4 w-full border-t border-[#312c53] pt-3 text-xs font-mono text-[#a6b1ca] text-center opacity-80">
        &copy; {new Date().getFullYear()} Kartik Bhargava · All rights reserved.{" "}
        <span className="mx-2 text-[#5e8efd]">|</span>
        <a className="text-[#db5afb] underline hover:no-underline" href={`mailto:${email}`}>Contact me</a>
      </div>
    </motion.footer>
  );
}
// ----------- MAIN APP COMPONENT -----------
export default function App() {
  // --- State ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prompt, setPrompt] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('token') ?? '');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [persona, setPersona] = useState('friendly');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showFog, setShowFog] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const chatBoxRef = useRef();
  const promptInputRef = useRef();
  const API_BASE = 'http://localhost:8000';

  // ---- Effects ----
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight + 300,
        behavior: 'smooth',
      });
    }
  }, [messages, selectedConversation]);

  useEffect(() => {
    if (!token) setShowFog(false);
  }, [token]);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(''), 4500);
    return () => clearTimeout(t);
  }, [error]);

  // ---- API Logic ----
  const fetchHistory = async (authToken) => {
    try {
      const res = await fetch(`${API_BASE}/conversations`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch {
      setError('Could not fetch chat history.');
    }
  };

  const handleLogin = async () => {
    setShowFog(true);
    setIsPending(true);
    setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            username: email.trim(),
            password,
            grant_type: 'password',
          }),
        });
        const data = await res.json();
        if (data.access_token) {
          setToken(data.access_token);
          localStorage.setItem('token', data.access_token);
          await fetchHistory(data.access_token);
          setTimeout(() => setShowFog(false), 800);
          setTimeout(() => promptInputRef.current?.focus(), 1000);
        } else {
          setShowFog(false);
          setError('❌ Login failed! Check your credentials.');
        }
      } catch {
        setShowFog(false);
        setError('Error during login.');
        setToken('');
        localStorage.removeItem('token');
      } finally {
        setIsPending(false);
      }
    }, 400);
  };

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all signup fields.');
      return;
    }
    setIsPending(true);
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const data = await res.json();
      if (data.msg === 'User registered!') {
        setError('✅ Signup successful! Please login.');
        setIsLoginMode(true);
      } else {
        setError('❌ Signup failed:' + data.detail);
      }
    } catch {
      setError('Error during signup.');
    } finally {
      setIsPending(false);
    }
  };

  const handleGenerate = async () => {
    if (!token) return setError('🔒 Please log in first.');
    if (!prompt.trim()) return setError('💡 Please enter a prompt.');
    setIsPending(true);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: prompt },
      { role: 'assistant', content: '...' }, // Typing indicator
    ]);
    try {
      const res = await fetch(`${API_BASE}/generate-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: prompt.trim(), persona }),
      });
      if (res.status === 401) {
        setToken('');
        localStorage.removeItem('token');
        setError('Session expired. Please login again.');
        setMessages([]);
        return;
      }
      if (!res.ok) {
        const errText = await res.text();
        setError(`❌ Failed: ${res.status} ${res.statusText}\n${errText}`);
        setMessages((prev) => prev.slice(0, -1));
        return;
      }
      const data = await res.json();
      setMessages((prev) =>
        prev
          .slice(0, -1)
          .concat({ role: 'assistant', content: data.response })
      );
      setPrompt('');
      setTimeout(
        () =>
          chatBoxRef.current?.scrollTo({
            top: chatBoxRef.current.scrollHeight + 200,
            behavior: 'smooth',
          }),
        185
      );
    } catch (err) {
      setError('❌ Error generating response: ' + (err?.message || String(err)));
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsPending(false);
    }
  };

  const handleLogout = async () => {
    setShowFog(true);
    setIsPending(true);
    setTimeout(async () => {
      if (
        messages.length > 0 &&
        window.confirm('🧠 Save your conversation history?')
      ) {
        try {
          await fetch(`${API_BASE}/save-conversation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              messages,
              title: 'Session on ' + new Date().toLocaleString(),
            }),
          });
        } catch {}
      }
      try {
        await fetch(`${API_BASE}/logout`, {
          method: 'GET',
          credentials: 'include',
        });
      } catch {}
      localStorage.removeItem('token');
      setToken('');
      setPrompt('');
      setMessages([]);
      setConversations([]);
      setSelectedConversation(null);
      setShowFog(false);
      setIsPending(false);
    }, 600);
  };

  const loadConversation = (conv) => {
    setSelectedConversation(conv.id);
    setMessages(conv.messages);
    setShowHistory(false);
  };

  // ------------------------------------- APP LAYOUT -------------------------------------
  return (
    <div
      className="min-h-screen w-full flex flex-col relative bg-gradient-to-b from-[#18203b] to-[#231933] via-[#13182f] text-white overflow-x-hidden"
      style={{
        fontFamily: 'Inter, Space Grotesk, JetBrains Mono, sans-serif',
        backgroundAttachment: 'fixed',
      }}
    >
      <GelCursor />
      <FoggyOverlay show={showFog} type={!token ? 'logout' : 'login'} />

      <BrutalLandingHero />
      <SectionDivider />

      <MainFunctionality />
      <SectionDivider />

      {/* =================== Chat Section (Brutally Central) =================== */}
      <motion.main
      id="aichat"  
  initial={{ opacity: 0, scale: 0.97, y: 32 }}
  whileInView={{ opacity: 1, scale: 1, y: 0 }}
  viewport={{ once: false }}
  transition={{
    type: 'spring',
    duration: 1.1,
    delay: 0.15,
    stiffness: 110,
        }}
        className="w-full max-w-[44rem] mx-auto rounded-[2.1rem] shadow-lg border border-[#e6cbfa] dark:border-[#263664] px-3 md:px-8 py-7 bg-gradient-to-br from-[#262263f0] via-[#192239f7] to-[#2b1546e7] backdrop-blur-2xl relative mb-10"
        role="main"
        aria-live="polite"
      >
        <div className="flex flex-col gap-6 mb-7">
          <h2 className="font-black text-2xl md:text-3xl text-center bg-gradient-to-r from-[#db5afb] via-[#5e8efd] to-[#75e4b6] bg-clip-text text-transparent">
            💬 AI Chat Interface
          </h2>
          <div className="text-center text-[#c9d0fd] max-w-xl mx-auto mb-2">
            Login to chat with AI, pick personas, save/load your sessions.
          </div>
        </div>
        {!token ? (
          // ------------------ AUTH UI ------------------
          <section className="space-y-7 pt-2" aria-label="Authentication form">
            {!isLoginMode && (
              <label htmlFor="signupName" className="block font-medium text-[#db5afb]">
                Full Name
                <input
                  type="text"
                  id="signupName"
                  className="w-full px-4 py-3 rounded-xl bg-[#fff]/10 border border-[#d4cbfd39] text-[1.10rem] font-medium focus:ring-2 focus:ring-[#94caff] outline-none transition"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                  disabled={isPending}
                  required
                />
              </label>
            )}
            <label htmlFor="email" className="block font-medium text-[#db5afb]">
              Email
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-xl bg-[#fff]/10 border border-[#d4cbfd39] text-[1.10rem] font-medium focus:ring-2 focus:ring-[#94caff] outline-none transition"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                disabled={isPending}
                required
              />
            </label>
            <label htmlFor="password" className="block font-medium text-[#db5afb]">
              Password
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-xl bg-[#fff]/10 border border-[#d4cbfd39] text-[1.10rem] font-medium focus:ring-2 focus:ring-[#94caff] outline-none transition"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                disabled={isPending}
                required
              />
            </label>
            <button
              onClick={isLoginMode ? handleLogin : handleSignup}
              className="w-full bg-gradient-to-tr from-[#db5afb] via-[#5e8efd] to-[#75e4b6] hover:brightness-105 text-white font-bold rounded-xl py-3 text-[1.18rem] transition active:scale-98 active:opacity-80 duration-200 shadow-lg"
              aria-label={isLoginMode ? 'Login' : 'Sign Up'}
              type="button"
              disabled={isPending}
            >
              {isPending ? '⏳' : isLoginMode ? 'Login' : 'Sign Up'}
            </button>
            <p className="text-sm text-center text-[#a785bb] dark:text-[#a7adc1] font-medium">
              {isLoginMode ? 'New user? ' : 'Already have an account? '}
              <button
                type="button"
                className="underline text-[#db5afb] hover:text-[#5e8efd] font-bold cursor-pointer"
                onClick={() => setIsLoginMode(!isLoginMode)}
                aria-label={isLoginMode ? 'Switch to Sign Up' : 'Switch to Login'}
              >
                {isLoginMode ? 'Sign up' : 'Login'}
              </button>
            </p>
          </section>
        ) : (
          // --------------- CHAT UI ---------------
          <section className="flex flex-col min-h-[410px] sm:min-h-[460px] relative pt-1" aria-label="Chat interface">
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="fixed inset-0 bg-[#23213a45] dark:bg-[#181827e6] flex justify-center items-center z-20"
                  onClick={() => setShowHistory(false)}
                  style={{ cursor: 'pointer' }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="chat-history-title"
                  tabIndex={-1}
                >
                  <motion.div
                    initial={{ y: 42, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 42, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 18,
                      stiffness: 160,
                    }}
                    className="bg-[#19172b] dark:bg-[#10101b] rounded-2xl px-7 py-7 w-[90vw] sm:w-[380px] max-h-[330px] shadow-2xl border border-[#e1cafe] dark:border-[#262639] flex flex-col"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center mb-4 justify-between">
                      <h2 id="chat-history-title" className="font-bold text-base text-[#e9aefd] dark:text-white">
                        Your Chats
                      </h2>
                      <button
                        className="text-3xl font-bold text-[#d9c6fc] hover:text-[#db5afb]"
                        onClick={() => setShowHistory(false)}
                        aria-label="Close chat history"
                      >
                        ×
                      </button>
                    </div>
                    <div className="overflow-auto max-h-[210px] custom-scroll space-y-1 pr-2" role="list">
                      {conversations.length === 0 ? (
                        <div className="text-xs text-[#a99bc7] mt-8">
                          No past chats.
                        </div>
                      ) : (
                        conversations.map((conv) => (
                          <div
                            key={conv.id}
                            onClick={() => loadConversation(conv)}
                            tabIndex={0}
                            role="button"
                            aria-pressed={selectedConversation === conv.id}
                            className={`cursor-pointer px-3 py-2 rounded-lg font-semibold transition
                                border border-transparent hover:bg-[#e8dbfc33] dark:hover:bg-[#23243b] font-plex
                                ${
                                  selectedConversation === conv.id
                                    ? 'border-[#db5afb] bg-[#efd9ffa6]'
                                    : ''
                                }
                                text-xs text-[#e5ccfa] dark:text-neutral-100`}
                            onKeyDown={e => {
                              if (
                                e.key === 'Enter' ||
                                e.key === ' '
                              ) {
                                e.preventDefault();
                                loadConversation(conv);
                              }
                            }}
                          >
                            {conv.title}
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center justify-between mb-3 z-20">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="rounded-full px-3 py-2 bg-[#ede7ff44] dark:bg-[#2d2951d9] border border-[#e7e5f7] dark:border-[#4b2991] text-[#db5afb] font-bold hover:bg-[#694ceb36] hover:text-[#5e8efd] text-md transition"
                title={showHistory ? 'Hide History' : 'Show History'}
                aria-pressed={showHistory}
                type="button"
              >
                {showHistory ? '📂' : '📁'}
              </button>
              <button
                onClick={handleLogout}
                className="ml-2 underline text-[#fa92f7] hover:text-[#51dbfa] text-sm font-bold"
                title="Logout"
                tabIndex={0}
                type="button"
              >
                Logout
              </button>
            </div>
            <div
              ref={chatBoxRef}
              className="flex-1 min-h-0 overflow-y-auto px-1 pb-1 pt-1 rounded-xl border border-[#e7d9fa] dark:border-[#31334e60] custom-scroll bg-[#181541f2] dark:bg-[#181926]"
              role="list"
              aria-live="polite"
              aria-label="Chat messages"
              tabIndex={-1}
            >
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.02, type: 'spring' }}
                  className="text-center text-[16px] mt-10 text-[#b6a1ff] dark:text-[#a1d4fa] select-none font-plex"
                >
                  Start a new conversation...
                </motion.div>
              ) : (
                messages.map((msg, i) => (
                  <MessageBubble msg={msg} key={i} i={i} />
                ))
              )}
            </div>
            <SectionDivider />
            <form
              className="flex flex-col sm:flex-row gap-2 mt-2 border border-[#decafe] dark:border-[#20264e] bg-[#1b1643] dark:bg-[#191c21] rounded-2xl px-3 py-3 ring-1 ring-[#6939eb10]"
              onSubmit={e => {
                e.preventDefault();
                handleGenerate();
              }}
              aria-label="Prompt input form"
            >
              <label htmlFor="persona-select" className="sr-only">
                Select chat persona
              </label>
              <select
                id="persona-select"
                value={persona}
                onChange={e => setPersona(e.target.value)}
                className="rounded-lg px-3 py-2 text-sm border border-[#f2cafe] dark:border-[#632fc9] bg-[#ede9fe44] dark:bg-[#22243a] text-[#db5afb] dark:text-[#5e8efd] font-semibold font-plex transition"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                <option value="friendly">🤗 Friendly</option>
                <option value="sarcastic">😏 Sarcastic</option>
                <option value="dev">💻 DevGPT</option>
                <option value="translator">🌐 Translator</option>
              </select>
              <label htmlFor="prompt-input" className="sr-only">
                Enter prompt
              </label>
              <input
                ref={promptInputRef}
                id="prompt-input"
                type="text"
                placeholder="Ask me anything..."
                maxLength={222}
                className="flex-grow px-4 py-2 rounded-xl text-base border border-[#d0bcff] dark:border-[#242e5e] bg-[#fff]/5 dark:bg-[#181926] focus:ring-2 focus:ring-[#db5afb] outline-none font-[JetBrains Mono] transition placeholder-[#aaa0ce] text-[#eec1fb]"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                autoComplete="off"
                aria-label="Prompt input"
                spellCheck={false}
                disabled={isPending}
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.11, boxShadow: '0 0 0 8px #694ceb2b' }}
                className="bg-gradient-to-tr from-[#db5afb] via-[#5e8efd] to-[#75e4b6] hover:brightness-110 text-white font-black text-lg px-8 py-2 rounded-xl active:scale-98 transition font-plex focus:outline-none focus:ring-2 focus:ring-[#db5afb] shadow-md"
                aria-label="Send prompt"
                disabled={isPending}
              >
                ➤
              </motion.button>
            </form>
          </section>
        )}

        <AnimatePresence>
          {error && <Toast message={error} onDismiss={() => setError('')} />}
        </AnimatePresence>
      </motion.main>
      <SectionDivider />

      {/* =============== TECH STACK GRID =============== */}
      <TechStackGrid />
      <SectionDivider />

      {/* =============== FEATURES GRID =============== */}
      <FeaturesSection />
      <SectionDivider />
      <Footer />

      {/* SVG BG global */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1500 900"
          fill="none"
          className="hidden md:block absolute top-0 left-0 opacity-14"
        >
          <defs>
            <radialGradient id="meshGlow3" cx="35%" cy="35%" r="65%">
              <stop stopColor="#7fb3fb" offset="0%" />
              <stop stopColor="#db5afb" offset="43%" />
              <stop stopColor="#75e4b6" offset="96%" />
            </radialGradient>
          </defs>
          <ellipse cx="800" cy="400" rx="600" ry="310" fill="url(#meshGlow3)" opacity="0.3" />
          <rect
            x="80"
            y="80"
            width="1340"
            height="740"
            rx="48"
            stroke="url(#meshGlow3)"
            strokeDasharray="12 18"
            strokeWidth="1.4"
            opacity="0.54"
          />
        </svg>
      </div>
      {/* Tailwind custom scrollbar and font helpers */}
      <style>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #db5afb #1c152a;
        }
        .custom-scroll::-webkit-scrollbar { width: 8px; background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #db5afb55; border-radius: 11px; }
        @media (prefers-color-scheme: dark) {
          .custom-scroll::-webkit-scrollbar-thumb { background: #c3fbdc55; }
        }
        .font-plex { font-family: 'Inter', 'Space Grotesk', 'JetBrains Mono', ui-sans-serif, system-ui, sans-serif; }
      `}</style>
    </div>
  );
}
