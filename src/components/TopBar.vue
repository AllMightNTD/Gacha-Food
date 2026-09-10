<template>
  <header class="w-full py-2 px-2.5 sm:px-4 flex items-center justify-between border-b border-pink-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-xs">
    <!-- Brand logo & title -->
    <div class="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 mr-1">
      <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-base sm:text-xl shadow-sm shadow-pink-200 animate-bounce-gentle shrink-0">
        🍱
      </div>
      <div class="min-w-0">
        <h1 class="text-xs sm:text-base font-extrabold text-gray-800 tracking-tight flex items-center gap-1">
          <span class="truncate">Gacha Ăn Gì?</span>
          <span class="inline-block text-[9px] sm:text-xs bg-rose-100 text-rose-600 px-1.5 py-0.2 rounded-full font-bold shrink-0">Couple ❤️</span>
        </h1>
        <p class="text-[9px] sm:text-[11px] text-gray-500 font-medium leading-tight truncate">
          Khắc tinh của "Em ăn gì cũng được"
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 sm:gap-2 shrink-0">
      <!-- Mute/Unmute sound -->
      <button
        @click="toggleMute"
        class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-pink-50 hover:bg-pink-100 text-rose-500 flex items-center justify-center active:scale-90 transition-all shadow-2xs border border-pink-100 text-xs sm:text-sm shrink-0 cursor-pointer"
        :title="isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'"
        aria-label="Toggle Sound"
      >
        <span v-if="!isMuted">🔊</span>
        <span v-else>🔇</span>
      </button>

      <!-- Open menu drawer -->
      <button
        @click="$emit('open-menu')"
        class="flex items-center gap-1 px-2.5 py-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-[11px] sm:text-xs font-bold shadow-sm shadow-pink-200 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
      >
        <span>📖</span>
        <span class="whitespace-nowrap">Thực Đơn</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useAudio } from '../composables/useAudio.js'

defineEmits(['open-menu'])
const { isMuted, toggleMute } = useAudio()
</script>
