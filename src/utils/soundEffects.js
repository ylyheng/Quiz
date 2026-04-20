/**
 * Generate and play sound effects using Web Audio API
 */

let audioContext = null;

function getAudioContext() {
  if (!audioContext && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log("Audio context not available");
      return null;
    }
  }
  return audioContext;
}

/**
 * Play a correct answer sound (ascending tones)
 */
export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    const noteLength = 0.15;

    // First note (higher pitch)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.value = 800;
    osc1.type = "sine";
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + noteLength);
    osc1.start(now);
    osc1.stop(now + noteLength);

    // Second note (even higher pitch)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 1200;
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0.3, now + noteLength);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + noteLength * 2);
    osc2.start(now + noteLength);
    osc2.stop(now + noteLength * 2);
  } catch (e) {
    console.log("Sound effects not available");
  }
}

/**
 * Play a wrong answer sound (descending tone)
 */
export function playWrongSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    const duration = 0.3;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";

    // Frequency sweep down
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + duration);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    console.log("Sound effects not available");
  }
}

/**
 * Play a timeout sound (warning beep)
 */
export function playTimeoutSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    const interval = 0.15;

    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 700;
      osc.type = "sine";

      const startTime = now + i * interval;
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
      osc.start(startTime);
      osc.stop(startTime + 0.1);
    }
  } catch (e) {
    console.log("Sound effects not available");
  }
}
