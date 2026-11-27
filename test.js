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
  'VadyaGame',
  'PatternMalaGame',
  'DinacharyaGame',
  'HabitatGame',
  'BalaYogaGame',
  'RituChakraGame',
  'KolamSymmetryGame',
  'SanskaraValuesGame',
  'MandirBuilderGame'
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
assert(/CACHE_VERSION = '\d+\.\d+'/.test(swCode) && swCode.includes("'bala-gopala-v' + CACHE_VERSION"), 'sw.js names its cache from a single CACHE_VERSION');
assert(swCode.includes('ignoreSearch: true'), 'sw.js uses ignoreSearch: true for reliable offline cache-busted asset hits');
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
assert(/games\.js\?v=\d+\.\d+/.test(indexHtml), 'index.html specifies cache-busting script versioning ?v=');
assert(indexHtml.includes('id="story-modal"'), 'index.html defines interactive Bala Lila Storyteller modal');
assert(indexHtml.includes('id="ambience-btn"'), 'index.html defines Vrindavan Nature Ambience toggle button');
assert(audioCode.includes('toggleNatureAmbience('), 'audio.js implements toggleNatureAmbience() for Vrindavan ambience');
assert(gamesCode.includes('prepareQuizRound('), 'games.js AksharaGame implements Find It phonics quiz mode');
assert(appCode.includes('openStoryModal('), 'app.js implements openStoryModal() for Bala Lila animated stories');
assert(audioCode.includes('playHarmoniumNote('), 'audio.js implements playHarmoniumNote() for warm temple harmonium melody');
assert(audioCode.includes('_aartiBeatInterval'), 'audio.js implements Kaharwa Taal rhythm clock for Aarti');
assert(audioCode.includes('chantAarti('), 'audio.js implements chantAarti() for real line-by-line Aarti chanting');
assert(audioCode.includes('stopAarti('), 'audio.js implements stopAarti() for clean Aarti stop');
assert(gamesCode.includes('id="btn-sing-aarti"'), 'games.js AartiGame includes Sing Full Aarti toggle button');
assert(audioCode.includes('_pickNaturalVoice('), 'audio.js implements _pickNaturalVoice() for natural voice selection');
assert(audioCode.includes('_speechSeq'), 'audio.js uses _speechSeq token to prevent overlapping stale speech callbacks');
assert(gamesCode.includes("phonics: 'A, Ah'"), 'games.js AksharaGame includes phonetic pronunciation data');
const stylesCode = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
assert(stylesCode.includes('.giant-letter-card.is-speaking'), 'styles.css defines speaking pulse for .giant-letter-card.is-speaking');
assert(stylesCode.includes('.aarti-sing-btn'), 'styles.css styles .aarti-sing-btn for real Aarti chanting');
assert(stylesCode.includes('.animal-swaras-board'), 'styles.css defines .animal-swaras-board for Vedic musical animals');
assert(stylesCode.includes('.voice-help-btn'), 'styles.css styles .voice-help-btn');
assert(stylesCode.includes('.voice-help-btn.is-speaking'), 'styles.css defines animated speech pulse for .voice-help-btn.is-speaking');
assert(stylesCode.includes('.rewards-btn'), 'styles.css styles .rewards-btn and count badge');
assert(stylesCode.includes('.rewards-toast-popup'), 'styles.css defines rewards-toast-popup animated notification');
assert(stylesCode.includes('.bhramari-bee-flight'), 'styles.css defines bhramari-bee-flight for bumblebee pranayama');
assert(appCode.includes('speakCurrentGameGuidance('), 'app.js implements speakCurrentGameGuidance() for instant audio instructions');
assert(appCode.includes('initGameGuidance()'), 'app.js implements initGameGuidance() with bilingual instructions');
assert(appCode.includes('openRewardsModal('), 'app.js implements openRewardsModal() for Lila Sticker Album');
const all22Games = ['bubbles', 'peekaboo', 'xylophone', 'aarti', 'shapes', 'sparkles', 'shringar', 'akshara', 'prakriti', 'dhyana', 'matki', 'bhuta', 'utsava', 'vadya', 'pattern', 'dinacharya', 'habitat', 'yoga', 'ritu', 'kolam', 'sanskara', 'mandir'];
all22Games.forEach(g => {
  assert(appCode.includes(`${g}: {`), `app.js defines complete verbal guidance for game '${g}'`);
});
assert(audioCode.includes('Math.max(3500'), 'audio.js implements dynamic duration speech fallback timer');
assert(appCode.includes('this.footprintPool'), 'app.js uses memory pool for Kanha ghungroo footprints');
assert(appCode.includes('class ToddlerInputFilter'), 'app.js defines ToddlerInputFilter for palm-slap rejection');
assert(!/\?\./.test(appCode), 'app.js is free of optional chaining (?.)');
assert(!/\?\?/.test(appCode), 'app.js is free of nullish coalescing (??)');

