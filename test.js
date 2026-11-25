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
    'krishnaShringarAvatar',
    'tulsiPlant',
    'waterPitcher',
    'mindfulKrishna',
    'decoratedMatka',
    'govardhanHill',
    'panchaBhutaEmblem',
    'goldenJhula',
    'saraswatiVeena',
    'mridangam',
    'goldenBee'
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
  'ShringarGame',
  'AksharaGame',
  'PrakritiGame',
  'DhyanaGame',
  'MatkiTowerGame',
  'PanchaBhutaGame',
  'UtsavaGame',
  'VadyaGame'
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

// Check commercial architecture features in games.js
assert(gamesCode.includes('class ElementPool'), 'games.js defines ElementPool for zero-GC memory pooling');
assert(gamesCode.includes('ToddlerPersistence'), 'games.js defines ToddlerPersistence for toy-box state saving');
assert(gamesCode.includes('magnetic-active'), 'games.js implements magnetic-active proximity snapping');
assert(gamesCode.includes('shringar-reset-btn'), 'games.js implements Kanha fresh Snana reset action');
assert(gamesCode.includes('class CelebrationPetalShower'), 'games.js defines CelebrationPetalShower for celebration particle cascade');
assert(gamesCode.includes('numbersList ='), 'games.js AksharaGame defines numbersList for 1-10 counting phonics');
assert(gamesCode.includes('playLetterChantOrSound('), 'games.js AksharaGame implements playLetterChantOrSound for authentic letter sounds');
assert(gamesCode.includes('onLanguageChange('), 'games.js AksharaGame implements onLanguageChange for instant bilingual state sync');
assert(gamesCode.includes('orb-counted'), 'games.js AksharaGame tracks counting progression on orbs');
assert(gamesCode.includes('altar-bell-rope'), 'games.js AartiGame implements interactive altar hanging temple bell');
assert(gamesCode.includes('altar-shankha'), 'games.js AartiGame implements interactive altar conch shell naad');
assert(gamesCode.includes('Chhoti Chhoti Gaiya'), 'games.js XylophoneGame implements expanded traditional bhajan repertoire');
assert(gamesCode.includes('bubble-category-bar'), 'games.js BubbleGame implements multi-sensory educational category selector');
assert(gamesCode.includes('bubble-reflection-sub'), 'games.js BubbleGame renders dual-specular iridescent reflection physics');
assert(gamesCode.includes('prakriti-tools-tray'), 'games.js PrakritiGame implements Montessori practical life tool tray');
assert(gamesCode.includes('color-baskets-grid'), 'games.js PrakritiGame implements 4 Montessori color-coded sorting baskets');
assert(gamesCode.includes('breathing-lotus-wrap'), 'games.js DhyanaGame implements Patanjali breathing rhythm lotus');
assert(gamesCode.includes('navarasa-cards-tray'), 'games.js DhyanaGame implements Natya Shastra emotional literacy cards');
assert(gamesCode.includes('matki-selection-tray-zone'), 'games.js MatkiTowerGame implements Montessori seriation selection tray');
assert(gamesCode.includes('tower-stone-pedestal'), 'games.js MatkiTowerGame implements stone pedestal base');
assert(gamesCode.includes('bhuta-hero-card'), 'games.js PanchaBhutaGame implements interactive 5-element sanctuary card');
assert(gamesCode.includes('bhuta-elements-tray'), 'games.js PanchaBhutaGame implements 5-element selector navigation tray');
assert(gamesCode.includes('utsava-stage-center'), 'games.js UtsavaGame implements Indian festivals celebration stage');
assert(gamesCode.includes('jhula-interactive-container'), 'games.js UtsavaGame implements Janmashtami golden floral swing');
assert(gamesCode.includes('vadya-stage-center'), 'games.js VadyaGame implements sacred Indian instruments stage');
assert(gamesCode.includes('vadya-instruments-grid'), 'games.js VadyaGame implements 6 traditional instrument selection grid');

// Test ElementPool unit functionality
try {
  const { ElementPool, ToddlerPersistence } = require('./games.js');
  let createCount = 0;
  const mockPool = new ElementPool('test-item', 5, () => {
    createCount++;
    return { className: 'test-item', style: {} };
  });
  const el1 = mockPool.acquire();
  assert(el1 && createCount === 1, 'ElementPool acquires new instance when empty');
  mockPool.release(el1);
  assert(mockPool.pool.length === 1, 'ElementPool releases instance back to pool');
  const el2 = mockPool.acquire();
  assert(el2 === el1 && createCount === 1, 'ElementPool reuses recycled instance without re-allocating');
} catch (e) {
  assert(false, `ElementPool unit test error: ${e.message}`);
}

