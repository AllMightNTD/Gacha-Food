<template>
  <div class="w-full px-4 py-2 flex items-center justify-between gap-2 font-sora">
    <div
      v-for="cat in figmaCategories"
      :key="cat.id"
      @click="handleCategoryClick(cat.id)"
      class="w-[104px] h-[110px] rounded-[20px] p-3 border-2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 active:scale-95 shadow-xs"
      :class="selectedCategory === cat.id
        ? 'bg-[#FCE7F3] border-[#8B5CF6] text-[#6B21A8] shadow-md scale-105'
        : 'bg-[#FFFBEB] border-[#F3E8FF] text-[#1E1B4B] hover:border-purple-300'"
    >
      <div class="w-10 h-10 flex items-center justify-center text-[#8B5CF6]">
        <component :is="cat.iconComponent" class="w-9 h-9" />
      </div>
      <span class="text-xs font-bold text-center leading-tight">
        {{ cat.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { SmilePlus, Soup, CakeSlice } from 'lucide-vue-next'
import { useFoodStore } from '../composables/useFoodStore.js'

const { selectedCategory, setCategory } = useFoodStore()

const figmaCategories = [
  { id: 'morning', label: 'Món Sáng', iconComponent: SmilePlus },
  { id: 'lunch', label: 'Món Trưa', iconComponent: Soup },
  { id: 'snack', label: 'Ăn Vặt', iconComponent: CakeSlice },
]

function handleCategoryClick(id) {
  if (selectedCategory.value === id) {
    setCategory('all')
  } else {
    setCategory(id)
  }
}
</script>
