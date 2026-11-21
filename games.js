/**
 * Toddler Wonderland - Vedic Games Logic (Enhanced Commercial Edition)
 * Featuring Authentic Cow Moo (Hambaaa), Baby Calf Moo, Animal Soundboard,
 * Yashoda Maiya's Butter Churner, Baby Mash Any-Key Support,
 * Memory Element Pooling, and Toy-Box State Persistence.
 */

// ==========================================================================
// COMMERCIAL TOY-BOX PERSISTENCE & MEMORY OBJECT POOLING
// ==========================================================================
const ToddlerPersistence = {
  get: function(key, defaultVal) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem('bala_gopala_' + key);
        return item !== null ? JSON.parse(item) : defaultVal;
      }
    } catch (e) {}
    return defaultVal;
  },
  set: function(key, val) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('bala_gopala_' + key, JSON.stringify(val));
      }
    } catch (e) {}
  }
};

class ElementPool {
  constructor(className, maxPoolSize, createFn) {
    this.className = className;
    this.maxPoolSize = maxPoolSize || 30;
    this.createFn = createFn;
    this.pool = [];
  }

  acquire() {
    let el = this.pool.pop();
    if (!el) {
      el = this.createFn ? this.createFn() : document.createElement('div');
    }
    el.className = this.className;
    el.style.display = '';
    return el;
  }

  release(el) {
    if (!el) return;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
    el.style.cssText = '';
    el.className = this.className;
    if (this.pool.length < this.maxPoolSize) {
      this.pool.push(el);
    }
  }

  releaseAfter(el, ms) {
    setTimeout(() => {
      this.release(el);
    }, ms);
  }
}

if (typeof window !== 'undefined') {
  window.ToddlerPersistence = ToddlerPersistence;
  window.ElementPool = ElementPool;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ToddlerPersistence, ElementPool };
}

// ==========================================================================
// 1. MAKHAN & MOR PANKH POP (Kala: Lila & Vidhya 46: Balakridanaka)
// ==========================================================================
class BubbleGame {
  constructor(container) {
    this.container = container;
    this.popCount = 0;
    this.timer = null;
    this.active = false;
    this.burstContainerPool = new ElementPool('burst-container', 16);
    this.burstParticlePool = new ElementPool('burst-particle', 80);
    this.burstEmojiPool = new ElementPool('pop-reward-emoji', 16);
    this.kalas = [
      { name: 'Prem', label: { hi: 'प्रेम', en: 'Prem (Love)' }, col: '#FF4D6D' },
      { name: 'Shanti', label: { hi: 'शान्ति', en: 'Shanti (Peace)' }, col: '#38BDF8' },
      { name: 'Ananda', label: { hi: 'आनन्द', en: 'Ananda (Joy)' }, col: '#FBBF24' },
      { name: 'Karuna', label: { hi: 'करुणा', en: 'Karuna (Kindness)' }, col: '#10B981' },
      { name: 'Vidya', label: { hi: 'विद्या', en: 'Vidya (Wisdom)' }, col: '#A855F7' }
    ];
    this.vedicItems = ['🦚', '🍯', '🪷', '🪈', '🕉️', '⭐', '🔔', '🐮'];
  }

  start() {
    this.active = true;
    this.popCount = window.ToddlerPersistence ? window.ToddlerPersistence.get('lifetime_makhan_pops', 0) : 0;
    this.render();
    this.spawnLoop();
  }

  stop() {
    this.active = false;
    if (this.timer) clearTimeout(this.timer);
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const counterLabel = lang === 'hi' ? 'माखन' : 'Makhan';
    const churnerLabel = lang === 'hi' ? '🥣 माखन मथें!' : '🥣 Churn Butter!';
    const showerLabel = lang === 'hi' ? '✨ माखन वर्षा! ✨' : '✨ Makhan Shower! ✨';

    this.container.innerHTML = `
      <div class="game-bubble-pop vedic-theme">
        <div class="sky-background">
          <div class="interactive-sun" id="surya-btn" title="Surya Dev">
            ${VedicAssets.diya}
          </div>
          <div class="cloud cloud-1"></div>
          <div class="cloud cloud-2"></div>
        </div>

        <div class="pop-stats-pill">
          <span class="star-icon">🦚</span>
          <span id="pop-counter-text">${counterLabel}: ${this.popCount}</span>
        </div>

        <!-- Yashoda Maiya's Interactive Butter Churner Pot -->
        <div class="churning-station" id="churner-pot" title="Tap to churn fresh butter!">
          <div class="churner-visual" id="churner-visual">
            ${VedicAssets.dahiMathani}
          </div>
          <div class="churner-label">${churnerLabel}</div>
        </div>

        <button class="rush-btn" id="makhan-rain-btn">
          ${showerLabel}
        </button>

        <div class="bubble-play-area" id="bubble-area"></div>
      </div>
    `;

    // Tap Surya Diya
    const surya = this.container.querySelector('#surya-btn');
    surya.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      surya.classList.add('sun-wiggle');
      window.toddlerAudio.playAartiChimes();
      window.toddlerAudio.speak({
        hi: "ॐ सूर्याय नमः! शुभ प्रभात!",
        en: "Om Suryaya Namaha! Auspicious Morning!"
      });
      this.createBurst(e.clientX, e.clientY, '#F59E0B', '🪔');
      setTimeout(() => surya.classList.remove('sun-wiggle'), 1000);
    });

    // Tap Butter Churner
    const churner = this.container.querySelector('#churner-pot');
    churner.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.churnButterAction(e);
    });

    // Makhan shower button
    const rushBtn = this.container.querySelector('#makhan-rain-btn');
    rushBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      window.toddlerAudio.playTempleBell();
      for (let i = 0; i < 10; i++) {
        setTimeout(() => this.spawnVedicBubble(), i * 160);
      }
    });

    // Play area popping
    const area = this.container.querySelector('#bubble-area');
    area.addEventListener('pointerdown', (e) => {
      const bubbleEl = e.target.closest('.bubble-item');
      if (bubbleEl) this.popVedicBubble(bubbleEl, e);
    });
  }

  churnButterAction(e) {
    const churnerVisual = this.container.querySelector('#churner-visual');
    if (churnerVisual) {
      churnerVisual.classList.add('churning-active');
      setTimeout(() => churnerVisual.classList.remove('churning-active'), 500);
    }

    window.toddlerAudio.playChurningSound();
    window.toddlerAudio.playGhungroo();

    // Spurt fresh butter bubbles from churner
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.spawnVedicBubble(), i * 100);
    }

    if (Math.random() > 0.4) {
      window.toddlerAudio.speak({
        hi: "दही मथानी! यशोदा मैया! ताजा माखन!",
        en: "Churning sweet fresh butter for Kanha!"
      });
    }

    const rect = churnerVisual ? churnerVisual.getBoundingClientRect() : { left: 100, top: 400, width: 80 };
    this.createBurst(rect.left + rect.width / 2, rect.top + 20, '#FFFDF0', '🍯');

    // Frothy butter splash drops
    for (let s = 0; s < 6; s++) {
      const splash = document.createElement('div');
      splash.className = 'butter-froth-drop';
      splash.style.left = (rect.left + rect.width / 2 + (Math.random() * 60 - 30)) + 'px';
      splash.style.top = (rect.top + 10) + 'px';
      document.body.appendChild(splash);
      setTimeout(function() { splash.remove(); }, 800);
    }
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey() {
    // 50% of the time, churn butter or pop bubbles!
    if (Math.random() > 0.6) {
      this.churnButterAction();
      return;
    }

    const area = this.container.querySelector('#bubble-area');
    if (!area) return;

    const existing = area.querySelectorAll('.bubble-item:not(.popping)');
    if (existing.length > 0) {
      const pick = existing[Math.floor(Math.random() * existing.length)];
      this.popVedicBubble(pick);
    } else {
      this.spawnVedicBubble();
      const newItems = area.querySelectorAll('.bubble-item');
      if (newItems.length > 0) {
        this.popVedicBubble(newItems[newItems.length - 1]);
      }
    }
  }

  spawnLoop() {
    if (!this.active) return;
    this.spawnVedicBubble();
    const delay = 800 + Math.random() * 800;
    this.timer = setTimeout(() => this.spawnLoop(), delay);
  }

  spawnVedicBubble() {
    if (!this.active) return;
    const area = this.container.querySelector('#bubble-area');
    if (!area) return;

    const existing = area.querySelectorAll('.bubble-item');
    if (existing.length > 20) existing[0].remove();

    const isMatka = Math.random() > 0.45;
    const kala = this.kalas[Math.floor(Math.random() * this.kalas.length)];
    const symbol = this.vedicItems[Math.floor(Math.random() * this.vedicItems.length)];
    const size = isMatka ? (85 + Math.random() * 35) : (75 + Math.random() * 30);

    const el = document.createElement('div');
    el.className = `bubble-item ${isMatka ? 'is-matka' : 'is-soap-bubble'}`;
    el.dataset.kalaName = kala.name;
    el.dataset.symbol = symbol;
    el.dataset.type = isMatka ? 'matka' : 'bubble';

    const maxLeft = Math.max(10, window.innerWidth - size - 40);
    const startLeft = 15 + Math.random() * maxLeft;
    el.style.left = `${startLeft}px`;
    el.style.width = `${size}px`;
    el.style.height = `${isMatka ? size * 1.15 : size}px`;

    const duration = 7.0 + Math.random() * 4;
    el.style.animationDuration = `${duration}s`;

    if (isMatka) {
      el.innerHTML = `
        <div class="vedic-matka-bubble" style="box-shadow: 0 8px 24px rgba(234, 88, 12, 0.45);">
          ${VedicAssets.makhanMatka}
          <div class="floating-kala-tag">${symbol}</div>
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="soap-bubble-body" style="border-color: ${kala.col}; box-shadow: inset 0 0 15px ${kala.col};">
          <div class="bubble-reflection"></div>
          <span class="bubble-inner-sparkle">${symbol}</span>
        </div>
      `;
    }

    area.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  popVedicBubble(el, e) {
    if (!el || el.classList.contains('popping')) return;
    el.classList.add('popping');

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const symbol = el.dataset.symbol;
    const isMatka = el.dataset.type === 'matka';

    if (isMatka) {
      window.toddlerAudio.playMakhanPop();
      window.toddlerAudio.playGhungroo();
    } else {
      window.toddlerAudio.playAscendingPop(this.popCount);
    }

    this.popCount++;
    if (window.ToddlerPersistence) {
      window.ToddlerPersistence.set('lifetime_makhan_pops', this.popCount);
    }
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const counterLabel = lang === 'hi' ? 'माखन' : 'Makhan';
    const countEl = this.container.querySelector('#pop-counter-text');
    if (countEl) countEl.textContent = `${counterLabel}: ${this.popCount}`;

    if (this.popCount > 0 && this.popCount % 10 === 0) {
      window.toddlerAudio.playCelebration();
      window.toddlerAudio.playBabyGiggle();
      window.toddlerAudio.speak({
        hi: "शाबाश! नन्हे कान्हा बहुत प्रसन्न!",
        en: "Wonderful! Little Kanha is so happy!"
      });
    } else if (this.popCount % 2 === 1) {
      const phrases = [
        { hi: "जय श्री कृष्णा! माखन चोर!", en: "Jai Shri Krishna! Sweet Butter!" },
        { hi: "राधे राधे! सुन्दर!", en: "Radhe Radhe! Beautiful!" },
        { hi: "गोविन्द गोपाला!", en: "Govinda Gopala!" },
        { hi: "मोर पंख! अति सुन्दर!", en: "Peacock feather! Wonderful!" }
      ];
      const pick = phrases[Math.floor(Math.random() * phrases.length)];
      window.toddlerAudio.speak(pick);
    }

    this.createBurst(cx, cy, '#F59E0B', symbol);
    el.remove();
  }

  createBurst(x, y, color, emoji) {
    const burstContainer = this.burstContainerPool ? this.burstContainerPool.acquire() : document.createElement('div');
    burstContainer.className = 'burst-container';
    burstContainer.style.left = `${x}px`;
    burstContainer.style.top = `${y}px`;

    const emojiEl = this.burstEmojiPool ? this.burstEmojiPool.acquire() : document.createElement('div');
    emojiEl.className = 'pop-reward-emoji';
    emojiEl.textContent = emoji || '🦚';
    burstContainer.appendChild(emojiEl);

    const activeParticles = [];
    for (let i = 0; i < 8; i++) {
      const p = this.burstParticlePool ? this.burstParticlePool.acquire() : document.createElement('div');
      p.className = 'burst-particle';
      const angle = (i / 8) * Math.PI * 2;
      const dist = 45 + Math.random() * 40;
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      p.style.backgroundColor = color || '#F59E0B';
      burstContainer.appendChild(p);
      activeParticles.push(p);
    }

    document.body.appendChild(burstContainer);

    setTimeout(() => {
      if (this.burstEmojiPool) {
        this.burstEmojiPool.release(emojiEl);
        for (let j = 0; j < activeParticles.length; j++) {
          this.burstParticlePool.release(activeParticles[j]);
        }
        this.burstContainerPool.release(burstContainer);
      } else {
        burstContainer.remove();
      }
    }, 800);
  }
}

