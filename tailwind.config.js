const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          space: "#1E1E50",
          night: "#28285A",
          blue: "#5050FF",
          lightblue: "#B1B1FF",
          pink: "#FF0066",
          lightpink: "#FF6699",
          lime: "#99FF00",
          lightlime: "#B6FF61",
          inchworm: "#B6FF61",
          white: "#F5F5FF",
        },
      },
      fontFamily: {
        sans: ["Fredoka", ...defaultTheme.fontFamily.sans],
        mono: ["Audiowide", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
