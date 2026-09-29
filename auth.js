/**
 * MEN'S FIT HUB • ADMIN AUTHENTICATION ENGINE
 * PRD Ref: PRD-MFH-2026-V2 (Section 2: Isolated Origin & Hardware MFA)
 * Simulates SSO + TOTP 2FA with RS256 JWT Token Life-Cycle
 */

class AdminAuthEngine {
  constructor() {
    this.authOverlay = document.getElementById('authOverlay');
    this.totpInputs = document.querySelectorAll('.totp-digit-input');
    this.ssoEmailInput = document.getElementById('ssoEmailInput');
    this.verifyBtn = document.getElementById('verifyAuthBtn');
    this.authStatusMsg = document.getElementById('authStatusMsg');
    this.sessionTimerEl = document.getElementById('sessionTimer');

    this.tokenExpiresAt = null;
    this.timerInterval = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.checkSession();
  }

  bindEvents() {
    // Digit inputs auto-advance
    this.totpInputs.forEach((input, idx) => {
      input.addEventListener('input', (e) => {
        if (input.value.length === 1 && idx < this.totpInputs.length - 1) {
          this.totpInputs[idx + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && idx > 0) {
          this.totpInputs[idx - 1].focus();
        } else if (e.key === 'Enter') {
          this.attemptVerification();
        }
      });
    });

    if (this.verifyBtn) {
      this.verifyBtn.addEventListener('click', () => this.attemptVerification());
    }
  }

  checkSession() {
    const session = sessionStorage.getItem('mfh_admin_token');
    if (session) {
      const parsed = JSON.parse(session);
      if (Date.now() < parsed.expiresAt) {
        this.tokenExpiresAt = parsed.expiresAt;
        this.unlockDashboard(parsed.email);
        return;
      }
    }
    this.lockDashboard();
  }

  attemptVerification() {
    const email = this.ssoEmailInput ? this.ssoEmailInput.value.trim() : 'creator@mensfithub.com';
    const totpCode = Array.from(this.totpInputs).map(i => i.value).join('');

    if (!email || !email.includes('@')) {
      this.showError('PLEASE PROVIDE AN AUTHORIZED CREATOR SSO IDENTITY');
      return;
    }

    if (totpCode.length < 6) {
      this.showError('PLEASE ENTER COMPLETE 6-DIGIT TOTP HARDWARE CODE');
      return;
    }

    // Success simulation
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins RS256 token lifespan
    sessionStorage.setItem('mfh_admin_token', JSON.stringify({
      email,
      expiresAt,
      token: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: email, role: "SUPER_ADMIN" }))}`
    }));

    this.tokenExpiresAt = expiresAt;
    this.unlockDashboard(email);
  }

  showError(msg) {
    if (this.authStatusMsg) {
      this.authStatusMsg.textContent = msg;
      this.authStatusMsg.style.color = 'var(--admin-accent-red)';
    }
  }

  unlockDashboard(email) {
    if (this.authOverlay) {
      this.authOverlay.classList.add('hidden');
    }
    const adminUserEl = document.getElementById('adminUserEmail');
    if (adminUserEl) {
      adminUserEl.textContent = email;
    }
    this.startSessionTimer();
  }

  lockDashboard() {
    if (this.authOverlay) {
      this.authOverlay.classList.remove('hidden');
    }
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  startSessionTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      const remainingMs = this.tokenExpiresAt - Date.now();
      if (remainingMs <= 0) {
        clearInterval(this.timerInterval);
        sessionStorage.removeItem('mfh_admin_token');
        this.lockDashboard();
        return;
      }
      const mins = Math.floor(remainingMs / 60000);
      const secs = Math.floor((remainingMs % 60000) / 1000);
      if (this.sessionTimerEl) {
        this.sessionTimerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    }, 1000);
  }

  logout() {
    sessionStorage.removeItem('mfh_admin_token');
    this.lockDashboard();
  }
}

window.AdminAuthEngine = AdminAuthEngine;
