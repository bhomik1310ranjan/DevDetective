/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'lightGrayishBlue': '#f7f8fc',
        'darkBlue': '#1b1d1e',
        'eerieBlack': '#181a1b',
        'violetBlue': '#6674cc',
        'patrickBlue': '#29347a',
        'blackWithLessOpacity': '#000000bb',
        'whiteWithLessOpacity': '#ffffffbb',
        'keppel': '#31b4a3',
        'paleRobinEggBlue': '#9cdbd3',
        'blueGreen': '#0f4f48',
        'pumpkin': '#f97115',
        'deepPeach': '#fdc8a4',
        'sepia': '#703c19',
        'electricUltramarine': '#3713fd',
        'maximumBluePurple': '#b1a3fe',
        'persianIndigo': '#241773',
        'dodgerBlue': '#1a9efd',
        'freshAir': '#a6d9fe',
        'darkCerulean': '#194d73'
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      screens: {
        'xsm': '340px',
      },
      spacing: {
        '1.25': '0.3125rem',
        '1.75': '0.4375rem',
      }
    },
  },
  plugins: [],
}

