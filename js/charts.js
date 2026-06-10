/**
 * Charts Manager
 * File ini menangani inisialisasi dan pembaruan dinamis grafik Chart.js.
 */

// Objek untuk menyimpan instance dari setiap grafik agar bisa diupdate
const chartInstances = {
    ctrPerType: null,
    dailyEngagementTrend: null,
    segmentPerformance: null,
    userDistribution: null,
    featureUsageRate: null
};

// Ambil variabel warna dari CSS custom properties
let colorChart1, colorChart2, colorChart3, colorChart4, colorTextMuted, gridColorSamar;

function initColors() {
    const styles = getComputedStyle(document.documentElement);
    colorChart1 = styles.getPropertyValue('--color-chart-1').trim() || '#0A3734';
    colorChart2 = styles.getPropertyValue('--color-chart-2').trim() || '#5E318B';
    colorChart3 = styles.getPropertyValue('--color-chart-3').trim() || '#F1585A';
    colorChart4 = styles.getPropertyValue('--color-chart-4').trim() || '#F8901D';
    colorTextMuted = styles.getPropertyValue('--text-muted').trim() || '#8A92A6';
    gridColorSamar = 'rgba(150, 25, 23, 0.08)';
}

// Konfigurasi legenda standar
const cleanLegendConfig = {
    display: true,
    position: 'top',
    align: 'end',
    labels: {
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 8,
        font: { size: 10, weight: '500' }
    }
};

/**
 * Inisialisasi awal semua grafik dengan data default
 * @param {Object} initialData data grafik awal (misalnya segmen "semua")
 */
export function initCharts(initialData) {
    initColors();

    // Konfigurasi Default Global Chart.js
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.font.size = 10;
    Chart.defaults.color = colorTextMuted;

    // 1. CTR per Tipe Konten (Bar Chart)
    const ctxCtr = document.getElementById('chart-ctr-per-tipe');
    if (ctxCtr) {
        chartInstances.ctrPerType = new Chart(ctxCtr, {
            type: 'bar',
            data: {
                labels: initialData.ctrPerType.labels,
                datasets: [{
                    data: initialData.ctrPerType.data,
                    backgroundColor: [colorChart1, colorChart4, colorChart2],
                    barThickness: 38
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 20, bottom: 5, left: 10, right: 10 } },
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 40,
                        grid: { color: gridColorSamar },
                        border: { display: false }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false }
                    }
                }
            }
        });
    }

    // 2. Tren Engagement Harian (Line Chart)
    const ctxTrend = document.getElementById('chart-tren-harian');
    if (ctxTrend) {
        chartInstances.dailyEngagementTrend = new Chart(ctxTrend, {
            type: 'line',
            data: {
                labels: initialData.dailyEngagementTrend.labels,
                datasets: [{
                    label: 'Rate (%)',
                    data: initialData.dailyEngagementTrend.data,
                    borderColor: colorChart4,
                    backgroundColor: 'transparent',
                    tension: 0.2,
                    pointRadius: 3,
                    pointBackgroundColor: colorChart4,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 15, bottom: 5, left: 10, right: 15 } },
                plugins: { legend: cleanLegendConfig },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 80,
                        grid: { color: gridColorSamar },
                        border: { display: false }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false }
                    }
                }
            }
        });
    }

    // 3. Segment Performance (Grouped Bar Chart)
    const ctxSeg = document.getElementById('chart-segment-perf');
    if (ctxSeg) {
        chartInstances.segmentPerformance = new Chart(ctxSeg, {
            type: 'bar',
            data: {
                labels: initialData.segmentPerformance.labels,
                datasets: [
                    { label: 'Gen Z', data: initialData.segmentPerformance.datasets[0].data, backgroundColor: colorChart3 },
                    { label: 'Young Prof', data: initialData.segmentPerformance.datasets[1].data, backgroundColor: colorChart1 },
                    { label: 'Est Prof', data: initialData.segmentPerformance.datasets[2].data, backgroundColor: colorChart4 },
                    { label: 'Freelancer', data: initialData.segmentPerformance.datasets[3].data, backgroundColor: colorChart2 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 15, bottom: 5, left: 10, right: 15 } },
                plugins: { legend: cleanLegendConfig },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 70,
                        ticks: { callback: (val) => val + '%' },
                        grid: { color: gridColorSamar },
                        border: { display: false }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 12, weight: '600' } },
                        border: { display: false }
                    }
                }
            }
        });
    }

    // 4. Distribusi Pengguna (Doughnut Chart)
    const ctxDist = document.getElementById('chart-distribusi');
    if (ctxDist) {
        chartInstances.userDistribution = new Chart(ctxDist, {
            type: 'doughnut',
            data: {
                labels: initialData.userDistribution.labels,
                datasets: [{
                    data: initialData.userDistribution.data,
                    backgroundColor: [colorChart1, colorChart4, colorChart2, colorChart3],
                    borderWidth: 0,
                    cutout: '72%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 15, bottom: 15, left: 15, right: 15 } },
                plugins: { legend: cleanLegendConfig }
            }
        });
    }

    // 5. Feature Usage Rate (Horizontal Bar Chart)
    const ctxUsage = document.getElementById('chart-usage-rate');
    if (ctxUsage) {
        chartInstances.featureUsageRate = new Chart(ctxUsage, {
            type: 'bar',
            data: {
                labels: initialData.featureUsageRate.labels,
                datasets: [{
                    data: initialData.featureUsageRate.data,
                    backgroundColor: colorChart3,
                    barThickness: 12
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { top: 5, bottom: 5, left: 5, right: 20 } },
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 70,
                        ticks: { callback: (val) => val + '%' },
                        grid: { color: gridColorSamar },
                        border: { display: false }
                    },
                    y: {
                        grid: { display: false },
                        border: { display: false }
                    }
                }
            }
        });
    }
}

