import { ref, computed } from 'vue'
import { defaultFoods } from '../data/defaultFoods.js'

const STORAGE_KEY = 'gacha_food_couple_data'

function loadInitialFoods() {
  if (typeof localStorage === 'undefined') {
    return defaultFoods.map(f => ({ ...f, isActive: true }))
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to load foods from localStorage:', e)
  }

  return defaultFoods.map(f => ({ ...f, isActive: true }))
}

const foods = ref(loadInitialFoods())
const selectedCategory = ref('all')
const selectedBudget = ref('all') // 'all', 'rich' (SSR), 'cheap' (R), 'medium' (SR)

function saveFoods() {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foods.value))
    } catch (e) {
      console.error('Failed to save foods to localStorage:', e)
    }
  }
}

export function useFoodStore() {
  const activeFoods = computed(() => {
    return foods.value.filter(f => f.isActive !== false)
  })

  const filteredFoods = computed(() => {
    return activeFoods.value.filter(food => {
      // Filter by category
      if (selectedCategory.value !== 'all' && food.category !== selectedCategory.value) {
        return false
      }

      // Filter by budget / rarity
      if (selectedBudget.value === 'rich' && food.rarity !== 'SSR') {
        return false
      }
      if (selectedBudget.value === 'cheap' && food.rarity !== 'R') {
        return false
      }
      if (selectedBudget.value === 'medium' && food.rarity !== 'SR') {
        return false
      }

      return true
    })
  })

  function toggleFoodActive(id) {
    const item = foods.value.find(f => f.id === id)
    if (item) {
      item.isActive = item.isActive === false ? true : false
      saveFoods()
    }
  }

  function addCustomFood(custom) {
    const newFood = {
      id: 'custom-' + Date.now(),
      name: custom.name.trim(),
      category: custom.category || 'snack',
      rarity: custom.rarity || 'SR',
      icon: custom.icon || '🍱',
      priceLevel: custom.priceLevel || '$$',
      description: custom.description || 'Món ruột của cặp đôi',
      tag: custom.tag || 'Tự thêm • Quán ruột',
      isCustom: true,
      isActive: true,
    }

    foods.value.unshift(newFood)
    saveFoods()
    return newFood
  }

  function deleteFood(id) {
    const idx = foods.value.findIndex(f => f.id === id)
    if (idx !== -1) {
      foods.value.splice(idx, 1)
      saveFoods()
    }
  }

  function resetToDefault() {
    foods.value = defaultFoods.map(f => ({ ...f, isActive: true }))
    saveFoods()
  }

  function setCategory(category) {
    selectedCategory.value = category
  }

  function setBudget(budget) {
    selectedBudget.value = budget
  }

  return {
    foods,
    activeFoods,
    filteredFoods,
    selectedCategory,
    selectedBudget,
    toggleFoodActive,
    addCustomFood,
    deleteFood,
    resetToDefault,
    setCategory,
    setBudget,
  }
}
