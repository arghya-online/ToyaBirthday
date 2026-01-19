/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'blush-pink': '#FFD1DC', // Soft pink background
                'deep-maroon': '#800020', // Text color
                'rose-accent': '#D25C65', // Accent color
                'soft-white': '#FFF5F7', // Sections/Cards
            },
            fontFamily: {
                'serif': ['"Playfair Display"', 'serif'],
                'sans': ['Poppins', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 1.5s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
