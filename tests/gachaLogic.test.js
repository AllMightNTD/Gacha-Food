import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useVeto } from '../src/composables/useVeto.js'
import { useGacha } from '../src/composables/useGacha.js'
import { useFoodStore } from '../src/composables/useFoodStore.js'

describe('useVeto & useGacha Composables', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const { resetVeto } = useVeto()
    resetVeto()
    const { resetGacha } = useGacha()
    resetGacha()
  })

  describe('useVeto', () => {
    it('should start with 3 hearts and no punishment', () => {
      const { hearts, isVetoAvailable, activePunishment } = useVeto()
      expect(hearts.value).toBe(3)
      expect(isVetoAvailable.value).toBe(true)
      expect(activePunishment.value).toBeNull()
    })

    it('should decrease hearts on each veto', () => {
      const { hearts, isVetoAvailable, triggerVeto } = useVeto()
      triggerVeto()
      expect(hearts.value).toBe(2)
      expect(isVetoAvailable.value).toBe(true)

      triggerVeto()
      expect(hearts.value).toBe(1)
      expect(isVetoAvailable.value).toBe(true)

      triggerVeto()
      expect(hearts.value).toBe(0)
      expect(isVetoAvailable.value).toBe(false)
    })

    it('should assign a punishment when hearts reach 0', () => {
      const { triggerVeto, activePunishment, isVetoAvailable } = useVeto()
      triggerVeto()
      triggerVeto()
      triggerVeto()

      expect(isVetoAvailable.value).toBe(false)
      expect(activePunishment.value).not.toBeNull()
      expect(activePunishment.value.title).toBeTruthy()
    })

    it('should reset veto state properly', () => {
      const { triggerVeto, resetVeto, hearts, activePunishment } = useVeto()
      triggerVeto()
      triggerVeto()
      triggerVeto()
      resetVeto()

      expect(hearts.value).toBe(3)
      expect(activePunishment.value).toBeNull()
    })
  })

  describe('useGacha', () => {
    it('should start with idle state and no result', () => {
      const { machineState, currentResult } = useGacha()
      expect(machineState.value).toBe('idle')
      expect(currentResult.value).toBeNull()
    })

    it('should execute spin lifecycle and produce a food result', async () => {
      const { machineState, currentResult, startSpin, openCapsule } = useGacha()

      const spinPromise = startSpin()
      expect(machineState.value).toBe('spinning')

      // Fast-forward spinning duration
      vi.advanceTimersByTime(1500)
      await spinPromise
      expect(machineState.value).toBe('dropped')
      expect(currentResult.value).not.toBeNull()

      // Open capsule
      const openPromise = openCapsule()
      expect(machineState.value).toBe('opening')
      vi.advanceTimersByTime(800)
      await openPromise
      expect(machineState.value).toBe('revealed')
    })
  })
})
