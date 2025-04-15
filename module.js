module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4F00",
        dark: "#121212",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FF4F00, 0 0 10px #FF4F00, 0 0 15px #FF4F00' },
          '100%': { boxShadow: '0 0 20px #FF4F00, 0 0 30px #FF4F00, 0 0 40px #FF4F00' },
        },
      },
    },
  },
  plugins: [],
}