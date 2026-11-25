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
      // Clear spoken number pronunciation without drowning it in pop tones
      const hiNums = ['एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस'];
      const nIdx = parseInt(symbol, 10);
      const spokenNum = (window.toddlerAudio.currentLanguage === 'hi' && hiNums[nIdx - 1]) ? hiNums[nIdx - 1] : symbol;
      window.toddlerAudio.speak(spokenNum);
    } else if (this.category === 'letters') {
      // Clear spoken letter pronunciation without drowning it in pop tones
      window.toddlerAudio.speakLetter(symbol);
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
            <button class="sound-card-btn" id="snd-goat" title="Gentle Goat (Bakri)">
              <span class="snd-icon">🐐</span>
              <span class="snd-label">Bakri</span>
              <span class="snd-tag">Mê-ê-h!</span>
            </button>
            <button class="sound-card-btn" id="snd-horse" title="Royal Horse (Ashwa)">
              <span class="snd-icon">🐴</span>
              <span class="snd-label">Ashwa</span>
              <span class="snd-tag">Neigh!</span>
            </button>
            <button class="sound-card-btn" id="snd-swan" title="Sacred Swan (Hamsa)">
              <span class="snd-icon">🪿</span>
              <span class="snd-label">Hamsa</span>
              <span class="snd-tag">Honk!</span>
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
      setTimeout(() => window.toddlerAudio.speak({ hi: "हम्बा! प्यारी गऊ माता!", en: "Hambaaa! Gentle holy Gau Mata!" }), 650);
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
      setTimeout(() => window.toddlerAudio.speak({ hi: "प्यारा नन्हा बछड़ा! मां-मां!", en: "Sweet baby calf! Maaa-aaa!" }), 550);
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
      setTimeout(() => window.toddlerAudio.speak({ hi: 'गाय! मूऊऊ!', en: 'Cow! Mooo!' }), 600);
      setTimeout(() => sndCow.classList.remove('snd-hit'), 300);
    });

    const sndCalf = this.container.querySelector('#snd-calf');
    sndCalf.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndCalf.classList.add('snd-hit');
      window.toddlerAudio.playCalfMoo();
      setTimeout(() => window.toddlerAudio.speak({ hi: 'बछड़ा! मां-मां!', en: 'Baby Calf! Maaa!' }), 500);
      setTimeout(() => sndCalf.classList.remove('snd-hit'), 300);
    });

    const sndPeacock = this.container.querySelector('#snd-peacock');
    sndPeacock.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndPeacock.classList.add('snd-hit');
      window.toddlerAudio.playPeacockCall();
      setTimeout(() => window.toddlerAudio.speak({ hi: 'मोर! पीहू पीहू!', en: 'Peacock! Pee-hu!' }), 700);
      setTimeout(() => sndPeacock.classList.remove('snd-hit'), 300);
    });

    const sndElephant = this.container.querySelector('#snd-elephant');
    sndElephant.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndElephant.classList.add('snd-hit');
      window.toddlerAudio.playElephantTrumpet();
      setTimeout(() => window.toddlerAudio.speak({ hi: 'हाथी! तुर्र-तुर्र!', en: 'Elephant! Trumpet!' }), 700);
      setTimeout(() => sndElephant.classList.remove('snd-hit'), 300);
    });

    const sndKoel = this.container.querySelector('#snd-koel');
    sndKoel.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndKoel.classList.add('snd-hit');
      window.toddlerAudio.playKoelCall();
      setTimeout(() => window.toddlerAudio.speak({ hi: 'कोयल! कूहू कूहू!', en: 'Cuckoo! Koo-hoo!' }), 600);
      setTimeout(() => sndKoel.classList.remove('snd-hit'), 300);
    });

    const sndGhungroo = this.container.querySelector('#snd-ghungroo');
    sndGhungroo.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sndGhungroo.classList.add('snd-hit');
      window.toddlerAudio.playGhungroo();
      setTimeout(() => window.toddlerAudio.speak({ hi: 'घुँघरू! छम-छम!', en: 'Anklet bells! Chham-chham!' }), 400);
      setTimeout(() => sndGhungroo.classList.remove('snd-hit'), 300);
    });

    const sndParrot = this.container.querySelector('#snd-parrot');
    if (sndParrot) {
      sndParrot.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndParrot.classList.add('snd-hit');
        window.toddlerAudio.playShukaCall();
        setTimeout(() => window.toddlerAudio.speak({ hi: 'तोता! मिठू-मिठू!', en: 'Parrot! Mithu-mithu!' }), 500);
        setTimeout(() => sndParrot.classList.remove('snd-hit'), 300);
      });
    }

    const sndDeer = this.container.querySelector('#snd-deer');
    if (sndDeer) {
      sndDeer.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndDeer.classList.add('snd-hit');
        window.toddlerAudio.playDeerCall();
        setTimeout(() => window.toddlerAudio.speak({ hi: 'हिरण! मृग!', en: 'Deer!' }), 500);
        setTimeout(() => sndDeer.classList.remove('snd-hit'), 300);
      });
    }

    const sndMonkey = this.container.querySelector('#snd-monkey');
    if (sndMonkey) {
      sndMonkey.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndMonkey.classList.add('snd-hit');
        window.toddlerAudio.playMonkeySound();
        setTimeout(() => window.toddlerAudio.speak({ hi: 'बन्दर! खी-खी!', en: 'Monkey! Khee-khee!' }), 500);
        setTimeout(() => sndMonkey.classList.remove('snd-hit'), 300);
      });
    }

    const sndGoat = this.container.querySelector('#snd-goat');
    if (sndGoat) {
      sndGoat.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndGoat.classList.add('snd-hit');
        window.toddlerAudio.playGoatBleat();
        setTimeout(() => window.toddlerAudio.speak({ hi: 'बकरी! में-में!', en: 'Goat! Meh-eh-h!' }), 500);
        setTimeout(() => sndGoat.classList.remove('snd-hit'), 300);
      });
    }

    const sndHorse = this.container.querySelector('#snd-horse');
    if (sndHorse) {
      sndHorse.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndHorse.classList.add('snd-hit');
        window.toddlerAudio.playHorseNeigh();
        setTimeout(() => window.toddlerAudio.speak({ hi: 'घोड़ा! हिन-हिन!', en: 'Horse! Neigh!' }), 600);
        setTimeout(() => sndHorse.classList.remove('snd-hit'), 300);
      });
    }

    const sndSwan = this.container.querySelector('#snd-swan');
    if (sndSwan) {
      sndSwan.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sndSwan.classList.add('snd-hit');
        window.toddlerAudio.playSwanCall();
        setTimeout(() => window.toddlerAudio.speak({ hi: 'हंस! सुन्दर राजहंस!', en: 'Swan! Beautiful swan!' }), 500);
        setTimeout(() => sndSwan.classList.remove('snd-hit'), 300);
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
    const actions = ['cow', 'calf', 'peacock', 'elephant', 'feed', 'mala', 'koel', 'parrot', 'deer', 'monkey', 'goat', 'horse', 'swan'];
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
    } else if (pick === 'goat') {
      dispatchTap('#snd-goat');
    } else if (pick === 'horse') {
      dispatchTap('#snd-horse');
    } else if (pick === 'swan') {
      dispatchTap('#snd-swan');
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
          setTimeout(() => window.toddlerAudio.speak({ hi: "जय श्री कृष्णा! नन्हे कान्हा!", en: "Jai Shri Krishna! Little Kanha!" }), 500);
        },
        cow: () => {
          window.toddlerAudio.playCowMoo();
          setTimeout(() => window.toddlerAudio.speak({ hi: "हम्बा! गऊ माता!", en: "Hambaaa! Gentle holy Gau Mata!" }), 650);
        },
        peacock: () => {
          window.toddlerAudio.playPeacockCall();
          setTimeout(() => window.toddlerAudio.speak({ hi: "पीहू पीहू! सुन्दर मयूर!", en: "Pee-hu! Dancing Mayur!" }), 700);
        },
        lotus: () => {
          window.toddlerAudio.playAartiChimes();
          setTimeout(() => window.toddlerAudio.speak({ hi: "सुन्दर दिव्य कमल!", en: "Sacred Pink Lotus!" }), 400);
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
    this.mode = 'bansuri'; // 'bansuri', 'animals', or 'jaltarang'
    
    // Ancient Vedic 7 Swaras rooted in nature's animal voices (Sangita Ratnakara)
    this.swaras = [
      { note: 'Sa', freq: 261.63, animal: '🦚', animalKey: 'peacock', animalName: { hi: 'मयूर (मोर)', en: 'Peacock' }, col: '#DC2626' },
      { note: 'Re', freq: 293.66, animal: '🐮', animalKey: 'cow', animalName: { hi: 'गऊ (गाय)', en: 'Cow' }, col: '#EA580C' },
      { note: 'Ga', freq: 329.63, animal: '🐐', animalKey: 'goat', animalName: { hi: 'बकरी (अजा)', en: 'Goat' }, col: '#F59E0B' },
      { note: 'Ma', freq: 349.23, animal: '🪿', animalKey: 'swan', animalName: { hi: 'हंस (क्रौंच)', en: 'Swan' }, col: '#10B981' },
      { note: 'Pa', freq: 392.00, animal: '🐦', animalKey: 'koel', animalName: { hi: 'कोयल', en: 'Cuckoo' }, col: '#0284C7' },
      { note: 'Dha', freq: 440.00, animal: '🐴', animalKey: 'horse', animalName: { hi: 'अश्व (घोड़ा)', en: 'Horse' }, col: '#4F46E5' },
      { note: 'Ni', freq: 493.88, animal: '🐘', animalKey: 'elephant', animalName: { hi: 'गजराज (हाथी)', en: 'Elephant' }, col: '#7C3AED' },
      { note: 'Sȧ', freq: 523.25, animal: '✨', animalKey: 'birds', animalName: { hi: 'वन पक्षी', en: 'Forest Birds' }, col: '#DB2777' }
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
    const bansuriLabel = lang === 'hi' ? '🪈 बांसुरी' : '🪈 Bansuri';
    const animalsLabel = lang === 'hi' ? '🦚 पशु-स्वर' : '🦚 Animal Swaras';
    const jaltarangLabel = lang === 'hi' ? '🥣 जल तरंग' : '🥣 Jal Tarang';
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
            <button class="switch-inst-btn ${this.mode === 'animals' ? 'active' : ''}" id="switch-animals">
              ${animalsLabel}
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
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';

    if (this.mode === 'animals') {
      return `
        <div class="xylophone-board animal-swaras-board" id="xylo-board">
          ${this.swaras.map((k, idx) => `
            <div class="xylo-bar is-animal-bar" data-idx="${idx}" style="--bar-color: ${k.col}; height: ${100 - idx * 4.2}%">
              <div class="note-animal-badge">${k.animal}</div>
              <div class="xylo-bar-label">
                <span class="note-letter">${k.note}</span>
                <span class="animal-swara-name">${k.animalName[lang] || k.animalName.en}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (this.mode === 'bansuri') {
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
    const btnAnimals = this.container.querySelector('#switch-animals');
    const btnJal = this.container.querySelector('#switch-jaltarang');

    if (btnBansuri) {
      btnBansuri.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.mode = 'bansuri';
        this.render();
      });
    }

    if (btnAnimals) {
      btnAnimals.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.mode = 'animals';
        this.render();
        if (window.toddlerAudio) {
          window.toddlerAudio.speak({
            hi: "वैदिक पशु-स्वर! सा रे ग म प ध नि सा!",
            en: "Vedic Animal Swaras! Hear Krishna's sacred animals sing!"
          });
        }
      });
    }

    if (btnJal) {
      btnJal.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.mode = 'jaltarang';
        this.render();
      });
    }

    const toggle = this.container.querySelector('#magic-melody-toggle');
    if (toggle) {
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
    }

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
    if (this.magicBhajanMode && (this.mode === 'bansuri' || this.mode === 'animals')) {
      const activeNotes = this.bhajans[this.selectedBhajanIdx].notes;
      const nextIdx = activeNotes[this.bhajanIndex % activeNotes.length];
      const target = this.container.querySelector(`.xylo-bar[data-idx="${nextIdx}"]`);
      if (target) target.classList.add('guide-glow');
    }
  }

  // Any-Key Keyboard Smash Handler
  handleAnyKey() {
    if (this.mode === 'bansuri' || this.mode === 'animals') {
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
    if (this.mode === 'animals') {
      window.toddlerAudio.playAnimalSound(keyData.animalKey, keyData.freq);
      setTimeout(() => {
        if (window.toddlerAudio) window.toddlerAudio.playBansuri(keyData.freq);
      }, 90);
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const aName = keyData.animalName[lang] || keyData.animalName.en;
      window.toddlerAudio.speak(keyData.note + '! ' + aName);
    } else {
      window.toddlerAudio.playBansuri(keyData.freq);
    }

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
    if (window.toddlerAudio && typeof window.toddlerAudio.stopAarti === 'function') {
      window.toddlerAudio.stopAarti();
    }
    this.isChantingAarti = false;
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const headerTitle = lang === 'hi' ? 'संध्या आरती: कान्हा के लिए आरती की थाली घुमाएं! 🪔✨' : 'Sandhya Aarti: Move the Diya Thali in Circles for Kanha! 🪔✨';
    const incenseHint = lang === 'hi' ? '💨 अगरबत्ती' : '💨 Incense';
    const circleHint = lang === 'hi' ? '⭕ गोल-गोल घुमाएं / कोई बटन दबाएं' : '⭕ Trace Circles / Press Any Key';
    const singLabel = lang === 'hi' ? '🙏 पूरी आरती गाएं (आरती कुंजबिहारी की)' : '🙏 Sing Full Aarti (Aarti Kunj Bihari Ki)';
    const roseLabel = lang === 'hi' ? '🌹 गुलाब की पंखुड़ियां' : '🌹 Rose Petals';
    const marigoldLabel = lang === 'hi' ? '🌼 गेंदे के फूल' : '🌼 Marigolds';
    const tulsiLabel = lang === 'hi' ? '🌿 तुलसी दल' : '🌿 Tulsi Dal';
    const mograLabel = lang === 'hi' ? '🌸 मोगरा / कमल' : '🌸 Mogra / Kamal';

    this.container.innerHTML = `
      <div class="game-aarti vedic-theme">
        <div class="aarti-header">
          <h2>${headerTitle}</h2>
          <div class="aarti-chant-bar">
            <button class="aarti-sing-btn" id="btn-sing-aarti">${singLabel}</button>
            <div class="aarti-lyric-pill hidden" id="aarti-lyric-display">🪔 आरती कुंजबिहारी की</div>
          </div>
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

    const btnSingAarti = this.container.querySelector('#btn-sing-aarti');
    const lyricDisplay = this.container.querySelector('#aarti-lyric-display');
    if (btnSingAarti) {
      btnSingAarti.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
        if (this.isChantingAarti) {
          this.isChantingAarti = false;
          btnSingAarti.classList.remove('is-singing');
          btnSingAarti.textContent = lang === 'hi' ? '🙏 पूरी आरती गाएं (आरती कुंजबिहारी की)' : '🙏 Sing Full Aarti (Aarti Kunj Bihari Ki)';
          if (lyricDisplay) lyricDisplay.classList.add('hidden');
          if (window.toddlerAudio && typeof window.toddlerAudio.stopAarti === 'function') {
            window.toddlerAudio.stopAarti();
          }
        } else {
          this.isChantingAarti = true;
          btnSingAarti.classList.add('is-singing');
          btnSingAarti.textContent = lang === 'hi' ? '⏹️ आरती रोकें (Stop Aarti)' : '⏹️ Stop Aarti';
          if (lyricDisplay) {
            lyricDisplay.classList.remove('hidden');
            lyricDisplay.textContent = '🪔 आरती कुंजबिहारी की...';
          }
          if (window.ToddlerRewards) {
            window.ToddlerRewards.award('aarti_bhakt');
          }
          if (window.toddlerAudio && typeof window.toddlerAudio.chantAarti === 'function') {
            const plate = this.container.querySelector('#aarti-plate');
            window.toddlerAudio.chantAarti(
              (line) => {
                if (lyricDisplay) lyricDisplay.textContent = '🪔 ' + line;
                this.showerAltarPetals(Math.random() > 0.5 ? '🌸' : '✨');
              },
              () => {
                this.isChantingAarti = false;
                btnSingAarti.classList.remove('is-singing');
                btnSingAarti.textContent = lang === 'hi' ? '🙏 पूरी आरती गाएं (आरती कुंजबिहारी की)' : '🙏 Sing Full Aarti (Aarti Kunj Bihari Ki)';
                if (lyricDisplay) lyricDisplay.classList.add('hidden');
                if (plate) plate.classList.remove('aarti-beat-pulse');
              },
              (barBeat) => {
                if (barBeat === 0 || barBeat === 2) {
                  if (plate) {
                    plate.classList.add('aarti-beat-pulse');
                    setTimeout(() => plate.classList.remove('aarti-beat-pulse'), 200);
                  }
                  if (lyricDisplay) {
                    lyricDisplay.classList.add('lyric-beat-pulse');
                    setTimeout(() => lyricDisplay.classList.remove('lyric-beat-pulse'), 200);
                  }
                }
              }
            );
          }
        }
      });
    }

    plateWrap.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.isRotating = true;
      window.toddlerAudio.playAartiChimes();
      if (!this.isChantingAarti) {
        setTimeout(() => window.toddlerAudio.speak({ hi: "आरती कुंजबिहारी की! जय श्री कृष्णा!", en: "Aarti for Little Krishna!" }), 450);
      }
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
        if (!this.isChantingAarti) {
          setTimeout(() => window.toddlerAudio.speak({
            hi: "पावन शंख नाद! जय श्री कृष्णा!",
            en: "Divine Shankha Naad! Jai Shri Krishna!"
          }), 750);
        }
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
      if (!this.isChantingAarti) {
        setTimeout(() => window.toddlerAudio.speak({
          hi: "गुलाब की पंखुड़ियां! पावन समर्पण!",
          en: "Fragrant rose petals for Little Krishna!"
        }), 350);
      }
      this.showerAltarPetals('🌹');
    });

    btnGenda.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      window.toddlerAudio.playTempleBell(880);
      if (!this.isChantingAarti) {
        setTimeout(() => window.toddlerAudio.speak({
          hi: "गेंदे के दिव्य फूल! कान्हा प्रसन्न!",
          en: "Golden marigolds offered to Kanha!"
        }), 350);
      }
      this.showerAltarPetals('🌼');
    });

    if (btnTulsi) {
      btnTulsi.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playTempleBell(1046.5);
        if (!this.isChantingAarti) {
          setTimeout(() => window.toddlerAudio.speak({
            hi: "पावन तुलसी दल! श्री कृष्णा को अति प्रिय!",
            en: "Sacred Tulsi leaves! Most beloved to Krishna!"
          }), 350);
        }
        this.showerAltarPetals('🌿');
      });
    }

    if (btnMogra) {
      btnMogra.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playAartiChimes();
        if (!this.isChantingAarti) {
          setTimeout(() => window.toddlerAudio.speak({
            hi: "सुगन्धित मोगरा पुष्प! जय श्री कृष्णा!",
            en: "Sweet jasmine blossoms for Kanha!"
          }), 350);
        }
        this.showerAltarPetals('🌸');
      });
    }

    if (agarbatti) {
      agarbatti.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        window.toddlerAudio.playAartiChimes();
        if (!this.isChantingAarti) {
          setTimeout(() => window.toddlerAudio.speak({
            hi: "सुगन्धित दिव्य धूप और अगरबत्ती!",
            en: "Sweet fragrant incense for Kanha!"
          }), 350);
        }
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

    window.toddlerAudio.speak({
      hi: "सुन्दर समर्पण! शुभम्!",
      en: "Beautiful sacred offering! Haribol!"
    }, () => {
      if (window.toddlerAudio) window.toddlerAudio.playTempleBell();
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
      { char: 'A', phonics: 'A, Ah', name: { en: 'A for Aarti', hi: 'A से आरती' }, icon: '🪔', word: 'Aarti', color: '#F59E0B', sound: null },
      { char: 'B', phonics: 'B, Buh', name: { en: 'B for Bansuri', hi: 'B से बांसुरी' }, icon: '🪈', word: 'Bansuri', color: '#0284C7', sound: 'bansuri' },
      { char: 'C', phonics: 'C, Kuh', name: { en: 'C for Chakra', hi: 'C से चक्र' }, icon: '☸️', word: 'Chakra', color: '#EA580C', sound: null },
      { char: 'D', phonics: 'D, Duh', name: { en: 'D for Diya', hi: 'D से दीपक' }, icon: '🪔', word: 'Diya', color: '#FBBF24', sound: null },
      { char: 'E', phonics: 'E, Eh', name: { en: 'E for Elephant', hi: 'E से गजराज' }, icon: '🐘', word: 'Elephant', color: '#64748B', sound: 'elephant' },
      { char: 'F', phonics: 'F, Fuh', name: { en: 'F for Flute', hi: 'F से बांसुरी' }, icon: '🪈', word: 'Flute', color: '#0D9488', sound: 'flute' },
      { char: 'G', phonics: 'G, Guh', name: { en: 'G for Gau-Mata', hi: 'G से गऊ माता' }, icon: '🐮', word: 'Gau-Mata', color: '#10B981', sound: 'cow' },
      { char: 'H', phonics: 'H, Huh', name: { en: 'H for Hanuman', hi: 'H से हनुमान' }, icon: '🐒', word: 'Hanuman', color: '#DC2626', sound: 'monkey' },
      { char: 'I', phonics: 'I, Ih', name: { en: 'I for Incense', hi: 'I से अगरबत्ती' }, icon: '💨', word: 'Incense', color: '#8B5CF6', sound: null },
      { char: 'J', phonics: 'J, Juh', name: { en: 'J for Jal Tarang', hi: 'J से जल तरंग' }, icon: '🥣', word: 'Jal Tarang', color: '#38BDF8', sound: 'jaltarang' },
      { char: 'K', phonics: 'K, Kuh', name: { en: 'K for Krishna', hi: 'K से कान्हा' }, icon: '🦚', word: 'Krishna', color: '#0284C7', sound: null },
      { char: 'L', phonics: 'L, Luh', name: { en: 'L for Lotus', hi: 'L से कमल' }, icon: '🪷', word: 'Lotus', color: '#EC4899', sound: null },
      { char: 'M', phonics: 'M, Muh', name: { en: 'M for Makhan', hi: 'M से माखन' }, icon: '🍯', word: 'Makhan', color: '#F59E0B', sound: null },
      { char: 'N', phonics: 'N, Nuh', name: { en: 'N for Namaste', hi: 'N से नमस्ते' }, icon: '🙏', word: 'Namaste', color: '#FBBF24', sound: null },
      { char: 'O', phonics: 'O, Oh', name: { en: 'O for Om', hi: 'O से ॐ' }, icon: '🕉️', word: 'Om', color: '#DC2626', sound: 'om' },
      { char: 'P', phonics: 'P, Puh', name: { en: 'P for Peacock', hi: 'P से मोर पंख' }, icon: '🦚', word: 'Peacock', color: '#059669', sound: 'peacock' },
      { char: 'Q', phonics: 'Q, Kwuh', name: { en: 'Q for Queen Yashoda', hi: 'Q से रानी यशोदा' }, icon: '👑', word: 'Queen', color: '#A855F7', sound: null },
      { char: 'R', phonics: 'R, Ruh', name: { en: 'R for Radha', hi: 'R से राधा' }, icon: '🌸', word: 'Radha', color: '#F43F5E', sound: null },
      { char: 'S', phonics: 'S, Suh', name: { en: 'S for Shankha', hi: 'S से शंख' }, icon: '🐚', word: 'Shankha', color: '#0EA5E9', sound: 'shankha' },
      { char: 'T', phonics: 'T, Tuh', name: { en: 'T for Tulsi', hi: 'T से तुलसी' }, icon: '🌿', word: 'Tulsi', color: '#10B981', sound: null },
      { char: 'U', phonics: 'U, Uh', name: { en: 'U for Ujjain Gurukul', hi: 'U से उज्जैन' }, icon: '🏛️', word: 'Ujjain', color: '#D97706', sound: null },
      { char: 'V', phonics: 'V, Vuh', name: { en: 'V for Vrindavan', hi: 'V से वृन्दावन' }, icon: '🌳', word: 'Vrindavan', color: '#16A34A', sound: 'birds' },
      { char: 'W', phonics: 'W, Wuh', name: { en: 'W for Water (Yamuna)', hi: 'W से यमुना जल' }, icon: '💧', word: 'Water', color: '#0284C7', sound: 'yamuna' },
      { char: 'X', phonics: 'X, Eks', name: { en: 'X for Xylophone', hi: 'X से वाद्य यंत्र' }, icon: '🎶', word: 'Xylophone', color: '#6366F1', sound: 'jaltarang' },
      { char: 'Y', phonics: 'Y, Yuh', name: { en: 'Y for Yamuna', hi: 'Y से यमुना जी' }, icon: '🌊', word: 'Yamuna', color: '#0284C7', sound: 'yamuna' },
      { char: 'Z', phonics: 'Z, Zuh', name: { en: 'Z for Zinnia Flower', hi: 'Z से पुष्प' }, icon: '🌺', word: 'Zinnia', color: '#DB2777', sound: null }
    ];

    this.lettersHi = [
      { char: 'अ', phonics: 'अ', key: 'A', name: { en: 'A for Achyuta', hi: 'अ से अच्युत' }, icon: '🦚', word: 'अच्युत', color: '#0284C7', sound: null },
      { char: 'आ', phonics: 'आ', key: 'A', name: { en: 'Aa for Aarti', hi: 'आ से आरती' }, icon: '🪔', word: 'आरती', color: '#F59E0B', sound: null },
      { char: 'इ', phonics: 'इ', key: 'I', name: { en: 'I for Indradhanush', hi: 'इ से इन्द्रधनुष' }, icon: '🌈', word: 'इन्द्रधनुष', color: '#38BDF8', sound: null },
      { char: 'ई', phonics: 'ई', key: 'E', name: { en: 'Ee for Ishwara', hi: 'ई से ईश्वर' }, icon: '🕉️', word: 'ईश्वर', color: '#DC2626', sound: 'om' },
      { char: 'उ', phonics: 'उ', key: 'U', name: { en: 'U for Utsav', hi: 'उ से उत्सव' }, icon: '✨', word: 'उत्सव', color: '#FBBF24', sound: null },
      { char: 'ऊ', phonics: 'ऊ', key: 'U', name: { en: 'Oo for Oorja', hi: 'ऊ से दिव्य ऊर्जा' }, icon: '☀️', word: 'ऊर्जा', color: '#EA580C', sound: null },
      { char: 'ऋ', phonics: 'ऋ', key: 'R', name: { en: 'Ri for Rishi Sandipani', hi: 'ऋ से ऋषि सान्दीपनि' }, icon: '📜', word: 'ऋषि', color: '#7C3AED', sound: null },
      { char: 'ए', phonics: 'ए', key: 'E', name: { en: 'E for Ekam (One Lord)', hi: 'ए से एकम् परमात्मा' }, icon: '🪔', word: 'एकम्', color: '#0284C7', sound: null },
      { char: 'ऐ', phonics: 'ऐ', key: 'A', name: { en: 'Ai for Airavata Elephant', hi: 'ऐ से ऐरावत गजराज' }, icon: '🐘', word: 'ऐरावत', color: '#64748B', sound: 'elephant' },
      { char: 'ओ', phonics: 'ओ', key: 'O', name: { en: 'O for Omkar', hi: 'ओ से ॐ ओंकार' }, icon: '🕉️', word: 'ओंकार', color: '#DC2626', sound: 'om' },
      { char: 'औ', phonics: 'औ', key: 'O', name: { en: 'Au for Aushadhi (Tulsi Herbs)', hi: 'औ से दिव्य औषधि' }, icon: '🌿', word: 'औषधि', color: '#10B981', sound: null },
      { char: 'क', phonics: 'क', key: 'K', name: { en: 'Ka for Kanha', hi: 'क से कान्हा' }, icon: '👶', word: 'कान्हा', color: '#0284C7', sound: null },
      { char: 'ख', phonics: 'ख', key: 'K', name: { en: 'Kha for Khaga (Birds)', hi: 'ख से खग पक्षी' }, icon: '🐦', word: 'खग', color: '#16A34A', sound: 'birds' },
      { char: 'ग', phonics: 'ग', key: 'G', name: { en: 'Ga for Gau-Mata', hi: 'ग से गऊ माता' }, icon: '🐮', word: 'गऊ माता', color: '#10B981', sound: 'cow' },
      { char: 'घ', phonics: 'घ', key: 'G', name: { en: 'Gha for Ghungroo', hi: 'घ से घुँघरू' }, icon: '👣', word: 'घुँघरू', color: '#F59E0B', sound: 'ghungroo' },
      { char: 'च', phonics: 'च', key: 'C', name: { en: 'Cha for Chakra', hi: 'च से सुदर्शन चक्र' }, icon: '☸️', word: 'चक्र', color: '#EA580C', sound: null },
      { char: 'छ', phonics: 'छ', key: 'C', name: { en: 'Chha for Chhari', hi: 'छ से ग्वाल छड़ी' }, icon: '🎋', word: 'छड़ी', color: '#D97706', sound: null },
      { char: 'ज', phonics: 'ज', key: 'J', name: { en: 'Ja for Jal Tarang', hi: 'ज से जल तरंग' }, icon: '🥣', word: 'जल तरंग', color: '#38BDF8', sound: 'jaltarang' },
      { char: 'झ', phonics: 'झ', key: 'J', name: { en: 'Jha for Jhula', hi: 'झ से झूला' }, icon: '🌸', word: 'झूला', color: '#EC4899', sound: null },
      { char: 'ड', phonics: 'ड', key: 'D', name: { en: 'Da for Damru', hi: 'ड से डमरू' }, icon: '🪘', word: 'डमरू', color: '#DC2626', sound: 'damru' },
      { char: 'त', phonics: 'त', key: 'T', name: { en: 'Ta for Tulsi', hi: 'त से तुलसी दल' }, icon: '🌿', word: 'तुलसी', color: '#10B981', sound: null },
      { char: 'द', phonics: 'द', key: 'D', name: { en: 'Da for Deepak', hi: 'द से दीपक' }, icon: '🪔', word: 'दीपक', color: '#F59E0B', sound: null },
      { char: 'ध', phonics: 'ध', key: 'D', name: { en: 'Dha for Dhenu', hi: 'ध से धेनु गऊ' }, icon: '🐄', word: 'धेनु', color: '#10B981', sound: 'calf' },
      { char: 'न', phonics: 'न', key: 'N', name: { en: 'Na for Navaneeta', hi: 'न से नवनीत माखन' }, icon: '🍯', word: 'नवनीत', color: '#FBBF24', sound: null },
      { char: 'प', phonics: 'प', key: 'P', name: { en: 'Pa for Pankh', hi: 'प से मोर पंख' }, icon: '🦚', word: 'मोर पंख', color: '#059669', sound: 'peacock' },
      { char: 'ब', phonics: 'ब', key: 'B', name: { en: 'Ba for Bansuri', hi: 'ब से बांसुरी' }, icon: '🪈', word: 'बांसुरी', color: '#0284C7', sound: 'bansuri' },
      { char: 'म', phonics: 'म', key: 'M', name: { en: 'Ma for Makhan', hi: 'म से माखन मटकी' }, icon: '🍯', word: 'माखन', color: '#D97706', sound: null },
      { char: 'य', phonics: 'य', key: 'Y', name: { en: 'Ya for Yamuna', hi: 'य से यमुना जी' }, icon: '🌊', word: 'यमुना', color: '#0284C7', sound: 'yamuna' },
      { char: 'र', phonics: 'र', key: 'R', name: { en: 'Ra for Radha', hi: 'र से राधा रानी' }, icon: '🌸', word: 'राधा', color: '#EC4899', sound: null },
      { char: 'ल', phonics: 'ल', key: 'L', name: { en: 'La for Laddu', hi: 'ल से मोदक लड्डू' }, icon: '🟡', word: 'लड्डू', color: '#F59E0B', sound: null },
      { char: 'व', phonics: 'व', key: 'V', name: { en: 'Va for Vrindavan', hi: 'व से वृन्दावन धाम' }, icon: '🌳', word: 'वृन्दावन', color: '#16A34A', sound: 'birds' },
      { char: 'श', phonics: 'श', key: 'S', name: { en: 'Sha for Shankha', hi: 'श से शंख' }, icon: '🐚', word: 'शंख', color: '#0EA5E9', sound: 'shankha' },
      { char: 'ह', phonics: 'ह', key: 'H', name: { en: 'Ha for Hanuman', hi: 'ह से हनुमान जी' }, icon: '🐒', word: 'हनुमान', color: '#DC2626', sound: 'monkey' }
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
    if (this.mode === 'quiz') {
      var lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      return lang === 'hi' ? this.lettersHi : this.lettersEn;
    }
    return this.mode === 'hi' ? this.lettersHi : this.lettersEn;
  }

  prepareQuizRound() {
    var pool = this.getActiveList().slice();
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i];
      pool[i] = pool[j];
      pool[j] = tmp;
    }
    this.quizOptions = pool.slice(0, 4);
    this.quizTarget = this.quizOptions[Math.floor(Math.random() * this.quizOptions.length)];
    this.quizSolved = false;
  }

  speakQuizPrompt() {
    if (!this.quizTarget || !window.toddlerAudio) return;
    var lang = window.toddlerAudio.currentLanguage || 'hi';
    var t = this.quizTarget;
    var prompt = lang === 'hi'
      ? ('कहाँ है ' + t.char + ' से ' + t.word + '?')
      : ('Where is ' + t.char + ' for ' + t.word + '?');
    window.toddlerAudio.speak(prompt);
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
    const isQuizMode = this.mode === 'quiz';
    if (isQuizMode && (!this.quizOptions || this.quizOptions.length < 4)) {
      this.prepareQuizRound();
    }

    this.container.innerHTML = `
      <div class="game-akshara vedic-theme">
        <div class="akshara-header">
          <h2>${headerTitle}</h2>
        </div>

        <!-- Mode Pills Selector: A-Z / Hindi / 1-10 Numbers / Find It Quiz -->
        <div class="akshara-mode-bar">
          <div class="akshara-mode-pills">
            <button class="mode-pill-btn ${this.mode === 'en' ? 'active' : ''}" data-mode="en">🔤 A-Z (English)</button>
            <button class="mode-pill-btn ${this.mode === 'hi' ? 'active' : ''}" data-mode="hi">🕉️ वर्णमाला (हिन्दी)</button>
            <button class="mode-pill-btn ${this.mode === 'num' ? 'active' : ''}" data-mode="num">🔢 १-१० संख्या (Numbers)</button>
            <button class="mode-pill-btn ${this.mode === 'quiz' ? 'active' : ''}" data-mode="quiz">🎯 ${lang === 'hi' ? 'खोजो (Find It!)' : 'Find It! (Quiz)'}</button>
          </div>
        </div>

        ${isQuizMode ? `
          <div class="akshara-quiz-stage">
            <div class="akshara-quiz-prompt-card" id="quiz-repeat-btn">
              <div class="quiz-prompt-text">
                🔊 ${lang === 'hi' ? `कहाँ है <strong>${this.quizTarget.char}</strong> (${this.quizTarget.word})?` : `Where is <strong>${this.quizTarget.char}</strong> for ${this.quizTarget.word}?`}
              </div>
              <div class="quiz-prompt-sub">${lang === 'hi' ? 'फिर से सुनने के लिए छूएं' : 'Tap to hear again'}</div>
            </div>
            <div class="akshara-quiz-grid">
              ${this.quizOptions.map((opt, qIdx) => `
                <button class="akshara-quiz-card" data-qidx="${qIdx}" style="--letter-color: ${opt.color};">
                  <span class="quiz-card-char">${opt.char}</span>
                  <span class="quiz-card-icon">${opt.icon}</span>
                  <span class="quiz-card-word">${opt.word}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : `
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

            <div class="giant-letter-prompt">🔊 ${lang === 'hi' ? 'उच्चारण सुनने के लिए कार्ड छूएं!' : 'Tap card to hear pronunciation!'}</div>
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
        `}
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
          if (newMode === 'quiz') {
            this.prepareQuizRound();
            this.render();
            setTimeout(() => this.speakQuizPrompt(), 200);
          } else {
            this.render();
            this.triggerLetterByIndex(0, true);
          }
        }
      });
    });

    // Quiz Mode Interactions ("Find It!")
    const quizRepeatBtn = this.container.querySelector('#quiz-repeat-btn');
    if (quizRepeatBtn) {
      quizRepeatBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.speakQuizPrompt();
      });
    }

    const quizCards = this.container.querySelectorAll('.akshara-quiz-card');
    quizCards.forEach(qCard => {
      qCard.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.quizSolved) return;
        const qIdx = parseInt(qCard.dataset.qidx, 10);
        const picked = this.quizOptions ? this.quizOptions[qIdx] : null;
        if (!picked || !this.quizTarget) return;

        const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
        if (picked.char === this.quizTarget.char) {
          this.quizSolved = true;
          qCard.classList.add('quiz-correct');
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('celebration');
            const praise = lang === 'hi'
              ? ('शाबाश! बिल्कुल सही! ' + picked.char + ' से ' + picked.word)
              : ('Wonderful! ' + picked.char + ' for ' + picked.word);
            window.toddlerAudio.speak(praise, () => {
              if (picked.sound) this.playLetterChantOrSound(picked.sound);
            });
          }
          if (window.ToddlerRewards) {
            window.ToddlerRewards.award('akshara_vidya');
          }
          CelebrationPetalShower.shower();
          setTimeout(() => {
            if (this.mode === 'quiz') {
              this.prepareQuizRound();
              this.render();
              setTimeout(() => this.speakQuizPrompt(), 250);
            }
          }, 2600);
        } else {
          qCard.classList.add('quiz-nudge');
          setTimeout(() => qCard.classList.remove('quiz-nudge'), 600);
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('light');
            const coach = lang === 'hi'
              ? ('यह तो ' + picked.word + ' है! चलो ' + this.quizTarget.word + ' ढूंढें!')
              : ('That is ' + picked.word + '! Let us find ' + this.quizTarget.word + '!');
            window.toddlerAudio.speak(coach);
          }
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
        const hiNums = ['एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस'];
        if (window.toddlerAudio) {
          window.toddlerAudio.triggerHaptic('light');
          const spokenNum = (window.toddlerAudio.currentLanguage === 'hi' && hiNums[countVal - 1]) ? hiNums[countVal - 1] : String(countVal);
          window.toddlerAudio.speak(spokenNum);
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
      case 'goat':
      case 'bakri':
        window.toddlerAudio.playGoatBleat();
        break;
      case 'horse':
      case 'ghoda':
        window.toddlerAudio.playHorseNeigh();
        break;
      case 'parrot':
      case 'tota':
      case 'shuka':
        window.toddlerAudio.playShukaCall();
        break;
      case 'swan':
      case 'hamsa':
        window.toddlerAudio.playSwanCall();
        break;
      case 'koel':
        window.toddlerAudio.playKoelCall();
        break;
      case 'deer':
      case 'mriga':
        window.toddlerAudio.playDeerCall();
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
            const hiNums = ['एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस'];
            if (window.toddlerAudio) {
              window.toddlerAudio.triggerHaptic('light');
              const spokenNum = (window.toddlerAudio.currentLanguage === 'hi' && hiNums[countVal - 1]) ? hiNums[countVal - 1] : String(countVal);
              window.toddlerAudio.speak(spokenNum);
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

    // Audio, Speech & Haptic (Clear phonics voice-over first, then contextual real-world sound only if relevant)
    if (shouldVocalize !== false && window.toddlerAudio) {
      window.toddlerAudio.triggerHaptic('light');
      if (card) card.classList.add('is-speaking');

      const finishSpeaking = () => {
        if (card) card.classList.remove('is-speaking');
      };

      if (isNumMode) {
        window.toddlerAudio.speakNumber(item.char, item, finishSpeaking);
        if (item.count === 10) {
          window.toddlerAudio.triggerHaptic('celebration');
          CelebrationPetalShower.shower();
        }
      } else {
        window.toddlerAudio.speakLetter(item.char, item.name, () => {
          finishSpeaking();
          if (item.sound) {
            this.playLetterChantOrSound(item.sound);
          }
        }, item.phonics);
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

// ==========================================================================
// 15. MONTESSORI PATTERN MALA (Sensorial Logic & IB: How the World Works)
// ==========================================================================
class PatternMalaGame {
  constructor(container) {
    this.container = container;
    this.levelIdx = 0;
    this.solved = false;
    this.levels = [
      {
        seq: ['🪷', '🌼', '🪷', '🌼', '🪷'],
        answer: '🌼',
        choices: ['🌼', '🪷', '🌿'],
        name: { hi: 'कमल और गेंदा माला', en: 'Lotus & Marigold Pattern' }
      },
      {
        seq: ['🦚', '🐚', '🦚', '🐚', '🦚'],
        answer: '🐚',
        choices: ['🪷', '🐚', '🦚'],
        name: { hi: 'मयूर और शंख क्रम', en: 'Peacock & Conch Pattern' }
      },
      {
        seq: ['🍯', '🍯', '🐮', '🍯', '🍯'],
        answer: '🐮',
        choices: ['🐮', '🍯', '🌼'],
        name: { hi: 'माखन और गऊ क्रम', en: 'Butter & Cow AAB Pattern' }
      },
      {
        seq: ['🌿', '🌸', '🪔', '🌿', '🌸'],
        answer: '🪔',
        choices: ['🌿', '🪔', '🌸'],
        name: { hi: 'तुलसी, पुष्प और दीपक क्रम', en: 'Tulsi, Flower & Diya ABC Pattern' }
      }
    ];
  }

  start() {
    this.levelIdx = 0;
    this.solved = false;
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const lvl = this.levels[this.levelIdx % this.levels.length];
    const headerTitle = lang === 'hi'
      ? '✨ माला क्रम (Montessori Pattern): अगला मोती चुनकर माला पूरी करें!'
      : '✨ Pattern Mala (Montessori Logic): Pick the Next Bead to Complete the Garland!';

    this.container.innerHTML = `
      <div class="game-pattern vedic-theme">
        <div class="pattern-header">
          <h2>${headerTitle}</h2>
          <div class="pattern-sub-badge">${lvl.name[lang] || lvl.name.en}</div>
        </div>
        <div class="pattern-mala-strand">
          ${lvl.seq.map(item => `<div class="pattern-bead">${item}</div>`).join('')}
          <div class="pattern-bead pattern-slot ${this.solved ? 'is-solved' : ''}" id="pattern-missing-slot">${this.solved ? lvl.answer : '❓'}</div>
        </div>
        <div class="pattern-choices-row">
          ${lvl.choices.map((ch, idx) => `
            <button class="pattern-choice-btn" data-choice="${ch}" data-idx="${idx}">${ch}</button>
          `).join('')}
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const lvl = this.levels[this.levelIdx % this.levels.length];
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const btns = this.container.querySelectorAll('.pattern-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.solved) return;
        const picked = btn.dataset.choice;
        if (picked === lvl.answer) {
          this.solved = true;
          const slot = this.container.querySelector('#pattern-missing-slot');
          if (slot) {
            slot.textContent = picked;
            slot.classList.add('is-solved');
          }
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('celebration');
            window.toddlerAudio.playTempleBell(1046.5);
            window.toddlerAudio.speak({
              hi: 'शाबाश! बिल्कुल सही! माला पूरी हुई!',
              en: 'Wonderful! You completed the pattern!'
            });
          }
          CelebrationPetalShower.shower();
          setTimeout(() => {
            this.levelIdx = (this.levelIdx + 1) % this.levels.length;
            this.solved = false;
            this.render();
          }, 2200);
        } else {
          btn.classList.add('pattern-nudge');
          setTimeout(() => btn.classList.remove('pattern-nudge'), 500);
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('light');
            window.toddlerAudio.speak({
              hi: 'ध्यान से देखें! अगला कौन सा आएगा?',
              en: 'Look closely! Which one comes next?'
            });
          }
        }
      });
    });
  }

  handleAnyKey() {
    const lvl = this.levels[this.levelIdx % this.levels.length];
    const correctBtn = this.container.querySelector(`.pattern-choice-btn[data-choice="${lvl.answer}"]`);
    if (correctBtn) {
      correctBtn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
    }
  }
}

// ==========================================================================
// 16. DINACHARYA PRACTICAL LIFE (Montessori Independence & IB: Who We Are)
// ==========================================================================
class DinacharyaGame {
  constructor(container) {
    this.container = container;
    this.currentStep = 0;
    this.steps = [
      { id: 'wake', icon: '🌅', title: { hi: '१. प्रातः नमस्ते', en: '1. Morning Namaste' }, desc: { hi: 'सूरज दादा को प्रणाम! शुभ प्रभात!', en: 'Greet the morning sun! Good morning!' }, sound: 'bell' },
      { id: 'bath', icon: '🛁', title: { hi: '२. स्नान व स्वच्छता', en: '2. Fresh Bath' }, desc: { hi: 'ताजे जल से स्नान करके स्वच्छ बनें!', en: 'Wash up fresh and clean!' }, sound: 'water' },
      { id: 'meal', icon: '🥣', title: { hi: '३. सात्विक प्रसाद', en: '3. Healthy Meal' }, desc: { hi: 'धन्यवाद कहकर पौष्टिक भोजन करें!', en: 'Say thank you and eat healthy food!' }, sound: 'makhan' },
      { id: 'tidy', icon: '🧸', title: { hi: '४. खिलौने समेटना', en: '4. Tidy Up Toys' }, desc: { hi: 'खेलने के बाद खिलौने सही जगह रखें!', en: 'Put toys back neatly after play!' }, sound: 'giggle' },
      { id: 'sleep', icon: '🌙', title: { hi: '५. शुभ रात्रि', en: '5. Peaceful Sleep' }, desc: { hi: 'शान्त मन से मीठी नींद सो जाएं!', en: 'Rest peacefully under the stars!' }, sound: 'lullaby' }
    ];
  }

  start() {
    this.currentStep = 0;
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const headerTitle = lang === 'hi'
      ? '🌞 कान्हा की दिनचर्या (Practical Life): क्रम से दिन की अच्छी आदतें चुनें!'
      : '🌞 Daily Routine (Montessori Practical Life): Follow Healthy Habits in Order!';
    const allDone = this.currentStep >= this.steps.length;

    this.container.innerHTML = `
      <div class="game-dinacharya vedic-theme">
        <div class="dinacharya-header">
          <h2>${headerTitle}</h2>
        </div>
        <div class="dinacharya-timeline">
          ${this.steps.map((st, idx) => {
            const isDone = idx < this.currentStep;
            const isNext = idx === this.currentStep;
            return `
              <button class="dinacharya-card ${isDone ? 'is-done' : ''} ${isNext ? 'is-next' : ''}" data-idx="${idx}">
                <div class="dinacharya-icon">${st.icon}</div>
                <div class="dinacharya-title">${st.title[lang] || st.title.en}</div>
                <div class="dinacharya-status">${isDone ? '⭐' : (isNext ? '👆' : '⏳')}</div>
              </button>
            `;
          }).join('')}
        </div>
        ${allDone ? `
          <button class="dinacharya-reset-btn" id="dinacharya-reset">🔄 ${lang === 'hi' ? 'फिर से खेलें' : 'Play Again'}</button>
        ` : ''}
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const cards = this.container.querySelectorAll('.dinacharya-card');
    cards.forEach(card => {
      card.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const idx = parseInt(card.dataset.idx, 10);
        if (idx === this.currentStep) {
          const st = this.steps[idx];
          this.currentStep++;
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('medium');
            if (st.sound === 'water') window.toddlerAudio.playWaterSprinkle();
            else if (st.sound === 'makhan') window.toddlerAudio.playMakhanPop();
            else if (st.sound === 'giggle') window.toddlerAudio.playBabyGiggle();
            else if (st.sound === 'lullaby') window.toddlerAudio.playTempleBell(659.25);
            else window.toddlerAudio.playTempleBell(880);
            setTimeout(() => window.toddlerAudio.speak((st.title[lang] || st.title.en) + '! ' + (st.desc[lang] || st.desc.en)), 350);
          }
          if (this.currentStep >= this.steps.length) {
            CelebrationPetalShower.shower();
          }
          this.render();
        } else if (idx > this.currentStep) {
          card.classList.add('pattern-nudge');
          setTimeout(() => card.classList.remove('pattern-nudge'), 500);
          const nextSt = this.steps[this.currentStep];
          if (window.toddlerAudio && nextSt) {
            window.toddlerAudio.speak({
              hi: 'पहले ' + nextSt.title.hi + ' करें!',
              en: 'First let us do ' + nextSt.title.en + '!'
            });
          }
        }
      });
    });

    const resetBtn = this.container.querySelector('#dinacharya-reset');
    if (resetBtn) {
      resetBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.currentStep = 0;
        this.render();
      });
    }
  }

  handleAnyKey() {
    if (this.currentStep >= this.steps.length) {
      this.currentStep = 0;
      this.render();
      return;
    }
    const nextCard = this.container.querySelector(`.dinacharya-card[data-idx="${this.currentStep}"]`);
    if (nextCard) {
      nextCard.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
    }
  }
}

