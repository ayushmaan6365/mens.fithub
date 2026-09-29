/**
 * MEN'S FIT HUB • CORE UNIFIED SERVER & REDIRECTION ENGINE
 * PRD Ref: PRD-MFH-2026-V2 (PostgreSQL / Prisma / Node.js Core API)
 * Enforces Architectural Isolation Invariants & Multi-Retailer Affiliate Redirection Protocol
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { db } = require('./packages/database/db.js');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const host = req.headers.host || '';

  // Zero Information Leak Header (PRD Section 12)
  res.removeHeader('X-Powered-By');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // =======================================================
  // DEDICATED ADMIN PORTAL & ROUTE ISOLATION
  // =======================================================
  if (pathname === '/admin' || pathname === '/admin.html' || pathname === '/ops') {
    serveFile(res, path.join(__dirname, 'admin.html'));
    return;
  }

  // =======================================================
  // CUSTOMER AUTHENTICATION (LOGIN / SIGN UP)
  // =======================================================
  if (pathname === '/login' || pathname === '/login.html' || pathname === '/signup' || pathname === '/auth') {
    serveFile(res, path.join(__dirname, 'login.html'));
    return;
  }

  // =======================================================
  // PRD SECTION 5: OUTBOUND AFFILIATE REDIRECTION ENGINE
  // Step 1: User Click -> Step 2: Telemetry -> Step 3: URL Resolution -> Step 4: Direct 302 Handoff
  // =======================================================
  if (pathname.startsWith('/api/v1/redirect/')) {
    const retailer = pathname.split('/')[4] || 'AMAZON';
    const productId = parsedUrl.query.productId;
    const reelId = parsedUrl.query.reelId;

    if (!productId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'productId parameter is strictly required' }));
      return;
    }

    const product = db.getProductById(productId);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Product entity not found' }));
      return;
    }

    // Record Telemetry
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'DirectClient';
    db.recordClick({ productId, retailer, reelId, ip, userAgent });

    // URL Resolution: Clean ASIN/PID & inject verified partner tag
    const linkObj = product.affiliateLinks.find(l => l.retailer.toUpperCase() === retailer.toUpperCase());
    const rawUrl = linkObj ? linkObj.rawUrl : `https://www.${retailer.toLowerCase()}.com`;
    const normalized = db.normalizeAffiliateUrl(rawUrl, retailer);

    // Direct HTTP 302 Handoff
    res.writeHead(302, {
      'Location': normalized.normalizedUrl,
      'Rel': 'sponsored noopener noreferrer',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end();
    return;
  }

  // API Route: Ingest Click Event
  if (pathname === '/api/v1/track/click' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        const click = db.recordClick({
          productId: payload.productId,
          retailer: payload.retailer,
          reelId: payload.reelId,
          ip,
          userAgent: req.headers['user-agent'] || 'WebClient'
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, clickId: click.id }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // API Route: Published Reels
  if (pathname === '/api/v1/reels') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getPublishedReels()));
    return;
  }

  // API Route: Products
  if (pathname === '/api/v1/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getProducts(parsedUrl.query)));
    return;
  }

  // API Route: Analytics
  if (pathname === '/api/v1/analytics') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getAnalytics()));
    return;
  }

  // API Route: Customers & Order History (PRD Ref: Admin Customer Intelligence)
  if (pathname === '/api/v1/customers') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getCustomers(parsedUrl.query.search || '')));
    return;
  }

  if (pathname === '/api/v1/customers/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const customer = db.registerCustomerLogin(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, customer }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // =======================================================
  // ROUTE SEPARATION: Customer Storefront vs Dedicated Admin Portal
  // =======================================================
  let filePath = '';

  if (pathname === '/' || pathname === '/index.html' || pathname === '/storefront') {
    filePath = path.join(__dirname, 'index.html');
  } else if (pathname === '/admin' || pathname === '/admin.html' || pathname === '/ops') {
    filePath = path.join(__dirname, 'admin.html');
  } else {
    filePath = path.join(__dirname, pathname);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback check in apps/storefront or apps/admin
      const storefrontPath = path.join(__dirname, 'apps', 'storefront', pathname);
      if (fs.existsSync(storefrontPath) && fs.statSync(storefrontPath).isFile()) {
        serveFile(res, storefrontPath);
        return;
      }

      const adminPath = path.join(__dirname, 'apps', 'admin', pathname);
      if (fs.existsSync(adminPath) && fs.statSync(adminPath).isFile()) {
        serveFile(res, adminPath);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    serveFile(res, filePath);
  });
});

function serveFile(res, targetPath) {
  const ext = path.extname(targetPath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(targetPath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  MEN'S FIT HUB • CORE EDITORIAL PLATFORM READY`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Storefront: http://localhost:${PORT}/storefront`);
  console.log(`  Admin Ops:  http://localhost:${PORT}/ops`);
  console.log(`======================================================\n`);
});