/**
 * Memperbarui data chart secara dinamis dengan transisi halus
 * @param {Object} chartsData data grafik baru untuk segmen tertentu
 */
export function updateCharts(chartsData) {
    if (!chartsData) return;

    // 1. Update CTR per Tipe
    if (chartInstances.ctrPerType && chartsData.ctrPerType) {
        chartInstances.ctrPerType.data.labels = chartsData.ctrPerType.labels;
        chartInstances.ctrPerType.data.datasets[0].data = chartsData.ctrPerType.data;
        chartInstances.ctrPerType.update();
    }

    // 2. Update Tren Engagement Harian
    if (chartInstances.dailyEngagementTrend && chartsData.dailyEngagementTrend) {
        chartInstances.dailyEngagementTrend.data.labels = chartsData.dailyEngagementTrend.labels;
        chartInstances.dailyEngagementTrend.data.datasets[0].data = chartsData.dailyEngagementTrend.data;
        chartInstances.dailyEngagementTrend.update();
    }

    // 3. Update Segment Performance
    if (chartInstances.segmentPerformance && chartsData.segmentPerformance) {
        chartInstances.segmentPerformance.data.labels = chartsData.segmentPerformance.labels;
        chartsData.segmentPerformance.datasets.forEach((dataset, idx) => {
            if (chartInstances.segmentPerformance.data.datasets[idx]) {
                chartInstances.segmentPerformance.data.datasets[idx].data = dataset.data;
            }
        });
        chartInstances.segmentPerformance.update();
    }

    // 4. Update Distribusi Pengguna
    if (chartInstances.userDistribution && chartsData.userDistribution) {
        chartInstances.userDistribution.data.labels = chartsData.userDistribution.labels;
        chartInstances.userDistribution.data.datasets[0].data = chartsData.userDistribution.data;
        chartInstances.userDistribution.update();
    }

    // 5. Update Feature Usage Rate
    if (chartInstances.featureUsageRate && chartsData.featureUsageRate) {
        chartInstances.featureUsageRate.data.labels = chartsData.featureUsageRate.labels;
        chartInstances.featureUsageRate.data.datasets[0].data = chartsData.featureUsageRate.data;
        chartInstances.featureUsageRate.update();
    }
}
