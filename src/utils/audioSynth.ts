/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioSynthManager {
  private ctx: AudioContext | null = null;
  private isBgmPlaying = false;
  private bgmTimeoutId: number | null = null;
  private masterVolume: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.masterVolume = this.ctx.createGain();
        this.masterVolume.gain.setValueAtTime(0.15, this.ctx.currentTime); // Gentle default volume
        this.masterVolume.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterVolume) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0.3, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.6);
        
        osc.connect(gain);
        gain.connect(this.masterVolume!);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.7);
      });
    } catch (e) {
      console.warn("Audio chime play failed:", e);
    }
  }

  playTone(freq: number, durationMs: number = 500) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterVolume) return;

      const now = this.ctx.currentTime;
      const durationSec = durationMs / 1000;

      // Primary tone (triangle wave for flute/voice/soft instrument feel)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      // Slight vibrato for a violin-like emotional texture
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.value = 5.5; // Vibrato frequency (Hz)
      vibratoGain.gain.value = 4.0; // Vibrato depth (Hz)
      
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      osc.connect(gain);
      gain.connect(this.masterVolume);

      vibrato.start(now);
      osc.start(now);

      vibrato.stop(now + durationSec);
      osc.stop(now + durationSec);
    } catch (e) {
      console.warn("Audio tone play failed:", e);
    }
  }

  // Plays a lovely generative visual novel background chord loop
  startBGM() {
    if (this.isBgmPlaying) return;
    this.initContext();
    this.isBgmPlaying = true;
    
    const playNextChord = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.masterVolume) return;

      const now = this.ctx.currentTime;
      // Classy sad-happy progression in Roman-Chore:
      // Am9 (A, C, E, B) -> Fmaj7 (F, A, C, E) -> Cmaj7 (C, E, G, B) -> G7sus4 (G, C, D, G)
      // Cozy/Warm Coffeehouse Jazz progressions (mellow 9th & 13th extensions for a lofi cafe lounge feel)
      const progressions = [
        [130.81, 164.81, 196.00, 246.94, 293.66], // CMaj9 (Comforting base)
        [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9 (Mellow sadness)
        [98.00, 123.47, 174.61, 220.00, 329.63],  // G13 / G7b13 (Classic jazz transition)
        [110.00, 130.81, 164.81, 196.00, 246.94]  // Am9 (Nostalgic shelter)
      ];

      // Select progression cycle
      const timeCycle = Math.floor(now / 5.5) % progressions.length;
      const chords = progressions[timeCycle];

      // Play soft arpeggiated piano chords
      chords.forEach((freq, idx) => {
        if (!this.ctx || !this.masterVolume) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Use soft triangle waves for that classic Rhodes / warm jazz piano feel
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        // Soft jazz attack and long, sweet lofi decay
        gain.gain.setValueAtTime(0.001, now + idx * 0.18);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.18 + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 4.5);

        osc.connect(gain);
        gain.connect(this.masterVolume);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 5.0);
      });

      // Schedule next chord in 5.5 seconds
      this.bgmTimeoutId = window.setTimeout(playNextChord, 5500) as any;
    };

    playNextChord();
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimeoutId) {
      clearTimeout(this.bgmTimeoutId);
      this.bgmTimeoutId = null;
    }
  }

  getBgmStatus() {
    return this.isBgmPlaying;
  }
}

export const audioSynth = new AudioSynthManager();
