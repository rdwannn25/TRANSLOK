// src/data/translokData.js

export const OPERATIONAL_INFO = {
    appName: "TRANSLOK",
    region: "Cekungan Bandung Raya",
    operationalHours: "04.00 – 21.00 WIB", // FR-08
    headwayMinutes: "5 - 10 Menit",
    modes: {
        ANGKOT: {
            id: "ANGKOT",
            name: "Angkot Feeder",
            corridorName: "Trayek Cibeureum – St. Hall – Tegallega – Cicadas",
            tariff: 3000, // FR-09: Rp3.000 flat
            tariffLabel: "Rp 3.000 (Flat Jauh/Dekat)",
            colorHex: "#1A72BA",
            dropOffRule: "Bisa turun di halte resmi atau sepanjang jalur hijau (zona aman).",
        },
        BRT: {
            id: "BRT",
            name: "Bus BRT Bandung Raya",
            corridorName: "Koridor Utama Barat – Timur & Loop Selatan",
            tariff: 4900, // FR-09: Sesuai ketentuan resmi
            tariffLabel: "Rp 4.900 (Tarif Resmi Koridor)",
            colorHex: "#FFCB07",
            dropOffRule: "Wajib naik dan turun hanya pada Titik Halte Resmi BRT.",
        },
    },
};

// src/data/translokdata.js

// ... (kode yang sudah ada sebelumnya) ...

/**
 * Fungsi untuk menghasilkan jadwal dinamis berdasarkan waktu saat ini.
 * @param {number} baseInterval - Interval antar armada dalam menit (default 8)
 * @param {number} count - Jumlah jadwal yang ingin ditampilkan (default 2)
 */
export const getLiveSchedules = (baseInterval = 8, count = 2) => {
    const schedules = [];
    const now = new Date();

    // Memberikan jeda kedatangan armada pertama (2 hingga 6 menit dari waktu saat ini)
    // Menggunakan operasi modulus agar hasilnya konsisten di menit yang sama
    const offsetFirst = (now.getMinutes() % 5) + 2;

    for (let i = 0; i < count; i++) {
        // Kalkulasi: Waktu sekarang + offset pertama + (interval armada berikutnya)
        const nextTime = new Date(now.getTime() + ((offsetFirst + (i * baseInterval)) * 60000));

        // Format ke dalam HH:MM
        const hours = nextTime.getHours().toString().padStart(2, "0");
        const minutes = nextTime.getMinutes().toString().padStart(2, "0");
        schedules.push(`${hours}:${minutes}`);
    }

    return schedules;
};

