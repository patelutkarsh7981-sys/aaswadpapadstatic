import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f8f0dc",
        leaf: "#2f6f3e",
        olive: "#70742a",
        saffron: "#d8a23a",
        cacao: "#382f22"
      },
      boxShadow: {
        soft: "0 22px 70px rgba(56, 47, 34, 0.14)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
