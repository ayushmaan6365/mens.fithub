/**
 * MEN'S FIT HUB • CONTENT MANAGEMENT & PUBLISHING STUDIO
 * PRD Ref: PRD-MFH-2026-V2 (Section 9: Workflows 1, 2, 4)
 * Video Ingestion, Timeline Scrubber, Garment Entity Manager, Reel-to-Garment Linking
 */

class PublishingStudio {
  constructor() {
    this.videoUrlInput = document.getElementById('reelVideoUrl');
    this.videoScrubber = document.getElementById('timelineScrubber');
    this.previewVideo = document.getElementById('studioPreviewVideo');
    this.scrubTimeDisplay = document.getElementById('scrubTimeDisplay');
    this.saveReelBtn = document.getElementById('saveReelBtn');
    this.saveProductBtn = document.getElementById('saveProductBtn');
    this.garmentPickerList = document.getElementById('garmentPickerList');

    this.selectedGarmentIds = new Set();

    this.init();
  }

  init() {
    this.bindScrubberEvents();
    this.renderGarmentPicker();
    this.bindFormEvents();
    this.renderExistingLists();
  }

  bindScrubberEvents() {
    if (this.videoUrlInput && this.previewVideo) {
      this.videoUrlInput.addEventListener('change', () => {
        const url = this.videoUrlInput.value.trim();
        if (url) {
          this.previewVideo.src = url;
          this.previewVideo.load();
        }
      });
    }

    if (this.previewVideo && this.videoScrubber) {
      this.previewVideo.addEventListener('loadedmetadata', () => {
        this.videoScrubber.max = this.previewVideo.duration;
        this.videoScrubber.value = 0;
        this.updateScrubDisplay(0);
      });

      this.videoScrubber.addEventListener('input', (e) => {
        const time = parseFloat(e.target.value);
        this.previewVideo.currentTime = time;
        this.updateScrubDisplay(time);
      });
    }
  }

  updateScrubDisplay(time) {
    if (this.scrubTimeDisplay) {
      this.scrubTimeDisplay.textContent = `POSTER FRAME: ${time.toFixed(1)}s // PREVIEW LOCK`;
    }
  }

  renderGarmentPicker() {
    if (!this.garmentPickerList || !window.MFH_DATABASE) return;
    this.garmentPickerList.innerHTML = '';

    const products = window.MFH_DATABASE.products;
    products.forEach(p => {
      const item = document.createElement('div');
      item.className = `picker-item ${this.selectedGarmentIds.has(p.id) ? 'selected' : ''}`;
      item.dataset.productId = p.id;

      item.innerHTML = `
        <img class="picker-thumb" src="${p.primaryImage}" alt="${p.name}">
        <div style="flex: 1;">
          <div style="font-family: var(--font-mono); font-size: 9px; color: var(--admin-text-sub);">${p.brand} • ${p.category}</div>
          <div style="font-weight: 600; font-size: 11px;">${p.name}</div>
          <div style="font-family: var(--font-mono); font-size: 10px; color: var(--admin-accent-gold);">₹ ${Number(p.priceEstimate).toLocaleString('en-IN')}</div>
        </div>
        <div style="font-family: var(--font-mono); font-size: 10px; color: ${this.selectedGarmentIds.has(p.id) ? 'var(--admin-accent-green)' : 'var(--admin-text-muted)'};">
          ${this.selectedGarmentIds.has(p.id) ? 'PINNED' : '+ PIN'}
        </div>
      `;

      item.addEventListener('click', () => {
        if (this.selectedGarmentIds.has(p.id)) {
          this.selectedGarmentIds.delete(p.id);
        } else {
          if (this.selectedGarmentIds.size >= 8) {
            alert("Maximum 8 garments allowed per Reel (PRD Workflow 4)");
            return;
          }
          this.selectedGarmentIds.add(p.id);
        }
        this.renderGarmentPicker();
        this.updatePinnedCountDisplay();
      });

      this.garmentPickerList.appendChild(item);
    });

    this.updatePinnedCountDisplay();
  }

  updatePinnedCountDisplay() {
    const el = document.getElementById('pinnedCountText');
    if (el) {
      el.textContent = `${this.selectedGarmentIds.size} / 8 GARMENTS PINNED (MINIMUM 1 REQUIRED TO PUBLISH)`;
      el.style.color = this.selectedGarmentIds.size > 0 ? 'var(--admin-accent-green)' : 'var(--admin-accent-red)';
    }
  }

