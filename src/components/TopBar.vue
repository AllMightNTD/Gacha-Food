<template>
  <header class="w-full pt-3 pb-2 px-4 flex items-center justify-between border-b border-pink-100 bg-white/70 backdrop-blur-md sticky top-0 z-30 shadow-sm">
    <!-- Brand logo & title -->
    <div class="flex items-center gap-2">
      <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center text-xl shadow-md shadow-pink-200 animate-bounce-gentle">
        🍱
      </div>
      <div>
        <h1 class="text-base font-extrabold text-gray-800 tracking-tight flex items-center gap-1">
          Gacha Ăn Gì?
          <span class="inline-block text-xs bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full font-bold">Couple ❤️</span>
        </h1>
        <p class="text-[11px] text-gray-500 font-medium leading-tight">
          Khắc tinh của "Em ăn gì cũng được"
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <!-- Mute/Unmute sound -->
      <button
        @click="toggleMute"
        class="w-9 h-9 rounded-xl bg-pink-50 hover:bg-pink-100 text-rose-500 flex items-center justify-center active:scale-90 transition-all shadow-sm border border-pink-100 text-sm"
        :title="isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'"
        aria-label="Toggle Sound"
      >
        <span v-if="!isMuted">🔊</span>
        <span v-else>🔇</span>
      </button>

      <!-- Open menu drawer -->
      <button
        @click="$emit('open-menu')"
        class="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-bold shadow-md shadow-pink-200 active:scale-95 transition-all"
      >
        <span>📖</span>
        <span>Thực Đơn</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useAudio } from '../composables/useAudio.js'

defineEmits(['open-menu'])
const { isMuted, toggleMute } = useAudio()
</script>
