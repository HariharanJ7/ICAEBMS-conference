// module.exports = {
//   purge: [],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }

// export default {
//   content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
//   theme: { extend: {} },
//   plugins: [],
// };

// export default {
// theme: { extend: {} },
// plugins: []
// };

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--brand)',
        'primary-foreground': 'var(--on-brand)',
        brand: 'var(--brand)',
        'on-brand': 'var(--on-brand)'
      }
    }
  },
  plugins: []
};


// export default {
// content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
// theme: { extend: {} },
// plugins: []
// };


