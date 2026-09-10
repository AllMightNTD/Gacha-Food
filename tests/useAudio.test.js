import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAudio } from '../src/composables/useAudio.js'

describe('useAudio Composable', () => {
  beforeEach(() => {
    // Mock navigator.vibrate
    navigator.vibrate = vi.fn()

    // Mock AudioContext
    window.AudioContext = vi.fn().mockImplementation(() => ({
      state: 'running',
      currentTime: 0,
      resume: vi.fn().mockResolvedValue(),
      createOscillator: vi.fn().mockReturnValue({
        type: 'sine',
        frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }),
      createGain: vi.fn().mockReturnValue({
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
      }),
      destination: {},
    }))
  })

  it('should initialize with sound enabled and allow toggling mute', () => {
    const { isMuted, toggleMute } = useAudio()
    expect(isMuted.value).toBe(false)
    toggleMute()
    expect(isMuted.value).toBe(true)
    toggleMute()
    expect(isMuted.value).toBe(false)
  })

  it('should play sounds without error when not muted', () => {
    const { playCrankSound, playDropSound, playOpenSound, playFanfareSound, playVetoSound, isMuted } = useAudio()
    isMuted.value = false

    expect(() => playCrankSound()).not.toThrow()
    expect(() => playDropSound()).not.toThrow()
    expect(() => playOpenSound()).not.toThrow()
    expect(() => playFanfareSound('SSR')).not.toThrow()
    expect(() => playFanfareSound('R')).not.toThrow()
    expect(() => playVetoSound()).not.toThrow()
  })

  it('should trigger haptic vibration', () => {
    const { triggerHaptic } = useAudio()
    triggerHaptic([50, 50, 50])
    expect(navigator.vibrate).toHaveBeenCalledWith([50, 50, 50])
  })
})
