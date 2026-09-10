import { ref } from 'vue'
import { useFoodStore } from './useFoodStore.js'

const CAPSULE_COLORS = [
  '#FDA4AF', // Pink
  '#FDE047', // Yellow
  '#6EE7B7', // Mint green
  '#C4B5FD', // Lavender
  '#FDBA74', // Peach orange
  '#93C5FD', // Sky blue
]

const machineState = ref('idle') // 'idle' | 'spinning' | 'dropped' | 'opening' | 'revealed'
const currentCapsuleColor = ref(CAPSULE_COLORS[0])
const currentResult = ref(null)

export function useGacha() {
  const { filteredFoods, foods } = useFoodStore()

  async function startSpin() {
    machineState.value = 'spinning'

    // Pick random capsule color
    currentCapsuleColor.value = CAPSULE_COLORS[Math.floor(Math.random() * CAPSULE_COLORS.length)]

    // Select candidate food item
    const pool = filteredFoods.value.length > 0 ? filteredFoods.value : foods.value
    if (pool.length > 0) {
      // Rarity weight bias if desired, or uniform over filtered pool
      const picked = pool[Math.floor(Math.random() * pool.length)]
      currentResult.value = picked
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        machineState.value = 'dropped'
        resolve(currentResult.value)
      }, 1200)
    })
  }

  async function openCapsule() {
    machineState.value = 'opening'
    return new Promise((resolve) => {
      setTimeout(() => {
        machineState.value = 'revealed'
        resolve(currentResult.value)
      }, 600)
    })
  }

  function resetGacha() {
    machineState.value = 'idle'
    currentResult.value = null
  }

  return {
    machineState,
    currentCapsuleColor,
    currentResult,
    startSpin,
    openCapsule,
    resetGacha,
  }
}
