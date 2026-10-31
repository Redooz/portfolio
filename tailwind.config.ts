import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--base-rgb) / <alpha-value>)",
        mantle: "rgb(var(--mantle-rgb) / <alpha-value>)",
        crust: "rgb(var(--crust-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface0-rgb) / <alpha-value>)",
        raised: "rgb(var(--surface1-rgb) / <alpha-value>)",
        line: "rgb(var(--surface1-rgb) / <alpha-value>)",
        fg: "rgb(var(--text-rgb) / <alpha-value>)",
        muted: "rgb(var(--subtext0-rgb) / <alpha-value>)",
        faint: "rgb(var(--overlay1-rgb) / <alpha-value>)",
        blue: "rgb(var(--blue-rgb) / <alpha-value>)",
        mauve: "rgb(var(--mauve-rgb) / <alpha-value>)",
        green: "rgb(var(--green-rgb) / <alpha-value>)",
        yellow: "rgb(var(--yellow-rgb) / <alpha-value>)",
        red: "rgb(var(--red-rgb) / <alpha-value>)",
        teal: "rgb(var(--teal-rgb) / <alpha-value>)",
        lavender: "rgb(var(--lavender-rgb) / <alpha-value>)",
        peach: "rgb(var(--peach-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [
      typography,
  ],
} satisfies Config;
