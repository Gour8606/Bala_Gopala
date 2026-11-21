/**
 * Bala Gopala & Sandipani Gurukul - Main Application Controller (Commercial Grade)
 * Featuring Toddler Lock, Parent Gate, Screen-Time Manager,
 * Kanha's Ghungroo Footstep Trails, and Infant-Safe Multitouch Sensory Response.
 */

// ==========================================================================
// COMMERCIAL TODDLER INPUT FILTER (Palm Slap Rejection & Tremor Tolerance)
// ==========================================================================
class ToddlerInputFilter {
  static isPalmSlap(e) {
    if (!e) return false;
    // Discard touch events where contact width/height indicates palm or wrist resting on screen
    if (typeof e.width === 'number' && e.width > 65) return true;
    if (typeof e.height === 'number' && e.height > 65) return true;
    return false;
  }
}

class ToddlerApp {
  constructor() {
    this.stage = document.getElementById('game-stage');
    this.currentGame = null;
    this.currentGameKey = 'bubbles';
    this.isShantiMode = false;
    this.isChildLocked = false;
    this.lastFootstepTime = 0;
    this.footstepToggle = false;
    this.mashCount = 0;

    // Screen Time Timer state
    this.timerMinutes = 0;
    this.timerSecondsRemaining = 0;
    this.timerInterval = null;

    // Parent Gate state
    this.gatePendingAction = null;
    this.gateCorrectAnswer = 0;

    this.games = {
      bubbles: BubbleGame,
      peekaboo: PeekabooGame,
      xylophone: XylophoneGame,
      aarti: AartiGame,
      shapes: ShapeMatchGame,
      sparkles: SparkleCanvasGame,
      shringar: ShringarGame,
      akshara: AksharaGame
    };

    // Commercial Memory Object Pools (Zero runtime GC stutter)
    this.footprintPool = (typeof ElementPool !== 'undefined') ? new ElementPool('kanha-footprint-trail', 25) : null;
    this.ripplePool = (typeof ElementPool !== 'undefined') ? new ElementPool('key-mash-ripple', 16) : null;

    this.initElements();
    this.restoreSavedPreferences();
    this.updateLanguageUI();
    this.bindEvents();
    this.bindHashRouting();
    this.bindBabyMashKeyboard();
    this.bindKanhaGhungrooFootsteps();
    this.bindSafetyGestures();
  }

  restoreSavedPreferences() {
    if (!window.ToddlerPersistence) return;

    // 1. Language preference
    const savedLang = window.ToddlerPersistence.get('language', 'hi');
    if (window.toddlerAudio) {
      window.toddlerAudio.setLanguage(savedLang);
    }

    // 2. Audio Mute preference
    const isMuted = window.ToddlerPersistence.get('audio_muted', false);
    if (isMuted && window.toddlerAudio) {
      window.toddlerAudio.isMuted = true;
      if (this.muteBtn) {
        this.muteBtn.textContent = '🔇';
        this.muteBtn.title = 'Unmute Sound';
      }
    }

    // 3. Screen Time Limit preference
    const savedLimit = window.ToddlerPersistence.get('screen_time_limit', 0);
    if (savedLimit > 0) {
      this.timerMinutes = savedLimit;
      const optBtns = this.timerModal ? this.timerModal.querySelectorAll('.timer-opt-btn') : [];
      optBtns.forEach(btn => {
        const mins = parseInt(btn.dataset.minutes, 10);
        btn.classList.toggle('active', mins === savedLimit);
      });
    }
  }

