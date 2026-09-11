<template>
  <div class="min-h-screen max-w-[393px] mx-auto flex flex-col justify-between bg-gradient-to-b from-[#FEE2E2] to-[#E0E7FF] relative shadow-2xl overflow-x-hidden font-sora min-h-[852px]">
    <!-- Top Floating Header -->
    <TopBar @open-menu="isMenuOpen = true" />

    <!-- Main Content Flow -->
    <div class="flex-1 flex flex-col justify-between py-2 z-10">
      <!-- Brand Area Header -->
      <BrandArea />

      <!-- Main Game Machine Area -->
      <main class="flex-1 flex flex-col items-center justify-center my-2">
        <GashaponMachine />
      </main>

      <!-- Category Cards Row -->
      <FilterBar />
    </div>

    <!-- Sticky Bottom Navigation -->
    <BottomNavigation />

    <!-- Capsule Hatching & Result Modal from Figma -->
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
import BrandArea from './components/BrandArea.vue'
import FilterBar from './components/FilterBar.vue'
import GashaponMachine from './components/GashaponMachine.vue'
import BottomNavigation from './components/BottomNavigation.vue'
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

defineExpose({
  isMenuOpen,
  isReceiptOpen,
  confirmedFood,
  handleFoodConfirmed,
  handleRestartGame,
})
</script>
