/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.jsx", "./src/*.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
