// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                translok: {
                    primary: "#1AAA4A", // Hijau Utama & Jalur Aman
                    primaryDark: "#138037",
                    secondary: "#FFCB07", // Kuning Bus BRT / Highlight Transit
                    tertiary: "#1A72BA", // Biru Angkot
                    neutral: "#71796F", // Abu-abu Teks Sekunder / Border
                    surface: "#F4F6F4", // Background Card/Section sesuai referensi
                    danger: "#DC2626", // Merah Zona Dilarang Berhenti
                },
            },
            fontFamily: {
                headline: ['"Plus Jakarta Sans"', "sans-serif"],
                body: ['"Inter"', "sans-serif"],
            },
        },
    },
    plugins: [],
};