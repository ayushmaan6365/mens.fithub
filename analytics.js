/**
 * MEN'S FIT HUB • REAL-TIME ANALYTICS & CONVERSION TRACKING
 * PRD Ref: PRD-MFH-2026-V2 (Section 11: Real-Time Analytics & Conversion Tracking)
 * Reel views, CTR calculation, Retailer referral share, and telemetry clickstream
 */

class AnalyticsDashboard {
  constructor() {
    this.init();
  }

  init() {
    this.refresh();
  }

  refresh() {
    if (!window.MFH_DATABASE) return;

    const data = window.MFH_DATABASE.getAnalytics();

    // 1. Update Metrics Cards
    const totalViewsEl = document.getElementById('statTotalViews');
    const totalClicksEl = document.getElementById('statTotalClicks');
    const ctrEl = document.getElementById('statCtr');
    const drawerExpEl = document.getElementById('statDrawerExp');

    if (totalViewsEl) totalViewsEl.textContent = Number(data.totalViews).toLocaleString();
    if (totalClicksEl) totalClicksEl.textContent = Number(data.totalClicks).toLocaleString();
    if (ctrEl) ctrEl.textContent = data.ctr;
    if (drawerExpEl) drawerExpEl.textContent = data.drawerExpansionRate;

    // 2. Retailer Click Share Distribution Chart
    const breakdownContainer = document.getElementById('retailerBreakdownBars');
    if (breakdownContainer) {
      breakdownContainer.innerHTML = '';
      data.retailerBreakdown.forEach(item => {
        let barColor = 'var(--admin-accent-amber)';
        if (item.retailer === 'FLIPKART') barColor = 'var(--admin-accent-blue)';
        if (item.retailer === 'MYNTRA') barColor = '#FF3F6C';

        const row = document.createElement('div');
        row.style.marginBottom = '1rem';
        row.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; margin-bottom: 4px;">
            <span>${item.retailer}</span>
            <span>${item.clicks} CLICKS (${item.percentage}%)</span>
          </div>
          <div style="width: 100%; height: 8px; background: var(--admin-card); border: 1px solid var(--admin-border); overflow: hidden;">
            <div style="height: 100%; width: ${item.percentage}%; background: ${barColor}; transition: width 400ms ease;"></div>
          </div>
        `;
        breakdownContainer.appendChild(row);
      });
    }

    // 3. Top Performing Fits
    const topFitsList = document.getElementById('topFitsList');
    if (topFitsList) {
      topFitsList.innerHTML = '';
      data.topFits.forEach((fit, idx) => {
        const item = document.createElement('div');
        item.style.cssText = 'display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: var(--admin-card); border: 1px solid var(--admin-border); margin-bottom: 0.5rem;';
        item.innerHTML = `
          <div style="font-family: var(--font-mono); font-size: 14px; font-weight: 800; color: var(--admin-text-sub); width: 20px;">
            #${idx + 1}
          </div>
          <img src="${fit.image}" style="width: 40px; height: 50px; object-fit: cover; border: 1px solid var(--admin-border);" alt="${fit.name}">
          <div style="flex: 1;">
            <div style="font-family: var(--font-mono); font-size: 9px; color: var(--admin-text-sub);">${fit.brand}</div>
            <div style="font-weight: 600; font-size: 11px;">${fit.name}</div>
          </div>
          <div style="text-align: right; font-family: var(--font-mono);">
            <div style="color: var(--admin-accent-green); font-weight: 700; font-size: 13px;">${fit.clicks}</div>
            <div style="font-size: 9px; color: var(--admin-text-muted);">OUTBOUND CLICKS</div>
          </div>
        `;
        topFitsList.appendChild(item);
      });
    }

    // 4. Live Telemetry Stream
    const streamBody = document.getElementById('clickStreamBody');
    if (streamBody) {
      streamBody.innerHTML = '';
      data.recentClicks.forEach(evt => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><span class="code-badge-blue">${evt.id}</span></td>
          <td><span class="code-badge-green">${evt.retailer}</span></td>
          <td>${evt.productId}</td>
          <td>${evt.reelId || 'DIRECT'}</td>
          <td style="color: var(--admin-text-muted); font-size: 10px;">${evt.ipHash}</td>
          <td style="color: var(--admin-text-muted); font-size: 10px;">${new Date(evt.timestamp).toLocaleTimeString()}</td>
        `;
        streamBody.appendChild(tr);
      });
    }
  }
}

window.AnalyticsDashboard = AnalyticsDashboard;
