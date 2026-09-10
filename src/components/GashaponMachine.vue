<template>
  <div class="relative w-full max-w-[310px] min-[390px]:max-w-[340px] mx-auto flex flex-col items-center select-none px-1">
    <!-- Top Cap / Roof of Machine -->
    <div class="w-[75%] max-w-[240px] h-6 sm:h-7 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-full shadow-xs relative z-10 flex items-center justify-center border-t-2 border-pink-200">
      <div class="w-16 sm:w-20 h-1.5 sm:h-2 bg-white/40 rounded-full"></div>
    </div>

    <!-- Transparent Glass Dome -->
    <div
      class="gashapon-dome relative w-[88%] max-w-[270px] h-42 min-[360px]:h-46 sm:h-52 -mt-1.5 bg-gradient-to-b from-white/60 to-pink-50/50 rounded-t-[80px] rounded-b-[36px] border-4 border-white/80 backdrop-blur-sm shadow-inner overflow-hidden flex items-end justify-center p-2.5 z-10"
      style="box-shadow: inset 0 10px 25px rgba(255, 255, 255, 0.8), 0 8px 20px rgba(244, 114, 182, 0.15);"
    >
      <!-- Glass glare reflections -->
      <div class="absolute top-3 left-4 w-8 sm:w-12 h-20 sm:h-24 bg-gradient-to-br from-white/70 to-transparent rounded-full -rotate-12 pointer-events-none"></div>
      <div class="absolute top-5 right-6 w-3 sm:w-4 h-8 sm:h-10 bg-white/50 rounded-full rotate-12 pointer-events-none"></div>

      <!-- Floating & Shaking Capsules inside the dome -->
      <div
        class="w-full h-full relative"
        :class="{ 'animate-wiggle': machineState === 'spinning' }"
      >
        <div
          v-for="(ball, idx) in decorativeBalls"
          :key="idx"
          class="absolute w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 rounded-full shadow-md border-2 border-white/60 transition-transform duration-300 flex items-center justify-center text-xs overflow-hidden"
          :style="{
            left: ball.left,
            bottom: ball.bottom,
            backgroundColor: ball.color,
            transform: `rotate(${ball.rotate}deg) ${machineState === 'spinning' ? 'scale(1.1) translateY(-8px)' : ''}`,
            transitionDelay: `${idx * 40}ms`
          }"
        >
          <!-- Capsule half color division -->
          <div class="w-full h-1/2 bg-white/70 absolute top-0 left-0 border-b border-white/40"></div>
          <div class="relative z-10 text-[10px] drop-shadow-sm">{{ ball.icon }}</div>
        </div>
      </div>
    </div>

    <!-- Machine Center Body & Crank Area -->
    <div class="relative w-full max-w-[280px] min-[360px]:max-w-[300px] sm:max-w-[320px] bg-gradient-to-b from-rose-400 via-pink-500 to-rose-500 rounded-2xl sm:rounded-3xl shadow-xl p-3 sm:p-4 -mt-2.5 z-20 border-4 border-pink-200 flex flex-col items-center">
      <!-- Coin Slot Detail -->
      <div class="w-full flex items-center justify-between px-2 sm:px-3 mb-1.5 text-[10px] sm:text-xs font-bold text-rose-100">
        <span class="flex items-center gap-1 bg-rose-600/40 px-2 py-0.5 rounded-full border border-rose-300/30">
          🪙 Miễn Phí
        </span>
        <span class="bg-rose-600/40 px-2 py-0.5 rounded-full border border-rose-300/30">
          💖 Cặp Đôi
        </span>
      </div>

      <!-- Crank Handle / Interactive Knob -->
      <div class="relative my-1 sm:my-2 flex flex-col items-center">
        <!-- Crank base plate -->
        <div class="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-rose-600 to-pink-300 shadow-lg border-3 sm:border-4 border-white flex items-center justify-center">
          <!-- The rotating handle -->
          <button
            @click="handleCrankClick"
            class="gashapon-crank w-15 h-15 sm:w-18 sm:h-18 rounded-full bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400 shadow-md border-2 border-yellow-100 flex items-center justify-center active:scale-95 transition-transform cursor-pointer relative"
            :class="{ 'pointer-events-none': machineState === 'spinning' || machineState === 'dropped' }"
            :style="{ transform: `rotate(${crankRotation}deg)`, transition: machineState === 'spinning' ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.3s ease' }"
            aria-label="Vặn Núm Quay Gacha"
          >
            <!-- Center grip bar -->
            <div class="w-10 sm:w-12 h-3.5 sm:h-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full shadow-xs flex items-center justify-center">
              <div class="w-2.5 h-2.5 rounded-full bg-white/70"></div>
            </div>
            <!-- Indicator arrows -->
            <div class="absolute -top-0.5 text-[9px] text-amber-800 font-extrabold">↻</div>
          </button>
        </div>

        <!-- Touch / Action Guide text -->
        <div class="mt-1.5 text-center">
          <p v-if="machineState === 'idle'" class="text-[11px] sm:text-xs font-black text-white drop-shadow-sm tracking-wide animate-pulse">
            👇 BẤM VÀO NÚM ĐỂ QUAY! 👇
          </p>
          <p v-else-if="machineState === 'spinning'" class="text-[11px] sm:text-xs font-black text-yellow-200 drop-shadow-sm animate-bounce">
            🌀 ĐANG CHỌN MÓN NGON... 🌀
          </p>
          <p v-else class="text-[11px] sm:text-xs font-black text-yellow-200 drop-shadow-sm animate-pulse">
            ✨ ĐANG MỞ MÓN ĂN... ✨
          </p>
        </div>
      </div>

      <!-- Exit Chute and Tray -->
      <div class="gashapon-tray w-38 sm:w-42 h-18 sm:h-22 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl border-3 border-pink-300 shadow-inner mt-1.5 relative flex items-center justify-center overflow-hidden">
        <!-- Chute flap -->
        <div class="absolute top-0 w-28 h-2.5 bg-gray-700 rounded-b-md"></div>

        <!-- Dropped capsule in tray (auto-opening) -->
        <div
          v-if="machineState === 'dropped' || machineState === 'opening'"
          class="dropped-capsule relative flex flex-col items-center animate-bounce-gentle z-30 pointer-events-none"
        >
          <!-- Capsule egg -->
          <div
            class="w-12 h-12 rounded-full shadow-lg border-2 border-white flex items-center justify-center overflow-hidden relative animate-pulse"
            :style="{ backgroundColor: currentCapsuleColor }"
          >
            <!-- Half white top shell -->
            <div class="w-full h-1/2 bg-white/80 absolute top-0 left-0 border-b border-white/40"></div>
            <div class="relative z-10 text-lg">✨</div>
          </div>
          <span class="mt-0.5 text-yellow-200 text-[9px] font-extrabold animate-pulse">
            Đang mở... 🎁
          </span>
        </div>

        <!-- Empty tray placeholder -->
        <div v-else class="text-center text-gray-500 text-[10px] font-medium">
          Khay hứng trứng
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGacha } from '../composables/useGacha.js'
import { useAudio } from '../composables/useAudio.js'

