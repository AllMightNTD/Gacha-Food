<template>
  <div class="w-full bg-white border-t-2 border-[#DDD6FE] h-20 px-4 flex items-center justify-between font-sora z-30 shrink-0">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      @click="activeTab = tab.id"
      class="w-[76px] flex flex-col items-center gap-1 cursor-pointer transition-all duration-150 active:scale-95"
    >
      <div
        class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
        :class="activeTab === tab.id ? 'text-[#8B5CF6]' : 'text-[#6B21A8] opacity-70'"
      >
        <component :is="tab.iconComponent" class="w-6 h-6" />
      </div>
      <span
        class="text-[10px] text-center leading-tight transition-colors"
        :class="activeTab === tab.id ? 'font-bold text-[#8B5CF6]' : 'font-semibold text-[#6B21A8] opacity-70'"
      >
        {{ tab.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Gamepad2, Package, BookHeart, ChefHat } from 'lucide-vue-next'

const activeTab = ref('home')

const tabs = [
  { id: 'home', label: 'Quay Số', iconComponent: Gamepad2 },
  { id: 'collection', label: 'Bộ Sưu Tập', iconComponent: Package },
  { id: 'recipes', label: 'Công Thức', iconComponent: BookHeart },
  { id: 'profile', label: 'Cá Nhân', iconComponent: ChefHat },
]
</script>
