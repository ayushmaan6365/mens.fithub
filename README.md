# MEN'S FIT HUB • CORE BLUEPRINT & PLATFORM SPECIFICATION
**Document Ref**: `PRD-MFH-2026-V2`  
**Affiliate Scope**: Amazon India (`tag=mensfithub-21`), Flipkart (`affid=mensfithub`), Myntra  
**Aesthetic Style**: Luxury Editorial Lookbook / Haute Couture Minimalist (SSENSE, Zara Man)

---

## 1. System Vision & Zero-Template Directives
Men's Fit Hub is an editorial video-commerce web platform transforming Instagram fashion content into direct affiliate conversions. The platform strictly rejects generic AI-style website designs (cookie-cutter Bootstrap cards, noisy hero banners, and excessive drop-shadows) in favor of high-end editorial aesthetics (resembling SSENSE, Zara Man, and high-fashion lookbooks).

### Anti-AI Aesthetic Principles
* **Color Palette**: Deep Velvet Charcoal (`#09090B`), Pure Editorial Paper White (`#FFFFFF`), Neutral Gray Substrates (`#F4F4F5`), Fine Wireframe Borders (`#27272A` / `#E4E4E7`).
* **Forbidden Web Patterns**: Zero bubbly cartoon icons, zero generic SaaS card shadow glows, zero gradient text banners, and zero stock-looking testimonial carousels.
* **Micro-Interactions**: Subtle image scale (`1.02x`) on desktop hover; swift `200ms` spring-sheet slide-up for mobile shop drawers; hairline razor borders.
* **Haute Couture Typography**: Editorial grotesque & serif typography (`Syne`, `Cinzel`, `Plus Jakarta Sans`, `Space Grotesk`) with tracked uppercase metadata tags.

---

## 2. Monorepo Repository Topology
```
mens-fithub/
├── apps/
│   ├── storefront/                     # PUBLIC CLIENT WEB APP (mensfithub.com)
│   │   ├── index.html                  # Zero admin routes, buttons, or trace
│   │   ├── css/
│   │   │   ├── editorial.css           # Luxury design system & typography tokens
│   │   │   ├── feed.css                # 9:16 Snap-Scroll Video Engine & Shop Drawer
│   │   │   └── wardrobe.css            # 4-col/2-col Lookbook Grid & Seen-in-Reel
│   │   └── js/
│   │       ├── feed.js                 # Autoplay policy, mute toggle, gesture sync
│   │       ├── wardrobe.js             # Faceted taxonomy filter, search & modal player
│   │       └── affiliate-client.js     # Redirection protocol & telemetry dispatcher
│   └── admin/                          # PRIVATE CREATOR OPS CONSOLE (admin.mensfithub-ops.internal)
│       ├── index.html                  # Restricted origin with SSO + TOTP 2FA
│       ├── css/
│       │   └── admin.css               # High-efficiency dark studio dashboard
│       └── js/
│           ├── auth.js                 # Hardware MFA & RS256 token lifespan engine
│           ├── studio.js               # Reel ingestion, scrubber, garment mapper
│           ├── normalizer.js           # Amazon ASIN & Flipkart PID clean URL engine
│           └── analytics.js            # Real-time conversion metrics & clickstream
├── packages/
│   └── database/
│       ├── prisma-schema.prisma        # PostgreSQL 16 Prisma Schema definition
│       └── db.js                       # Unified relational model & state synchronization
├── server.js                           # Core Node.js HTTP server & 302 Redirection Engine
├── index.html                          # Master Monorepo Preview & Verification Environment
└── package.json
```

---

## 3. Core Architectural Invariants

### Customer App Invariant (Zero Admin Trace)
* No route handler matching `/admin`, `/login`, `/dashboard`, or `/portal` exists in the customer build bundle.
* Attempting to navigate to `/admin` on the public storefront domain yields an immediate `404 Not Found` error.
* Public site headers emit no administrative API documentation or backend trace.

### Security & Hardware MFA Invariant
* The Admin application resides on an isolated host or VPN subnet (`admin.mensfithub-ops.internal`).
* Authentication uses simulated RS256 JWT tokens with 15-minute expiration and mandatory TOTP 2-Factor Authentication.

### Multi-Retailer Affiliate Redirection Protocol
* Under no circumstances does the customer frontend link directly to vendor URLs with client-side parameters.
* Clicking "Buy on Amazon" or "Buy on Flipkart":
  1. Triggers telemetry logging an immutable `ClickEvent` (IP hash, User-Agent, referring Reel ID).
  2. Executes URL normalizer: strips tracking bloat and extracts clean identifier.
  3. Injects partner tag: `tag=mensfithub-21` (Amazon India) or `affid=mensfithub` (Flipkart).
  4. Executes direct handoff with `rel="sponsored noopener noreferrer"`.

---

## 4. Final Acceptance Verification Checklist (Section 14)
* **Check 1: Route & Asset Isolation** — Requesting `/admin` on `mensfithub.com` immediately returns `404 Not Found`.
* **Check 2: 60fps 9:16 Video Snap Scrolling** — Operates with `scroll-snap-type: y mandatory`, muted autoplay, sound toggle on top-right, and zero sound leakage between reels.
* **Check 3: Monetization Validation** — Tapping purchase passes `tag=mensfithub-21` / `affid=mensfithub` and records a telemetry click event.
* **Check 4: Real-Time State Sync** — Publishing a new reel or updating apparel in the Admin console updates the storefront state instantly.

---

## 5. How to Run Locally

### Option A: Via Node.js Server (Recommended)
```bash
node server.js
```
Open your browser to:
* **Master Environment**: `http://localhost:3000`
* **Customer Storefront**: `http://localhost:3000/storefront`
* **Admin Ops Console**: `http://localhost:3000/ops`

### Option B: Direct Browser Preview
Double-click or open `index.html` directly in any modern browser. All styles, fonts, videos, and relational data run natively with zero external build step dependencies!
