import { ref } from 'vue'

const isMuted = ref(false)
let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function useAudio() {
  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  function triggerHaptic(pattern = [30]) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern)
      } catch {
        // ignore if not supported
      }
    }
  }

  // 1. Mechanical crank click (tiếng cót két khi vặn núm)
  function playCrankSound() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    triggerHaptic(20)

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(150 + Math.random() * 80, now)
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.06)

    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.06)
  }

  // 2. Ball drop sound (tiếng bóng rơi xuống khay)
  function playDropSound() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    triggerHaptic([30, 40, 20])

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(400, now)
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.12)

    gain.gain.setValueAtTime(0.5, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.12)
  }

  // 3. Capsule pop sound (tiếng tách đôi vỏ trứng)
  function playOpenSound() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    triggerHaptic([50, 60, 80])

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(250, now)
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08)

    gain.gain.setValueAtTime(0.6, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.15)
  }

  // 4. Fanfare melody on reveal (nhạc vinh danh theo phẩm cấp)
  function playFanfareSound(rarity = 'R') {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    let notes = [523.25, 659.25, 783.99] // C5, E5, G5
    if (rarity === 'SR') {
      notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    } else if (rarity === 'SSR') {
      notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98] // C5, E5, G5, C6, E6, G6
    }

    const now = ctx.currentTime
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const noteStart = now + idx * 0.09

      osc.type = rarity === 'SSR' ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(freq, noteStart)

      gain.gain.setValueAtTime(0.35, noteStart)
      gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(noteStart)
      osc.stop(noteStart + 0.35)
    })
  }

  // 5. Veto sound (tiếng mất tim tiếc nuối)
  function playVetoSound() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    triggerHaptic([100, 50, 100])

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(320, now)
    osc.frequency.linearRampToValueAtTime(160, now + 0.25)

    gain.gain.setValueAtTime(0.25, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.25)
  }

  return {
    isMuted,
    toggleMute,
    playCrankSound,
    playDropSound,
    playOpenSound,
    playFanfareSound,
    playVetoSound,
    triggerHaptic,
  }
}
