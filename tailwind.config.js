/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            white: '#ffffff',
            'body-bg': '#ececec',
            'green-50': '#e0fabf',
            'green-100': '#c3e0a6',
            'green-200': '#adcc93',
            'green-300': '#96b880',
            'green-400': '#84a871',
            'green-500': '#739962',
            'green-600': '#628a53',
            'green-700': '#507a44',
            'green-800': '#396631',
            'green-900': '#23521e',
        },
        container: {
            center: true,
        },
        extend: {},
        fontFamily: {
            sans: ['Nunito', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
        },
    },
    plugins: [],
};
