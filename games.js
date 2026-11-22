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

// ==========================================================================
// VRINDAVAN LILA STICKER & REWARD BADGES SYSTEM (Positive Toddler Motivation)
// ==========================================================================
const ToddlerRewards = {
  stickers: [
    {
      id: 'butter_lover',
      icon: '🍯',
      title: { hi: 'माखन प्रेमी', en: 'Butter Lover' },
      desc: { hi: 'ताजा माखन मटकी फोड़ी!', en: 'Popped sweet butter pots!' }
    },
    {
      id: 'gau_sevak',
      icon: '🐮',
      title: { hi: 'गौ सेवक', en: 'Gau Sevak' },
      desc: { hi: 'गऊ माता को हरी घास खिलाई!', en: 'Nurtured holy Gau Mata!' }
    },
    {
      id: 'bansuri_vadak',
      icon: '🪈',
      title: { hi: 'मुरलीधर', en: 'Murlidhar' },
      desc: { hi: 'कान्हा की बांसुरी व जल तरंग बजाया!', en: 'Played sweet flute notes!' }
    },
    {
      id: 'aarti_bhakt',
      icon: '🪔',
      title: { hi: 'संध्या ज्योति', en: 'Aarti Jyoti' },
      desc: { hi: 'कान्हा की पावन आरती उतारी!', en: 'Offered sacred evening Aarti!' }
    },
    {
      id: 'pushpa_archak',
      icon: '🪷',
      title: { hi: 'पुष्प अर्चक', en: 'Flower Archak' },
      desc: { hi: 'कमल व गेंदे के फूल अर्पित किए!', en: 'Offered holy blossoms!' }
    },
    {
      id: 'rangoli_shilpi',
      icon: '✨',
      title: { hi: 'रंगोली शिल्पी', en: 'Rangoli Artist' },
      desc: { hi: 'दिव्य प्रकाश की रंगोली बनाई!', en: 'Painted glowing starlight!' }
    },
    {
      id: 'kanha_shringar',
      icon: '👑',
      title: { hi: 'कान्हा सेवक', en: 'Kanha Adorner' },
      desc: { hi: 'मोर पंख, मुकुट व माला सजाई!', en: 'Adorned Little Krishna!' }
    },
    {
      id: 'akshara_vidya',
      icon: '🔤',
      title: { hi: 'विद्यार्थी', en: 'Akshara Learner' },
      desc: { hi: 'अक्षर व १-१० गिनती सीखी!', en: 'Learned sacred letters & counts!' }
    },
    {
      id: 'tulsi_mitra',
      icon: '🌿',
      title: { hi: 'तुलसी मित्र', en: 'Tulsi Nurturer' },
      desc: { hi: 'तुलसी मैया को पावन जल दिया!', en: 'Nurtured sacred Tulsi!' }
    },
    {
      id: 'shanti_yogi',
      icon: '🧘',
      title: { hi: 'शांत योगी', en: 'Mindful Yogi' },
      desc: { hi: 'कमल व भ्रामरी प्राणायाम किया!', en: 'Practiced peaceful breathing!' }
    },
    {
      id: 'matki_shikhar',
      icon: '🏺',
      title: { hi: 'मटकी शिल्पी', en: 'Tower Builder' },
      desc: { hi: 'मोंटेसरी मटकी शिखर संतुलित किया!', en: 'Balanced the butter pot tower!' }
    },
    {
      id: 'pancha_bhuta',
      icon: '🌍',
      title: { hi: 'तत्वदर्शी', en: 'Element Explorer' },
      desc: { hi: 'पांचों महाभूत तत्वों को जाना!', en: 'Discovered the 5 sacred elements!' }
    },
    {
      id: 'utsav_ananda',
      icon: '🪢',
      title: { hi: 'उत्सव आनन्द', en: 'Festival Joy' },
      desc: { hi: 'कान्हा का झूला झुलाया व दीप जलाए!', en: 'Celebrated Janmashtami & Diwali!' }
    },
    {
      id: 'naad_brahma',
      icon: '🪕',
      title: { hi: 'नाद ब्रह्म', en: 'Sacred Musician' },
      desc: { hi: 'वीणा, मृदंग व मंजीरा बजाया!', en: 'Played divine classical instruments!' }
    }
  ],

  getUnlocked: function() {
    if (typeof window !== 'undefined' && window.ToddlerPersistence) {
      const saved = window.ToddlerPersistence.get('unlocked_stickers', []);
      return Array.isArray(saved) ? saved : [];
    }
    return [];
  },

  isUnlocked: function(id) {
    return this.getUnlocked().indexOf(id) !== -1;
  },

  award: function(id) {
    const list = this.getUnlocked();
    if (list.indexOf(id) !== -1) return false;

    list.push(id);
    if (typeof window !== 'undefined' && window.ToddlerPersistence) {
      window.ToddlerPersistence.set('unlocked_stickers', list);
    }

    const sticker = this.stickers.find(function(s) { return s.id === id; });
    if (sticker) {
      this.showToast(sticker);
      this.playStickerSound(sticker);
      this.updateNavbarBadge();
    }
    return true;
  },

  updateNavbarBadge: function() {
    if (typeof document === 'undefined') return;
    const badge = document.getElementById('rewards-count-badge');
    if (badge) {
      const unlocked = this.getUnlocked().length;
      badge.textContent = unlocked + ' / ' + this.stickers.length;
      badge.classList.add('badge-bounce');
      setTimeout(function() { badge.classList.remove('badge-bounce'); }, 600);
    }
  },

  playStickerSound: function(sticker) {
    if (typeof window === 'undefined' || !window.toddlerAudio) return;
    window.toddlerAudio.playCelebration();
    setTimeout(function() {
      if (window.toddlerAudio) window.toddlerAudio.playBabyGiggle();
    }, 350);

    const lang = window.toddlerAudio.currentLanguage ? window.toddlerAudio.currentLanguage : 'hi';
    const title = sticker.title[lang] || sticker.title.en;
    window.toddlerAudio.speak({
      hi: "अद्भुत! नया उपहार मिला: " + title + "! शाबाश!",
      en: "Hooray! New sticker unlocked: " + title + "! Well done!"
    });
  },

  showToast: function(sticker) {
    if (typeof document === 'undefined') return;
    const lang = (typeof window !== 'undefined' && window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const title = sticker.title[lang] || sticker.title.en;
    const toast = document.createElement('div');
    toast.className = 'rewards-toast-popup';
    toast.innerHTML = [
      '<span class="toast-icon">' + sticker.icon + '</span>',
      '<div class="toast-text">',
      '  <span class="toast-heading">' + (lang === 'hi' ? '🎁 नया उपहार मिला!' : '🎁 New Sticker!') + '</span>',
      '  <span class="toast-sticker-name">' + title + '</span>',
      '</div>',
      '<span class="toast-sparkle">✨</span>'
    ].join('');
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('fade-out');
      setTimeout(function() { toast.remove(); }, 400);
    }, 2800);
  }
};

if (typeof window !== 'undefined') {
  window.ToddlerRewards = ToddlerRewards;
}

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
    this.category = 'makhan'; // 'makhan', 'flowers', 'numbers', 'letters'
    this.categories = {
      makhan: ['🦚', '🍯', '🪷', '🪈', '🕉️', '⭐', '🔔', '🐮'],
      flowers: ['🌸', '🪷', '🌼', '🌺', '🌹', '🌻', '🌿'],
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M', 'O', 'P', 'R', 'S']
    };
    this.vedicItems = this.categories.makhan;
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

        <!-- Sensory Category Selector Pills -->
        <div class="bubble-category-bar">
          <button class="bubble-cat-btn ${this.category === 'makhan' ? 'active' : ''}" data-cat="makhan">🍯 ${lang === 'hi' ? 'माखन' : 'Butter'}</button>
          <button class="bubble-cat-btn ${this.category === 'flowers' ? 'active' : ''}" data-cat="flowers">🌸 ${lang === 'hi' ? 'पुष्प' : 'Flowers'}</button>
          <button class="bubble-cat-btn ${this.category === 'numbers' ? 'active' : ''}" data-cat="numbers">🔢 ${lang === 'hi' ? 'संख्या' : '1-10'}</button>
          <button class="bubble-cat-btn ${this.category === 'letters' ? 'active' : ''}" data-cat="letters">🔤 ${lang === 'hi' ? 'अक्षर' : 'A-Z'}</button>
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

    // Category button toggles
    const catBtns = this.container.querySelectorAll('.bubble-cat-btn');
    catBtns.forEach(b => {
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.category = b.dataset.cat;
        catBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.cat === this.category));
        window.toddlerAudio.playAartiChimes();
        window.toddlerAudio.triggerHaptic('light');
      });
    });

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

    const isMatka = (this.category === 'makhan') ? (Math.random() > 0.45) : false;
    const kala = this.kalas[Math.floor(Math.random() * this.kalas.length)];
    const activeList = this.categories[this.category] || this.categories.makhan;
    const symbol = activeList[Math.floor(Math.random() * activeList.length)];
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
        <div class="soap-bubble-body" style="border-color: ${kala.col}; box-shadow: inset 0 0 16px ${kala.col};">
          <div class="bubble-reflection"></div>
          <div class="bubble-reflection-sub"></div>
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

    if (this.category === 'numbers') {
      window.toddlerAudio.speak(symbol);
      window.toddlerAudio.playAscendingPop(parseInt(symbol, 10) || 1);
    } else if (this.category === 'letters') {
      window.toddlerAudio.speakLetter(symbol);
      window.toddlerAudio.playAscendingPop(this.popCount);
    } else if (this.category === 'flowers') {
      window.toddlerAudio.playAartiChimes();
      CelebrationPetalShower.shower();
    } else if (isMatka) {
      window.toddlerAudio.playMakhanPop();
      window.toddlerAudio.playGhungroo();
    } else {
      window.toddlerAudio.playAscendingPop(this.popCount);
    }

    this.popCount++;
    if (this.popCount >= 3 && window.ToddlerRewards) {
      window.ToddlerRewards.award('butter_lover');
    }
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
      if (window.ToddlerRewards) {
        window.ToddlerRewards.award('gau_sevak');
      }
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
      { name: { hi: 'हरे कृष्ण महामन्त्र', en: 'Hare Krishna' }, notes: [0, 2, 4, 2, 4, 5, 4, 2, 0, 2, 4, 2, 0, 0] },
      { name: { hi: 'गोविन्द गोपाला', en: 'Govinda Gopala' }, notes: [4, 4, 5, 7, 7, 5, 4, 2, 0, 2, 4, 4, 2, 0] },
      { name: { hi: 'राधे राधे गोविन्द', en: 'Radhe Radhe Govinda' }, notes: [0, 2, 4, 4, 5, 4, 2, 0, 2, 4, 5, 7, 5, 4] },
      { name: { hi: 'छोटी छोटी गैयाँ', en: 'Chhoti Chhoti Gaiya' }, notes: [4, 4, 2, 2, 0, 0, 2, 4, 4, 5, 4, 2, 0, 0] }
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
      this.bhajanIndex = this.bhajanIndex + 1;
      if (this.bhajanIndex >= this.bhajan.length) {
        this.bhajanIndex = 0;
        setTimeout(() => {
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('celebration');
            window.toddlerAudio.playCelebration();
            window.toddlerAudio.playRandomEncouragement();
          }
          CelebrationPetalShower.shower();
        }, 350);
      }
      this.updateGuideHighlight();
    }

    const keyData = this.swaras[playIdx];
    window.toddlerAudio.playBansuri(keyData.freq);
    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('bansuri_vadak');
    }

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
          <div class="altar-bell-rope" id="altar-bell-rope" title="Ring the Sacred Temple Bell!">
            <div class="bell-chain"></div>
            <div class="hanging-bell-icon">🔔</div>
            <div class="incense-touch-hint">${lang === 'hi' ? '🔔 घंटी' : '🔔 Bell'}</div>
          </div>

          <div class="altar-deity">
            ${VedicAssets.balaKrishna}
            <div class="deity-radiance"></div>
          </div>

          <div class="altar-shankha-wrap" id="altar-shankha" title="Blow the Sacred Conch Shell!">
            <div class="shankha-icon">🐚</div>
            <div class="incense-touch-hint">${lang === 'hi' ? '🐚 शंख' : '🐚 Shankha'}</div>
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
      if (window.ToddlerRewards) {
        window.ToddlerRewards.award('aarti_bhakt');
      }
    });

    const bellRope = this.container.querySelector('#altar-bell-rope');
    if (bellRope) {
      bellRope.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        bellRope.classList.add('bell-swinging');
        window.toddlerAudio.playTempleBell(880);
        window.toddlerAudio.triggerHaptic('medium');
        this.showerAltarPetals('✨');
        setTimeout(() => bellRope.classList.remove('bell-swinging'), 1200);
      });
    }

    const shankhaWrap = this.container.querySelector('#altar-shankha');
    if (shankhaWrap) {
      shankhaWrap.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        shankhaWrap.classList.add('shankha-blowing');
        window.toddlerAudio.playShankha();
        window.toddlerAudio.triggerHaptic('heavy');
        window.toddlerAudio.speak({
          hi: "पावन शंख नाद! जय श्री कृष्णा!",
          en: "Divine Shankha Naad! Jai Shri Krishna!"
        });
        this.showerAltarPetals('🪷');
        setTimeout(() => shankhaWrap.classList.remove('shankha-blowing'), 1400);
      });
    }

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
      window.toddlerAudio.speak({
        hi: "गुलाब की पंखुड़ियां! पावन समर्पण!",
        en: "Fragrant rose petals for Little Krishna!"
      });
      this.showerAltarPetals('🌹');
    });

    btnGenda.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      window.toddlerAudio.playTempleBell(880);
      window.toddlerAudio.speak({
        hi: "गेंदे के दिव्य फूल! कान्हा प्रसन्न!",
        en: "Golden marigolds offered to Kanha!"
      });
      this.showerAltarPetals('🌼');
    });

    if (btnTulsi) {
      btnTulsi.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playTempleBell(1046.5);
        window.toddlerAudio.speak({
          hi: "पावन तुलसी दल! श्री कृष्णा को अति प्रिय!",
          en: "Sacred Tulsi leaves! Most beloved to Krishna!"
        });
        this.showerAltarPetals('🌿');
      });
    }

    if (btnMogra) {
      btnMogra.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playAartiChimes();
        window.toddlerAudio.speak({
          hi: "सुगन्धित मोगरा पुष्प! जय श्री कृष्णा!",
          en: "Sweet jasmine blossoms for Kanha!"
        });
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
    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('pushpa_archak');
    }

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
    window.toddlerAudio.triggerHaptic('celebration');
    CelebrationPetalShower.shower();
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
        const stampObj = this.stamps.find(s => s.id === this.currentStamp);
        if (stampObj && window.toddlerAudio) {
          const lang = window.toddlerAudio.currentLanguage ? window.toddlerAudio.currentLanguage : 'hi';
          const title = stampObj.name[lang] || stampObj.name.en;
          window.toddlerAudio.speak(title);
        }
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
      if (window.ToddlerRewards) {
        window.ToddlerRewards.award('rangoli_shilpi');
      }
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
      if (window.ToddlerRewards) {
        window.ToddlerRewards.award('kanha_shringar');
      }

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
    window.toddlerAudio.triggerHaptic('celebration');
    CelebrationPetalShower.shower();
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

