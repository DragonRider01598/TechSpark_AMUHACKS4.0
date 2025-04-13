/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "text-blue-800",
    "bg-blue-100",
    "hover:bg-blue-200",
    "bg-yellow-100",
    "hover:bg-yellow-200",
    "hover:bg-green-200"
  ],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ["Pixelify Sans", "sans-serif"],
        ibmplex: ["IBM Plex Mono", "monospace"],

      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "rotate-slow": "rotate 10s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(20px)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
