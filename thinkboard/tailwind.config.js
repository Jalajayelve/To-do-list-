import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        caramellatte: {
          primary: "#8b5e3c",
          secondary: "#b08968",
          accent: "#f1c27d",
          neutral: "#efe6dd",
          "base-100": "#fbf8f5",
          "base-200": "#f0e9e2",
          "base-300": "#e5d3c7",
          "base-content": "#2d1810",
          "--rounded-box": "1rem",
        },
      },
      {
        coffee: {
          primary: "#a16207",
          secondary: "#7c3aed",
          accent: "#f97316",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          "base-200": "#f9f9f9",
          "base-300": "#f0f0f0",
          "base-content": "#1f2937",
        },
      },
    ],
  },
};