// ==========================================================================
// VEDIC FLOWER PETAL CELEBRATION SHOWER (Commercial Particle System)
// ==========================================================================
class CelebrationPetalShower {
  static shower() {
    if (typeof document === 'undefined') return;
    const petals = ['🌸', '🪷', '🌼', '🌺', '🌹', '✨', '🍯'];
    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'falling-vedic-petal';
        p.textContent = petals[Math.floor(Math.random() * petals.length)];
        p.style.left = (Math.random() * 94) + 'vw';
        p.style.animationDuration = (2.2 + Math.random() * 1.5) + 's';
        p.style.animationDelay = (Math.random() * 0.3) + 's';
        p.style.fontSize = (1.5 + Math.random() * 1.2) + 'rem';
        document.body.appendChild(p);
        setTimeout(() => {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 3800);
      }, i * 40);
    }
  }
}

// ==========================================================================
// 8. DIVYA AKSHARA: ALPHABET, NUMBERS & NATURE SOUNDS (Vidhya 1: Akshara-Mushtika)
// ==========================================================================
class AksharaGame {
  constructor(container) {
    this.container = container;
    this.mode = 'en'; // 'en', 'hi', or 'num'
    this.currentIndex = 0;

    this.lettersEn = [
      { char: 'A', name: { en: 'A for Aarti', hi: 'A से आरती' }, icon: '🪔', word: 'Aarti', color: '#F59E0B', sound: 'aarti' },
      { char: 'B', name: { en: 'B for Bansuri', hi: 'B से बांसुरी' }, icon: '🪈', word: 'Bansuri', color: '#0284C7', sound: 'bansuri' },
      { char: 'C', name: { en: 'C for Chakra', hi: 'C से चक्र' }, icon: '☸️', word: 'Chakra', color: '#EA580C', sound: 'manjira' },
      { char: 'D', name: { en: 'D for Diya', hi: 'D से दीपक' }, icon: '🪔', word: 'Diya', color: '#FBBF24', sound: 'damru' },
      { char: 'E', name: { en: 'E for Elephant', hi: 'E से गजराज' }, icon: '🐘', word: 'Elephant', color: '#64748B', sound: 'elephant' },
      { char: 'F', name: { en: 'F for Flute', hi: 'F से बांसुरी' }, icon: '🪈', word: 'Flute', color: '#0D9488', sound: 'flute' },
      { char: 'G', name: { en: 'G for Gau-Mata', hi: 'G से गऊ माता' }, icon: '🐮', word: 'Gau-Mata', color: '#10B981', sound: 'cow' },
      { char: 'H', name: { en: 'H for Hanuman', hi: 'H से हनुमान' }, icon: '🐒', word: 'Hanuman', color: '#DC2626', sound: 'monkey' },
      { char: 'I', name: { en: 'I for Incense', hi: 'I से अगरबत्ती' }, icon: '💨', word: 'Incense', color: '#8B5CF6', sound: 'breeze' },
      { char: 'J', name: { en: 'J for Jal Tarang', hi: 'J से जल तरंग' }, icon: '🥣', word: 'Jal Tarang', color: '#38BDF8', sound: 'jaltarang' },
      { char: 'K', name: { en: 'K for Krishna', hi: 'K से कान्हा' }, icon: '🦚', word: 'Krishna', color: '#0284C7', sound: 'giggle' },
      { char: 'L', name: { en: 'L for Lotus', hi: 'L से कमल' }, icon: '🪷', word: 'Lotus', color: '#EC4899', sound: 'bell' },
      { char: 'M', name: { en: 'M for Makhan', hi: 'M से माखन' }, icon: '🍯', word: 'Makhan', color: '#F59E0B', sound: 'makhan' },
      { char: 'N', name: { en: 'N for Namaste', hi: 'N से नमस्ते' }, icon: '🙏', word: 'Namaste', color: '#FBBF24', sound: 'bell' },
      { char: 'O', name: { en: 'O for Om', hi: 'O से ॐ' }, icon: '🕉️', word: 'Om', color: '#DC2626', sound: 'om' },
      { char: 'P', name: { en: 'P for Peacock', hi: 'P से मोर पंख' }, icon: '🦚', word: 'Peacock', color: '#059669', sound: 'peacock' },
      { char: 'Q', name: { en: 'Q for Queen Yashoda', hi: 'Q से रानी यशोदा' }, icon: '👑', word: 'Queen', color: '#A855F7', sound: 'ghungroo' },
      { char: 'R', name: { en: 'R for Radha', hi: 'R से राधा' }, icon: '🌸', word: 'Radha', color: '#F43F5E', sound: 'manjira' },
      { char: 'S', name: { en: 'S for Shankha', hi: 'S से शंख' }, icon: '🐚', word: 'Shankha', color: '#0EA5E9', sound: 'shankha' },
      { char: 'T', name: { en: 'T for Tulsi', hi: 'T से तुलसी' }, icon: '🌿', word: 'Tulsi', color: '#10B981', sound: 'bell' },
      { char: 'U', name: { en: 'U for Ujjain Gurukul', hi: 'U से उज्जैन' }, icon: '🏛️', word: 'Ujjain', color: '#D97706', sound: 'bell' },
      { char: 'V', name: { en: 'V for Vrindavan', hi: 'V से वृन्दावन' }, icon: '🌳', word: 'Vrindavan', color: '#16A34A', sound: 'birds' },
      { char: 'W', name: { en: 'W for Water (Yamuna)', hi: 'W से यमुना जल' }, icon: '💧', word: 'Water', color: '#0284C7', sound: 'yamuna' },
      { char: 'X', name: { en: 'X for Xylophone', hi: 'X से वाद्य यंत्र' }, icon: '🎶', word: 'Xylophone', color: '#6366F1', sound: 'jaltarang' },
      { char: 'Y', name: { en: 'Y for Yamuna', hi: 'Y से यमुना जी' }, icon: '🌊', word: 'Yamuna', color: '#0284C7', sound: 'yamuna' },
      { char: 'Z', name: { en: 'Z for Zinnia Flower', hi: 'Z से पुष्प' }, icon: '🌺', word: 'Zinnia', color: '#DB2777', sound: 'birds' }
    ];

    this.lettersHi = [
      { char: 'अ', key: 'A', name: { en: 'A for Achyuta', hi: 'अ से अच्युत' }, icon: '🦚', word: 'अच्युत', color: '#0284C7', sound: 'flute' },
      { char: 'आ', key: 'A', name: { en: 'Aa for Aarti', hi: 'आ से आरती' }, icon: '🪔', word: 'आरती', color: '#F59E0B', sound: 'aarti' },
      { char: 'इ', key: 'I', name: { en: 'I for Indradhanush', hi: 'इ से इन्द्रधनुष' }, icon: '🌈', word: 'इन्द्रधनुष', color: '#38BDF8', sound: 'jaltarang' },
      { char: 'ई', key: 'E', name: { en: 'Ee for Ishwara', hi: 'ई से ईश्वर' }, icon: '🕉️', word: 'ईश्वर', color: '#DC2626', sound: 'om' },
      { char: 'उ', key: 'U', name: { en: 'U for Utsav', hi: 'उ से उत्सव' }, icon: '✨', word: 'उत्सव', color: '#FBBF24', sound: 'celebration' },
      { char: 'ऊ', key: 'U', name: { en: 'Oo for Oorja', hi: 'ऊ से दिव्य ऊर्जा' }, icon: '☀️', word: 'ऊर्जा', color: '#EA580C', sound: 'aarti' },
      { char: 'ऋ', key: 'R', name: { en: 'Ri for Rishi Sandipani', hi: 'ऋ से ऋषि सान्दीपनि' }, icon: '📜', word: 'ऋषि', color: '#7C3AED', sound: 'bell' },
      { char: 'ए', key: 'E', name: { en: 'E for Ekam (One Lord)', hi: 'ए से एकम् परमात्मा' }, icon: '🪔', word: 'एकम्', color: '#0284C7', sound: 'om' },
      { char: 'ऐ', key: 'A', name: { en: 'Ai for Airavata Elephant', hi: 'ऐ से ऐरावत गजराज' }, icon: '🐘', word: 'ऐरावत', color: '#64748B', sound: 'elephant' },
      { char: 'ओ', key: 'O', name: { en: 'O for Omkar', hi: 'ओ से ॐ ओंकार' }, icon: '🕉️', word: 'ओंकार', color: '#DC2626', sound: 'om' },
      { char: 'औ', key: 'O', name: { en: 'Au for Aushadhi (Tulsi Herbs)', hi: 'औ से दिव्य औषधि' }, icon: '🌿', word: 'औषधि', color: '#10B981', sound: 'breeze' },
      { char: 'क', key: 'K', name: { en: 'Ka for Kanha', hi: 'क से कान्हा' }, icon: '👶', word: 'कान्हा', color: '#0284C7', sound: 'giggle' },
      { char: 'ख', key: 'K', name: { en: 'Kha for Khaga (Birds)', hi: 'ख से खग पक्षी' }, icon: '🐦', word: 'खग', color: '#16A34A', sound: 'birds' },
      { char: 'ग', key: 'G', name: { en: 'Ga for Gau-Mata', hi: 'ग से गऊ माता' }, icon: '🐮', word: 'गऊ माता', color: '#10B981', sound: 'cow' },
      { char: 'घ', key: 'G', name: { en: 'Gha for Ghungroo', hi: 'घ से घुँघरू' }, icon: '👣', word: 'घुँघरू', color: '#F59E0B', sound: 'ghungroo' },
      { char: 'च', key: 'C', name: { en: 'Cha for Chakra', hi: 'च से सुदर्शन चक्र' }, icon: '☸️', word: 'चक्र', color: '#EA580C', sound: 'manjira' },
      { char: 'छ', key: 'C', name: { en: 'Chha for Chhari', hi: 'छ से ग्वाल छड़ी' }, icon: '🎋', word: 'छड़ी', color: '#D97706', sound: 'flute' },
      { char: 'ज', key: 'J', name: { en: 'Ja for Jal Tarang', hi: 'ज से जल तरंग' }, icon: '🥣', word: 'जल तरंग', color: '#38BDF8', sound: 'jaltarang' },
      { char: 'झ', key: 'J', name: { en: 'Jha for Jhula', hi: 'झ से झूला' }, icon: '🌸', word: 'झूला', color: '#EC4899', sound: 'breeze' },
      { char: 'ड', key: 'D', name: { en: 'Da for Damru', hi: 'ड से डमरू' }, icon: '🪘', word: 'डमरू', color: '#DC2626', sound: 'damru' },
      { char: 'त', key: 'T', name: { en: 'Ta for Tulsi', hi: 'त से तुलसी दल' }, icon: '🌿', word: 'तुलसी', color: '#10B981', sound: 'bell' },
      { char: 'द', key: 'D', name: { en: 'Da for Deepak', hi: 'द से दीपक' }, icon: '🪔', word: 'दीपक', color: '#F59E0B', sound: 'damru' },
      { char: 'ध', key: 'D', name: { en: 'Dha for Dhenu', hi: 'ध से धेनु गऊ' }, icon: '🐄', word: 'धेनु', color: '#10B981', sound: 'calf' },
      { char: 'न', key: 'N', name: { en: 'Na for Navaneeta', hi: 'न से नवनीत माखन' }, icon: '🍯', word: 'नवनीत', color: '#FBBF24', sound: 'makhan' },
      { char: 'प', key: 'P', name: { en: 'Pa for Pankh', hi: 'प से मोर पंख' }, icon: '🦚', word: 'मोर पंख', color: '#059669', sound: 'peacock' },
      { char: 'ब', key: 'B', name: { en: 'Ba for Bansuri', hi: 'ब से बांसुरी' }, icon: '🪈', word: 'बांसुरी', color: '#0284C7', sound: 'bansuri' },
      { char: 'म', key: 'M', name: { en: 'Ma for Makhan', hi: 'म से माखन मटकी' }, icon: '🍯', word: 'माखन', color: '#D97706', sound: 'makhan' },
      { char: 'य', key: 'Y', name: { en: 'Ya for Yamuna', hi: 'य से यमुना जी' }, icon: '🌊', word: 'यमुना', color: '#0284C7', sound: 'yamuna' },
      { char: 'र', key: 'R', name: { en: 'Ra for Radha', hi: 'र से राधा रानी' }, icon: '🌸', word: 'राधा', color: '#EC4899', sound: 'manjira' },
      { char: 'ल', key: 'L', name: { en: 'La for Laddu', hi: 'ल से मोदक लड्डू' }, icon: '🟡', word: 'लड्डू', color: '#F59E0B', sound: 'giggle' },
      { char: 'व', key: 'V', name: { en: 'Va for Vrindavan', hi: 'व से वृन्दावन धाम' }, icon: '🌳', word: 'वृन्दावन', color: '#16A34A', sound: 'birds' },
      { char: 'श', key: 'S', name: { en: 'Sha for Shankha', hi: 'श से शंख' }, icon: '🐚', word: 'शंख', color: '#0EA5E9', sound: 'shankha' },
      { char: 'ह', key: 'H', name: { en: 'Ha for Hanuman', hi: 'ह से हनुमान जी' }, icon: '🐒', word: 'हनुमान', color: '#DC2626', sound: 'monkey' }
    ];

    this.numbersList = [
      {
        char: '1',
        num: '1',
        name: { en: '1 - One Ekam (One Supreme Lord)', hi: '१ - एक (एक ओंकार परमात्मा)' },
        shortWord: { en: '1 - One Ekam', hi: '१ - एक' },
        sanskrit: 'एकम् (Ekam)',
        icon: '🕉️',
        counterEmoji: '🪔',
        count: 1,
        color: '#DC2626'
      },
      {
        char: '2',
        num: '2',
        name: { en: '2 - Two Dve (Sri Radha-Krishna)', hi: '२ - दो (युगल सरकार श्री राधा-कृष्ण)' },
        shortWord: { en: '2 - Two Dve', hi: '२ - दो' },
        sanskrit: 'द्वे (Dve)',
        icon: '🌸',
        counterEmoji: '🦚',
        count: 2,
        color: '#EC4899'
      },
      {
        char: '3',
        num: '3',
        name: { en: '3 - Three Trini (Three Worlds Triloka)', hi: '३ - तीन (त्रिलोक व त्रिदेव)' },
        shortWord: { en: '3 - Three Trini', hi: '३ - तीन' },
        sanskrit: 'त्रीणि (Trīṇi)',
        icon: '🔱',
        counterEmoji: '✨',
        count: 3,
        color: '#8B5CF6'
      },
      {
        char: '4',
        num: '4',
        name: { en: '4 - Four Chatvari (Four Sacred Vedas)', hi: '४ - चार (चार पावन वेद)' },
        shortWord: { en: '4 - Four Chatvari', hi: '४ - चार' },
        sanskrit: 'चत्वारि (Catvāri)',
        icon: '📜',
        counterEmoji: '📖',
        count: 4,
        color: '#0284C7'
      },
      {
        char: '5',
        num: '5',
        name: { en: '5 - Five Pancha (Five Sacred Elements)', hi: '५ - पाँच (पंच महाभूत तत्व)' },
        shortWord: { en: '5 - Five Pancha', hi: '५ - पाँच' },
        sanskrit: 'पञ्च (Pañca)',
        icon: '🌿',
        counterEmoji: '🪷',
        count: 5,
        color: '#10B981'
      },
      {
        char: '6',
        num: '6',
        name: { en: '6 - Six Shat (Six Divine Seasons)', hi: '६ - छह (छह पावन ऋतुएं)' },
        shortWord: { en: '6 - Six Shat', hi: '६ - छह' },
        sanskrit: 'षट् (Ṣaṭ)',
        icon: '🌈',
        counterEmoji: '🌺',
        count: 6,
        color: '#D97706'
      },
      {
        char: '7',
        num: '7',
        name: { en: '7 - Seven Sapta (Seven Sacred Rivers)', hi: '७ - सात (सप्त पावन नदियां)' },
        shortWord: { en: '7 - Seven Sapta', hi: '७ - सात' },
        sanskrit: 'सप्त (Sapta)',
        icon: '🌊',
        counterEmoji: '💧',
        count: 7,
        color: '#0EA5E9'
      },
      {
        char: '8',
        num: '8',
        name: { en: '8 - Eight Ashta (Ashta-Lakshmi & Janmashtami)', hi: '८ - आठ (अष्ट-लक्ष्मी व कान्हा प्राकट्य)' },
        shortWord: { en: '8 - Eight Ashta', hi: '८ - आठ' },
        sanskrit: 'अष्ट (Aṣṭa)',
        icon: '👑',
        counterEmoji: '🔔',
        count: 8,
        color: '#F59E0B'
      },
      {
        char: '9',
        num: '9',
        name: { en: '9 - Nine Nava (Nine Forms of Bhakti)', hi: '९ - नौ (नवधा भक्ति)' },
        shortWord: { en: '9 - Nine Nava', hi: '९ - नौ' },
        sanskrit: 'नव (Nava)',
        icon: '🪔',
        counterEmoji: '🍯',
        count: 9,
        color: '#EA580C'
      },
      {
        char: '10',
        num: '10',
        name: { en: '10 - Ten Dasha (Dashavatara Ten Divine Forms)', hi: '१० - दस (दशावतार रूप)' },
        shortWord: { en: '10 - Ten Dasha', hi: '१० - दस' },
        sanskrit: 'दश (Daśa)',
        icon: '☸️',
        counterEmoji: '🌟',
        count: 10,
        color: '#7C3AED'
      }
    ];

    this.natureSounds = [
      { id: 'yamuna', icon: '🌊', label: { hi: 'यमुना प्रवाह', en: 'Yamuna River' }, fn: () => window.toddlerAudio.playYamunaStream() },
      { id: 'breeze', icon: '🍃', label: { hi: 'कदम्ब पवन', en: 'Breeze' }, fn: () => window.toddlerAudio.playKadambaBreeze() },
      { id: 'rain', icon: '🌧️', label: { hi: 'वर्षा फुहार', en: 'Monsoon Rain' }, fn: () => window.toddlerAudio.playMonsoonRain() },
      { id: 'birds', icon: '🐦', label: { hi: 'वन पक्षी', en: 'Birds Singing' }, fn: () => window.toddlerAudio.playForestBirdsChirp() },
      { id: 'crickets', icon: '🦗', label: { hi: 'रात्रि झींगुर', en: 'Night Crickets' }, fn: () => window.toddlerAudio.playNightCrickets() }
    ];
  }

