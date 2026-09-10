import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ReceiptModal from '../src/components/ReceiptModal.vue'

describe('ReceiptModal.vue', () => {
  const mockFood = {
    id: 'ssr-haidilao',
    name: 'Lẩu Haidilao Múa Mì',
    category: 'hotpot',
    rarity: 'SSR',
    icon: '🍲',
    priceLevel: '$$$',
    description: 'Nước lẩu Tomyum đậm đà',
  }

  it('should render receipt details with food and commitment clause', () => {
    const wrapper = mount(ReceiptModal, {
      props: {
        food: mockFood,
        punishment: null,
      }
    })

    expect(wrapper.text()).toContain('BIÊN LAI HẸN HÒ GACHA FOOD')
    expect(wrapper.text()).toContain('Lẩu Haidilao Múa Mì')
    expect(wrapper.text()).toContain('ĐÃ CHỐT KÈO')
    expect(wrapper.text()).toContain('cấm dỗi')
  })

  it('should allow editing couple names', async () => {
    const wrapper = mount(ReceiptModal, {
      props: {
        food: mockFood,
        punishment: null,
      }
    })

    const boyInput = wrapper.find('input[placeholder="Tên bạn nam"]')
    const girlInput = wrapper.find('input[placeholder="Tên bạn nữ"]')

    expect(boyInput.exists()).toBe(true)
    expect(girlInput.exists()).toBe(true)

    await boyInput.setValue('Anh Đạt')
    await girlInput.setValue('Em Hằng')

    expect(boyInput.element.value).toBe('Anh Đạt')
    expect(girlInput.element.value).toBe('Em Hằng')
  })

  it('should emit restart when clicking new date button', async () => {
    const wrapper = mount(ReceiptModal, {
      props: {
        food: mockFood,
        punishment: null,
      }
    })

    const restartBtn = wrapper.find('.btn-restart')
    await restartBtn.trigger('click')
    expect(wrapper.emitted('restart')).toBeTruthy()
  })
})