// ==========================================================================
// 17. VRINDAVAN HABITAT INQUIRY (IB: Sharing the Planet & Montessori Zoology)
// ==========================================================================
class HabitatGame {
  constructor(container) {
    this.container = container;
    this.itemIdx = 0;
    this.solved = false;
    this.habitats = [
      { id: 'water', icon: '🌊', name: { hi: 'यमुना जल (Water)', en: 'Yamuna Water' }, color: '#0284C7' },
      { id: 'forest', icon: '🌳', name: { hi: 'कदम्ब वन (Trees)', en: 'Forest & Trees' }, color: '#16A34A' },
      { id: 'meadow', icon: '🌾', name: { hi: 'गऊ-शाला (Meadow)', en: 'Green Meadow' }, color: '#D97706' }
    ];
    this.creatures = [
      { icon: '🐮', name: { hi: 'गऊ माता', en: 'Gau Mata' }, habitat: 'meadow', sound: 'cow', fact: { hi: 'गऊ माता हरी घास के मैदान में रहती हैं!', en: 'Gau Mata lives in the green meadow!' } },
      { icon: '🪿', name: { hi: 'राजहंस', en: 'Sacred Swan' }, habitat: 'water', sound: 'swan', fact: { hi: 'हंस यमुना जी के निर्मल जल में तैरता है!', en: 'The swan swims in pure Yamuna water!' } },
      { icon: '🦚', name: { hi: 'मयूर (मोर)', en: 'Peacock' }, habitat: 'forest', sound: 'peacock', fact: { hi: 'सुन्दर मयूर कदम्ब वन के पेड़ों में रहता है!', en: 'The peacock lives among the forest trees!' } },
      { icon: '🐐', name: { hi: 'नन्ही बकरी', en: 'Little Goat' }, habitat: 'meadow', sound: 'goat', fact: { hi: 'बकरी हरे मैदान में चरती है!', en: 'The little goat grazes in the meadow!' } },
      { icon: '🐒', name: { hi: 'नन्हा वानर', en: 'Playful Monkey' }, habitat: 'forest', sound: 'monkey', fact: { hi: 'वानर पेड़ों की डालियों पर कूदता है!', en: 'The monkey jumps on forest tree branches!' } },
      { icon: '🪷', name: { hi: 'कमल पुष्प', en: 'Lotus Flower' }, habitat: 'water', sound: 'bell', fact: { hi: 'सुन्दर कमल हमेशा स्वच्छ जल में खिलता है!', en: 'The sacred lotus blooms in calm water!' } }
    ];
  }

