/* ============================================
   AUTO VALE PREVENÇÕES - LOGIN PAGE
   JavaScript - Validações e Interações
   ============================================ */
(function () {
    'use strict';
    var form = document.getElementById('loginForm');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var togglePasswordBtn = document.getElementById('togglePassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnText = btnLogin.querySelector('.btn-text');
    var btnLoader = btnLogin.querySelector('.btn-loader');
    var toast = document.getElementById('toast');

    function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
    function isValidCPF(cpf) { return cpf.replace(/\D/g, '').length === 11; }
    function formatCPF(value) {
        var n = value.replace(/\D/g, '');
        if (n.length <= 3) return n;
        if (n.length <= 6) return n.slice(0,3) + '.' + n.slice(3);
        if (n.length <= 9) return n.slice(0,3) + '.' + n.slice(3,6) + '.' + n.slice(6);
        return n.slice(0,3) + '.' + n.slice(3,6) + '.' + n.slice(6,9) + '-' + n.slice(9,11);
    }
    function isCPFInput(value) { return /^\d/.test(value) && !value.includes('@') && value.replace(/\D/g,'').length <= 11; }
    function showError(el, msg) { el.textContent = msg; el.classList.add('visible'); }
    function hideError(el) { el.textContent = ''; el.classList.remove('visible'); }
    function showToast(message, type) {
        toast.querySelector('.toast-message').textContent = message;
        toast.className = 'toast ' + type;
        requestAnimationFrame(function() { toast.classList.add('show'); });
        setTimeout(function() { toast.classList.remove('show'); }, 4000);
    }
    function shakeElement(el) {
        el.classList.add('shake');
        el.addEventListener('animationend', function() { el.classList.remove('shake'); }, { once: true });
    }

    togglePasswordBtn.addEventListener('click', function () {
        var isPass = passwordInput.type === 'password';
        passwordInput.type = isPass ? 'text' : 'password';
        this.querySelector('.eye-icon').style.display = isPass ? 'none' : 'block';
        this.querySelector('.eye-off-icon').style.display = isPass ? 'block' : 'none';
        this.setAttribute('aria-label', isPass ? 'Ocultar senha' : 'Mostrar senha');
    });

    emailInput.addEventListener('input', function (e) {
        if (isCPFInput(e.target.value)) {
            var pos = e.target.selectionStart;
            var formatted = formatCPF(e.target.value);
            var diff = formatted.length - e.target.value.length;
            e.target.value = formatted;
            e.target.setSelectionRange(pos + diff, pos + diff);
        }
        if (emailError.classList.contains('visible')) { hideError(emailError); this.classList.remove('error'); }
    });

    passwordInput.addEventListener('input', function () {
        if (passwordError.classList.contains('visible')) { hideError(passwordError); this.classList.remove('error'); }
    });

    emailInput.addEventListener('blur', function () {
        var v = this.value.trim();
        if (v && !isValidEmail(v) && !isValidCPF(v)) { showError(emailError, 'Digite um e-mail válido ou CPF com 11 dígitos'); this.classList.add('error'); }
    });

    passwordInput.addEventListener('blur', function () {
        if (this.value && this.value.length < 6) { showError(passwordError, 'A senha deve ter no mínimo 6 caracteres'); this.classList.add('error'); }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideError(emailError); hideError(passwordError);
        emailInput.classList.remove('error'); passwordInput.classList.remove('error');
        var email = emailInput.value.trim(), password = passwordInput.value, hasError = false;

        if (!email) { showError(emailError, 'Campo obrigatório'); emailInput.classList.add('error'); hasError = true; }
        else if (!isValidEmail(email) && !isValidCPF(email)) { showError(emailError, 'Digite um e-mail válido ou CPF com 11 dígitos'); emailInput.classList.add('error'); hasError = true; }
        if (!password) { showError(passwordError, 'Campo obrigatório'); passwordInput.classList.add('error'); hasError = true; }
        else if (password.length < 6) { showError(passwordError, 'A senha deve ter no mínimo 6 caracteres'); passwordInput.classList.add('error'); hasError = true; }
        if (hasError) { shakeElement(form); return; }

        setLoading(true);
        setTimeout(function() {
            if (email && password.length >= 6) {
                showToast('Login realizado com sucesso! Redirecionando...', 'success');
            } else {
                showToast('Credenciais inválidas', 'error');
                shakeElement(form);
            }
            setLoading(false);
        }, 1800);
    });

    function setLoading(loading) {
        btnLogin.disabled = loading;
        btnText.style.display = loading ? 'none' : 'inline';
        btnLoader.style.display = loading ? 'flex' : 'none';
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && document.activeElement === emailInput) { e.preventDefault(); passwordInput.focus(); }
    });

    var formGroups = document.querySelectorAll('.form-group, .form-options, .btn-login, .divider, .btn-social, .signup-link');
    formGroups.forEach(function(group, index) {
        group.style.opacity = '0';
        group.style.transform = 'translateY(10px)';
        group.style.transition = 'opacity 0.4s ease ' + (index * 0.08) + 's, transform 0.4s ease ' + (index * 0.08) + 's';
        requestAnimationFrame(function() { group.style.opacity = '1'; group.style.transform = 'translateY(0)'; });
    });
})();



/* ===== Theme Toggle (Dark/Light Mode) ===== */
(function() {
    var toggle = document.getElementById('themeToggle');
    var html = document.documentElement;
    var STORAGE_KEY = 'autovale-theme';

    // Carregar tema salvo ou usar preferência do sistema
    function loadTheme() {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark') {
            html.classList.add('dark-mode');
        } else if (saved === 'light') {
            html.classList.remove('dark-mode');
        } else {
            // Sem preferência salva: usar preferência do sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.classList.add('dark-mode');
            }
        }
    }

    // Toggle
    toggle.addEventListener('click', function() {
        html.classList.toggle('dark-mode');
        var isDark = html.classList.contains('dark-mode');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    });

    loadTheme();
})();
