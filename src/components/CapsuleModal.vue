<template>
  <Teleport to="body" :disabled="isTest">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-[#1E1B4B]/80 backdrop-blur-sm transition-opacity font-sora overflow-y-auto"
    >
    <!-- Celebration Sparkles & Floating Hearts Canvas -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[10%] left-[10%] w-6 h-6 rounded-full bg-[#F59E0B] blur-[2px] animate-ping"></div>
      <div class="absolute top-[15%] right-[15%] w-4 h-4 rounded-full bg-[#F59E0B]"></div>
      <div class="absolute top-[22%] left-[20%] text-3xl animate-bounce">✨</div>
      <div class="absolute top-[20%] right-[22%] text-4xl animate-bounce" style="animation-delay: 0.3s">✨</div>
      <div class="absolute bottom-[25%] left-[12%] text-2xl animate-pulse">💖</div>
      <div class="absolute bottom-[28%] right-[15%] text-3xl animate-pulse" style="animation-delay: 0.5s">💖</div>
    </div>

    <!-- Opening Egg Animation Phase -->
    <div
      v-if="machineState === 'opening'"
      class="flex flex-col items-center justify-center space-y-4 select-none z-10"
    >
      <div class="relative w-36 h-36 flex items-center justify-center animate-egg-shake">
        <div class="absolute inset-0 rounded-full bg-[#F59E0B] filter blur-2xl opacity-70 animate-pulse"></div>
        <div class="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative bg-[#FCE7F3] flex items-center justify-center">
          <div class="w-full h-1/2 bg-white/80 absolute top-0 left-0 border-b-2 border-dashed border-gray-300"></div>
          <div class="relative z-10 text-5xl animate-bounce">🎁</div>
        </div>
      </div>
      <div class="text-white text-base font-extrabold tracking-widest drop-shadow-md animate-pulse">
        ĐANG BUNG QUÀ...
      </div>
    </div>

    <!-- Figma ModalContainer Result Modal -->
    <div
      v-else-if="machineState === 'revealed' && currentResult"
      class="w-full max-w-[343px] sm:max-w-[360px] max-h-[85vh] my-auto bg-white rounded-[32px] border-4 border-[#FCE7F3] p-5 sm:p-6 shadow-[0_20px_50px_rgba(30,27,75,0.4)] flex flex-col items-center gap-4 sm:gap-5 relative z-10 animate-pop overflow-y-auto no-scrollbar"
    >
      <!-- ModalHeader -->
      <div class="w-full flex items-center justify-between">
        <!-- Rarity Badge -->
        <div class="px-3 py-1 bg-[#F59E0B] border-2 border-white rounded-xl shadow-xs">
          <span class="text-xs font-extrabold text-white uppercase">
            {{ currentResult.rarity === 'SSR' ? 'SSR TRÚNG THƯỞNG' : (currentResult.rarity === 'SR' ? 'SR MÓN NGON' : 'TRÚNG THƯỞNG') }}
          </span>
        </div>

        <!-- Close Button -->
        <button
          @click="handleClose"
          class="w-9 h-9 rounded-full bg-[#FCE7F3] text-[#6B21A8] hover:bg-pink-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Đóng Modal"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- FoodShowcase Image -->
      <div class="w-[260px] h-[260px] rounded-[24px] border-3 border-[#DDD6FE] overflow-hidden shadow-inner flex items-center justify-center bg-purple-50">
        <img
          v-if="currentResult.image"
          :src="currentResult.image"
          :alt="currentResult.name"
          class="w-full h-full object-cover"
        />
        <img
          v-else
          src="/images/food_showcase.png"
          :alt="currentResult.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- FoodDetails -->
      <div class="w-full flex flex-col items-center text-center gap-2">
        <h2 class="font-bricolage text-2xl font-extrabold text-[#1E1B4B] tracking-tight uppercase leading-snug">
          {{ currentResult.name }}
        </h2>
        <p class="font-sora text-xs font-semibold text-[#6B21A8] leading-relaxed">
          {{ currentResult.description || 'Món ăn hoàn hảo cho buổi hẹn hò! Hương vị tuyệt vời giúp buổi tối thêm trọn vẹn.' }}
        </p>
      </div>

      <!-- DividerLine -->
      <div class="w-full h-[2px] bg-[#F3E8FF]"></div>

      <!-- ModalActions -->
      <div class="w-full flex flex-col gap-2.5">
        <!-- ActionGachaAgain / Veto -->
        <button
          @click="handleVetoClick"
          :disabled="hearts <= 0"
          class="w-full h-[48px] bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-50 border-2 border-white rounded-[24px] shadow-[0_4px_8px_rgba(59,130,246,0.3)] flex items-center justify-center transition-all active:scale-95 cursor-pointer"
        >
          <span class="font-sora font-extrabold text-sm text-white uppercase">
            {{ hearts > 0 ? `GACHA LẠI (-500) • CÒN ${hearts} TIM` : 'HẾT LẦN GACHA LẠI' }}
          </span>
        </button>

        <!-- ActionRecipe / Confirm -->
        <button
          @click="handleConfirm"
          class="w-full h-[48px] bg-white hover:bg-purple-50 border-2 border-[#DDD6FE] rounded-[24px] flex items-center justify-center transition-all active:scale-95 cursor-pointer"
        >
          <span class="font-sora font-extrabold text-sm text-[#6B21A8] uppercase">
            XEM CÔNG THỨC / CHỐT MÓN
          </span>
        </button>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue'
import { X } from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import { useGacha } from '../composables/useGacha.js'
import { useVeto } from '../composables/useVeto.js'
import { useAudio } from '../composables/useAudio.js'

const isTest = import.meta.env?.MODE === 'test'

const emit = defineEmits(['confirm-food', 'close'])

const { machineState, currentResult, startSpin, openCapsule, resetGacha } = useGacha()
const { hearts, triggerVeto } = useVeto()
const { playFanfareSound, playVetoSound, playOpenSound } = useAudio()

const isOpen = computed(() => {
  return machineState.value === 'opening' || machineState.value === 'revealed'
})

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
    // test env fallback
  }
}

async function handleVetoClick() {
  if (hearts.value <= 0) return

  playVetoSound()
  triggerVeto()

  await startSpin()
  playOpenSound()
  await openCapsule()
}

function handleConfirm() {
  emit('confirm-food', currentResult.value)
}

function handleClose() {
  resetGacha()
  emit('close')
}
</script>