  getActiveList() {
    if (this.mode === 'num') return this.numbersList;
    return this.mode === 'hi' ? this.lettersHi : this.lettersEn;
  }

  start() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    this.mode = lang === 'hi' ? 'hi' : 'en';
    this.currentIndex = 0;
    this.render();

    setTimeout(() => {
      this.triggerLetterByIndex(0, false);
    }, 400);
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const list = this.getActiveList();
    const item = list[this.currentIndex] || list[0];
    const headerTitle = lang === 'hi' ? 'दिव्य अक्षर, संख्या व स्वर: कोई भी कुंजी दबाएं या छूकर सुनें! 🔤✨' : 'Divya Akshara & Numbers: Press Any Key or Tap to Hear It Speak! 🔤✨';
    const promptText = lang === 'hi' ? 'कुंजी दबाएं या छूकर अक्षर सुनें!' : 'Press any key or tap to hear phonics!';
    const isNumMode = this.mode === 'num';

    this.container.innerHTML = `
      <div class="game-akshara vedic-theme">
        <div class="akshara-header">
          <h2>${headerTitle}</h2>
        </div>

        <!-- Mode Pills Selector: A-Z / Hindi / 1-10 Numbers -->
        <div class="akshara-mode-bar">
          <div class="akshara-mode-pills">
            <button class="mode-pill-btn ${this.mode === 'en' ? 'active' : ''}" data-mode="en">🔤 A-Z (English)</button>
            <button class="mode-pill-btn ${this.mode === 'hi' ? 'active' : ''}" data-mode="hi">🕉️ वर्णमाला (हिन्दी)</button>
            <button class="mode-pill-btn ${this.mode === 'num' ? 'active' : ''}" data-mode="num">🔢 १-१० संख्या (Numbers)</button>
          </div>
        </div>

        <!-- Nature Sounds Sanctuary Bar -->
        <div class="akshara-nature-bar">
          <span class="nature-bar-label">🌿 ${lang === 'hi' ? 'प्राकृत स्वर:' : 'Nature Sounds:'}</span>
          <div class="nature-orbs-group">
            ${this.natureSounds.map(ns => `
              <button class="nature-orb-btn" data-id="${ns.id}" title="${ns.label[lang] || ns.label.en}">
                <span class="orb-icon">${ns.icon}</span>
                <span class="orb-name">${ns.label[lang] || ns.label.en}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Central Giant Interactive Showcase Card -->
        <div class="akshara-showcase">
          <div class="giant-letter-card ${isNumMode ? 'is-number-card' : ''}" id="giant-card" style="--letter-color: ${item.color};">
            <div class="card-sparkle-aura"></div>
            <div class="giant-letter-char" id="card-char">${item.char}</div>
            ${item.sanskrit ? `<div class="sanskrit-subtext" id="card-sanskrit">${item.sanskrit}</div>` : ''}
            <div class="giant-letter-icon" id="card-icon">${item.icon}</div>
            <div class="giant-letter-word" id="card-word">${item.name[lang] || item.name.en}</div>

            <!-- Tactile Interactive Counter Orbs for Numbers Mode -->
            <div class="num-counter-tray ${isNumMode ? '' : 'hidden'}" id="counter-tray">
              ${isNumMode ? Array.from({ length: item.count || 1 }).map((_, cIdx) => `
                <button class="counter-orb-btn" data-count="${cIdx + 1}" title="Count ${cIdx + 1}" style="--orb-accent: ${item.color};">
                  ${item.counterEmoji || '🪷'}
                </button>
              `).join('') : ''}
            </div>

            <div class="giant-letter-prompt">${promptText}</div>
          </div>
        </div>