  initElements() {
    this.container = document.getElementById('app-container');
    this.topNavbar = document.getElementById('top-navbar');
    this.tabs = document.querySelectorAll('.tab-btn');
    this.muteBtn = document.getElementById('mute-btn');
    this.fullscreenBtn = document.getElementById('fullscreen-btn');
    this.startOverlay = document.getElementById('start-overlay');
    this.tapToPlayBtn = document.getElementById('tap-to-play-btn');

    // Parent Modals
    this.parentGuideBtn = document.getElementById('parent-guide-btn');
    this.parentModal = document.getElementById('parent-modal');
    this.closeParentModal = document.getElementById('close-parent-modal');

    // Controls
    this.langToggleBtn = document.getElementById('lang-toggle-btn');
    this.langIndicator = document.getElementById('lang-indicator');
    this.shantiModeBtn = document.getElementById('shanti-mode-btn');

    // Child Lock
    this.childLockBtn = document.getElementById('child-lock-btn');
    this.floatingUnlockHandle = document.getElementById('floating-unlock-handle');

    // Parent Gate
    this.parentGateModal = document.getElementById('parent-gate-modal');
    this.closeGateModal = document.getElementById('close-gate-modal');
    this.gateQuestionText = document.getElementById('gate-question-text');
    this.gateMathQuestion = document.getElementById('gate-math-question');
    this.gateKeypad = document.getElementById('gate-keypad');

    // Screen Time Timer
    this.timerBtn = document.getElementById('timer-btn');
    this.timerModal = document.getElementById('timer-modal');
    this.closeTimerModal = document.getElementById('close-timer-modal');
    this.timerStatusPill = document.getElementById('timer-status-pill');
    this.timerCountdown = document.getElementById('timer-countdown');
    this.screenTimeDoneModal = document.getElementById('screen-time-done-modal');
    this.resumeScreenBtn = document.getElementById('resume-screen-btn');
  }

