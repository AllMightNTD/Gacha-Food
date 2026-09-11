<template>
  <div class="w-full flex flex-col items-center select-none py-2 gap-4">
    <!-- Hero Gacha Machine Visual from Figma -->
    <div class="gashapon-dome relative w-full max-w-[361px] px-2 flex flex-col items-center">
      <div
        class="relative w-full h-[280px] sm:h-[320px] rounded-[32px] border-4 border-white shadow-[0_8px_16px_rgba(30,27,75,0.12)] overflow-hidden bg-cover bg-center cursor-pointer transition-transform duration-300 active:scale-[0.98]"
        :class="{ 'animate-wiggle': machineState === 'spinning' }"
        @click="handleCrankClick"
      >
        <!-- Gacha Machine Background Image downloaded from Figma -->
        <img
          src="/images/machine_visual.png"
          alt="Gacha Machine"
          class="w-full h-full object-cover"
        />

        <!-- Floating balls effect inside dome when spinning -->
        <div
          v-if="machineState === 'spinning'"
          class="absolute inset-0 bg-purple-900/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none"
        >
          <div class="flex gap-2 animate-bounce">
            <span class="text-3xl">✨</span>
            <span class="text-3xl">🔮</span>
            <span class="text-3xl">💖</span>
            <span class="text-3xl">✨</span>
          </div>
        </div>

        <!-- Dropped capsule preview -->
        <div
          v-if="machineState === 'dropped' || machineState === 'opening'"
          class="dropped-capsule absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-pink-300 shadow-lg flex items-center gap-2 animate-bounce z-20"
        >
          <span class="text-xl">🎁</span>
          <span class="text-xs font-sora font-extrabold text-[#6B21A8]">Đang mở quà...</span>
        </div>
      </div>
    </div>

    <!-- Controls Area & Tray from Figma -->
    <div class="gashapon-tray w-full flex flex-col items-center gap-3">
      <!-- CTA Button from Figma -->
      <button
        @click="handleCrankClick"
        :disabled="machineState === 'spinning' || machineState === 'dropped'"
        class="gashapon-crank w-[240px] h-[56px] bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-75 border-3 border-white rounded-[28px] shadow-[0_8px_16px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer group"
        aria-label="Gacha Ngay"
      >
        <span class="font-sora font-extrabold text-lg text-white tracking-wide group-hover:scale-105 transition-transform">
          {{ machineState === 'spinning' ? 'ĐANG QUAY...' : 'GACHA NGAY!' }}
        </span>
      </button>

      <!-- Helper Subtext from Figma -->
      <p class="font-sora text-xs font-semibold text-[#6B21A8] text-center">
        * Quay ngẫu nhiên 1 món cho cả hai
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGacha } from '../composables/useGacha.js'
import { useAudio } from '../composables/useAudio.js'

const { machineState, startSpin, openCapsule } = useGacha()
const { playCrankSound, playDropSound, playOpenSound, triggerHaptic } = useAudio()

const crankRotation = ref(0)

async function handleCrankClick() {
  if (machineState.value !== 'idle') return

  crankRotation.value += 720
  playCrankSound()
  triggerHaptic([40, 60, 40])

  await startSpin()
  playDropSound()

  // Tự động mở trứng và hiện món ăn ngay sau khi rơi
  setTimeout(async () => {
    playOpenSound()
    await openCapsule()
  }, 400)
}
</script>
