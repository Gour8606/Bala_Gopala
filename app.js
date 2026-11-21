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

    // Guided Daily Journey state (Curated 4-Step Routine: Pranam ➔ Montessori ➔ Music ➔ Shanti)
    this.isJourneyMode = false;
    this.journeySteps = ['aarti', 'matki', 'vadya', 'dhyana'];
    this.journeyStepIndex = 0;

    // Active Age Filter ('all', '1', '2', '3')
    this.currentAgeFilter = 'all';

    // Inactivity Guidance Helper ("Kanha's Guiding Star")
    this.inactivityTimer = null;

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
      akshara: AksharaGame,
      prakriti: PrakritiGame,
      dhyana: DhyanaGame,
      matki: MatkiTowerGame,
      bhuta: PanchaBhutaGame,
      utsava: UtsavaGame,
      vadya: VadyaGame
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
    this.resetInactivityGuidanceTimer();
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
    this.startJourneyBtn = document.getElementById('start-journey-btn');

    // Sidebar Library & Controls
    this.sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    this.sidebar = document.getElementById('games-sidebar');
    this.sidebarBackdrop = document.getElementById('sidebar-backdrop');
    this.sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    this.activeGameIcon = document.getElementById('active-game-icon');
    this.activeGameName = document.getElementById('active-game-name');
    this.ageFilterPills = document.querySelectorAll('.age-filter-pill');

    // Guided Daily Journey Controls
    this.journeyQuickBtn = document.getElementById('journey-quick-btn');
    this.journeyStepBadge = document.getElementById('journey-step-badge');
    this.journeyHeroStartBtn = document.getElementById('journey-card-start-btn');
    this.journeyNextFloatingBtn = document.getElementById('journey-next-floating-btn');

    // Inactivity Guidance Nudge
    this.guidanceNudge = document.getElementById('kanha-guidance-nudge');
    this.nudgeText = document.getElementById('nudge-text');

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
    // 1. Start Overlay Actions
    if (this.startJourneyBtn) {
      this.startJourneyBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.startGuidedJourney();
      });
    }

    const unlockAndStart = (e) => {
      e.preventDefault();
      this.startGame();
    };
    if (this.tapToPlayBtn) {
      this.tapToPlayBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        unlockAndStart(e);
      });
    }
    this.startOverlay.addEventListener('pointerdown', (e) => {
      // If tapped on the backdrop outside the card
      if (e.target === this.startOverlay) {
        unlockAndStart(e);
      }
    });

    // 2. Sidebar Library Drawer Toggle & Close
    if (this.sidebarToggleBtn) {
      this.sidebarToggleBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.isChildLocked) return;
        this.toggleSidebar();
      });
    }
    if (this.sidebarCloseBtn) {
      this.sidebarCloseBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.closeSidebar();
      });
    }
    if (this.sidebarBackdrop) {
      this.sidebarBackdrop.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.closeSidebar();
      });
    }

    // 3. Age & Stage Filter Pills
    if (this.ageFilterPills) {
      this.ageFilterPills.forEach(pill => {
        pill.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          this.filterGamesByAge(pill.dataset.filter);
        });
      });
    }

    // 4. Guided Daily Journey Triggers
    if (this.journeyHeroStartBtn) {
      this.journeyHeroStartBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.startGuidedJourney();
      });
    }
    if (this.journeyQuickBtn) {
      this.journeyQuickBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.isChildLocked) return;
        this.startGuidedJourney();
      });
    }
    if (this.journeyNextFloatingBtn) {
      this.journeyNextFloatingBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.advanceGuidedJourney();
      });
    }

    // 5. Game Mode Tabs (Sidebar Items)
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

    // 6. Inactivity Guidance Timer Reset on any user touch/interaction
    window.addEventListener('pointerdown', () => this.resetInactivityGuidanceTimer(), { passive: true });
    window.addEventListener('keydown', () => this.resetInactivityGuidanceTimer(), { passive: true });

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

      if (this.currentGame && typeof this.currentGame.onLanguageChange === 'function') {
        this.currentGame.onLanguageChange(next);
      } else if (this.currentGame && typeof this.currentGame.render === 'function') {
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
      bubbles: { hi: 'माखन मटकी', en: 'Makhan Pop', sub: { hi: 'मटकी फोड़ें व माखन निकालें', en: 'Butter Pots & Churning' } },
      peekaboo: { hi: 'गऊ सेवा', en: 'Gau-Seva', sub: { hi: 'पवित्र गऊ व नन्हा बछड़ा', en: 'Holy Cow & Calf Peekaboo' } },
      xylophone: { hi: 'बांसुरी व जल', en: 'Bansuri & Jal', sub: { hi: 'शास्त्रीय राग व जल तरंग', en: 'Classical Ragas & Water Bowls' } },
      aarti: { hi: 'संध्या आरती', en: 'Sandhya Aarti', sub: { hi: 'दीपक ज्योति व घंटी नाद', en: 'Diya Circular Offering' } },
      shapes: { hi: 'पुष्पार्चना', en: 'Pushparchana', sub: { hi: 'पुष्प आकार व रंग मिलान', en: 'Flower Shape & Color Match' } },
      sparkles: { hi: 'दिव्य रंगोली', en: 'Divya Rangoli', sub: { hi: 'दीपक ज्योति व प्रकाश रेखा', en: 'Glowing Light Painting' } },
      shringar: { hi: 'कान्हा श्रृंगार', en: 'Shringar', sub: { hi: 'स्नान, चन्दन व मोर पंख', en: 'Sacred Snana & Royal Adornment' } },
      akshara: { hi: 'दिव्य अक्षर', en: 'Akshara', sub: { hi: 'अ आ इ ई, A-Z व १-१० गिनती', en: 'Devanagari/English & 1-10 Counting' } },
      prakriti: { hi: 'प्रकृति सेवा', en: 'Prakriti Care', sub: { hi: 'तुलसी सिंचन व ४-रंग टोकरी', en: 'Tulsi Nurture & 4-Color Sort' } },
      dhyana: { hi: 'ध्यान व भाव', en: 'Mindfulness', sub: { hi: 'कमल प्राणायाम व ५ पावन भाव', en: 'Mindful Breathing & 5 Sacred Emotions' } },
      matki: { hi: 'मटकी शिखर', en: 'Matki Tower', sub: { hi: 'मोंटेसरी आकार व संतुलन', en: 'Montessori Pink Tower Seriation' } },
      bhuta: { hi: 'पंच महाभूत', en: 'Pancha Bhuta', sub: { hi: 'पृथ्वी, जल, अग्नि, वायु, आकाश', en: 'Earth, Water, Fire, Air & Space' } },
      utsava: { hi: 'उत्सव व झूला', en: 'Festivals', sub: { hi: 'जन्माष्टमी झूला व फूलों की होली', en: 'Janmashtami Swing & Holi Flowers' } },
      vadya: { hi: 'दिव्य वाद्य', en: 'Instruments', sub: { hi: 'वीणा, मृदंग, बांसुरी व मंजीरा', en: 'Veena, Mridangam & Manjira Taal' } }
    };

    if (this.tabs) {
      this.tabs.forEach(tab => {
        const gameKey = tab.dataset.game;
        if (tabTranslations[gameKey]) {
          const span = tab.querySelector('.tab-text');
          if (span) {
            span.textContent = tabTranslations[gameKey][lang] || tabTranslations[gameKey].en;
          }
          const subSpan = tab.querySelector('.tab-sub');
          if (subSpan && tabTranslations[gameKey].sub) {
            subSpan.textContent = tabTranslations[gameKey].sub[lang] || tabTranslations[gameKey].sub.en;
          }
        }
      });
    }

    if (this.langIndicator) {
      this.langIndicator.textContent = lang === 'hi' ? '🇮🇳 हिन्दी' : '🌐 English';
    }

    const toggleLabel = document.getElementById('toggle-library-label');
    if (toggleLabel) {
      toggleLabel.textContent = lang === 'hi' ? 'खेल (14 Games)' : 'Games (14)';
    }

    const sidebarTitle = document.getElementById('sidebar-title-text');
    if (sidebarTitle) {
      sidebarTitle.textContent = lang === 'hi' ? 'लीला संगम (14 Games)' : 'Play Library (14 Games)';
    }

    const journeyNavLabel = document.getElementById('journey-nav-label');
    if (journeyNavLabel) {
      journeyNavLabel.textContent = lang === 'hi' ? 'दैनिक यात्रा' : 'Daily Journey';
    }

    const journeyDesc = document.getElementById('journey-card-desc');
    if (journeyDesc) {
      journeyDesc.textContent = lang === 'hi' ? 'दैनिक लीला: १. आरती ➔ २. मोंटेसरी ➔ ३. संगीत ➔ ४. ध्यान' : 'Curated 4-Step Routine: Pranam ➔ Montessori ➔ Music ➔ Shanti';
    }

    if (this.activeGameName && tabTranslations[this.currentGameKey]) {
      this.activeGameName.textContent = tabTranslations[this.currentGameKey][lang] || tabTranslations[this.currentGameKey].en;
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
        if (e.key === '9') { this.switchGame('prakriti'); return; }
        if (e.key === '0') { this.switchGame('dhyana'); return; }
        if (e.key === '-' || e.key.toLowerCase() === 'm') { this.switchGame('matki'); return; }
        if (e.key === '=' || e.key.toLowerCase() === 'b') { this.switchGame('bhuta'); return; }
        if (e.key === '[' || e.key.toLowerCase() === 'u') { this.switchGame('utsava'); return; }
        if (e.key === ']' || e.key.toLowerCase() === 'v') { this.switchGame('vadya'); return; }
      }

      this.mashCount++;

      // Trigger the active game's action
      if (this.currentGame && typeof this.currentGame.handleAnyKey === 'function') {
        this.currentGame.handleAnyKey(e.key);
        this.showKeyboardRipple(e.key);
      }

      // Every 5th key mash, play a delightful surprise animal vocalization (except in Akshara, Dhyana, Xylophone, & Vadya so phonics, mindfulness, and sacred music stay uninterrupted)
      const musicAndCalmGames = ['akshara', 'dhyana', 'xylophone', 'vadya'];
      if (this.mashCount % 5 === 0 && musicAndCalmGames.indexOf(this.currentGameKey) === -1) {
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
      const isActive = (t.dataset.game === key);
      t.classList.toggle('active', isActive);
      if (isActive && typeof t.scrollIntoView === 'function') {
        try {
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } catch (e) {}
      }
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
      akshara: { hi: "दिव्य अक्षर और प्राकृत स्वर! कोई भी कुंजी दबाएं!", en: "Alphabet & Phonics! Press any letter key or tap to hear it speak!" },
      prakriti: { hi: "प्रकृति सेवा और पुष्प संगम! तुलसी मैया की सेवा करें!", en: "Prakriti Care & Nature Harmony! Nurture holy Tulsi and sort sacred flowers!" },
      dhyana: { hi: "ध्यान, प्राणायाम व नवरस! शांत मन और गहरी श्वास!", en: "Mindfulness, Pranayama & Emotions! Breathe deeply and find inner calm!" },
      matki: { hi: "गोपाला मटकी शिखर! सबसे बड़ा मटका नीचे रखकर शिखर बनाएं!", en: "Gopala's Butter Pot Tower! Build the tower by placing the largest pot at the bottom!" },
      bhuta: { hi: "पंच महाभूत दर्शन! पृथ्वी, जल, अग्नि, वायु और आकाश का आदर करें!", en: "The Five Sacred Elements! Discover Earth, Water, Fire, Air and Space in harmony!" },
      utsava: { hi: "भारत के दिव्य उत्सव! कान्हा का झूला झुलाएं और फूलों की होली खेलें!", en: "Festivals of India! Gently rock Kanha's swing and celebrate with fragrant flowers!" },
      vadya: { hi: "भारतीय वाद्य संगीत! वीणा, मृदंग, बांसुरी और मंजीरा बजाएं!", en: "Indian Classical & Sacred Instruments! Tap to play the Veena, Mridangam, Bansuri and Manjira!" }
    };

    // Update active game pill in top navbar
    const gameIcons = {
      bubbles: '🍯', peekaboo: '🐮', xylophone: '🪈', aarti: '🪔',
      shapes: '🪷', sparkles: '✨', shringar: '👑', akshara: '🔤',
      prakriti: '🌿', dhyana: '🧘', matki: '🏺', bhuta: '🌍',
      utsava: '🪢', vadya: '🪕'
    };
    if (this.activeGameIcon && gameIcons[key]) {
      this.activeGameIcon.textContent = gameIcons[key];
    }
    if (this.activeGameName) {
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const names = {
        bubbles: { hi: 'माखन मटकी', en: 'Makhan Pop' },
        peekaboo: { hi: 'गऊ सेवा', en: 'Gau-Seva' },
        xylophone: { hi: 'बांसुरी व जल', en: 'Bansuri & Jal' },
        aarti: { hi: 'संध्या आरती', en: 'Sandhya Aarti' },
        shapes: { hi: 'पुष्पार्चना', en: 'Pushparchana' },
        sparkles: { hi: 'दिव्य रंगोली', en: 'Divya Rangoli' },
        shringar: { hi: 'कान्हा श्रृंगार', en: 'Shringar' },
        akshara: { hi: 'दिव्य अक्षर', en: 'Akshara' },
        prakriti: { hi: 'प्रकृति सेवा', en: 'Prakriti Care' },
        dhyana: { hi: 'ध्यान व भाव', en: 'Mindfulness' },
        matki: { hi: 'मटकी शिखर', en: 'Matki Tower' },
        bhuta: { hi: 'पंच महाभूत', en: 'Pancha Bhuta' },
        utsava: { hi: 'उत्सव व झूला', en: 'Festivals' },
        vadya: { hi: 'दिव्य वाद्य', en: 'Instruments' }
      };
      if (names[key]) {
        this.activeGameName.textContent = names[key][lang] || names[key].en;
      }
    }

    // Auto-close sidebar drawer on screens < 1024px for full immersion
    if (window.innerWidth < 1024) {
      this.closeSidebar();
    }

    // Reset inactivity guidance timer
    this.resetInactivityGuidanceTimer();

    setTimeout(() => {
      if (welcomePhrases[key]) {
        window.toddlerAudio.speak(welcomePhrases[key]);
      }
    }, 300);
  }

  // Sidebar Controls
  toggleSidebar(forceState) {
    if (!this.sidebar) return;
    const isCurrentlyOpen = this.sidebar.classList.contains('open');
    const newState = (forceState !== undefined) ? forceState : !isCurrentlyOpen;
    this.sidebar.classList.toggle('open', newState);
    if (this.sidebarBackdrop) {
      this.sidebarBackdrop.classList.toggle('hidden', !newState);
    }
    if (window.toddlerAudio) {
      window.toddlerAudio.playJhulaChime(newState ? 880 : 660);
    }
  }

  closeSidebar() {
    this.toggleSidebar(false);
  }

  // Age & Stage Filter
  filterGamesByAge(ageFilter) {
    this.currentAgeFilter = ageFilter || 'all';
    if (this.ageFilterPills) {
      this.ageFilterPills.forEach(pill => {
        pill.classList.toggle('active', pill.dataset.filter === this.currentAgeFilter);
      });
    }

    // Filter tab buttons in sidebar
    if (this.tabs) {
      this.tabs.forEach(tab => {
        const tabAge = tab.dataset.age;
        const matches = (this.currentAgeFilter === 'all' || tabAge === this.currentAgeFilter);
        tab.classList.toggle('filtered-out', !matches);
      });
    }

    // Filter category headers in sidebar
    const catHeaders = document.querySelectorAll('.sidebar-category-header');
    if (catHeaders) {
      catHeaders.forEach(header => {
        const cat = header.dataset.cat;
        const matches = (this.currentAgeFilter === 'all' || cat === this.currentAgeFilter);
        header.classList.toggle('filtered-out', !matches);
      });
    }

    if (window.toddlerAudio) {
      window.toddlerAudio.playTempleBell(987.77);
    }
  }

  // Guided Daily Journey (Curated 4-Step Routine: Pranam ➔ Montessori ➔ Music ➔ Shanti)
  startGuidedJourney() {
    this.isJourneyMode = true;
    this.journeyStepIndex = 0;
    this.closeSidebar();
    if (this.startOverlay && !this.startOverlay.classList.contains('hidden')) {
      this.startGame();
    }
    const firstGame = this.journeySteps[0]; // 'aarti'
    this.switchGame(firstGame);
    this.updateJourneyUI();

    const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
    const msg = {
      hi: "दैनिक लीला यात्रा प्रारम्भ! पहला चरण: संध्या आरती!",
      en: "Daily Journey started! Step 1: Sandhya Aarti devotion!"
    };
    if (window.toddlerAudio) {
      window.toddlerAudio.speak(msg);
      window.toddlerAudio.playJhulaChime(1046.5);
    }
  }

  advanceGuidedJourney() {
    if (!this.isJourneyMode) return;
    this.journeyStepIndex++;
    if (this.journeyStepIndex < this.journeySteps.length) {
      const nextGame = this.journeySteps[this.journeyStepIndex];
      this.switchGame(nextGame);
      this.updateJourneyUI();
      if (window.toddlerAudio) {
        window.toddlerAudio.playJhulaChime(1174.66);
      }
    } else {
      // Completed all 4 steps of the Journey!
      this.celebrateJourneyCompletion();
    }
  }

  updateJourneyUI() {
    if (this.journeyStepBadge) {
      this.journeyStepBadge.textContent = `${this.journeyStepIndex + 1} / ${this.journeySteps.length}`;
    }
    if (this.journeyNextFloatingBtn) {
      this.journeyNextFloatingBtn.classList.remove('hidden');
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const label = document.getElementById('journey-floating-label');
      if (label) {
        const isLast = (this.journeyStepIndex === this.journeySteps.length - 1);
        label.textContent = isLast ? (lang === 'hi' ? 'यात्रा पूर्ण करें ✨ (Finish)' : 'Complete Journey ✨') : (lang === 'hi' ? 'अगला खेल ➜ (Next Step)' : 'Next Step ➜');
      }
    }
  }

  celebrateJourneyCompletion() {
    this.isJourneyMode = false;
    if (this.journeyNextFloatingBtn) {
      this.journeyNextFloatingBtn.classList.add('hidden');
    }
    if (this.journeyStepBadge) {
      this.journeyStepBadge.textContent = `4 / 4 ✨`;
    }

    // Shower of flower petals
    if (typeof CelebrationPetalShower !== 'undefined') {
      const shower = new CelebrationPetalShower(this.stage);
      shower.burst(60);
    }

    if (window.toddlerAudio) {
      window.toddlerAudio.playBansuri(523.25, 0.5);
      setTimeout(() => window.toddlerAudio.playBansuri(659.25, 0.6), 250);
      setTimeout(() => window.toddlerAudio.playBansuri(783.99, 0.8), 500);

      window.toddlerAudio.speak({
        hi: "अद्भुत! दैनिक लीला यात्रा पूर्ण हुई! जय श्री कृष्णा!",
        en: "Wonderful! You completed the sacred daily journey! Jai Shri Krishna!"
      });
    }
  }

  // Inactivity Guidance Helper ("Kanha's Guiding Star")
  resetInactivityGuidanceTimer() {
    if (this.guidanceNudge) {
      this.guidanceNudge.classList.add('hidden');
    }
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }

    // Trigger after 8 seconds of inactivity
    this.inactivityTimer = setTimeout(() => {
      this.showGuidanceNudge();
    }, 8000);
  }

  showGuidanceNudge() {
    if (this.isChildLocked || (this.startOverlay && !this.startOverlay.classList.contains('hidden'))) return;
    if (this.guidanceNudge) {
      this.guidanceNudge.classList.remove('hidden');
      const hints = {
        bubbles: { hi: "मटकी छुओ और माखन निकालो! 🍯", en: "Tap the pot to pop sweet butter! 🍯" },
        peekaboo: { hi: "गऊ मैया को पुकारो! 🐮", en: "Call holy Gau Mata! 🐮" },
        xylophone: { hi: "बांसुरी बजाओ! 🪈", en: "Play sweet bansuri notes! 🪈" },
        aarti: { hi: "दीपक को घुमाएं! 🪔", en: "Wave the golden aarti diya! 🪔" },
        shapes: { hi: "पुष्प को कान्हा पर सजाएं! 🪷", en: "Offer flowers to Kanha! 🪷" },
        sparkles: { hi: "उंगली से रंगोली बनाएं! ✨", en: "Draw glowing patterns! ✨" },
        shringar: { hi: "कान्हा को मोर पंख पहनाएं! 👑", en: "Adorn Kanha with love! 👑" },
        akshara: { hi: "अक्षर छुओ और सुनो! 🔤", en: "Touch any letter to hear it! 🔤" },
        prakriti: { hi: "तुलसी मैया को जल दें! 🌿", en: "Nurture holy Tulsi! 🌿" },
        dhyana: { hi: "कमल के साथ गहरी सांस लें! 🧘", en: "Breathe gently with the lotus! 🧘" },
        matki: { hi: "मटकी जोड़कर शिखर बनाएं! 🏺", en: "Stack pots to build tower! 🏺" },
        bhuta: { hi: "पंच तत्वों को छुएं! 🌍", en: "Explore sacred elements! 🌍" },
        utsava: { hi: "कान्हा का झूला झुलाएं! 🪢", en: "Gently swing Kanha's jhula! 🪢" },
        vadya: { hi: "वीणा या मृदंग बजाओ! 🪕", en: "Play holy Veena or Mridangam! 🪕" }
      };
      const lang = (window.toddlerAudio && window.toddlerAudio.currentLanguage) ? window.toddlerAudio.currentLanguage : 'hi';
      const prompt = hints[this.currentGameKey] || { hi: "यहाँ छुओ! खेलो कान्हा के संग!", en: "Tap here to play with Kanha!" };
      if (this.nudgeText) {
        this.nudgeText.textContent = prompt[lang] || prompt.en;
      }
      if (window.toddlerAudio) {
        window.toddlerAudio.playJhulaChime(880);
      }
    }
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
