<template>
  <Teleport to="body" :disabled="isTest">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-[#1E1B4B]/80 backdrop-blur-sm select-none overflow-y-auto font-sora">
      <div class="w-full max-w-[356px] sm:max-w-[380px] max-h-[85vh] sm:max-h-[88vh] my-auto animate-pop flex flex-col items-center overflow-y-auto no-scrollbar">
      <!-- Printable Card Container -->
      <div
        ref="receiptRef"
        class="w-full bg-gradient-to-b from-white via-pink-50/40 to-[#FCE7F3]/50 rounded-[32px] border-4 border-[#FCE7F3] shadow-[0_16px_32px_rgba(30,27,75,0.5)] flex flex-col overflow-hidden p-5 relative z-10"
      >
        <!-- Top Badge & Header -->
        <div class="flex flex-col items-center gap-2 pb-3 border-b border-[#DDD6FE]">
          <!-- Gold Header Badge -->
          <div class="px-3 py-1 bg-[#F59E0B] border-2 border-white rounded-xl shadow-xs">
            <span class="text-[11px] font-extrabold text-white uppercase tracking-wide">
              📜 THẺ THỦ CUNG HẸN HÒ • BIÊN LAI HẸN HÒ GACHA FOOD
            </span>
          </div>

          <div class="text-center">
            <span class="text-xs font-semibold text-[#6B21A8]">Mã thẻ: #LOVE-{{ receiptId }}</span>
            <p class="text-[10px] text-gray-500 mt-0.5">Thời gian: {{ formattedDate }}</p>
          </div>
        </div>

        <!-- Couple Passport Identity Slots -->
        <div class="py-3 border-b border-[#DDD6FE] flex flex-col gap-2">
          <div class="flex items-center justify-between gap-2 text-xs">
            <span class="font-bold text-[#1E1B4B] shrink-0">Người thương 1:</span>
            <input
              v-model="boyName"
              placeholder="Tên bạn nam"
              class="w-36 text-right font-bold text-[#1E1B4B] bg-[#FFFBEB] px-2.5 py-1 rounded-[12px] border-[1.5px] border-[#DDD6FE] focus:outline-none focus:border-[#8B5CF6] text-xs"
            />
          </div>

          <div class="flex items-center justify-center -my-1 text-base animate-pulse">
            💖
          </div>

          <div class="flex items-center justify-between gap-2 text-xs">
            <span class="font-bold text-[#1E1B4B] shrink-0">Người thương 2:</span>
            <input
              v-model="girlName"
              placeholder="Tên bạn nữ"
              class="w-36 text-right font-bold text-[#1E1B4B] bg-[#FCE7F3] px-2.5 py-1 rounded-[12px] border-[1.5px] border-[#DDD6FE] focus:outline-none focus:border-[#8B5CF6] text-xs"
            />
          </div>
        </div>

        <!-- Food Showcase Details -->
        <div class="py-3 border-b border-[#DDD6FE] flex flex-col gap-2.5">
          <div class="p-3 bg-[#FFFBEB] rounded-[20px] border-2 border-[#F3E8FF] flex items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-11 h-11 rounded-[12px] bg-white flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                {{ food.icon }}
              </div>
              <div class="min-w-0 flex flex-col gap-0.5">
                <h3 class="font-bricolage font-extrabold text-base text-[#1E1B4B] truncate leading-tight">
                  {{ food.name }}
                </h3>
                <span class="text-[11px] font-medium text-[#6B21A8]">
                  Ví ước tính: {{ food.priceLevel }}
                </span>
              </div>
            </div>

            <span class="px-2 py-0.5 rounded-[6px] bg-[#FCE7F3] border border-[#8B5CF6] text-[10px] font-extrabold text-[#6B21A8] uppercase shrink-0">
              {{ food.rarity }}
            </span>
          </div>

          <!-- Penalty if any -->
          <div v-if="punishment" class="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
            <span class="font-extrabold text-amber-800">Hình phạt kèm theo: </span>
            <span class="text-amber-900">{{ punishment.icon }} {{ punishment.title }} ({{ punishment.description }})</span>
          </div>
        </div>

        <!-- Cute Commitment Clause Box -->
        <div class="my-3 p-3 bg-[#FCE7F3]/60 rounded-[16px] border-[1.5px] border-[#DDD6FE] flex flex-col gap-1 text-center relative z-10">
          <p class="font-sora text-xs font-extrabold text-[#6B21A8] uppercase tracking-wide">
            📜 ĐIỀU KHOẢN CAM KẾT HẸN HÒ 📜
          </p>
          <p class="text-[11px] text-[#1E1B4B] leading-relaxed">
            Hai bên cam kết vui vẻ đi ăn, cấm dỗi hờn, tuyệt đối không nói câu
            <em>"Em/Anh ăn gì cũng được"</em>, mọi thắc mắc xin hỏi máy Gacha.
            Vi phạm phạt gấp đôi!
          </p>
        </div>

        <!-- 3D Red Approval Seal Stamp -->
        <div class="absolute right-3 bottom-3 pointer-events-none transform -rotate-12 opacity-85 z-20">
          <div class="w-22 h-22 rounded-full border-3 border-red-600 flex flex-col items-center justify-center text-red-600 font-black text-center p-1 uppercase tracking-tighter bg-white/40 backdrop-blur-[1px]">
            <span class="text-[8px] border-b border-red-500 w-full">★ ★ ★</span>
            <span class="text-[9px] my-0.5 font-sora font-extrabold">ĐÃ CHỐT KÈO</span>
            <span class="text-[7px]">MIỄN ĐỔI TRẢ</span>
            <span class="text-[8px] border-t border-red-500 w-full">★ ★ ★</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons below receipt -->
      <div class="w-full mt-3 flex flex-col gap-2 z-20">
        <!-- Download PNG button -->
        <button
          @click="downloadReceiptImage"
          :disabled="isGeneratingImage"
          class="w-full h-[48px] bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-75 border-2 border-white rounded-[24px] shadow-[0_4px_8px_rgba(59,130,246,0.3)] font-sora font-extrabold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <span>📸</span>
          <span v-if="!isGeneratingImage">TẢI THẺ TÌNH YÊU (PNG)</span>
          <span v-else>Đang xuất ảnh PNG...</span>
        </button>

        <!-- Copy Message button -->
        <button
          @click="copyMessageToClipboard"
          class="w-full h-[48px] bg-white hover:bg-purple-50 border-2 border-[#DDD6FE] rounded-[24px] font-sora font-extrabold text-sm text-[#6B21A8] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <span>📋</span>
          <span>{{ copySuccess ? 'Đã sao chép tin nhắn! ✨' : 'SAO CHÉP LỜI CHỐT KÈO' }}</span>
        </button>

        <!-- Restart / New Date Button -->
        <button
          @click="$emit('restart')"
          class="btn-restart w-full py-2 font-sora font-bold text-xs text-white/90 hover:text-white text-center transition-all cursor-pointer underline underline-offset-4"
        >
          🔄 Quay Bữa Ăn Tiếp Theo
        </button>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { toPng } from 'html-to-image'

const isTest = import.meta.env?.MODE === 'test'

const props = defineProps({
  food: {
    type: Object,
    required: true,
  },
  punishment: {
    type: Object,
    default: null,
  }
})

defineEmits(['restart'])

const receiptRef = ref(null)
const boyName = ref('Anh Bạn Trai')
const girlName = ref('Em Bé')
const isGeneratingImage = ref(false)
const copySuccess = ref(false)

const receiptId = Math.floor(1000 + Math.random() * 9000)
const now = new Date()
const formattedDate = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`

async function downloadReceiptImage() {
  if (!receiptRef.value) return
  isGeneratingImage.value = true

  try {
    const dataUrl = await toPng(receiptRef.value, {
      quality: 0.95,
      pixelRatio: 2,
    })
    const link = document.createElement('a')
    link.download = `bien-lai-hen-ho-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error('Error generating image:', err)
  } finally {
    isGeneratingImage.value = false
  }
}

async function copyMessageToClipboard() {
  const text = `📢 THÔNG BÁO CHỐT KÈO ĂN TỐI 📢\n` +
    `🍱 Món ăn: ${props.food.name} (${props.food.rarity})\n` +
    `💑 Cặp đôi: ${boyName.value} & ${girlName.value}\n` +
    (props.punishment ? `🚨 Hình phạt lật kèo: ${props.punishment.title}\n` : '') +
    `📜 Cam kết: Vui vẻ đi ăn, không mặt sưng mày sỉa, cấm nói "Em ăn gì cũng được"! Chuẩn bị đồ đi ăn thuiii ❤️`

  try {
    await navigator.clipboard.writeText(text)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2500)
  } catch (err) {
    console.error('Clipboard error:', err)
  }
}
</script>
