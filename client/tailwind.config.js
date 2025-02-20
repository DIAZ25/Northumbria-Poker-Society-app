module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",
  ],
  theme: {
    extend: {

      backgroundImage: () => ({
        'landing-background':
            'linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(https://techcrunch.com/wp-content/uploads/2019/07/GettyImages-136206865.jpg)',
    }),
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