// ==========================================================================
// 2. GAU SEVA & VRINDAVAN ANIMAL SOUND SANCTUARY (Vidhya 42 & 43)
// ==========================================================================
class PeekabooGame {
  constructor(container) {
    this.container = container;
  }

  start() {
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const headerTitle = lang === 'hi' ? 'वृन्दावन गऊ-धाम व पशु ध्वनि अभयारण्य! 🐮🦚' : 'Vrindavan Gau-Dham & Animal Sound Sanctuary! 🐮🦚';
    const cowHint = lang === 'hi' ? '🐮 हम्बा सुनें!' : '🐮 Tap to Moo!';
    const calfHint = lang === 'hi' ? '🐄 बछड़े की पुकार!' : '🐄 Baby Moo!';
    const feedLabel = lang === 'hi' ? '🌾 हरी घास व लड्डू!' : '🌾 Grass & Laddu (Crunch!)';
    const batheLabel = lang === 'hi' ? '💧 यमुना स्नान!' : '💧 Yamuna Snana (Bath)';
    const malaLabel = lang === 'hi' ? '🌼 गेंदा माला!' : '🌼 Genda Mala (Garland)';
    const soundboardTitle = lang === 'hi' ? '🎵 पशुओं को छूकर उनकी मधुर आवाजें सुनें!' : '🎵 Tap Any Animal to Hear It Sound!';

    this.container.innerHTML = `
      <div class="game-peekaboo vedic-theme">
        <div class="peekaboo-header">
          <h2>${headerTitle}</h2>
        </div>

        <!-- Main Interactive Gau-Mata & Calf Barn -->
        <div class="gau-barn-stage">
          <div class="cow-avatar-card" id="gau-cow-card" title="Tap Gau Mata to hear her loving Moo!">
            ${VedicAssets.gauMataLarge}
            <div class="animal-tap-hint">${cowHint}</div>
          </div>

          <div class="calf-avatar-card" id="gau-calf-card" title="Tap little calf to hear baby moo!">
            ${VedicAssets.littleCalf}
            <div class="animal-tap-hint">${calfHint}</div>
          </div>
        </div>

        <!-- Gau Seva Care Tools -->
        <div class="gau-actions-row">
          <button class="gau-tool-btn" id="btn-feed" title="Feed Fresh Grass">
            ${feedLabel}
          </button>
          <button class="gau-tool-btn" id="btn-bathe" title="Bathe with Yamuna Water">
            ${batheLabel}
          </button>
          <button class="gau-tool-btn" id="btn-mala" title="Adorn with Flower Garland">
            ${malaLabel}
          </button>
        </div>

        <!-- 6-Button Vrindavan Sound Sanctuary Board -->
        <div class="animal-soundboard-panel">
          <div class="soundboard-title">${soundboardTitle}</div>
          <div class="soundboard-grid">
            <button class="sound-card-btn" id="snd-cow" title="Cow Hambaaa">
              <span class="snd-icon">🐮</span>
              <span class="snd-label">Gau Mata</span>
              <span class="snd-tag">Mooo!</span>
            </button>
            <button class="sound-card-btn" id="snd-calf" title="Calf Maaa">
              <span class="snd-icon">🐄</span>
              <span class="snd-label">Bachhda</span>
              <span class="snd-tag">Baby Moo</span>
            </button>
            <button class="sound-card-btn" id="snd-peacock" title="Peacock Pee-Hu">
              <span class="snd-icon">🦚</span>
              <span class="snd-label">Mayur</span>
              <span class="snd-tag">Pee-Hu!</span>
            </button>
            <button class="sound-card-btn" id="snd-elephant" title="Gajaraj Trumpet">
              <span class="snd-icon">🐘</span>
              <span class="snd-label">Gajaraj</span>
              <span class="snd-tag">Trumpet!</span>
            </button>
            <button class="sound-card-btn" id="snd-koel" title="Koel Cuckoo">
              <span class="snd-icon">🐦</span>
              <span class="snd-label">Koel</span>
              <span class="snd-tag">Koo-Hoo!</span>
            </button>
            <button class="sound-card-btn" id="snd-ghungroo" title="Kanha Footsteps">
              <span class="snd-icon">👣</span>
              <span class="snd-label">Ghungroo</span>
              <span class="snd-tag">Chham-Chham</span>
            </button>
            <button class="sound-card-btn" id="snd-parrot" title="Vrindavan Parrot (Shuka)">
              <span class="snd-icon">🦜</span>
              <span class="snd-label">Shuka (Tota)</span>
              <span class="snd-tag">Mithu-Mithu!</span>
            </button>
            <button class="sound-card-btn" id="snd-deer" title="Vrindavan Deer (Mriga)">
              <span class="snd-icon">🦌</span>
              <span class="snd-label">Mriga</span>
              <span class="snd-tag">Bleat!</span>
            </button>
            <button class="sound-card-btn" id="snd-monkey" title="Playful Monkey (Vanar)">
              <span class="snd-icon">🐒</span>
              <span class="snd-label">Vanar</span>
              <span class="snd-tag">Khee-Khee!</span>
            </button>
          </div>
        </div>

        <!-- Hiding Peek-a-boo Spots -->
        <div class="peekaboo-grid">
          <div class="peekaboo-spot" data-character="krishna" data-name="Bala Krishna">
            <div class="spot-inside">
              ${VedicAssets.balaKrishna}
              <div class="animal-speech-bubble">Radhe Radhe!</div>
            </div>
            <div class="spot-cover vedic-kunj">
              <div class="spot-icon">🦚</div>
              <div class="spot-label">Nikunj Garden 🌺</div>
            </div>
          </div>

          <div class="peekaboo-spot" data-character="cow" data-name="Gau Mata">
            <div class="spot-inside">
              ${VedicAssets.gauMata}
              <div class="animal-speech-bubble">Hambaaa!</div>
            </div>
            <div class="spot-cover vedic-gaushala">
              <div class="spot-icon">🐮</div>
              <div class="spot-label">Gau-Shala 🌾</div>
            </div>
          </div>

          <div class="peekaboo-spot" data-character="peacock" data-name="Mayur">
            <div class="spot-inside">
              ${VedicAssets.mayur}
              <div class="animal-speech-bubble">Pee-hu!</div>
            </div>
            <div class="spot-cover vedic-kadamba">
              <div class="spot-icon">🌿</div>
              <div class="spot-label">Kadamba Tree 🌳</div>
            </div>
          </div>

          <div class="peekaboo-spot" data-character="lotus" data-name="Divya Kamal">
            <div class="spot-inside">
              ${VedicAssets.kamal}
              <div class="animal-speech-bubble">Sundar Kamal!</div>
            </div>
            <div class="spot-cover vedic-sarovar">
              <div class="spot-icon">🪷</div>
              <div class="spot-label">Yamuna Sarovar 💧</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindGauEvents();
  }

  bindGauEvents() {
    // 1. Gau-Mata Big Head Tap -> Realistic Cow Moo!
    const cowCard = this.container.querySelector('#gau-cow-card');
    cowCard.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      cowCard.classList.add('cow-nodding');
      window.toddlerAudio.playCowMoo();
      window.toddlerAudio.speak({ hi: "हम्बा! प्यारी गऊ माता!", en: "Hambaaa! Gentle holy Gau Mata!" });
      this.triggerBlessing(cowCard, '🐮', '💖');
      setTimeout(() => cowCard.classList.remove('cow-nodding'), 900);
    });

    // 2. Cow Bell Group Tap
    const bellGroup = this.container.querySelector('#cow-bell-group');
    if (bellGroup) {
      bellGroup.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        e.preventDefault();
        window.toddlerAudio.playCowBell();
        this.triggerBlessing(cowCard, '🔔', '✨');
      });
    }

    // 3. Little Calf Tap -> Cute Baby Moo!
    const calfCard = this.container.querySelector('#gau-calf-card');
    calfCard.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      calfCard.classList.add('calf-delighted');
      window.toddlerAudio.playCalfMoo();
      window.toddlerAudio.speak({ hi: "प्यारा नन्हा बछड़ा! मां-मां!", en: "Sweet baby calf! Maaa-aaa!" });
      this.triggerBlessing(calfCard, '🐄', '🌸');
      setTimeout(() => calfCard.classList.remove('calf-delighted'), 800);
    });

    // 4. Care Buttons: Feed, Bathe, Mala
    const btnFeed = this.container.querySelector('#btn-feed');
    btnFeed.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      cowCard.classList.add('cow-nodding');
      calfCard.classList.add('calf-delighted');
      window.toddlerAudio.playGrassChew();
      setTimeout(() => window.toddlerAudio.playCalfMoo(), 400);
      window.toddlerAudio.speak({ hi: "मीठी हरी घास! गऊ माता प्रसन्न!", en: "Sweet green grass for holy cow!" });
      this.triggerBlessing(cowCard, '🌾', '💖');
      setTimeout(() => {
        cowCard.classList.remove('cow-nodding');
        calfCard.classList.remove('calf-delighted');
      }, 900);
    });

    const btnBathe = this.container.querySelector('#btn-bathe');
    btnBathe.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      window.toddlerAudio.playWaterSplash();
      setTimeout(() => window.toddlerAudio.playCowBell(), 300);
      window.toddlerAudio.speak({ hi: "पवित्र यमुना स्नान! गऊ सेवा!", en: "Pure Yamuna bath for cow and calf!" });
      this.triggerBlessing(calfCard, '💧', '✨');
    });

    const btnMala = this.container.querySelector('#btn-mala');
    btnMala.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      window.toddlerAudio.playTempleBell(1046.5);
      window.toddlerAudio.playCowBell();
      window.toddlerAudio.speak({ hi: "सुन्दर गेंदा फूल माला!", en: "Beautiful sacred garland!" });
      this.triggerBlessing(cowCard, '🌼', '🌸');
    });

    // 5. Sound Sanctuary Soundboard Buttons
    const sndCow = this.container.querySelector('#snd-cow');
    sndCow.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndCow.classList.add('snd-hit');
      window.toddlerAudio.playCowMoo();
      setTimeout(() => sndCow.classList.remove('snd-hit'), 300);
    });

    const sndCalf = this.container.querySelector('#snd-calf');
    sndCalf.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndCalf.classList.add('snd-hit');
      window.toddlerAudio.playCalfMoo();
      setTimeout(() => sndCalf.classList.remove('snd-hit'), 300);
    });

    const sndPeacock = this.container.querySelector('#snd-peacock');
    sndPeacock.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndPeacock.classList.add('snd-hit');
      window.toddlerAudio.playPeacockCall();
      setTimeout(() => sndPeacock.classList.remove('snd-hit'), 300);
    });

    const sndElephant = this.container.querySelector('#snd-elephant');
    sndElephant.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndElephant.classList.add('snd-hit');
      window.toddlerAudio.playElephantTrumpet();
      setTimeout(() => sndElephant.classList.remove('snd-hit'), 300);
    });

    const sndKoel = this.container.querySelector('#snd-koel');
    sndKoel.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndKoel.classList.add('snd-hit');
      window.toddlerAudio.playKoelCall();
      setTimeout(() => sndKoel.classList.remove('snd-hit'), 300);
    });

    const sndGhungroo = this.container.querySelector('#snd-ghungroo');
    sndGhungroo.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndGhungroo.classList.add('snd-hit');
      window.toddlerAudio.playGhungroo();
      setTimeout(() => sndGhungroo.classList.remove('snd-hit'), 300);
    });

    const sndParrot = this.container.querySelector('#snd-parrot');
    if (sndParrot) {
      sndParrot.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndParrot.classList.add('snd-hit');
        window.toddlerAudio.playShukaCall();
        setTimeout(() => sndParrot.classList.remove('snd-hit'), 300);
      });
    }

    const sndDeer = this.container.querySelector('#snd-deer');
    if (sndDeer) {
      sndDeer.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndDeer.classList.add('snd-hit');
        window.toddlerAudio.playDeerCall();
        setTimeout(() => sndDeer.classList.remove('snd-hit'), 300);
      });
    }

    const sndMonkey = this.container.querySelector('#snd-monkey');
    if (sndMonkey) {
      sndMonkey.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndMonkey.classList.add('snd-hit');
        window.toddlerAudio.playMonkeySound();
        setTimeout(() => sndMonkey.classList.remove('snd-hit'), 300);
      });
    }

    // 6. Hiding spots
    const spots = this.container.querySelectorAll('.peekaboo-spot');
    spots.forEach(spot => {
      spot.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.toggleSpot(spot);
      });
    });
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey() {
    const actions = ['cow', 'calf', 'peacock', 'elephant', 'feed', 'mala', 'koel', 'parrot', 'deer', 'monkey'];
    const pick = actions[Math.floor(Math.random() * actions.length)];

    const dispatchTap = (selector) => {
      const el = this.container.querySelector(selector);
      if (el) {
        try {
          if (typeof window.PointerEvent !== 'undefined') {
            el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
          } else {
            el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
          }
        } catch (e) {
          if (typeof el.click === 'function') el.click();
        }
      }
    };

    if (pick === 'cow') {
      dispatchTap('#gau-cow-card');
    } else if (pick === 'calf') {
      dispatchTap('#gau-calf-card');
    } else if (pick === 'feed') {
      dispatchTap('#btn-feed');
    } else if (pick === 'mala') {
      dispatchTap('#btn-mala');
    } else if (pick === 'peacock') {
      dispatchTap('#snd-peacock');
    } else if (pick === 'elephant') {
      dispatchTap('#snd-elephant');
    } else if (pick === 'parrot') {
      dispatchTap('#snd-parrot');
    } else if (pick === 'deer') {
      dispatchTap('#snd-deer');
    } else if (pick === 'monkey') {
      dispatchTap('#snd-monkey');
    } else {
      dispatchTap('#snd-koel');
    }
  }

  triggerBlessing(el, item1, item2) {
    const rect = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: 200, width: 80 };
    for (let i = 0; i < 6; i++) {
      const drop = document.createElement('div');
      drop.className = 'floating-peek-heart';
      drop.textContent = i % 2 === 0 ? item1 : item2;
      drop.style.left = `${rect.left + rect.width / 2 + (Math.random() * 80 - 40)}px`;
      drop.style.top = `${rect.top + 20}px`;
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 1000);
    }
  }

  toggleSpot(spot) {
    const isRevealed = spot.classList.contains('revealed');
    const character = spot.dataset.character;

    if (!isRevealed) {
      spot.classList.add('revealed');

      const sounds = {
        krishna: () => {
          window.toddlerAudio.playBansuri(523.25);
          window.toddlerAudio.playGhungroo();
          window.toddlerAudio.speak({ hi: "जय श्री कृष्णा! नन्हे कान्हा!", en: "Jai Shri Krishna! Little Kanha!" });
        },
        cow: () => {
          window.toddlerAudio.playCowMoo();
          window.toddlerAudio.speak({ hi: "हम्बा! गऊ माता!", en: "Hambaaa! Gentle holy Gau Mata!" });
        },
        peacock: () => {
          window.toddlerAudio.playPeacockCall();
          window.toddlerAudio.speak({ hi: "पीहू पीहू! सुन्दर मयूर!", en: "Pee-hu! Dancing Mayur!" });
        },
        lotus: () => {
          window.toddlerAudio.playAartiChimes();
          window.toddlerAudio.speak({ hi: "सुन्दर दिव्य कमल!", en: "Sacred Pink Lotus!" });
        }
      };

      if (sounds[character]) sounds[character]();
    } else {
      spot.classList.add('tickled');
      window.toddlerAudio.playTempleBell(1046.5);
      setTimeout(() => spot.classList.remove('tickled'), 800);
    }
  }
}

// ==========================================================================
// 3. DIVYA BANSURI & JAL TARANG (Vidhya 2: Vadya & Vidhya 12: Udaka-Vadya)
// ==========================================================================
class XylophoneGame {
  constructor(container) {
    this.container = container;
    this.mode = 'bansuri';
    
    this.swaras = [
      { note: 'Sa', freq: 261.63, animal: '🦚', col: '#DC2626' },
      { note: 'Re', freq: 293.66, animal: '🐮', col: '#EA580C' },
      { note: 'Ga', freq: 329.63, animal: '🐐', col: '#F59E0B' },
      { note: 'Ma', freq: 349.23, animal: '🪿', col: '#10B981' },
      { note: 'Pa', freq: 392.00, animal: '🐦', col: '#0284C7' },
      { note: 'Dha', freq: 440.00, animal: '🐴', col: '#4F46E5' },
      { note: 'Ni', freq: 493.88, animal: '🐘', col: '#7C3AED' },
      { note: 'Sȧ', freq: 523.25, animal: '✨', col: '#DB2777' }
    ];

    this.jalBowls = [
      { note: 'Sa', freq: 261.63, level: '90%' },
      { note: 'Re', freq: 293.66, level: '78%' },
      { note: 'Ga', freq: 329.63, level: '65%' },
      { note: 'Pa', freq: 392.00, level: '50%' },
      { note: 'Dha', freq: 440.00, level: '38%' },
      { note: 'Sȧ', freq: 523.25, level: '25%' }
    ];

    this.bhajans = [
      { name: { hi: 'अच्युतं केशवं', en: 'Achyutam Keshavam' }, notes: [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0] },
      { name: { hi: 'हरे कृष्ण', en: 'Hare Krishna' }, notes: [0, 2, 4, 2, 4, 5, 4, 2, 0, 2, 4, 2, 0, 0] },
      { name: { hi: 'गोविन्द गोपाला', en: 'Govinda Gopala' }, notes: [4, 4, 5, 7, 7, 5, 4, 2, 0, 2, 4, 4, 2, 0] }
    ];
    this.selectedBhajanIdx = 0;
    this.bhajan = this.bhajans[0].notes;
    this.bhajanIndex = 0;
    this.magicBhajanMode = false;
  }

  start() {
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const activeBhajanName = this.bhajans[this.selectedBhajanIdx].name[lang] || this.bhajans[this.selectedBhajanIdx].name.en;
    const bansuriLabel = lang === 'hi' ? '🪈 कान्हा की बांसुरी' : '🪈 Krishna Bansuri';
    const jaltarangLabel = lang === 'hi' ? '🥣 जल तरंग' : '🥣 Jal Tarang (Water Bowls)';
    const helperState = this.magicBhajanMode ? (lang === 'hi' ? 'चालू' : 'ON') : (lang === 'hi' ? 'बंद' : 'OFF');
    const helperLabel = lang === 'hi' ? `🦚 भजन सहायक: ${helperState}` : `🦚 Bhajan Helper: ${helperState}`;
    const bellName = lang === 'hi' ? 'मन्दिर घंटी' : 'Mandir Ghanti';
    const damruName = lang === 'hi' ? 'शिव डमरू' : 'Shiva Damru';
    const shankhaName = lang === 'hi' ? 'दिव्य शंख' : 'Divya Shankha';
    const manjiraName = lang === 'hi' ? 'मंजीरा' : 'Manjira';

    this.container.innerHTML = `
      <div class="game-xylophone vedic-theme">
        <div class="xylo-top-bar">
          <div class="instrument-switch">
            <button class="switch-inst-btn ${this.mode === 'bansuri' ? 'active' : ''}" id="switch-bansuri">
              ${bansuriLabel}
            </button>
            <button class="switch-inst-btn ${this.mode === 'jaltarang' ? 'active' : ''}" id="switch-jaltarang">
              ${jaltarangLabel}
            </button>
          </div>

          <button class="magic-melody-btn ${this.magicBhajanMode ? 'active' : ''}" id="magic-melody-toggle">
            ${helperLabel}
          </button>
          <button class="bhajan-select-btn" id="bhajan-select-btn" title="Switch Bhajan Melody">
            🎶 ${activeBhajanName}
          </button>
        </div>

        <div class="drums-container">
          <div class="drum-pad drum-left" data-type="bell">
            <div class="drum-face">🔔</div>
            <div class="drum-name">${bellName}</div>
          </div>
          <div class="drum-pad drum-center" data-type="damru">
            <div class="drum-face">🪘</div>
            <div class="drum-name">${damruName}</div>
          </div>
          <div class="drum-pad drum-right" data-type="shankha">
            <div class="drum-face">🐚</div>
            <div class="drum-name">${shankhaName}</div>
          </div>
          <div class="drum-pad drum-cymbal" data-type="manjira">
            <div class="drum-face">✨</div>
            <div class="drum-name">${manjiraName}</div>
          </div>
        </div>

        <div id="instrument-stage" class="instrument-stage">
          ${this.renderInstrumentContent()}
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateGuideHighlight();
  }