  start() {
    this.itemIdx = 0;
    this.solved = false;
    this.render();
    setTimeout(() => this.playCreatureSound(this.creatures[this.itemIdx]), 350);
  }

  stop() {
    this.container.innerHTML = '';
  }

  playCreatureSound(c) {
    if (!c || !window.toddlerAudio) return;
    if (c.sound === 'cow') window.toddlerAudio.playCowMoo();
    else if (c.sound === 'swan') window.toddlerAudio.playSwanCall();
    else if (c.sound === 'peacock') window.toddlerAudio.playPeacockCall();
    else if (c.sound === 'goat') window.toddlerAudio.playGoatBleat();
    else if (c.sound === 'monkey') window.toddlerAudio.playMonkeyChatter();
    else window.toddlerAudio.playTempleBell(880);
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const creature = this.creatures[this.itemIdx % this.creatures.length];
    const headerTitle = lang === 'hi'
      ? '🌍 प्रकृति आवास (IB Inquiry): यह मित्र कहाँ रहता है?'
      : '🌍 Habitat Inquiry (Sharing the Planet): Where Does This Friend Live?';

    this.container.innerHTML = `
      <div class="game-habitat vedic-theme">
        <div class="habitat-header">
          <h2>${headerTitle}</h2>
        </div>
        <button class="habitat-creature-card" id="habitat-creature-btn">
          <div class="habitat-creature-icon">${creature.icon}</div>
          <div class="habitat-creature-name">${creature.name[lang] || creature.name.en}</div>
          <div class="habitat-tap-sound">🔊 ${lang === 'hi' ? 'आवाज़ सुनें' : 'Hear Sound'}</div>
        </button>
        <div class="habitat-baskets-row">
          ${this.habitats.map(h => `
            <button class="habitat-basket-btn" data-habitat="${h.id}" style="--hab-color: ${h.color};">
              <span class="hab-icon">${h.icon}</span>
              <span class="hab-name">${h.name[lang] || h.name.en}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const creature = this.creatures[this.itemIdx % this.creatures.length];

    const cBtn = this.container.querySelector('#habitat-creature-btn');
    if (cBtn) {
      cBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.playCreatureSound(creature);
      });
    }

    const habBtns = this.container.querySelectorAll('.habitat-basket-btn');
    habBtns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.solved) return;
        const picked = btn.dataset.habitat;
        if (picked === creature.habitat) {
          this.solved = true;
          btn.classList.add('quiz-correct');
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('celebration');
            window.toddlerAudio.speak(creature.fact[lang] || creature.fact.en);
          }
          CelebrationPetalShower.shower();
          setTimeout(() => {
            this.itemIdx = (this.itemIdx + 1) % this.creatures.length;
            this.solved = false;
            this.render();
            setTimeout(() => this.playCreatureSound(this.creatures[this.itemIdx]), 300);
          }, 2600);
        } else {
          btn.classList.add('pattern-nudge');
          setTimeout(() => btn.classList.remove('pattern-nudge'), 500);
          if (window.toddlerAudio) {
            window.toddlerAudio.speak({
              hi: 'फिर से सोचें! ' + creature.name.hi + ' कहाँ रहता है?',
              en: 'Try again! Where does ' + creature.name.en + ' live?'
            });
          }
        }
      });
    });
  }

  handleAnyKey() {
    const creature = this.creatures[this.itemIdx % this.creatures.length];
    const correctBtn = this.container.querySelector(`.habitat-basket-btn[data-habitat="${creature.habitat}"]`);
    if (correctBtn) {
      correctBtn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
    }
  }
}

