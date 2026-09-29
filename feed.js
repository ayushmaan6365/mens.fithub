/**
 * MEN'S FIT HUB • REEL-TO-FIT FEED ENGINE
 * PRD Ref: PRD-MFH-2026-V2 (Section 6: Reel-to-Fit Home Feed)
 * Features: 9:16 Snap-Scroll, Autoplay policy, Zero inertia judder, Sound toggle, Shop Drawer
 */

class ReelFeedEngine {
  constructor() {
    this.container = document.getElementById('snapFeedContainer');
    this.drawerOverlay = document.getElementById('shopDrawerOverlay');
    this.drawerItemsContainer = document.getElementById('drawerItemsList');
    this.soundToggleBtn = document.getElementById('globalSoundToggle');
    this.feedBackdrop = document.getElementById('feedBackdropBlur');

    this.activeReelIndex = 0;
    this.isMuted = true;
    this.reelsData = [];
    this.videoElements = new Map();
    this.likedReels = new Set();

    this.init();
  }

  async init() {
    this.loadReels();
    this.bindGlobalEvents();
    this.setupIntersectionObserver();
  }

  loadReels() {
    if (window.MFH_DATABASE) {
      this.reelsData = window.MFH_DATABASE.getPublishedReels();
    } else {
      this.reelsData = [];
    }
    this.renderReels();
  }

  renderReels() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.reelsData.forEach((reel, index) => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.dataset.reelId = reel.id;
      card.dataset.index = index;

      const garmentCount = reel.products ? reel.products.length : 0;
      const countLabel = garmentCount === 1 ? '1 GARMENT' : `${garmentCount} GARMENTS`;

      card.innerHTML = `
        <div class="reel-video-container">
          <video 
            class="reel-video" 
            src="${reel.videoUrl}" 
            loop 
            muted 
            playsinline 
            preload="metadata"
            poster="${reel.posterUrl}">
          </video>
          <img class="reel-poster-fallback" src="${reel.posterUrl}" alt="${reel.title}">
        </div>

        <div class="reel-vignette-top"></div>
        <div class="reel-vignette-bottom"></div>

        <!-- Floating Brand Stamp -->
        <div class="reel-brand-stamp">
          <span class="reel-brand-dot"></span>
          <span class="tag-label">MFH // LOOKBOOK ${String(index + 1).padStart(2, '0')}</span>
        </div>

        <!-- Tap Play/Pause Feedback Overlay -->
        <div class="play-pause-overlay" data-action="toggle-play">
          <div class="play-pause-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>

        <!-- Right Side Action Rail -->
        <div class="reel-action-rail">
          <div class="action-item">
            <button class="action-btn" data-action="like-reel" title="Save Look">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <span class="action-label" data-counter="likes">${this.formatViewCount(reel.viewCount || 1200)}</span>
          </div>

          <div class="action-item">
            <button class="action-btn" data-action="share-reel" title="Share Outfit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
            <span class="action-label">SHARE</span>
          </div>

          <div class="action-item">
            <button class="action-btn" data-action="open-drawer" title="Shop All Items">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </button>
            <span class="action-label">${garmentCount} FITS</span>
          </div>
        </div>

        <!-- Reel Editorial Metadata -->
        <div class="reel-meta-content">
          <div class="reel-creator-badge">
            <span class="creator-handle">@MENSFITHUB</span>
            <svg class="creator-verified-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 class="reel-title">${reel.title}</h2>
          <p class="reel-caption">${reel.caption || ''}</p>
          <div class="reel-tag-chips">
            ${(reel.tags || []).map(t => `<span class="tag-chip">#${t}</span>`).join('')}
          </div>
        </div>

        <!-- Video Progress Bar -->
        <div class="reel-progress-track">
          <div class="reel-progress-fill" data-progress="fill"></div>
        </div>

        <!-- Persistent Dark Glass Shop Look Pill -->
        <div class="shop-look-pill" data-action="open-drawer">
          <div class="pill-info">
            <span class="pill-garment-count-badge">${garmentCount}</span>
            <span class="pill-text">${countLabel} IN THIS LOOK</span>
          </div>
          <div class="pill-trigger-action">
            <span>VIEW FITS</span>
            <svg class="pill-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
        </div>
      `;

      this.container.appendChild(card);
      const videoEl = card.querySelector('video');
      this.videoElements.set(reel.id, videoEl);

      const progressFill = card.querySelector('[data-progress="fill"]');
      videoEl.addEventListener('timeupdate', () => {
        if (videoEl.duration) {
          const pct = (videoEl.currentTime / videoEl.duration) * 100;
          progressFill.style.width = `${pct}%`;
        }
      });

      videoEl.addEventListener('error', () => {
        card.querySelector('.reel-video-container').classList.add('show-poster');
      });
    });

    if (this.reelsData.length > 0) {
      this.updateBackdrop(this.reelsData[0].posterUrl);
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: this.container,
      threshold: 0.65
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const reelId = entry.target.dataset.reelId;
        const video = this.videoElements.get(reelId);
        if (!video) return;

        if (entry.isIntersecting) {
          this.activeReelIndex = parseInt(entry.target.dataset.index, 10);
          this.playVideo(video);
          
          const currentReel = this.reelsData[this.activeReelIndex];
          if (currentReel) {
            this.updateBackdrop(currentReel.posterUrl);
          }
        } else {
          this.pauseVideo(video);
        }
      });
    }, options);

    const cards = this.container.querySelectorAll('.reel-card');
    cards.forEach(card => observer.observe(card));
  }

  playVideo(video) {
    video.muted = this.isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Autoplay restricted or video paused:', err);
      });
    }
  }

  pauseVideo(video) {
    video.pause();
    video.currentTime = 0;
  }

  togglePlayPause(card) {
    const reelId = card.dataset.reelId;
    const video = this.videoElements.get(reelId);
    if (!video) return;

    const indicator = card.querySelector('.play-pause-indicator');
    if (video.paused) {
      video.play();
      indicator.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>`;
    } else {
      video.pause();
      indicator.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>`;
    }

    indicator.classList.add('pulse');
    setTimeout(() => {
      indicator.classList.remove('pulse');
    }, 450);
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    
    this.videoElements.forEach(video => {
      video.muted = this.isMuted;
    });

    if (this.soundToggleBtn) {
      if (this.isMuted) {
        this.soundToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>`;
      } else {
        this.soundToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>`;
      }
    }
  }

  updateBackdrop(imageUrl) {
    if (this.feedBackdrop && imageUrl) {
      this.feedBackdrop.style.backgroundImage = `url("${imageUrl}")`;
    }
  }

  openShopDrawer(reelIndex) {
    const reel = this.reelsData[reelIndex];
    if (!reel || !this.drawerOverlay) return;

    const drawerTitle = document.getElementById('drawerReelTitle');
    const drawerSubtitle = document.getElementById('drawerReelSubtitle');
    if (drawerTitle) drawerTitle.textContent = reel.title;
    if (drawerSubtitle) drawerSubtitle.textContent = `${reel.products ? reel.products.length : 0} STYLED PIECES`;

    this.renderDrawerGarments(reel);
    this.drawerOverlay.classList.add('open');
  }

  closeShopDrawer() {
    if (this.drawerOverlay) {
      this.drawerOverlay.classList.remove('open');
    }
  }

  renderDrawerGarments(reel) {
    if (!this.drawerItemsContainer) return;
    this.drawerItemsContainer.innerHTML = '';

    const products = reel.products || [];
    if (products.length === 0) {
      this.drawerItemsContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-secondary); font-family: var(--font-mono); font-size: 11px;">
          NO GARMENTS CURRENTLY TAGGED IN THIS LOOK
        </div>`;
      return;
    }

