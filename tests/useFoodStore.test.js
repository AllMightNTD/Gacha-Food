import { describe, it, expect, beforeEach } from 'vitest'
import { useFoodStore } from '../src/composables/useFoodStore.js'

describe('useFoodStore Composable', () => {
  beforeEach(() => {
    localStorage.clear()
    const { resetToDefault, setCategory, setBudget } = useFoodStore()
    resetToDefault()
    setCategory('all')
    setBudget('all')
  })

  it('should initialize with default foods and have active items', () => {
    const { foods, activeFoods } = useFoodStore()
    expect(foods.value.length).toBeGreaterThan(25)
    expect(activeFoods.value.length).toBe(foods.value.length)
  })

  it('should filter foods by category', () => {
    const { filteredFoods, setCategory } = useFoodStore()
    setCategory('hotpot')
    expect(filteredFoods.value.length).toBeGreaterThan(0)
    filteredFoods.value.forEach(f => expect(f.category).toBe('hotpot'))
  })

  it('should filter foods by budget / rarity level', () => {
    const { filteredFoods, setBudget } = useFoodStore()
    setBudget('rich') // SSR only
    expect(filteredFoods.value.length).toBeGreaterThan(0)
    filteredFoods.value.forEach(f => expect(f.rarity).toBe('SSR'))

    setBudget('cheap') // R only
    expect(filteredFoods.value.length).toBeGreaterThan(0)
    filteredFoods.value.forEach(f => expect(f.rarity).toBe('R'))
  })

  it('should toggle food active status and reflect in filteredFoods', () => {
    const { foods, toggleFoodActive, filteredFoods } = useFoodStore()
    const target = foods.value[0]
    expect(target.isActive).toBe(true)

    toggleFoodActive(target.id)
    expect(target.isActive).toBe(false)
    expect(filteredFoods.value.some(f => f.id === target.id)).toBe(false)

    toggleFoodActive(target.id)
    expect(target.isActive).toBe(true)
    expect(filteredFoods.value.some(f => f.id === target.id)).toBe(true)
  })

  it('should add custom food and persist in localStorage', () => {
    const { foods, addCustomFood } = useFoodStore()
    const custom = {
      name: 'Quán Lẩu Gần Nhà Em',
      category: 'hotpot',
      rarity: 'SSR',
      icon: '🍲',
      priceLevel: '$$$',
      description: 'Quán ruột siêu ngon hai đứa hay ghé',
      tag: 'Quán ruột',
    }
    const added = addCustomFood(custom)
    expect(added.id).toBeDefined()
    expect(foods.value.some(f => f.name === 'Quán Lẩu Gần Nhà Em')).toBe(true)

    // Check localStorage
    const saved = JSON.parse(localStorage.getItem('gacha_food_couple_data'))
    expect(saved.some(f => f.name === 'Quán Lẩu Gần Nhà Em')).toBe(true)
  })

  it('should delete a custom food', () => {
    const { foods, addCustomFood, deleteFood } = useFoodStore()
    const custom = addCustomFood({
      name: 'Món Sẽ Bị Xóa',
      category: 'snack',
      rarity: 'R',
      icon: '🍢',
      priceLevel: '$',
      description: 'Test delete',
    })

    expect(foods.value.some(f => f.id === custom.id)).toBe(true)
    deleteFood(custom.id)
    expect(foods.value.some(f => f.id === custom.id)).toBe(false)
  })
})
