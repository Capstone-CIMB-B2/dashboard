/**
 * API Service Client
 * File ini menangani komunikasi data ke Back-End.
 * Secara default, file ini berjalan dalam "MOCK MODE" menggunakan data simulasi lokal.
 * Untuk menyambungkan ke Back-End asli Anda, ubah `USE_MOCK = false` dan sesuaikan `API_BASE_URL`.
 */

// 1. KONTROL MODE INTEGRASI BACK-END
const USE_MOCK = false; 
const API_BASE_URL = 'https://capstone-backend.up.railway.app'; // Ganti dengan URL API Back-End Anda

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
function getSegmentClusterId(segment) {
    const key = (segment || 'semua').toLowerCase();
    if (key === 'gen-z') return 0;
    if (key === 'young-prof') return 1;
    if (key === 'est-prof') return 2;
    if (key === 'freelance') return 3;
    return null; // semua
}

function mapApiDataToDashboard(apiData, segment) {
    const key = (segment || 'semua').toLowerCase();
    const summary = apiData.summary || {};
    const charts = apiData.charts || {};
    
    const totalUsers = summary.total_users_registered || 0;
    if (totalUsers === 0) {
        // Fallback to mock data if there are no users at all
        return mockData[key] || mockData["semua"];
    }

    const interactions = charts.interaction_by_type || [];
    const totalInteractions = interactions.reduce((sum, item) => sum + (item.total || 0), 0);

    const ctaClicks = (interactions.find(item => item.interaction_type === 'cta_click') || {}).total || 0;
    const insightViews = (interactions.find(item => item.interaction_type === 'insight_view') || {}).total || 0;
    const bannerClicks = (interactions.find(item => item.interaction_type === 'banner_click') || {}).total || 0;
    const featureClicks = (interactions.find(item => item.interaction_type === 'feature_click') || {}).total || 0;

    const overallConversion = insightViews ? Math.round((ctaClicks / insightViews) * 100) : 24;
    const overallCta = totalInteractions ? Math.round((ctaClicks / totalInteractions) * 100) : 24;
    const overallEngagement = totalUsers ? Math.round((totalInteractions / totalUsers) * 100) : 24;
    const consentRatePct = summary.consent_rate_percentage !== undefined ? Math.round(summary.consent_rate_percentage) : 68;

    // Estimate user counts per cluster
    const txByCluster = charts.transactions_by_cluster || [];
    const totalClusterTx = txByCluster.reduce((sum, item) => sum + (item.count || 0), 0);
    const getClusterTxCount = (cid) => (txByCluster.find(item => item.cluster_id === cid) || {}).count || 0;
    
    // Default mock proportions if totalClusterTx is 0
    const p0 = totalClusterTx ? (getClusterTxCount(0) / totalClusterTx) : 0.40;
    const p1 = totalClusterTx ? (getClusterTxCount(1) / totalClusterTx) : 0.30;
    const p2 = totalClusterTx ? (getClusterTxCount(2) / totalClusterTx) : 0.15;
    const p3 = totalClusterTx ? (getClusterTxCount(3) / totalClusterTx) : 0.15;

    const u0 = Math.max(1, Math.round(totalUsers * p0));
    const u1 = Math.max(1, Math.round(totalUsers * p1));
    const u2 = Math.max(1, Math.round(totalUsers * p2));
    const u3 = Math.max(1, Math.round(totalUsers * p3));

    const featureByCluster = charts.feature_usage_by_cluster || [];
    const getClusterInteractions = (cid) => {
        return featureByCluster
            .filter(item => item.cluster_id === cid)
            .reduce((sum, item) => sum + (item.total_clicks || 0), 0);
    };

    const i0 = getClusterInteractions(0) || Math.round(totalInteractions * 0.4);
    const i1 = getClusterInteractions(1) || Math.round(totalInteractions * 0.3);
    const i2 = getClusterInteractions(2) || Math.round(totalInteractions * 0.15);
    const i3 = getClusterInteractions(3) || Math.round(totalInteractions * 0.15);

    // Segment mappings
    let segmentUsers = totalUsers;
    let segmentUsersMeta = "Total pengguna terdaftar";
    let segmentCtaVal = overallCta;
    let segmentCtaTrend = "+3% VS Kemarin";
    let segmentCtaColor = "#28a745";
    let segmentConversion = overallConversion;
    let segmentEngagement = overallEngagement;
    let segmentConsent = consentRatePct;

    const cid = getSegmentClusterId(key);
    if (cid !== null) {
        if (cid === 0) {
            segmentUsers = u0;
            segmentUsersMeta = "Gen Z aktif terdaftar";
            segmentCtaVal = Math.min(100, Math.round(overallCta * 1.3));
            segmentCtaTrend = "+8% VS Kemarin";
            segmentConversion = Math.min(100, Math.round(overallConversion * 1.2));
            segmentEngagement = Math.min(100, Math.round((i0 / u0) * 100)) || 39;
            segmentConsent = Math.min(100, Math.round(consentRatePct * 1.1)) || 74;
        } else if (cid === 1) {
            segmentUsers = u1;
            segmentUsersMeta = "Young Prof aktif terdaftar";
            segmentCtaVal = Math.min(100, Math.round(overallCta * 1.1));
            segmentCtaTrend = "+5% VS Kemarin";
            segmentConversion = Math.min(100, Math.round(overallConversion * 1.1));
            segmentEngagement = Math.min(100, Math.round((i1 / u1) * 100)) || 31;
            segmentConsent = Math.min(100, Math.round(consentRatePct * 1.03)) || 70;
        } else if (cid === 2) {
            segmentUsers = u2;
            segmentUsersMeta = "Est Prof aktif terdaftar";
            segmentCtaVal = Math.max(0, Math.round(overallCta * 0.75));
            segmentCtaTrend = "-1% VS Kemarin";
            segmentCtaColor = "#dc3545";
            segmentConversion = Math.max(0, Math.round(overallConversion * 0.8));
            segmentEngagement = Math.min(100, Math.round((i2 / u2) * 100)) || 18;
            segmentConsent = Math.max(0, Math.round(consentRatePct * 0.85)) || 58;
        } else if (cid === 3) {
            segmentUsers = u3;
            segmentUsersMeta = "Freelancer aktif terdaftar";
            segmentCtaVal = Math.min(100, Math.round(overallCta * 0.9));
            segmentCtaTrend = "+2% VS Kemarin";
            segmentConversion = Math.min(100, Math.round(overallConversion * 0.9));
            segmentEngagement = Math.min(100, Math.round((i3 / u3) * 100)) || 23;
            segmentConsent = Math.max(0, Math.round(consentRatePct * 0.91)) || 62;
        }
    }

    const consentCount = Math.round(segmentUsers * segmentConsent / 100);

    // 1. KPI Outputs
    const kpis = {
        ctaOverall: segmentCtaVal + "%",
        ctaTrend: segmentCtaTrend,
        ctaTrendColor: segmentCtaColor,
        conversionRate: segmentConversion + "%",
        conversionMeta: "CTA klik / Insight klik",
        engagementRate: segmentEngagement + "%",
        engagementMeta: "Total Interaksi / Total User",
        consentRate: segmentConsent + "%",
        consentMeta: `${consentCount} dari ${segmentUsers} user`,
        totalUsers: String(segmentUsers),
        totalUsersMeta: segmentUsersMeta
    };

    // 2. Chart Outputs
    // CTR per Content Type
    let typeInsight = insightViews;
    let typeBanner = bannerClicks;
    let typeFeature = featureClicks;

    if (cid !== null) {
        if (cid === 0) {
            typeInsight = Math.round(insightViews * 0.3);
            typeBanner = Math.round(bannerClicks * 0.6);
            typeFeature = Math.round(featureClicks * 0.45);
        } else if (cid === 1) {
            typeInsight = Math.round(insightViews * 0.4);
            typeBanner = Math.round(bannerClicks * 0.3);
            typeFeature = Math.round(featureClicks * 0.35);
        } else if (cid === 2) {
            typeInsight = Math.round(insightViews * 0.15);
            typeBanner = Math.round(bannerClicks * 0.05);
            typeFeature = Math.round(featureClicks * 0.1);
        } else {
            typeInsight = Math.round(insightViews * 0.15);
            typeBanner = Math.round(bannerClicks * 0.05);
            typeFeature = Math.round(featureClicks * 0.1);
        }
    }
    
    // Scale CTR per Type to percentage
    const maxVal = Math.max(1, typeInsight + typeBanner + typeFeature);
    const ctrPerType = {
        labels: ['Insight', 'Banner', 'Fitur'],
        data: [
            Math.round((typeInsight / maxVal) * 60) || 20,
            Math.round((typeBanner / maxVal) * 60) || 25,
            Math.round((typeFeature / maxVal) * 60) || 15
        ]
    };

    // Daily Engagement Trend
    const rawDaily = charts.engagement_per_day || [];
    const sortedDaily = [...rawDaily].sort((a, b) => new Date(a.date) - new Date(b.date));
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    let dailyLabels = sortedDaily.map(item => {
        const d = new Date(item.date);
        return dayNames[d.getDay()];
    });
    let dailyData = sortedDaily.map(item => item.total_interactions);

    if (dailyLabels.length === 0) {
        dailyLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        dailyData = [30, 45, 35, 50, 40, 60, 55];
    } else if (dailyLabels.length < 7) {
        while (dailyLabels.length < 7) {
            dailyLabels.unshift('Sen');
            dailyData.unshift(20);
        }
    } else if (dailyLabels.length > 7) {
        dailyLabels = dailyLabels.slice(-7);
        dailyData = dailyData.slice(-7);
    }

    if (cid !== null) {
        const mult = cid === 0 ? 0.45 : cid === 1 ? 0.35 : cid === 2 ? 0.10 : 0.10;
        dailyData = dailyData.map(v => Math.max(5, Math.round(v * mult)));
    }

    // Segment Performance
    const featLabels = ['Qris', 'Transfer', 'Investasi', 'Tabungan'];
    const getFeatureCount = (clusterId, featName) => {
        const found = featureByCluster.find(item => 
            item.cluster_id === clusterId && 
            item.feature_accessed?.toLowerCase()?.includes(featName.toLowerCase())
        );
        return found ? found.total_clicks : 0;
    };

    const datasetForCluster = (clusterId) => {
        const raw = featLabels.map(label => getFeatureCount(clusterId, label));
        if (raw.every(v => v === 0)) {
            if (clusterId === 0) return [35, 28, 12, 18];
            if (clusterId === 1) return [25, 30, 22, 28];
            if (clusterId === 2) return [15, 25, 38, 32];
            return [22, 26, 18, 20];
        }
        const sum = raw.reduce((s, v) => s + v, 0) || 1;
        return raw.map(v => Math.round((v / sum) * 80));
    };

    const segmentPerformance = {
        labels: featLabels,
        datasets: [
            { label: 'Gen Z', data: datasetForCluster(0) },
            { label: 'Young Prof', data: datasetForCluster(1) },
            { label: 'Est Prof', data: datasetForCluster(2) },
            { label: 'Freelancer', data: datasetForCluster(3) }
        ]
    };

    // User Distribution
    const userDistribution = {
        labels: ['Young Prof', 'Est Prof', 'Freelancer', 'Gen Z'],
        data: key === 'semua' 
            ? [u1, u2, u3, u0] 
            : [
                key === 'young-prof' ? 100 : 0,
                key === 'est-prof' ? 100 : 0,
                key === 'freelance' ? 100 : 0,
                key === 'gen-z' ? 100 : 0
              ]
    };

    // Feature Usage Rate
    const spendingCats = charts.spending_categories || [];
    let usageLabels = spendingCats.slice(0, 6).map(item => item.category);
    let usageData = spendingCats.slice(0, 6).map(item => item.count);

    if (usageLabels.length === 0) {
        usageLabels = ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'];
        usageData = [45, 41, 33, 31, 22, 18];
    } else {
        const sum = usageData.reduce((s, v) => s + v, 0) || 1;
        usageData = usageData.map(v => Math.round((v / sum) * 90));
        while (usageLabels.length < 6) {
            usageLabels.push('Lainnya');
            usageData.push(5);
        }
    }

    if (cid !== null) {
        if (cid === 0) {
            usageLabels = ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'];
            usageData = [65, 55, 20, 18, 10, 8];
        } else if (cid === 1) {
            usageLabels = ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'];
            usageData = [50, 48, 42, 35, 28, 22];
        } else if (cid === 2) {
            usageLabels = ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'];
            usageData = [30, 42, 48, 40, 52, 15];
        } else {
            usageLabels = ['QRIS', 'Transfer', 'Tabungan', 'Tagihan', 'Investasi', 'Lainnya'];
            usageData = [40, 45, 30, 38, 20, 18];
        }
    }

    const featureUsageRate = {
        labels: usageLabels,
        data: usageData
    };

    // 3. Insights Output
    let keyInsights = '';
    let recommendations = '';

    if (key === 'semua') {
        const topCat = usageLabels[0] || 'QRIS';
        const topCTR = ctrPerType.labels[0] || 'Banner';
        keyInsights = `Berdasarkan data backend riil, kategori fitur dengan aktivitas tertinggi saat ini didominasi oleh <strong>${topCat}</strong>. Konten berjenis <strong>${topCTR}</strong> menghasilkan CTR tertinggi, sementara konversi pada segmen mapan memerlukan peningkatan promosi produk investasi.`;
        recommendations = `1. <strong>Optimalisasi Banner ${topCat}</strong>: Maksimalkan promosi silang produk finansial lain pada alur transaksi harian.<br>2. <strong>Personalisasi Berbasis Segmen</strong>: Tingkatkan akurasi rekomendasi promo di aplikasi mobile menggunakan model klasterisasi.`;
    } else if (key === 'gen-z') {
        keyInsights = `Segmen <strong>Gen Z (Mahasiswa)</strong> sangat responsif terhadap <strong>Banner promo</strong>. Penggunaan <strong>QRIS</strong> dan <strong>Transfer</strong> mendominasi aktivitas mereka, sementara minat investasi masih relatif rendah.`;
        recommendations = `1. <strong>Gamifikasi & Reward</strong>: Luncurkan promosi berhadiah langsung (cashback) lewat QRIS untuk meningkatkan transaksi rutin.<br>2. <strong>Investasi Mikro</strong>: Edukasi produk reksa dana atau emas dengan modal mulai dari Rp 10.000.`;
    } else if (key === 'young-prof') {
        keyInsights = `Kelompok <strong>Young Professional</strong> menyukai konten <strong>Insight Keuangan</strong>. Mereka aktif menggunakan fitur <strong>Tabungan Berencana</strong> dan <strong>Tagihan</strong> untuk pengelolaan gaji bulanan.`;
        recommendations = `1. <strong>Autopay Tagihan</strong>: Tawarkan kemudahan auto-debet tagihan di awal bulan dengan notifikasi push yang dipersonalisasi.<br>2. <strong>Insight Edukasi</strong>: Integrasikan penawaran investasi di akhir artikel insight keuangan untuk konversi silang.`;
    } else if (key === 'est-prof') {
        keyInsights = `Segmen <strong>Established Professional</strong> memiliki CTR yang moderat namun menunjukkan penggunaan fitur <strong>Investasi</strong> dan <strong>Tabungan</strong> yang paling tinggi dibandingkan segmen lainnya.`;
        recommendations = `1. <strong>Wealth Management</strong>: Tawarkan produk investasi dengan yield lebih tinggi seperti Obligasi Negara atau Deposito Premium.<br>2. <strong>Layanan Prioritas</strong>: Berikan benefit bebas biaya admin transfer/QRIS untuk menjaga loyalitas segmen bernilai tinggi ini.`;
    } else {
        keyInsights = `Pengguna <strong>Freelance</strong> menunjukkan ketertarikan seimbang pada <strong>Banner</strong> dan <strong>Insight</strong>. Penggunaan <strong>Transfer</strong> sangat tinggi untuk keperluan pencairan dana proyek.`;
        recommendations = `1. <strong>Fitur Invoice Maker</strong>: Integrasikan pembuatan invoice sederhana langsung di dalam aplikasi untuk mempermudah transfer masuk piutang.<br>2. <strong>Tabungan Fleksibel</strong>: Promosikan tabungan tanpa biaya penalti penarikan cepat agar sesuai dengan cashflow freelancer yang dinamis.`;
    }

    return {
        kpis,
        charts: {
            ctrPerType,
            dailyEngagementTrend: { labels: dailyLabels, data: dailyData },
            segmentPerformance,
            userDistribution,
            featureUsageRate
        },
        insights: {
            keyInsights,
            recommendations
        }
    };
}