// 7. Cross-file consistency (catches the drift that static string checks miss)
console.log('\n🔗 7. Verifying Cross-File Consistency...');
(function () {
  // 7a. Every audio method the games call must exist on ToddlerAudio
  const audioMethods = {};
  (audioCode.match(/^  (?:async )?[A-Za-z_]\w*\s*\(/gm) || []).forEach((m) => {
    audioMethods[m.trim().replace(/^async /, '').replace(/\s*\($/, '')] = true;
  });
  const audioProps = {};
  (audioCode.match(/this\.\w+\s*=/g) || []).forEach((m) => { audioProps[m.slice(5).replace(/\s*=$/, '')] = true; });
  const missingAudio = {};
  [gamesCode, appCode].forEach((code) => {
    (code.match(/toddlerAudio\.(\w+)/g) || []).forEach((m) => {
      const name = m.split('.')[1];
      if (!audioMethods[name] && !audioProps[name]) missingAudio[name] = true;
    });
  });
  assert(Object.keys(missingAudio).length === 0, `Every toddlerAudio member used by games.js/app.js exists (${Object.keys(missingAudio).join(', ') || 'none missing'})`);

  // 7b. Every SVG asset referenced must exist
  const VedicAssets = require('./vedic-assets.js');
  const missingAssets = {};
  [gamesCode, appCode].forEach((code) => {
    (code.match(/VedicAssets\.(\w+)/g) || []).forEach((m) => {
      const name = m.split('.')[1];
      if (typeof VedicAssets[name] !== 'string') missingAssets[name] = true;
    });
    (code.match(/svgKey: '(\w+)'/g) || []).forEach((m) => {
      const name = m.split("'")[1];
      if (typeof VedicAssets[name] !== 'string') missingAssets[name] = true;
    });
  });
  assert(Object.keys(missingAssets).length === 0, `Every VedicAssets key referenced exists (${Object.keys(missingAssets).join(', ') || 'none missing'})`);

  // 7c. Registered games, catalog entries and sidebar tabs must be the same set
  const registered = (appCode.match(/^\s{6}(\w+): \w+Game,?$/gm) || []).map((l) => l.trim().split(':')[0]).sort();
  const catalog = (appCode.match(/\{ key: '(\w+)'/g) || []).map((m) => m.split("'")[1]).sort();
  const tabs = (indexHtml.match(/data-game="(\w+)"/g) || []).map((m) => m.split('"')[1]).sort();
  assert(registered.length === all22Games.length, `app.js registers ${all22Games.length} games (found ${registered.length})`);
  assert(JSON.stringify(registered) === JSON.stringify(catalog), 'GAME_CATALOG has exactly one entry per registered game');
  assert(JSON.stringify(registered) === JSON.stringify(tabs), 'index.html sidebar has exactly one tab per registered game');
  assert(!/\b14 Games\b|\(14\)|सभी 14/.test(indexHtml + appCode), 'No stale "14 games" counts remain in the UI');

  // 7d. One version everywhere
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const swVersion = (swCode.match(/CACHE_VERSION = '([\d.]+)'/) || [])[1];
  const htmlVersions = (indexHtml.match(/\?v=([\d.]+)/g) || []).map((v) => v.slice(3));
  assert(htmlVersions.length >= 5 && htmlVersions.every((v) => v === swVersion), `index.html asset versions all match sw.js CACHE_VERSION (${swVersion})`);
  assert(pkg.version.indexOf(swVersion + '.') === 0, `package.json version (${pkg.version}) matches release ${swVersion}`);

  // 7e. Offline completeness: everything precached or linked exists on disk, nothing is fetched from another origin
  const precached = (swCode.match(/'\.\/[^']*'/g) || []).map((m) => m.slice(3, -1).replace(/\?v=$/, '')).filter((p) => p);
  const missingFiles = precached.filter((p) => !fs.existsSync(path.join(__dirname, p)));
  assert(precached.length >= 12 && missingFiles.length === 0, `Every file the service worker precaches exists (${missingFiles.join(', ') || 'all present'})`);
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  assert(manifest.icons.every((i) => fs.existsSync(path.join(__dirname, i.src))), 'Every manifest icon file exists');
  assert(manifest.icons.some((i) => i.type === 'image/png' && i.sizes === '192x192') && manifest.icons.some((i) => i.type === 'image/png' && i.sizes === '512x512'), 'Manifest has 192px and 512px PNG icons (required for install prompts)');
  assert(manifest.icons.some((i) => i.purpose === 'maskable'), 'Manifest has a maskable icon');
  assert(!/(?:src|href)="https?:\/\//.test(indexHtml) && !/url\(["']?https?:\/\//.test(stylesCode), 'index.html and styles.css load nothing from other origins');
  assert(!/<script(?![^>]*\bsrc=)[^>]*>/.test(indexHtml) && !/\son[a-z]+="/.test(indexHtml), 'index.html has no inline scripts or inline event handlers (strict CSP)');
  assert(indexHtml.includes('Content-Security-Policy'), 'index.html declares a Content-Security-Policy');
})();

// 7f. Game logic that can be checked without a browser
console.log('\n🎲 7f. Verifying Round Generation & Rewards...');
(function () {
  const G = require('./games.js');
  const kit = G.GamePlayKit;

  const shuffled = kit.shuffle([1, 2, 3, 4, 5, 6]);
  assert(shuffled.length === 6 && shuffled.slice().sort().join() === '1,2,3,4,5,6', 'GamePlayKit.shuffle keeps every element');
  assert(kit.stripNumber('१. प्रातः नमस्ते') === 'प्रातः नमस्ते' && kit.stripNumber('1. Morning Namaste') === 'Morning Namaste', 'GamePlayKit.stripNumber removes Devanagari and Latin order numbers');

  // Pattern Mala: 200 generated rounds must all be well-formed and actually follow their rule
  let patternOk = true;
  const firstAnswers = {};
  for (let n = 0; n < 200 && patternOk; n++) {
    const game = new G.PatternMalaGame({});
    const round = game.buildRound();
    if (round.length !== 5) patternOk = false;
    round.forEach((lvl, i) => {
      const unit = game.rules[i].unit;
      const full = lvl.seq.concat([lvl.answer]);
      const follows = full.every((bead, k) => bead === full[k % unit.length]);
      const distinct = new Set(lvl.choices).size === lvl.choices.length;
      if (!follows || !distinct || lvl.choices.length !== 3 || lvl.choices.indexOf(lvl.answer) === -1 || lvl.seq.length !== 5) patternOk = false;
    });
    firstAnswers[round[0].answer] = true;
  }
  assert(patternOk, 'Pattern Mala: every generated pattern follows its rule and offers 3 distinct choices including the answer');
  assert(Object.keys(firstAnswers).length >= 6, `Pattern Mala: patterns vary between rounds (${Object.keys(firstAnswers).length} different first answers in 200 rounds)`);

  // Habitat: rounds are a fresh sample, every creature has a real habitat
  const habitat = new G.HabitatGame({});
  const habitatIds = habitat.habitats.map((h) => h.id);
  assert(habitat.creatures.length >= 10 && habitat.creatures.every((c) => habitatIds.indexOf(c.habitat) !== -1 && c.fact.hi && c.fact.en), 'Habitat: 10+ creatures, each with a valid habitat and a bilingual fact');
  const r1 = habitat.buildRound();
  assert(r1.length === habitat.roundLength && new Set(r1).size === r1.length, 'Habitat: a round has no repeated creature');
  const orders = {};
  for (let n = 0; n < 40; n++) orders[habitat.buildRound().map((c) => c.icon).join('')] = true;
  assert(Object.keys(orders).length > 20, 'Habitat: round order is shuffled');

  // Sanskara: the kind answer must not sit on a fixed side
  const sanskara = new G.SanskaraValuesGame({});
  let goodFirst = 0;
  for (let n = 0; n < 400; n++) { sanskara.prepareQuestion(); if (sanskara.choiceOrder[0] === 'good') goodFirst++; }
  assert(goodFirst > 140 && goodFirst < 260, `Sanskara: the kind choice appears on either side (${goodFirst}/400 first)`);
  assert(sanskara.scenarios.length >= 6 && sanskara.scenarios.every((s) => s.good && s.other && s.praise.hi && s.praise.en), 'Sanskara: 6+ complete bilingual scenarios');
  assert(!gamesCode.includes('is-good-opt'), 'Sanskara: markup carries no class that gives the answer away');

  // Sequencing games offer their pieces in a mixed order
  const mandir = new G.MandirBuilderGame({});
  const dina = new G.DinacharyaGame({});
  const mOrders = {}, dOrders = {};
  for (let n = 0; n < 60; n++) { mandir.newBuild(); dina.newDay(); mOrders[mandir.trayOrder.join('')] = true; dOrders[dina.trayOrder.join('')] = true; }
  assert(Object.keys(mOrders).length > 15 && Object.keys(dOrders).length > 15, 'Mandir & Dinacharya: tray order is shuffled each round');

  // Timers and hints
  const timers = new G.GameTimers();
  let fired = 0;
  timers.later(() => { fired++; }, 5);
  timers.later(() => { fired++; }, 5);
  timers.clear();
  assert(timers.ids.length === 0, 'GameTimers.clear() cancels everything pending');
  setTimeout(() => assert(fired === 0, 'GameTimers: cancelled callbacks never run'), 30);
  const hints = new G.HintTracker();
  hints.miss();
  const afterOne = hints.shouldHint();
  hints.miss();
  assert(!afterOne && hints.shouldHint(), 'HintTracker: the hint appears on the second miss, not the first');

  // Every game can earn exactly one sticker
  const stickerIds = G.ToddlerRewards.stickers.map((s) => s.id);
  assert(stickerIds.length === all22Games.length && new Set(stickerIds).size === stickerIds.length, `Sticker album has one unique sticker per game (${stickerIds.length})`);
  const awarded = {};
  (gamesCode.match(/(?:ToddlerRewards\.award|celebrateRound)\('(\w+)'/g) || []).forEach((m) => { awarded[m.split("'")[1]] = true; });
  const unreachable = stickerIds.filter((id) => !awarded[id]);
  const unknown = Object.keys(awarded).filter((id) => stickerIds.indexOf(id) === -1);
  assert(unreachable.length === 0 && unknown.length === 0, `Every sticker can be earned and every award names a real sticker (${unreachable.concat(unknown).join(', ') || 'ok'})`);
  assert(G.ToddlerRewards.stickers.every((s) => s.title.hi && s.title.en && s.desc.hi && s.desc.en && s.icon), 'Every sticker has an icon and bilingual title and description');

  // The eight rewritten games must cancel their timers when the child leaves
  ['PatternMalaGame', 'DinacharyaGame', 'HabitatGame', 'BalaYogaGame', 'RituChakraGame', 'KolamSymmetryGame', 'SanskaraValuesGame', 'MandirBuilderGame'].forEach((name) => {
    const body = gamesCode.slice(gamesCode.indexOf('class ' + name + ' {'));
    const stopBody = body.slice(body.indexOf('  stop() {'), body.indexOf('  stop() {') + 120);
    assert(stopBody.includes('this.timers.clear()'), `${name}.stop() cancels its pending timers`);
  });
  const petalMethods = {};
  ((appCode + gamesCode).match(/(?:petalShower|shower)\.(\w+)\(/g) || []).forEach((m) => { petalMethods[m.split('.')[1].slice(0, -1)] = true; });
  const missingPetal = Object.keys(petalMethods).filter((m) => typeof G.CelebrationPetalShower.prototype[m] !== 'function' && typeof G.CelebrationPetalShower[m] !== 'function');
  assert(missingPetal.length === 0, `Every CelebrationPetalShower method the games call exists (${missingPetal.join(', ') || 'ok'})`);
})();

// 8. Live HTTP server: the real server.js on an ephemeral port
console.log('\n🌐 8. Verifying HTTP Server (real server.js)...');
const { createServer } = require('./server.js');

function request(port, options) {
  return new Promise((resolve) => {
    const req = http.request(Object.assign({ host: '127.0.0.1', port: port, method: 'GET' }, options), (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on('error', (err) => resolve({ status: 0, error: err.message, headers: {}, body: Buffer.alloc(0) }));
    req.end();
  });
}

const liveServer = createServer();
liveServer.listen(0, '127.0.0.1', async () => {
  const port = liveServer.address().port;
  try {
    const publicPaths = ['/', '/manifest.json', '/favicon.svg', '/sw.js', '/styles.css', '/audio.js', '/vedic-assets.js', '/games.js', '/app.js', '/fonts/fredoka-latin.woff2', '/icons/icon-192.png', '/app.js?v=5.1'];
    for (const p of publicPaths) {
      const r = await request(port, { path: p });
      assert(r.status === 200 && r.body.length > 50, `GET ${p} returns 200 with content`);
    }

    const privatePaths = ['/.git/config', '/.git/HEAD', '/server.js', '/test.js', '/package.json', '/README.md', '/GEMINI.md', '/node_modules/x.js', '/does-not-exist.js'];
    for (const p of privatePaths) {
      const r = await request(port, { path: p });
      assert(r.status === 404, `GET ${p} is not served (404)`);
    }

    // Requests that used to crash the process
    for (const p of ['/%E0%A4%A', '/%00', '/%']) {
      const r = await request(port, { path: p });
      assert(r.status === 400, `Malformed URL ${p} returns 400`);
    }
    for (const p of ['/../../etc/passwd', '/..%2f..%2fetc%2fpasswd', '/%2e%2e/%2e%2e/etc/passwd']) {
      const r = await request(port, { path: p });
      assert(r.status === 403 || r.status === 404, `Path traversal ${p} is refused (${r.status})`);
    }
    const alive = await request(port, { path: '/' });
    assert(alive.status === 200, 'Server is still alive after malformed and hostile requests');

    const post = await request(port, { path: '/', method: 'POST' });
    assert(post.status === 405, 'POST is rejected with 405');
    const head = await request(port, { path: '/games.js', method: 'HEAD' });
    assert(head.status === 200 && head.body.length === 0 && parseInt(head.headers['content-length'], 10) > 1000, 'HEAD returns headers only');

    const home = await request(port, { path: '/' });
    assert(/default-src 'self'/.test(home.headers['content-security-policy'] || ''), 'Responses carry a Content-Security-Policy');
    assert(home.headers['x-content-type-options'] === 'nosniff', 'Responses carry X-Content-Type-Options: nosniff');
    assert(!home.headers['access-control-allow-origin'], 'No wildcard CORS header');
    const sw = await request(port, { path: '/sw.js' });
    assert(/no-store/.test(sw.headers['cache-control'] || ''), 'sw.js is never stored by the HTTP cache');

    const gz = await request(port, { path: '/games.js', headers: { 'Accept-Encoding': 'gzip' } });
    const rawSize = fs.statSync(path.join(__dirname, 'games.js')).size;
    assert(gz.headers['content-encoding'] === 'gzip' && gz.body.length < rawSize / 3, `games.js is gzip-compressed (${gz.body.length} of ${rawSize} bytes)`);
    assert(require('zlib').gunzipSync(gz.body).equals(fs.readFileSync(path.join(__dirname, 'games.js'))), 'Compressed body decompresses to the exact file');
    const png = await request(port, { path: '/icons/icon-192.png', headers: { 'Accept-Encoding': 'gzip' } });
    assert(!png.headers['content-encoding'], 'Already-compressed images are not re-compressed');
    const cond = await request(port, { path: '/games.js', headers: { 'If-None-Match': gz.headers.etag } });
    assert(cond.status === 304 && cond.body.length === 0, 'Conditional request with matching ETag returns 304');
  } catch (e) {
    assert(false, `Server test crashed: ${e.message}`);
  }
  liveServer.close();
  printSummary();
});

function printSummary() {
  console.log('\n========================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('========================================================');
  if (failedTests > 0) {
    process.exit(1);
  } else {
    console.log('✨ ALL CHECKS PASSED ✨\n');
    process.exit(0);
  }
}