  bindEvents() {
    // 1. Start Overlay Unlock - Any tap anywhere on the start screen unlocks the game!
    const unlockAndStart = (e) => {
      e.preventDefault();
      this.startGame();
    };
    this.tapToPlayBtn.addEventListener('pointerdown', unlockAndStart);
    this.startOverlay.addEventListener('pointerdown', (e) => {
      // If tapped anywhere on overlay card or background
      unlockAndStart(e);
    });

    // 2. Game Mode Tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.isChildLocked) return;
        const gameKey = tab.dataset.game;
        if (gameKey && gameKey !== this.currentGameKey) {
          this.switchGame(gameKey);
        }
      });
    });

    // 3. Language Toggle
    this.langToggleBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const current = window.toddlerAudio.currentLanguage;
      const next = current === 'hi' ? 'en' : 'hi';
      window.toddlerAudio.setLanguage(next);
      this.updateLanguageUI();
      if (window.ToddlerPersistence) {
        window.ToddlerPersistence.set('language', next);
      }
      window.toddlerAudio.playTempleBell(880);

      window.toddlerAudio.speak({
        hi: "हिन्दी भाषा। राधे राधे!",
        en: "English language selected. Welcome!"
      });

      if (this.currentGame && typeof this.currentGame.render === 'function') {
        this.currentGame.render();
      }
    });

    // 4. Bedtime Shanti Mode Toggle
    this.shantiModeBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.toggleShantiMode();
    });

    // 5. Mute Button
    this.muteBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const isMuted = window.toddlerAudio.toggleMute();
      this.muteBtn.textContent = isMuted ? '🔇' : '🔊';
      this.muteBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
      if (window.ToddlerPersistence) {
        window.ToddlerPersistence.set('audio_muted', isMuted);
      }
    });

    // 6. Fullscreen Toggle
    this.fullscreenBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.toggleFullscreen();
    });

    // 7. Child Lock Toggle
    this.childLockBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.toggleChildLock(true);
    });

    // Unlock floating handle (Hold 2 seconds or double tap)
    let holdTimeout = null;
    this.floatingUnlockHandle.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.floatingUnlockHandle.classList.add('holding');
      holdTimeout = setTimeout(() => {
        this.toggleChildLock(false);
        this.floatingUnlockHandle.classList.remove('holding');
      }, 1800);
    });

    const cancelHold = () => {
      if (holdTimeout) {
        clearTimeout(holdTimeout);
        holdTimeout = null;
      }
      this.floatingUnlockHandle.classList.remove('holding');
    };
    this.floatingUnlockHandle.addEventListener('pointerup', cancelHold);
    this.floatingUnlockHandle.addEventListener('pointerleave', cancelHold);
    this.floatingUnlockHandle.addEventListener('pointercancel', cancelHold);

    // 8. Parent Gate Protected Buttons (Parent Guide & Timer)
    this.parentGuideBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.requestParentAccess(() => {
        this.parentModal.classList.remove('hidden');
      });
    });

    this.closeParentModal.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.parentModal.classList.add('hidden');
    });

    this.timerBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.requestParentAccess(() => {
        this.timerModal.classList.remove('hidden');
      });
    });

    this.timerStatusPill.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.requestParentAccess(() => {
        this.timerModal.classList.remove('hidden');
      });
    });

    this.closeTimerModal.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.timerModal.classList.add('hidden');
    });

    // Screen Time Option buttons
    const timerOptions = this.timerModal.querySelectorAll('.timer-opt-btn');
    timerOptions.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        timerOptions.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mins = parseInt(btn.dataset.minutes, 10);
        this.setScreenTimeLimit(mins);
        this.timerModal.classList.add('hidden');
      });
    });

    // Screen Time Complete Resume button
    this.resumeScreenBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.requestParentAccess(() => {
        this.screenTimeDoneModal.classList.add('hidden');
        if (this.isShantiMode) this.toggleShantiMode(false);
      });
    });

    // Parent Gate Modal controls
    this.closeGateModal.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.parentGateModal.classList.add('hidden');
      this.gatePendingAction = null;
    });
  }

  // GENTLE SCREEN TIME MANAGER
  setScreenTimeLimit(minutes) {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.timerMinutes = minutes;
    if (window.ToddlerPersistence) {
      window.ToddlerPersistence.set('screen_time_limit', minutes);
    }
    if (minutes <= 0) {
      this.timerStatusPill.classList.add('hidden');
      return;
    }

    this.timerSecondsRemaining = minutes * 60;
    this.timerStatusPill.classList.remove('hidden');
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerSecondsRemaining--;
      this.updateTimerDisplay();

      if (this.timerSecondsRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.triggerScreenTimeFinished();
      }
    }, 1000);

    window.toddlerAudio.speak({
      hi: `${minutes} मिनट का बाल समय निर्धारित।`,
      en: `${minutes} minutes screen time set.`
    });
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timerSecondsRemaining / 60);
    const secs = this.timerSecondsRemaining % 60;
    const str = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    if (this.timerCountdown) {
      this.timerCountdown.textContent = str;
    }
  }

  triggerScreenTimeFinished() {
    this.timerStatusPill.classList.add('hidden');

    // Enter Shanti Mode
    if (!this.isShantiMode) {
      this.toggleShantiMode(true);
    }

    // Play gentle lullaby
    window.toddlerAudio.playLullabyMelody();
    window.toddlerAudio.speak({
      hi: "शान्ति समय। अब विश्राम का समय, नन्हे कान्हा!",
      en: "Shanti time! Time to rest peacefully, little Kanha!"
    });

    // Show gentle bedtime screen
    setTimeout(() => {
      this.screenTimeDoneModal.classList.remove('hidden');
    }, 1200);
  }

  // PARENT GATE CHILD LOCK VERIFICATION
  requestParentAccess(onSuccessCallback) {
    this.gatePendingAction = onSuccessCallback;

    // Generate simple arithmetic: e.g. 3 + 4 = 7
    const n1 = Math.floor(Math.random() * 5) + 2;
    const n2 = Math.floor(Math.random() * 5) + 1;
    this.gateCorrectAnswer = n1 + n2;

    this.gateMathQuestion.textContent = `${n1} + ${n2} = ?`;

    // 4 options including correct answer
    const options = new Set([this.gateCorrectAnswer]);
    while (options.size < 4) {
      const wrong = this.gateCorrectAnswer + (Math.floor(Math.random() * 7) - 3);
      if (wrong > 0 && wrong !== this.gateCorrectAnswer) {
        options.add(wrong);
      }
    }

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

    this.gateKeypad.innerHTML = shuffled.map(num => `
      <button class="gate-num-btn" data-val="${num}">${num}</button>
    `).join('');

    const btns = this.gateKeypad.querySelectorAll('.gate-num-btn');
    btns.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const selected = parseInt(btn.dataset.val, 10);
        if (selected === this.gateCorrectAnswer) {
          window.toddlerAudio.playTempleBell(1046.5);
          this.parentGateModal.classList.add('hidden');
          if (typeof this.gatePendingAction === 'function') {
            this.gatePendingAction();
          }
          this.gatePendingAction = null;
        } else {
          btn.classList.add('wrong');
          window.toddlerAudio.playDamru();
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
      });
    });

    this.parentGateModal.classList.remove('hidden');
  }

  // CHILD LOCK (Toddler UI Lock)
  toggleChildLock(shouldLock) {
    this.isChildLocked = shouldLock !== undefined ? shouldLock : !this.isChildLocked;
    this.container.classList.toggle('child-locked', this.isChildLocked);
    this.floatingUnlockHandle.classList.toggle('hidden', !this.isChildLocked);

    window.toddlerAudio.playTempleBell(880);

    if (this.isChildLocked) {
      window.toddlerAudio.speak({
        hi: "बाल सुरक्षा लॉक सक्रिय।",
        en: "Toddler play lock enabled."
      });
    } else {
      window.toddlerAudio.speak({
        hi: "लॉक खुल गया।",
        en: "Unlocked."
      });
    }
  }

  toggleShantiMode(forceState) {
    this.isShantiMode = forceState !== undefined ? forceState : !this.isShantiMode;
    this.container.classList.toggle('shanti-mode', this.isShantiMode);
    this.shantiModeBtn.classList.toggle('active-glow', this.isShantiMode);

    if (this.isShantiMode) {
      window.toddlerAudio.startTanpuraDrone();
      window.toddlerAudio.speak({
        hi: "शान्ति मोड प्रारम्भ। शुभ रात्रि, नन्हे कान्हा!",
        en: "Bedtime Shanti mode on. Sweet dreams, little Kanha!"
      });
    } else {
      window.toddlerAudio.stopTanpuraDrone();
      window.toddlerAudio.playTempleBell(1046.5);
    }
  }

  updateLanguageUI() {
    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const tabTranslations = {
      bubbles: { hi: 'माखन मटकी', en: 'Makhan Pop' },
      peekaboo: { hi: 'गऊ सेवा', en: 'Gau-Seva' },
      xylophone: { hi: 'बांसुरी व जल', en: 'Bansuri & Jal' },
      aarti: { hi: 'संध्या आरती', en: 'Sandhya Aarti' },
      shapes: { hi: 'पुष्पार्चना', en: 'Pushparchana' },
      sparkles: { hi: 'दिव्य रंगोली', en: 'Divya Rangoli' },
      shringar: { hi: 'कान्हा श्रृंगार', en: 'Shringar' },
      akshara: { hi: 'दिव्य अक्षर', en: 'Akshara' }
    };

    if (this.tabs) {
      this.tabs.forEach(tab => {
        const gameKey = tab.dataset.game;
        if (tabTranslations[gameKey]) {
          const span = tab.querySelector('.tab-text');
          if (span) {
            span.textContent = tabTranslations[gameKey][lang] || tabTranslations[gameKey].en;
          }
        }
      });
    }

    if (this.langIndicator) {
      this.langIndicator.textContent = lang === 'hi' ? '🇮🇳 हिन्दी' : '🌐 English';
    }
  }

  getGameFromHash() {
    const hash = (window.location.hash || '').replace('#', '').trim().toLowerCase();
    if (hash && this.games[hash]) {
      return hash;
    }
    return 'bubbles';
  }

  bindHashRouting() {
    window.addEventListener('hashchange', () => {
      const target = this.getGameFromHash();
      if (target && target !== this.currentGameKey) {
        this.switchGame(target);
      }
    });
  }

  startGame() {
    window.toddlerAudio.ensureContext();
    window.toddlerAudio.playCelebration();
    this.startOverlay.classList.add('hidden');

    setTimeout(() => {
      window.toddlerAudio.speak({
        hi: "जय श्री कृष्णा! बाल गोपाला के गुरुकुल में आपका स्वागत है! कोई भी बटन दबाएं!",
        en: "Jai Shri Krishna! Welcome to Bala Gopala's Gurukul! Press any key or tap to play!"
      });
    }, 500);

    const targetGame = this.getGameFromHash();
    this.switchGame(targetGame);
  }

  // BABY MASH ANY-KEY LISTENER
  bindBabyMashKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Prevent browser default behaviors that confuse toddlers
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Backspace', 'Enter'].includes(e.code)) {
        e.preventDefault();
      }

      if (!this.startOverlay.classList.contains('hidden')) {
        this.startGame();
        return;
      }

      if (!this.parentModal.classList.contains('hidden') && e.key === 'Escape') {
        this.parentModal.classList.add('hidden');
        return;
      }

      if (e.ctrlKey || e.altKey) {
        if (e.key === '1') { this.switchGame('bubbles'); return; }
        if (e.key === '2') { this.switchGame('peekaboo'); return; }
        if (e.key === '3') { this.switchGame('xylophone'); return; }
        if (e.key === '4') { this.switchGame('aarti'); return; }
        if (e.key === '5') { this.switchGame('shapes'); return; }
        if (e.key === '6') { this.switchGame('sparkles'); return; }
        if (e.key === '7') { this.switchGame('shringar'); return; }
        if (e.key === '8') { this.switchGame('akshara'); return; }
      }

      this.mashCount++;

      // Trigger the active game's action
      if (this.currentGame && typeof this.currentGame.handleAnyKey === 'function') {
        this.currentGame.handleAnyKey(e.key);
        this.showKeyboardRipple(e.key);
      }

      // Every 5th key mash, play a delightful surprise animal vocalization (except in Akshara game so phonics & chants stay crystal clear)
      if (this.mashCount % 5 === 0 && this.currentGameKey !== 'akshara') {
        const surpriseSounds = [
          () => window.toddlerAudio.playCowMoo(),
          () => window.toddlerAudio.playCalfMoo(),
          () => window.toddlerAudio.playPeacockCall(),
          () => window.toddlerAudio.playKoelCall(),
          () => window.toddlerAudio.playElephantTrumpet(),
          () => window.toddlerAudio.playGhungroo()
        ];
        const soundPick = surpriseSounds[Math.floor(Math.random() * surpriseSounds.length)];
        setTimeout(() => soundPick(), 200);
      }
    });
  }

  // Kanha's Magic Ghungroo Footstep Trails on Touch / Move
  bindKanhaGhungrooFootsteps() {
    const handlePointerAction = (e) => {
      // Discard toddler palm / wrist slaps
      if (ToddlerInputFilter.isPalmSlap(e)) return;

      // Don't trigger if tapping on navigation buttons or modals
      if (e.target.closest('button') || e.target.closest('.interactive-cow-bell') || e.target.closest('.overlay-modal:not(.hidden)')) {
        return;
      }

      const now = performance.now();
      if (now - this.lastFootstepTime > 200) {
        this.lastFootstepTime = now;
        this.footstepToggle = !this.footstepToggle;
        window.toddlerAudio.playGhungroo();
        this.spawnKanhaFootprint(e.clientX, e.clientY, this.footstepToggle ? 15 : -15);
      }
    };

    window.addEventListener('pointerdown', handlePointerAction, { passive: true });
    window.addEventListener('pointermove', (e) => {
      if (e.buttons > 0) handlePointerAction(e); // only while dragging or active touch
    }, { passive: true });
  }

  spawnKanhaFootprint(x, y, angleDeg) {
    const el = this.footprintPool ? this.footprintPool.acquire() : document.createElement('div');
    el.className = 'kanha-footprint-trail';
    el.style.setProperty('--angle', `${angleDeg}deg`);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.innerHTML = VedicAssets.goldenFootprint;
    document.body.appendChild(el);
    if (this.footprintPool) {
      this.footprintPool.releaseAfter(el, 1200);
    } else {
      setTimeout(() => el.remove(), 1200);
    }
  }

  showKeyboardRipple(keyName) {
    const badge = this.ripplePool ? this.ripplePool.acquire() : document.createElement('div');
    badge.className = 'key-mash-ripple';
    badge.textContent = keyName === ' ' ? '⭐' : keyName.toUpperCase();
    badge.style.left = `${Math.random() * 80 + 10}vw`;
    badge.style.top = `${Math.random() * 60 + 20}vh`;
    document.body.appendChild(badge);
    if (this.ripplePool) {
      this.ripplePool.releaseAfter(badge, 700);
    } else {
      setTimeout(() => badge.remove(), 700);
    }
  }

  bindSafetyGestures() {
    // Prevent accidental multi-finger browser zoom or pull-down reload
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());

    // Disable long-press context menu on images and SVGs
    window.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  switchGame(key) {
    if (!this.games[key]) return;

    if (this.currentGame && typeof this.currentGame.stop === 'function') {
      this.currentGame.stop();
    }

    if (!this.isShantiMode && window.toddlerAudio) {
      window.toddlerAudio.stopTanpuraDrone(true);
    }

    this.currentGameKey = key;

    if (window.location.hash !== '#' + key) {
      try {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#' + key);
        } else {
          window.location.hash = key;
        }
      } catch (e) {
        window.location.hash = key;
      }
    }

    this.tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.game === key);
    });

    window.toddlerAudio.playTempleBell(880);

    const GameClass = this.games[key];
    this.currentGame = new GameClass(this.stage);
    this.currentGame.start();

    const welcomePhrases = {
      bubbles: { hi: "माखन मटकी और दही मथानी!", en: "Pop the sweet Makhan pots and churn fresh butter!" },
      peekaboo: { hi: "गऊ धाम! हम्बा और नन्हा बछड़ा!", en: "Vrindavan Gau-Dham! Meet the holy cow and calf!" },
      xylophone: { hi: "कान्हा की बांसुरी और जल तरंग!", en: "Let's play Krishna's Bansuri and Jal Tarang!" },
      aarti: { hi: "संध्या आरती! कोई भी बटन दबाएं!", en: "Sandhya Aarti! Press any key or trace circles!" },
      shapes: { hi: "पुष्पार्चना! कान्हा को पुष्प अर्पित करें!", en: "Pushparchana! Offer sacred flowers to Kanha!" },
      sparkles: { hi: "दीपक ज्योति से दिव्य रंगोली बनाएं!", en: "Draw with glowing Divya Rangoli!" },
      shringar: { hi: "कान्हा श्रृंगार और माखन सेवा! बाल गोपाला को सजाएं!", en: "Kanha Shringar! Adorn little Krishna with love!" },
      akshara: { hi: "दिव्य अक्षर और प्राकृत स्वर! कोई भी कुंजी दबाएं!", en: "Alphabet & Phonics! Press any letter key or tap to hear it speak!" }
    };

    setTimeout(() => {
      if (welcomePhrases[key]) {
        window.toddlerAudio.speak(welcomePhrases[key]);
      }
    }, 300);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn("Fullscreen request error:", err);
      });
      this.fullscreenBtn.textContent = '✖';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.fullscreenBtn.textContent = '⛶';
    }
  }
}

// Start app when DOM is ready
if (typeof window !== 'undefined') {
  window.ToddlerApp = ToddlerApp;
  window.ToddlerInputFilter = ToddlerInputFilter;
  window.addEventListener('DOMContentLoaded', () => {
    window.app = new ToddlerApp();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ToddlerApp, ToddlerInputFilter };
}
