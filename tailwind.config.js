/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#ff8c42',
        'brand-orange-dark': '#e67e31',
        'brand-gray-light': '#f5f5f5',
        'brand-gray': '#d1d5db',
        'brand-gray-text': '#6b7280',
        'brand-text': '#1f2937',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
      },
      spacing: {
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
    },
  },
  plugins: [],
};
