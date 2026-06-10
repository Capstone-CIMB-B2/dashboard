/**
 * API Service Client
 * File ini menangani komunikasi data ke Back-End.
 * Secara default, file ini berjalan dalam "MOCK MODE" menggunakan data simulasi lokal.
 * Untuk menyambungkan ke Back-End asli Anda, ubah `USE_MOCK = false` dan sesuaikan `API_BASE_URL`.
 */

// 1. KONTROL MODE INTEGRASI BACK-END
const USE_MOCK = true; 
const API_BASE_URL = 'http://localhost:5000/api'; // Ganti dengan URL API Back-End Anda

// 2. DATA MOCK UNTUK SIMULASI DASHBOARD DARI BACK-END
const mockData = {
    "semua": {
        kpis: {
            ctaOverall: "24%",
            ctaTrend: "+3% VS Kemarin",
            ctaTrendColor: "#28a745",
            conversionRate: "24%",
            conversionMeta: "CTA klik / Insight klik",
            engagementRate: "24%",
            engagementMeta: "Total Interaksi / Total User",
            consentRate: "68%",
            consentMeta: "68 dari 100 user aktif",
            totalUsers: "100",
            totalUsersMeta: "Sintetis aktif hari ini"
        },
        charts: {
            ctrPerType: {
                labels: ['Insight', 'Banner', 'Fitur'],
                data: [22, 26, 18]
            },
            dailyEngagementTrend: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                data: [30, 45, 35, 50, 40, 60, 55]
            },
            segmentPerformance: {
                labels: ['Qris', 'Transfer', 'Investasi', 'Tabungan'],
                datasets: [
                    { label: 'Gen Z', data: [19, 19, 19, 19] },
                    { label: 'Young Prof', data: [19, 19, 19, 19] },
                    { label: 'Est Prof', data: [19, 19, 19, 19] },
                    { label: 'Freelancer', data: [19, 19, 19, 19] }
                ]
            },
            userDistribution: {
                labels: ['Young Prof', 'Est Prof', 'Freelancer', 'Gen Z'],
                data: [35, 25, 20, 20]
            },
            featureUsageRate: {
                labels: ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'],
                data: [45, 41, 33, 31, 22, 18]
            }
        },
        insights: {
            keyInsights: `Konten berjenis <strong>Banner (26%)</strong> dan <strong>Insight (22%)</strong> menghasilkan CTR tertinggi. Namun, konversi ke penggunaan fitur riil seperti <strong>Investasi dan Tagihan</strong> masih berada di posisi terendah (&lt;30%), berbanding terbalik dengan utilitas harian seperti QRIS dan Transfer yang melesat tinggi.`,
            recommendations: `1. <strong>Cross-Selling via Banner:</strong> Manfaatkan tingginya CTR Banner untuk mempromosikan fitur Investasi dan Tabungan langsung ke segmen <em>Young Professional</em>.<br>2. <strong>Incentivized Engagement:</strong> Buat program loyalitas pada fitur Tagihan guna mendongkrak <em>feature usage rate</em> yang saat ini stagnan di angka 33%.`
        }
    },
    "gen-z": {
        kpis: {
            ctaOverall: "32%",
            ctaTrend: "+8% VS Kemarin",
            ctaTrendColor: "#28a745",
            conversionRate: "28%",
            conversionMeta: "CTA klik / Insight klik",
            engagementRate: "39%",
            engagementMeta: "Total Interaksi / Total User",
            consentRate: "74%",
            consentMeta: "74 dari 100 user aktif",
            totalUsers: "45",
            totalUsersMeta: "Gen Z aktif hari ini"
        },
        charts: {
            ctrPerType: {
                labels: ['Insight', 'Banner', 'Fitur'],
                data: [15, 34, 25]
            },
            dailyEngagementTrend: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                data: [40, 50, 42, 65, 55, 75, 70]
            },
            segmentPerformance: {
                labels: ['Qris', 'Transfer', 'Investasi', 'Tabungan'],
                datasets: [
                    { label: 'Gen Z', data: [35, 28, 12, 18] },
                    { label: 'Young Prof', data: [0, 0, 0, 0] },
                    { label: 'Est Prof', data: [0, 0, 0, 0] },
                    { label: 'Freelancer', data: [0, 0, 0, 0] }
                ]
            },
            userDistribution: {
                labels: ['Young Prof', 'Est Prof', 'Freelancer', 'Gen Z'],
                data: [0, 0, 0, 100]
            },
            featureUsageRate: {
                labels: ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'],
                data: [65, 55, 20, 18, 10, 8]
            }
        },
        insights: {
            keyInsights: `Segmen <strong>Gen Z</strong> sangat responsif terhadap <strong>Banner promo (34%)</strong>. Penggunaan <strong>QRIS (65%)</strong> dan <strong>Transfer (55%)</strong> mendominasi aktivitas mereka, sementara minat investasi masih relatif rendah (10%).`,
            recommendations: `1. <strong>Gamifikasi & Reward:</strong> Luncurkan promosi berhadiah langsung (cashback) lewat QRIS untuk meningkatkan transaksi rutin.<br>2. <strong>Investasi Mikro:</strong> Edukasi produk reksa dana atau emas dengan modal mulai dari Rp 10.000.`
        }
    },
    "young-prof": {
        kpis: {
            ctaOverall: "28%",
            ctaTrend: "+5% VS Kemarin",
            ctaTrendColor: "#28a745",
            conversionRate: "26%",
            conversionMeta: "CTA klik / Insight klik",
            engagementRate: "31%",
            engagementMeta: "Total Interaksi / Total User",
            consentRate: "70%",
            consentMeta: "70 dari 100 user aktif",
            totalUsers: "35",
            totalUsersMeta: "Young Prof aktif hari ini"
        },
        charts: {
            ctrPerType: {
                labels: ['Insight', 'Banner', 'Fitur'],
                data: [28, 25, 20]
            },
            dailyEngagementTrend: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                data: [35, 48, 38, 55, 45, 62, 58]
            },
            segmentPerformance: {
                labels: ['Qris', 'Transfer', 'Investasi', 'Tabungan'],
                datasets: [
                    { label: 'Gen Z', data: [0, 0, 0, 0] },
                    { label: 'Young Prof', data: [25, 30, 22, 28] },
                    { label: 'Est Prof', data: [0, 0, 0, 0] },
                    { label: 'Freelancer', data: [0, 0, 0, 0] }
                ]
            },
            userDistribution: {
                labels: ['Young Prof', 'Est Prof', 'Freelancer', 'Gen Z'],
                data: [100, 0, 0, 0]
            },
            featureUsageRate: {
                labels: ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'],
                data: [50, 48, 42, 35, 28, 22]
            }
        },
        insights: {
            keyInsights: `Kelompok <strong>Young Professional</strong> menyukai konten <strong>Insight Keuangan (28%)</strong>. Mereka aktif menggunakan fitur <strong>Tabungan Berencana (42%)</strong> dan <strong>Tagihan (35%)</strong> untuk pengelolaan gaji bulanan.`,
            recommendations: `1. <strong>Autopay Tagihan:</strong> Tawarkan kemudahan auto-debet tagihan di awal bulan dengan notifikasi push yang dipersonalisasi.<br>2. <strong>Insight Edukasi:</strong> Integrasikan penawaran investasi di akhir artikel insight keuangan untuk konversi silang.`
        }
    },
    "est-prof": {
        kpis: {
            ctaOverall: "18%",
            ctaTrend: "-1% VS Kemarin",
            ctaTrendColor: "#dc3545",
            conversionRate: "19%",
            conversionMeta: "CTA klik / Insight klik",
            engagementRate: "18%",
            engagementMeta: "Total Interaksi / Total User",
            consentRate: "58%",
            consentMeta: "58 dari 100 user aktif",
            totalUsers: "15",
            totalUsersMeta: "Est Prof aktif hari ini"
        },
        charts: {
            ctrPerType: {
                labels: ['Insight', 'Banner', 'Fitur'],
                data: [18, 15, 12]
            },
            dailyEngagementTrend: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                data: [25, 30, 28, 35, 32, 40, 38]
            },
            segmentPerformance: {
                labels: ['Qris', 'Transfer', 'Investasi', 'Tabungan'],
                datasets: [
                    { label: 'Gen Z', data: [0, 0, 0, 0] },
                    { label: 'Young Prof', data: [0, 0, 0, 0] },
                    { label: 'Est Prof', data: [15, 25, 38, 32] },
                    { label: 'Freelancer', data: [0, 0, 0, 0] }
                ]
            },
            userDistribution: {
                labels: ['Young Prof', 'Est Prof', 'Freelancer', 'Gen Z'],
                data: [0, 100, 0, 0]
            },
            featureUsageRate: {
                labels: ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'],
                data: [30, 42, 48, 40, 52, 15]
            }
        },
        insights: {
            keyInsights: `Segmen <strong>Established Professional</strong> memiliki CTR yang moderat namun menunjukkan penggunaan fitur <strong>Investasi (52%)</strong> dan <strong>Tabungan (48%)</strong> yang paling tinggi dibandingkan segmen lainnya.`,
            recommendations: `1. <strong>Wealth Management:</strong> Tawarkan produk investasi dengan yield lebih tinggi seperti Obligasi Negara atau Deposito Premium.<br>2. **Layanan Prioritas:** Berikan benefit bebas biaya admin transfer/QRIS untuk menjaga loyalitas segmen bernilai tinggi ini.`
        }
    },
    "freelance": {
        kpis: {
            ctaOverall: "22%",
            ctaTrend: "+2% VS Kemarin",
            ctaTrendColor: "#28a745",
            conversionRate: "21%",
            conversionMeta: "CTA klik / Insight klik",
            engagementRate: "23%",
            engagementMeta: "Total Interaksi / Total User",
            consentRate: "62%",
            consentMeta: "62 dari 100 user aktif",
            totalUsers: "20",
            totalUsersMeta: "Freelance aktif hari ini"
        },
        charts: {
            ctrPerType: {
                labels: ['Insight', 'Banner', 'Fitur'],
                data: [20, 22, 15]
            },
            dailyEngagementTrend: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                data: [28, 35, 30, 45, 38, 50, 48]
            },
            segmentPerformance: {
                labels: ['Qris', 'Transfer', 'Investasi', 'Tabungan'],
                datasets: [
                    { label: 'Gen Z', data: [0, 0, 0, 0] },
                    { label: 'Young Prof', data: [0, 0, 0, 0] },
                    { label: 'Est Prof', data: [0, 0, 0, 0] },
                    { label: 'Freelancer', data: [22, 26, 18, 20] }
                ]
            },
            userDistribution: {
                labels: ['Young Prof', 'Est Prof', 'Freelancer', 'Gen Z'],
                data: [0, 0, 100, 0]
            },
            featureUsageRate: {
                labels: ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'],
                data: [40, 45, 30, 38, 20, 18]
            }
        },
        insights: {
            keyInsights: `Pengguna <strong>Freelance</strong> menunjukkan ketertarikan seimbang pada <strong>Banner (22%)</strong> dan <strong>Insight (20%)</strong>. Penggunaan <strong>Transfer (45%)</strong> sangat tinggi untuk keperluan pencairan dana proyek.`,
            recommendations: `1. <strong>Fitur Invoice Maker:</strong> Integrasikan pembuatan invoice sederhana langsung di dalam aplikasi untuk mempermudah transfer masuk piutang.<br>2. <strong>Tabungan Fleksibel:</strong> Promosikan tabungan tanpa biaya penalti penarikan cepat agar sesuai dengan cashflow freelancer yang dinamis.`
        }
    }
};

// 3. FUNGSI UNTUK MENGAMBIL DATA DARI API ATAU MOCK DATA
export async function fetchDashboardData(segment) {
    // Normalisasi parameter segment ke lowercase
    const key = (segment || 'semua').toLowerCase();
    
    if (USE_MOCK) {
        // Simulasi delay jaringan (300ms) agar terasa seperti memanggil API nyata
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockData[key] || mockData["semua"]);
            }, 300);
        });
    } else {
        // Pemanggilan fetch API nyata ke Back-End
        try {
            const response = await fetch(`${API_BASE_URL}/dashboard?segment=${key}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Gagal memanggil API Back-End:", error);
            // Kembalikan data fallback atau lempar kembali error agar bisa dihandle di UI
            throw error;
        }
    }
}
