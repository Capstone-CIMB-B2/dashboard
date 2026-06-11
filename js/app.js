/**
 * Application Controller
 * File ini mengatur alur jalannya aplikasi dashboard BI,
 * mengikat event listener, mengambil data, dan memperbarui DOM.
 */

import { fetchDashboardData, logoutAdmin } from './api.js';
import { initCharts, updateCharts } from './charts.js';

// Objek DOM cache untuk performa penulisan yang cepat
const dom = {
    // Buttons
    pills: null,
    
    // KPIs
    kpiCtaValue: null,
    kpiCtaMeta: null,
    kpiConversionValue: null,
    kpiConversionMeta: null,
    kpiEngagementValue: null,
    kpiEngagementMeta: null,
    kpiConsentValue: null,
    kpiConsentMeta: null,
    kpiUsersValue: null,
    kpiUsersMeta: null,

    // Insights
    insightKeyText: null,
    insightRecText: null
};

// Inisialisasi element selector
function cacheDOM() {
    dom.pills = document.querySelectorAll('.pill-item');
    
    dom.kpiCtaValue = document.getElementById('kpi-cta-value');
    dom.kpiCtaMeta = document.getElementById('kpi-cta-meta');
    
    dom.kpiConversionValue = document.getElementById('kpi-conversion-value');
    dom.kpiConversionMeta = document.getElementById('kpi-conversion-meta');
    
    dom.kpiEngagementValue = document.getElementById('kpi-engagement-value');
    dom.kpiEngagementMeta = document.getElementById('kpi-engagement-meta');
    
    dom.kpiConsentValue = document.getElementById('kpi-consent-value');
    dom.kpiConsentMeta = document.getElementById('kpi-consent-meta');
    
    dom.kpiUsersValue = document.getElementById('kpi-users-value');
    dom.kpiUsersMeta = document.getElementById('kpi-users-meta');
    
    dom.insightKeyText = document.getElementById('insight-key-text');
    dom.insightRecText = document.getElementById('insight-rec-text');
}

/**
 * Memperbarui nilai-nilai KPI pada halaman
 * @param {Object} kpiData data KPI baru
 */
function updateKPIs(kpiData) {
    if (!kpiData) return;

    if (dom.kpiCtaValue) dom.kpiCtaValue.textContent = kpiData.ctaOverall;
    if (dom.kpiCtaMeta) {
        dom.kpiCtaMeta.textContent = kpiData.ctaTrend;
        dom.kpiCtaMeta.style.color = kpiData.ctaTrendColor || '#28a745';
    }

    if (dom.kpiConversionValue) dom.kpiConversionValue.textContent = kpiData.conversionRate;
    if (dom.kpiConversionMeta) dom.kpiConversionMeta.textContent = kpiData.conversionMeta;

    if (dom.kpiEngagementValue) dom.kpiEngagementValue.textContent = kpiData.engagementRate;
    if (dom.kpiEngagementMeta) dom.kpiEngagementMeta.textContent = kpiData.engagementMeta;

    if (dom.kpiConsentValue) dom.kpiConsentValue.textContent = kpiData.consentRate;
    if (dom.kpiConsentMeta) dom.kpiConsentMeta.textContent = kpiData.consentMeta;

    if (dom.kpiUsersValue) dom.kpiUsersValue.textContent = kpiData.totalUsers;
    if (dom.kpiUsersMeta) dom.kpiUsersMeta.textContent = kpiData.totalUsersMeta;
}

/**
 * Memperbarui teks key insight dan actionable recommendation
 * @param {Object} insightData data insight baru
 */
function updateInsights(insightData) {
    if (!insightData) return;

    if (dom.insightKeyText) {
        dom.insightKeyText.innerHTML = insightData.keyInsights;
    }
    if (dom.insightRecText) {
        dom.insightRecText.innerHTML = insightData.recommendations;
    }
}

/**
 * Mengambil data untuk segmen tertentu dan memperbarui UI
 * @param {string} segment nama/ID segmen
 */
async function loadDashboard(segment) {
    try {
        // Efek loading opsional (misal redupkan card selama memuat data)
        document.querySelector('.container-fluid').style.opacity = '0.65';
        
        const data = await fetchDashboardData(segment);
        
        // Perbarui semua komponen UI
        updateKPIs(data.kpis);
        updateInsights(data.insights);
        updateCharts(data.charts);
        
    } catch (error) {
        console.error("Gagal memperbarui dashboard:", error);
        alert("Terjadi kesalahan saat mengambil data dari server.");
    } finally {
        // Kembalikan opacity normal
        document.querySelector('.container-fluid').style.opacity = '1';
    }
}

/**
 * Pasang event listener pada setiap tombol pil segmen
 */
function bindEvents() {
    if (!dom.pills) return;

    dom.pills.forEach((pill) => {
        pill.addEventListener('click', async (e) => {
            // Hapus kelas aktif dari pil lain
            dom.pills.forEach(p => p.classList.remove('active'));
            
            // Tambahkan kelas aktif ke pil yang diklik
            const targetPill = e.currentTarget;
            targetPill.classList.add('active');
            
            // Ambil ID segmen dari data attribute
            const segment = targetPill.getAttribute('data-segment');
            
            // Muat data baru
            await loadDashboard(segment);
        });
    });
}

// Inisialisasi awal saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', async () => {
    cacheDOM();
    bindEvents();
    
    // Hubungkan tombol Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutAdmin();
            window.location.replace('auth.html');
        });
    }

    // Set nama & peran admin secara dinamis dari localStorage
    const adminDisplayName = document.getElementById('admin-display-name');
    const adminDisplayRole = document.getElementById('admin-display-role');
    try {
        const user = JSON.parse(localStorage.getItem('adminUser'));
        if (user) {
            if (adminDisplayName) adminDisplayName.textContent = user.name || user.username;
            if (adminDisplayRole) adminDisplayRole.textContent = user.role || 'Admin';
        }
    } catch (e) {
        console.error("Gagal membaca sesi profil admin:", e);
    }
    
    try {
        // Ambil data default ("semua")
        const initialData = await fetchDashboardData('semua');
        
        // Inisialisasi awal UI dan Chart
        updateKPIs(initialData.kpis);
        updateInsights(initialData.insights);
        initCharts(initialData.charts);
        
    } catch (error) {
        console.error("Inisialisasi aplikasi gagal:", error);
    }
});
