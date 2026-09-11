<template>
  <Teleport to="body" :disabled="isTest">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E1B4B]/80 backdrop-blur-sm transition-all select-none font-sora"
    >
      <!-- Click outside backdrop to close -->
      <div class="absolute inset-0" @click="$emit('close')"></div>

      <!-- Centered Modal Container (Figma Node 21:5) -->
      <div class="relative w-full max-w-[356px] sm:max-w-[380px] max-h-[80vh] sm:max-h-[85vh] bg-white rounded-[32px] border-4 border-[#FCE7F3] shadow-[0_20px_50px_rgba(30,27,75,0.4)] flex flex-col overflow-hidden animate-pop z-10 font-sora my-auto">

      <!-- Drawer Header (Figma #21:15) -->
      <div class="px-5 pt-2 sm:pt-4 pb-3 flex items-center justify-between border-b border-[#F3E8FF]">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#8B5CF6]">
            <BookHeart class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-bricolage text-lg font-extrabold text-[#1E1B4B] tracking-tight leading-tight uppercase">
              Sổ Thực Đơn Cặp Đôi
            </h3>
            <p class="font-sora text-[11px] font-semibold text-[#6B21A8]">
              {{ activeFoods.length }} món đang hoạt động
            </p>
          </div>
        </div>

        <button
          @click="$emit('close')"
          class="btn-close-drawer w-9 h-9 rounded-full bg-white border-[1.5px] border-[#DDD6FE] hover:bg-pink-50 text-[#6B21A8] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label="Đóng sổ thực đơn"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Scrollable Inner Content Container -->
      <div class="flex-1 overflow-y-auto no-scrollbar touch-pan-y flex flex-col gap-3 py-3">
        <!-- Add Custom Food Form (Figma #21:26) -->
        <div class="mx-4 p-4 bg-white rounded-[24px] border-2 border-[#FCE7F3] shadow-[0_4px_8px_rgba(30,27,75,0.04)] flex flex-col gap-3 shrink-0">
          <div class="flex items-center gap-1.5 text-xs font-extrabold text-[#1E1B4B]">
            <Plus class="w-4 h-4 text-[#EC4899]" />
            <span>Thêm món ruột của hai đứa:</span>
          </div>

          <!-- Input row -->
          <div class="flex items-center gap-2">
            <input
              v-model="newFoodName"
              placeholder="Tên món / Quán ruột..."
              class="flex-1 h-[44px] px-3.5 bg-white rounded-[16px] border-[1.5px] border-[#DDD6FE] text-xs font-medium text-[#1E1B4B] focus:outline-none focus:border-[#EC4899] placeholder:text-gray-400"
              @keyup.enter="handleAddFood"
            />
            <button
              @click="handleAddFood"
              class="btn-add-food w-[90px] h-[44px] bg-[#EC4899] hover:bg-pink-600 border-2 border-white rounded-[16px] shadow-[0_4px_8px_rgba(236,72,153,0.3)] font-sora font-extrabold text-xs text-white active:scale-95 transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              Thêm ✨
            </button>
          </div>

          <!-- Dropdown row -->
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <select
                v-model="newFoodCategory"
                class="w-full h-[38px] pl-3 pr-8 bg-white rounded-[12px] border-[1.5px] border-[#DDD6FE] text-xs font-semibold text-[#1E1B4B] focus:outline-none focus:border-[#EC4899] appearance-none cursor-pointer"
              >
                <option value="hotpot">🍲 Lẩu/Đồ nước</option>
                <option value="bbq">🥩 Nướng/Xèo</option>
                <option value="noodle">🍜 Bún/Phở</option>
                <option value="rice">🍛 Cơm/Chắc dạ</option>
                <option value="snack">🥟 Ăn vặt</option>
                <option value="dessert">🧋 Trà sữa/Chè</option>
              </select>
              <ChevronDown class="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div class="relative w-[90px]">
              <select
                v-model="newFoodRarity"
                class="w-full h-[38px] pl-3 pr-7 bg-white rounded-[12px] border-[1.5px] border-[#DDD6FE] text-xs font-bold text-[#1E1B4B] focus:outline-none focus:border-[#EC4899] appearance-none cursor-pointer"
              >
                <option value="SSR">🌟 SSR</option>
                <option value="SR">💖 SR</option>
                <option value="R">🍀 R</option>
              </select>
              <ChevronDown class="w-3.5 h-3.5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- List Header (Figma #21:46) -->
        <div class="px-4 flex items-center justify-between text-xs shrink-0">
          <span class="font-extrabold text-[#1E1B4B]">Danh sách món có thể quay:</span>
          <button
            @click="resetToDefault"
            class="font-bold text-[#EC4899] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw class="w-3 h-3" />
            <span>Khôi phục gốc</span>
          </button>
        </div>

        <!-- Dish List (Figma #21:52) -->
        <div class="px-4 flex flex-col gap-2 pb-2">
          <div
            v-for="food in foods"
            :key="food.id"
            class="food-item-row p-3 bg-white rounded-[20px] border-[1.5px] border-[#FCE7F3] flex items-center justify-between gap-3 shadow-xs transition-all"
            :class="{ 'opacity-60 bg-gray-50/80': food.isActive === false }"
          >
            <!-- Thumbnail & Details -->
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-11 h-11 rounded-[12px] bg-[#FFFBEB] flex items-center justify-center text-xl shrink-0">
                {{ food.icon }}
              </div>
              <div class="min-w-0 flex flex-col gap-0.5">
                <div class="flex items-center gap-1.5 min-w-0">
                  <span class="font-bold text-xs text-[#1E1B4B] truncate">{{ food.name }}</span>
                  <span
                    class="px-1.5 py-0.5 rounded-[6px] bg-[#FCE7F3] border border-[#8B5CF6] text-[9px] font-extrabold text-[#6B21A8] shrink-0 uppercase"
                  >
                    {{ food.rarity }}
                  </span>
                </div>
                <p class="text-[11px] font-regular text-[#6B21A8] truncate">
                  Ví: {{ food.priceLevel }} • {{ food.tag || 'Món ngon' }}
                </p>
              </div>
            </div>

            <!-- Actions: Delete if custom + Toggle switch -->
            <div class="flex items-center gap-2 shrink-0">
              <button
                v-if="food.isCustom"
                @click="deleteFood(food.id)"
                class="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                title="Xóa món tự thêm"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>

              <!-- Toggle Switch from Figma (#21:62) -->
              <button
                @click="toggleFoodActive(food.id)"
                class="w-[44px] h-[24px] rounded-[12px] transition-colors relative flex items-center p-0.5 cursor-pointer"
                :class="food.isActive !== false ? 'bg-[#EC4899]' : 'bg-gray-300'"
                aria-label="Toggle Food Active"
              >
                <div
                  class="w-[20px] h-[20px] rounded-full bg-white shadow-md transform transition-transform"
                  :class="food.isActive !== false ? 'translate-x-[20px]' : 'translate-x-0'"
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { BookHeart, X, Plus, ChevronDown, RotateCcw, Trash2 } from 'lucide-vue-next'
import { useFoodStore } from '../composables/useFoodStore.js'

const isTest = import.meta.env?.MODE === 'test'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  }
})

defineEmits(['close'])

const { foods, activeFoods, toggleFoodActive, addCustomFood, deleteFood, resetToDefault } = useFoodStore()

const newFoodName = ref('')
const newFoodCategory = ref('hotpot')
const newFoodRarity = ref('SR')

function handleAddFood() {
  if (!newFoodName.value.trim()) return

  const icons = {
    hotpot: '🍲',
    bbq: '🥩',
    noodle: '🍜',
    rice: '🍛',
    snack: '🥟',
    dessert: '🧋',
  }

  addCustomFood({
    name: newFoodName.value,
    category: newFoodCategory.value,
    rarity: newFoodRarity.value,
    icon: icons[newFoodCategory.value] || '🍱',
    priceLevel: newFoodRarity.value === 'SSR' ? '$$$' : (newFoodRarity.value === 'SR' ? '$$' : '$'),
    tag: 'Món ruột cặp đôi',
  })

  newFoodName.value = ''
}
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
