module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(46.28% 66.31% at 66.95% 58.35%, rgb(230, 230, 247) 0%, rgb(231, 237, 250) 50%, rgb(233, 251, 250) 100%)",
      },
      boxShadow: {
        "violet-shadow": "#D8D7FC 4px 4px 0px 0px",
        "orange-shadow": "#FFB483 4px 4px 0px 0px",
        // "no-shadow": "rgb(0 0 0 / 15%) 0px 8px 17px",
      },
      colors: {
        "dreamer-pink": "#ffbdf8",
        "dreamer-blue": "#90f6ff",
        "button-1": "#1C1CFF",
        "button-1-hover": "#3E48E7",
        "button-dark-1": "#FF7324",
        "button-dark-1-hover": "#FF8F4F",
        "default-black": "#333333",
        "background-default": "#CCFCFF",
        "gray-default": "#E4E7EC",
        "dark-mode-button-black": "#374152",
        "dark-mode-yellow-1": "#FFBB53",
        "dark-mode-yellow-2": "#FFECCF",
        "dark-mode-night-1": "#485367",
        "background-dark": "#293233",
      },
      scale: {
        102: "1.02",
      },
      transitionTimingFunction: {
        "darkMode-button": "cubic-bezier(.26,2,.46,.71)",
      },
    },
  },
};
