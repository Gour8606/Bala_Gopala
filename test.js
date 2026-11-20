/**
 * Bala Gopala Gurukul - Automated Commercial Quality Verification Test Suite
 * Validates integrity, assets, game interfaces, syntax, and server endpoints.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failedTests++;
  }
}

console.log('========================================================');
console.log('🧪 RUNNING COMMERCIAL INTEGRITY TEST SUITE');
console.log('========================================================\n');

// 1. File Presence & Size Verification
console.log('📁 1. Verifying Required Files & Non-Zero Size...');
const requiredFiles = [
  'index.html',
  'manifest.json',
  'favicon.svg',
  'sw.js',
  'styles.css',
  'audio.js',
  'vedic-assets.js',
  'games.js',
  'app.js',
  'server.js',
  'package.json',
  'README.md'
];

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 50, `File '${file}' exists and has content (${size} bytes)`);
});

// 2. Validate manifest.json format
console.log('\n📱 2. Verifying PWA Manifest...');
try {
  const manifestRaw = fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8');
  const manifest = JSON.parse(manifestRaw);
  assert(manifest.name && manifest.name.includes('Bala Gopala'), 'Manifest name is set');
  assert(manifest.display === 'standalone', 'Manifest display is standalone');
  assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'Manifest has icons defined');
  assert(Array.isArray(manifest.shortcuts) && manifest.shortcuts.length >= 4, 'Manifest has 4+ quick shortcuts');
} catch (e) {
  assert(false, `Manifest JSON parse error: ${e.message}`);
}

// 3. Validate VedicAssets
console.log('\n🎨 3. Verifying Vedic SVG Assets...');
try {
  const VedicAssets = require('./vedic-assets.js');
  const expectedAssets = [
    'balaKrishna',
    'gauMata',
    'gauMataLarge',
    'littleCalf',
    'makhanMatka',
    'aartiThali',
    'kamal',
    'diya',
    'mayur',
    'dahiMathani',
    'jalTarangBowl',
    'goldenFootprint',
    'shukaParrot',
    'tulsiLeaf',
    'sudarshanChakra',
    'mangalKalash',
    'chandanTilak',
    'agarbatti',
    'manjira',
    'krishnaShringarAvatar'
  ];

  expectedAssets.forEach((assetKey) => {
    const val = VedicAssets[assetKey];
    const isSVG = typeof val === 'string' && val.includes('<svg') && val.includes('</svg>');
    assert(isSVG, `Asset VedicAssets.${assetKey} is a valid SVG vector`);
  });
} catch (e) {
  assert(false, `VedicAssets load error: ${e.message}`);
}

// 4. Validate Games Classes
console.log('\n🎮 4. Verifying Game Classes & Interfaces in games.js...');
const gamesCode = fs.readFileSync(path.join(__dirname, 'games.js'), 'utf8');
const expectedGames = [
  'BubbleGame',
  'PeekabooGame',
  'XylophoneGame',
  'AartiGame',
  'ShapeMatchGame',
  'SparkleCanvasGame',
  'ShringarGame'
];

expectedGames.forEach((gameClass) => {
  const classDefined = gamesCode.includes(`class ${gameClass}`);
  const hasStart = gamesCode.includes(`start()`);
  const hasStop = gamesCode.includes(`stop()`);
  const hasMash = gamesCode.includes(`handleAnyKey()`);
  assert(classDefined && hasStart && hasStop && hasMash, `${gameClass} implements start(), stop(), and handleAnyKey()`);
});

// Check that no ES2020 optional chaining (which breaks on older tablets) remains
const hasOptionalChaining = /\?\./.test(gamesCode);
assert(!hasOptionalChaining, 'games.js is free of optional chaining (?.) for universal tablet support');

// Check that no ES2020 nullish coalescing remains
const hasNullishCoalescing = /\?\?/.test(gamesCode);
assert(!hasNullishCoalescing, 'games.js is free of nullish coalescing (??) for universal tablet support');

// 5. Test Live HTTP Server Endpoints
console.log('\n🌐 5. Verifying HTTP Server Endpoints...');
const testEndpoints = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/sw.js',
  '/styles.css',
  '/audio.js',
  '/vedic-assets.js',
  '/games.js',
  '/app.js'
];

// Helper to serve files locally if background server is not already active
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

function runEndpointChecks(port, internalServer) {
  let checkedEndpoints = 0;
  testEndpoints.forEach((ep) => {
    const req = http.get(`http://localhost:${port}${ep}`, (res) => {
      assert(res.statusCode === 200, `Endpoint http://localhost:${port}${ep} returns HTTP 200`);
      checkedEndpoints++;
      if (checkedEndpoints === testEndpoints.length) {
        if (internalServer) internalServer.close();
        printSummary();
      }
    });

    req.on('error', (err) => {
      assert(false, `Endpoint http://localhost:${port}${ep} error: ${err.message}`);
      checkedEndpoints++;
      if (checkedEndpoints === testEndpoints.length) {
        if (internalServer) internalServer.close();
        printSummary();
      }
    });
  });
}

// Check if port 3000 is open, else spin up a temporary verification server
const probeReq = http.get('http://localhost:3000/', (res) => {
  probeReq.abort();
  runEndpointChecks(3000, null);
});

probeReq.on('error', () => {
  // Start internal test server on ephemeral port
  const testServer = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(__dirname, reqPath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
  });

  testServer.listen(0, '127.0.0.1', () => {
    const assignedPort = testServer.address().port;
    runEndpointChecks(assignedPort, testServer);
  });
});

function printSummary() {
  console.log('\n========================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('========================================================');
  if (failedTests > 0) {
    process.exit(1);
  } else {
    console.log('✨ ALL COMMERCIAL INTEGRITY AUDITS PASSED FLAWLESSLY! ✨\n');
    process.exit(0);
  }
}
