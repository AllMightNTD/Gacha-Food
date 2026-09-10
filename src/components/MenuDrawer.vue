<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs transition-all select-none"
  >
    <!-- Click outside backdrop to close -->
    <div class="flex-1" @click="$emit('close')"></div>

    <!-- Bottom Sheet Content -->
    <div class="w-full max-w-md mx-auto bg-white rounded-t-[32px] p-5 shadow-2xl max-h-[85vh] flex flex-col border-t-2 border-pink-200 animate-pop">
      <!-- Drag Pill Handle -->
      <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3"></div>

      <!-- Drawer Header -->
      <div class="flex items-center justify-between pb-3 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <span class="text-xl">📖</span>
          <div>
            <h3 class="text-base font-black text-gray-800">Sổ Thực Đơn Cặp Đôi</h3>
            <p class="text-[11px] text-gray-500">
              {{ foods.length }} món ({{ activeFoods.length }} đang bật)
            </p>
          </div>
        </div>

        <button
          @click="$emit('close')"
          class="btn-close-drawer w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm active:scale-90 transition-all cursor-pointer"
          aria-label="Đóng bảng thực đơn"
        >
          ✕
        </button>
      </div>

      <!-- Add Custom Food Form -->
      <div class="my-3 p-3 bg-pink-50/60 rounded-2xl border border-pink-100 space-y-2">
        <div class="text-xs font-black text-rose-600 flex items-center gap-1">
          <span>➕</span>
          <span>Thêm món ruột của hai đứa:</span>
        </div>

        <div class="flex gap-2">
          <input
            v-model="newFoodName"
            placeholder="Tên món / Quán ruột..."
            class="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-pink-200 focus:outline-none focus:ring-1 focus:ring-rose-400 font-medium"
            @keyup.enter="handleAddFood"
          />
          <button
            @click="handleAddFood"
            class="btn-add-food px-3 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-sm active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Thêm ✨
          </button>
        </div>

        <!-- Category & Rarity select options -->
        <div class="flex items-center gap-2 text-xs">
          <select
            v-model="newFoodCategory"
            class="flex-1 text-xs p-1.5 rounded-xl bg-white border border-pink-200 font-medium focus:outline-none text-gray-700"
          >
            <option value="hotpot">🍲 Lẩu/Đồ nước</option>
            <option value="bbq">🥩 Nướng/Xèo</option>
            <option value="noodle">🍜 Bún/Phở</option>
            <option value="rice">🍛 Cơm/Chắc dạ</option>
            <option value="snack">🥟 Ăn vặt</option>
            <option value="dessert">🧋 Trà sữa/Chè</option>
          </select>

          <select
            v-model="newFoodRarity"
            class="w-24 text-xs p-1.5 rounded-xl bg-white border border-pink-200 font-bold focus:outline-none text-gray-700"
          >
            <option value="SSR">🌟 SSR</option>
            <option value="SR">💖 SR</option>
            <option value="R">🍀 R</option>
          </select>
        </div>
      </div>

      <!-- Quick Reset button -->
      <div class="flex items-center justify-between pb-2 text-xs font-bold text-gray-500 px-1">
        <span>Danh sách món có thể quay:</span>
        <button
          @click="resetToDefault"
          class="text-rose-500 hover:underline flex items-center gap-0.5 cursor-pointer text-[11px]"
        >
          <span>↺</span> Khôi phục gốc
        </button>
      </div>

      <!-- Scrollable Food List -->
      <div class="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar min-h-48 max-h-72">
        <div
          v-for="food in foods"
          :key="food.id"
          class="food-item-row flex items-center justify-between p-2.5 rounded-2xl transition-all border"
          :class="food.isActive !== false ? 'bg-white border-pink-100 shadow-xs' : 'bg-gray-50/80 border-gray-200 opacity-60'"
        >
          <!-- Food Info -->
          <div class="flex items-center gap-2.5">
            <span class="text-xl p-1 bg-pink-50 rounded-xl">{{ food.icon }}</span>
            <div>
              <div class="text-xs font-extrabold text-gray-800 flex items-center gap-1.5">
                <span>{{ food.name }}</span>
                <span
                  class="text-[9px] px-1.5 py-0.2 rounded font-black uppercase"
                  :class="getRarityBadgeClass(food.rarity)"
                >
                  {{ food.rarity }}
                </span>
              </div>
              <p class="text-[10px] text-gray-400">
                Ví: {{ food.priceLevel }} • {{ food.tag || 'Món ngon' }}
              </p>
            </div>
          </div>

          <!-- Actions: Delete if custom + Toggle switch -->
          <div class="flex items-center gap-2">
            <button
              v-if="food.isCustom"
              @click="deleteFood(food.id)"
              class="w-6 h-6 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center text-xs transition-all cursor-pointer"
              title="Xóa món tự thêm"
            >
              🗑️
            </button>

            <!-- Toggle Switch -->
            <button
              @click="toggleFoodActive(food.id)"
              class="w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer"
              :class="food.isActive !== false ? 'bg-rose-500' : 'bg-gray-300'"
              aria-label="Toggle Food Active"
            >
              <div
                class="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform"
                :class="food.isActive !== false ? 'translate-x-5' : 'translate-x-0'"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFoodStore } from '../composables/useFoodStore.js'

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

function getRarityBadgeClass(rarity) {
  if (rarity === 'SSR') return 'bg-amber-100 text-amber-700'
  if (rarity === 'SR') return 'bg-purple-100 text-purple-700'
  return 'bg-emerald-100 text-emerald-700'
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
