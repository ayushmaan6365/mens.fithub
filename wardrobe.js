/**
 * MEN'S FIT HUB • MASTER WARDROBE CATALOG ("ALL FITS")
 * PRD Ref: PRD-MFH-2026-V2 (Section 7: Master Wardrobe Catalog)
 * Features: Editorial 4-col/2-col Grid, Faceted Filters, URL sync, "Seen in Reel" modal player
 */

class WardrobeCatalog {
  constructor() {
    this.gridContainer = document.getElementById('wardrobeGrid');
    this.totalCountPill = document.getElementById('wardrobeTotalCount');
    this.searchInput = document.getElementById('catalogSearchInput');
    this.clearFiltersBtn = document.getElementById('clearFiltersBtn');
    this.seenReelModal = document.getElementById('seenReelModal');

    this.filters = {
      category: 'ALL',
      fit: 'ALL',
      search: ''
    };

    this.init();
  }

  init() {
    this.readUrlParams();
    this.bindFilterEvents();
    this.bindModalEvents();
    this.render();
  }

  readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) this.filters.category = params.get('category').toUpperCase();
    if (params.has('fit')) this.filters.fit = params.get('fit').toUpperCase();
    if (params.has('search')) this.filters.search = params.get('search');

    if (this.searchInput && this.filters.search) {
      this.searchInput.value = this.filters.search;
    }

    this.updateActiveFilterUI();
  }

  syncUrlParams() {
    const params = new URLSearchParams();
    if (this.filters.category !== 'ALL') params.set('category', this.filters.category.toLowerCase());
    if (this.filters.fit !== 'ALL') params.set('fit', this.filters.fit.toLowerCase());
    if (this.filters.search) params.set('search', this.filters.search);

    const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newQuery);
  }

  updateActiveFilterUI() {
    document.querySelectorAll('[data-filter-group]').forEach(group => {
      const type = group.dataset.filterGroup;
      const currentVal = this.filters[type];

      group.querySelectorAll('.filter-chip').forEach(chip => {
        const val = chip.dataset.filterVal;
        if (val.toUpperCase() === currentVal.toUpperCase()) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      });
    });
  }

  bindFilterEvents() {
    document.querySelectorAll('[data-filter-group]').forEach(group => {
      group.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;

        const groupType = group.dataset.filterGroup;
        const val = chip.dataset.filterVal;
        this.filters[groupType] = val;

        this.updateActiveFilterUI();
        this.syncUrlParams();
        this.render();
      });
    });

    if (this.searchInput) {
      let debounceTimer;
      this.searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.filters.search = e.target.value.trim();
          this.syncUrlParams();
          this.render();
        }, 180);
      });
    }

    if (this.clearFiltersBtn) {
      this.clearFiltersBtn.addEventListener('click', () => {
        this.filters = { category: 'ALL', fit: 'ALL', search: '' };
        if (this.searchInput) this.searchInput.value = '';
        this.updateActiveFilterUI();
        this.syncUrlParams();
        this.render();
      });
    }
  }

  render() {
    if (!this.gridContainer || !window.MFH_DATABASE) return;

    const products = window.MFH_DATABASE.getProducts(this.filters);

    if (this.totalCountPill) {
      this.totalCountPill.textContent = `${products.length} CATALOGED FITS`;
    }

    if (products.length === 0) {
      this.gridContainer.innerHTML = `
        <div class="catalog-empty-state">
          <span class="tag-label">ZERO RESULTS MATCH YOUR CRITERIA</span>
          <h3>NO GARMENTS FOUND</h3>
          <p>Try resetting the filters or search query to browse the complete Men's Fit Hub archive.</p>
          <button class="btn-editorial-primary" onclick="window.WardrobeInstance.resetFilters()">RESET ALL FILTERS</button>
        </div>
      `;
      return;
    }

    this.gridContainer.innerHTML = '';

    products.forEach(item => {
      const card = document.createElement('div');
      card.className = 'garment-card';
      card.dataset.productId = item.id;

      const primaryReel = item.styledInReels && item.styledInReels.length > 0 ? item.styledInReels[0] : null;

      card.innerHTML = `
        <div class="garment-image-wrapper">
          <img class="garment-image" src="${item.primaryImage}" alt="${item.name}" loading="lazy">
          
          ${primaryReel ? `
            <div class="styled-in-reel-badge" data-action="open-seen-reel" data-reel-id="${primaryReel.id}">
              <span class="play-triangle-mini"></span>
              STYLED IN REEL
            </div>
          ` : ''}
        </div>

        <div class="garment-card-body">
          <div>
            <div class="garment-brand">${item.brand}</div>
            <h3 class="garment-title">${item.name}</h3>
            
            <div class="garment-attributes">
              <span class="garment-pill">${item.category}</span>
              ${item.fitType ? `<span class="garment-pill">${item.fitType}</span>` : ''}
              ${item.color ? `<span class="garment-pill">${item.color}</span>` : ''}
            </div>

            ${item.fitAdvice ? `
              <div class="garment-advice-box" style="margin-top: 0.75rem;">
                <span style="font-weight: 600; color: var(--text-primary); text-transform: uppercase; font-size: 10px; display: block; margin-bottom: 2px;">Fit Guidance:</span>
                ${item.fitAdvice}
              </div>
            ` : ''}
          </div>

          <div class="garment-footer">
            <div class="garment-price-row">
              <span class="garment-price-val">₹ ${Number(item.priceEstimate).toLocaleString('en-IN')}</span>
              <span class="garment-sku">${item.sku}</span>
            </div>

            <div class="garment-cta-group">
              <button 
                class="btn-buy-primary" 
                data-outbound="true"
                data-product-id="${item.id}"
                data-reel-id="${primaryReel ? primaryReel.id : ''}">
                BUY
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      this.gridContainer.appendChild(card);
    });
  }

  resetFilters() {
    this.filters = { category: 'ALL', fit: 'ALL', search: '' };
    if (this.searchInput) this.searchInput.value = '';
    this.updateActiveFilterUI();
    this.syncUrlParams();
    this.render();
  }

  bindModalEvents() {
    if (this.gridContainer) {
      this.gridContainer.addEventListener('click', (e) => {
        const badge = e.target.closest('[data-action="open-seen-reel"]');
        if (!badge) return;

        const reelId = badge.dataset.reelId;
        this.openSeenInReelModal(reelId);
      });
    }

    if (this.seenReelModal) {
      this.seenReelModal.addEventListener('click', (e) => {
        if (e.target === this.seenReelModal || e.target.closest('[data-action="close-seen-reel"]')) {
          this.closeSeenInReelModal();
        }
      });
    }
  }

  openSeenInReelModal(reelId) {
    if (!this.seenReelModal || !window.MFH_DATABASE) return;

    const reel = window.MFH_DATABASE.getReelById(reelId);
    if (!reel) return;

    const modalBody = this.seenReelModal.querySelector('#seenReelModalContent');
    if (!modalBody) return;

    const garmentsListHtml = (reel.products || []).map(p => `
      <div class="seen-mini-garment-row">
        <img class="seen-mini-thumb" src="${p.primaryImage}" alt="${p.name}">
        <div class="seen-mini-info">
          <div class="seen-mini-brand">${p.brand} • ${p.category}</div>
          <div class="seen-mini-name">${p.name}</div>
          <div style="font-family: var(--font-mono); font-size: 11px; margin-top: 3px;">₹ ${Number(p.priceEstimate).toLocaleString('en-IN')}</div>
        </div>
        <button 
          class="btn-buy-primary" 
          style="padding: 0.45rem 1rem; font-size: 10px;"
          data-outbound="true"
          data-product-id="${p.id}"
          data-reel-id="${reel.id}">
          BUY ↗
        </button>
      </div>
    `).join('');

    modalBody.innerHTML = `
      <button class="seen-reel-close-btn" data-action="close-seen-reel" title="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="seen-reel-video-col">
        <video 
          id="seenReelPlayer" 
          src="${reel.videoUrl}" 
          autoplay 
          loop 
          muted 
          playsinline 
          poster="${reel.posterUrl}">
        </video>
      </div>

      <div class="seen-reel-details-col">
        <div class="seen-reel-header">
          <span class="seen-reel-tag">ORIGINAL EDITORIAL REEL // 9:16 FEED</span>
          <h2 class="seen-reel-heading">${reel.title}</h2>
          <p class="seen-reel-caption">${reel.caption || ''}</p>
        </div>

        <div>
          <div class="seen-reel-garments-title">ALL FEATURED PIECES (${reel.products ? reel.products.length : 0})</div>
          <div class="seen-reel-garments-mini">
            ${garmentsListHtml}
          </div>
        </div>
      </div>
    `;

    this.seenReelModal.classList.add('active');
  }

  closeSeenInReelModal() {
    if (!this.seenReelModal) return;
    const player = this.seenReelModal.querySelector('#seenReelPlayer');
    if (player) {
      player.pause();
    }
    this.seenReelModal.classList.remove('active');
  }
}

window.WardrobeCatalog = WardrobeCatalog;