        <!-- Bottom Touch Keypad / Letter Bubbles Carousel -->
        <div class="akshara-keypad-tray">
          <div class="akshara-keys-scroll" id="keys-scroll">
            ${list.map((l, idx) => `
              <button class="akshara-key-btn ${idx === this.currentIndex ? 'active' : ''}" data-idx="${idx}" data-char="${l.char}" style="--key-color: ${l.color};">
                <span class="key-char">${l.char}</span>
                <span class="key-icon">${l.icon}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Mode Pills
    const modeBtns = this.container.querySelectorAll('.mode-pill-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const newMode = btn.dataset.mode;
        if (newMode && newMode !== this.mode) {
          if (window.toddlerAudio) window.toddlerAudio.triggerHaptic('medium');
          this.mode = newMode;
          this.currentIndex = 0;
          this.render();
          this.triggerLetterByIndex(0, true);
        }
      });
    });

    // Nature Sound Orbs
    const orbBtns = this.container.querySelectorAll('.nature-orb-btn');
    orbBtns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (window.toddlerAudio) window.toddlerAudio.triggerHaptic('light');
        btn.classList.add('orb-hit');
        const id = btn.dataset.id;
        const soundObj = this.natureSounds.find(n => n.id === id);
        if (soundObj && typeof soundObj.fn === 'function') {
          soundObj.fn();
        }
        setTimeout(() => btn.classList.remove('orb-hit'), 500);
      });
    });

    // Central card tap (repeat speech)
    const card = this.container.querySelector('#giant-card');
    if (card) {
      card.addEventListener('pointerdown', (e) => {
        if (e.target && e.target.closest && e.target.closest('.counter-orb-btn')) return;
        e.preventDefault();
        this.triggerLetterByIndex(this.currentIndex, true);
      });
    }

    // Interactive Counter Orbs for Numbers
    const counterOrbs = this.container.querySelectorAll('.counter-orb-btn');
    let initTappedCount = 0;
    const initTotalCount = counterOrbs.length || 1;
    counterOrbs.forEach(orb => {
      orb.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!orb.classList.contains('orb-counted')) {
          orb.classList.add('orb-counted');
          initTappedCount++;
        }
        orb.classList.add('orb-tapped');
        const countVal = parseInt(orb.dataset.count, 10);
        if (window.toddlerAudio) {
          window.toddlerAudio.triggerHaptic('light');
          window.toddlerAudio.speak(String(countVal));
        }
        if (initTappedCount >= initTotalCount) {
          setTimeout(() => {
            if (window.toddlerAudio) {
              window.toddlerAudio.triggerHaptic('celebration');
              window.toddlerAudio.playCelebration();
            }
            CelebrationPetalShower.shower();
          }, 400);
        }
        setTimeout(() => orb.classList.remove('orb-tapped'), 600);
      });
    });

    // Keypad buttons
    const keyBtns = this.container.querySelectorAll('.akshara-key-btn');
    keyBtns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.dataset.idx, 10);
        this.triggerLetterByIndex(idx, true);
      });
    });
  }

  // Handle language switch instantly without losing place
  onLanguageChange(newLang) {
    if (this.mode !== 'num') {
      this.mode = newLang === 'hi' ? 'hi' : 'en';
    }
    this.render();
    this.triggerLetterByIndex(this.currentIndex, false);
  }

  // Authentic Vedic Sound / Chant Trigger for Letters
  playLetterChantOrSound(soundKey) {
    if (!window.toddlerAudio) return;
    switch (soundKey) {
      case 'om':
        window.toddlerAudio.playOmChant();
        break;
      case 'bansuri':
      case 'flute':
        window.toddlerAudio.playDivineFlutePhrase();
        break;
      case 'cow':
        window.toddlerAudio.playCowMoo();
        break;
      case 'calf':
        window.toddlerAudio.playCalfMoo();
        break;
      case 'peacock':
        window.toddlerAudio.playPeacockCall();
        break;
      case 'shankha':
        window.toddlerAudio.playShankha();
        break;
      case 'makhan':
        window.toddlerAudio.playMakhanPop();
        break;
      case 'elephant':
        window.toddlerAudio.playElephantTrumpet();
        break;
      case 'monkey':
        window.toddlerAudio.playMonkeyChatter();
        break;
      case 'birds':
        window.toddlerAudio.playForestBirdsChirp();
        break;
      case 'yamuna':
        window.toddlerAudio.playYamunaStream();
        break;
      case 'breeze':
        window.toddlerAudio.playKadambaBreeze();
        break;
      case 'jaltarang':
        window.toddlerAudio.playJalTarangNote();
        break;
      case 'ghungroo':
        window.toddlerAudio.playGhungroo();
        break;
      case 'damru':
        window.toddlerAudio.playDamruRattle();
        break;
      case 'manjira':
        window.toddlerAudio.playManjiraClink();
        break;
      case 'aarti':
        window.toddlerAudio.playAartiChimes();
        break;
      case 'bell':
        window.toddlerAudio.playTempleBell(880);
        break;
      case 'giggle':
        window.toddlerAudio.playBabyGiggle();
        break;
      case 'celebration':
        window.toddlerAudio.playCelebration();
        break;
      default:
        // No key noise - pure vocal clarity
        break;
    }
  }

  triggerLetterByIndex(idx, shouldVocalize) {
    const list = this.getActiveList();
    if (idx < 0 || idx >= list.length) idx = 0;
    this.currentIndex = idx;
    const item = list[idx];
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const isNumMode = this.mode === 'num';

    // Update Card UI
    const card = this.container.querySelector('#giant-card');
    const charEl = this.container.querySelector('#card-char');
    const iconEl = this.container.querySelector('#card-icon');
    const wordEl = this.container.querySelector('#card-word');
    const sanskritEl = this.container.querySelector('#card-sanskrit');
    const counterTray = this.container.querySelector('#counter-tray');

    if (card) {
      card.style.setProperty('--letter-color', item.color);
      card.classList.remove('card-pop-anim');
      void card.offsetWidth;
      card.classList.add('card-pop-anim');
    }
    if (charEl) charEl.textContent = item.char;
    if (iconEl) iconEl.textContent = item.icon;
    if (wordEl) wordEl.textContent = item.name[lang] || item.name.en;
    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('akshara_vidya');
    }
    if (sanskritEl) sanskritEl.textContent = item.sanskrit || '';

    // If in number mode, refresh the interactive counter tray
    if (counterTray) {
      if (isNumMode) {
        counterTray.classList.remove('hidden');
        counterTray.innerHTML = Array.from({ length: item.count || 1 }).map((_, cIdx) => `
          <button class="counter-orb-btn" data-count="${cIdx + 1}" title="Count ${cIdx + 1}" style="--orb-accent: ${item.color};">
            ${item.counterEmoji || '🪷'}
          </button>
        `).join('');

        let tappedCount = 0;
        const totalCount = item.count || 1;
        const newOrbs = counterTray.querySelectorAll('.counter-orb-btn');
        newOrbs.forEach(orb => {
          orb.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!orb.classList.contains('orb-counted')) {
              orb.classList.add('orb-counted');
              tappedCount++;
            }
            orb.classList.add('orb-tapped');
            const countVal = parseInt(orb.dataset.count, 10);
            if (window.toddlerAudio) {
              window.toddlerAudio.triggerHaptic('light');
              window.toddlerAudio.speak(String(countVal));
            }
            if (tappedCount >= totalCount) {
              setTimeout(() => {
                if (window.toddlerAudio) {
                  window.toddlerAudio.triggerHaptic('celebration');
                  window.toddlerAudio.playCelebration();
                }
                CelebrationPetalShower.shower();
              }, 400);
            }
            setTimeout(() => orb.classList.remove('orb-tapped'), 600);
          });
        });
      } else {
        counterTray.classList.add('hidden');
      }
    }

    // Update active state on keypad
    const allKeyBtns = this.container.querySelectorAll('.akshara-key-btn');
    allKeyBtns.forEach(b => {
      const bIdx = parseInt(b.dataset.idx, 10);
      b.classList.toggle('active', bIdx === idx);
    });

    // Scroll active key into view
    const activeBtn = this.container.querySelector(`.akshara-key-btn[data-idx="${idx}"]`);
    if (activeBtn && activeBtn.scrollIntoView) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    // Audio, Speech & Haptic (No interfering key sound - phonics speak clearly, followed by authentic chant/sound)
    if (shouldVocalize !== false && window.toddlerAudio) {
      window.toddlerAudio.triggerHaptic('light');

      if (isNumMode) {
        window.toddlerAudio.speakNumber(item.char, item);
        if (item.count === 10) {
          window.toddlerAudio.triggerHaptic('celebration');
          CelebrationPetalShower.shower();
        }
      } else {
        window.toddlerAudio.speakLetter(item.char, item.name, () => {
          this.playLetterChantOrSound(item.sound);
        });
        if (idx === list.length - 1) {
          window.toddlerAudio.triggerHaptic('celebration');
          CelebrationPetalShower.shower();
        }
      }
    }
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey(key) {
    if (key && typeof key === 'string' && key.length === 1) {
      // Check for digit press: '1' - '9' or '0'
      if (/^[0-9]$/.test(key)) {
        const digitNum = key === '0' ? 10 : parseInt(key, 10);
        const targetIdx = digitNum - 1;
        if (this.mode !== 'num') {
          this.mode = 'num';
          this.render();
        }
        this.triggerLetterByIndex(targetIdx, true);
        return;
      }

      // Check for letter match by char or romanized key
      const list = this.getActiveList();
      const upper = key.toUpperCase();
      let foundIdx = -1;
      for (let i = 0; i < list.length; i++) {
        if ((list[i].char && list[i].char.toUpperCase() === upper) ||
            (list[i].key && list[i].key.toUpperCase() === upper)) {
          foundIdx = i;
          break;
        }
      }

      if (foundIdx === -1) {
        // If not found in current mode, search across English and Hindi sets
        const checkSets = [this.lettersEn, this.lettersHi];
        for (let s = 0; s < checkSets.length; s++) {
          const setList = checkSets[s];
          for (let j = 0; j < setList.length; j++) {
            if ((setList[j].char && setList[j].char.toUpperCase() === upper) ||
                (setList[j].key && setList[j].key.toUpperCase() === upper)) {
              this.mode = (s === 0) ? 'en' : 'hi';
              this.render();
              this.triggerLetterByIndex(j, true);
              return;
            }
          }
        }
      }

      if (foundIdx !== -1) {
        this.triggerLetterByIndex(foundIdx, true);
        return;
      }
    }

    const currentList = this.getActiveList();
    const nextIdx = (this.currentIndex + 1) % currentList.length;
    this.triggerLetterByIndex(nextIdx, true);
  }
}

// ==========================================
// 9. PRAKRITI SEVA & MONTESSORI SENSORIAL SORTING
// Vrikshayurveda Botanical Care & Color Sorting
// ==========================================
class PrakritiGame {
  constructor(container) {
    this.container = container;
    this.selectedFlowerIndex = null;
    this.sortedCount = 0;
    this.totalToCollect = 8;
    this.tulsiLoveScore = 0;
    this.mashStep = 0;
    this.petalShower = (typeof CelebrationPetalShower !== 'undefined') ? new CelebrationPetalShower() : null;

    // 4 Montessori Color Categories
    this.basketCategories = [
      { id: 'rakta', colorName: { hi: 'रक्त (लाल)', en: 'Red (Rakta)' }, flower: { hi: 'गुलाब', en: 'Rose' }, hex: '#EF4444', icon: '🌹', basketClass: 'basket-red' },
      { id: 'pita', colorName: { hi: 'पीत (पीला)', en: 'Yellow (Pita)' }, flower: { hi: 'गेंदा', en: 'Marigold' }, hex: '#F59E0B', icon: '🌼', basketClass: 'basket-yellow' },
      { id: 'nila', colorName: { hi: 'नील (नीला)', en: 'Blue (Nila)' }, flower: { hi: 'नील कमल', en: 'Blue Lotus' }, hex: '#3B82F6', icon: '🪷', basketClass: 'basket-blue' },
      { id: 'shveta', colorName: { hi: 'श्वेत (सफेद)', en: 'White (Shveta)' }, flower: { hi: 'मोगरा / चमेली', en: 'Jasmine' }, hex: '#F8FAFC', icon: '🤍', basketClass: 'basket-white' }
    ];

    this.activeFlowers = [];
    this.initMeadowFlowers();
  }

  initMeadowFlowers() {
    this.activeFlowers = [];
    this.sortedCount = 0;
    this.selectedFlowerIndex = null;

    // 8 flowers in the meadow to sort (2 of each color)
    for (let i = 0; i < 8; i++) {
      const cat = this.basketCategories[i % 4];
      this.activeFlowers.push({
        id: 'flw-' + i + '-' + Math.floor(Math.random() * 10000),
        categoryId: cat.id,
        colorHex: cat.hex,
        icon: cat.icon,
        name: cat.flower,
        colorName: cat.colorName,
        sorted: false
      });
    }

    // Montessori pseudo-random shuffle
    for (let i = this.activeFlowers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.activeFlowers[i];
      this.activeFlowers[i] = this.activeFlowers[j];
      this.activeFlowers[j] = temp;
    }
  }

  start() {
    this.render();
    this.bindPrakritiEvents();
    if (window.toddlerAudio) {
      window.toddlerAudio.playTempleBell(880);
      window.toddlerAudio.speak({
        hi: "तुलसी सेवा और पुष्प रंग संगम! तुलसी जी को सींचें और रंगीन फूलों को टोकरी में रखें!",
        en: "Prakriti Care! Water holy Tulsi and sort sacred flowers by color into matching baskets!"
      });
    }
  }

  stop() {
    if (this.petalShower && typeof this.petalShower.cleanup === 'function') {
      this.petalShower.cleanup();
    }
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

    this.container.innerHTML = `
      <div class="game-stage-wrapper game-prakriti">
        <!-- Top Banner: Sacred Tulsi Sanctuary & Practical Life Care -->
        <section class="prakriti-sanctuary-zone">
          <div class="tulsi-display-card" id="tulsi-card">
            <div class="tulsi-aura-ring" id="tulsi-aura"></div>
            <div class="tulsi-svg-wrap" id="tulsi-plant-box">
              ${VedicAssets.tulsiPlant || ''}
            </div>
            <div class="tulsi-title-badge">
              <span class="badge-icon">🌿</span>
              <span class="badge-text">${lang === 'hi' ? 'पवित्र तुलसी मैया' : 'Holy Tulsi Sanctuary'}</span>
            </div>
          </div>

          <!-- Practical Life Care Tools Tray -->
          <div class="prakriti-tools-tray">
            <button class="prakriti-tool-btn tool-water" id="prakriti-tool-water" title="Water Tulsi with Yamuna Pitcher">
              <div class="tool-icon-svg">${VedicAssets.waterPitcher || '💧'}</div>
              <span class="tool-label">${lang === 'hi' ? 'यमुना जल' : 'Yamuna Water'}</span>
            </button>

            <button class="prakriti-tool-btn tool-sun" id="prakriti-tool-sun" title="Offer Morning Sun Rays">
              <span class="tool-emoji">☀️</span>
              <span class="tool-label">${lang === 'hi' ? 'सूर्य प्रकाश' : 'Sunlight'}</span>
            </button>

            <button class="prakriti-tool-btn tool-diya" id="prakriti-tool-diya" title="Offer Sacred Ghee Diya">
              <div class="tool-icon-svg">${VedicAssets.diya || '🪔'}</div>
              <span class="tool-label">${lang === 'hi' ? 'दीप दर्शन' : 'Holy Diya'}</span>
            </button>
          </div>
        </section>

        <!-- Bottom Section: Montessori Sensorial 4-Color Flower Sorting -->
        <section class="prakriti-sorting-zone">
          <div class="sorting-header-bar">
            <span class="sorting-title">🌸 ${lang === 'hi' ? 'पुष्प वर्ण संगम (Montessori Color Sorting)' : 'Sacred Flower Color Sorting'}</span>
            <span class="sorting-counter-pill" id="flower-counter-pill">🧺 ${this.sortedCount} / ${this.totalToCollect}</span>
          </div>

          <!-- 4 Montessori Color Coded Baskets -->
          <div class="color-baskets-grid">
            ${this.basketCategories.map(b => {
              const bName = b.colorName[lang] || b.colorName.en;
              const fName = b.flower[lang] || b.flower.en;
              const countInBasket = this.activeFlowers.filter(f => f.sorted && f.categoryId === b.id).length;
              return `
                <div class="color-basket-slot ${b.basketClass}" data-category="${b.id}" id="basket-${b.id}">
                  <div class="basket-rim" style="border-color: ${b.hex};">
                    <span class="basket-flower-icon">${b.icon}</span>
                    <span class="basket-color-title" style="color: ${b.hex};">${bName}</span>
                    <span class="basket-subtitle">${fName}</span>
                    <span class="basket-count-badge">${countInBasket}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Loose Flowers in Meadow to Sort -->
          <div class="loose-flowers-meadow" id="loose-flowers-container">
            ${this.activeFlowers.map((flw, idx) => {
              if (flw.sorted) return '';
              const isSelected = (this.selectedFlowerIndex === idx);
              const flwName = flw.name[lang] || flw.name.en;
              return `
                <button class="loose-flower-card ${isSelected ? 'flower-selected' : ''}"
                        data-index="${idx}"
                        id="flower-btn-${idx}"
                        style="--flower-color: ${flw.colorHex};">
                  <span class="flower-icon">${flw.icon}</span>
                  <span class="flower-label">${flwName}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      </div>
    `;
  }

  bindPrakritiEvents() {
    // 1. Tulsi Care Buttons
    const btnWater = this.container.querySelector('#prakriti-tool-water');
    if (btnWater) {
      btnWater.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.nurtureTulsi('water');
      });
    }

    const btnSun = this.container.querySelector('#prakriti-tool-sun');
    if (btnSun) {
      btnSun.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.nurtureTulsi('sun');
      });
    }

    const btnDiya = this.container.querySelector('#prakriti-tool-diya');
    if (btnDiya) {
      btnDiya.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.nurtureTulsi('diya');
      });
    }

    // Direct tap on Tulsi
    const tulsiCard = this.container.querySelector('#tulsi-card');
    if (tulsiCard) {
      tulsiCard.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.nurtureTulsi('tap');
      });
    }

    // 2. Loose Flowers Selection
    const meadow = this.container.querySelector('#loose-flowers-container');
    if (meadow) {
      meadow.addEventListener('pointerdown', (e) => {
        const flowerBtn = e.target.closest('.loose-flower-card');
        if (!flowerBtn) return;
        e.preventDefault();
        const idx = parseInt(flowerBtn.dataset.index, 10);
        this.selectFlower(idx);
      });
    }

    // 3. Baskets Drop / Snap Target
    const basketsGrid = this.container.querySelector('.color-baskets-grid');
    if (basketsGrid) {
      basketsGrid.addEventListener('pointerdown', (e) => {
        const basketSlot = e.target.closest('.color-basket-slot');
        if (!basketSlot) return;
        e.preventDefault();
        const categoryId = basketSlot.dataset.category;
        this.sortIntoBasket(categoryId, basketSlot);
      });
    }
  }

  nurtureTulsi(action) {
    const tulsiPlant = this.container.querySelector('#tulsi-plant-box');
    const tulsiAura = this.container.querySelector('#tulsi-aura');

    if (tulsiPlant) {
      tulsiPlant.classList.remove('tulsi-swaying', 'tulsi-glowing-gold', 'tulsi-glowing-green');
      void tulsiPlant.offsetWidth; // trigger reflow
    }

    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('tulsi_mitra');
    }

    if (action === 'water') {
      if (tulsiPlant) tulsiPlant.classList.add('tulsi-swaying', 'tulsi-glowing-green');
      if (window.toddlerAudio) {
        if (typeof window.toddlerAudio.playYamunaStream === 'function') {
          window.toddlerAudio.playYamunaStream();
        } else {
          window.toddlerAudio.playWaterSplash();
        }
        setTimeout(() => {
          if (window.toddlerAudio) window.toddlerAudio.playGhungroo();
        }, 300);
        window.toddlerAudio.speak({
          hi: "पवित्र यमुना जल! तुलसी मैया लहलहा उठीं!",
          en: "Holy Yamuna water! Sacred Tulsi is lush and green!"
        });
      }
    } else if (action === 'sun') {
      if (tulsiPlant) tulsiPlant.classList.add('tulsi-glowing-gold');
      if (tulsiAura) tulsiAura.classList.add('aura-radiant-sun');
      if (window.toddlerAudio) {
        window.toddlerAudio.playTempleBell(1046.5);
        window.toddlerAudio.speak({
          hi: "सूर्य देव का आशीर्वाद! दिव्य प्रकाश!",
          en: "Surya blessing! Golden warm sunshine!"
        });
      }
      setTimeout(() => {
        if (tulsiAura) tulsiAura.classList.remove('aura-radiant-sun');
      }, 1200);
    } else if (action === 'diya') {
      if (tulsiPlant) tulsiPlant.classList.add('tulsi-swaying');
      if (window.toddlerAudio) {
        if (typeof window.toddlerAudio.playSingingBowl === 'function') {
          window.toddlerAudio.playSingingBowl(528);
        } else {
          window.toddlerAudio.playAartiChimes();
        }
        window.toddlerAudio.speak({
          hi: "शुभ दीप दर्शन! जय तुलसी महारानी!",
          en: "Sacred Ghee lamp offering! Jai Tulsi Maharani!"
        });
      }
    } else {
      // Tap
      if (tulsiPlant) tulsiPlant.classList.add('tulsi-swaying');
      if (window.toddlerAudio) {
        window.toddlerAudio.playTempleBell(880);
      }
    }
  }

  selectFlower(idx) {
    if (idx < 0 || idx >= this.activeFlowers.length) return;
    const flw = this.activeFlowers[idx];
    if (flw.sorted) return;

    this.selectedFlowerIndex = idx;
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

    // Highlight selected button
    const allBtns = this.container.querySelectorAll('.loose-flower-card');
    allBtns.forEach(btn => btn.classList.remove('flower-selected'));

    const activeBtn = this.container.querySelector('#flower-btn-' + idx);
    if (activeBtn) activeBtn.classList.add('flower-selected');

    if (window.toddlerAudio) {
      window.toddlerAudio.playBansuri(523.25); // Sa
      const flwName = flw.name[lang] || flw.name.en;
      const cName = flw.colorName[lang] || flw.colorName.en;
      window.toddlerAudio.speak(`${cName} ${flwName}`);
    }
  }

  sortIntoBasket(categoryId, basketSlot) {
    if (this.selectedFlowerIndex === null) {
      // Prompt toddler to pick a flower first
      if (window.toddlerAudio) {
        window.toddlerAudio.playTempleBell(659.25);
        window.toddlerAudio.speak({
          hi: "पहले नीचे से एक पुष्प चुनें!",
          en: "Tap a flower first, then put it in the matching basket!"
        });
      }
      return;
    }

    const flw = this.activeFlowers[this.selectedFlowerIndex];
    if (!flw || flw.sorted) return;

    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

    if (flw.categoryId === categoryId) {
      // Correct Montessori Match!
      flw.sorted = true;
      this.sortedCount++;
      this.selectedFlowerIndex = null;

      if (basketSlot) {
        basketSlot.classList.add('basket-correct-pop');
        setTimeout(() => basketSlot.classList.remove('basket-correct-pop'), 600);
      }

      if (window.toddlerAudio) {
        window.toddlerAudio.playTempleBell(1046.5);
        if (typeof window.toddlerAudio.playAscendingPop === 'function') {
          window.toddlerAudio.playAscendingPop(this.sortedCount);
        }
        const bCat = this.basketCategories.find(b => b.id === categoryId);
        const bName = bCat ? (bCat.colorName[lang] || bCat.colorName.en) : '';
        window.toddlerAudio.speak({
          hi: `बहुत सुंदर! ${bName} टोकरी में!`,
          en: `Splendid! Perfect match in ${bName} basket!`
        });
      }

      // Check for completion
      if (this.sortedCount >= this.totalToCollect) {
        setTimeout(() => {
          if (this.petalShower && typeof this.petalShower.celebrate === 'function') {
            this.petalShower.celebrate(this.container);
          }
          if (window.toddlerAudio) {
            window.toddlerAudio.playCelebration();
            window.toddlerAudio.speak({
              hi: "अद्भुत! सब दिव्य पुष्प सज गए! कान्हा और प्रकृति प्रसन्न!",
              en: "Wonderful! All sacred flowers gathered in harmony for Kanha!"
            });
          }
          // Refresh flowers after celebration
          setTimeout(() => {
            this.initMeadowFlowers();
            this.render();
            this.bindPrakritiEvents();
          }, 3600);
        }, 400);
      } else {
        // Re-render meadow to update remaining items
        this.render();
        this.bindPrakritiEvents();
      }
    } else {
      // Self-correcting Montessori feedback (No negative buzzer, gentle instructive chime)
      if (basketSlot) {
        basketSlot.classList.add('basket-shake');
        setTimeout(() => basketSlot.classList.remove('basket-shake'), 600);
      }
      if (window.toddlerAudio) {
        window.toddlerAudio.playBansuri(329.63); // Gentle Ga
        const targetCat = this.basketCategories.find(b => b.id === flw.categoryId);
        const correctColor = targetCat ? (targetCat.colorName[lang] || targetCat.colorName.en) : '';
        window.toddlerAudio.speak({
          hi: `यह पुष्प ${correctColor} है! उस टोकरी में रखें!`,
          en: `This flower belongs in the ${correctColor} basket!`
        });
      }
    }
  }

  handleAnyKey(key) {
    this.mashStep++;
    // Alternates between nurturing Tulsi and automatically selecting/sorting flowers
    if (this.mashStep % 2 === 1) {
      const actions = ['water', 'sun', 'diya'];
      const act = actions[(this.mashStep >> 1) % actions.length];
      this.nurtureTulsi(act);
    } else {
      const unsortedIndices = [];
      for (let i = 0; i < this.activeFlowers.length; i++) {
        if (!this.activeFlowers[i].sorted) unsortedIndices.push(i);
      }
      if (unsortedIndices.length > 0) {
        const nextIdx = unsortedIndices[0];
        const flw = this.activeFlowers[nextIdx];
        this.selectFlower(nextIdx);
        setTimeout(() => {
          const basketSlot = this.container.querySelector('#basket-' + flw.categoryId);
          this.sortIntoBasket(flw.categoryId, basketSlot);
        }, 300);
      } else {
        this.nurtureTulsi('water');
      }
    }
  }
}

// ==========================================
// 10. DHYANA & PRANAYAMA (MINDFULNESS & EMOTIONS)
// Patanjali Breath Rhythm & Natya Shastra Navarasa
// ==========================================
class DhyanaGame {
  constructor(container) {
    this.container = container;
    this.currentEmotionId = 'shanti';
    this.pranayamaMode = 'lotus'; // 'lotus' or 'bhramari'
    this.breathCycleTimer = null;
    this.breathState = 'in'; // 'in', 'hold', 'out'
    this.mashCounter = 0;

    // 5 Navarasa Sacred Emotions (Montessori / IB Early Childhood Social-Emotional Learning)
    this.emotions = [
      {
        id: 'shanti',
        icon: '🕊️',
        title: { hi: 'शान्ति', en: 'Peace / Shanti' },
        sutra: { hi: 'शान्त मन, निर्मल चित्त', en: 'Calm breath, quiet peaceful mind' },
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playSingingBowl === 'function') {
              window.toddlerAudio.playSingingBowl(432);
            } else {
              window.toddlerAudio.playOmChant();
            }
          }
        },
        auraColor: '#38BDF8',
        glowClass: 'aura-shanti'
      },
      {
        id: 'ananda',
        icon: '🌟',
        title: { hi: 'आनन्द', en: 'Joy / Ananda' },
        sutra: { hi: 'कान्हा की मुस्कान और हर्ष', en: 'Joyful happiness and sweet laughter' },
        sound: () => {
          if (window.toddlerAudio) {
            window.toddlerAudio.playBabyGiggle();
            setTimeout(() => {
              if (window.toddlerAudio) window.toddlerAudio.playDivineFlutePhrase();
            }, 300);
          }
        },
        auraColor: '#FBBF24',
        glowClass: 'aura-ananda'
      },
      {
        id: 'karuna',
        icon: '💖',
        title: { hi: 'करुणा व प्रेम', en: 'Love & Compassion' },
        sutra: { hi: 'गऊ माता और बछड़े का दुलार', en: 'Gentle loving care for cow, calf and all life' },
        sound: () => {
          if (window.toddlerAudio) {
            window.toddlerAudio.playCalfMoo();
            setTimeout(() => {
              if (window.toddlerAudio) window.toddlerAudio.playTempleBell(1046.5);
            }, 300);
          }
        },
        auraColor: '#F472B6',
        glowClass: 'aura-karuna'
      },
      {
        id: 'vismaya',
        icon: '😲',
        title: { hi: 'विस्मय', en: 'Wonder & Awe' },
        sutra: { hi: 'मुख में ब्रह्माण्ड दर्शन!', en: 'Wonder of seeing the sparkling cosmos' },
        sound: () => {
          if (window.toddlerAudio) window.toddlerAudio.playAartiChimes();
        },
        auraColor: '#A855F7',
        glowClass: 'aura-vismaya'
      },
      {
        id: 'dhairya',
        icon: '🦁',
        title: { hi: 'धैर्य व शौर्य', en: 'Courage / Dhairya' },
        sutra: { hi: 'निडर बाल कान्हा', en: 'Brave, courageous and loving protector' },
        sound: () => {
          if (window.toddlerAudio) {
            window.toddlerAudio.playShankha();
            setTimeout(() => {
              if (window.toddlerAudio) window.toddlerAudio.playDamru();
            }, 400);
          }
        },
        auraColor: '#EA580C',
        glowClass: 'aura-dhairya'
      }
    ];
  }

  start() {
    this.render();
    this.bindDhyanaEvents();
    this.startBreathingEngine();

    if (window.toddlerAudio) {
      if (typeof window.toddlerAudio.playOmChant === 'function') {
        window.toddlerAudio.playOmChant();
      } else {
        window.toddlerAudio.playTempleBell(880);
      }
      window.toddlerAudio.speak({
        hi: "ध्यान और शांत श्वास! कमल के साथ गहरी सांस लें और भावनाएं पहचानें!",
        en: "Mindfulness and Deep Breath! Breathe gently with the lotus and explore sacred emotions!"
      });
    }
  }

  stop() {
    if (this.breathCycleTimer) {
      clearTimeout(this.breathCycleTimer);
      this.breathCycleTimer = null;
    }
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const activeEmotion = this.emotions.find(e => e.id === this.currentEmotionId) || this.emotions[0];
    const emoTitle = activeEmotion.title[lang] || activeEmotion.title.en;
    const emoSutra = activeEmotion.sutra[lang] || activeEmotion.sutra.en;

    this.container.innerHTML = `
      <div class="game-stage-wrapper game-dhyana">
        <!-- Main Mindfulness Stage -->
        <section class="dhyana-stage-center">
          <!-- Mindful Krishna Meditation Seat with Emotion Aura Halo -->
          <div class="dhyana-avatar-wrap ${activeEmotion.glowClass}" id="dhyana-avatar-card">
            <div class="dhyana-halo-ring" id="dhyana-halo" style="--halo-color: ${activeEmotion.auraColor};"></div>
            <div class="dhyana-krishna-svg">
              ${VedicAssets.mindfulKrishna || ''}
            </div>
            <!-- Emotion Ribbon Banner -->
            <div class="emotion-ribbon-badge" id="emotion-ribbon-badge">
              <span class="ribbon-icon">${activeEmotion.icon}</span>
              <span class="ribbon-text">${emoTitle}</span>
              <span class="ribbon-sutra">${emoSutra}</span>
            </div>
          </div>

          <!-- Pranayama Mode Selector: Lotus Breathing vs Bhramari Bumblebee Hum -->
          <div class="pranayama-mode-bar">
            <button class="pranayama-pill-btn ${this.pranayamaMode === 'lotus' ? 'active' : ''}" data-mode="lotus">
              🌸 ${lang === 'hi' ? 'कमल प्राणायाम' : 'Lotus Breath'}
            </button>
            <button class="pranayama-pill-btn ${this.pranayamaMode === 'bhramari' ? 'active' : ''}" data-mode="bhramari">
              🐝 ${lang === 'hi' ? 'भ्रामरी गुंजन (Calm)' : 'Bumblebee Hum'}
            </button>
          </div>

          <!-- Pranayama Breathing Lotus Rhythm Guide -->
          <div class="breathing-lotus-wrap ${this.pranayamaMode === 'bhramari' ? 'is-bhramari-mode' : ''}" id="breathing-lotus-wrap" title="Tap to chant Om">
            <div class="bhramari-bee-flight ${this.pranayamaMode === 'bhramari' ? '' : 'hidden'}" id="bhramari-bee-flight">
              ${VedicAssets.goldenBee || '🐝'}
            </div>
            <div class="breathing-lotus-visual lotus-expanding" id="breathing-lotus">
              ${VedicAssets.kamal || '🪷'}
            </div>
            <div class="breathing-cue-label" id="breathing-cue-label">
              ${lang === 'hi' ? 'श्वास लें (Inhale) 🌸' : 'Breathe In 🌸'}
            </div>
          </div>
        </section>

        <!-- Bottom Emotional Literacy Cards Tray (IB PYP "Who We Are") -->
        <section class="navarasa-tray-zone">
          <div class="navarasa-header-bar">
            <span class="navarasa-title">🕊️ ${lang === 'hi' ? 'नवरस भाव बोध (Emotional Literacy)' : 'Sacred Feelings & Emotional Literacy'}</span>
          </div>
          <div class="navarasa-cards-tray">
            ${this.emotions.map(emo => {
              const isActive = (emo.id === this.currentEmotionId);
              const title = emo.title[lang] || emo.title.en;
              return `
                <button class="navarasa-card-btn ${isActive ? 'active-emotion' : ''}"
                        data-emotion="${emo.id}"
                        id="emo-btn-${emo.id}"
                        style="--emo-color: ${emo.auraColor};">
                  <span class="emo-card-icon">${emo.icon}</span>
                  <span class="emo-card-title">${title}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      </div>
    `;
  }

  bindDhyanaEvents() {
    // 1. Emotion Cards Click/Tap
    const tray = this.container.querySelector('.navarasa-cards-tray');
    if (tray) {
      tray.addEventListener('pointerdown', (e) => {
        const btn = e.target.closest('.navarasa-card-btn');
        if (!btn) return;
        e.preventDefault();
        const emoId = btn.dataset.emotion;
        this.selectEmotion(emoId);
      });
    }

    // 2. Breathing Lotus Tap -> Om Chant
    const lotusWrap = this.container.querySelector('#breathing-lotus-wrap');
    if (lotusWrap) {
      lotusWrap.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        lotusWrap.classList.add('lotus-tapped');
        setTimeout(() => lotusWrap.classList.remove('lotus-tapped'), 800);
        if (window.toddlerAudio) {
          if (typeof window.toddlerAudio.playOmChant === 'function') {
            window.toddlerAudio.playOmChant();
          } else {
            window.toddlerAudio.playTempleBell(880);
          }
        }
      });
    }

    // 3. Krishna Avatar Tap -> Shanti Mode / Flute
    const avatarCard = this.container.querySelector('#dhyana-avatar-card');
    if (avatarCard) {
      avatarCard.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        avatarCard.classList.add('avatar-pulse');
        setTimeout(() => avatarCard.classList.remove('avatar-pulse'), 800);
        if (window.toddlerAudio) {
          window.toddlerAudio.playBansuri(523.25);
          setTimeout(() => {
            if (window.toddlerAudio) window.toddlerAudio.playGhungroo();
          }, 300);
        }
      });
    }

    // 4. Pranayama Mode Selector (Lotus vs Bhramari Bumblebee)
    const modeBtns = this.container.querySelectorAll('.pranayama-pill-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const mode = btn.dataset.mode;
        if (mode && mode !== this.pranayamaMode) {
          this.pranayamaMode = mode;
          this.render();
          this.bindDhyanaEvents();
          this.startBreathingEngine();
          if (window.toddlerAudio) {
            window.toddlerAudio.playJhulaChime(880);
            window.toddlerAudio.speak({
              hi: mode === 'bhramari' ? "भ्रामरी प्राणायाम! नन्हा भौंरा गुंजन करेगा!" : "कमल प्राणायाम! शांत गहरी सांस लें!",
              en: mode === 'bhramari' ? "Bumblebee Calming Breath! Listen to the soothing hum!" : "Lotus Breathing! Breathe deeply and calmly!"
            });
          }
        }
      });
    });
  }