// ==========================================================================
// 18. BALA YOGA (NEP 2020 Panchakosha: Annamaya & Pranamaya Physical/Breath)
// ==========================================================================
class BalaYogaGame {
  constructor(container) {
    this.container = container;
    this.poseIdx = 0;
    this.poses = [
      { id: 'tree', icon: '🌳', name: { hi: 'वृक्षासन (Tree Pose)', en: 'Vrikshasana (Tree Pose)' }, cue: { hi: 'पेड़ की तरह सीधे खड़े होकर हाथ ऊपर उठाएं और श्वास लें!', en: 'Stand tall like a Kadamba tree, raise both arms high, and breathe!' }, sound: 'birds' },
      { id: 'peacock', icon: '🦚', name: { hi: 'मयूरासन (Peacock Stretch)', en: 'Mayurasana (Peacock Stretch)' }, cue: { hi: 'मोर की तरह पंख फैलाकर धीरे से झुकें और मुस्कुराएं!', en: 'Spread your arms wide like peacock feathers and stretch gently!' }, sound: 'peacock' },
      { id: 'cow', icon: '🐮', name: { hi: 'गौ-मार्जरासन (Cow Stretch)', en: 'Gau-Asana (Happy Cow Stretch)' }, cue: { hi: 'हाथ और घुटने जमीन पर रखकर प्यारी गऊ माता की तरह पीठ झुलाएं!', en: 'On hands and knees, arch your back gently like sweet Gau Mata!' }, sound: 'cow' },
      { id: 'lotus', icon: '🪷', name: { hi: 'पद्मासन (Lotus Calm)', en: 'Padmasana (Lotus Calm)' }, cue: { hi: 'पालथी मारकर सीधे बैठें, आँखें बंद करें और शान्ति से श्वास लें!', en: 'Sit cross-legged like a blooming lotus, smile, and take one calm breath!' }, sound: 'om' }
    ];
  }