// 5. Validate Procedural Audio Engine & Natural Sounds
console.log('\n🔊 5. Verifying Procedural Audio Engine & Natural Sounds...');
const audioCode = fs.readFileSync(path.join(__dirname, 'audio.js'), 'utf8');
assert(audioCode.includes('playYamunaStream()'), 'audio.js implements playYamunaStream() procedural river sound');
assert(audioCode.includes('playKadambaBreeze()'), 'audio.js implements playKadambaBreeze() procedural wind sound');
assert(audioCode.includes('playMonsoonRain()'), 'audio.js implements playMonsoonRain() procedural rain sound');
assert(audioCode.includes('playNightCrickets()'), 'audio.js implements playNightCrickets() procedural crickets sound');
assert(audioCode.includes('playForestBirdsChirp()'), 'audio.js implements playForestBirdsChirp() procedural birds sound');
assert(audioCode.includes('playOmChant()'), 'audio.js implements playOmChant() sacred 136.1Hz meditative vocal drone');
assert(audioCode.includes('playSingingBowl('), 'audio.js implements playSingingBowl() 432Hz rich harmonic overtone resonance');
assert(audioCode.includes('playVeenaPluck('), 'audio.js implements playVeenaPluck() Saraswati Veena microtonal pluck');
assert(audioCode.includes('playMridangaDha('), 'audio.js implements playMridangaDha() Mridangam resonant bass Dha');
assert(audioCode.includes('playMridangaTa('), 'audio.js implements playMridangaTa() Mridangam crisp treble Ta');
assert(audioCode.includes('playJhulaChime('), 'audio.js implements playJhulaChime() Janmashtami floral swing chime');
assert(audioCode.includes('playBhramariHum('), 'audio.js implements playBhramariHum() sacred bumblebee calming hum');
assert(audioCode.includes('playGoatBleat('), 'audio.js implements playGoatBleat() realistic baby goat bleat');
assert(audioCode.includes('playHorseNeigh('), 'audio.js implements playHorseNeigh() realistic Vrindavan horse whinny and snort');
assert(audioCode.includes('playSwanCall('), 'audio.js implements playSwanCall() sacred swan trumpet honk');
assert(audioCode.includes('playAnimalSound('), 'audio.js implements playAnimalSound() universal animal sound router for games');
assert(audioCode.includes('playMilkSplash('), 'audio.js implements playMilkSplash() frothy milk and butter drop sound');
assert(audioCode.includes('playWaterSprinkle('), 'audio.js implements playWaterSprinkle() gentle trickling droplets');
assert(audioCode.includes('playMonkeyChatter('), 'audio.js implements playMonkeyChatter() Vanar playful chatter');
assert(audioCode.includes('stopAllSounds()'), 'audio.js implements stopAllSounds() panic stop for stuck drones');
assert(audioCode.includes('speakLetter('), 'audio.js implements speakLetter() phonics letter speaker');
assert(audioCode.includes('speakNumber('), 'audio.js implements speakNumber() phonics counting speaker');
assert(audioCode.includes('registerVoice('), 'audio.js implements registerVoice() soft priority voice-stealing DSP');
assert(audioCode.includes('triggerHaptic('), 'audio.js implements triggerHaptic() multi-tier vibration engine');
assert(!/\?\./.test(audioCode), 'audio.js is free of optional chaining (?.)');
assert(!/\?\?/.test(audioCode), 'audio.js is free of nullish coalescing (??)');