  selectEmotion(emoId) {
    const emo = this.emotions.find(e => e.id === emoId);
    if (!emo) return;
    this.currentEmotionId = emoId;
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

    // Update active state on emotion buttons
    const allBtns = this.container.querySelectorAll('.navarasa-card-btn');
    allBtns.forEach(btn => btn.classList.remove('active-emotion'));

    const activeBtn = this.container.querySelector('#emo-btn-' + emoId);
    if (activeBtn) activeBtn.classList.add('active-emotion');

    // Update avatar aura & ribbon badge
    const avatarCard = this.container.querySelector('#dhyana-avatar-card');
    if (avatarCard) {
      this.emotions.forEach(e => avatarCard.classList.remove(e.glowClass));
      avatarCard.classList.add(emo.glowClass);
    }

    const halo = this.container.querySelector('#dhyana-halo');
    if (halo) halo.style.setProperty('--halo-color', emo.auraColor);

    const ribbon = this.container.querySelector('#emotion-ribbon-badge');
    if (ribbon) {
      const title = emo.title[lang] || emo.title.en;
      const sutra = emo.sutra[lang] || emo.sutra.en;
      ribbon.innerHTML = `
        <span class="ribbon-icon">${emo.icon}</span>
        <span class="ribbon-text">${title}</span>
        <span class="ribbon-sutra">${sutra}</span>
      `;
    }

    // Play emotion sound & bilingual guidance
    if (typeof emo.sound === 'function') emo.sound();

    if (window.toddlerAudio) {
      const phrase = {
        hi: `${emo.title.hi}! ${emo.sutra.hi}`,
        en: `${emo.title.en}! ${emo.sutra.en}`
      };
      window.toddlerAudio.speak(phrase);
    }
  }

  startBreathingEngine() {
    if (this.breathCycleTimer) clearTimeout(this.breathCycleTimer);

    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('shanti_yogi');
    }

