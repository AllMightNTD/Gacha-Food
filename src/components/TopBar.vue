<template>
  <header class="w-full h-14 px-4 flex items-center justify-between bg-transparent sticky top-0 z-30 font-sora">
    <!-- Coin Chip from Figma -->
    <div class="h-9 px-3 bg-white border-2 border-gray-200 rounded-[18px] flex items-center gap-1.5 shadow-xs">
      <Star class="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
      <span class="text-xs font-bold text-[#1E1B4B]">Tiền Tệ: {{ currency }}</span>
    </div>

    <!-- Spins Chip & Action Buttons -->
    <div class="flex items-center gap-2">
      <!-- Spins Chip from Figma -->
      <div class="h-9 px-3 bg-[#FCE7F3] border-2 border-[#DDD6FE] rounded-[18px] flex items-center gap-1.5 shadow-xs">
        <RotateCw class="w-4 h-4 text-[#6B21A8] shrink-0" />
        <span class="text-xs font-bold text-[#6B21A8]">Lần Quay: {{ spinsLeft }}/10</span>
      </div>

      <!-- Mute/Unmute sound -->
      <button
        @click="toggleMute"
        class="w-9 h-9 rounded-full bg-white border-2 border-gray-200 text-purple-600 flex items-center justify-center active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
        :title="isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'"
        aria-label="Toggle Sound"
      >
        <Volume2 v-if="!isMuted" class="w-4 h-4 text-purple-600" />
        <VolumeX v-else class="w-4 h-4 text-gray-400" />
      </button>

      <!-- Open menu drawer button -->
      <button
        @click="$emit('open-menu')"
        class="w-9 h-9 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
        title="Quản lý thực đơn"
        aria-label="Open Menu Drawer"
      >
        <BookOpen class="w-4 h-4" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Star, RotateCw, Volume2, VolumeX, BookOpen } from 'lucide-vue-next'
import { useAudio } from '../composables/useAudio.js'

defineEmits(['open-menu'])
const { isMuted, toggleMute } = useAudio()

const currency = ref(2500)
const spinsLeft = ref(5)
</script>