  start() {
    this.poseIdx = 0;
    this.render();
    setTimeout(() => this.speakPose(this.poses[0]), 350);
  }

  stop() {
    this.container.innerHTML = '';
  }

  speakPose(pose) {
    if (!pose || !window.toddlerAudio) return;
    const lang = window.toddlerAudio.currentLanguage || 'hi';
    if (pose.sound === 'birds') window.toddlerAudio.playForestBirdsChirp();
    else if (pose.sound === 'peacock') window.toddlerAudio.playPeacockCall();
    else if (pose.sound === 'cow') window.toddlerAudio.playCowMoo();
    else window.toddlerAudio.playOmChant();
    setTimeout(() => {
      if (window.toddlerAudio) {
        window.toddlerAudio.speak((pose.name[lang] || pose.name.en) + '! ' + (pose.cue[lang] || pose.cue.en));
      }
    }, 650);
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const pose = this.poses[this.poseIdx % this.poses.length];
    const headerTitle = lang === 'hi'
      ? '🧘 बाल योग (NEP पंचकोश): कान्हा के साथ प्यारे योगासन करें!'
      : '🧘 Bala Yoga (NEP Panchakosha): Stretch & Breathe with Kanha!';

    this.container.innerHTML = `
      <div class="game-yoga vedic-theme">
        <div class="yoga-header">
          <h2>${headerTitle}</h2>
        </div>
        <div class="yoga-pose-stage" id="yoga-hero-card">
          <div class="yoga-pose-icon">${pose.icon}</div>
          <div class="yoga-pose-name">${pose.name[lang] || pose.name.en}</div>
          <p class="yoga-pose-cue">${pose.cue[lang] || pose.cue.en}</p>
          <button class="yoga-done-btn" id="yoga-complete-btn">✨ ${lang === 'hi' ? 'मैंने कर लिया! (Done!)' : 'I Did It! (Next Pose)'}</button>
        </div>
        <div class="yoga-pills-row">
          ${this.poses.map((p, idx) => `
            <button class="yoga-pill-btn ${idx === this.poseIdx ? 'active' : ''}" data-idx="${idx}">
              <span>${p.icon}</span> <span>${p.name[lang] || p.name.en}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const pills = this.container.querySelectorAll('.yoga-pill-btn');
    pills.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.poseIdx = parseInt(btn.dataset.idx, 10);
        this.render();
        this.speakPose(this.poses[this.poseIdx]);
      });
    });

    const doneBtn = this.container.querySelector('#yoga-complete-btn');
    if (doneBtn) {
      doneBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (window.toddlerAudio) {
          window.toddlerAudio.triggerHaptic('celebration');
          window.toddlerAudio.playTempleBell(1046.5);
          window.toddlerAudio.speak({ hi: 'शाबाश! बहुत सुन्दर योग!', en: 'Bravo! Wonderful yoga pose!' });
        }
        CelebrationPetalShower.shower();
        setTimeout(() => {
          this.poseIdx = (this.poseIdx + 1) % this.poses.length;
          this.render();
          setTimeout(() => this.speakPose(this.poses[this.poseIdx]), 300);
        }, 1600);
      });
    }
  }

  handleAnyKey() {
    const doneBtn = this.container.querySelector('#yoga-complete-btn');
    if (doneBtn) doneBtn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
  }
}

