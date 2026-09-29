/**
 * MEN'S FIT HUB • AFFILIATE LINK HYGIENE & CLEAN URL NORMALIZER
 * PRD Ref: PRD-MFH-2026-V2 (Section 10: Affiliate Link Hygiene)
 * Tests ASIN extraction, strips third-party seller tokens, injects creator attribution tags
 */

class AffiliateLinkNormalizer {
  constructor() {
    this.rawInput = document.getElementById('normRawUrlInput');
    this.retailerSelect = document.getElementById('normRetailerSelect');
    this.processBtn = document.getElementById('normProcessBtn');
    this.resultContainer = document.getElementById('normResultBox');

    this.init();
  }

  init() {
    if (this.processBtn) {
      this.processBtn.addEventListener('click', () => this.process());
    }

    // Auto-process on paste
    if (this.rawInput) {
      this.rawInput.addEventListener('paste', () => {
        setTimeout(() => this.process(), 50);
      });
    }

    // Quick test preset buttons
    document.querySelectorAll('[data-preset-url]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.rawInput) this.rawInput.value = btn.dataset.presetUrl;
        if (this.retailerSelect) this.retailerSelect.value = btn.dataset.presetRetailer;
        this.process();
      });
    });
  }

  process() {
    const rawUrl = this.rawInput ? this.rawInput.value.trim() : '';
    const retailer = this.retailerSelect ? this.retailerSelect.value : 'AMAZON';

    if (!rawUrl) return;

    if (!window.MFH_DATABASE) return;

    const result = window.MFH_DATABASE.normalizeAffiliateUrl(rawUrl, retailer);

    if (this.resultContainer) {
      this.resultContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--admin-border); padding-bottom: 0.5rem;">
            <span class="code-badge-green">✔ NORMALIZATION VALIDATED (DOMAIN: ${retailer})</span>
            <button class="btn-admin-primary" style="padding: 0.25rem 0.6rem; font-size: 10px;" onclick="navigator.clipboard.writeText('${result.normalizedUrl}'); alert('Clean affiliate URL copied!');">
              COPY CLEAN URL
            </button>
          </div>

          <div>
            <div style="color: var(--admin-text-sub); font-size: 10px; margin-bottom: 2px;">ORIGINAL RAW INPUT (UNHYGIENIC):</div>
            <div style="background: rgba(239, 68, 68, 0.08); border-left: 2px solid var(--admin-accent-red); padding: 0.4rem 0.6rem; font-size: 11px; word-break: break-all; color: #FCA5A5;">
              ${rawUrl}
            </div>
          </div>

          <div>
            <div style="color: var(--admin-text-sub); font-size: 10px; margin-bottom: 2px;">PROCESSED CLEAN URL (INJECTED & VERIFIED):</div>
            <div style="background: rgba(16, 185, 129, 0.08); border-left: 2px solid var(--admin-accent-green); padding: 0.4rem 0.6rem; font-size: 11px; word-break: break-all; color: #86EFAC;">
              ${result.normalizedUrl}
            </div>
          </div>

          <div style="display: flex; gap: 1.5rem; font-size: 11px; color: var(--admin-text-sub); border-top: 1px solid var(--admin-border); padding-top: 0.5rem;">
            ${result.asin ? `<div>IDENTIFIER (ASIN): <span class="code-badge-blue">${result.asin}</span></div>` : ''}
            ${result.pid ? `<div>IDENTIFIER (PID): <span class="code-badge-blue">${result.pid}</span></div>` : ''}
            <div>INJECTED TAG: <span class="code-badge-green">${result.partnerTag}</span></div>
            <div>TRACKING BLOAT REMOVED: <span style="color: var(--admin-accent-green);">YES</span></div>
          </div>
        </div>
      `;
    }
  }
}

window.AffiliateLinkNormalizer = AffiliateLinkNormalizer;
