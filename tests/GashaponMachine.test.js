import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GashaponMachine from '../src/components/GashaponMachine.vue'
import { useGacha } from '../src/composables/useGacha.js'

describe('GashaponMachine.vue', () => {
  it('should render the machine structure properly', () => {
    const wrapper = mount(GashaponMachine)
    expect(wrapper.find('.gashapon-dome').exists()).toBe(true)
    expect(wrapper.find('.gashapon-crank').exists()).toBe(true)
    expect(wrapper.find('.gashapon-tray').exists()).toBe(true)
  })

  it('should trigger spin when clicking the crank handle in idle state', async () => {
    const { machineState, resetGacha } = useGacha()
    resetGacha()

    const wrapper = mount(GashaponMachine)
    const crank = wrapper.find('.gashapon-crank')
    await crank.trigger('click')

    expect(machineState.value).toBe('spinning')
  })

  it('should show the dropped capsule when state is dropped', async () => {
    const { machineState } = useGacha()
    machineState.value = 'dropped'

    const wrapper = mount(GashaponMachine)
    const droppedEgg = wrapper.find('.dropped-capsule')
    expect(droppedEgg.exists()).toBe(true)
  })
})