  renderInstrumentContent() {
    if (this.mode === 'bansuri') {
      return `
        <div class="xylophone-board" id="xylo-board">
          ${this.swaras.map((k, idx) => `
            <div class="xylo-bar" data-idx="${idx}" style="--bar-color: ${k.col}; height: ${100 - idx * 4.2}%">
              <div class="xylo-bar-screw top">🪔</div>
              <div class="xylo-bar-label">
                <span class="note-letter">${k.note}</span>
                <span class="note-solfege">${k.animal}</span>
              </div>
              <div class="xylo-bar-screw bottom"></div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      return `
        <div class="jaltarang-board" id="jaltarang-board">
          ${this.jalBowls.map((b, idx) => `
            <div class="jaltarang-item" data-idx="${idx}" data-freq="${b.freq}">
              ${VedicAssets.jalTarangBowl}
              <div class="bowl-note-tag">${b.note}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  bindEvents() {
    const btnBansuri = this.container.querySelector('#switch-bansuri');
    const btnJal = this.container.querySelector('#switch-jaltarang');

    btnBansuri.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.mode = 'bansuri';
      this.render();
    });

    btnJal.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.mode = 'jaltarang';
      this.render();
    });

    const toggle = this.container.querySelector('#magic-melody-toggle');
    toggle.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.magicBhajanMode = !this.magicBhajanMode;
      toggle.classList.toggle('active', this.magicBhajanMode);
      toggle.textContent = `🦚 Bhajan Helper: ${this.magicBhajanMode ? 'ON' : 'OFF'}`;
      this.updateGuideHighlight();
      if (this.magicBhajanMode) {
        const curName = this.bhajans[this.selectedBhajanIdx].name[window.toddlerAudio.currentLanguage] || this.bhajans[this.selectedBhajanIdx].name.en;
        window.toddlerAudio.speak({
          hi: curName + "! कोई भी बार बजाएं!",
          en: "Magic bhajan on! Tap any key to play " + curName + "!"
        });
      }
    });

    const btnBhajanSelect = this.container.querySelector('#bhajan-select-btn');
    if (btnBhajanSelect) {
      btnBhajanSelect.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.selectedBhajanIdx = (this.selectedBhajanIdx + 1) % this.bhajans.length;
        this.bhajan = this.bhajans[this.selectedBhajanIdx].notes;
        this.bhajanIndex = 0;
        const curName = this.bhajans[this.selectedBhajanIdx].name[window.toddlerAudio.currentLanguage] || this.bhajans[this.selectedBhajanIdx].name.en;
        btnBhajanSelect.textContent = "🎶 " + curName;
        window.toddlerAudio.playTempleBell(880);
        window.toddlerAudio.speak({
          hi: curName + " भजन चयनित!",
          en: curName + " melody selected!"
        });
        this.updateGuideHighlight();
      });
    }

    const drums = this.container.querySelectorAll('.drum-pad');
    drums.forEach(drum => {
      drum.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        drum.classList.add('hit');
        const type = drum.dataset.type;
        if (type === 'bell') {
          window.toddlerAudio.playTempleBell(1046.5);
        } else if (type === 'damru') {
          window.toddlerAudio.playDamru();
        } else if (type === 'shankha') {
          window.toddlerAudio.playShankha();
        } else if (type === 'manjira') {
          window.toddlerAudio.playManjira();
        }
        setTimeout(() => drum.classList.remove('hit'), 250);
      });
    });

    const bars = this.container.querySelectorAll('.xylo-bar');
    bars.forEach(bar => {
      bar.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const idx = parseInt(bar.dataset.idx, 10);
        this.hitKey(idx, bar, e);
      });
    });

    const bowls = this.container.querySelectorAll('.jaltarang-item');
    bowls.forEach(bowl => {
      bowl.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        bowl.classList.add('hit-bowl');
        const freq = parseFloat(bowl.dataset.freq);
        window.toddlerAudio.playJalTarang(freq);

        // Animated ripple ring
        const ripple = document.createElement('div');
        ripple.className = 'bowl-water-ripple';
        bowl.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);

        this.spawnNoteParticle(e.clientX, e.clientY, '💧');
        setTimeout(() => bowl.classList.remove('hit-bowl'), 300);
      });
    });
  }

  updateGuideHighlight() {
    const bars = this.container.querySelectorAll('.xylo-bar');
    bars.forEach(b => b.classList.remove('guide-glow'));
    if (this.magicBhajanMode && this.mode === 'bansuri') {
      const activeNotes = this.bhajans[this.selectedBhajanIdx].notes;
      const nextIdx = activeNotes[this.bhajanIndex % activeNotes.length];
      const target = this.container.querySelector(`.xylo-bar[data-idx="${nextIdx}"]`);
      if (target) target.classList.add('guide-glow');
    }
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey() {
    if (this.mode === 'bansuri') {
      const nextIdx = this.magicBhajanMode ? this.bhajan[this.bhajanIndex] : Math.floor(Math.random() * this.swaras.length);
      this.hitKey(nextIdx);
    } else {
      const bowls = this.container.querySelectorAll('.jaltarang-item');
      if (bowls.length > 0) {
        const bowl = bowls[Math.floor(Math.random() * bowls.length)];
        bowl.classList.add('hit-bowl');
        const freq = parseFloat(bowl.dataset.freq);
        window.toddlerAudio.playJalTarang(freq);
        const rect = bowl.getBoundingClientRect();
        this.spawnNoteParticle(rect.left + rect.width / 2, rect.top + 20, '💧');
        setTimeout(() => bowl.classList.remove('hit-bowl'), 300);
      }
    }
  }

  hitKey(clickedIdx, barEl, e) {
    let playIdx = clickedIdx;
    if (this.magicBhajanMode) {
      playIdx = this.bhajan[this.bhajanIndex];
      this.bhajanIndex = (this.bhajanIndex + 1) % this.bhajan.length;
      this.updateGuideHighlight();
    }

    const keyData = this.swaras[playIdx];
    window.toddlerAudio.playBansuri(keyData.freq);

    const targetBar = this.container.querySelector(`.xylo-bar[data-idx="${playIdx}"]`) || barEl;
    if (targetBar) {
      targetBar.classList.add('played');
      setTimeout(() => targetBar.classList.remove('played'), 300);
    }

    const rect = targetBar ? targetBar.getBoundingClientRect() : { left: window.innerWidth / 2, top: 200, width: 60 };
    const cx = e ? e.clientX : (rect.left + rect.width / 2);
    const cy = e ? e.clientY : (rect.top + 30);
    this.spawnNoteParticle(cx, cy, keyData.animal, keyData.col);
  }

  spawnNoteParticle(x, y, symbol, color) {
    const note = document.createElement('div');
    note.className = 'floating-music-note';
    note.textContent = symbol;
    if (color) note.style.color = color;
    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 1200);
  }
}

