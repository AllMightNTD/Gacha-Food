<template>
  <div class="relative w-full max-w-sm mx-auto flex flex-col items-center select-none">
    <!-- Top Cap / Roof of Machine -->
    <div class="w-64 h-8 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-full shadow-md relative z-10 flex items-center justify-center border-t-2 border-pink-200">
      <div class="w-20 h-2 bg-white/40 rounded-full"></div>
    </div>

    <!-- Transparent Glass Dome -->
    <div
      class="gashapon-dome relative w-72 h-56 -mt-2 bg-gradient-to-b from-white/60 to-pink-50/50 rounded-t-[90px] rounded-b-[40px] border-4 border-white/80 backdrop-blur-sm shadow-inner overflow-hidden flex items-end justify-center p-3 z-10"
      style="box-shadow: inset 0 10px 25px rgba(255, 255, 255, 0.8), 0 8px 20px rgba(244, 114, 182, 0.15);"
    >
      <!-- Glass glare reflections -->
      <div class="absolute top-4 left-6 w-12 h-24 bg-gradient-to-br from-white/70 to-transparent rounded-full -rotate-12 pointer-events-none"></div>
      <div class="absolute top-6 right-8 w-4 h-10 bg-white/50 rounded-full rotate-12 pointer-events-none"></div>

      <!-- Floating & Shaking Capsules inside the dome -->
      <div
        class="w-full h-full relative"
        :class="{ 'animate-wiggle': machineState === 'spinning' }"
      >
        <div
          v-for="(ball, idx) in decorativeBalls"
          :key="idx"
          class="absolute w-11 h-11 rounded-full shadow-md border-2 border-white/60 transition-transform duration-300 flex items-center justify-center text-xs overflow-hidden"
          :style="{
            left: ball.left,
            bottom: ball.bottom,
            backgroundColor: ball.color,
            transform: `rotate(${ball.rotate}deg) ${machineState === 'spinning' ? 'scale(1.1) translateY(-10px)' : ''}`,
            transitionDelay: `${idx * 40}ms`
          }"
        >
          <!-- Capsule half color division -->
          <div class="w-full h-1/2 bg-white/70 absolute top-0 left-0 border-b border-white/40"></div>
          <div class="relative z-10 text-[11px] drop-shadow-sm">{{ ball.icon }}</div>
        </div>
      </div>
    </div>

    <!-- Machine Center Body & Crank Area -->
    <div class="relative w-80 bg-gradient-to-b from-rose-400 via-pink-500 to-rose-500 rounded-3xl shadow-xl p-4 -mt-3 z-20 border-4 border-pink-200 flex flex-col items-center">
      <!-- Coin Slot Detail -->
      <div class="w-full flex items-center justify-between px-4 mb-2 text-xs font-bold text-rose-100">
        <span class="flex items-center gap-1 bg-rose-600/40 px-2 py-0.5 rounded-full border border-rose-300/30">
          🪙 Miễn Phí
        </span>
        <span class="bg-rose-600/40 px-2 py-0.5 rounded-full border border-rose-300/30">
          💖 Cặp Đôi
        </span>
      </div>

      <!-- Crank Handle / Interactive Knob -->
      <div class="relative my-2 flex flex-col items-center">
        <!-- Crank base plate -->
        <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-pink-300 shadow-lg border-4 border-white flex items-center justify-center">
          <!-- The rotating handle -->
          <button
            @click="handleCrankClick"
            class="gashapon-crank w-20 h-20 rounded-full bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400 shadow-md border-2 border-yellow-100 flex items-center justify-center active:scale-95 transition-transform cursor-pointer relative"
            :class="{ 'pointer-events-none': machineState === 'spinning' || machineState === 'dropped' }"
            :style="{ transform: `rotate(${crankRotation}deg)`, transition: machineState === 'spinning' ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.3s ease' }"
            aria-label="Vặn Núm Quay Gacha"
          >
            <!-- Center grip bar -->
            <div class="w-14 h-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full shadow-sm flex items-center justify-center">
              <div class="w-3 h-3 rounded-full bg-white/70"></div>
            </div>
            <!-- Indicator arrows -->
            <div class="absolute -top-1 text-[10px] text-amber-800 font-extrabold">↻</div>
          </button>
        </div>

        <!-- Touch / Action Guide text -->
        <div class="mt-2 text-center">
          <p v-if="machineState === 'idle'" class="text-xs font-black text-white drop-shadow-sm tracking-wide animate-pulse">
            👇 BẤM VÀO NÚM ĐỂ QUAY! 👇
          </p>
          <p v-else-if="machineState === 'spinning'" class="text-xs font-black text-yellow-200 drop-shadow-sm animate-bounce">
            🌀 ĐANG CHỌN MÓN NGON... 🌀
          </p>
          <p v-else class="text-xs font-black text-yellow-200 drop-shadow-sm animate-pulse">
            ✨ ĐANG MỞ MÓN ĂN... ✨
          </p>
        </div>
      </div>

      <!-- Exit Chute and Tray -->
      <div class="gashapon-tray w-44 h-24 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl border-4 border-pink-300 shadow-inner mt-2 relative flex items-center justify-center overflow-hidden">
        <!-- Chute flap -->
        <div class="absolute top-0 w-32 h-3 bg-gray-700 rounded-b-md"></div>

        <!-- Dropped capsule in tray (auto-opening) -->
        <div
          v-if="machineState === 'dropped' || machineState === 'opening'"
          class="dropped-capsule relative flex flex-col items-center animate-bounce-gentle z-30 pointer-events-none"
        >
          <!-- Capsule egg -->
          <div
            class="w-14 h-14 rounded-full shadow-lg border-2 border-white flex items-center justify-center overflow-hidden relative animate-pulse"
            :style="{ backgroundColor: currentCapsuleColor }"
          >
            <!-- Half white top shell -->
            <div class="w-full h-1/2 bg-white/80 absolute top-0 left-0 border-b border-white/40"></div>
            <div class="relative z-10 text-xl">✨</div>
          </div>
          <span class="mt-1 text-yellow-200 text-[10px] font-extrabold animate-pulse">
            Đang mở... 🎁
          </span>
        </div>

        <!-- Empty tray placeholder -->
        <div v-else class="text-center text-gray-500 text-[11px] font-medium">
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
  { left: '12%', bottom: '15px', color: '#FDA4AF', rotate: -15, icon: '🍲' },
  { left: '32%', bottom: '10px', color: '#FDE047', rotate: 25, icon: '🥩' },
  { left: '55%', bottom: '18px', color: '#6EE7B7', rotate: -20, icon: '🍜' },
  { left: '74%', bottom: '12px', color: '#C4B5FD', rotate: 10, icon: '🍕' },
  { left: '22%', bottom: '55px', color: '#FDBA74', rotate: 30, icon: '🧋' },
  { left: '44%', bottom: '60px', color: '#93C5FD', rotate: -10, icon: '🍣' },
  { left: '65%', bottom: '52px', color: '#FDA4AF', rotate: 15, icon: '🥟' },
  { left: '15%', bottom: '95px', color: '#6EE7B7', rotate: -25, icon: '🍗' },
  { left: '40%', bottom: '105px', color: '#FDE047', rotate: 5, icon: '🦀' },
  { left: '60%', bottom: '98px', color: '#C4B5FD', rotate: -15, icon: '🍧' },
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
