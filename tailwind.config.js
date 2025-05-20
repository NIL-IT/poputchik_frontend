/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px -4px 13.6px rgba(0, 0, 0, 0.1)",
        btnback: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          'overflow': 'auto',                 
          'scrollbar-width': 'none',          
          '-ms-overflow-style': 'none',       
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',                  
        },
      });
    },
  ],
};