// Daftar titik pemberhentian sesuai peta rute.jpg (FR-04, FR-05, FR-06)
export const STOPS_DATA = [
    // Jalur Barat -> Tengah (Atas)
    { id: "H01", name: "Batas Kota", corridor: "Barat", modes: ["ANGKOT", "BRT"], isTransit: true, category: "terminal", nextSchedule: ["06:00", "06:10", "06:20"], x: 50, y: 120 },
    { id: "H02", name: "RS Rajawali", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:04", "06:14", "06:24"], x: 110, y: 145 },
    { id: "H03", name: "YWKA", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:07", "06:17", "06:27"], x: 170, y: 170 },
    { id: "H04", name: "Rajawali Timur", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:10", "06:20", "06:30"], x: 240, y: 195 },
    { id: "H05", name: "Ciroyom", corridor: "Barat", modes: ["ANGKOT", "BRT"], isTransit: true, category: "transit", nextSchedule: ["06:15", "06:25", "06:35"], x: 310, y: 220 },
    { id: "H06", name: "Trinitas", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:18", "06:28", "06:38"], x: 400, y: 235 },
    { id: "H07", name: "Kebon Jati", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:21", "06:31", "06:41"], x: 470, y: 230 },
    { id: "H08", name: "Stasiun Hall", corridor: "Tengah", modes: ["ANGKOT", "BRT"], isTransit: true, category: "hub", nextSchedule: ["06:25", "06:35", "06:45"], x: 560, y: 220 },

    // Jalur Tengah -> Barat (Bawah / Arah Sebaliknya)
    { id: "H09", name: "Bundaran Cibeureum", corridor: "Barat", modes: ["ANGKOT", "BRT"], isTransit: true, category: "terminal", nextSchedule: ["06:05", "06:15", "06:25"], x: 140, y: 260 },
    { id: "H10", name: "Suryani", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:09", "06:19", "06:29"], x: 220, y: 275 },
    { id: "H11", name: "Jamika", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:13", "06:23", "06:33"], x: 290, y: 290 },
    { id: "H12", name: "Andir", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:17", "06:27", "06:37"], x: 380, y: 310 },
    { id: "H13", name: "GKI Anugerah", corridor: "Barat", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:20", "06:30", "06:40"], x: 465, y: 330 },
    { id: "H14", name: "Dulatip", corridor: "Tengah", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:23", "06:33", "06:43"], x: 535, y: 345 },

    // Area Pusat Kota & Loop Tegallega (Selatan)
    { id: "H15", name: "Pasar Baru", corridor: "Tengah", modes: ["ANGKOT", "BRT"], isTransit: true, category: "transit", nextSchedule: ["06:28", "06:38", "06:48"], x: 560, y: 270 },
    { id: "H16", name: "Banceuy Center", corridor: "Tengah", modes: ["ANGKOT"], isTransit: false, category: "stop", hasRedZoneAfter: true, nextSchedule: ["06:30", "06:40", "06:50"], x: 600, y: 215 },
    { id: "H17", name: "Alun-alun Bandung", corridor: "Tengah", modes: ["ANGKOT", "BRT"], isTransit: true, category: "hub", nextSchedule: ["06:32", "06:42", "06:52"], x: 560, y: 355 },
    { id: "H18", name: "Kepatihan", corridor: "Selatan", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:35", "06:45", "06:55"], x: 590, y: 400 },
    { id: "H19", name: "Dalem Kaum", corridor: "Selatan", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:37", "06:47", "06:57"], x: 555, y: 420 },
    { id: "H20", name: "Pasir Koja", corridor: "Selatan", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:41", "06:51", "07:01"], x: 550, y: 530 },
    { id: "H21", name: "Kebon Kalapa", corridor: "Selatan", modes: ["ANGKOT", "BRT"], isTransit: true, category: "transit", nextSchedule: ["06:44", "06:54", "07:04"], x: 595, y: 540 },
    { id: "H22", name: "Tegallega", corridor: "Selatan", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:48", "06:58", "07:08"], x: 545, y: 650 },
    { id: "H23", name: "Ciateul", corridor: "Selatan", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["06:51", "07:01", "07:11"], x: 590, y: 645 },
    { id: "H24", name: "Taman Tegallega", corridor: "Selatan", modes: ["ANGKOT", "BRT"], isTransit: true, category: "hub", nextSchedule: ["06:55", "07:05", "07:15"], x: 565, y: 710 },

    // Jalur Tengah -> Timur (Asia Afrika - Kosambi - Cicadas)
    { id: "H25", name: "Cikapundung", corridor: "Tengah", modes: ["ANGKOT"], isTransit: false, category: "stop", hasRedZoneBefore: true, nextSchedule: ["06:34", "06:44", "06:54"], x: 630, y: 315 },
    { id: "H26", name: "Asia Afrika", corridor: "Tengah", modes: ["ANGKOT", "BRT"], isTransit: true, category: "transit", nextSchedule: ["06:38", "06:48", "06:58"], x: 690, y: 370 },
    { id: "H27", name: "Naripan", corridor: "Tengah", modes: ["ANGKOT", "BRT"], isTransit: true, category: "transit", nextSchedule: ["06:41", "06:51", "07:01"], x: 740, y: 350 },
    { id: "H28", name: "Simpang Lima", corridor: "Tengah", modes: ["ANGKOT"], isTransit: false, category: "stop", hasRedZoneAfter: true, nextSchedule: ["06:44", "06:54", "07:04"], x: 745, y: 380 },
    { id: "H29", name: "Pasar Kosambi", corridor: "Timur", modes: ["ANGKOT", "BRT"], isTransit: true, category: "hub", nextSchedule: ["06:49", "06:59", "07:09"], x: 840, y: 310 },
    { id: "H30", name: "Stadion Sidolig", corridor: "Timur", modes: ["ANGKOT", "BRT"], isTransit: true, category: "transit", nextSchedule: ["06:54", "07:04", "07:14"], x: 930, y: 245 },
    { id: "H31", name: "IBCC", corridor: "Timur", modes: ["ANGKOT", "BRT"], isTransit: true, category: "transit", nextSchedule: ["06:58", "07:08", "07:18"], x: 985, y: 205 },
    { id: "H32", name: "Santa Maria", corridor: "Timur", modes: ["ANGKOT"], isTransit: false, category: "stop", hasRedZoneAfter: true, nextSchedule: ["07:02", "07:12", "07:22"], x: 1005, y: 190 },
    { id: "H33", name: "Kebon Waru", corridor: "Timur", modes: ["ANGKOT"], isTransit: false, category: "stop", nextSchedule: ["07:06", "07:16", "07:26"], x: 1090, y: 200 },
    { id: "H34", name: "Cicadas", corridor: "Timur", modes: ["ANGKOT", "BRT"], isTransit: true, category: "hub", nextSchedule: ["07:10", "07:20", "07:30"], x: 1135, y: 90 },
    { id: "H35", name: "BTM (Bandung Trade Mall)", corridor: "Timur", modes: ["ANGKOT", "BRT"], isTransit: true, category: "terminal", hasRedZoneAfter: true, nextSchedule: ["07:15", "07:25", "07:35"], x: 1145, y: 135 },
];

// Tambahkan di bagian bawah src/data/translokData.js

export const ROUTE_SEGMENTS = [
    // Koridor Barat Atas (Batas Kota -> Stasiun Hall) - Zona Hijau
    { id: "S01", from: "H01", to: "H02", status: "SAFE", label: "Jl. Rajawali Barat (Batas Kota - RS Rajawali)" },
    { id: "S02", from: "H02", to: "H03", status: "SAFE", label: "Jl. Rajawali Barat (RS Rajawali - YWKA)" },
    { id: "S03", from: "H03", to: "H04", status: "SAFE", label: "Jl. Rajawali Timur" },
    { id: "S04", from: "H04", to: "H05", status: "SAFE", label: "Jl. Ciroyom" },
    { id: "S05", from: "H05", to: "H06", status: "SAFE", label: "Jl. Kebon Jati (Ciroyom - Trinitas)" },
    { id: "S06", from: "H06", to: "H07", status: "SAFE", label: "Jl. Kebon Jati (Trinitas - Kebon Jati)" },
    { id: "S07", from: "H07", to: "H08", status: "SAFE", label: "Jl. Kebon Jati menuju Stasiun Hall" },

    // Koridor Barat Bawah (Batas Kota -> Bundaran Cibeureum -> Alun-alun) - Zona Hijau
    { id: "S08", from: "H01", to: "H09", status: "SAFE", label: "Jl. Raya Cibeureum" },
    { id: "S09", from: "H09", to: "H10", status: "SAFE", label: "Jl. Jenderal Sudirman (Cibeureum - Suryani)" },
    { id: "S10", from: "H10", to: "H11", status: "SAFE", label: "Jl. Jenderal Sudirman (Suryani - Jamika)" },
    { id: "S11", from: "H11", to: "H12", status: "SAFE", label: "Jl. Jenderal Sudirman (Jamika - Andir)" },
    { id: "S12", from: "H12", to: "H13", status: "SAFE", label: "Jl. Jenderal Sudirman (Andir - GKI Anugerah)" },
    { id: "S13", from: "H13", to: "H14", status: "SAFE", label: "Jl. Jenderal Sudirman (GKI - Dulatip)" },
    { id: "S14", from: "H14", to: "H17", status: "SAFE", label: "Jl. Jenderal Sudirman menuju Alun-alun" },

    // Konektor Pusat Kota (Stasiun Hall - Pasar Baru - Alun-alun - Banceuy)
    { id: "S15", from: "H08", to: "H15", status: "SAFE", label: "Jl. Otto Iskandardinata (St. Hall - Pasar Baru)" },
    { id: "S16", from: "H15", to: "H17", status: "SAFE", label: "Jl. Otto Iskandardinata (Pasar Baru - Alun-alun)" },
    { id: "S17", from: "H08", to: "H16", status: "RESTRICTED", label: "Simpang Stasiun Timur - Banceuy (Dilarang Berhenti)" },
    { id: "S18", from: "H16", to: "H25", status: "RESTRICTED", label: "Jl. Banceuy - ABC - Cikapundung (Zona Merah Padat)" },

    // Loop Selatan (Alun-alun - Tegallega)
    { id: "S19", from: "H17", to: "H19", status: "SAFE", label: "Jl. Dalem Kaum" },
    { id: "S20", from: "H19", to: "H20", status: "SAFE", label: "Jl. Otto Iskandardinata (Dalem Kaum - Pasir Koja)" },
    { id: "S21", from: "H20", to: "H22", status: "SAFE", label: "Jl. Otto Iskandardinata (Pasir Koja - Tegallega)" },
    { id: "S22", from: "H22", to: "H24", status: "SAFE", label: "Lingkar Selatan Taman Tegallega" },
    { id: "S23", from: "H24", to: "H23", status: "SAFE", label: "Jl. Moh. Toha / Ciateul" },
    { id: "S24", from: "H23", to: "H21", status: "SAFE", label: "Jl. Dewi Sartika (Ciateul - Kebon Kalapa)" },
    { id: "S25", from: "H21", to: "H18", status: "SAFE", label: "Jl. Dewi Sartika - Kepatihan" },
    { id: "S26", from: "H18", to: "H17", status: "SAFE", label: "Jl. Kepatihan menuju Alun-alun" },
    { id: "S27", from: "H20", to: "H21", status: "RESTRICTED", label: "Simpang Potongan Pasir Koja - Kebon Kalapa (Zona Merah)" },

    // Koridor Tengah ke Timur (Alun-alun / Cikapundung -> Asia Afrika -> Kosambi -> Cicadas)
    { id: "S28", from: "H17", to: "H26", status: "SAFE", label: "Jl. Asia Afrika (Alun-alun - Gedung Merdeka)" },
    { id: "S29", from: "H25", to: "H26", status: "SAFE", label: "Jl. Cikapundung Barat menuju Asia Afrika" },
    { id: "S30", from: "H26", to: "H28", status: "SAFE", label: "Jl. Asia Afrika menuju Simpang Lima" },
    { id: "S31", from: "H27", to: "H28", status: "RESTRICTED", label: "Simpang Jl. Naripan - Simpang Lima (Zona Merah)" },
    { id: "S32", from: "H28", to: "H29", status: "RESTRICTED", label: "Simpang Lima - Awal Jl. Ahmad Yani (Zona Merah)" },
    { id: "S33", from: "H27", to: "H29", status: "SAFE", label: "Jl. Ahmad Yani (Naripan - Pasar Kosambi)" },
    { id: "S34", from: "H29", to: "H30", status: "SAFE", label: "Jl. Ahmad Yani (Kosambi - Stadion Sidolig)" },
    { id: "S35", from: "H30", to: "H31", status: "SAFE", label: "Jl. Ahmad Yani (Sidolig - IBCC)" },
    { id: "S36", from: "H31", to: "H32", status: "SAFE", label: "Jl. Ahmad Yani menuju Santa Maria" },
    { id: "S37", from: "H32", to: "H34", status: "SAFE", label: "Jl. Ahmad Yani menuju Cicadas" },
    { id: "S38", from: "H32", to: "H33", status: "RESTRICTED", label: "Simpang Santa Maria - Jl. Kebon Waru (Zona Merah)" },
    { id: "S39", from: "H33", to: "H35", status: "SAFE", label: "Jl. Kebon Waru menuju BTM Cicadas" },
    { id: "S40", from: "H34", to: "H35", status: "RESTRICTED", label: "Simpang Padat Cicadas - BTM (Zona Merah Dilarang Berhenti)" },
];