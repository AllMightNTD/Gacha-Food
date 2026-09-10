<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
  >
    <!-- Opening Egg Animation Phase -->
    <div
      v-if="machineState === 'opening'"
      class="flex flex-col items-center justify-center space-y-4 select-none"
    >
      <div class="relative w-36 h-36 flex items-center justify-center animate-egg-shake">
        <!-- Rarity Aura glow -->
        <div class="absolute inset-0 rounded-full bg-yellow-300 filter blur-2xl opacity-70 animate-pulse"></div>

        <!-- The Hatching Capsule -->
        <div
          class="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative"
          :style="{ backgroundColor: currentCapsuleColor }"
        >
          <!-- Top Half Shell -->
          <div class="w-full h-1/2 bg-white/80 absolute top-0 left-0 border-b-2 border-dashed border-gray-300 flex items-end justify-center">
            <div class="w-4 h-2 bg-yellow-400 rounded-t-full mb-1"></div>
          </div>
          <!-- Center crack glow -->
          <div class="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
            ✨
          </div>
        </div>
      </div>

      <div class="text-white text-base font-black tracking-widest drop-shadow-md animate-pulse">
        ĐANG BUNG VỎ TRỨNG...
      </div>
    </div>

    <!-- Revealed Result Card Phase -->
    <div
      v-else-if="machineState === 'revealed' && currentResult"
      class="w-full max-w-sm animate-pop max-h-[90vh] overflow-y-auto no-scrollbar"
    >
      <ResultCard
        :food="currentResult"
        :hearts="hearts"
        :punishment="activePunishment"
        @confirm="$emit('confirm-food', currentResult)"
        @veto="handleVetoClick"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import confetti from 'canvas-confetti'
import ResultCard from './ResultCard.vue'
import { useGacha } from '../composables/useGacha.js'
import { useVeto } from '../composables/useVeto.js'
import { useAudio } from '../composables/useAudio.js'

const emit = defineEmits(['confirm-food', 'close'])

const { machineState, currentCapsuleColor, currentResult, startSpin, openCapsule } = useGacha()
const { hearts, activePunishment, triggerVeto } = useVeto()
const { playFanfareSound, playVetoSound, playOpenSound } = useAudio()

const isOpen = computed(() => {
  return machineState.value === 'opening' || machineState.value === 'revealed'
})

// Trigger confetti and fanfare when state switches to revealed
watch(machineState, (newState) => {
  if (newState === 'revealed' && currentResult.value) {
    playFanfareSound(currentResult.value.rarity)
    fireConfetti(currentResult.value.rarity)
  }
})

function fireConfetti(rarity) {
  try {
    const count = rarity === 'SSR' ? 120 : 60
    confetti({
      particleCount: count,
      spread: rarity === 'SSR' ? 100 : 70,
      origin: { y: 0.6 },
      colors: rarity === 'SSR' ? ['#FDE047', '#F59E0B', '#EF4444', '#EC4899'] : ['#F472B6', '#38BDF8', '#4ADE80', '#A78BFA'],
    })
  } catch (e) {
    // ignore if canvas-confetti fails in test environment
  }
}

async function handleVetoClick() {
  if (hearts.value <= 0) return

  playVetoSound()
  triggerVeto()

  // Re-spin immediately
  await startSpin()
  playOpenSound()
  await openCapsule()
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
