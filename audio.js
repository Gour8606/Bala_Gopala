/**
 * Toddler Wonderland - Vedic Classical Audio Engine (Enhanced Edition)
 * Procedural Web Audio API: Authentic Cow Moo (Hambaaa), Calf Moo,
 * Peacock Call (Pee-hu), Elephant Trumpet, Koel, Ghungroo (Ankle Bells),
 * Temple Bells, Bansuri, Shankha, Damru, Jal Tarang, Butter Churning,
 * Tanpura Drone, and Bilingual Speech Synthesizer.
 */

class ToddlerAudio {
  constructor() {
    this.ctx = null;
    this.limiter = null;
    this.masterGain = null;
    this.isMuted = false;
    this.speechEnabled = true;
    this.currentLanguage = 'hi';
    this.tanpuraNode = null;
    this.tanpuraGain = null;
    this.isTanpuraPlaying = false;
    this.scaleMode = 'bhupali';
    this.cachedVoices = [];
    this.initAudioContext();
    this.initSpeechVoices();
    this.bindLifecycleListeners();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Commercial Hearing Safety: Dynamic Range Compressor & Soft Limiter
        // Protects toddler ears from sudden volume bursts or simultaneous key-mash spikes
        this.limiter = this.ctx.createDynamicsCompressor();
        this.limiter.threshold.setValueAtTime(-12, this.ctx.currentTime);
        this.limiter.knee.setValueAtTime(10, this.ctx.currentTime);
        this.limiter.ratio.setValueAtTime(8, this.ctx.currentTime);
        this.limiter.attack.setValueAtTime(0.003, this.ctx.currentTime);
        this.limiter.release.setValueAtTime(0.25, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);

        this.masterGain.connect(this.limiter);
        this.limiter.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  getDestination() {
    if (this.masterGain) return this.masterGain;
    if (this.limiter) return this.limiter;
    return this.ctx ? this.ctx.destination : null;
  }

  initSpeechVoices() {
    if ('speechSynthesis' in window) {
      const load = () => {
        try {
          this.cachedVoices = window.speechSynthesis.getVoices() || [];
        } catch (e) {}
      };
      load();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }
  }

  bindLifecycleListeners() {
    // Automatically manage AudioContext on tab switch / device sleep
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.ctx && this.ctx.state === 'running') {
          // Keep tanpura running if shanti mode, otherwise pause to save battery
        }
      } else {
        this.ensureContext();
      }
    });

    // Auto resume context on any first interaction
    const unlock = () => {
      this.ensureContext();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
  }

  ensureContext() {
    if (!this.ctx) {
      this.initAudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.warn("Context resume failed:", e));
    }
  }

  setMasterVolume(val) {
    if (!this.masterGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, val));
    this.masterGain.gain.linearRampToValueAtTime(clamped, this.ctx.currentTime + 0.05);
  }

  vibrate(pattern = 15) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }

  // Pure Yamuna Water Splash (Snana & Jal Khela)
  playWaterSplash() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(20);

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(450, t + 0.24);
    filter.Q.setValueAtTime(2.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    noise.start(t);
    noise.stop(t + 0.25);
  }

  playRandomEncouragement() {
    const praises = [
      { hi: "अति सुन्दर! नन्हे कान्हा!", en: "Wonderful! Little Kanha!" },
      { hi: "शाबाश! राधे राधे!", en: "Great job! Radhe Radhe!" },
      { hi: "हरि बोल! अति शुभम्!", en: "Hari Bol! Auspicious and sweet!" },
      { hi: "जय श्री कृष्णा! बहुत अच्छे!", en: "Jai Shri Krishna! Very well done!" },
      { hi: "आनन्द ही आनन्द!", en: "Pure bliss and joy!" }
    ];
    const pick = praises[Math.floor(Math.random() * praises.length)];
    this.speak(pick);
  }

  makeDistortionCurve(amount = 20) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // =========================================================================
  // AUTHENTIC ANIMAL SOUNDS (Bala Krishna's Vrindavan Animal Friends)
  // =========================================================================

  // 1. Authentic Realistic Cow Moo (Gau Mata: "Hambaaa~")
  playCowMoo() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(25);

    const t = this.ctx.currentTime;
    const duration = 1.9;

    // Vocal cord oscillator: Sawtooth for rich bovine harmonics
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';

    // Pitch trajectory: starts low ~110Hz, rises to ~150Hz, sustained vibrato, falls to ~95Hz
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.linearRampToValueAtTime(148, t + 0.35);
    osc.frequency.setValueAtTime(145, t + 1.15);
    osc.frequency.exponentialRampToValueAtTime(95, t + duration);

    // Warm throat vibrato (4.8 Hz)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(4.8, t);
    vibratoGain.gain.setValueAtTime(3.5, t);
    vibratoGain.gain.linearRampToValueAtTime(6.0, t + 0.5);
    vibratoGain.gain.linearRampToValueAtTime(2.0, t + duration);
    vibrato.connect(osc.frequency);

    // Formant 1: Chest resonance (~420Hz)
    const f1 = this.ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(380, t);
    f1.frequency.linearRampToValueAtTime(480, t + 0.4);
    f1.frequency.linearRampToValueAtTime(360, t + duration);
    f1.Q.setValueAtTime(3.2, t);

    // Formant 2: Mouth/Muzzle vowel transition (/u/ to /o/ around 800Hz)
    const f2 = this.ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(750, t);
    f2.frequency.linearRampToValueAtTime(920, t + 0.4);
    f2.frequency.linearRampToValueAtTime(700, t + duration);
    f2.Q.setValueAtTime(2.5, t);

    // Formant 3: Nasal resonance (~1250Hz)
    const f3 = this.ctx.createBiquadFilter();
    f3.type = 'peaking';
    f3.frequency.setValueAtTime(1250, t);
    f3.gain.setValueAtTime(4.0, t);
    f3.Q.setValueAtTime(3.0, t);

    // Soft saturation for vocal cord warmth
    const shaper = this.ctx.createWaveShaper();
    shaper.curve = this.makeDistortionCurve(12);

    // Master Amplitude Envelope
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.48, t + 0.28);
    gain.gain.setValueAtTime(0.44, t + 1.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(shaper);
    shaper.connect(f1);
    f1.connect(f2);
    f2.connect(f3);
    f3.connect(gain);
    gain.connect(this.getDestination());

    vibrato.start(t);
    osc.start(t);
    vibrato.stop(t + duration);
    osc.stop(t + duration);

    // Accompanying cow bell jingle
    setTimeout(() => this.playCowBell(), 300);
  }

  // 2. Adorable Baby Calf Moo (Bachhda: "Maaa-aaa~")
  playCalfMoo() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(20);

    const t = this.ctx.currentTime;
    const duration = 1.15;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';

    // Higher baby fundamental: 250Hz -> 340Hz -> 210Hz
    osc.frequency.setValueAtTime(250, t);
    osc.frequency.linearRampToValueAtTime(340, t + 0.25);
    osc.frequency.setValueAtTime(330, t + 0.65);
    osc.frequency.exponentialRampToValueAtTime(210, t + duration);

    // Rapid baby vocal tremolo (7.2 Hz)
    const trem = this.ctx.createOscillator();
    const tremGain = this.ctx.createGain();
    trem.frequency.setValueAtTime(7.2, t);
    tremGain.gain.setValueAtTime(8.0, t);
    trem.connect(osc.frequency);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(850, t);
    filter.frequency.linearRampToValueAtTime(1100, t + 0.3);
    filter.frequency.linearRampToValueAtTime(750, t + duration);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.42, t + 0.15);
    gain.gain.setValueAtTime(0.38, t + 0.65);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    trem.start(t);
    osc.start(t);
    trem.stop(t + duration);
    osc.stop(t + duration);
  }

  // 3. Brass Cow Bell (Gau Ghanti)
  playCowBell() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    const partials = [
      { f: 587.33, g: 0.32, d: 1.2 }, // D5
      { f: 880.00, g: 0.24, d: 0.9 }, // A5
      { f: 1420.0, g: 0.12, d: 0.6 }
    ];

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(p.f, t);
      gain.gain.setValueAtTime(p.g, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + p.d);
      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t);
      osc.stop(t + p.d);
    });
  }

  // 4. Grass Chewing / Grazing Sound (Chomp & Crunch)
  playGrassChew() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    [0, 0.22, 0.44].forEach(st => {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1700, t + st);
      filter.Q.setValueAtTime(3.2, t + st);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, t + st);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.11);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.getDestination());

      noise.start(t + st);
      noise.stop(t + st + 0.12);
    });
  }

  // 5. Royal Peacock Call (Mayur: "Pee-hu! Pee-hu!")
  playPeacockCall() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;

    // "Pee" (high rising trumpet)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(1750, t);
    osc1.frequency.exponentialRampToValueAtTime(2600, t + 0.22);

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(2200, t);
    filter1.Q.setValueAtTime(4.0, t);

    gain1.gain.setValueAtTime(0.01, t);
    gain1.gain.linearRampToValueAtTime(0.36, t + 0.08);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.getDestination());
    osc1.start(t);
    osc1.stop(t + 0.3);

    // "Huuu" (descending resonant glide)
    const t2 = t + 0.28;
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(2400, t2);
    osc2.frequency.exponentialRampToValueAtTime(1350, t2 + 0.45);

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(1800, t2);
    filter2.Q.setValueAtTime(3.5, t2);

    gain2.gain.setValueAtTime(0.01, t2);
    gain2.gain.linearRampToValueAtTime(0.38, t2 + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.48);

    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.getDestination());
    osc2.start(t2);
    osc2.stop(t2 + 0.5);
  }

  // 6. Elephant Trumpet (Gajaraj)
  playElephantTrumpet() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.linearRampToValueAtTime(560, t + 0.3);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.7);

    // Heavy brass flutter vibrato (16 Hz)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(16, t);
    lfoGain.gain.setValueAtTime(32, t);
    lfo.connect(osc.frequency);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.42, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.75);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + 0.78);
    osc.stop(t + 0.78);
  }

  // 7. Sweet Cuckoo (Koel: "Koo-hoo!")
  playKoelCall() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    [0, 0.32].forEach((st, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const baseFreq = 740 + idx * 40;
      osc.frequency.setValueAtTime(baseFreq, t + st);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.35, t + st + 0.2);

      gain.gain.setValueAtTime(0.01, t + st);
      gain.gain.linearRampToValueAtTime(0.32, t + st + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.24);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + st);
      osc.stop(t + st + 0.25);
    });
  }

  // 8. Kanha's Silver Ankle Bells (Ghungroo Chham-Chham)
  playGhungroo() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    const bells = [3500, 4200, 4900, 5600, 6400];
    bells.forEach((f, idx) => {
      const delay = idx * 0.014;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f + Math.random() * 80, t + delay);
      gain.gain.setValueAtTime(0.09, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.14);
      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + delay);
      osc.stop(t + delay + 0.15);
    });
  }

  // 8b. Vrindavan Parrot (Shuka / Tota - Vidhya 42)
  playShukaCall() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const t = this.ctx.currentTime;
    // Cheerful high dual chirps: "Mithu! Mithu!"
    [0, 0.18].forEach((st) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, t + st);
      osc.frequency.exponentialRampToValueAtTime(2400, t + st + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1600, t + st + 0.14);

      gain.gain.setValueAtTime(0.01, t + st);
      gain.gain.linearRampToValueAtTime(0.28, t + st + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.14);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + st);
      osc.stop(t + st + 0.15);
    });
  }

  // 8c. Gentle Forest Deer (Mriga Bleat)
  playDeerCall() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(15);

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.linearRampToValueAtTime(540, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(380, t + 0.45);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, t);
    filter.Q.setValueAtTime(3.0, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());
    osc.start(t);
    osc.stop(t + 0.48);
  }

  // 8d. Playful Vrindavan Monkey (Vanar Giggle)
  playMonkeySound() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const t = this.ctx.currentTime;
    // Rapid staccato vocal chattering
    [0, 0.1, 0.2].forEach((st, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(500 + idx * 80, t + st);
      osc.frequency.exponentialRampToValueAtTime(800 + idx * 100, t + st + 0.07);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t + st);
      filter.Q.setValueAtTime(2.5, t + st);

      gain.gain.setValueAtTime(0.01, t + st);
      gain.gain.linearRampToValueAtTime(0.24, t + st + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + st);
      osc.stop(t + st + 0.09);
    });
  }

  // 8e. Sacred Manjira / Khartal (Brass Finger Cymbals)
  playManjira() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(20);

    const t = this.ctx.currentTime;
    const partials = [2850, 3720, 5100, 6800];
    partials.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.18 / (idx + 1), t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t);
      osc.stop(t + 1.45);
    });
  }

  // 8f. Divine Flute Phrase (For Kanha Shringar Celebration)
  playDivineFlutePhrase() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    // Sweet phrase: Pa - Dha - Sȧ - Rė
    const notes = [
      { f: 392.00, d: 0.18 }, // Pa
      { f: 440.00, d: 0.18 }, // Dha
      { f: 523.25, d: 0.22 }, // Sȧ
      { f: 587.33, d: 0.45 }  // Rė
    ];
    let offset = 0;
    notes.forEach((n) => {
      setTimeout(() => {
        if (!this.isMuted) this.playBansuri(n.f);
      }, offset * 1000);
      offset += n.d;
    });
  }

  // 8g. Adorable Baby Giggle (When Kanha is fed butter or tickled)
  playBabyGiggle() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate([15, 30, 15]);

    const t = this.ctx.currentTime;
    // 3 bouncy ascending giggles
    [0, 0.12, 0.24, 0.36].forEach((st, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const base = 480 + (i % 2 === 0 ? 0 : 80);
      osc.frequency.setValueAtTime(base, t + st);
      osc.frequency.exponentialRampToValueAtTime(base * 1.35, t + st + 0.08);

      gain.gain.setValueAtTime(0.01, t + st);
      gain.gain.linearRampToValueAtTime(0.22, t + st + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.1);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + st);
      osc.stop(t + st + 0.11);
    });
  }

  // 8h. Melodic Pentatonic Pop (Ascending scale as bubbles pop)
  playAscendingPop(step = 0) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(15);

    // Pentatonic Raga Bhupali frequencies: Sa Re Ga Pa Dha Sȧ Rė Gȧ
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    const freq = scale[step % scale.length];

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.5, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.12);

    gain.gain.setValueAtTime(0.32, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.getDestination());
    osc.start(t);
    osc.stop(t + 0.24);
  }

  // 9. Yashoda Maiya's Butter Churning (Dahi Mathani Slosh)
  playChurningSound() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(170, t);
    osc.frequency.exponentialRampToValueAtTime(75, t + 0.18);

    gain.gain.setValueAtTime(0.38, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.15);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.32, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(this.getDestination());
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.getDestination());

    osc.start(t);
    noise.start(t);
    osc.stop(t + 0.22);
    noise.stop(t + 0.22);
  }

  // =========================================================================
  // SACRED TEMPLE & INSTRUMENTAL SOUNDS
  // =========================================================================

  // 10. Mandir Ghanti (Temple Bell with Brass Overtones)
  playTempleBell(freq = 1046.5) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(22);

    const t = this.ctx.currentTime;
    const partials = [
      { f: freq * 1.0, g: 0.35, d: 2.6 },
      { f: freq * 1.52, g: 0.22, d: 2.0 },
      { f: freq * 2.1, g: 0.16, d: 1.6 },
      { f: freq * 3.4, g: 0.08, d: 0.9 },
      { f: freq * 0.5, g: 0.15, d: 2.8 }
    ];

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.f, t);

      gain.gain.setValueAtTime(p.g, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + p.d);

      osc.connect(gain);
      gain.connect(this.getDestination());

      osc.start(t);
      osc.stop(t + p.d + 0.1);
    });
  }

  // 11. Shankha (Sacred Conch Swell)
  playShankha() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.linearRampToValueAtTime(262, t + 0.3);
    osc.frequency.setValueAtTime(262, t + 1.0);
    osc.frequency.exponentialRampToValueAtTime(200, t + 1.8);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(520, t);
    filter.Q.setValueAtTime(4.0, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.35);
    gain.gain.setValueAtTime(0.38, t + 1.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    osc.start(t);
    osc.stop(t + 1.85);
  }

  // 12. Bansuri (Lord Krishna's Bamboo Flute with Meend Glide)
  playBansuri(freq = 440) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    osc.frequency.setValueAtTime(freq * 0.96, t);
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.08);

    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(5.5, t);
    lfoGain.gain.setValueAtTime(freq * 0.015, t);
    lfo.connect(osc.frequency);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    osc.connect(gain);
    gain.connect(this.getDestination());

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + 1.3);
    osc.stop(t + 1.3);
  }

  // 13. Jal Tarang (Porcelain Water Bowl Resonance - Udaka Vadya Art 12)
  playJalTarang(freq = 659.25) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, t);

    gain1.gain.setValueAtTime(0.38, t);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);

    gain2.gain.setValueAtTime(0.12, t);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.getDestination());
    gain2.connect(this.getDestination());

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 1.2);
    osc2.stop(t + 0.4);
  }

  // 14. Damru (Shiva's Double-Beat Rhythm)
  playDamru() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    [0, 0.12].forEach(st => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t + st);
      osc.frequency.exponentialRampToValueAtTime(90, t + st + 0.09);

      gain.gain.setValueAtTime(0.5, t + st);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.1);

      osc.connect(gain);
      gain.connect(this.getDestination());

      osc.start(t + st);
      osc.stop(t + st + 0.11);
    });
  }

  // 15. Makhan Pot Pop (Playful Butter Splash)
  playMakhanPop() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(15);

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.08);
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    const bub = this.ctx.createOscillator();
    const bubGain = this.ctx.createGain();
    bub.type = 'sine';
    bub.frequency.setValueAtTime(450, t + 0.03);
    bub.frequency.exponentialRampToValueAtTime(950, t + 0.12);
    bubGain.gain.setValueAtTime(0.3, t + 0.03);
    bubGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.getDestination());
    bub.connect(bubGain);
    bubGain.connect(this.getDestination());

    osc.start(t);
    bub.start(t + 0.03);
    osc.stop(t + 0.1);
    bub.stop(t + 0.15);
  }

  // 16. Aarti Chimes
  playAartiChimes() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const delay = idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + delay);

      gain.gain.setValueAtTime(0.18, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.5);

      osc.connect(gain);
      gain.connect(this.getDestination());

      osc.start(t + delay);
      osc.stop(t + delay + 0.55);
    });
  }

  // 17. Meditative Tanpura Drone (432Hz Sa-Pa)
  startTanpuraDrone() {
    if (this.isMuted || !this.ctx || this.isTanpuraPlaying) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    const notes = [130.81, 196.00, 261.63, 261.63];

    this.tanpuraGain = this.ctx.createGain();
    this.tanpuraGain.gain.setValueAtTime(0.01, t);
    this.tanpuraGain.gain.linearRampToValueAtTime(0.12, t + 2.0);
    this.tanpuraGain.connect(this.getDestination());

    this.tanpuraOscs = notes.map((f, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + i * 50, t);

      osc.connect(filter);
      filter.connect(this.tanpuraGain);
      osc.start(t);
      return osc;
    });

    this.isTanpuraPlaying = true;
  }

  stopTanpuraDrone() {
    if (!this.isTanpuraPlaying || !this.tanpuraGain) return;
    const t = this.ctx.currentTime;
    this.tanpuraGain.gain.linearRampToValueAtTime(0.001, t + 1.0);
    setTimeout(() => {
      if (this.tanpuraOscs) {
        this.tanpuraOscs.forEach(o => { try { o.stop(); } catch(e){} });
        this.tanpuraOscs = null;
      }
      this.isTanpuraPlaying = false;
    }, 1100);
  }

  // 18. Bilingual Speech Synthesizer
  speak(textObject) {
    if (this.isMuted || !this.speechEnabled || !('speechSynthesis' in window)) return;

    let textToSpeak = typeof textObject === 'string' ? textObject : (textObject[this.currentLanguage] || textObject['en']);

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.pitch = 1.25;
      utterance.rate = 0.88;
      utterance.volume = 0.95;

      const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        if (this.currentLanguage === 'hi') {
          const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
          if (hindiVoice) utterance.voice = hindiVoice;
        } else {
          const engVoice = voices.find(v => v.lang.includes('IN') || v.lang.startsWith('en'));
          if (engVoice) utterance.voice = engVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }

  // 19. Gentle Vedic Lullaby (Gopala Lullaby for Screen-Time End & Shanti Mode)
  playLullabyMelody() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const notes = [
      { f: 392.00, d: 0.6 }, // Pa
      { f: 329.63, d: 0.6 }, // Ga
      { f: 293.66, d: 0.8 }, // Re
      { f: 261.63, d: 1.2 }, // Sa
      { f: 293.66, d: 0.6 }, // Re
      { f: 329.63, d: 0.6 }, // Ga
      { f: 392.00, d: 1.4 }  // Pa
    ];
    let offset = 0;
    notes.forEach((n) => {
      setTimeout(() => {
        if (!this.isMuted) this.playBansuri(n.f);
      }, offset * 1000);
      offset += n.d;
    });
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (this.isTanpuraPlaying) this.stopTanpuraDrone();
    }
    return this.isMuted;
  }

  // Compatibility helpers
  playBubblePop() { this.playMakhanPop(); }
  playBalloonPop() { this.playDamru(); }
  playXylophone(freq) { this.playBansuri(freq); }
  playDrum() { this.playDamru(); }
  playSparkle() { this.playAartiChimes(); }
  playCelebration() {
    this.playShankha();
    setTimeout(() => this.playTempleBell(880), 300);
  }
}

// Global audio instance
window.toddlerAudio = new ToddlerAudio();