// ==========================================================================
// 19. RITU-CHAKRA (Waldorf / Steiner: 6 Vedic Seasons & Nature Rhythm)
// ==========================================================================
class RituChakraGame {
  constructor(container) {
    this.container = container;
    this.activeIdx = 0;
    this.seasons = [
      { id: 'vasant', icon: '🌸', name: { hi: 'वसन्त ऋतु (Spring)', en: 'Vasant (Spring)' }, desc: { hi: 'फूल खिलते हैं, कोयल गाती है और होली आती है!', en: 'Flowers bloom, cuckoos sing, and joyful Holi arrives!' }, bg: 'linear-gradient(135deg, #FCE7F3, #FEF3C7)', sound: 'koel' },
      { id: 'grishma', icon: '☀️', name: { hi: 'ग्रीष्म ऋतु (Summer)', en: 'Grishma (Summer)' }, desc: { hi: 'तेज धूप में यमुना का ठण्डा जल और मीठे आम!', en: 'Cool Yamuna water and sweet mangoes under the warm sun!' }, bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', sound: 'yamuna' },
      { id: 'varsha', icon: '🌧️', name: { hi: 'वर्षा ऋतु (Monsoon)', en: 'Varsha (Monsoon)' }, desc: { hi: 'रिमझिम बारिश में मोर पंख फैलाकर नाचते हैं!', en: 'Gentle monsoon rain falls and peacocks dance with joy!' }, bg: 'linear-gradient(135deg, #E0F2FE, #BAE6FD)', sound: 'rain' },
      { id: 'sharad', icon: '🌕', name: { hi: 'शरद ऋतु (Autumn)', en: 'Sharad (Autumn)' }, desc: { hi: 'निर्मल चाँदनी रात, कमल और दीपावली के दीपक!', en: 'Bright full moon nights, blooming lotuses, and Diwali lamps!' }, bg: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)', sound: 'crickets' },
      { id: 'hemant', icon: '🌾', name: { hi: 'हेमन्त ऋतु (Pre-Winter)', en: 'Hemant (Cool Harvest)' }, desc: { hi: 'सुहावनी ठण्डक, ताजी फसल और गऊ-सेवा!', en: 'Crisp pleasant mornings, golden harvest, and Gau-Seva!' }, bg: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', sound: 'cow' },
      { id: 'shishira', icon: '🧣', name: { hi: 'शिशिर ऋतु (Winter)', en: 'Shishira (Winter)' }, desc: { hi: 'गर्म दूध, मकर संक्रान्ति और प्यारी धूप!', en: 'Cozy blankets, warm milk, and gentle morning sunshine!' }, bg: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)', sound: 'bell' }
    ];
  }

  start() {
    this.activeIdx = 0;
    this.render();
    setTimeout(() => this.playSeason(this.seasons[0]), 350);
  }

  stop() {
    this.container.innerHTML = '';
  }

  playSeason(s) {
    if (!s || !window.toddlerAudio) return;
    const lang = window.toddlerAudio.currentLanguage || 'hi';
    if (s.sound === 'koel') window.toddlerAudio.playKoelCall();
    else if (s.sound === 'yamuna') window.toddlerAudio.playYamunaStream();
    else if (s.sound === 'rain') {
      window.toddlerAudio.playMonsoonRain();
      setTimeout(() => window.toddlerAudio.playPeacockCall(), 400);
    }
    else if (s.sound === 'crickets') window.toddlerAudio.playNightCrickets();
    else if (s.sound === 'cow') window.toddlerAudio.playCowMoo();
    else window.toddlerAudio.playTempleBell(880);

    setTimeout(() => {
      if (window.toddlerAudio) {
        window.toddlerAudio.speak((s.name[lang] || s.name.en) + '! ' + (s.desc[lang] || s.desc.en));
      }
    }, 650);
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const s = this.seasons[this.activeIdx % this.seasons.length];
    const headerTitle = lang === 'hi'
      ? '🌦️ ऋतु चक्र (Waldorf Seasons): भारत की ६ पावन ऋतुएं जानें!'
      : '🌦️ Ritu-Chakra (Waldorf Rhythm): Explore the 6 Sacred Seasons!';

    this.container.innerHTML = `
      <div class="game-ritu vedic-theme">
        <div class="ritu-header">
          <h2>${headerTitle}</h2>
        </div>
        <div class="ritu-showcase-card" style="background: ${s.bg};">
          <div class="ritu-icon">${s.icon}</div>
          <div class="ritu-name">${s.name[lang] || s.name.en}</div>
          <p class="ritu-desc">${s.desc[lang] || s.desc.en}</p>
        </div>
        <div class="ritu-wheel-grid">
          ${this.seasons.map((item, idx) => `
            <button class="ritu-btn ${idx === this.activeIdx ? 'active' : ''}" data-idx="${idx}">
              <span class="ritu-btn-icon">${item.icon}</span>
              <span class="ritu-btn-label">${item.name[lang] || item.name.en}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const btns = this.container.querySelectorAll('.ritu-btn');
    btns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.activeIdx = parseInt(btn.dataset.idx, 10);
        this.render();
        this.playSeason(this.seasons[this.activeIdx]);
      });
    });
  }

  handleAnyKey() {
    this.activeIdx = (this.activeIdx + 1) % this.seasons.length;
    this.render();
    this.playSeason(this.seasons[this.activeIdx]);
  }
}

