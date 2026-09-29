/**
 * MEN'S FIT HUB • SEAMLESS OUTBOUND BUY PROTOCOL
 * Direct, guaranteed NEW-TAB handoff so the customer website stays open and uninterrupted
 */

class AffiliateRedirectClient {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-outbound="true"]');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const productId = btn.dataset.productId;
      const reelId = btn.dataset.reelId || null;

      this.executeHandoff({ productId, reelId });
    });
  }

  executeHandoff({ productId, reelId }) {
    if (!window.MFH_DATABASE) return;

    const product = window.MFH_DATABASE.getProductById(productId);
    if (!product) return;

    // Retrieve the direct buy link configured in Admin
    let targetLink = null;
    if (product.affiliateLinks && product.affiliateLinks.length > 0) {
      targetLink = product.affiliateLinks.find(l => l.isActive) || product.affiliateLinks[0];
    }

    let targetUrl = targetLink ? (targetLink.affiliateUrl || targetLink.rawUrl) : 'https://www.amazon.in';
    const retailer = targetLink ? targetLink.retailer : 'STORE';

    // Silent telemetry recording in background
    try {
      window.MFH_DATABASE.recordClick({
        productId,
        retailer,
        reelId,
        userAgent: navigator.userAgent
      });
    } catch (err) {
      // background telemetry
    }

    // Customer Order Tracking: Record active order if user is logged in
    try {
      const activeUserStr = localStorage.getItem('mfh_customer_user');
      if (activeUserStr && window.MFH_DATABASE && typeof window.MFH_DATABASE.recordCustomerOrder === 'function') {
        const activeUser = JSON.parse(activeUserStr);
        if (activeUser.email) {
          window.MFH_DATABASE.recordCustomerOrder(activeUser.email, product, retailer);
        }
      }
    } catch (orderErr) {
      console.warn('Customer order record error:', orderErr);
    }

    // STRICT GUARANTEE: Open in a clean NEW TAB, keeping Men's Fit Hub intact
    const linkEl = document.createElement('a');
    linkEl.href = targetUrl;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer sponsored';
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
  }
}

window.AffiliateRedirectClient = AffiliateRedirectClient;
