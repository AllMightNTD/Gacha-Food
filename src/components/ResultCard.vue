<template>
  <div class="w-full flex flex-col items-center select-none">
    <!-- Rarity Aura & Main Food Card -->
    <div
      class="w-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl border-3 sm:border-4 relative overflow-hidden transition-all duration-300"
      :class="rarityStyles.borderClass"
    >
      <!-- Rarity Ribbon Badge -->
      <div class="flex items-center justify-between mb-2 sm:mb-3">
        <span
          class="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-black shadow-xs flex items-center gap-1 uppercase tracking-wider"
          :class="rarityStyles.badgeClass"
        >
          <span>{{ rarityStyles.icon }}</span>
          <span>Phẩm Cấp {{ food.rarity }}</span>
        </span>

        <span class="text-[10px] sm:text-xs font-extrabold text-gray-500 bg-gray-100 px-2 sm:px-2.5 py-0.5 rounded-full border border-gray-200">
          Ví: {{ food.priceLevel }}
        </span>
      </div>

      <!-- Food Big Icon with Glowing Backdrop -->
      <div class="relative my-1 sm:my-2 flex items-center justify-center">
        <div
          class="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full filter blur-xl opacity-60 animate-pulse"
          :class="rarityStyles.glowClass"
        ></div>
        <div class="relative text-5xl sm:text-6xl p-3 sm:p-4 bg-gradient-to-b from-white to-pink-50/50 rounded-full border-2 border-white shadow-md">
          {{ food.icon }}
        </div>
      </div>

      <!-- Food Title & Tag -->
      <div class="text-center mt-1 sm:mt-2">
        <h3 class="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-tight">
          {{ food.name }}
        </h3>
        <span class="inline-block mt-0.5 text-[10px] sm:text-[11px] font-bold text-rose-500 bg-rose-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-rose-100">
          {{ food.tag || 'Món ngon hẹn hò' }}
        </span>
        <p class="text-[11px] sm:text-xs text-gray-600 mt-1.5 italic px-1 sm:px-2">
          "{{ food.description }}"
        </p>
      </div>

      <!-- Veto Hearts Section -->
      <div class="w-full mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-dashed border-gray-200 flex flex-col items-center">
        <div class="flex items-center justify-between w-full text-[11px] sm:text-xs font-bold text-gray-600 mb-1 px-1">
          <span>Quyền lật kèo đổi món:</span>
          <!-- 3 Heart icons -->
          <div class="flex items-center gap-1 text-sm sm:text-base">
            <span v-for="i in 3" :key="i" class="heart-icon transition-transform">
              <span v-if="i <= hearts" class="animate-pulse">❤️</span>
              <span v-else class="opacity-40 grayscale">💔</span>
            </span>
          </div>
        </div>

        <p v-if="hearts > 0" class="text-[10px] sm:text-[11px] text-gray-400 font-medium">
          (Bạn còn {{ hearts }} lần từ chối nếu chưa ưng món này)
        </p>
      </div>

      <!-- Punishment Card if hearts === 0 -->
      <PunishmentCard v-if="hearts === 0 && punishment" :punishment="punishment" />

      <!-- Action Buttons -->
      <div class="w-full space-y-2 mt-3 sm:mt-4">
        <!-- Confirm Button -->
        <button
          @click="$emit('confirm')"
          class="btn-confirm w-full py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
        >
          <span>💚</span>
          <span>Chốt Món Này Luôn! ✨</span>
        </button>

        <!-- Veto Button -->
        <button
          @click="$emit('veto')"
          :disabled="hearts === 0"
          class="btn-veto w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl font-bold text-[10px] min-[360px]:text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 border cursor-pointer"
          :class="hearts > 0
            ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200 active:scale-95 shadow-2xs'
            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'"
        >
          <span v-if="hearts > 0">💔 Không Chịu! Đổi Món (Còn {{ hearts }} tim)</span>
          <span v-else>🔒 Đã hết quyền đổi món! Bắt buộc phải ăn</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PunishmentCard from './PunishmentCard.vue'

const props = defineProps({
  food: {
    type: Object,
    required: true,
  },
  hearts: {
    type: Number,
    default: 3,
  },
  punishment: {
    type: Object,
    default: null,
  }
})

defineEmits(['confirm', 'veto'])

const rarityStyles = computed(() => {
  if (props.food.rarity === 'SSR') {
    return {
      borderClass: 'border-amber-300 shadow-amber-100',
      badgeClass: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
      glowClass: 'bg-amber-300',
      icon: '🌟',
    }
  }
  if (props.food.rarity === 'SR') {
    return {
      borderClass: 'border-purple-300 shadow-purple-100',
      badgeClass: 'bg-gradient-to-r from-purple-400 to-pink-500 text-white',
      glowClass: 'bg-purple-300',
      icon: '💖',
    }
  }
  return {
    borderClass: 'border-emerald-200 shadow-emerald-50',
    badgeClass: 'bg-gradient-to-r from-teal-400 to-emerald-400 text-white',
    glowClass: 'bg-emerald-200',
    icon: '🍀',
  }
})
</script>
