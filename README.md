# 🦚 Bala Gopala: Sandipani Gurukul (16 Kalas & 64 Vidhyas)
> **Vedic Sensory, Montessori & Early-Learning Play App for Children Aged 1 to 5 — 22 games, fully offline**

A culturally authentic, infant-safe, zero-dependency progressive web application (PWA) designed for toddlers. Rooted in the ancient Gurukul tradition of Maharishi Sandipani at Avantika (Ujjain), where Sri Krishna and Balarama mastered the 16 Kalas (Shodasha Kalas) and 64 Vidhyas (Chatushashti Kalas).

---

## 🌟 Key Highlights & Commercial Features

### 🛡️ Toddler Safety & Childproofing
- **Toddler Play Lock (Child Lock)**: Tap the 🔓 button to collapse the top bar. A subtle floating handle (`🔒 Hold to Unlock`) requires a 2-second press so toddlers can tap freely without closing or navigating away.
- **Parent Gate Verification**: Protects the Parent Compendium and Screen-Time Settings with a multiplication challenge (e.g., `7 × 8 = ?`, six answers). A wrong answer locks the keypad for a few seconds and asks a new question, so random tapping cannot get through.
- **Hearing Safety Limiter**: Built-in Web Audio `DynamicsCompressorNode` and soft limiter that caps maximum sound pressure levels, preventing loud speaker bursts during intense keyboard mashing.
- **Palm & Multi-Finger Slap Rejection**: Toddlers slap screens with open palms; browser pinch-zoom, pull-down refresh, and context menus are completely suppressed.
- **Baby-Mash Keyboard Support**: On laptops and desktops, any key press (letters, space, arrows) generates gentle ripples, floating stars, and triggers game actions.

### ⏱️ Parent Peace-of-Mind
- **Gentle Screen-Time Timer**: Set 10, 15, 20, or 30-minute play sessions. The chosen limit is remembered and applies to every later session until a parent changes it. When time elapses, the game gently transitions to **Bedtime Shanti Mode** with a soothing Tanpura drone and Vedic lullaby.
- **Bedtime Shanti Mode (🌙)**: Lowers visual brightness to twilight, initiates a continuous 432 Hz Sa-Pa Tanpura drone, and speaks gentle bedtime blessings to help toddlers wind down for sleep.
- **Bilingual Audio & Speech**: Instant switching between Hindi (हिन्दी) and Indian English (English) with vocal pronunciation for letters, swaras, and mantras.

### 📱 100% Offline Progressive Web App (PWA)
- Full PWA manifest (`manifest.json`) and Service Worker (`sw.js`).
- 100% scalable vector SVGs (`vedic-assets.js`) and algorithmic procedural Web Audio (`audio.js`).
- Zero external runtime image, font, or audio downloads—fonts are self-hosted in `fonts/`, so the app makes **no third-party requests at all** and plays seamlessly on airplanes, cars, and offline tablets!
- No ads, no analytics, no accounts. Preferences and stickers are stored only on the device (`localStorage`).

---

## 🎮 The 22 Gurukul Games

The first seven are described in detail; the full library follows.

1. **🍯 Makhan & Mor Pankh Pop (*Balakridanaka - Vidhya 46*)**:
   - Floating sweet butter pots (*Makhan Matkis*) and peacock feathers (*Mor Pankh*).
   - Interactive wooden churner pot (*Dahi Mathani*) with churning ropes and frothy butter splatters.
   - Melodic pentatonic popping sounds that climb the Raga Bhupali scale, with baby giggles and celebratory milestones every 10 pops!
2. **🐮 Vrindavan Gau-Dham (*Gau-Seva & Vidhyas 42 & 43*)**:
   - Sacred Gau-Mata and little calf. Feed fresh Yamuna grass, give Yamuna water bath, and adorn with marigold garlands.
   - Tactile petting interaction: Stroking Gau-Mata triggers contented moos, blinking eyes, and love heart blessings.
   - 9-Button Sound Sanctuary: Authentic procedural cow moo (*Hambaaa*), baby calf moo, royal peacock call (*Pee-Hu*), elephant trumpet (*Gajaraj*), sweet cuckoo (*Koel*), silver ankle bells (*Ghungroo*), Vrindavan green parrot (*Shuka / Tota*), forest deer (*Mriga*), and playful monkey (*Vanar*).
   - 4 Peek-a-boo hiding kunjas (Bala Krishna, Gau Mata, Mayur, Lotus).
3. **🪈 Divya Bansuri & Jal Tarang (*Vadya & Udaka-Vadya - Vidhyas 2 & 12*)**:
   - 8-Swara bamboo flute (*Sa Re Ga Ma Pa Dha Ni Sȧ*) associated with Vedic animals.
   - 6 Tuned ceramic water bowls (*Jal Tarang*) with real-time concentric water ripple waves.
   - Temple ghanti bell, Shiva damru drum, divine conch (*Shankha*), and brass hand cymbals (*Manjira / Khartal*).
   - Magic Bhajan Helper with 3 beloved melodies: *Achyutam Keshavam*, *Hare Krishna Mahamantra*, and *Govinda Gopala*, featuring visual glowing key guide auras.
4. **🪔 Sandhya Aarti (*Gita Vidhya 1 & Jyoti Kala*)**:
   - 360° interactive brass Aarti Thali with dynamic flickering diya flame and rhythmic bell cadence.
   - Interactive smoldering Agarbatti (Incense Stick) with fragrant swirling smoke puffs.
   - 4-Flower Altar Showering: Rose petals, Marigolds, Sacred Tulsi leaves, and Mogra/Jasmine petals.
