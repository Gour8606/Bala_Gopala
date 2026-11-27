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
    this.activeVoices = [];
    this.maxVoices = 24; // Polyphony ceiling to avoid CPU spikes during simultaneous toddler mashing
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

  // Commercial Haptic Feedback Engine (Zero crash on unsupported devices)
  triggerHaptic(type = 'light') {
    if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
    try {
      if (type === 'light') {
        navigator.vibrate(15);
      } else if (type === 'medium') {
        navigator.vibrate(28);
      } else if (type === 'heavy') {
        navigator.vibrate(48);
      } else if (type === 'celebration') {
        navigator.vibrate([30, 40, 30, 40, 75]);
      } else if (typeof type === 'number' || Array.isArray(type)) {
        navigator.vibrate(type);
      }
    } catch (e) {}
  }

  // Commercial Voice Allocation & Priority Stealing (DSP protection against audio buffer saturation)
  registerVoice(gainNode, priority = 5, duration = 1.0) {
    if (!gainNode || !this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Purge expired voices
    this.activeVoices = this.activeVoices.filter(v => (now - v.startTime) < (v.duration + 0.05));

    // If polyphony exceeds maximum limit, gracefully voice-steal the lowest priority voice
    if (this.activeVoices.length >= this.maxVoices) {
      this.activeVoices.sort((a, b) => a.priority - b.priority);
      const victim = this.activeVoices.shift();
      if (victim && victim.gainNode && victim.gainNode.gain) {
        try {
          victim.gainNode.gain.cancelScheduledValues(now);
          victim.gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.025);
        } catch (e) {}
      }
    }

    this.activeVoices.push({
      gainNode: gainNode,
      priority: priority,
      startTime: now,
      duration: duration
    });
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
  // Enhanced Organic Synthesis with Parallel Vowel Formants & Realistic Inflections
  // =========================================================================

  // 1. Authentic Realistic Cow Moo (Gau Mata: "Hambaaa~")
  // Features: Deep chest fundamental, parallel vowel formants (u -> a -> o),
  // warm vocal cord saturation, sub-rumble, and nostril breath puff.
  playCowMoo(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(28);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;
    const duration = 2.0;

    // Vocal cord carrier: Dual detuned sawtooth for rich vocal cord roughness
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    const baseF = 112 * pr;
    const peakF = 152 * pr;
    const endF = 90 * pr;

    osc1.frequency.setValueAtTime(baseF, t);
    osc1.frequency.exponentialRampToValueAtTime(peakF, t + 0.38);
    osc1.frequency.setValueAtTime(peakF * 0.98, t + 1.25);
    osc1.frequency.exponentialRampToValueAtTime(endF, t + duration);

    osc2.frequency.setValueAtTime(baseF + 1.2, t);
    osc2.frequency.exponentialRampToValueAtTime(peakF + 1.5, t + 0.38);
    osc2.frequency.setValueAtTime((peakF * 0.98) + 1.2, t + 1.25);
    osc2.frequency.exponentialRampToValueAtTime(endF + 0.8, t + duration);

    // Warm throat vibrato (4.6 Hz)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(4.6, t);
    vibratoGain.gain.setValueAtTime(3.2 * pr, t);
    vibratoGain.gain.linearRampToValueAtTime(5.8 * pr, t + 0.6);
    vibratoGain.gain.linearRampToValueAtTime(2.0 * pr, t + duration);
    vibrato.connect(osc1.frequency);
    vibrato.connect(osc2.frequency);

    // Vocal cords distortion shaper for organic warmth
    const shaper = this.ctx.createWaveShaper();
    shaper.curve = this.makeDistortionCurve(16);

    const voiceMix = this.ctx.createGain();
    voiceMix.gain.setValueAtTime(0.5, t);
    osc1.connect(shaper);
    osc2.connect(shaper);
    shaper.connect(voiceMix);

    // PARALLEL ACOUSTIC VOCAL TRACT FORMANTS (Fant's Speech Production Model)
    // Formant 1: Chest Resonance (~420Hz)
    const f1 = this.ctx.createBiquadFilter();
    const g1 = this.ctx.createGain();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(380, t);
    f1.frequency.linearRampToValueAtTime(460, t + 0.4);
    f1.frequency.linearRampToValueAtTime(360, t + duration);
    f1.Q.setValueAtTime(3.0, t);
    g1.gain.setValueAtTime(0.44, t);
    voiceMix.connect(f1);
    f1.connect(g1);

    // Formant 2: Mouth/Muzzle Vowel sweep (/u/ to /a/ to /o/)
    const f2 = this.ctx.createBiquadFilter();
    const g2 = this.ctx.createGain();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(700, t);
    f2.frequency.linearRampToValueAtTime(940, t + 0.45);
    f2.frequency.linearRampToValueAtTime(680, t + duration);
    f2.Q.setValueAtTime(2.6, t);
    g2.gain.setValueAtTime(0.38, t);
    voiceMix.connect(f2);
    f2.connect(g2);

    // Formant 3: Nasal cavity overtone (~1320Hz)
    const f3 = this.ctx.createBiquadFilter();
    const g3 = this.ctx.createGain();
    f3.type = 'bandpass';
    f3.frequency.setValueAtTime(1320, t);
    f3.Q.setValueAtTime(3.4, t);
    g3.gain.setValueAtTime(0.18, t);
    voiceMix.connect(f3);
    f3.connect(g3);

    // Sub-chest deep bass presence (Triangle wave at fundamental)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(baseF * 0.5, t);
    subOsc.frequency.linearRampToValueAtTime(peakF * 0.5, t + 0.4);
    subOsc.frequency.linearRampToValueAtTime(endF * 0.5, t + duration);
    subGain.gain.setValueAtTime(0.24, t);
    subOsc.connect(subGain);

    // Nostril air turbulence at vocal onset (gentle breath puff)
    const bufSize = Math.floor(this.ctx.sampleRate * 0.28);
    const noiseBuf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const nData = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      nData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.35));
    }
    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;
    const noiseFilt = this.ctx.createBiquadFilter();
    noiseFilt.type = 'bandpass';
    noiseFilt.frequency.setValueAtTime(520, t);
    noiseFilt.Q.setValueAtTime(2.0, t);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
    noiseSrc.connect(noiseFilt);
    noiseFilt.connect(noiseGain);

    // Master Amplitude Vowel Envelope
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, t);
    masterGain.gain.linearRampToValueAtTime(0.52, t + 0.25);
    masterGain.gain.setValueAtTime(0.48, t + 1.25);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    g1.connect(masterGain);
    g2.connect(masterGain);
    g3.connect(masterGain);
    subGain.connect(masterGain);
    noiseGain.connect(masterGain);

    masterGain.connect(this.getDestination());
    this.registerVoice(masterGain, 6, duration);

    vibrato.start(t);
    osc1.start(t);
    osc2.start(t);
    subOsc.start(t);
    noiseSrc.start(t);

    vibrato.stop(t + duration);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
    subOsc.stop(t + duration);
    noiseSrc.stop(t + 0.28);

    // Accompanying sweet cow bell jingle
    setTimeout(() => {
      if (!this.isMuted) this.playCowBell();
    }, 280);
  }

  // 2. Adorable Baby Calf Moo (Bachhda: "Maaa-aaa~")
  // Features: Higher tender pitch, flutter vibrato, parallel nasal formants.
  playCalfMoo(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(20);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;
    const duration = 1.25;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    const baseF = 265 * pr;
    const peakF = 355 * pr;
    const endF = 215 * pr;

    osc1.frequency.setValueAtTime(baseF, t);
    osc1.frequency.linearRampToValueAtTime(peakF, t + 0.25);
    osc1.frequency.setValueAtTime(peakF * 0.96, t + 0.7);
    osc1.frequency.exponentialRampToValueAtTime(endF, t + duration);

    osc2.frequency.setValueAtTime(baseF * 0.5, t);
    osc2.frequency.linearRampToValueAtTime(peakF * 0.5, t + 0.25);
    osc2.frequency.setValueAtTime((peakF * 0.96) * 0.5, t + 0.7);
    osc2.frequency.exponentialRampToValueAtTime(endF * 0.5, t + duration);

    // Rapid baby vocal tremolo (7.4 Hz)
    const trem = this.ctx.createOscillator();
    const tremGain = this.ctx.createGain();
    trem.frequency.setValueAtTime(7.4, t);
    tremGain.gain.setValueAtTime(9.0 * pr, t);
    trem.connect(osc1.frequency);

    // Parallel formants for baby nasal bleat
    const f1 = this.ctx.createBiquadFilter();
    const g1 = this.ctx.createGain();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(820, t);
    f1.frequency.linearRampToValueAtTime(1080, t + 0.3);
    f1.frequency.linearRampToValueAtTime(760, t + duration);
    f1.Q.setValueAtTime(2.8, t);
    g1.gain.setValueAtTime(0.44, t);

    const f2 = this.ctx.createBiquadFilter();
    const g2 = this.ctx.createGain();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(1650, t);
    f2.Q.setValueAtTime(3.2, t);
    g2.gain.setValueAtTime(0.28, t);

    osc1.connect(f1);
    osc1.connect(f2);
    f1.connect(g1);
    f2.connect(g2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.44, t + 0.15);
    gain.gain.setValueAtTime(0.38, t + 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    g1.connect(gain);
    g2.connect(gain);
    osc2.connect(gain);

    gain.connect(this.getDestination());
    this.registerVoice(gain, 6, duration);

    trem.start(t);
    osc1.start(t);
    osc2.start(t);

    trem.stop(t + duration);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
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

  // 5. Royal Peacock Call (Mayur: "May-Aauuh! Pee-hu!")
  // Features: Realistic two-tone trumpet cry with syrinx harmonics and natural echo.
  playPeacockCall(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(22);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;

    const playOneCall = (startTime, isEcho) => {
      const amp = isEcho ? 0.26 : 0.42;

      // Syrinx Trumpet Glides: 1250Hz -> 2300Hz -> 1100Hz
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      oscHarmonic.type = 'triangle';

      const base1 = 1250 * pr;
      const peak1 = 2320 * pr;
      const fall1 = 1080 * pr;

      osc.frequency.setValueAtTime(base1, startTime);
      osc.frequency.exponentialRampToValueAtTime(peak1, startTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(fall1, startTime + 0.44);

      oscHarmonic.frequency.setValueAtTime(base1 * 1.5, startTime);
      oscHarmonic.frequency.exponentialRampToValueAtTime(peak1 * 1.5, startTime + 0.12);
      oscHarmonic.frequency.exponentialRampToValueAtTime(fall1 * 1.5, startTime + 0.44);

      // High Q Syrinx Screech Formants
      const f1 = this.ctx.createBiquadFilter();
      f1.type = 'bandpass';
      f1.frequency.setValueAtTime(2150 * pr, startTime);
      f1.Q.setValueAtTime(4.2, startTime);

      const f2 = this.ctx.createBiquadFilter();
      f2.type = 'bandpass';
      f2.frequency.setValueAtTime(3200 * pr, startTime);
      f2.Q.setValueAtTime(3.8, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, startTime);
      gain.gain.linearRampToValueAtTime(amp, startTime + 0.08);
      gain.gain.setValueAtTime(amp * 0.9, startTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.48);

      osc.connect(f1);
      oscHarmonic.connect(f2);
      f1.connect(gain);
      f2.connect(gain);
      gain.connect(this.getDestination());
      this.registerVoice(gain, 6, 0.5);

      osc.start(startTime);
      oscHarmonic.start(startTime);
      osc.stop(startTime + 0.5);
      oscHarmonic.stop(startTime + 0.5);
    };

    // First loud royal call
    playOneCall(t, false);
    // Second softer natural echo call
    playOneCall(t + 0.48, true);
  }

  // 6. Elephant Trumpet (Gajaraj Chinhar)
  // Features: Heavy brass horn buzz, trunk lip flutter (22Hz), resonant horn filter, deep chest presence.
  playElephantTrumpet(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(30);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;
    const dur = 0.85;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    const fStart = 210 * pr;
    const fPeak = 480 * pr;
    const fEnd = 240 * pr;

    osc.frequency.setValueAtTime(fStart, t);
    osc.frequency.linearRampToValueAtTime(fPeak, t + 0.28);
    osc.frequency.exponentialRampToValueAtTime(fEnd, t + dur);

    // Trunk lip flutter vibrato (22 Hz)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(22, t);
    lfoGain.gain.setValueAtTime(36 * pr, t);
    lfo.connect(osc.frequency);

    // Parallel brass horn acoustic filters
    const hornFilter = this.ctx.createBiquadFilter();
    hornFilter.type = 'bandpass';
    hornFilter.frequency.setValueAtTime(820, t);
    hornFilter.Q.setValueAtTime(3.2, t);

    const flareFilter = this.ctx.createBiquadFilter();
    flareFilter.type = 'peaking';
    flareFilter.frequency.setValueAtTime(1750, t);
    flareFilter.gain.setValueAtTime(6.0, t);
    flareFilter.Q.setValueAtTime(3.5, t);

    // Sub-bass rumble for massive body
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(48, t);
    subGain.gain.setValueAtTime(0.3, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    subOsc.connect(subGain);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.46, t + 0.16);
    gain.gain.setValueAtTime(0.42, t + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc.connect(hornFilter);
    hornFilter.connect(flareFilter);
    flareFilter.connect(gain);
    subGain.connect(gain);

    gain.connect(this.getDestination());
    this.registerVoice(gain, 6, dur);

    lfo.start(t);
    osc.start(t);
    subOsc.start(t);

    lfo.stop(t + dur);
    osc.stop(t + dur);
    subOsc.stop(t + dur);
  }

  // 7. Sweet Indian Cuckoo (Koel: "Koo-hoo! Koo-hoo!")
  // Features: Pure musical ascending whistle with dual-harmonic warmth and air.
  playKoelCall(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;

    const syllables = [
      { delay: 0.0, f1: 720 * pr, f2: 1120 * pr, dur: 0.28, vol: 0.32 },
      { delay: 0.36, f1: 860 * pr, f2: 1380 * pr, dur: 0.34, vol: 0.38 }
    ];

    syllables.forEach(s => {
      const st = t + s.delay;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(s.f1, st);
      osc.frequency.exponentialRampToValueAtTime(s.f2, st + s.dur * 0.9);

      // Subtle warm 2nd harmonic
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(s.f1 * 2, st);
      osc2.frequency.exponentialRampToValueAtTime(s.f2 * 2, st + s.dur * 0.9);
      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.12, st);
      osc2.connect(gain2);

      gain.gain.setValueAtTime(0.01, st);
      gain.gain.linearRampToValueAtTime(s.vol, st + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, st + s.dur);

      osc.connect(gain);
      gain2.connect(gain);
      gain.connect(this.getDestination());
      this.registerVoice(gain, 5, s.dur);

      osc.start(st);
      osc2.start(st);
      osc.stop(st + s.dur + 0.02);
      osc2.stop(st + s.dur + 0.02);
    });
  }

  // 7b. Gentle Vrindavan Goat / Lamb (Bakri / Aja: "Mê-ê-h!")
  // Features: Rapid 8.8Hz vocal flutter, vowel formants (Gandhara / Ga Swara).
  playGoatBleat(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;
    const dur = 0.85;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    const baseF = 270 * pr;
    osc.frequency.setValueAtTime(baseF, t);
    osc.frequency.linearRampToValueAtTime(baseF * 1.15, t + 0.2);
    osc.frequency.linearRampToValueAtTime(baseF * 0.92, t + dur);

    // Rapid throat tremor flutter (8.8 Hz)
    const flutter = this.ctx.createOscillator();
    const flutterGain = this.ctx.createGain();
    flutter.frequency.setValueAtTime(8.8, t);
    flutterGain.gain.setValueAtTime(14 * pr, t);
    flutter.connect(osc.frequency);

    // Parallel formants (/ae/ bleat sound)
    const f1 = this.ctx.createBiquadFilter();
    const g1 = this.ctx.createGain();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(860, t);
    f1.Q.setValueAtTime(2.8, t);
    g1.gain.setValueAtTime(0.4, t);

    const f2 = this.ctx.createBiquadFilter();
    const g2 = this.ctx.createGain();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(1750, t);
    f2.Q.setValueAtTime(3.2, t);
    g2.gain.setValueAtTime(0.25, t);

    osc.connect(f1);
    osc.connect(f2);
    f1.connect(g1);
    f2.connect(g2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.38, t + 0.1);
    gain.gain.setValueAtTime(0.35, t + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    g1.connect(gain);
    g2.connect(gain);
    gain.connect(this.getDestination());
    this.registerVoice(gain, 6, dur);

    flutter.start(t);
    osc.start(t);
    flutter.stop(t + dur);
    osc.stop(t + dur);
  }

  // 7c. Vrindavan Horse (Ashwa Whinny & Snort - Dhaivata / Dha Swara)
  // Features: Joyful high whinny swooping down with 11Hz flutter, followed by soft snort.
  playHorseNeigh(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(22);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;
    const whinnyDur = 0.85;

    // High excited whinny
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880 * pr, t);
    osc.frequency.linearRampToValueAtTime(1150 * pr, t + 0.2);
    osc.frequency.exponentialRampToValueAtTime(460 * pr, t + whinnyDur);

    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(11.2, t);
    lfoGain.gain.setValueAtTime(32 * pr, t);
    lfo.connect(osc.frequency);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1300, t);
    filter.Q.setValueAtTime(2.6, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.36, t + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, t + whinnyDur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + whinnyDur);
    osc.stop(t + whinnyDur);

    // Followed by gentle breathy horse snort puff
    const snortT = t + 0.85;
    const bufSize = Math.floor(this.ctx.sampleRate * 0.25);
    const snortBuf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const sData = snortBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      sData[i] = (Math.random() * 2 - 1) * Math.sin((i / bufSize) * Math.PI);
    }
    const sNoise = this.ctx.createBufferSource();
    sNoise.buffer = snortBuf;
    const sFilt = this.ctx.createBiquadFilter();
    sFilt.type = 'lowpass';
    sFilt.frequency.setValueAtTime(420, snortT);
    const sGain = this.ctx.createGain();
    sGain.gain.setValueAtTime(0.22, snortT);
    sGain.gain.exponentialRampToValueAtTime(0.001, snortT + 0.24);

    sNoise.connect(sFilt);
    sFilt.connect(sGain);
    sGain.connect(this.getDestination());
    sNoise.start(snortT);
    sNoise.stop(snortT + 0.25);
  }

  // 7d. Sacred Swan / Water Crane (Hamsa Honk - Madhyama / Ma Swara)
  // Features: Resonant waterbird trumpet honk with dual throat resonances.
  playSwanCall(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;
    const dur = 0.55;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    const baseF = 460 * pr;
    osc.frequency.setValueAtTime(baseF, t);
    osc.frequency.linearRampToValueAtTime(baseF * 1.18, t + 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseF * 0.88, t + dur);

    const f1 = this.ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(940 * pr, t);
    f1.Q.setValueAtTime(3.2, t);

    const f2 = this.ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(1860 * pr, t);
    f2.Q.setValueAtTime(3.8, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.36, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc.connect(f1);
    osc.connect(f2);
    f1.connect(gain);
    f2.connect(gain);
    gain.connect(this.getDestination());
    this.registerVoice(gain, 6, dur);

    osc.start(t);
    osc.stop(t + dur);
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
  // Features: Crisp metallic double chirps: "Mithu! Mithu!" with syrinx harmonics.
  playShukaCall(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;

    [0, 0.16].forEach((st) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1550 * pr, t + st);
      osc.frequency.exponentialRampToValueAtTime(2700 * pr, t + st + 0.07);
      osc.frequency.exponentialRampToValueAtTime(1700 * pr, t + st + 0.13);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400 * pr, t + st);
      filter.Q.setValueAtTime(3.5, t + st);

      gain.gain.setValueAtTime(0.01, t + st);
      gain.gain.linearRampToValueAtTime(0.32, t + st + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + st);
      osc.stop(t + st + 0.15);
    });
  }

  // 8c. Gentle Forest Deer (Mriga Bleat)
  playDeerCall(pitchRatio) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(15);

    const pr = (typeof pitchRatio === 'number' && pitchRatio > 0.2 && pitchRatio < 5) ? pitchRatio : 1.0;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420 * pr, t);
    osc.frequency.linearRampToValueAtTime(540 * pr, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(380 * pr, t + 0.45);

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

  // 8d. Playful Vrindavan Monkey (Vanar Chatter & Giggle)
  playMonkeySound() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const t = this.ctx.currentTime;
    // Rapid staccato vocal chattering "Whoop! Whoop! Khee-khee!"
    [0, 0.09, 0.19].forEach((st, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520 + idx * 90, t + st);
      osc.frequency.exponentialRampToValueAtTime(840 + idx * 110, t + st + 0.06);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1250, t + st);
      filter.Q.setValueAtTime(2.8, t + st);

      gain.gain.setValueAtTime(0.01, t + st);
      gain.gain.linearRampToValueAtTime(0.26, t + st + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + st + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + st);
      osc.stop(t + st + 0.09);
    });
  }

  playMonkeyChatter() {
    this.playMonkeySound();
  }

  // Universal Animal Sound Router for Vedic Games
  // Allows any game to play an authentic animal sound tuned to an optional musical frequency!
  playAnimalSound(name, targetFreq) {
    if (!name || this.isMuted) return;
    const standardC4 = 261.63;
    const pitchRatio = (typeof targetFreq === 'number' && targetFreq > 60) ? (targetFreq / standardC4) : 1.0;
    const n = String(name).toLowerCase();

    if (n === 'cow' || n === 'gau' || n === 'bull') {
      this.playCowMoo(pitchRatio);
    } else if (n === 'calf' || n === 'bachhda') {
      this.playCalfMoo(pitchRatio);
    } else if (n === 'peacock' || n === 'mayur' || n === 'mor') {
      this.playPeacockCall(pitchRatio);
    } else if (n === 'elephant' || n === 'gaja' || n === 'hathi') {
      this.playElephantTrumpet(pitchRatio);
    } else if (n === 'koel' || n === 'cuckoo' || n === 'kokila') {
      this.playKoelCall(pitchRatio);
    } else if (n === 'goat' || n === 'bakri' || n === 'aja') {
      this.playGoatBleat(pitchRatio);
    } else if (n === 'horse' || n === 'ashwa' || n === 'ghoda') {
      this.playHorseNeigh(pitchRatio);
    } else if (n === 'swan' || n === 'crane' || n === 'hamsa') {
      this.playSwanCall(pitchRatio);
    } else if (n === 'parrot' || n === 'shuka' || n === 'tota') {
      this.playShukaCall(pitchRatio);
    } else if (n === 'deer' || n === 'mriga' || n === 'hiran') {
      this.playDeerCall(pitchRatio);
    } else if (n === 'monkey' || n === 'vanar' || n === 'bandar') {
      this.playMonkeySound();
    } else if (n === 'bee' || n === 'bhramari') {
      if (typeof this.playBhramariHum === 'function') {
        this.playBhramariHum(1.8);
      }
    } else if (n === 'birds' || n === 'pakshi') {
      if (typeof this.playForestBirdsChirp === 'function') {
        this.playForestBirdsChirp();
      }
    } else {
      this.playPeacockCall(pitchRatio);
    }
  }

  // Frothy Milk / Butter Splash (Makhan Pop & Snana)
  playMilkSplash() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(15);

    const t = this.ctx.currentTime;
    const dur = 0.22;
    const bufSize = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.25));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, t);
    filter.frequency.exponentialRampToValueAtTime(320, t + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.32, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());
    noise.start(t);
    noise.stop(t + dur);
  }

  // Gentle Water Sprinkle Drops (Prakriti Garden & Tulsi Seva)
  playWaterSprinkle() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    for (let d = 0; d < 4; d++) {
      const dt = t + d * 0.07 + (Math.random() * 0.02);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startF = 1800 + Math.random() * 600;
      osc.frequency.setValueAtTime(startF, dt);
      osc.frequency.exponentialRampToValueAtTime(startF * 0.45, dt + 0.06);

      gain.gain.setValueAtTime(0.12, dt);
      gain.gain.exponentialRampToValueAtTime(0.001, dt + 0.06);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(dt);
      osc.stop(dt + 0.07);
    }
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

  // 10. Mandir Ghanti (Temple Bell with Brass Overtones & Acoustic Shimmer)
  playTempleBell(freq = 1046.5) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(22);

    const t = this.ctx.currentTime;

    // Authentic Ashtadhatu bronze bell harmonic overtones with subtle acoustic beating
    // (Hum, Prime, Tierce, Quint, Nominal, Super-nominal)
    const partials = [
      { f: freq * 0.5, g: 0.18, d: 2.8 },    // Hum note (sub-octave)
      { f: freq * 1.0, g: 0.32, d: 2.6 },    // Fundamental Prime
      { f: freq * 1.003, g: 0.22, d: 2.4 },  // Dual interference beating partial (natural 3Hz acoustic shimmer)
      { f: freq * 1.518, g: 0.18, d: 2.0 },  // Tierce (minor third overtone)
      { f: freq * 2.08, g: 0.14, d: 1.5 },   // Quint (fifth overtone)
      { f: freq * 2.76, g: 0.09, d: 1.1 },   // Nominal overtone
      { f: freq * 3.42, g: 0.05, d: 0.8 }    // High bronze shimmer
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

    // Metallic clapper strike transient (first 25ms)
    const strike = this.ctx.createOscillator();
    const strikeGain = this.ctx.createGain();
    strike.type = 'triangle';
    strike.frequency.setValueAtTime(freq * 3.8, t);
    strike.frequency.exponentialRampToValueAtTime(freq * 1.2, t + 0.025);

    strikeGain.gain.setValueAtTime(0.12, t);
    strikeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    strike.connect(strikeGain);
    strikeGain.connect(this.getDestination());
    strike.start(t);
    strike.stop(t + 0.035);
  }

  // 11. Shankha (Sacred Temple Conch Shell Naad)
  playShankha() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(35);

    const t = this.ctx.currentTime;
    const dur = 2.1;
    const fundamental = 220; // Sacred Sa

    // Lip buzz oscillator (sawtooth through resonant cavity formant filters)
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(fundamental * 0.94, t);
    osc.frequency.linearRampToValueAtTime(fundamental * 1.19, t + 0.4);
    osc.frequency.setValueAtTime(fundamental * 1.19, t + 1.2);
    osc.frequency.exponentialRampToValueAtTime(fundamental * 0.92, t + dur);

    // Subtle embouchure lip pressure modulation (5.8Hz)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(5.8, t);
    lfoGain.gain.setValueAtTime(3.5, t);
    lfo.connect(osc.frequency);

    // Formant 1: Conch spiral cavity acoustic resonance (~520Hz)
    const f1 = this.ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(520, t);
    f1.frequency.linearRampToValueAtTime(560, t + 0.4);
    f1.Q.setValueAtTime(3.8, t);

    // Formant 2: High horn flare overtone (~1040Hz)
    const f2 = this.ctx.createBiquadFilter();
    f2.type = 'peaking';
    f2.frequency.setValueAtTime(1040, t);
    f2.gain.setValueAtTime(6.0, t);
    f2.Q.setValueAtTime(2.5, t);

    // Main Swell Amplitude Envelope
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.42, t + 0.45);
    gain.gain.setValueAtTime(0.40, t + 1.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc.connect(f1);
    f1.connect(f2);
    f2.connect(gain);
    gain.connect(this.getDestination());

    // Air breath rush through shell
    const breathSize = Math.floor(this.ctx.sampleRate * 0.4);
    const breathBuf = this.ctx.createBuffer(1, breathSize, this.ctx.sampleRate);
    const bData = breathBuf.getChannelData(0);
    for (let i = 0; i < breathSize; i++) {
      bData[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * (i / breathSize)) * 0.06;
    }
    const breathNoise = this.ctx.createBufferSource();
    breathNoise.buffer = breathBuf;
    const bFilter = this.ctx.createBiquadFilter();
    bFilter.type = 'bandpass';
    bFilter.frequency.setValueAtTime(800, t);
    bFilter.Q.setValueAtTime(2.0, t);
    breathNoise.connect(bFilter);
    bFilter.connect(gain);

    lfo.start(t);
    osc.start(t);
    breathNoise.start(t);
    lfo.stop(t + dur + 0.05);
    osc.stop(t + dur + 0.05);
  }

  // 12. Bansuri (Lord Krishna's Bamboo Flute with Cane Resonance & Breath Chiff)
  playBansuri(freq = 440) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);

    const t = this.ctx.currentTime;
    const dur = 1.35;

    // 1. Primary Bamboo Cane Resonance: Fundamental (Sine)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    // Gentle initial meend portamento glide into note
    osc1.frequency.setValueAtTime(freq * 0.97, t);
    osc1.frequency.exponentialRampToValueAtTime(freq, t + 0.08);

    // 2. Second Harmonic (Warm Octave Characteristic of Cylindrical Bamboo)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.94, t);
    osc2.frequency.exponentialRampToValueAtTime(freq * 2.0, t + 0.08);

    // Natural human vibrato with delayed onset (~120ms attack)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(5.4, t); // 5.4 Hz natural Indian vocal/flute vibrato
    lfoGain.gain.setValueAtTime(0.001, t);
    lfoGain.gain.setValueAtTime(0.001, t + 0.12);
    lfoGain.gain.linearRampToValueAtTime(freq * 0.016, t + 0.38);
    lfo.connect(osc1.frequency);
    lfo.connect(osc2.frequency);

    // Flute Breath Chiff (Air passing over embouchure hole during initial attack)
    const chiffDur = 0.14;
    const chiffSize = Math.floor(this.ctx.sampleRate * chiffDur);
    const chiffBuf = this.ctx.createBuffer(1, chiffSize, this.ctx.sampleRate);
    const cData = chiffBuf.getChannelData(0);
    for (let i = 0; i < chiffSize; i++) {
      cData[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * (i / chiffSize)) * 0.09;
    }
    const chiff = this.ctx.createBufferSource();
    chiff.buffer = chiffBuf;
    const chiffFilter = this.ctx.createBiquadFilter();
    chiffFilter.type = 'bandpass';
    chiffFilter.frequency.setValueAtTime(freq * 1.4, t);
    chiffFilter.Q.setValueAtTime(3.0, t);
    chiff.connect(chiffFilter);
    chiffFilter.connect(this.getDestination());

    // Fundamental Envelope (Smooth flute swell and gentle breath release)
    gain1.gain.setValueAtTime(0.001, t);
    gain1.gain.linearRampToValueAtTime(0.36, t + 0.07);
    gain1.gain.setValueAtTime(0.34, t + 0.9);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    // 2nd Harmonic Envelope
    gain2.gain.setValueAtTime(0.001, t);
    gain2.gain.linearRampToValueAtTime(0.12, t + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.85);

    osc1.connect(gain1);
    gain1.connect(this.getDestination());

    osc2.connect(gain2);
    gain2.connect(this.getDestination());

    lfo.start(t);
    osc1.start(t);
    osc2.start(t);
    chiff.start(t);

    lfo.stop(t + dur + 0.05);
    osc1.stop(t + dur + 0.05);
    osc2.stop(t + dur + 0.05);
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

  // 14b. Saraswati Veena Pluck (Resonant String with Curved Jawari Bridge Buzz)
  playVeenaPluck(freq = 220) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(25);
    const t = this.ctx.currentTime;
    const dur = 1.8;

    // 1. Plucked String Oscillator with Microtonal Meend Glide
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, t);
    osc1.frequency.linearRampToValueAtTime(freq * 1.025, t + 0.15); // gentle initial meend
    osc1.frequency.linearRampToValueAtTime(freq, t + 0.4);

    // 2. Wooden Kudam Resonator Filter with dynamic Jawari overtone decay
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, t); // bright jawari buzz at attack
    filter.frequency.exponentialRampToValueAtTime(320, t + 0.6); // warm hollow wood sustain
    filter.Q.setValueAtTime(2.8, t);

    gain1.gain.setValueAtTime(0.001, t);
    gain1.gain.linearRampToValueAtTime(0.38, t + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    // 3. Sympathetic Drone String Resonance (Tarab)
    const oscTarab = this.ctx.createOscillator();
    const gainTarab = this.ctx.createGain();
    oscTarab.type = 'sine';
    oscTarab.frequency.setValueAtTime(freq * 2.0, t);

    gainTarab.gain.setValueAtTime(0.001, t);
    gainTarab.gain.linearRampToValueAtTime(0.14, t + 0.08);
    gainTarab.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

    osc1.connect(filter);
    filter.connect(gain1);
    gain1.connect(this.getDestination());

    oscTarab.connect(gainTarab);
    gainTarab.connect(this.getDestination());

    osc1.start(t);
    oscTarab.start(t);
    osc1.stop(t + dur + 0.05);
    oscTarab.stop(t + 1.45);
  }

  // 14c. Mridangam / Dholak Bass Stroke (Dha / Ge - Resonant Flour Paste Head)
  playMridangaDha() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(35);
    const t = this.ctx.currentTime;

    // Bass body resonance with natural pitch glide from palm strike
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(138, t);
    osc.frequency.exponentialRampToValueAtTime(74, t + 0.24);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.68, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

    // Subtle wooden shell hollow knock
    const knock = this.ctx.createOscillator();
    const knockGain = this.ctx.createGain();
    knock.type = 'triangle';
    knock.frequency.setValueAtTime(220, t);
    knock.frequency.exponentialRampToValueAtTime(90, t + 0.04);
    knockGain.gain.setValueAtTime(0.25, t);
    knockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.getDestination());
    knock.connect(knockGain);
    knockGain.connect(this.getDestination());

    osc.start(t);
    knock.start(t);
    osc.stop(t + 0.44);
    knock.stop(t + 0.06);
  }

  // 14d. Mridangam / Dholak Treble Rim Stroke (Ta / Tin - Black Siyaahi Ring)
  playMridangaTa() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(18);
    const t = this.ctx.currentTime;

    // Metallic bell-like ring from the black center paste (Siyaahi)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(460, t + 0.12);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.48, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    // Rim slap snap transient
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.type = 'triangle';
    snap.frequency.setValueAtTime(880, t);
    snap.frequency.exponentialRampToValueAtTime(320, t + 0.03);
    snapGain.gain.setValueAtTime(0.3, t);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(gain);
    gain.connect(this.getDestination());
    snap.connect(snapGain);
    snapGain.connect(this.getDestination());

    osc.start(t);
    snap.start(t);
    osc.stop(t + 0.24);
    snap.stop(t + 0.04);
  }

  // 14e. Gentle Floral Jhula Swing Chime
  playJhulaChime() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Sa Ga Pa Sa
    const t = this.ctx.currentTime;
    notes.forEach((f, idx) => {
      const delay = idx * 0.12;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t + delay);

      gain.gain.setValueAtTime(0.001, t + delay);
      gain.gain.linearRampToValueAtTime(0.22, t + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.6);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t + delay);
      osc.stop(t + delay + 0.65);
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

  // 17. Vrindavan Sacred Natural Sounds
  // 17a. Gentle Flowing Yamuna River Stream
  playYamunaStream() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(25);

    const t = this.ctx.currentTime;
    const dur = 1.4;
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      const pink = b0 + b1 + b2 + white * 0.1848;
      const mod = 0.7 + 0.3 * Math.sin((i / bufferSize) * 24);
      data[i] = (pink * 0.08) * mod * Math.sin(Math.PI * (i / bufferSize));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, t);
    filter.frequency.linearRampToValueAtTime(850, t + 0.7);
    filter.frequency.linearRampToValueAtTime(550, t + dur);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.38, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    noise.start(t);
    noise.stop(t + dur);

    // Resonant water droplet bubbling
    for (let d = 0; d < 3; d++) {
      const dropTime = t + 0.15 + d * 0.35 + Math.random() * 0.1;
      const dropOsc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      dropOsc.type = 'sine';
      dropOsc.frequency.setValueAtTime(900 + Math.random() * 400, dropTime);
      dropOsc.frequency.exponentialRampToValueAtTime(1400 + Math.random() * 600, dropTime + 0.08);

      dropGain.gain.setValueAtTime(0.08, dropTime);
      dropGain.gain.exponentialRampToValueAtTime(0.001, dropTime + 0.08);

      dropOsc.connect(dropGain);
      dropGain.connect(this.getDestination());
      dropOsc.start(dropTime);
      dropOsc.stop(dropTime + 0.09);
    }
  }

  // 17b. Gentle Breeze through Kadamba Trees (Organic Multi-Layer Wind & Leaf Rustle)
  playKadambaBreeze() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(15);

    const t = this.ctx.currentTime;
    const dur = 1.9;
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Multi-pole pink/brown noise for warm organic air pressure
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.998 * b0 + white * 0.055;
      b1 = 0.993 * b1 + white * 0.075;
      b2 = 0.96 * b2 + white * 0.15;
      const envelope = Math.sin(Math.PI * (i / bufferSize));
      // Organic turbulent modulation (swirling wind gusts)
      const swell = 0.75 + 0.25 * Math.sin((i / bufferSize) * 14);
      data[i] = (b0 + b1 + b2) * envelope * swell * 0.45;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Dynamic wind filter sweeping from gentle to full rustle
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, t);
    filter.frequency.linearRampToValueAtTime(620, t + 0.8);
    filter.frequency.linearRampToValueAtTime(240, t + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.32, t + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    noise.start(t);
    noise.stop(t + dur);
  }

  // 17c. Gentle Vrindavan Monsoon Rain
  playMonsoonRain() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate([10, 30, 10]);

    const t = this.ctx.currentTime;
    const dur = 1.5;
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(1200, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.22, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(highpass);
    highpass.connect(gain);
    gain.connect(this.getDestination());

    noise.start(t);
    noise.stop(t + dur);

    for (let r = 0; r < 5; r++) {
      const dropT = t + 0.1 + r * 0.24 + Math.random() * 0.08;
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800 + Math.random() * 700, dropT);
      osc.frequency.exponentialRampToValueAtTime(600, dropT + 0.06);

      dropGain.gain.setValueAtTime(0.06, dropT);
      dropGain.gain.exponentialRampToValueAtTime(0.001, dropT + 0.06);

      osc.connect(dropGain);
      dropGain.connect(this.getDestination());
      osc.start(dropT);
      osc.stop(dropT + 0.07);
    }
  }

  // 17d. Peaceful Vrindavan Forest Crickets (Natural Multi-Pulse Wing Stridulation)
  playNightCrickets() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    // 3 rhythmic chirps, each containing 3-4 natural wing-rub micro-pulses
    for (let c = 0; c < 3; c++) {
      const chirpStart = t + c * 0.38;
      const baseFreq = 4800 + (c % 2) * 180;

      for (let p = 0; p < 4; p++) {
        const pulseStart = chirpStart + p * 0.024;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, pulseStart);

        gain.gain.setValueAtTime(0.001, pulseStart);
        gain.gain.linearRampToValueAtTime(0.12, pulseStart + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.001, pulseStart + 0.018);

        osc.connect(gain);
        gain.connect(this.getDestination());

        osc.start(pulseStart);
        osc.stop(pulseStart + 0.022);
      }
    }
  }

  // 17e. Vrindavan Forest Songbirds Chirping (Dual Syrinx Harmonic Trill)
  playForestBirdsChirp() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();

    const t = this.ctx.currentTime;
    const chirps = [
      { start: 0.0, f1: 2600, f2: 3800, dur: 0.18, mod: 26 },
      { start: 0.22, f1: 3200, f2: 4400, dur: 0.16, mod: 28 },
      { start: 0.44, f1: 2800, f2: 4100, dur: 0.22, mod: 22 }
    ];

    chirps.forEach(c => {
      const startTime = t + c.start;

      // Syrinx dual note oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(c.f1, startTime);
      osc.frequency.exponentialRampToValueAtTime(c.f2, startTime + c.dur * 0.7);
      osc.frequency.exponentialRampToValueAtTime(c.f1 * 1.1, startTime + c.dur);

      // Sweet songbird frequency vibrato trill
      const trill = this.ctx.createOscillator();
      const trillGain = this.ctx.createGain();
      trill.frequency.setValueAtTime(c.mod, startTime);
      trillGain.gain.setValueAtTime(140, startTime);
      trill.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.24, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + c.dur);

      osc.connect(gain);
      gain.connect(this.getDestination());

      trill.start(startTime);
      osc.start(startTime);
      trill.stop(startTime + c.dur + 0.02);
      osc.stop(startTime + c.dur + 0.02);
    });
  }

  // 17f. Sacred Meditative Om Chant (AUM at 136.1Hz Vedic Frequency)
  playOmChant() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    const t = this.ctx.currentTime;
    const dur = 2.4;
    const fundamental = 136.1; // Sacred Om resonance (Sadja frequency)

    const partials = [
      { f: fundamental, g: 0.36, type: 'sine' },
      { f: fundamental * 2, g: 0.18, type: 'sine' },
      { f: fundamental * 3, g: 0.09, type: 'triangle' },
      { f: fundamental * 4, g: 0.04, type: 'sine' }
    ];

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.f, t);

      // Warm vocal AUM swell and gentle peaceful resonance decay
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(p.g, t + 0.45);
      gain.gain.setValueAtTime(p.g * 0.88, t + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t);
      osc.stop(t + dur);
    });
  }

  // 17g. Sacred Tibetan / Vedic Singing Bowl (432Hz Rich Harmonic Resonance)
  playSingingBowl(freq = 432) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.vibrate(30);
    const t = this.ctx.currentTime;
    const dur = 3.2;

    // Bronze singing bowl harmonic overtone series (non-integer partials)
    const partials = [
      { ratio: 1.0, gain: 0.35, decay: 3.2 },
      { ratio: 2.76, gain: 0.18, decay: 2.6 },
      { ratio: 5.40, gain: 0.08, decay: 1.8 },
      { ratio: 8.92, gain: 0.03, decay: 1.2 }
    ];

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * p.ratio, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(p.gain, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + p.decay);

      osc.connect(gain);
      gain.connect(this.getDestination());
      osc.start(t);
      osc.stop(t + p.decay + 0.05);
    });
  }

  // 17h. Bhramari Pranayama (Sacred Bumblebee Calming Hum at 196Hz G3)
  // Medically & yogically proven to soothe toddler nervous systems and stop meltdowns
  playBhramariHum(dur) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    this.triggerHaptic('soft');

    const duration = dur || 2.8;
    const t = this.ctx.currentTime;
    const baseFreq = 196.0;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, t);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 2, t);

    vibrato.frequency.setValueAtTime(5.2, t);
    vibratoGain.gain.setValueAtTime(4.5, t);
    vibrato.connect(osc1.frequency);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(360, t);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.24, t + 0.6);
    gain.gain.setValueAtTime(0.22, t + duration - 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    vibrato.start(t);
    osc1.start(t);
    osc2.start(t);

    vibrato.stop(t + duration);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
  }

  // 18. Meditative Tanpura Drone (432Hz Sa-Pa)
  startTanpuraDrone() {
    if (this.isMuted || !this.ctx) return;
    this.stopTanpuraDrone(true); // Stop any prior drone immediately
    this.ensureContext();

    const t = this.ctx.currentTime;
    const notes = [130.81, 196.00, 261.63, 261.63];

    this.tanpuraGain = this.ctx.createGain();
    this.tanpuraGain.gain.setValueAtTime(0.01, t);
    this.tanpuraGain.gain.linearRampToValueAtTime(0.12, t + 1.2);
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

  stopTanpuraDrone(immediate = false) {
    if (this.tanpuraGain && this.ctx) {
      try {
        const t = this.ctx.currentTime;
        this.tanpuraGain.gain.cancelScheduledValues(t);
        if (immediate) {
          this.tanpuraGain.gain.setValueAtTime(0.0001, t);
        } else {
          this.tanpuraGain.gain.linearRampToValueAtTime(0.0001, t + 0.15);
        }
      } catch (e) {}
    }

    if (this.tanpuraOscs) {
      this.tanpuraOscs.forEach(o => {
        try {
          o.stop();
          o.disconnect();
        } catch (e) {}
      });
      this.tanpuraOscs = null;
    }
    this.isTanpuraPlaying = false;
  }

  // Emergency Panic Stop (All continuous drones, oscillators & speech)
  stopAllSounds() {
    this.stopAarti();
    this.stopNatureAmbience();
    this.stopTanpuraDrone(true);
    if (this.activeVoices && this.ctx) {
      this.activeVoices.forEach(v => {
        if (v && v.gainNode && v.gainNode.gain) {
          try {
            v.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
            v.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);
          } catch (e) {}
        }
      });
      this.activeVoices = [];
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // Select the most natural-sounding available SpeechSynthesis voice for a language
  _pickNaturalVoice(voices, targetLang) {
    if (!voices || voices.length === 0) return null;
    var isHi = targetLang === 'hi';
    var langMatches = voices.filter(function(v) {
      if (isHi) return v.lang && (v.lang.indexOf('hi') !== -1 || v.lang === 'en-IN');
      return v.lang && (v.lang.indexOf('en-') === 0 || v.lang === 'en');
    });
    var pool = langMatches.length > 0 ? langMatches : voices;

    // Prioritize natural/neural/Google voices over robotic default OS voices
    var preferredKeywords = isHi
      ? ['Swara', 'Madhur', 'Google हिन्दी', 'Google', 'Natural', 'Neural', 'Neerja', 'Prabhat', 'Online']
      : ['Natural', 'Neural', 'Google', 'Aria', 'Jenny', 'Neerja', 'Prabhat', 'Ava', 'Samantha', 'Online'];

    // First prefer exact language match with a natural voice keyword
    var exactLangPool = isHi
      ? pool.filter(function(v) { return v.lang && v.lang.indexOf('hi') !== -1; })
      : pool.filter(function(v) { return v.lang && v.lang.indexOf('en') === 0; });
    var searchPool = exactLangPool.length > 0 ? exactLangPool : pool;

    for (var k = 0; k < preferredKeywords.length; k++) {
      var kw = preferredKeywords[k];
      var found = searchPool.find(function(v) {
        return v.name && v.name.indexOf(kw) !== -1;
      });
      if (found) return found;
    }
    return searchPool[0] || pool[0];
  }

  // 18. Bilingual Speech Synthesizer (Natural, Clear, Crystal-Sharp Voice-Over)
  speak(textObject, onComplete) {
    this._speechSeq = (this._speechSeq || 0) + 1;
    var seq = this._speechSeq;

    if (this.isMuted || !this.speechEnabled || !('speechSynthesis' in window)) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    var textToSpeak = typeof textObject === 'string' ? textObject : (textObject[this.currentLanguage] || textObject['en']);
    if (!textToSpeak) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    // Auto-detect Devanagari script so Hindi words always use a Hindi voice
    // and English A-Z phonics always use an English voice, even across mode switches
    var hasDevanagari = /[\u0900-\u097F]/.test(textToSpeak);
    var speechLang = hasDevanagari ? 'hi' : (this.currentLanguage === 'hi' && /[a-zA-Z]/.test(textToSpeak) ? 'en' : this.currentLanguage);

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      var self = this;
      setTimeout(function() {
        if (seq !== self._speechSeq) return;
        try {
          var utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.lang = speechLang === 'hi' ? 'hi-IN' : 'en-IN';
          utterance.pitch = 1.08;
          utterance.rate = 0.84;
          utterance.volume = 1.0;

          var voices = self.cachedVoices.length > 0 ? self.cachedVoices : window.speechSynthesis.getVoices();
          var pickedVoice = self._pickNaturalVoice(voices, speechLang);
          if (pickedVoice) utterance.voice = pickedVoice;

          var done = false;
          var triggerDone = function() {
            if (!done) {
              done = true;
              if (seq === self._speechSeq && typeof onComplete === 'function') {
                onComplete();
              }
            }
          };

          utterance.onend = triggerDone;
          utterance.onerror = function() {
            try { window.speechSynthesis.resume(); } catch (err) {}
            triggerDone();
          };

          window.speechSynthesis.speak(utterance);

          // Dynamic fallback timer in case speech engine onend is delayed or dropped by OS
          var fallbackMs = Math.max(3500, (textToSpeak ? textToSpeak.length : 10) * 155);
          setTimeout(triggerDone, fallbackMs);
        } catch (err) {
          if (seq === self._speechSeq && typeof onComplete === 'function') onComplete();
        }
      }, 35);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
      if (seq === this._speechSeq && typeof onComplete === 'function') onComplete();
    }
  }

  // Speak Alphabet Letter with clear phonics pronunciation sequence:
  // 1. Phonetic sound of the letter ("Ka!")
  // 2. Brief pause
  // 3. Association phrase ("Ka se Kanha!")
  // Then optional follow-up natural sound via onComplete callback
  speakLetter(letter, wordPhrase, onComplete, phonics) {
    if (this.isMuted || !this.speechEnabled || !('speechSynthesis' in window)) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }
    var lang = this.currentLanguage || 'hi';
    var phoneticSound = phonics || letter;
    var associationPhrase = '';
    if (wordPhrase) {
      if (typeof wordPhrase === 'string') {
        associationPhrase = wordPhrase;
      } else if (typeof wordPhrase === 'object') {
        associationPhrase = wordPhrase[lang] || wordPhrase.en || '';
      }
    }

    // Build a clear, slow phonics-first utterance for toddlers
    // "Ka! ... Ka se Kanha!" — phonetic sound first, then association
    var text = phoneticSound + '! ... ' + associationPhrase;
    this.speak(text, onComplete);
  }

  // Speak Sacred Number & Phonics Counting clearly without parenthetical clutter
  speakNumber(num, details, onComplete) {
    if (this.isMuted || !this.speechEnabled || !('speechSynthesis' in window)) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }
    var lang = this.currentLanguage || 'hi';
    var text = String(num);
    if (details) {
      if (typeof details === 'string') {
        text = num + '! ' + details;
      } else if (typeof details === 'object') {
        var phraseObj = details.shortWord || details.word || details.name;
        var phrase = '';
        if (phraseObj && typeof phraseObj === 'object') {
          phrase = phraseObj[lang] || phraseObj.en || '';
        } else if (typeof phraseObj === 'string') {
          phrase = phraseObj;
        }
        // Strip leading number/dash if already present (e.g., "1 - One Ekam" -> "One Ekam")
        phrase = phrase.replace(/^[0-9१२३४५६७८९०]+\s*[-–]\s*/, '');
        var sanskrit = details.sanskrit ? details.sanskrit.replace(/\s*\([^)]*\)/g, '').trim() : '';
        if (lang === 'hi') {
          text = (phrase || num) + (sanskrit ? '! ' + sanskrit : '');
        } else {
          text = num + '! ' + (phrase || sanskrit);
        }
      }
    }
    this.speak(text, onComplete);
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
      this.stopAllSounds();
    }
    return this.isMuted;
  }

  // Warm Procedural Temple Harmonium Reed Note (100% Web Audio, toddler-ear safe)
  playHarmoniumNote(freq, duration) {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    var now = this.ctx.currentTime;
    var dur = duration || 0.45;

    var osc1 = this.ctx.createOscillator();
    var osc2 = this.ctx.createOscillator();
    var filter = this.ctx.createBiquadFilter();
    var gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 1.003, now); // gentle chorus reed warmth

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1150, now);
    filter.Q.setValueAtTime(1.2, now);

    // Smooth bellows swell envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.065, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.045, now + dur * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.getDestination());

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + dur + 0.04);
    osc2.stop(now + dur + 0.04);
  }

  // 20. Rhythmic Temple Aarti — "Aarti Kunj Bihari Ki"
  // Combines continuous Kaharwa Taal (Mridangam + Manjira beat), Harmonium melody,
  // and smooth couplet voice-over so it feels musical and soothing for kids
  chantAarti(onLineCallback, onCompleteCallback, onBeatCallback) {
    if (this.isMuted) return;
    var self = this;
    this.stopAarti();
    this.ensureContext();
    this._aartiActive = true;

    // 16-beat rhythmic Harmonium melody of "Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki"
    var melody = [
      261.63, 293.66, 329.63, 329.63, // Aa-ra-ti Kun-ja
      392.00, 329.63, 293.66, 261.63, // Bi-ha-ri ki
      293.66, 329.63, 392.00, 440.00, // Shri Gi-ri-dhar Krish-na
      392.00, 329.63, 293.66, 261.63, // Mu-ra-ri ki
      392.00, 392.00, 440.00, 523.25, // Ga-le mein Bai-jan-ti
      440.00, 392.00, 329.63, 392.00, // Maa-la...
      329.63, 392.00, 440.00, 392.00, // Ba-jaa-ve Mu-ra-li
      329.63, 293.66, 261.63, 261.63  // Ma-dhur Baa-la
    ];

    var couplets = [
      'आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की',
      'गले में बैजन्ती माला, बजावे मुरली मधुर बाला',
      'श्रवण में कुण्डल झलकाला, नन्द के आनन्द नन्दलाला',
      'गगन सम अंग कान्ति काली, राधिका चमक रही आली',
      'लतन में ठाढ़े बनमाली, भ्रमर सी अलक कस्तूरी तिलक',
      'चन्द्र सी झलक, ललित छवि श्यामा प्यारी की, आरती कुंजबिहारी की'
    ];

    // Pure instrumental temple ensemble: Harmonium + Bansuri + Kaharwa Taal
    // Lyrics advance in exact musical sync every 16 beats (no robotic TTS over the music)
    var beatStep = 0;
    var totalBeats = couplets.length * 16;

    // Warm opening temple bell + gentle flute greeting
    this.playTempleBell(880);
    if (typeof onLineCallback === 'function') {
      onLineCallback(couplets[0], 1, couplets.length);
    }

    this._aartiBeatInterval = setInterval(function() {
      if (!self._aartiActive || self.isMuted) return;

      if (beatStep >= totalBeats) {
        self.stopAarti();
        self.playTempleBell(880);
        self.playAartiChimes();
        if (typeof onCompleteCallback === 'function') {
          onCompleteCallback();
        }
        return;
      }

      var barBeat = beatStep % 4;
      var phraseBeat = beatStep % 16;
      var noteFreq = melody[beatStep % melody.length];

      // Advance synced on-screen couplet every 16 beats (start of each musical phrase)
      if (beatStep > 0 && phraseBeat === 0) {
        var coupletIdx = Math.floor(beatStep / 16);
        if (coupletIdx < couplets.length && typeof onLineCallback === 'function') {
          onLineCallback(couplets[coupletIdx], coupletIdx + 1, couplets.length);
        }
        self.playTempleBell(880);
      }

      // Warm Harmonium reed + soft Bansuri lead on main beats
      self.playHarmoniumNote(noteFreq, 0.44);
      if (barBeat === 0 || barBeat === 2) {
        self.playBansuri(noteFreq * 2); // gentle octave-up Krishna flute highlight
      }

      // Kaharwa Taal percussion pattern: Dha (bass) - Manjira - Ta (treble) - Manjira
      if (barBeat === 0 && typeof self.playMridangaDha === 'function') {
        self.playMridangaDha();
      } else if (barBeat === 1 && typeof self.playManjiraClink === 'function') {
        self.playManjiraClink();
      } else if (barBeat === 2 && typeof self.playMridangaTa === 'function') {
        self.playMridangaTa();
      } else if (barBeat === 3 && typeof self.playManjiraClink === 'function') {
        self.playManjiraClink();
      }

      if (typeof onBeatCallback === 'function') {
        onBeatCallback(barBeat, beatStep);
      }

      beatStep++;
    }, 420);
  }

  // Silence any speech in progress (and drop its pending completion callback)
  stopSpeech() {
    this._speechSeq = (this._speechSeq || 0) + 1;
    try {
      if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (e) {}
  }

  stopAarti() {
    this._aartiActive = false;
    if (this._aartiBeatInterval) {
      clearInterval(this._aartiBeatInterval);
      this._aartiBeatInterval = null;
    }
    if (this._aartiTimer) {
      clearTimeout(this._aartiTimer);
      this._aartiTimer = null;
    }
    this._speechSeq = (this._speechSeq || 0) + 1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  // 21. Vrindavan Nature Ambience Soundscape (Yamuna stream + distant birds)
  startNatureAmbience() {
    if (this.isMuted || this.isNatureAmbiencePlaying) return;
    this.ensureContext();
    this.isNatureAmbiencePlaying = true;
    var self = this;

    // Play a soft initial Yamuna breeze + bird chirp
    if (typeof this.playKadambaBreeze === 'function') this.playKadambaBreeze();

    this._natureAmbienceTimer = setInterval(function() {
      if (!self.isNatureAmbiencePlaying || self.isMuted) return;
      var r = Math.random();
      if (r < 0.45 && typeof self.playForestBirdsChirp === 'function') {
        self.playForestBirdsChirp();
      } else if (r < 0.8 && typeof self.playKadambaBreeze === 'function') {
        self.playKadambaBreeze();
      } else if (typeof self.playYamunaStream === 'function') {
        self.playYamunaStream();
      }
    }, 5500);
  }

  stopNatureAmbience() {
    this.isNatureAmbiencePlaying = false;
    if (this._natureAmbienceTimer) {
      clearInterval(this._natureAmbienceTimer);
      this._natureAmbienceTimer = null;
    }
  }

  toggleNatureAmbience() {
    if (this.isNatureAmbiencePlaying) {
      this.stopNatureAmbience();
      return false;
    } else {
      this.startNatureAmbience();
      return true;
    }
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