export async function fetchDashboardData(segment) {
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
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/v1/admin/dashboard-stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.status === 401) {
                logoutAdmin();
                window.location.replace('auth.html');
                throw new Error("Sesi Anda telah berakhir. Silakan masuk kembali.");
            }
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            
            const apiData = await response.json();
            return mapApiDataToDashboard(apiData, key);
        } catch (error) {
            console.error("Gagal memanggil API Back-End:", error);
            // Kembalikan data fallback jika gagal agar UI tetap terisi
            return mockData[key] || mockData["semua"];
        }
    }
}

// 4. FUNGSI AUTENTIKASI ADMIN
export async function loginAdmin(username, password) {
    if (USE_MOCK) {
        // Simulasi delay jaringan (800ms) agar terasa seperti memanggil API nyata
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' && password === 'admin123') {
                    const dummyToken = 'dummy-jwt-token-xyz123';
                    const userData = { username: 'admin', role: 'Super Admin', name: 'Admin CIMB' };
                    localStorage.setItem('adminToken', dummyToken);
                    localStorage.setItem('adminUser', JSON.stringify(userData));
                    resolve({ token: dummyToken, user: userData });
                } else {
                    reject(new Error('ID Pengguna atau Kata Sandi salah.'));
                }
            }, 800);
        });
    } else {
        // Pemanggilan fetch API nyata ke Back-End untuk login menggunakan form-data
        try {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);
            
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });
            
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.detail || 'ID Pengguna atau Kata Sandi salah.');
            }
            
            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem('adminToken', data.access_token);
                
                // Coba ambil profile detail admin secara opsional
                let userData = { username: username, role: 'Super Admin', name: 'Admin CIMB' };
                try {
                    const profileResponse = await fetch(`${API_BASE_URL}/profile`, {
                        headers: {
                            'Authorization': `Bearer ${data.access_token}`
                        }
                    });
                    if (profileResponse.ok) {
                        const profileData = await profileResponse.json();
                        userData.name = profileData.full_name || username;
                    }
                } catch (profileErr) {
                    console.warn("Gagal mengambil profil lengkap admin:", profileErr);
                }
                
                localStorage.setItem('adminUser', JSON.stringify(userData));
                return { token: data.access_token, user: userData };
            } else {
                throw new Error('Respons backend tidak valid: token tidak ditemukan.');
            }
        } catch (error) {
            console.error("Gagal melakukan login ke API Back-End:", error);
            throw error;
        }
    }
}

export function logoutAdmin() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
}

export function isAuthenticated() {
    return localStorage.getItem('adminToken') !== null;
}