  bindFormEvents() {
    // 1. Reel Ingestion Submission
    if (this.saveReelBtn) {
      this.saveReelBtn.addEventListener('click', () => {
        const title = document.getElementById('reelTitle').value.trim();
        const videoUrl = document.getElementById('reelVideoUrl').value.trim();
        const posterUrl = document.getElementById('reelPosterUrl').value.trim();
        const caption = document.getElementById('reelCaption').value.trim();
        const tags = document.getElementById('reelTags').value.trim();
        const isPublished = document.getElementById('reelPublishCheck').checked;

        if (!title || !videoUrl) {
          alert('Reel Title and 9:16 Video URL are strictly required.');
          return;
        }

        // PRD Section 9, Rule 4: Must pin at least 1 garment before isPublished can be true
        if (isPublished && this.selectedGarmentIds.size < 1) {
          alert('Invariant Violation: Must pin at least 1 garment before a Reel can be toggled to isPublished: true.');
          return;
        }

        const newReel = window.MFH_DATABASE.createReel({
          title,
          videoUrl,
          posterUrl: posterUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
          caption,
          tags,
          isPublished,
          itemIds: Array.from(this.selectedGarmentIds)
        });

        alert(`Reel "${newReel.title}" ingested successfully! State sync active.`);
        
        // Reset Form
        document.getElementById('reelTitle').value = '';
        this.selectedGarmentIds.clear();
        this.renderGarmentPicker();
        this.renderExistingLists();

        // Check 4 validation trigger
        if (window.opener && window.opener.FeedInstance) {
          window.opener.FeedInstance.loadReels();
        }
      });
    }

    // 2. Garment Entity Submission
    if (this.saveProductBtn) {
      this.saveProductBtn.addEventListener('click', () => {
        const name = document.getElementById('prodName').value.trim();
        const brand = document.getElementById('prodBrand').value.trim();
        const category = document.getElementById('prodCategory').value;
        const fitType = document.getElementById('prodFitType').value;
        const price = document.getElementById('prodPrice').value;
        const primaryImage = document.getElementById('prodImage').value.trim();
        const fitAdvice = document.getElementById('prodFitAdvice').value.trim();
        const amazonUrl = document.getElementById('prodAmazonUrl').value.trim();
        const flipkartUrl = document.getElementById('prodFlipkartUrl').value.trim();

        if (!name || !brand || !primaryImage) {
          alert('Garment Name, Brand, and Primary 3:4 Image are required.');
          return;
        }

        const affiliateLinks = [];
        if (amazonUrl) {
          const norm = window.MFH_DATABASE.normalizeAffiliateUrl(amazonUrl, 'AMAZON');
          affiliateLinks.push({
            retailer: 'AMAZON',
            rawUrl: amazonUrl,
            affiliateUrl: norm.normalizedUrl,
            tag: norm.partnerTag,
            isActive: true
          });
        }
        if (flipkartUrl) {
          const norm = window.MFH_DATABASE.normalizeAffiliateUrl(flipkartUrl, 'FLIPKART');
          affiliateLinks.push({
            retailer: 'FLIPKART',
            rawUrl: flipkartUrl,
            affiliateUrl: norm.normalizedUrl,
            tag: norm.partnerTag,
            isActive: true
          });
        }

        const product = window.MFH_DATABASE.createProduct({
          name,
          brand,
          category,
          fitType,
          priceEstimate: parseFloat(price) || 2999,
          primaryImage,
          fitAdvice,
          affiliateLinks
        });

        alert(`Garment entity "${product.name}" created with SKU ${product.sku}!`);
        
        // Reset
        document.getElementById('prodName').value = '';
        document.getElementById('prodBrand').value = '';
        document.getElementById('prodImage').value = '';
        this.renderGarmentPicker();
        this.renderExistingLists();
      });
    }
  }

  renderExistingLists() {
    // Render existing reels in studio table
    const tableBody = document.getElementById('reelsTableBody');
    if (!tableBody || !window.MFH_DATABASE) return;

    tableBody.innerHTML = '';
    const reels = window.MFH_DATABASE.getAllReels();

    reels.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="font-weight: 600;">${r.title}</div>
          <div style="color: var(--admin-text-sub); font-size: 9px;">ID: ${r.id}</div>
        </td>
        <td>
          <span style="display: inline-block; padding: 2px 6px; font-size: 9px; background: ${r.isPublished ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${r.isPublished ? 'var(--admin-accent-green)' : 'var(--admin-accent-red)'};">
            ${r.isPublished ? 'PUBLISHED' : 'DRAFT'}
          </span>
        </td>
        <td>${r.itemIds ? r.itemIds.length : 0} ITEMS</td>
        <td>${Number(r.viewCount || 0).toLocaleString()}</td>
        <td>
          <button class="btn-admin-outline" style="padding: 2px 6px; font-size: 9px;" onclick="alert('Editing ${r.id}')">EDIT</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }
}

window.PublishingStudio = PublishingStudio;
