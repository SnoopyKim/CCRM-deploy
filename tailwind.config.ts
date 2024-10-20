import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["w-[100px]", "w-[200px]"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "system-ui"],
      },
      backgroundImage: {
        "service-center": "url('/images/service-center.png')",
      },
      boxShadow: {
        "inner-1": "inset 0 0 0 1px #1E1E1E",
        "inner-2": "inset 0 0 0 2px #1E1E1E",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        conveyor: "scroll 20s linear infinite",
      },
    },
    colors: {
      main: {
        1: "#1E1E1E",
        2: "#1D203E",
        3: "#192D50",
        4: "#284B69",
        5: "#35576C",
      },
      sub: {
        1: "#FF6535",
        2: "#3586FF",
        3: "#652CD2",
        4: "#EA4652",
        5: "#29A084",
        6: "#FFD8CC",
        7: "#FF6535",
      },
      grayscale: {
        1: "#1E1E1E",
        2: "#222222",
        3: "#333333",
        4: "#444444",
        5: "#555555",
        6: "#666666",
        7: "#777777",
        8: "#999999",
        9: "#AAAAAA",
        10: "#BBBBBB",
        11: "#DDDDDD",
        12: "#EEEEEE",
        13: "#F4F4F4",
        14: "#FFFFFF",
      },
      transparent: "transparent",
    },
  },
  plugins: [],
};
export default config;