// ==========================================================================
// 4. SANDHYA AARTI & DIYA LIGHTING (Vidhya 1: Gita & Kala: Jyoti)
// ==========================================================================
class AartiGame {
  constructor(container) {
    this.container = container;
    this.angle = 0;
    this.isRotating = false;
  }

  start() {
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const headerTitle = lang === 'hi' ? 'संध्या आरती: कान्हा के लिए आरती की थाली घुमाएं! 🪔✨' : 'Sandhya Aarti: Move the Diya Thali in Circles for Kanha! 🪔✨';
    const incenseHint = lang === 'hi' ? '💨 अगरबत्ती' : '💨 Incense';
    const circleHint = lang === 'hi' ? '⭕ गोल-गोल घुमाएं / कोई बटन दबाएं' : '⭕ Trace Circles / Press Any Key';
    const roseLabel = lang === 'hi' ? '🌹 गुलाब की पंखुड़ियां' : '🌹 Rose Petals';
    const marigoldLabel = lang === 'hi' ? '🌼 गेंदे के फूल' : '🌼 Marigolds';
    const tulsiLabel = lang === 'hi' ? '🌿 तुलसी दल' : '🌿 Tulsi Dal';
    const mograLabel = lang === 'hi' ? '🌸 मोगरा / कमल' : '🌸 Mogra / Kamal';

    this.container.innerHTML = `
      <div class="game-aarti vedic-theme">
        <div class="aarti-header">
          <h2>${headerTitle}</h2>
        </div>

        <div class="aarti-stage-area">
          <div class="altar-deity">
            ${VedicAssets.balaKrishna}
            <div class="deity-radiance"></div>
          </div>

          <div class="altar-agarbatti-wrap" id="agarbatti-stick" title="Touch Incense for Fragrant Smoke!">
            ${VedicAssets.agarbatti}
            <div class="incense-touch-hint">${incenseHint}</div>
          </div>

          <div class="aarti-plate-wrapper" id="aarti-plate-wrap">
            <div class="aarti-plate-body" id="aarti-plate">
              ${VedicAssets.aartiThali}
            </div>
            <div class="aarti-guide-circle">${circleHint}</div>
          </div>
        </div>

        <div class="aarti-flower-taps">
          <button class="aarti-sprinkle-btn" id="btn-sprinkle-rose">
            ${roseLabel}
          </button>
          <button class="aarti-sprinkle-btn" id="btn-sprinkle-marigold">
            ${marigoldLabel}
          </button>
          <button class="aarti-sprinkle-btn" id="btn-sprinkle-tulsi">
            ${tulsiLabel}
          </button>
          <button class="aarti-sprinkle-btn" id="btn-sprinkle-mogra">
            ${mograLabel}
          </button>
        </div>
      </div>
    `;

    this.bindAartiEvents();
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey() {
    const plate = this.container.querySelector('#aarti-plate');
    this.angle = (this.angle + 40) % 360;
    if (plate) {
      plate.style.transform = `rotate(${this.angle}deg) scale(1.08)`;
      setTimeout(() => { if (plate) plate.style.transform = `rotate(${this.angle}deg) scale(1.0)`; }, 200);
    }
    window.toddlerAudio.playTempleBell(1046.5);
    this.showerAltarPetals(Math.random() > 0.5 ? '🌹' : '🌼');
  }

  bindAartiEvents() {
    const plateWrap = this.container.querySelector('#aarti-plate-wrap');
    const plate = this.container.querySelector('#aarti-plate');

    const onMove = (e) => {
      if (!this.isRotating) return;
      e.preventDefault();
      const rect = plateWrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
      const deg = rad * (180 / Math.PI);
      this.angle = deg;
      plate.style.transform = `rotate(${this.angle}deg) scale(1.06)`;

      if (Math.random() < 0.12) {
        window.toddlerAudio.playTempleBell(1046.5);
      }
    };

    plateWrap.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.isRotating = true;
      window.toddlerAudio.playAartiChimes();
      window.toddlerAudio.speak({ hi: "आरती कुंजबिहारी की! जय श्री कृष्णा!", en: "Aarti for Little Krishna!" });
    });

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', () => {
      this.isRotating = false;
      if (plate) plate.style.transform = `rotate(${this.angle}deg) scale(1.0)`;
    });

    const btnRose = this.container.querySelector('#btn-sprinkle-rose');
    const btnGenda = this.container.querySelector('#btn-sprinkle-marigold');
    const btnTulsi = this.container.querySelector('#btn-sprinkle-tulsi');
    const btnMogra = this.container.querySelector('#btn-sprinkle-mogra');
    const agarbatti = this.container.querySelector('#agarbatti-stick');

    btnRose.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      window.toddlerAudio.playAartiChimes();
      this.showerAltarPetals('🌹');
    });

    btnGenda.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      window.toddlerAudio.playTempleBell(880);
      this.showerAltarPetals('🌼');
    });

    if (btnTulsi) {
      btnTulsi.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playTempleBell(1046.5);
        this.showerAltarPetals('🌿');
      });
    }

    if (btnMogra) {
      btnMogra.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playAartiChimes();
        this.showerAltarPetals('🌸');
      });
    }

    if (agarbatti) {
      agarbatti.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playAartiChimes();
        window.toddlerAudio.speak({
          hi: "सुगन्धित दिव्य धूप और अगरबत्ती!",
          en: "Sweet fragrant incense for Kanha!"
        });
        const rect = agarbatti.getBoundingClientRect();
        for (let s = 0; s < 5; s++) {
          const smoke = document.createElement('div');
          smoke.className = 'incense-smoke-puff';
          smoke.textContent = '💨';
          smoke.style.left = (rect.left + 20 + (Math.random() * 20 - 10)) + 'px';
          smoke.style.top = (rect.top - 10) + 'px';
          document.body.appendChild(smoke);
          setTimeout(function() { smoke.remove(); }, 1200);
        }
      });
    }
  }

  showerAltarPetals(emoji) {
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const petal = document.createElement('div');
        petal.className = 'confetti-star';
        petal.textContent = emoji;
        petal.style.left = `${30 + Math.random() * 40}vw`;
        petal.style.top = '10vh';
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 2000);
      }, i * 60);
    }
  }
}