5. **🪷 Pushparchana & Shape Match (*Pushpastarana - Vidhyas 7 & 8*)**:
   - Pincer tap and smooth touch drag-and-drop matching of sacred symbols.
   - 3 Progressive Rounds including Pink Lotus, Diya, Mor Pankh, Sacred Om, Genda Phool, Bansuri, Makhan, Mandir Bell, Tulsi Dal, Sudarshana Chakra, Mangal Kalash, and Chandan Tilak.
   - Joyful celebration animations with Sanskrit vocal praise and magnetic snapping.
6. **✨ Divya Rangoli & Sacred Canvas (*Alekhya - Vidhyas 4 & 5*)**:
   - **Magic Mandala Symmetry Mode**: Real-time 4-fold mirrored reflection that effortlessly transforms toddler strokes into breathtaking royal temple rangolis!
   - Glowing neon kumkum ribbons with sparkling golden dust trails.
   - Auspicious golden stamps: ॐ Om, Lotus, Peacock Feather, Diya, Charan Paduka, Marigold, Tulsi, and Makhan.
   - Pure Ganga Jal canvas wash animation.
7. **👑 Kanha Shringar & Makhan Seva (*Bhushana-Yojana & Veshya - Vidhya 44*)**:
   - Adorable central interactive Bala Gopala avatar that giggles, blinks, and smiles when tickled.
   - 6 Sacred Adornment Items on a golden tray: Mor Pankh (Peacock Feather), Divya Bansuri (Flute with phrase melody), Vaijayanti Mala (Garland), Kundala (Earrings), Kasturi Chandan Tilak, and Makhan Handi (Feeding sweet butter with cheek smudge).
   - Grand celebration with conch horn and petal showers when all adornments are placed!

### The rest of the library

| # | Game | What the child does |
|---|------|---------------------|
| 8 | 🔤 **Divya Akshara** | Devanagari, English and 1–10 with phonics, plus a "Find It" quiz |
| 9 | 🌿 **Prakriti Seva** | Waters Tulsi and sorts flowers into four colour baskets |
| 10 | 🧘 **Dhyana & Pranayama** | Breathes with a blooming lotus; names five feelings |
| 11 | 🏺 **Matki Tower** | Stacks pots largest to smallest (Montessori seriation) |
| 12 | 🌍 **Pancha Bhuta** | Explores earth, water, fire, air and space |
| 13 | 🪢 **Utsava & Jhula** | Swings Kanha's jhula; Holi, Diwali and Sankranti scenes |
| 14 | 🪕 **Vadya & Taal** | Plays veena, mridangam, bansuri and manjira |
| 15 | 📿 **Pattern Mala** | Completes bead-and-flower sequences |
| 16 | 🌞 **Dinacharya** | Orders the daily routine from morning to bedtime |
| 17 | 🏞️ **Habitats** | Matches each Vrindavan friend to where it lives |
| 18 | 🤸 **Bala Yoga** | Follows tree, peacock, cow and lotus poses |
| 19 | 🌦️ **Ritu-Chakra** | Hears the six Vedic seasons |
| 20 | 💠 **Divya Kolam** | Draws four-way mirrored kolam patterns |
| 21 | 💖 **Divya Sanskara** | Chooses the kind action in everyday situations |
| 22 | 🛕 **Mandir Builder** | Builds a temple from geometric shapes in order |

Every game is listed once in `GAME_CATALOG` at the top of `app.js` (icon, Hindi/English name, subtitle, hint). The navbar, sidebar and counters are all driven from that list.

---

## 🚀 Running the Project

### 1. Local Browser & Home Wi-Fi Network
To run the included production server (Node 12+, no dependencies to install):
```bash
npm start          # or: node server.js
PORT=8080 npm start
```

The server only serves the app's public files (source control, `server.js`, tests and docs return 404), compresses text assets, answers conditional requests with `304`, and sends a strict Content-Security-Policy.

Then visit:
- **Computer Browser**: `http://localhost:3000`
- **iPad / Tablet / Phone on Wi-Fi**: `http://<YOUR-LOCAL-IP>:3000` (e.g. `http://192.168.29.2:3000`)

### 2. Standalone Direct File
You can also open `index.html` directly in any modern browser without a server:
- Double click `index.html` or drag it into Chrome / Edge / Safari.

---

## 📦 Deployment to Web Hosting

Because the application is completely client-side with zero build steps or heavy dependencies:
- **Vercel / Netlify / Cloudflare Pages**: Simply point your repository or folder to the root.
- **GitHub Pages**: Push this directory to your `main` or `gh-pages` branch.
- **Docker**: Can be served with `node server.js` or standard Nginx.

If you host on a static platform, add the same security headers there; the `<meta>` Content-Security-Policy in `index.html` already applies everywhere.

---

## 🧪 Testing & Releasing

```bash
npm test        # 250+ checks: assets, game interfaces, cross-file consistency, and the real server
npm run check   # syntax check of every JS file
```

To cut a release, bump the version in three places together — `CACHE_VERSION` in `sw.js`, the `?v=` query strings in `index.html`, and `version` in `package.json`. The test suite fails if they disagree.

---

## 🕉️ Pedagogical Dedication
Crafted for early childhood holistic development, grounding toddlers in love (*Prema*), peace (*Shanti*), kindness (*Karuna*), and joy (*Ananda*).
*Jai Shri Krishna!* 🦚✨
