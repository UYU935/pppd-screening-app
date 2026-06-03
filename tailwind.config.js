/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // 高齢者でも見やすいよう基準サイズを大きめに
        base: ["1.125rem", { lineHeight: "1.8" }],
        lg: ["1.25rem", { lineHeight: "1.8" }],
        xl: ["1.5rem", { lineHeight: "1.7" }],
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
      },
    },
  },
  plugins: [],
};