    let phaseIndex = 0;
    // 3 Phases: Inhale (4s), Hold (2s), Exhale (4s) -> Total 10s cycle
    const phases = [
      { name: 'in', dur: 4000, label: { hi: 'श्वास लें (Inhale) 🌸', en: 'Breathe In 🌸' }, css: 'lotus-expanding' },
      { name: 'hold', dur: 2000, label: { hi: 'विश्राम (Gentle Pause) ✨', en: 'Gentle Pause ✨' }, css: 'lotus-holding' },
      { name: 'out', dur: 4000, label: { hi: 'श्वास छोड़ें (Exhale) 🍃', en: 'Breathe Out 🍃' }, css: 'lotus-contracting' }
    ];

    const applyPhase = (p) => {
      this.breathState = p.name;
      const lotus = this.container.querySelector('#breathing-lotus');
      const cue = this.container.querySelector('#breathing-cue-label');
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

      if (lotus) {
        lotus.classList.remove('lotus-expanding', 'lotus-holding', 'lotus-contracting');
        lotus.classList.add(p.css);
      }

      if (cue) {
        cue.textContent = p.label[lang] || p.label.en;
      }

      if (this.pranayamaMode === 'bhramari') {
        const bee = this.container.querySelector('#bhramari-bee-flight');
        if (bee) {
          bee.classList.remove('bee-inhale', 'bee-pause', 'bee-humming');
          void bee.offsetWidth;
          if (p.name === 'in') {
            bee.classList.add('bee-inhale');
          } else if (p.name === 'hold') {
            bee.classList.add('bee-pause');
          } else if (p.name === 'out') {
            bee.classList.add('bee-humming');
          }
        }
        if (p.name === 'out') {
          if (cue) cue.textContent = (lang === 'hi' ? 'भ्रामरी गुंजन: म्-म्-म्... 🐝' : 'Humming Breath: Mmm... 🐝');
          if (window.toddlerAudio && !window.toddlerAudio.isMuted) {
            window.toddlerAudio.playBhramariHum(3.2);
          }
        }
      } else {
        // Subtle soft audio cue on breath phase
        if (window.toddlerAudio && !window.toddlerAudio.isMuted) {
          if (p.name === 'in') {
            window.toddlerAudio.playBansuri(392.0); // Gentle Pa
          } else if (p.name === 'out') {
            if (typeof window.toddlerAudio.playSingingBowl === 'function') {
              window.toddlerAudio.playSingingBowl(324);
            }
          }
        }
      }
    };

    const runNext = () => {
      const cur = phases[phaseIndex];
      applyPhase(cur);
      phaseIndex = (phaseIndex + 1) % phases.length;
      this.breathCycleTimer = setTimeout(runNext, cur.dur);
    };

    runNext();
  }

  handleAnyKey(key) {
    this.mashCounter++;
    // Cycle to next emotion
    const nextIdx = this.mashCounter % this.emotions.length;
    const nextEmotion = this.emotions[nextIdx];
    this.selectEmotion(nextEmotion.id);
  }
}

// ==========================================
// 11. GOPALA'S MATKI TOWER (MONTESSORI SERIATION)
// Size Discrimination & Balance (Montessori Pink Tower in Vrindavan)
// ==========================================
class MatkiTowerGame {
  constructor(container) {
    this.container = container;
    this.mashStep = 0;
    this.petalShower = (typeof CelebrationPetalShower !== 'undefined') ? new CelebrationPetalShower() : null;
    this.initTowerState();
  }

  initTowerState() {
    this.isCompleted = false;
    this.stacked = []; // bottom to top (Size 5 down to 1)

    // 5 Graded Earthen Butter Pots
    this.allMatkis = [
      {
        id: 'matka-5',
        size: 5,
        widthPx: 120,
        freq: 261.63, // Sa (Deep base resonance)
        title: { hi: 'महा मटका (सबसे बड़ा)', en: 'Maha Matka (Largest)' },
        tag: 'Maha'
      },
      {
        id: 'matka-4',
        size: 4,
        widthPx: 102,
        freq: 293.66, // Re
        title: { hi: 'बड़ा मटका', en: 'Bada Matka (Large)' },
        tag: 'Bada'
      },
      {
        id: 'matka-3',
        size: 3,
        widthPx: 86,
        freq: 329.63, // Ga
        title: { hi: 'मध्यम मटका', en: 'Madhyam Matka (Medium)' },
        tag: 'Madhyam'
      },
      {
        id: 'matka-2',
        size: 2,
        widthPx: 70,
        freq: 349.23, // Ma
        title: { hi: 'छोटा मटका', en: 'Chhota Matka (Small)' },
        tag: 'Chhota'
      },
      {
        id: 'matka-1',
        size: 1,
        widthPx: 56,
        freq: 392.00, // Pa (Highest sweet note)
        title: { hi: 'लघु मटका (सबसे छोटा)', en: 'Laghu Matka (Tiny)' },
        tag: 'Laghu'
      }
    ];

    // Shuffle the unstacked pots for the toddler selection tray
    this.unstacked = this.allMatkis.slice();
    for (let i = this.unstacked.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.unstacked[i];
      this.unstacked[i] = this.unstacked[j];
      this.unstacked[j] = temp;
    }
  }

  start() {
    this.render();
    this.bindMatkiEvents();
    if (window.toddlerAudio) {
      window.toddlerAudio.playTempleBell(880);
      window.toddlerAudio.speak({
        hi: "कान्हा की माखन मटकी! सबसे बड़े मटके से शुरू करके मटकी का शिखर बनाएं!",
        en: "Gopala's Butter Pot Tower! Build the tower by placing the largest pot at the bottom!"
      });
    }
  }