// ==========================================================================
// 5. PUSHPARCHANA & SACRED OFFERINGS (Vidhya 7 & 8: Pushpastarana)
// ==========================================================================
class ShapeMatchGame {
  constructor(container) {
    this.container = container;
    this.rounds = [
      [
        { id: 'kamal', name: { hi: 'दिव्य कमल', en: 'Divya Kamal' }, emoji: '🪷', color: '#EC4899' },
        { id: 'diya', name: { hi: 'शुभ दीपक', en: 'Auspicious Diya' }, emoji: '🪔', color: '#F59E0B' },
        { id: 'mor_pankh', name: { hi: 'मोर पंख', en: 'Mor Pankh' }, emoji: '🦚', color: '#059669' },
        { id: 'om', name: { hi: 'पवित्र ॐ', en: 'Sacred Om' }, emoji: '🕉️', color: '#DC2626' }
      ],
      [
        { id: 'genda', name: { hi: 'गेंदा फूल', en: 'Genda Phool' }, emoji: '🌼', color: '#FBBF24' },
        { id: 'bansuri', name: { hi: 'बांसुरी', en: 'Krishna Bansuri' }, emoji: '🪈', color: '#EA580C' },
        { id: 'makhan', name: { hi: 'माखन मटकी', en: 'Makhan Pot' }, emoji: '🍯', color: '#D97706' },
        { id: 'ghanti', name: { hi: 'मन्दिर घंटी', en: 'Mandir Bell' }, emoji: '🔔', color: '#F59E0B' }
      ],
      [
        { id: 'tulsi', name: { hi: 'तुलसी दल', en: 'Tulsi Leaves' }, emoji: '🌿', color: '#10B981' },
        { id: 'chakra', name: { hi: 'सुदर्शन चक्र', en: 'Sudarshan Chakra' }, emoji: '☸️', color: '#F59E0B' },
        { id: 'kalash', name: { hi: 'मंगल कलश', en: 'Mangal Kalash' }, emoji: '🏺', color: '#D97706' },
        { id: 'tilak', name: { hi: 'चन्दन तिलक', en: 'Chandan Tilak' }, emoji: '🪔', color: '#EA580C' }
      ]
    ];
    this.currentRoundIdx = 0;
    this.matchedCount = 0;
  }

