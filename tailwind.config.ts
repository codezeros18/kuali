import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kuali: {
          primary: "#E8541A",
          "primary-light": "#F97316",
          background: "#FAFAF8",
          surface: "#FFFFFF",
          "surface-alt": "#F4F4F2",
          border: "#E5E5E3",
          "text-dark": "#1A1A1A",
          "text-mid": "#6B6B6B",
          "text-light": "#ADADAD",
        },
        status: {
          confirmed: "#16A34A",
          "confirmed-bg": "#F0FDF4",
          draft: "#D97706",
          "draft-bg": "#FFFBEB",
          check: "#DC2626",
          "check-bg": "#FEF2F2",
          paid: "#059669",
          "paid-bg": "#ECFDF5",
          unpaid: "#B45309",
          "unpaid-bg": "#FEF3C7",
          cancelled: "#9CA3AF",
          roadmap: "#7C3AED",
          "roadmap-bg": "#F5F3FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.1)",
        modal: "0 20px 60px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        badge: "99px",
      },
    },
  },
  plugins: [],
};

export default config;
