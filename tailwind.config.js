const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors:{
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
