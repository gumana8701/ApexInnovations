import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F5F7FB",
          100: "#E5EAF3",
          200: "#C4CDE0",
          300: "#8E9CBC",
          400: "#5E6D93",
          500: "#2D3963",
          600: "#1E2849",
          700: "#131B36",
          800: "#0A1122",
          900: "#050A1A",
        },
        brand: {
          blue: "#2563EB",
          violet: "#7C3AED",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h1": ["48px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "h2": ["36px", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "h3": ["24px", { lineHeight: "1.3" }],
        "h4": ["20px", { lineHeight: "1.4" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        "overline": ["12px", { lineHeight: "1", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        pill: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(5, 10, 26, 0.3)",
        md: "0 4px 12px rgba(5, 10, 26, 0.35)",
        lg: "0 16px 40px rgba(5, 10, 26, 0.45)",
        glow: "0 0 60px rgba(124, 58, 237, 0.25)",
        "glow-blue": "0 0 60px rgba(37, 99, 235, 0.3)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
        "gradient-surface": "linear-gradient(180deg, #0A1122 0%, #050A1A 100%)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