// ==========================================================================
// 20. DIVYA KOLAM SYMMETRY (Reggio Emilia: 100 Languages & Loose-Parts Art)
// ==========================================================================
class KolamSymmetryGame {
  constructor(container) {
    this.container = container;
    this.activeStamp = '🪷';
    this.stamps = ['🪷', '🌼', '🪔', '🌿', '✨'];
    this.grid = [];
    this.resetGrid();
  }

  resetGrid() {
    this.grid = [];
    for (let r = 0; r < 5; r++) {
      const row = [];
      for (let c = 0; c < 5; c++) row.push('');
      this.grid.push(row);
    }
    this.grid[2][2] = '🕉️';
  }

  start() {
    this.resetGrid();
    this.render();
  }

  stop() {
    this.container.innerHTML = '';
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const headerTitle = lang === 'hi'
      ? '💠 दिव्य कोलम (Reggio Symmetry): एक ओर छूएं और चारों ओर समान सजावट देखें!'
      : '💠 Divya Kolam (Reggio Symmetry): Tap Any Dot to Mirror Sacred Symmetry!';

    this.container.innerHTML = `
      <div class="game-kolam vedic-theme">
        <div class="kolam-header">
          <h2>${headerTitle}</h2>
        </div>
        <div class="kolam-stamp-bar">
          ${this.stamps.map(st => `
            <button class="kolam-stamp-btn ${st === this.activeStamp ? 'active' : ''}" data-stamp="${st}">${st}</button>
          `).join('')}
          <button class="kolam-clear-btn" id="kolam-clear-btn">🔄 ${lang === 'hi' ? 'नया कोलम' : 'Clear'}</button>
        </div>
        <div class="kolam-grid-board">
          ${this.grid.map((row, r) => row.map((val, c) => `
            <button class="kolam-cell ${val ? 'has-petal' : ''} ${r === 2 && c === 2 ? 'is-center' : ''}" data-r="${r}" data-c="${c}">
              ${val || '•'}
            </button>
          `).join('')).join('')}
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const stampBtns = this.container.querySelectorAll('.kolam-stamp-btn');
    stampBtns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.activeStamp = btn.dataset.stamp;
        this.render();
      });
    });

    const clearBtn = this.container.querySelector('#kolam-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.resetGrid();
        this.render();
      });
    }

    const cells = this.container.querySelectorAll('.kolam-cell');
    cells.forEach(cell => {
      cell.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const r = parseInt(cell.dataset.r, 10);
        const c = parseInt(cell.dataset.c, 10);
        // 4-way reflectional temple symmetry
        const mirrorCoords = [
          [r, c],
          [r, 4 - c],
          [4 - r, c],
          [4 - r, 4 - c]
        ];
        mirrorCoords.forEach(pair => {
          this.grid[pair[0]][pair[1]] = this.activeStamp;
        });
        if (window.toddlerAudio) {
          window.toddlerAudio.triggerHaptic('light');
          const freqs = [523.25, 587.33, 659.25, 783.99, 880];
          window.toddlerAudio.playJalTarang(freqs[(r + c) % freqs.length]);
        }
        this.render();
      });
    });
  }

  handleAnyKey() {
    const r = Math.floor(Math.random() * 5);
    const c = Math.floor(Math.random() * 5);
    const cell = this.container.querySelector(`.kolam-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) cell.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
  }
}

