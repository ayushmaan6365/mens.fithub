/**
 * MEN'S FIT HUB • VERCEL SERVERLESS API ENGINE
 * Handles all REST endpoints, telemetry, customer intelligence, and affiliate redirects on Vercel
 */

const url = require('url');
const path = require('path');
const { db } = require('../packages/database/db.js');

module.exports = async (req, res) => {
  const host = req.headers.host || 'localhost';
  const parsedUrl = new URL(req.url, `http://${host}`);
  const pathname = parsedUrl.pathname || '/';
  
  // Extract query parameters
  const query = {};
  for (const [key, value] of parsedUrl.searchParams.entries()) {
    query[key] = value;
  }
  if (req.query) {
    Object.assign(query, req.query);
  }

  // Security Headers (PRD Section 12)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // CORS headers for client requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // =======================================================
  // PRD SECTION 5: OUTBOUND AFFILIATE REDIRECTION ENGINE
  // =======================================================
  if (pathname.includes('/redirect/')) {
    const parts = pathname.split('/');
    const redirectIdx = parts.indexOf('redirect');
    const retailer = (redirectIdx !== -1 && parts[redirectIdx + 1]) ? parts[redirectIdx + 1].toUpperCase() : 'AMAZON';
    const productId = query.productId;
    const reelId = query.reelId;

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
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'DirectClient';
    db.recordClick({ productId, retailer, reelId, ip, userAgent });

    // URL Resolution
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

  // =======================================================
  // API ROUTE: Telemetry Click Tracker
  // =======================================================
  if (pathname.endsWith('/track/click') && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    const click = db.recordClick({
      productId: body.productId,
      retailer: body.retailer,
      reelId: body.reelId,
      ip,
      userAgent: req.headers['user-agent'] || 'WebClient'
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, clickId: click.id }));
    return;
  }

  // =======================================================
  // API ROUTE: Published Reels
  // =======================================================
  if (pathname.endsWith('/reels')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getPublishedReels()));
    return;
  }

  // =======================================================
  // API ROUTE: Products Catalog
  // =======================================================
  if (pathname.endsWith('/products')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getProducts(query)));
    return;
  }

  // =======================================================
  // API ROUTE: Analytics Telemetry
  // =======================================================
  if (pathname.endsWith('/analytics')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getAnalytics()));
    return;
  }

  // =======================================================
  // API ROUTE: Customers & Order History (PRD Customer Intelligence)
  // =======================================================
  if (pathname.endsWith('/customers/login') && req.method === 'POST') {
    const body = await parseRequestBody(req);
    const customer = db.registerCustomerLogin(body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, customer }));
    return;
  }

  if (pathname.endsWith('/customers')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getCustomers(query.search || '')));
    return;
  }

  // =======================================================
  // API HEALTH CHECK / DEFAULT
  // =======================================================
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    name: "Men's Fit Hub API Engine",
    status: "healthy",
    version: "2.0.0",
    endpoints: [
      "/api/v1/reels",
      "/api/v1/products",
      "/api/v1/analytics",
      "/api/v1/customers",
      "/api/v1/customers/login",
      "/api/v1/redirect/:retailer",
      "/api/v1/track/click"
    ]
  }));
};

/**
 * Helper to safely extract JSON body across Vercel and native Node environments
 */
function parseRequestBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    if (typeof req.body === 'string') {
      try {
        return resolve(JSON.parse(req.body));
      } catch (e) {
        return resolve({});
      }
    }
    let data = '';
    req.on('data', chunk => { data += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}
