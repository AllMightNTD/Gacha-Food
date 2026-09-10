<template>
  <div class="min-h-screen max-w-md mx-auto flex flex-col bg-gradient-to-b from-[#FFF0F3] via-[#FFF5F7] to-[#FFF0F3] relative shadow-2xl overflow-x-hidden font-cute">
    <!-- Floating background cute food icons -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      <span class="absolute top-20 left-4 text-3xl animate-float" style="animation-delay: 0s;">🥟</span>
      <span class="absolute top-44 right-6 text-3xl animate-float" style="animation-delay: 1.5s;">🧋</span>
      <span class="absolute top-80 left-8 text-3xl animate-float" style="animation-delay: 0.8s;">🍜</span>
      <span class="absolute bottom-56 right-8 text-3xl animate-float" style="animation-delay: 2.2s;">🍲</span>
      <span class="absolute bottom-20 left-6 text-3xl animate-float" style="animation-delay: 1s;">🥩</span>
    </div>

    <!-- Header Navigation -->
    <TopBar @open-menu="isMenuOpen = true" />

    <!-- Filter Bar for quick category & budget selection -->
    <FilterBar />

    <!-- Funny Couple Quote / Slogan Bar -->
    <div class="px-2.5 sm:px-4 py-0.5 sm:py-1 text-center relative z-10 max-w-full">
      <div
        @click="cycleQuote"
        class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-white/80 border border-pink-200/80 rounded-full shadow-xs text-[10px] sm:text-xs font-bold text-rose-600 active:scale-95 transition-all cursor-pointer hover:bg-pink-50 max-w-[95%]"
      >
        <span class="shrink-0">💡</span>
        <span class="truncate">"{{ currentQuote.text }}"</span>
        <span class="text-[9px] text-gray-400 shrink-0">↻</span>
      </div>
    </div>

    <!-- Main Game Area: Gashapon Machine -->
    <main class="flex-1 flex flex-col items-center justify-center px-1 sm:px-3 py-1 sm:py-2 relative z-10">
      <GashaponMachine />
    </main>

    <!-- Bottom Love Motto Footer -->
    <footer class="text-center text-[10px] sm:text-[11px] text-gray-400 font-medium px-2 py-1.5 sm:py-2.5 relative z-10 border-t border-pink-100/50">
      <p>Quay ra món gì là phải vui vẻ đi ăn món đó nha! Cấm dỗi hờn ❤️</p>
      <p class="text-[9px] sm:text-[10px] text-gray-300 mt-0.5">Tiệm Gacha Đồ Ăn Cặp Đôi • 100% Không Cãi Nhau</p>
    </footer>

    <!-- Capsule Hatching & Result Modal -->
    <CapsuleModal
      @confirm-food="handleFoodConfirmed"
      @close="handleCloseCapsule"
    />

    <!-- Date Love Receipt Modal -->
    <ReceiptModal
      v-if="isReceiptOpen && confirmedFood"
      :food="confirmedFood"
      :punishment="activePunishment"
      @restart="handleRestartGame"
    />

    <!-- Menu Manager Bottom Sheet Drawer -->
    <MenuDrawer
      :is-open="isMenuOpen"
      @close="isMenuOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import FilterBar from './components/FilterBar.vue'
import GashaponMachine from './components/GashaponMachine.vue'
import CapsuleModal from './components/CapsuleModal.vue'
import ReceiptModal from './components/ReceiptModal.vue'
import MenuDrawer from './components/MenuDrawer.vue'
import { coupleQuotes } from './data/quotes.js'
import { useGacha } from './composables/useGacha.js'
import { useVeto } from './composables/useVeto.js'

const isMenuOpen = ref(false)
const isReceiptOpen = ref(false)
const confirmedFood = ref(null)

const { resetGacha } = useGacha()
const { activePunishment, resetVeto } = useVeto()

// Quote rotation
const quoteIndex = ref(0)
const currentQuote = ref(coupleQuotes[0])

function cycleQuote() {
  quoteIndex.value = (quoteIndex.value + 1) % coupleQuotes.length
  currentQuote.value = coupleQuotes[quoteIndex.value]
}

function handleFoodConfirmed(food) {
  confirmedFood.value = food
  isReceiptOpen.value = true
}

function handleCloseCapsule() {
  resetGacha()
}

function handleRestartGame() {
  isReceiptOpen.value = false
  confirmedFood.value = null
  resetVeto()
  resetGacha()
  cycleQuote()
}

// Expose variables for testing if needed
defineExpose({
  isMenuOpen,
  isReceiptOpen,
  confirmedFood,
  handleFoodConfirmed,
  handleRestartGame,
})
</script>
