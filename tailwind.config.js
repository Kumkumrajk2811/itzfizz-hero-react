/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { ink: "#0B1020", lime: "#C8FF3D", coral: "#FF6B4A", paper: "#FFF3DC" },
      fontFamily: { display: ["Syne", "sans-serif"], body: ["Inter", "sans-serif"], hand: ["Caveat", "cursive"] },
    },
  },
  plugins: [],
};
