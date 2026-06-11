/**
 * Auth Controller
 * File ini menangani logika antarmuka halaman login (Auth.html)
 * dan menghubungkannya dengan API Service.
 */

import { loginAdmin, isAuthenticated } from './api.js';

// Jalankan pemeriksaan awal: jika sudah terautentikasi, langsung arahkan ke dashboard
if (isAuthenticated()) {
    window.location.replace('Index.html');
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const errorAlert = document.getElementById('error-alert');
    
    // Elemen Tombol & Loading State
    const loginBtn = document.getElementById('login-btn');
    const loginBtnText = document.getElementById('login-btn-text');
    const loginBtnSpinner = document.getElementById('login-btn-spinner');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Reset state error sebelumnya
        errorAlert.classList.add('d-none');
        errorAlert.textContent = '';

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            showError('ID Pengguna dan Kata Sandi wajib diisi.');
            return;
        }

        // 2. Set loading state pada UI
        setLoading(true);

        try {
            // 3. Panggil API Autentikasi Admin
            await loginAdmin(username, password);
            
            // 4. Sukses: Alihkan ke dashboard utama
            window.location.replace('Index.html');
        } catch (error) {
            // 5. Gagal: Tampilkan pesan error
            showError(error.message || 'Gagal masuk ke sistem. Silakan coba lagi.');
            setLoading(false);
        }
    });

    /**
     * Mengubah state pemuatan tombol submit
     * @param {boolean} isLoading status pemuatan
     */
    function setLoading(isLoading) {
        if (isLoading) {
            loginBtn.disabled = true;
            usernameInput.disabled = true;
            passwordInput.disabled = true;
            
            loginBtnSpinner.classList.remove('d-none');
            loginBtnText.textContent = 'Memverifikasi...';
        } else {
            loginBtn.disabled = false;
            usernameInput.disabled = false;
            passwordInput.disabled = false;
            
            loginBtnSpinner.classList.add('d-none');
            loginBtnText.textContent = 'Masuk Ke Dashboard';
        }
    }

    /**
     * Menampilkan pesan kesalahan di UI
     * @param {string} message pesan error
     */
    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.remove('d-none');
    }
});
