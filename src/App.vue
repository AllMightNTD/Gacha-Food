<template>
  <div class="min-h-screen max-w-md mx-auto flex flex-col bg-gradient-to-b from-[#FFF0F3] via-[#FFF5F7] to-[#FFF0F3] relative shadow-2xl overflow-hidden pb-8">
    <!-- Floating background decorative food elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <span class="absolute top-16 left-4 text-3xl animate-float" style="animation-delay: 0s;">🥟</span>
      <span class="absolute top-36 right-6 text-3xl animate-float" style="animation-delay: 1.5s;">🧋</span>
      <span class="absolute top-72 left-8 text-3xl animate-float" style="animation-delay: 0.8s;">🍜</span>
      <span class="absolute bottom-48 right-8 text-3xl animate-float" style="animation-delay: 2.2s;">🍲</span>
      <span class="absolute bottom-16 left-6 text-3xl animate-float" style="animation-delay: 1s;">🥩</span>
    </div>

    <!-- Top Navigation Bar -->
    <TopBar @open-menu="isMenuOpen = true" />

    <!-- Filter Bar for quick category & budget selection -->
    <FilterBar />

    <!-- Couple Excuse Buster Slogan Banner -->
    <div class="px-4 py-1.5 text-center">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 border border-pink-100/80 rounded-full shadow-xs text-xs font-semibold text-rose-600">
        <span>💡</span>
        <span>"Em ăn gì cũng được? Để Gacha lo!"</span>
      </div>
    </div>

    <!-- Main Interactive Area: Gashapon Machine -->
    <main class="flex-1 flex flex-col items-center justify-center px-2 py-4 relative z-10">
      <GashaponMachine @capsule-clicked="handleCapsuleClicked" />
    </main>

    <!-- Bottom Love Motto Footer -->
    <footer class="text-center text-[11px] text-gray-400 font-medium px-4 pt-2">
      Quay ra món gì là phải đi ăn món đó nha! Cấm dỗi hờn ❤️
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import FilterBar from './components/FilterBar.vue'
import GashaponMachine from './components/GashaponMachine.vue'
import { useGacha } from './composables/useGacha.js'

const isMenuOpen = ref(false)
const { openCapsule } = useGacha()

function handleCapsuleClicked() {
  openCapsule()
}
</script>