  start() {
    this.currentRoundIdx = 0;
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const headerTitle = lang === 'hi' ? 'पुष्पार्चना: कान्हा को पवित्र पुष्प व प्रतीक अर्पित करें! 🪷' : 'Pushparchana: Offer Sacred Flowers & Symbols to Kanha! 🪷';
    const roundShapes = this.rounds[this.currentRoundIdx % this.rounds.length];
    this.matchedCount = 0;
    const shuffled = [...roundShapes].sort(() => Math.random() - 0.5);

    this.container.innerHTML = `
      <div class="game-shape-match vedic-theme">
        <div class="match-banner">
          <h2>${headerTitle}</h2>
        </div>

        <div class="shape-targets-row" id="targets-row">
          ${roundShapes.map(s => `
            <div class="target-slot" data-shape-id="${s.id}" style="--slot-color: ${s.color};">
              <div class="slot-dashed-outline">
                <span class="slot-ghost-emoji">${s.emoji}</span>
              </div>
              <div class="slot-text-label">${s.name[window.toddlerAudio.currentLanguage] || s.name.en}</div>
            </div>
          `).join('')}
        </div>

        <div class="shape-pieces-row" id="pieces-row">
          ${shuffled.map(s => `
            <div class="shape-card" draggable="true" data-shape-id="${s.id}" style="--shape-color: ${s.color};">
              <div class="shape-visual-icon">${s.emoji}</div>
              <div class="shape-card-title">${s.name[window.toddlerAudio.currentLanguage] || s.name.en}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey() {
    const cards = this.container.querySelectorAll('.shape-card:not(.fly-matched)');
    if (cards.length > 0) {
      const card = cards[0];
      const id = card.dataset.shapeId;
      const target = this.container.querySelector(`.target-slot[data-shape-id="${id}"]`);
      if (target && !target.classList.contains('matched')) {
        this.matchShape(card, target);
      }
    }
  }

  bindEvents() {
    const cards = this.container.querySelectorAll('.shape-card');
    cards.forEach(card => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;

      const onPointerDown = (e) => {
        e.preventDefault();
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;

        const onPointerMove = (ev) => {
          const dist = Math.hypot(ev.clientX - startX, ev.clientY - startY);
          if (dist > 8) {
            isDragging = true;
            card.classList.add('is-dragging');
            card.style.transform = `translate(${ev.clientX - startX}px, ${ev.clientY - startY}px) scale(1.12)`;

            // Proximity magnetic hover detection
            const id = card.dataset.shapeId;
            const target = this.container.querySelector(`.target-slot[data-shape-id="${id}"]`);
            if (target && !target.classList.contains('matched')) {
              const tr = target.getBoundingClientRect();
              const tcX = tr.left + tr.width / 2;
              const tcY = tr.top + tr.height / 2;
              const snapRadius = Math.max(tr.width, tr.height) * 1.15;
              const targetDist = Math.hypot(ev.clientX - tcX, ev.clientY - tcY);
              if (targetDist <= snapRadius) {
                target.classList.add('magnetic-active');
              } else {
                target.classList.remove('magnetic-active');
              }
            }
          }
        };

        const onPointerUp = (ev) => {
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('pointercancel', onPointerUp);

          card.classList.remove('is-dragging');
          card.style.transform = '';

          const allTargets = this.container.querySelectorAll('.target-slot');
          allTargets.forEach(t => t.classList.remove('magnetic-active'));

          const id = card.dataset.shapeId;
          const target = this.container.querySelector(`.target-slot[data-shape-id="${id}"]`);

          if (isDragging && target && !target.classList.contains('matched')) {
            const tr = target.getBoundingClientRect();
            const tcX = tr.left + tr.width / 2;
            const tcY = tr.top + tr.height / 2;
            const snapRadius = Math.max(tr.width, tr.height) * 0.95; // Generous toddler magnetic snap aura
            const targetDist = Math.hypot(ev.clientX - tcX, ev.clientY - tcY);

            if (targetDist <= snapRadius || (ev.clientX >= tr.left && ev.clientX <= tr.right && ev.clientY >= tr.top && ev.clientY <= tr.bottom)) {
              this.matchShape(card, target);
              return;
            }
          }

          if (target && !target.classList.contains('matched')) {
            this.matchShape(card, target);
          }
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
      };

      card.addEventListener('pointerdown', onPointerDown);
    });
  }

  matchShape(card, target) {
    if (target.classList.contains('matched')) return;
    target.classList.add('matched');

    window.toddlerAudio.playTempleBell();
    window.toddlerAudio.playGhungroo();
    window.toddlerAudio.speak({
      hi: "सुन्दर समर्पण! शुभम्!",
      en: "Beautiful sacred offering! Haribol!"
    });

    card.classList.add('fly-matched');
    target.innerHTML = card.innerHTML;
    target.style.background = card.style.getPropertyValue('--shape-color');
    card.style.visibility = 'hidden';

    this.matchedCount++;
    const total = this.rounds[this.currentRoundIdx % this.rounds.length].length;

    if (this.matchedCount >= total) {
      setTimeout(() => this.triggerRoundCelebration(), 500);
    }
  }

  triggerRoundCelebration() {
    window.toddlerAudio.playCelebration();
    window.toddlerAudio.vibrate([40, 50, 40]);
    setTimeout(() => {
      window.toddlerAudio.playRandomEncouragement();
    }, 600);

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const c = document.createElement('div');
        c.className = 'confetti-star';
        c.textContent = ['🪷', '🦚', '🪔', '🌼', '✨', '🍯'][Math.floor(Math.random() * 6)];
        c.style.left = `${Math.random() * 95}vw`;
        c.style.top = '-50px';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 2500);
      }, i * 50);
    }

    setTimeout(() => {
      this.currentRoundIdx++;
      this.render();
    }, 2800);
  }
}

