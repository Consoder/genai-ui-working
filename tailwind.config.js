// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.4rem", sm: "2.2rem", lg: "3.2rem", xl: "4rem" },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        jet: ['JetBrains Mono', 'monospace'],
        plex: ['IBM Plex Sans', 'sans-serif'],
      },
      fontWeight: {
        heavy: '900',
      },
      colors: {
        'glass-light': "rgba(255,255,255,0.13)",
        'glass-dark': "rgba(26,22,48,0.67)",
        'accent-blue': "#5e8efd",
        'accent-pink': "#db5afb",
        'accent-green': "#75e4b6",
        'accent-gold': "#fcb900",
        'accent-blue-light': '#9acdff',
        'accent-blue-dark': '#3964ba',
        'accent-pink-light': '#ec98ff',
        'accent-pink-dark': '#ac2ae4',
        'accent-gold-light': '#ffe17c',
        'accent-gold-dark': '#c6a100',
        'glass-xlight': 'rgba(255,255,255,0.22)',
        paper: "#f2f7fb",
        night: "#161824",
      },
      dropShadow: {
        glass: "0 4px 40px #db5afb44",
        hero: "0 8px 50px #51eefa60",
        subtle: "0 2px 15px #23224113",
      },
      backgroundImage: {
        'mesh-gradient': "radial-gradient(ellipse 60% 40% at 70% 40%, #5e8efd90, #db5afb55, #75e4b655 100%)",
        'glass': "linear-gradient(120deg,rgba(255,255,255,0.11),rgba(51,187,219,0.07) 80%)",
        'surface': "linear-gradient(120deg,#181929 85%,#3e2248 100%)",
        'frost': "linear-gradient(95deg,#d6eaff55 5%,#db5afb11 75%)",
      },
      borderRadius: {
        xl: '2rem',
        glass: '2.2rem',
        pill: '9999px',
      },
      animation: {
        fade: 'fadeIn 0.5s ease-out',
        fadeUp: 'fadeInUp 0.5s ease-out',
        slideIn: 'slideIn 0.6s ease-out',
        bounceOnce: 'bounceOnce 0.7s cubic-bezier(0.5,1.5,0.5,1)',
        pulseGlow: 'pulseGlow 1.4s infinite cubic-bezier(.66,.54,.23,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '52%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: "0 0 0 0 #db5afb77" },
          '50%': { boxShadow: "0 0 18px 12px #85e1f733" },
        },
      },
      boxShadow: {
        'glass-morph': "0 8px 48px 0 #fff6, 0 0px 1.5px #aefbf433",
        'feature': "0 8px 34px 0 #5e8efd44",
        'profile': "0 5px 30px 0 #db5afb33",
        'focus-blue': '0 0 0 2px #5e8efd99',
        'focus-gold': '0 0 0 2px #fcb90066',
        'none': "none",
      },
      borderWidth: {
        DEFAULT: '1px',
        '1.5': '1.5px',
        '3': '3px',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'spacing': 'margin, padding, gap',
        'shadow': 'box-shadow, filter, backdrop-filter',
      },
      spacing: {
        'section': '6.5rem',
        'stacky': '2.5rem',
      },
      scale: {
        '101': '1.01',
        '103': '1.03',
        '110': '1.10',
        '115': '1.15',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/line-clamp'),
  ],
}
