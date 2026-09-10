import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'
import { useFoodStore } from '../src/composables/useFoodStore.js'
import { useVeto } from '../src/composables/useVeto.js'
import { useGacha } from '../src/composables/useGacha.js'

describe('End-to-End Couple Food Gacha Flow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const { resetToDefault } = useFoodStore()
    resetToDefault()
    const { resetVeto } = useVeto()
    resetVeto()
    const { resetGacha } = useGacha()
    resetGacha()
  })

  it('should complete the full flow from spinning to receipt modal', async () => {
    const wrapper = mount(App)

    // 1. Initial view has gashapon machine and filters
    expect(wrapper.find('.gashapon-crank').exists()).toBe(true)

    // 2. Click crank to start spinning
    const { machineState, startSpin, openCapsule } = useGacha()
    const spinPromise = startSpin()
    expect(machineState.value).toBe('spinning')

    vi.advanceTimersByTime(1200)
    await spinPromise
    await wrapper.vm.$nextTick()
    expect(machineState.value).toBe('dropped')

    // 3. Open capsule
    const openPromise = openCapsule()
    expect(machineState.value).toBe('opening')
    vi.advanceTimersByTime(600)
    await openPromise
    await wrapper.vm.$nextTick()
    expect(machineState.value).toBe('revealed')

    // 4. Confirm food and open receipt
    const { currentResult } = useGacha()
    expect(currentResult.value).not.toBeNull()

    // Trigger confirm
    wrapper.vm.handleFoodConfirmed(currentResult.value)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.confirmedFood).toEqual(currentResult.value)
    expect(wrapper.vm.isReceiptOpen).toBe(true)
  })
})
