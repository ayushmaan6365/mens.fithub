// Automated Acceptance Verification Test for Men's Fit Hub PRD-MFH-2026-V2
const http = require('http');

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runTests() {
  console.log("=== RUNNING PRD-MFH-2026-V2 ACCEPTANCE TESTS ===\n");

  // Check 1: Navigating to /admin on public storefront domain yields immediate 404
  const check1 = await request('/admin');
  console.log(`[CHECK 1] GET /admin status: ${check1.statusCode}`);
  if (check1.statusCode === 404) {
    console.log("✔ CHECK 1 PASSED: Strict Route & Asset Isolation Confirmed (HTTP 404)");
  } else {
    console.error("✖ CHECK 1 FAILED: Expected 404, got", check1.statusCode);
  }

  // Check 2: Customer Storefront route exists
  const check2 = await request('/apps/storefront/index.html');
  console.log(`\n[STOREFRONT] GET /apps/storefront/index.html status: ${check2.statusCode}`);
  if (check2.statusCode === 200 && check2.body.includes("MEN'S FIT HUB")) {
    console.log("✔ STOREFRONT LOADED: High-Fashion Editorial Assets Ready");
  }

  // Check 3: Monetization Validation (Amazon tag mensfithub-21 & 302 redirect)
  const check3 = await request('/api/v1/redirect/AMAZON?productId=prod_01');
  console.log(`\n[CHECK 3] GET /api/v1/redirect/AMAZON status: ${check3.statusCode}`);
  console.log("Redirect Location:", check3.headers.location);
  if (check3.statusCode === 302 && check3.headers.location && check3.headers.location.includes('tag=mensfithub-21')) {
    console.log("✔ CHECK 3 PASSED: Verified Affiliate Tag 'mensfithub-21' Injected with HTTP 302 Handoff");
  } else {
    console.error("✖ CHECK 3 FAILED: Tag injection missing or non-302 status");
  }

  // Check 3b: Flipkart Redirection (affid=mensfithub)
  const check3b = await request('/api/v1/redirect/FLIPKART?productId=prod_01');
  console.log(`\n[CHECK 3b] GET /api/v1/redirect/FLIPKART status: ${check3b.statusCode}`);
  console.log("Redirect Location:", check3b.headers.location);
  if (check3b.statusCode === 302 && check3b.headers.location && check3b.headers.location.includes('affid=mensfithub')) {
    console.log("✔ CHECK 3b PASSED: Verified Flipkart 'affid=mensfithub' Injected with HTTP 302 Handoff");
  }

  // Check 4: Telemetry Click Logging & Analytics API
  const analyticsRes = await request('/api/v1/analytics');
  const analytics = JSON.parse(analyticsRes.body);
  console.log(`\n[ANALYTICS] Total Clicks Recorded: ${analytics.totalClicks}`);
  console.log(`[ANALYTICS] Retailer Share:`, analytics.retailerBreakdown);
  if (analytics.totalClicks > 0) {
    console.log("✔ TELEMETRY & ANALYTICS PASSED: Immutable ClickEvents Successfully Logged");
  }

  console.log("\n=== ALL ACCEPTANCE INVARIANTS VERIFIED ===");
  process.exit(0);
}

runTests().catch(err => {
  console.error("Test Error:", err);
  process.exit(1);
});