// ==========================================================================
// 21. DIVYA SANSKARA (Charlotte Mason: Living Moral Habits & Ahimsa)
// ==========================================================================
class SanskaraValuesGame {
  constructor(container) {
    this.container = container;
    this.idx = 0;
    this.solved = false;
    this.scenarios = [
      {
        icon: '🐦',
        prompt: { hi: 'धूप में एक नन्ही चिड़िया प्यासी है! हम क्या करें?', en: 'A little sparrow is thirsty in the sun! What should we do?' },
        good: { icon: '💧', label: { hi: 'ठण्डा जल पिलाएं (दया)', en: 'Offer Cool Water (Kindness)' } },
        other: { icon: '🪨', label: { hi: 'अनदेखा करें', en: 'Walk Away' } },
        praise: { hi: 'शाबाश! सभी जीवों पर दया करना सबसे बड़ा धर्म है!', en: 'Wonderful! Kindness to every creature is the highest virtue!' }
      },
      {
        icon: '🐮',
        prompt: { hi: 'गऊ माता द्वार पर खड़ी हैं! हम क्या भेंट करें?', en: 'Gentle Gau-Mata is at the gate! What should we offer?' },
        good: { icon: '🌾', label: { hi: 'ताजी हरी घास व रोटी (सेवा)', en: 'Fresh Green Grass (Seva)' } },
        other: { icon: '🚫', label: { hi: 'दरवाजा बंद करें', en: 'Close the Door' } },
        praise: { hi: 'बहुत अच्छे! गऊ माता की सेवा से मन पवित्र होता है!', en: 'Bravo! Serving Gau-Mata fills our heart with joy!' }
      },
      {
        icon: '🌸',
        prompt: { hi: 'दादी माँ की पूजा की टोकरी गिर गई! हम क्या करें?', en: 'Grandma dropped her flower basket! What should we do?' },
        good: { icon: '🤝', label: { hi: 'फूल उठाने में मदद करें (नम्रता)', en: 'Help Pick Up Flowers (Respect)' } },
        other: { icon: '🏃', label: { hi: 'भाग जाएं', en: 'Run Away' } },
        praise: { hi: 'अति सुन्दर! बड़ों की मदद करना सच्चा संस्कार है!', en: 'Beautiful! Helping elders is a wonderful Sanskara!' }
      },
      {
        icon: '🍯',
        prompt: { hi: 'मित्र आज भोजन लाना भूल गया! हम क्या करें?', en: 'Your friend forgot their lunch today! What should we do?' },
        good: { icon: '🥣', label: { hi: 'अपना प्रसाद बाँटकर खाएं (दान)', en: 'Share Our Meal Together (Sharing)' } },
        other: { icon: '🙈', label: { hi: 'छिपा लें', en: 'Hide It' } },
        praise: { hi: 'वाह! बाँटकर खाने से खुशी दोगुनी हो जाती है!', en: 'Awesome! Sharing with friends doubles the joy!' }
      }
    ];
  }

  start() {
    this.idx = 0;
    this.solved = false;
    this.render();
    setTimeout(() => this.speakScenario(), 350);
  }

  stop() {
    this.container.innerHTML = '';
  }

  speakScenario() {
    const sc = this.scenarios[this.idx % this.scenarios.length];
    if (!sc || !window.toddlerAudio) return;
    const lang = window.toddlerAudio.currentLanguage || 'hi';
    window.toddlerAudio.speak(sc.prompt[lang] || sc.prompt.en);
  }

  render() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const sc = this.scenarios[this.idx % this.scenarios.length];
    const headerTitle = lang === 'hi'
      ? '💖 दिव्य संस्कार (Charlotte Mason Habits): सही और दयालु विकल्प चुनें!'
      : '💖 Divya Sanskara (Kindness & Values): Choose the Loving Action!';

    this.container.innerHTML = `
      <div class="game-sanskara vedic-theme">
        <div class="sanskara-header">
          <h2>${headerTitle}</h2>
        </div>
        <div class="sanskara-story-card" id="sanskara-prompt-btn">
          <div class="sanskara-story-icon">${sc.icon}</div>
          <div class="sanskara-story-text">${sc.prompt[lang] || sc.prompt.en}</div>
        </div>
        <div class="sanskara-choices-row">
          <button class="sanskara-choice-btn is-good-opt" data-kind="good">
            <span class="sc-opt-icon">${sc.good.icon}</span>
            <span class="sc-opt-label">${sc.good.label[lang] || sc.good.label.en}</span>
          </button>
          <button class="sanskara-choice-btn" data-kind="other">
            <span class="sc-opt-icon">${sc.other.icon}</span>
            <span class="sc-opt-label">${sc.other.label[lang] || sc.other.label.en}</span>
          </button>
        </div>
      </div>
    `;
    this.bindEvents();
  }

  bindEvents() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const sc = this.scenarios[this.idx % this.scenarios.length];
    const promptBtn = this.container.querySelector('#sanskara-prompt-btn');
    if (promptBtn) {
      promptBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.speakScenario();
      });
    }

    const btns = this.container.querySelectorAll('.sanskara-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.solved) return;
        if (btn.dataset.kind === 'good') {
          this.solved = true;
          btn.classList.add('quiz-correct');
          if (window.toddlerAudio) {
            window.toddlerAudio.triggerHaptic('celebration');
            window.toddlerAudio.playTempleBell(1046.5);
            window.toddlerAudio.speak(sc.praise[lang] || sc.praise.en);
          }
          CelebrationPetalShower.shower();
          setTimeout(() => {
            this.idx = (this.idx + 1) % this.scenarios.length;
            this.solved = false;
            this.render();
            setTimeout(() => this.speakScenario(), 300);
          }, 2600);
        } else {
          btn.classList.add('pattern-nudge');
          setTimeout(() => btn.classList.remove('pattern-nudge'), 500);
          if (window.toddlerAudio) {
            window.toddlerAudio.speak({
              hi: 'सोचिए, कान्हा को कौन सा प्यार भरा काम अच्छा लगेगा?',
              en: 'Think gently! Which loving action would make Kanha happy?'
            });
          }
        }
      });
    });
  }

  handleAnyKey() {
    const goodBtn = this.container.querySelector('.sanskara-choice-btn[data-kind="good"]');
    if (goodBtn) goodBtn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
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
  window.PatternMalaGame = PatternMalaGame;
  window.DinacharyaGame = DinacharyaGame;
  window.HabitatGame = HabitatGame;
  window.BalaYogaGame = BalaYogaGame;
  window.RituChakraGame = RituChakraGame;
  window.KolamSymmetryGame = KolamSymmetryGame;
  window.SanskaraValuesGame = SanskaraValuesGame;
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
    PatternMalaGame,
    DinacharyaGame,
    HabitatGame,
    BalaYogaGame,
    RituChakraGame,
    KolamSymmetryGame,
    SanskaraValuesGame,
    CelebrationPetalShower,
    ToddlerPersistence,
    ElementPool
  };
}