  stop() {
    if (this.petalShower && typeof this.petalShower.cleanup === 'function') {
      this.petalShower.cleanup();
    }
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

    this.container.innerHTML = `
      <div class="game-stage-wrapper game-matki-tower">
        <!-- Top Stage: Pedestal and Stacking Tower -->
        <section class="matki-tower-stage">
          <!-- Celebration Banner on Completion -->
          <div class="tower-success-banner ${this.isCompleted ? 'visible' : 'hidden'}" id="tower-celebration-banner">
            <span class="banner-sparkle">⭐</span>
            <span class="banner-title">${lang === 'hi' ? 'अद्भुत! माखन शिखर पूर्ण! 🍯' : 'Hooray! Butter Pot Tower Complete! 🍯'}</span>
            <span class="banner-sparkle">⭐</span>
          </div>

          <!-- The Tower Stacking Column -->
          <div class="tower-column" id="tower-stack-column">
            <!-- Little Kanha Appears on Top upon Completion -->
            <div class="tower-kanha-top ${this.isCompleted ? 'kanha-peek-active' : 'hidden'}" id="tower-kanha-avatar">
              ${VedicAssets.balaKrishna || '👶'}
            </div>

            <!-- Stacker Slots (Rendered top to bottom: index stacked.length-1 down to 0) -->
            <div class="stacked-pots-wrapper" id="stacked-pots-wrapper">
              ${this.stacked.slice().reverse().map(pot => {
                const title = pot.title[lang] || pot.title.en;
                return `
                  <div class="stacked-pot-item pot-snap-in" style="width: ${pot.widthPx}px;" title="${title}">
                    ${VedicAssets.decoratedMatka || '🏺'}
                    <span class="pot-size-label">${pot.tag}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Vrindavan Stone Pedestal (Base) -->
            <div class="tower-stone-pedestal" id="tower-pedestal">
              <span class="pedestal-ornament">🕉️</span>
              <span class="pedestal-label">${lang === 'hi' ? 'शिखर आधार (Base)' : 'Stone Pedestal'}</span>
            </div>
          </div>
        </section>

        <!-- Bottom Stage: Montessori Size Selection Tray -->
        <section class="matki-selection-tray-zone">
          <div class="selection-tray-header">
            <span class="tray-title">🏺 ${lang === 'hi' ? 'मटकी आकार चयन (Montessori Size Gradation)' : 'Select Matching Pot Size'}</span>
            <button class="reset-tower-btn" id="reset-tower-btn" title="Build Again">
              🔄 ${lang === 'hi' ? 'पुनः बनाएं' : 'Reset'}
            </button>
          </div>

          <div class="matki-loose-tray" id="matki-loose-tray">
            ${this.unstacked.map(pot => {
              const title = pot.title[lang] || pot.title.en;
              return `
                <button class="matki-choice-btn" data-id="${pot.id}" style="width: ${pot.widthPx}px;" title="${title}">
                  <div class="matki-btn-svg">${VedicAssets.decoratedMatka || '🏺'}</div>
                  <span class="matki-btn-label">${pot.tag}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      </div>
    `;
  }

  bindMatkiEvents() {
    // 1. Matki Selection from Tray
    const tray = this.container.querySelector('#matki-loose-tray');
    if (tray) {
      tray.addEventListener('pointerdown', (e) => {
        const btn = e.target.closest('.matki-choice-btn');
        if (!btn) return;
        e.preventDefault();
        const potId = btn.dataset.id;
        this.tryStackMatki(potId, btn);
      });
    }

    // 2. Reset Button
    const resetBtn = this.container.querySelector('#reset-tower-btn');
    if (resetBtn) {
      resetBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (window.toddlerAudio) window.toddlerAudio.playDamru();
        this.initTowerState();
        this.render();
        this.bindMatkiEvents();
      });
    }
  }

  tryStackMatki(potId, btnEl) {
    if (this.isCompleted) return;

    const potIndex = this.unstacked.findIndex(p => p.id === potId);
    if (potIndex === -1) return;
    const chosenPot = this.unstacked[potIndex];

    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

    // The next required size is 5 minus currently stacked length (5, 4, 3, 2, 1)
    const neededSize = 5 - this.stacked.length;

    if (chosenPot.size === neededSize) {
      // Correct Montessori Size Match!
      this.stacked.push(chosenPot);
      this.unstacked.splice(potIndex, 1);

      // Play musical note
      if (window.toddlerAudio) {
        if (typeof window.toddlerAudio.playJalTarang === 'function') {
          window.toddlerAudio.playJalTarang(chosenPot.freq);
        } else {
          window.toddlerAudio.playBansuri(chosenPot.freq);
        }
        const title = chosenPot.title[lang] || chosenPot.title.en;
        window.toddlerAudio.speak(title);
      }

      // Check if complete
      if (this.stacked.length === 5) {
        this.isCompleted = true;
        if (window.ToddlerRewards) {
          window.ToddlerRewards.award('matki_shikhar');
        }
        this.render();
        this.bindMatkiEvents();

        setTimeout(() => {
          if (this.petalShower && typeof this.petalShower.celebrate === 'function') {
            this.petalShower.celebrate(this.container);
          }
          if (window.toddlerAudio) {
            window.toddlerAudio.playBabyGiggle();
            setTimeout(() => {
              if (window.toddlerAudio) window.toddlerAudio.playCelebration();
            }, 400);
            window.toddlerAudio.speak({
              hi: "अद्भुत! मटकी शिखर तैयार! कान्हा को माखन मिल गया! जय श्री कृष्णा!",
              en: "Wonderful! The Butter Pot Tower is balanced! Little Kanha enjoys fresh butter!"
            });
          }
        }, 300);
      } else {
        this.render();
        this.bindMatkiEvents();
      }
    } else {
      // Self-correcting feedback: Friendly coaching
      if (btnEl) {
        btnEl.classList.add('pot-shake-wobble');
        setTimeout(() => btnEl.classList.remove('pot-shake-wobble'), 500);
      }

      if (window.toddlerAudio) {
        window.toddlerAudio.playDamru();
        const neededPot = this.allMatkis.find(p => p.size === neededSize);
        const neededTitle = neededPot ? (neededPot.title[lang] || neededPot.title.en) : '';
        window.toddlerAudio.speak({
          hi: `पहले ${neededTitle} रखें! आधार मजबूत होना चाहिए!`,
          en: `Place the ${neededTitle} next for perfect balance!`
        });
      }
    }
  }

  handleAnyKey(key) {
    this.mashStep++;
    if (this.isCompleted) {
      this.initTowerState();
      this.render();
      this.bindMatkiEvents();
      return;
    }

    const neededSize = 5 - this.stacked.length;
    const nextPot = this.unstacked.find(p => p.size === neededSize);
    if (nextPot) {
      this.tryStackMatki(nextPot.id, null);
    }
  }
}

// ==========================================
// 12. PANCHA MAHA BHUTA (THE 5 SACRED ELEMENTS)
// IB PYP "Sharing the Planet" & Vedic Natural Science
// ==========================================
class PanchaBhutaGame {
  constructor(container) {
    this.container = container;
    this.currentElementId = 'prithvi';
    this.mashIndex = 0;

    // 5 Sacred Great Elements (Vedic Natural Philosophy & IB PYP)
    this.elements = [
      {
        id: 'prithvi',
        icon: '🌍',
        name: { hi: 'पृथ्वी (भूमि / Earth)', en: 'Prithvi (Earth & Soil)' },
        subtext: { hi: 'सुगंधित मिट्टी, हरी दूब और गऊ-माता का पोषण', en: 'Fragrant Vrindavan soil, green grass and nourishing mother earth' },
        sanskrit: 'ॐ पृथिव्यै नमः',
        sound: () => {
          if (window.toddlerAudio) {
            window.toddlerAudio.playCowBell();
            setTimeout(() => {
              if (window.toddlerAudio) window.toddlerAudio.playGrassChew();
            }, 300);
          }
        },
        bgGradient: 'radial-gradient(circle, #F0FDF4 0%, #DCFCE7 100%)',
        accentColor: '#16A34A',
        badgeClass: 'element-prithvi',
        heroSvg: VedicAssets.govardhanHill || '🏔️'
      },
      {
        id: 'jala',
        icon: '💧',
        name: { hi: 'जल (यमुना / Water)', en: 'Jala (Holy Water)' },
        subtext: { hi: 'पवित्र यमुना नदी, तैरते कमल और जल की शीतलता', en: 'Pure Yamuna river streams, floating lotuses and refreshing water' },
        sanskrit: 'ॐ अद्भ्यो नमः',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playYamunaStream === 'function') {
              window.toddlerAudio.playYamunaStream();
            } else {
              window.toddlerAudio.playWaterSplash();
            }
          }
        },
        bgGradient: 'radial-gradient(circle, #F0F9FF 0%, #BAE6FD 100%)',
        accentColor: '#0284C7',
        badgeClass: 'element-jala',
        heroSvg: VedicAssets.waterPitcher || '💧'
      },
      {
        id: 'agni',
        icon: '🔥',
        name: { hi: 'अग्नि (तेज / Fire)', en: 'Agni (Sacred Fire)' },
        subtext: { hi: 'पवित्र दीप ज्योति, यज्ञ अग्नि और जीवन की ऊर्जा', en: 'Sacred Ghee diya flame, purifying Yajna fire and warm energy' },
        sanskrit: 'ॐ अग्नये नमः',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playSingingBowl === 'function') {
              window.toddlerAudio.playSingingBowl(528);
            } else {
              window.toddlerAudio.playAartiChimes();
            }
          }
        },
        bgGradient: 'radial-gradient(circle, #FEF2F2 0%, #FECACA 100%)',
        accentColor: '#DC2626',
        badgeClass: 'element-agni',
        heroSvg: VedicAssets.diya || '🪔'
      },
      {
        id: 'vayu',
        icon: '💨',
        name: { hi: 'वायु (पवन / Air)', en: 'Vayu (Sacred Breeze)' },
        subtext: { hi: 'कदम वृक्ष की शीतल बयार और कान्हा की बांसुरी', en: 'Gentle Vrindavan breeze carrying sweet bansuri flute notes' },
        sanskrit: 'ॐ वायवे नमः',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playKadambaBreeze === 'function') {
              window.toddlerAudio.playKadambaBreeze();
            }
            setTimeout(() => {
              if (window.toddlerAudio) window.toddlerAudio.playDivineFlutePhrase();
            }, 300);
          }
        },
        bgGradient: 'radial-gradient(circle, #FAF5FF 0%, #E9D5FF 100%)',
        accentColor: '#9333EA',
        badgeClass: 'element-vayu',
        heroSvg: VedicAssets.mayur || '🦚'
      },
      {
        id: 'akasha',
        icon: '🌌',
        name: { hi: 'आकाश (अंतरिक्ष / Space)', en: 'Akasha (Cosmic Space)' },
        subtext: { hi: 'अनंत नीला आकाश, जगमगाते तारे और ॐ की दिव्य ध्वनि', en: 'Infinite cosmos, moon, twinkling stars and divine Om vibration' },
        sanskrit: 'ॐ आकाशाय नमः',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playOmChant === 'function') {
              window.toddlerAudio.playOmChant();
            } else {
              window.toddlerAudio.playTempleBell(880);
            }
          }
        },
        bgGradient: 'radial-gradient(circle, #EEF2FF 0%, #C7D2FE 100%)',
        accentColor: '#4F46E5',
        badgeClass: 'element-akasha',
        heroSvg: VedicAssets.panchaBhutaEmblem || '🌌'
      }
    ];
  }

  start() {
    this.render();
    this.bindBhutaEvents();
    if (window.toddlerAudio) {
      window.toddlerAudio.playTempleBell(880);
      window.toddlerAudio.speak({
        hi: "पंच महाभूत दर्शन! पृथ्वी, जल, अग्नि, वायु और आकाश का आदर करें!",
        en: "The Five Sacred Elements! Discover Earth, Water, Fire, Air and Space in harmony!"
      });
    }
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const activeElem = this.elements.find(e => e.id === this.currentElementId) || this.elements[0];
    const eName = activeElem.name[lang] || activeElem.name.en;
    const eSub = activeElem.subtext[lang] || activeElem.subtext.en;

    this.container.innerHTML = `
      <div class="game-stage-wrapper game-pancha-bhuta">
        <!-- Center Interactive Element Sanctuary Card -->
        <section class="bhuta-stage-center">
          <div class="bhuta-hero-card ${activeElem.badgeClass}"
               id="bhuta-hero-card"
               style="background: ${activeElem.bgGradient}; --elem-accent: ${activeElem.accentColor};"
               title="Tap to trigger natural element harmony">
            <div class="bhuta-aura-pulse" id="bhuta-aura"></div>
            <div class="bhuta-hero-svg" id="bhuta-hero-art">
              ${activeElem.heroSvg}
            </div>
            <div class="bhuta-name-banner">
              <span class="bhuta-icon">${activeElem.icon}</span>
              <span class="bhuta-title-text">${eName}</span>
              <span class="bhuta-sanskrit-mantra">${activeElem.sanskrit}</span>
            </div>
            <p class="bhuta-description">${eSub}</p>
          </div>
        </section>

        <!-- Bottom Element Navigation Selector (5 Sacred Pills) -->
        <section class="bhuta-tray-zone">
          <div class="bhuta-tray-header">
            <span class="bhuta-tray-title">🌿 ${lang === 'hi' ? 'पंच महाभूत (IB PYP "Sharing the Planet")' : 'The 5 Sacred Elements (Pancha Maha Bhuta)'}</span>
          </div>

          <div class="bhuta-elements-tray">
            ${this.elements.map(elem => {
              const isActive = (elem.id === this.currentElementId);
              const title = elem.name[lang] || elem.name.en;
              return `
                <button class="bhuta-pill-btn ${isActive ? 'active-element' : ''}"
                        data-element="${elem.id}"
                        id="bhuta-pill-${elem.id}"
                        style="--elem-color: ${elem.accentColor};">
                  <span class="bhuta-pill-icon">${elem.icon}</span>
                  <span class="bhuta-pill-title">${title.split(' ')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      </div>
    `;
  }

  bindBhutaEvents() {
    // 1. Element Selector Pills
    const tray = this.container.querySelector('.bhuta-elements-tray');
    if (tray) {
      tray.addEventListener('pointerdown', (e) => {
        const btn = e.target.closest('.bhuta-pill-btn');
        if (!btn) return;
        e.preventDefault();
        const elemId = btn.dataset.element;
        this.selectElement(elemId);
      });
    }

    // 2. Direct Tap on Hero Card
    const heroCard = this.container.querySelector('#bhuta-hero-card');
    if (heroCard) {
      heroCard.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        heroCard.classList.add('bhuta-tapped-pulse');
        setTimeout(() => heroCard.classList.remove('bhuta-tapped-pulse'), 700);
        const elem = this.elements.find(el => el.id === this.currentElementId);
        if (elem && typeof elem.sound === 'function') elem.sound();
      });
    }
  }

  selectElement(elemId) {
    const elem = this.elements.find(e => e.id === elemId);
    if (!elem) return;

    this.currentElementId = elemId;
    this.render();
    this.bindBhutaEvents();

    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('pancha_bhuta');
    }

    if (typeof elem.sound === 'function') elem.sound();

    if (window.toddlerAudio) {
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const name = elem.name[lang] || elem.name.en;
      const sub = elem.subtext[lang] || elem.subtext.en;
      window.toddlerAudio.speak(`${name}! ${sub}`);
    }
  }

  handleAnyKey(key) {
    this.mashIndex++;
    const nextElem = this.elements[this.mashIndex % this.elements.length];
    this.selectElement(nextElem.id);
  }
}

// ==========================================
// 13. UTSAVA & JHULA (INDIAN FESTIVALS CELEBRATION)
// Cultural Heritage: Janmashtami, Phoolon ki Holi, Diwali & Sankranti
// ==========================================
class UtsavaGame {
  constructor(container) {
    this.container = container;
    this.currentFestivalId = 'janmashtami';
    this.diwaliLitCount = 0;
    this.mashStep = 0;
    this.petalShower = (typeof CelebrationPetalShower !== 'undefined') ? new CelebrationPetalShower() : null;

    // 4 Traditional Festivals of Indian Heritage
    this.festivals = [
      {
        id: 'janmashtami',
        icon: '🪢',
        name: { hi: 'जन्माष्टमी (कान्हा झूला)', en: 'Janmashtami (Golden Jhula)' },
        sutra: { hi: 'नन्द के आनन्द भयो, जय कन्हैया लाल की!', en: 'Gently swing little Kanha in the divine golden floral swing!' },
        tagline: { hi: 'झूला झुलाएं', en: 'Rock the Swing' },
        heroArt: VedicAssets.goldenJhula || '🪢',
        bgGradient: 'radial-gradient(circle, #FFFBEB 0%, #FEF3C7 100%)',
        accentColor: '#D97706'
      },
      {
        id: 'holi',
        icon: '🌸',
        name: { hi: 'फूलों की होली (वृन्दावन)', en: 'Phoolon ki Holi (Flower Petals)' },
        sutra: { hi: 'सुगंधित गुलाब और गेंदा पुष्पों की दिव्य होली!', en: 'Celebrate fragrant Vrindavan Holi with pure sacred flower petals!' },
        tagline: { hi: 'पुष्प वर्षा करें', en: 'Shower Petals' },
        heroArt: VedicAssets.kamal || '🌸',
        bgGradient: 'radial-gradient(circle, #FDF2F8 0%, #FCE7F3 100%)',
        accentColor: '#DB2777'
      },
      {
        id: 'diwali',
        icon: '🪔',
        name: { hi: 'दीपावली (दीपोत्सव)', en: 'Deepavali (Festival of Lights)' },
        sutra: { hi: 'घर-घर जले मंगल दीप, शुभ प्रकाश और ज्ञान!', en: 'Light sacred earthen diyas to illuminate hearts with divine light!' },
        tagline: { hi: 'दीपक जलाएं', en: 'Light Diyas' },
        heroArt: VedicAssets.diya || '🪔',
        bgGradient: 'radial-gradient(circle, #FFF7ED 0%, #FFEDD5 100%)',
        accentColor: '#EA580C'
      },
      {
        id: 'sankranti',
        icon: '🪁',
        name: { hi: 'मकर संक्रांति (पतंग उत्सव)', en: 'Makar Sankranti (Flying Kites)' },
        sutra: { hi: 'नीले आकाश में उड़ती रंग-बिरंगी पतंग और सूर्य नमन!', en: 'Fly colorful kites in the azure sky and welcome the warming sun!' },
        tagline: { hi: 'पतंग उड़ाएं', en: 'Fly Kites' },
        heroArt: VedicAssets.mayur || '🪁',
        bgGradient: 'radial-gradient(circle, #F0F9FF 0%, #E0F2FE 100%)',
        accentColor: '#0284C7'
      }
    ];
  }

  start() {
    this.render();
    this.bindUtsavaEvents();
    if (window.toddlerAudio) {
      window.toddlerAudio.playTempleBell(880);
      window.toddlerAudio.speak({
        hi: "भारत के दिव्य उत्सव! कान्हा का झूला झुलाएं और फूलों की होली खेलें!",
        en: "Festivals of India! Gently rock Kanha's swing and celebrate with fragrant flowers!"
      });
    }
  }

  stop() {
    if (this.petalShower && typeof this.petalShower.cleanup === 'function') {
      this.petalShower.cleanup();
    }
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const activeFest = this.festivals.find(f => f.id === this.currentFestivalId) || this.festivals[0];
    const festName = activeFest.name[lang] || activeFest.name.en;
    const festSutra = activeFest.sutra[lang] || activeFest.sutra.en;
    const actionLabel = activeFest.tagline[lang] || activeFest.tagline.en;

    this.container.innerHTML = `
      <div class="game-stage-wrapper game-utsava">
        <!-- Center Interactive Festival Stage -->
        <section class="utsava-stage-center">
          <div class="utsava-card fest-${activeFest.id}"
               id="utsava-hero-card"
               style="background: ${activeFest.bgGradient}; --fest-accent: ${activeFest.accentColor};">
            <!-- Dynamic Festival Hero Visual -->
            <div class="utsava-hero-visual-wrap" id="utsava-visual-wrap">
              ${this.renderFestivalInteractiveCenter(activeFest.id)}
            </div>

            <!-- Festival Ribbon Info -->
            <div class="utsava-ribbon-badge">
              <span class="utsava-badge-icon">${activeFest.icon}</span>
              <span class="utsava-badge-title">${festName}</span>
            </div>
            <p class="utsava-sutra-text">${festSutra}</p>

            <!-- Big Action Trigger Button -->
            <button class="utsava-action-btn" id="utsava-action-trigger" style="--btn-color: ${activeFest.accentColor};">
              <span class="btn-action-icon">${activeFest.icon}</span>
              <span class="btn-action-text">${actionLabel}</span>
            </button>
          </div>
        </section>

        <!-- Bottom Festival Selector Navigation Pills -->
        <section class="utsava-nav-zone">
          <div class="utsava-pills-tray">
            ${this.festivals.map(fest => {
              const isActive = (fest.id === this.currentFestivalId);
              const title = fest.name[lang] || fest.name.en;
              return `
                <button class="utsava-pill-btn ${isActive ? 'active-festival' : ''}"
                        data-festival="${fest.id}"
                        id="fest-pill-${fest.id}"
                        style="--fest-color: ${fest.accentColor};">
                  <span class="pill-fest-icon">${fest.icon}</span>
                  <span class="pill-fest-label">${title.split(' ')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      </div>
    `;
  }

  renderFestivalInteractiveCenter(festId) {
    if (festId === 'janmashtami') {
      return `
        <div class="jhula-interactive-container" id="jhula-container" title="Tap to swing little Kanha">
          <div class="jhula-swing-element" id="jhula-swing-element">
            <div class="jhula-svg-frame">${VedicAssets.goldenJhula || ''}</div>
            <div class="jhula-baby-krishna">${VedicAssets.balaKrishna || '👶'}</div>
          </div>
        </div>
      `;
    } else if (festId === 'holi') {
      return `
        <div class="holi-meadow-container" id="holi-container" title="Tap to shower fragrant flower petals">
          <div class="holi-avatar-box">${VedicAssets.mindfulKrishna || VedicAssets.balaKrishna || '👶'}</div>
          <div class="holi-petal-splash" id="holi-petal-splash">🌸 🌼 🌹</div>
        </div>
      `;
    } else if (festId === 'diwali') {
      return `
        <div class="diwali-temple-courtyard" id="diwali-courtyard" title="Tap diyas to illuminate them">
          <div class="diwali-diyas-row">
            <button class="diwali-diya-tap ${this.diwaliLitCount >= 1 ? 'diya-lit' : ''}" data-index="1">🪔</button>
            <button class="diwali-diya-tap ${this.diwaliLitCount >= 2 ? 'diya-lit' : ''}" data-index="2">🪔</button>
            <button class="diwali-diya-tap ${this.diwaliLitCount >= 3 ? 'diya-lit' : ''}" data-index="3">🪔</button>
            <button class="diwali-diya-tap ${this.diwaliLitCount >= 4 ? 'diya-lit' : ''}" data-index="4">🪔</button>
            <button class="diwali-diya-tap ${this.diwaliLitCount >= 5 ? 'diya-lit' : ''}" data-index="5">🪔</button>
          </div>
          <span class="diwali-glow-text">${this.diwaliLitCount}/5 दीप प्रज्वलित</span>
        </div>
      `;
    } else {
      // Sankranti
      return `
        <div class="sankranti-sky-container" id="sankranti-sky" title="Tap to fly colorful kites">
          <div class="sankranti-sun-orb">☀️</div>
          <div class="sankranti-kite-soar" id="sankranti-kite">🪁</div>
        </div>
      `;
    }
  }

  bindUtsavaEvents() {
    // 1. Festival Navigation Pills
    const navTray = this.container.querySelector('.utsava-pills-tray');
    if (navTray) {
      navTray.addEventListener('pointerdown', (e) => {
        const btn = e.target.closest('.utsava-pill-btn');
        if (!btn) return;
        e.preventDefault();
        const festId = btn.dataset.festival;
        this.selectFestival(festId);
      });
    }

    // 2. Action Trigger Button
    const actionBtn = this.container.querySelector('#utsava-action-trigger');
    if (actionBtn) {
      actionBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.triggerFestivalAction();
      });
    }

    // 3. Direct Tap on Festival Center Visual
    const visualWrap = this.container.querySelector('#utsava-visual-wrap');
    if (visualWrap) {
      visualWrap.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.triggerFestivalAction();
      });
    }
  }

  selectFestival(festId) {
    const fest = this.festivals.find(f => f.id === festId);
    if (!fest) return;

    this.currentFestivalId = festId;
    this.render();
    this.bindUtsavaEvents();

    if (window.toddlerAudio) {
      window.toddlerAudio.playTempleBell(1046.5);
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const name = fest.name[lang] || fest.name.en;
      const sutra = fest.sutra[lang] || fest.sutra.en;
      window.toddlerAudio.speak(`${name}! ${sutra}`);
    }
  }

  triggerFestivalAction() {
    const festId = this.currentFestivalId;
    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('utsav_ananda');
    }

    if (festId === 'janmashtami') {
      const swing = this.container.querySelector('#jhula-swing-element');
      if (swing) {
        swing.classList.remove('jhula-swinging');
        void swing.offsetWidth;
        swing.classList.add('jhula-swinging');
      }
      if (window.toddlerAudio) {
        if (typeof window.toddlerAudio.playJhulaChime === 'function') {
          window.toddlerAudio.playJhulaChime();
        } else {
          window.toddlerAudio.playTempleBell(1046.5);
        }
        setTimeout(() => {
          if (window.toddlerAudio) window.toddlerAudio.playBabyGiggle();
        }, 400);
        window.toddlerAudio.speak({
          hi: "झूलें नन्दलाल! नन्द घर आनन्द भयो!",
          en: "Sweet Janmashtami! Little Kanha is happily swinging!"
        });
      }
    } else if (festId === 'holi') {
      if (this.petalShower && typeof this.petalShower.celebrate === 'function') {
        this.petalShower.celebrate(this.container);
      }
      if (window.toddlerAudio) {
        window.toddlerAudio.playBabyGiggle();
        setTimeout(() => {
          if (window.toddlerAudio) window.toddlerAudio.playCelebration();
        }, 300);
        window.toddlerAudio.speak({
          hi: "रंग-बिरंगे फूल! वृन्दावन की फूलों की होली!",
          en: "Sweet Flower Petal Holi in Vrindavan! Joyful fragrance!"
        });
      }
    } else if (festId === 'diwali') {
      this.diwaliLitCount = (this.diwaliLitCount % 5) + 1;
      this.render();
      this.bindUtsavaEvents();

      if (window.toddlerAudio) {
        if (typeof window.toddlerAudio.playSingingBowl === 'function') {
          window.toddlerAudio.playSingingBowl(432 + this.diwaliLitCount * 40);
        } else {
          window.toddlerAudio.playAartiChimes();
        }
        if (this.diwaliLitCount === 5) {
          setTimeout(() => {
            if (this.petalShower && typeof this.petalShower.celebrate === 'function') {
              this.petalShower.celebrate(this.container);
            }
            if (window.toddlerAudio) {
              window.toddlerAudio.playCelebration();
              window.toddlerAudio.speak({
                hi: "शुभ दीपावली! सब दीप जगमगा उठे! चारों ओर दिव्य प्रकाश!",
                en: "Happy Deepavali! All sacred lamps are glowing with joy and light!"
              });
            }
          }, 300);
        } else {
          window.toddlerAudio.speak({
            hi: `दीपक जला! ${this.diwaliLitCount} दीप जगमगाए!`,
            en: `Diya illuminated! ${this.diwaliLitCount} lamps glowing!`
          });
        }
      }
    } else {
      // Sankranti
      const kite = this.container.querySelector('#sankranti-kite');
      if (kite) {
        kite.classList.remove('kite-soaring-high');
        void kite.offsetWidth;
        kite.classList.add('kite-soaring-high');
      }
      if (window.toddlerAudio) {
        if (typeof window.toddlerAudio.playKadambaBreeze === 'function') {
          window.toddlerAudio.playKadambaBreeze();
        } else {
          window.toddlerAudio.playBansuri(523.25);
        }
        setTimeout(() => {
          if (window.toddlerAudio) window.toddlerAudio.playGhungroo();
        }, 300);
        window.toddlerAudio.speak({
          hi: "पतंग उड़ी आकाश में! मकर संक्रांति की शुभकामनाएं!",
          en: "Kite flies high in the azure sky! Happy Makar Sankranti!"
        });
      }
    }
  }

  handleAnyKey(key) {
    this.mashStep++;
    if (this.mashStep % 3 === 0) {
      // Cycle festival every 3 mashes
      const nextIdx = (this.festivals.findIndex(f => f.id === this.currentFestivalId) + 1) % this.festivals.length;
      this.selectFestival(this.festivals[nextIdx].id);
    } else {
      this.triggerFestivalAction();
    }
  }
}

