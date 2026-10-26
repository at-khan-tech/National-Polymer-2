import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          darker: "var(--color-primary-darker)",
          lighter: "var(--color-primary-lighter)",
          soft: "var(--color-primary-soft)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        gold: {
          DEFAULT: "var(--color-primary)",
          footer: "var(--color-primary)",
          logo: "var(--color-accent)",
          light: "var(--color-primary-soft)",
        },
        navy: {
          DEFAULT: "var(--color-navy)",
          dark: "var(--color-navy-dark)",
        },
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      aspectRatio: {
        headshot: "600/949",
      },
    },
  },
  plugins: [],
} satisfies Config;
