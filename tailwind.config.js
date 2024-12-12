/** @type {import('tailwindcss').Config} after the tailwind instulation we Configure your template paths
Add the paths to all of your template files in your tailwind.config.js file.

  */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
  ],
  theme: {
    extend: {},
  },
  plugins: [    require('tailwind-scrollbar-hide'),
  ],
}