    products.forEach(item => {
      const card = document.createElement('div');
      card.className = 'drawer-item-card';

      card.innerHTML = `
        <div class="drawer-item-thumb">
          <img src="${item.primaryImage}" alt="${item.name}" loading="lazy">
        </div>
        <div class="drawer-item-details">
          <div>
            <div class="drawer-item-brand">${item.brand} • ${item.category}</div>
            <div class="drawer-item-name">${item.name}</div>
            ${item.fitAdvice ? `<div class="drawer-item-advice">${item.fitAdvice}</div>` : ''}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.6rem;">
            <div class="drawer-item-price">₹ ${Number(item.priceEstimate).toLocaleString('en-IN')}</div>
            <button 
              class="btn-buy-primary" 
              data-outbound="true"
              data-product-id="${item.id}"
              data-reel-id="${reel.id}">
              BUY
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </div>
        </div>
      `;

      this.drawerItemsContainer.appendChild(card);
    });
  }

  bindGlobalEvents() {
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => this.toggleSound());
    }

    if (this.container) {
      this.container.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const card = target.closest('.reel-card');
        const reelIndex = card ? parseInt(card.dataset.index, 10) : 0;

        if (action === 'toggle-play') {
          this.togglePlayPause(card);
        } else if (action === 'open-drawer') {
          this.openShopDrawer(reelIndex);
        } else if (action === 'like-reel') {
          this.handleLike(card);
        } else if (action === 'share-reel') {
          this.handleShare(reelIndex);
        }
      });
    }

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', (e) => {
        if (e.target === this.drawerOverlay || e.target.closest('[data-action="close-drawer"]')) {
          this.closeShopDrawer();
        }
      });
    }

    const prevBtn = document.getElementById('feedPrevBtn');
    const nextBtn = document.getElementById('feedNextBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.scrollByReels(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.scrollByReels(1));
    }

    window.addEventListener('keydown', (e) => {
      const feedView = document.getElementById('feedView');
      if (!feedView || !feedView.classList.contains('active')) return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        this.scrollByReels(1);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        this.scrollByReels(-1);
      } else if (e.key === 'm') {
        this.toggleSound();
      } else if (e.key === 'Escape') {
        this.closeShopDrawer();
      }
    });
  }

  scrollByReels(delta) {
    const nextIndex = Math.max(0, Math.min(this.reelsData.length - 1, this.activeReelIndex + delta));
    const targetCard = this.container.querySelector(`.reel-card[data-index="${nextIndex}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleLike(card) {
    const reelId = card.dataset.reelId;
    const btn = card.querySelector('[data-action="like-reel"]');
    
    if (this.likedReels.has(reelId)) {
      this.likedReels.delete(reelId);
      btn.classList.remove('liked');
      btn.querySelector('svg').setAttribute('fill', 'none');
    } else {
      this.likedReels.add(reelId);
      btn.classList.add('liked');
      btn.querySelector('svg').setAttribute('fill', 'currentColor');
    }
  }

  handleShare(reelIndex) {
    const reel = this.reelsData[reelIndex];
    if (!reel) return;
    const shareUrl = `${window.location.origin}/#reel=${reel.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
  }

  formatViewCount(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return String(num);
  }
}

window.ReelFeedEngine = ReelFeedEngine;