const { machineState, currentCapsuleColor, startSpin, openCapsule } = useGacha()
const { playCrankSound, playDropSound, playOpenSound, triggerHaptic } = useAudio()

const crankRotation = ref(0)

// 10 cute decorative balls in the glass dome
const decorativeBalls = [
  { left: '10%', bottom: '12px', color: '#FDA4AF', rotate: -15, icon: '🍲' },
  { left: '32%', bottom: '8px', color: '#FDE047', rotate: 25, icon: '🥩' },
  { left: '55%', bottom: '14px', color: '#6EE7B7', rotate: -20, icon: '🍜' },
  { left: '74%', bottom: '10px', color: '#C4B5FD', rotate: 10, icon: '🍕' },
  { left: '20%', bottom: '48px', color: '#FDBA74', rotate: 30, icon: '🧋' },
  { left: '44%', bottom: '52px', color: '#93C5FD', rotate: -10, icon: '🍣' },
  { left: '66%', bottom: '45px', color: '#FDA4AF', rotate: 15, icon: '🥟' },
  { left: '14%', bottom: '82px', color: '#6EE7B7', rotate: -25, icon: '🍗' },
  { left: '38%', bottom: '90px', color: '#FDE047', rotate: 5, icon: '🦀' },
  { left: '62%', bottom: '85px', color: '#C4B5FD', rotate: -15, icon: '🍧' },
]

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
  }, 350)
}
</script>