// ==========================================================================
// 6. DIVYA RANGOLI & SACRED CANVAS (Vidhya 4 & 5: Alekhya)
// ==========================================================================
class SparkleCanvasGame {
  constructor(container) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;
    this.currentStamp = 'om';
    this.mandalaMode = true;
    this.selectedColor = '#F59E0B';
    this.stamps = [
      { id: 'om', emoji: '🕉️', name: { hi: 'ॐ', en: 'Om' } },
      { id: 'lotus', emoji: '🪷', name: { hi: 'कमल', en: 'Kamal' } },
      { id: 'peacock', emoji: '🦚', name: { hi: 'मोर पंख', en: 'Mor Pankh' } },
      { id: 'diya', emoji: '🪔', name: { hi: 'दीपक', en: 'Diya' } },
      { id: 'footprints', emoji: '👣', name: { hi: 'चरण', en: 'Charan' } },
      { id: 'flower', emoji: '🌼', name: { hi: 'गेंदा', en: 'Genda' } },
      { id: 'tulsi', emoji: '🌿', name: { hi: 'तुलसी', en: 'Tulsi' } },
      { id: 'makhan', emoji: '🍯', name: { hi: 'माखन', en: 'Makhan' } }
    ];
    this.goldenHue = 45;
    this.pointers = new Map();
  }

  start() {
    this.render();
    this.initCanvas();
  }

  stop() {
    window.removeEventListener('resize', this.resizeHandler);
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const mandalaState = this.mandalaMode ? (lang === 'hi' ? 'चालू' : 'ON') : (lang === 'hi' ? 'बंद' : 'OFF');
    const mandalaLabel = lang === 'hi' ? `🌸 मंडला: ${mandalaState}` : `🌸 Mandala: ${mandalaState}`;
    const cleanLabel = lang === 'hi' ? '🌊 गंगा जल (स्वच्छ)' : '🌊 Ganga Jal (Clean)';

    this.container.innerHTML = `
      <div class="game-sparkle-canvas vedic-theme">
        <canvas id="sensory-canvas"></canvas>

        <div class="stamp-bar">
          <button class="mandala-toggle-btn ${this.mandalaMode ? 'active' : ''}" id="mandala-toggle" title="Toggle Symmetry Mandala Mode">
            ${mandalaLabel}
          </button>

          <div class="stamps-scroll">
            ${this.stamps.map((s, idx) => `
              <button class="stamp-btn ${idx === 0 ? 'selected' : ''}" data-stamp="${s.id}" data-emoji="${s.emoji}">
                ${s.emoji}
                <span class="stamp-label">${s.name[lang] || s.name.en}</span>
              </button>
            `).join('')}
          </div>

          <button class="clear-canvas-btn" id="clear-btn">
            ${cleanLabel}
          </button>
        </div>
      </div>
    `;

    const toggle = this.container.querySelector('#mandala-toggle');
    toggle.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.mandalaMode = !this.mandalaMode;
      toggle.classList.toggle('active', this.mandalaMode);
      const curLang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const curState = this.mandalaMode ? (curLang === 'hi' ? 'चालू' : 'ON') : (curLang === 'hi' ? 'बंद' : 'OFF');
      toggle.textContent = curLang === 'hi' ? `🌸 मंडला: ${curState}` : `🌸 Mandala: ${curState}`;
      window.toddlerAudio.playAartiChimes();
      window.toddlerAudio.speak({
        hi: this.mandalaMode ? "दिव्य मंडला रंगोली सक्रिय!" : "मुक्त रंगोली सक्रिय!",
        en: this.mandalaMode ? "Mandala symmetry enabled!" : "Freehand rangoli enabled!"
      });
    });

    const stampBtns = this.container.querySelectorAll('.stamp-btn');
    stampBtns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        stampBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.currentStamp = btn.dataset.stamp;
        window.toddlerAudio.playAartiChimes();
      });
    });

    const clearBtn = this.container.querySelector('#clear-btn');
    clearBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.clearCanvas();
    });
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey() {
    if (!this.canvas) return;
    const x = 60 + Math.random() * (window.innerWidth - 120);
    const y = 80 + Math.random() * (window.innerHeight - 220);
    const stampObj = this.stamps[Math.floor(Math.random() * this.stamps.length)];
    this.drawStamp(x, y, stampObj.emoji);
    window.toddlerAudio.playTempleBell(987.77);
  }

  initCanvas() {
    this.canvas = this.container.querySelector('#sensory-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    this.resizeHandler = () => this.resizeCanvas();
    window.addEventListener('resize', this.resizeHandler);

    this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const oldWidth = this.canvas.width;
    const oldHeight = this.canvas.height;

    // Preserve existing toddler artwork across orientation change or window resize
    let backupCanvas = null;
    if (oldWidth > 0 && oldHeight > 0) {
      backupCanvas = document.createElement('canvas');
      backupCanvas.width = oldWidth;
      backupCanvas.height = oldHeight;
      const bCtx = backupCanvas.getContext('2d');
      if (bCtx) {
        bCtx.drawImage(this.canvas, 0, 0);
      }
    }

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.fillBackground();

    if (backupCanvas && this.ctx) {
      this.ctx.drawImage(backupCanvas, 0, 0, Math.min(oldWidth, this.canvas.width), Math.min(oldHeight, this.canvas.height));
    }
  }

  fillBackground() {
    this.ctx.fillStyle = '#0F172A';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
    for (let i = 0; i < 40; i++) {
      const rx = (i * 101) % this.canvas.width;
      const ry = (i * 137) % this.canvas.height;
      this.ctx.beginPath();
      this.ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  handlePointerDown(e) {
    e.preventDefault();
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const stampObj = this.stamps.find(s => s.id === this.currentStamp);
    if (stampObj) {
      this.drawStamp(e.clientX, e.clientY, stampObj.emoji);
      window.toddlerAudio.playTempleBell(987.77);
    }
  }

  handlePointerMove(e) {
    if (!this.pointers.has(e.pointerId)) return;
    e.preventDefault();

    const prev = this.pointers.get(e.pointerId);
    const curr = { x: e.clientX, y: e.clientY };

    this.drawGoldenKumkumRibbon(prev.x, prev.y, curr.x, curr.y);
    this.pointers.set(e.pointerId, curr);

    if (Math.random() < 0.15) {
      window.toddlerAudio.playAartiChimes();
    }
  }

  handlePointerUp(e) {
    this.pointers.delete(e.pointerId);
  }

  drawStrokeSegment(x1, y1, x2, y2, color) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = 16;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = color;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 18;
    this.ctx.stroke();

    for (let i = 0; i < 2; i++) {
      const gx = x2 + (Math.random() * 20 - 10);
      const gy = y2 + (Math.random() * 20 - 10);
      this.ctx.beginPath();
      this.ctx.arc(gx, gy, 3.0, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FEF9C3';
      this.ctx.shadowColor = '#FFFFFF';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  drawGoldenKumkumRibbon(x1, y1, x2, y2) {
    const colors = ['#F59E0B', '#DC2626', '#FEF08A', '#10B981', '#EC4899'];
    this.goldenHue = (this.goldenHue + 1) % colors.length;
    const color = colors[this.goldenHue];

    if (this.mandalaMode) {
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      const dx1 = x1 - cx;
      const dy1 = y1 - cy;
      const dx2 = x2 - cx;
      const dy2 = y2 - cy;

      this.drawStrokeSegment(cx + dx1, cy + dy1, cx + dx2, cy + dy2, color);
      this.drawStrokeSegment(cx - dx1, cy + dy1, cx - dx2, cy + dy2, color);
      this.drawStrokeSegment(cx + dx1, cy - dy1, cx + dx2, cy - dy2, color);
      this.drawStrokeSegment(cx - dx1, cy - dy1, cx - dx2, cy - dy2, color);
    } else {
      this.drawStrokeSegment(x1, y1, x2, y2, color);
    }
  }

  drawStamp(x, y, emoji) {
    const drawOne = (sx, sy) => {
      this.ctx.save();
      this.ctx.font = '64px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.shadowColor = '#F59E0B';
      this.ctx.shadowBlur = 25;
      this.ctx.fillText(emoji, sx, sy);
      this.ctx.restore();

      const ripple = document.createElement('div');
      ripple.className = 'stamp-ripple';
      ripple.style.left = sx + 'px';
      ripple.style.top = sy + 'px';
      document.body.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 600);
    };

    if (this.mandalaMode) {
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      drawOne(cx + dx, cy + dy);
      drawOne(cx - dx, cy + dy);
      drawOne(cx + dx, cy - dy);
      drawOne(cx - dx, cy - dy);
    } else {
      drawOne(x, y);
    }
  }

  clearCanvas() {
    window.toddlerAudio.playTempleBell(880);
    window.toddlerAudio.speak({ hi: "पवित्र गंगा जल! सब स्वच्छ!", en: "Sacred Ganga water! All clean!" });

    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
    let step = 0;
    const fade = () => {
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      step++;
      if (step < 6) {
        requestAnimationFrame(fade);
      } else {
        this.fillBackground();
      }
    };
    fade();
  }
}

// ==========================================================================
// 7. KANHA SHRINGAR & SEVA (Vidhya 44: Bhushana-Yojana & Veshya)
// ==========================================================================
class ShringarGame {
  constructor(container) {
    this.container = container;
    this.items = [
      { id: 'mor_pankh', selector: '#layer-mor-pankh', name: { hi: 'मोर पंख', en: 'Mor Pankh (Feather)' }, icon: '🦚', sound: 'peacock' },
      { id: 'tilak', selector: '#layer-tilak', name: { hi: 'चन्दन तिलक', en: 'Chandan Tilak' }, icon: '🪔', sound: 'bell' },
      { id: 'kundal', selector: '#layer-kundal', name: { hi: 'स्वर्ण कुण्डल', en: 'Kundala (Earrings)' }, icon: '✨', sound: 'ghungroo' },
      { id: 'mala', selector: '#layer-mala', name: { hi: 'वैजयंती माला', en: 'Vaijayanti Mala' }, icon: '📿', sound: 'manjira' },
      { id: 'bansuri', selector: '#layer-bansuri', name: { hi: 'दिव्य बांसुरी', en: 'Krishna Bansuri' }, icon: '🪈', sound: 'flute' },
      { id: 'makhan', selector: '#layer-makhan', name: { hi: 'माखन भोग', en: 'Feed Sweet Butter' }, icon: '🍯', sound: 'giggle' }
    ];
    this.adorned = new Set();
  }

  start() {
    const saved = window.ToddlerPersistence ? window.ToddlerPersistence.get('shringar_adorned', null) : null;
    if (saved && Array.isArray(saved)) {
      this.adorned = new Set(saved);
    } else {
      this.adorned.clear();
    }
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const headerTitle = lang === 'hi' ? 'कान्हा श्रृंगार व माखन सेवा: बाल गोपाला को सजाएं! 👑✨' : 'Kanha Shringar & Makhan Seva: Adorn Bala Gopala! 👑✨';
    const tickleHint = lang === 'hi' ? '👶 कान्हा को गुदगुदी करें!' : '👶 Tap Kanha to tickle!';
    const trayTitle = lang === 'hi' ? '✨ कान्हा के श्रृंगार के लिए वस्तुएं चुनें! ✨' : '✨ Tap items to adorn Little Kanha! ✨';
    const resetLabel = lang === 'hi' ? '🛁 स्नान सेवा' : '🛁 Snana (Reset)';

    this.container.innerHTML = `
      <div class="game-shringar vedic-theme">
        <div class="shringar-header">
          <h2>${headerTitle}</h2>
        </div>

        <div class="shringar-stage">
          <!-- Central Interactive Baby Krishna -->
          <div class="shringar-avatar-wrap" id="shringar-krishna" title="Tap Kanha to tickle Him!">
            ${VedicAssets.krishnaShringarAvatar}
            <div class="shringar-tickle-hint">${tickleHint}</div>
          </div>
        </div>

        <!-- Sacred Adornment Item Tray -->
        <div class="shringar-tray">
          <div class="tray-title-row">
            <div class="tray-title">${trayTitle}</div>
            <button class="shringar-reset-btn" id="shringar-reset-btn" title="Give Kanha a fresh Snana (clean all adornments)">
              ${resetLabel}
            </button>
          </div>
          <div class="tray-items-grid">
            ${this.items.map(item => `
              <button class="shringar-item-btn ${this.adorned.has(item.id) ? 'adorned' : ''}" data-id="${item.id}" title="${item.name[lang] || item.name.en}">
                <span class="item-icon">${item.icon}</span>
                <span class="item-label">${item.name[lang] || item.name.en}</span>
                <span class="item-status">${this.adorned.has(item.id) ? '✅' : '👉'}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateLayers();
  }

  bindEvents() {
    const avatar = this.container.querySelector('#shringar-krishna');
    if (avatar) {
      avatar.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        avatar.classList.add('avatar-happy');
        window.toddlerAudio.playBabyGiggle();
        window.toddlerAudio.playGhungroo();
        this.spawnJoyParticles(e.clientX, e.clientY, '💖');
        setTimeout(() => avatar.classList.remove('avatar-happy'), 600);
      });
    }

    const resetBtn = this.container.querySelector('#shringar-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.adorned.clear();
        if (window.ToddlerPersistence) {
          window.ToddlerPersistence.set('shringar_adorned', []);
        }
        window.toddlerAudio.playWaterSplash();
        window.toddlerAudio.playTempleBell(1046.5);
        window.toddlerAudio.speak({
          hi: "यमुना जल से कान्हा का दिव्य स्नान! जय श्री कृष्णा!",
          en: "Fresh Yamuna water bath for little Krishna! All clean!"
        });
        this.render();
      });
    }

    const btns = this.container.querySelectorAll('.shringar-item-btn');
    btns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        this.toggleAdornment(id, e);
      });
    });
  }

  toggleAdornment(id, e) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    if (this.adorned.has(id)) {
      this.adorned.delete(id);
      window.toddlerAudio.playTempleBell(880);
    } else {
      this.adorned.add(id);

      if (item.sound === 'peacock') {
        window.toddlerAudio.playPeacockCall();
      } else if (item.sound === 'flute') {
        window.toddlerAudio.playDivineFlutePhrase();
      } else if (item.sound === 'ghungroo') {
        window.toddlerAudio.playGhungroo();
      } else if (item.sound === 'manjira') {
        window.toddlerAudio.playManjira();
      } else if (item.sound === 'giggle') {
        window.toddlerAudio.playBabyGiggle();
        window.toddlerAudio.playMakhanPop();
      } else {
        window.toddlerAudio.playTempleBell(1046.5);
      }

      const speechPhrases = {
        mor_pankh: { hi: "सुन्दर मोर पंख! कान्हा का मुकुट!", en: "Sweet peacock feather for Kanha!" },
        tilak: { hi: "कस्तूरी चन्दन तिलक! जय श्री कृष्णा!", en: "Sacred chandan tilak on Kanha's forehead!" },
        kundal: { hi: "स्वर्ण कुण्डल! कान्हा के कान चमके!", en: "Golden earrings gleaming!" },
        mala: { hi: "वैजयंती फूल माला! अति प्रिय!", en: "Vaijayanti garland for little Krishna!" },
        bansuri: { hi: "मधुर दिव्य बांसुरी! अच्युतं केशवं!", en: "Divine Bansuri flute in Kanha's hands!" },
        makhan: { hi: "यशोदा मैया का ताजा माखन! अति स्वादिष्ट!", en: "Fresh sweet butter for Kanha! Delicious!" }
      };

      if (speechPhrases[id]) {
        window.toddlerAudio.speak(speechPhrases[id]);
      }

      const cx = e ? e.clientX : window.innerWidth / 2;
      const cy = e ? e.clientY : 300;
      this.spawnJoyParticles(cx, cy, item.icon);

      if (this.adorned.size === this.items.length) {
        setTimeout(() => this.celebrateFullShringar(), 700);
      }
    }

    if (window.ToddlerPersistence) {
      window.ToddlerPersistence.set('shringar_adorned', Array.from(this.adorned));
    }

    this.updateLayers();
  }

  updateLayers() {
    this.items.forEach(item => {
      const layer = this.container.querySelector(item.selector);
      if (layer) {
        layer.classList.toggle('hidden', !this.adorned.has(item.id));
      }
      const btn = this.container.querySelector(`.shringar-item-btn[data-id="${item.id}"]`);
      if (btn) {
        const isDone = this.adorned.has(item.id);
        btn.classList.toggle('adorned', isDone);
        const st = btn.querySelector('.item-status');
        if (st) st.textContent = isDone ? '✅' : '👉';
      }
    });
  }

  celebrateFullShringar() {
    window.toddlerAudio.playCelebration();
    window.toddlerAudio.playBabyGiggle();
    window.toddlerAudio.speak({
      hi: "सम्पूर्ण दिव्य श्रृंगar! बाल गोपाला की जय! राधे राधे!",
      en: "All adorned beautifully! Jai Bala Gopala! Radhe Radhe!"
    });

    const avatar = this.container.querySelector('#shringar-krishna');
    if (avatar) avatar.classList.add('avatar-celebrate');

    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'confetti-star';
        p.textContent = ['👑', '🦚', '🪈', '🪷', '✨', '🍯', '🌼'][Math.floor(Math.random() * 7)];
        p.style.left = `${Math.random() * 95}vw`;
        p.style.top = '-40px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2500);
      }, i * 50);
    }

    setTimeout(() => {
      if (avatar) avatar.classList.remove('avatar-celebrate');
    }, 3000);
  }

  spawnJoyParticles(x, y, emoji) {
    for (let i = 0; i < 8; i++) {
      const drop = document.createElement('div');
      drop.className = 'floating-shringar-sparkle';
      drop.textContent = emoji || '✨';
      drop.style.left = `${x + (Math.random() * 60 - 30)}px`;
      drop.style.top = `${y + (Math.random() * 40 - 20)}px`;
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 1000);
    }
  }

  handleAnyKey() {
    const unadorned = this.items.filter(i => !this.adorned.has(i.id));
    if (unadorned.length > 0) {
      this.toggleAdornment(unadorned[0].id);
    } else {
      window.toddlerAudio.playBabyGiggle();
      window.toddlerAudio.playMakhanPop();
      const avatar = this.container.querySelector('#shringar-krishna');
      if (avatar) {
        avatar.classList.add('avatar-happy');
        setTimeout(() => avatar.classList.remove('avatar-happy'), 500);
      }
    }
  }
}

// Global Exports
if (typeof window !== 'undefined') {
  window.BubbleGame = BubbleGame;
  window.PeekabooGame = PeekabooGame;
  window.XylophoneGame = XylophoneGame;
  window.AartiGame = AartiGame;
  window.ShapeMatchGame = ShapeMatchGame;
  window.SparkleCanvasGame = SparkleCanvasGame;
  window.ShringarGame = ShringarGame;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BubbleGame,
    PeekabooGame,
    XylophoneGame,
    AartiGame,
    ShapeMatchGame,
    SparkleCanvasGame,
    ShringarGame,
    ToddlerPersistence,
    ElementPool
  };
}
