const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [heroui(
        {
            themes: {
                dark: {
                    colors: {
                        background: '#141414'
                    }
                },
                light: {
                    colors: {
                        background: '#f3f3f3'
                    }
                }
            }
        }
    )],
};

