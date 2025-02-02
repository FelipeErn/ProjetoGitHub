/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        backgroundImage: {
          'custom-gradient': 'linear-gradient(89.89deg, #0056A6 -30.01%, #0587FF 125.65%)',
        },
      },
    },
    plugins: [],
  };
  