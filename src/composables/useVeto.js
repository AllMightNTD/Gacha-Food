import { ref, computed } from 'vue'
import { punishmentList } from '../data/punishmentList.js'

const MAX_HEARTS = 3
const hearts = ref(MAX_HEARTS)
const activePunishment = ref(null)

export function useVeto() {
  const isVetoAvailable = computed(() => hearts.value > 0)

  function triggerVeto() {
    if (hearts.value > 0) {
      hearts.value--
    }

    if (hearts.value === 0 && !activePunishment.value) {
      const randomIndex = Math.floor(Math.random() * punishmentList.length)
      activePunishment.value = punishmentList[randomIndex]
    }

    return {
      remainingHearts: hearts.value,
      punishment: activePunishment.value,
    }
  }

  function resetVeto() {
    hearts.value = MAX_HEARTS
    activePunishment.value = null
  }

  return {
    hearts,
    isVetoAvailable,
    activePunishment,
    triggerVeto,
    resetVeto,
  }
}