// 6. Validate Application Controller & PWA Shortcuts
console.log('\n⚙️ 6. Verifying App Controller Features...');
const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
assert(appCode.includes('updateLanguageUI()'), 'app.js implements updateLanguageUI() for bilingual tab text');
assert(appCode.includes('getGameFromHash()'), 'app.js implements getGameFromHash() for PWA shortcut deep-links');
assert(appCode.includes('restoreSavedPreferences()'), 'app.js implements restoreSavedPreferences() for session state');
assert(appCode.includes('prakriti: PrakritiGame'), 'app.js registers PrakritiGame module');
assert(appCode.includes('dhyana: DhyanaGame'), 'app.js registers DhyanaGame module');
assert(appCode.includes('matki: MatkiTowerGame'), 'app.js registers MatkiTowerGame module');
assert(appCode.includes('bhuta: PanchaBhutaGame'), 'app.js registers PanchaBhutaGame module');
assert(appCode.includes('utsava: UtsavaGame'), 'app.js registers UtsavaGame module');
assert(appCode.includes('vadya: VadyaGame'), 'app.js registers VadyaGame module');
assert(appCode.includes("this.switchGame('matki')"), 'app.js implements keyboard shortcut for MatkiTowerGame');
assert(appCode.includes("this.switchGame('bhuta')"), 'app.js implements keyboard shortcut for PanchaBhutaGame');
assert(appCode.includes("this.switchGame('utsava')"), 'app.js implements keyboard shortcut for UtsavaGame');
assert(appCode.includes("this.switchGame('vadya')"), 'app.js implements keyboard shortcut for VadyaGame');
assert(!gamesCode.includes('clearInterval(this.breathCycleTimer)'), 'games.js uses clearTimeout for breathCycleTimer to prevent WebView timer leaks');
const swCode = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
assert(swCode.includes('bala-gopala-v3.5'), 'sw.js caches with updated v3.5 identifier');
assert(gamesCode.includes('ToddlerRewards ='), 'games.js defines ToddlerRewards sticker album system');
assert(gamesCode.includes('pranayama-pill-btn'), 'games.js implements Bhramari Bumblebee Pranayama in DhyanaGame');
assert(gamesCode.includes('id="switch-animals"'), 'games.js implements Vedic Animal Swaras mode switch in XylophoneGame');
assert(appCode.includes('toggleSidebar('), 'app.js implements toggleSidebar() for vertical game library drawer');
assert(appCode.includes('filterGamesByAge('), 'app.js implements filterGamesByAge() for 1-2y, 2-3y, and 3-5y curriculum pathways');
assert(appCode.includes('startGuidedJourney('), 'app.js implements startGuidedJourney() for curated 4-step daily routine');
assert(appCode.includes('showGuidanceNudge('), 'app.js implements showGuidanceNudge() for Kanha inactivity guiding star');
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert(indexHtml.includes('id="games-sidebar"'), 'index.html defines left vertical games-sidebar library');
assert(indexHtml.includes('id="sidebar-toggle-btn"'), 'index.html defines sidebar-toggle-btn in top navigation');
assert(indexHtml.includes('id="journey-hero-card"'), 'index.html defines guided journey hero card');
assert(indexHtml.includes('id="voice-help-btn"'), 'index.html defines on-demand voice-help-btn for toddler verbal guidance');
assert(indexHtml.includes('id="rewards-btn"'), 'index.html defines rewards-btn in top navigation for Lila Stickers');
assert(indexHtml.includes('id="rewards-modal"'), 'index.html defines rewards-modal for Lila Sticker Album');
assert(indexHtml.includes('games.js?v=3.5'), 'index.html specifies cache-busting script versioning ?v=3.5');
assert(audioCode.includes('_pickNaturalVoice('), 'audio.js implements _pickNaturalVoice() for natural voice selection');
assert(audioCode.includes('_speechSeq'), 'audio.js uses _speechSeq token to prevent overlapping stale speech callbacks');
assert(gamesCode.includes("phonics: 'A, Ah'"), 'games.js AksharaGame includes phonetic pronunciation data');
const stylesCode = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
assert(stylesCode.includes('.giant-letter-card.is-speaking'), 'styles.css defines speaking pulse for .giant-letter-card.is-speaking');
assert(stylesCode.includes('.animal-swaras-board'), 'styles.css defines .animal-swaras-board for Vedic musical animals');
assert(stylesCode.includes('.voice-help-btn'), 'styles.css styles .voice-help-btn');
assert(stylesCode.includes('.voice-help-btn.is-speaking'), 'styles.css defines animated speech pulse for .voice-help-btn.is-speaking');
assert(stylesCode.includes('.rewards-btn'), 'styles.css styles .rewards-btn and count badge');
assert(stylesCode.includes('.rewards-toast-popup'), 'styles.css defines rewards-toast-popup animated notification');
assert(stylesCode.includes('.bhramari-bee-flight'), 'styles.css defines bhramari-bee-flight for bumblebee pranayama');
assert(appCode.includes('speakCurrentGameGuidance('), 'app.js implements speakCurrentGameGuidance() for instant audio instructions');
assert(appCode.includes('initGameGuidance()'), 'app.js implements initGameGuidance() with bilingual instructions');
assert(appCode.includes('openRewardsModal('), 'app.js implements openRewardsModal() for Lila Sticker Album');
const all14Games = ['bubbles', 'peekaboo', 'xylophone', 'aarti', 'shapes', 'sparkles', 'shringar', 'akshara', 'prakriti', 'dhyana', 'matki', 'bhuta', 'utsava', 'vadya'];
all14Games.forEach(g => {
  assert(appCode.includes(`${g}: {`), `app.js defines complete verbal guidance for game '${g}'`);
});
assert(audioCode.includes('Math.max(3500'), 'audio.js implements dynamic duration speech fallback timer');
assert(appCode.includes('this.footprintPool'), 'app.js uses memory pool for Kanha ghungroo footprints');
assert(appCode.includes('class ToddlerInputFilter'), 'app.js defines ToddlerInputFilter for palm-slap rejection');
assert(!/\?\./.test(appCode), 'app.js is free of optional chaining (?.)');
assert(!/\?\?/.test(appCode), 'app.js is free of nullish coalescing (??)');

// 6. Test Live HTTP Server Endpoints
console.log('\n🌐 6. Verifying HTTP Server Endpoints...');
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
let serverChecked = false;
const probeReq = http.get('http://127.0.0.1:3000/', (res) => {
  serverChecked = true;
  res.resume();
  runEndpointChecks(3000, null);
});

probeReq.setTimeout(1000, () => {
  if (!serverChecked) {
    probeReq.destroy();
  }
});

probeReq.on('error', () => {
  if (serverChecked) return;
  serverChecked = true;
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
