import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuDrawer from '../src/components/MenuDrawer.vue'

describe('MenuDrawer.vue', () => {
  it('should render food items and active toggles when open', () => {
    const wrapper = mount(MenuDrawer, {
      props: {
        isOpen: true,
      }
    })

    expect(wrapper.text()).toContain('Sổ Thực Đơn')
    expect(wrapper.findAll('.food-item-row').length).toBeGreaterThan(20)
  })

  it('should emit close event when clicking close button', async () => {
    const wrapper = mount(MenuDrawer, {
      props: {
        isOpen: true,
      }
    })

    const closeBtn = wrapper.find('.btn-close-drawer')
    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should add a custom food item via input form', async () => {
    const wrapper = mount(MenuDrawer, {
      props: {
        isOpen: true,
      }
    })

    const nameInput = wrapper.find('input[placeholder="Tên món / Quán ruột..."]')
    await nameInput.setValue('Lẩu Nấm Nhà Làm')

    const addBtn = wrapper.find('.btn-add-food')
    await addBtn.trigger('click')

    expect(wrapper.text()).toContain('Lẩu Nấm Nhà Làm')
  })
})
