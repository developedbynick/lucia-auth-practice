import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  extend: {
    colors: {
      black: "#4f4f4f",
    },

  },
  plugins: [],
} satisfies Config

export default config