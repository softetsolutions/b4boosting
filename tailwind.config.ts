const config = {
  darkMode: "class", // important for next-themes
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   extend: {
      height: {
        50: "12.5rem", // 200px
        70: "17.5rem", // 280px
      },
    },
  },
  plugins: [],
};
export default config;