// ==========================================
// 14. VADYA & TAAL (SACRED INDIAN MUSICAL INSTRUMENTS)
// Classical & Folk Instruments: Veena, Mridangam, Bansuri, Manjira, Damru, Shankha
// ==========================================
class VadyaGame {
  constructor(container) {
    this.container = container;
    this.currentVadyaId = 'veena';
    this.mashCount = 0;

    // 6 Traditional Indian Musical Instruments
    this.instruments = [
      {
        id: 'veena',
        icon: '🪕',
        name: { hi: 'सरस्वती वीणा (Veena)', en: 'Saraswati Veena' },
        description: { hi: 'ज्ञान व संगीत की देवी मां सरस्वती का दिव्य वाद्य', en: 'Sacred classical stringed instrument with divine meend resonance' },
        bol: 'सा... रे... ग...',
        heroSvg: VedicAssets.saraswatiVeena || '🪕',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playVeenaPluck === 'function') {
              window.toddlerAudio.playVeenaPluck(220);
            } else {
              window.toddlerAudio.playBansuri(440);
            }
          }
        },
        accentColor: '#B45309',
        bgGradient: 'radial-gradient(circle, #FFFBEB 0%, #FEF3C7 100%)'
      },
      {
        id: 'mridangam',
        icon: '🥁',
        name: { hi: 'मृदंगम / ढोलक (Mridanga)', en: 'Mridangam Drum' },
        description: { hi: 'भारतीय शास्त्रीय संगीत व कीर्तन का मुख्य ताल वाद्य', en: 'Ancient percussion drum with resonant bass Dha and crisp treble Ta' },
        bol: 'धा... धिं... ता... ना...',
        heroSvg: VedicAssets.mridangam || '🥁',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playMridangaDha === 'function') {
              window.toddlerAudio.playMridangaDha();
              setTimeout(() => {
                if (window.toddlerAudio) window.toddlerAudio.playMridangaTa();
              }, 250);
            } else {
              window.toddlerAudio.playDamru();
            }
          }
        },
        accentColor: '#D97706',
        bgGradient: 'radial-gradient(circle, #FFF7ED 0%, #FFEDD5 100%)'
      },
      {
        id: 'bansuri',
        icon: '🪈',
        name: { hi: 'कान्हा की बांसुरी (Bansuri)', en: 'Krishna\'s Bansuri' },
        description: { hi: 'वृन्दावन में कान्हा द्वारा बजाई जाने वाली बांस की मधुर वंशी', en: 'Sweet sacred bamboo flute that enchants all Vrindavan cows and peacocks' },
        bol: 'राधा-कृष्ण तराना',
        heroSvg: VedicAssets.balaKrishna || '🪈',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playDivineFlutePhrase === 'function') {
              window.toddlerAudio.playDivineFlutePhrase();
            } else {
              window.toddlerAudio.playBansuri(523.25);
            }
          }
        },
        accentColor: '#16A34A',
        bgGradient: 'radial-gradient(circle, #F0FDF4 0%, #DCFCE7 100%)'
      },
      {
        id: 'manjira',
        icon: '🔔',
        name: { hi: 'मंजीरा / करताल (Manjira)', en: 'Bronze Manjira Cymbals' },
        description: { hi: 'भजन व संकीर्तन में बजने वाली मधुर कांसे की झांझ', en: 'Handheld bronze cymbals creating sparkling rhythmic high tones' },
        bol: 'छन... छन... छन...',
        heroSvg: VedicAssets.manjira || '🔔',
        sound: () => {
          if (window.toddlerAudio) {
            if (typeof window.toddlerAudio.playManjira === 'function') {
              window.toddlerAudio.playManjira();
            } else {
              window.toddlerAudio.playTempleBell(1046.5);
            }
          }
        },
        accentColor: '#EAB308',
        bgGradient: 'radial-gradient(circle, #FEFCE8 0%, #FEF08A 100%)'
      },
      {
        id: 'damru',
        icon: '🪘',
        name: { hi: 'शिव डमरू (Damru)', en: 'Mystic Damru Drum' },
        description: { hi: 'नाद ब्रह्म और 14 माहेश्वर सूत्रों का उद्गम वाद्य', en: 'Sacred two-headed rattle drum of divine cosmic rhythm' },
        bol: 'डिम-डिम... डम-डम...',
        heroSvg: VedicAssets.decoratedMatka || '🪘',
        sound: () => {
          if (window.toddlerAudio) window.toddlerAudio.playDamru();
        },
        accentColor: '#EA580C',
        bgGradient: 'radial-gradient(circle, #FFF7ED 0%, #FED7AA 100%)'
      },
      {
        id: 'shankha',
        icon: '🐚',
        name: { hi: 'दिव्य शंख (Shankha)', en: 'Sacred Conch Shell' },
        description: { hi: 'आरती व विजय के समय फूंका जाने वाला मंगलकारी शंख नाद', en: 'Auspicious ocean conch blown during aarti and morning temple puja' },
        bol: 'ॐ शंख नाद',
        heroSvg: VedicAssets.mangalKalash || '🐚',
        sound: () => {
          if (window.toddlerAudio) window.toddlerAudio.playShankha();
        },
        accentColor: '#0284C7',
        bgGradient: 'radial-gradient(circle, #F0F9FF 0%, #BAE6FD 100%)'
      }
    ];
  }

  start() {
    this.render();
    this.bindVadyaEvents();
    if (window.toddlerAudio) {
      window.toddlerAudio.playTempleBell(880);
      window.toddlerAudio.speak({
        hi: "भारतीय वाद्य संगीत! वीणा, मृदंग, बांसुरी और मंजीरा बजाएं!",
        en: "Indian Classical & Sacred Instruments! Tap to play the Veena, Mridangam, Bansuri and Manjira!"
      });
    }
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const activeInst = this.instruments.find(i => i.id === this.currentVadyaId) || this.instruments[0];
    const instName = activeInst.name[lang] || activeInst.name.en;
    const instDesc = activeInst.description[lang] || activeInst.description.en;

    this.container.innerHTML = `
      <div class="game-stage-wrapper game-vadya">
        <!-- Center Interactive Instrument Hero Card -->
        <section class="vadya-stage-center">
          <div class="vadya-hero-card"
               id="vadya-hero-card"
               style="background: ${activeInst.bgGradient}; --inst-color: ${activeInst.accentColor};"
               title="Tap to play instrument">
            <div class="vadya-sound-ripple-aura" id="vadya-ripple-aura"></div>
            <div class="vadya-hero-svg" id="vadya-hero-svg">
              ${activeInst.heroSvg}
            </div>
            <div class="vadya-title-badge">
              <span class="badge-inst-icon">${activeInst.icon}</span>
              <span class="badge-inst-name">${instName}</span>
            </div>
            <span class="vadya-bol-pill">${activeInst.bol}</span>
            <p class="vadya-description-text">${instDesc}</p>

            <button class="vadya-play-pulse-btn" id="vadya-play-trigger" style="--btn-color: ${activeInst.accentColor};">
              🎵 ${lang === 'hi' ? 'वाद्य बजाएं (Play)' : 'Play Note'}
            </button>
          </div>
        </section>

        <!-- Bottom 6 Instrument Selection Cards Grid -->
        <section class="vadya-instruments-selector-zone">
          <div class="vadya-instruments-grid">
            ${this.instruments.map(inst => {
              const isActive = (inst.id === this.currentVadyaId);
              const title = inst.name[lang] || inst.name.en;
              return `
                <button class="vadya-selector-btn ${isActive ? 'active-instrument' : ''}"
                        data-vadya="${inst.id}"
                        id="vadya-btn-${inst.id}"
                        style="--inst-color: ${inst.accentColor};">
                  <span class="inst-btn-icon">${inst.icon}</span>
                  <span class="inst-btn-title">${title.split(' ')[0]}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      </div>
    `;
  }

  bindVadyaEvents() {
    // 1. Instrument Selector Buttons
    const grid = this.container.querySelector('.vadya-instruments-grid');
    if (grid) {
      grid.addEventListener('pointerdown', (e) => {
        const btn = e.target.closest('.vadya-selector-btn');
        if (!btn) return;
        e.preventDefault();
        const vadyaId = btn.dataset.vadya;
        this.selectInstrument(vadyaId);
      });
    }

    // 2. Play Trigger Button
    const playBtn = this.container.querySelector('#vadya-play-trigger');
    if (playBtn) {
      playBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.playActiveInstrument();
      });
    }

    // 3. Direct Tap on Hero Card
    const heroCard = this.container.querySelector('#vadya-hero-card');
    if (heroCard) {
      heroCard.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.playActiveInstrument();
      });
    }
  }

  selectInstrument(vadyaId) {
    const inst = this.instruments.find(i => i.id === vadyaId);
    if (!inst) return;

    this.currentVadyaId = vadyaId;
    this.render();
    this.bindVadyaEvents();

    this.playActiveInstrument();

    if (window.toddlerAudio) {
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const title = inst.name[lang] || inst.name.en;
      window.toddlerAudio.speak(title);
    }
  }

  playActiveInstrument() {
    const inst = this.instruments.find(i => i.id === this.currentVadyaId);
    if (!inst) return;

    const heroSvg = this.container.querySelector('#vadya-hero-svg');
    const heroCard = this.container.querySelector('#vadya-hero-card');

    if (heroSvg) {
      heroSvg.classList.remove('vadya-playing-vibrate');
      void heroSvg.offsetWidth;
      heroSvg.classList.add('vadya-playing-vibrate');
    }

    if (heroCard) {
      heroCard.classList.remove('vadya-glow-pulse');
      void heroCard.offsetWidth;
      heroCard.classList.add('vadya-glow-pulse');
    }

    if (typeof inst.sound === 'function') {
      inst.sound();
    }
    if (window.ToddlerRewards) {
      window.ToddlerRewards.award('naad_brahma');
    }
  }

  handleAnyKey(key) {
    this.mashCount++;
    if (this.mashCount % 4 === 0) {
      // Cycle to next instrument
      const nextIdx = (this.instruments.findIndex(i => i.id === this.currentVadyaId) + 1) % this.instruments.length;
      this.selectInstrument(this.instruments[nextIdx].id);
    } else {
      this.playActiveInstrument();
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
  window.AksharaGame = AksharaGame;
  window.PrakritiGame = PrakritiGame;
  window.DhyanaGame = DhyanaGame;
  window.MatkiTowerGame = MatkiTowerGame;
  window.PanchaBhutaGame = PanchaBhutaGame;
  window.UtsavaGame = UtsavaGame;
  window.VadyaGame = VadyaGame;
  window.CelebrationPetalShower = CelebrationPetalShower;
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
    AksharaGame,
    PrakritiGame,
    DhyanaGame,
    MatkiTowerGame,
    PanchaBhutaGame,
    UtsavaGame,
    VadyaGame,
    CelebrationPetalShower,
    ToddlerPersistence,
    ElementPool
  };
}
