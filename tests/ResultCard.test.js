import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultCard from '../src/components/ResultCard.vue'

describe('ResultCard.vue', () => {
  const mockFood = {
    id: 'ssr-haidilao',
    name: 'Lẩu Haidilao Múa Mì',
    category: 'hotpot',
    rarity: 'SSR',
    icon: '🍲',
    priceLevel: '$$$',
    description: 'Nước lẩu Tomyum đậm đà',
    tag: 'Sang chảnh • Lãng mạn',
  }

  it('should render food information correctly', () => {
    const wrapper = mount(ResultCard, {
      props: {
        food: mockFood,
        hearts: 3,
        punishment: null,
      }
    })

    expect(wrapper.text()).toContain('Lẩu Haidilao Múa Mì')
    expect(wrapper.text()).toContain('SSR')
    expect(wrapper.text()).toContain('$$$')
  })

  it('should show 3 hearts when hearts prop is 3', () => {
    const wrapper = mount(ResultCard, {
      props: {
        food: mockFood,
        hearts: 3,
        punishment: null,
      }
    })

    expect(wrapper.findAll('.heart-icon').length).toBe(3)
  })

  it('should emit confirm when clicking confirm button', async () => {
    const wrapper = mount(ResultCard, {
      props: {
        food: mockFood,
        hearts: 3,
        punishment: null,
      }
    })

    const confirmBtn = wrapper.find('.btn-confirm')
    await confirmBtn.trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('should emit veto when clicking veto button with remaining hearts', async () => {
    const wrapper = mount(ResultCard, {
      props: {
        food: mockFood,
        hearts: 2,
        punishment: null,
      }
    })

    const vetoBtn = wrapper.find('.btn-veto')
    await vetoBtn.trigger('click')
    expect(wrapper.emitted('veto')).toBeTruthy()
  })

  it('should disable veto button and display punishment when hearts reach 0', () => {
    const wrapper = mount(ResultCard, {
      props: {
        food: mockFood,
        hearts: 0,
        punishment: {
          id: 'punish-kiss',
          title: 'Nụ Hôn Bất Ngờ',
          icon: '💋',
          description: 'Phạt thơm má người yêu 1 cái thật to!',
        },
      }
    })

    const vetoBtn = wrapper.find('.btn-veto')
    expect(vetoBtn.attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('Nụ Hôn Bất Ngờ')
  })
})
