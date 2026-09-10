<template>
  <div class="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 space-y-1.5">
    <!-- Category Pills Scrollable -->
    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="setCategory(cat.id)"
        class="whitespace-nowrap px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold transition-all duration-200 shadow-xs flex items-center gap-1 shrink-0 text-[11px] sm:text-xs cursor-pointer"
        :class="selectedCategory === cat.id
          ? 'bg-rose-500 text-white shadow-rose-200 scale-102 sm:scale-105'
          : 'bg-white/90 text-gray-600 hover:bg-rose-50 border border-rose-100/70'"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.label }}</span>
      </button>
    </div>

    <!-- Budget Filter Pills -->
    <div class="flex items-center justify-between gap-1 bg-white/80 p-0.5 sm:p-1 rounded-2xl border border-pink-100">
      <button
        v-for="b in budgetOptions"
        :key="b.id"
        @click="setBudget(b.id)"
        class="flex-1 py-1.5 px-1 rounded-xl font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap text-[10px] min-[360px]:text-[11px] sm:text-xs cursor-pointer"
        :class="selectedBudget === b.id
          ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-xs'
          : 'text-gray-500 hover:text-gray-800'"
      >
        <span class="text-xs shrink-0">{{ b.icon }}</span>
        <span class="whitespace-nowrap">{{ b.label }}</span>
        <span v-if="b.sub" class="text-[9px] opacity-80 hidden min-[400px]:inline">({{ b.sub }})</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFoodStore } from '../composables/useFoodStore.js'

const { selectedCategory, selectedBudget, setCategory, setBudget } = useFoodStore()

const categories = [
  { id: 'all', label: 'Tất cả món', icon: '✨' },
  { id: 'hotpot', label: 'Lẩu & Nước', icon: '🍲' },
  { id: 'bbq', label: 'Nướng & Xèo', icon: '🥩' },
  { id: 'noodle', label: 'Bún & Phở', icon: '🍜' },
  { id: 'rice', label: 'Cơm chắc dạ', icon: '🍛' },
  { id: 'snack', label: 'Ăn vặt', icon: '🥟' },
  { id: 'dessert', label: 'Trà sữa/Chè', icon: '🧋' },
]

const budgetOptions = [
  { id: 'all', label: 'Tùy duyên', icon: '🎲' },
  { id: 'rich', label: 'Đầu tháng', sub: 'SSR', icon: '👑' },
  { id: 'cheap', label: 'Cuối tháng', sub: 'Bình dân', icon: '🪙' },
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
