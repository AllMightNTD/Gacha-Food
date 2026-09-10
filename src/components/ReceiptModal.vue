<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm select-none overflow-y-auto">
    <div class="w-full max-w-sm my-auto animate-pop flex flex-col items-center">
      <!-- Receipt Printable Container -->
      <div
        ref="receiptRef"
        class="w-full bg-white text-gray-800 rounded-3xl p-6 shadow-2xl relative border border-gray-100 font-mono text-xs overflow-hidden"
      >
        <!-- Top Jagged Edge / Punch hole decoration -->
        <div class="flex justify-between items-center -mt-2 mb-3 px-2 text-gray-300">
          <span>●</span><span>●</span><span>●</span><span>●</span><span>●</span><span>●</span><span>●</span><span>●</span>
        </div>

        <!-- Receipt Header -->
        <div class="text-center pb-3 border-b-2 border-dashed border-gray-300">
          <div class="text-2xl mb-1">💖 🍱 💖</div>
          <h2 class="text-sm font-black tracking-widest text-gray-900 uppercase font-sans">
            BIÊN LAI HẸN HÒ GACHA FOOD
          </h2>
          <p class="text-[10px] text-gray-500 mt-0.5">
            Tiệm Gacha Giải Cứu Bữa Tối • Số: #LOVE-{{ receiptId }}
          </p>
          <p class="text-[10px] text-gray-400 mt-0.5">
            Thời gian: {{ formattedDate }}
          </p>
        </div>

        <!-- Couple Name Fields -->
        <div class="py-3 border-b border-dashed border-gray-200 space-y-1.5 font-sans">
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-500 font-bold">Người thương 1:</span>
            <input
              v-model="boyName"
              placeholder="Tên bạn nam"
              class="w-36 text-right font-black text-rose-600 bg-pink-50/50 px-2 py-0.5 rounded-lg border border-pink-100 focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-500 font-bold">Người thương 2:</span>
            <input
              v-model="girlName"
              placeholder="Tên bạn nữ"
              class="w-36 text-right font-black text-rose-600 bg-pink-50/50 px-2 py-0.5 rounded-lg border border-pink-100 focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
        </div>

        <!-- Food Item Details -->
        <div class="py-3 border-b-2 border-dashed border-gray-300 space-y-2 font-sans">
          <div class="flex items-center justify-between font-black text-sm text-gray-900">
            <div class="flex items-center gap-1.5">
              <span class="text-lg">{{ food.icon }}</span>
              <span>{{ food.name }}</span>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full font-extrabold bg-rose-100 text-rose-700">
              {{ food.rarity }}
            </span>
          </div>

          <div class="flex items-center justify-between text-[11px] text-gray-500">
            <span>Mức ví ước tính:</span>
            <span class="font-bold text-gray-700">{{ food.priceLevel }}</span>
          </div>

          <!-- Penalty if any -->
          <div v-if="punishment" class="bg-amber-50 p-2 rounded-xl border border-amber-200 text-[11px]">
            <span class="font-extrabold text-amber-800">Hình phạt kèm theo: </span>
            <span class="text-amber-900">{{ punishment.icon }} {{ punishment.title }} ({{ punishment.description }})</span>
          </div>
        </div>

        <!-- Legally-binding Cute Commitment Clause -->
        <div class="py-3 text-[10px] text-gray-600 font-sans leading-relaxed text-center bg-pink-50/40 rounded-xl my-2 p-2 border border-pink-100">
          <p class="font-extrabold text-rose-600 uppercase mb-0.5">📜 ĐIỀU KHOẢN CAM KẾT HẸN HÒ 📜</p>
          <p>
            Hai bên cam kết vui vẻ đi ăn, cấm dỗi, tuyệt đối không nói câu
            <em>"Em/Anh ăn gì cũng được"</em>, mọi thắc mắc xin hỏi máy Gacha.
            Vi phạm phạt gấp đôi!
          </p>
        </div>

        <!-- Red Approval Seal Stamp -->
        <div class="absolute right-4 bottom-14 pointer-events-none transform -rotate-12 opacity-85">
          <div class="w-24 h-24 rounded-full border-4 border-red-600 flex flex-col items-center justify-center text-red-600 font-black text-center p-1 uppercase tracking-tighter">
            <span class="text-[9px] border-b border-red-500 w-full">★ ★ ★</span>
            <span class="text-[10px] my-0.5">ĐÃ CHỐT KÈO</span>
            <span class="text-[7px]">MIỄN ĐỔI TRẢ</span>
            <span class="text-[9px] border-t border-red-500 w-full">★ ★ ★</span>
          </div>
        </div>

        <!-- Fake Barcode & Thank you -->
        <div class="pt-2 text-center text-gray-400">
          <div class="font-mono tracking-widest text-lg select-none">
            ||| | |||| | ||| |||| | ||||| | ||
          </div>
          <p class="text-[9px] mt-1 text-gray-400 font-sans">
            Chúc hai bạn có một bữa ăn ngon miệng & ngập tràn hạnh phúc! ❤️
          </p>
        </div>
      </div>

      <!-- Action Buttons below receipt -->
      <div class="w-full mt-4 space-y-2 font-sans">
        <!-- Download PNG image button -->
        <button
          @click="downloadReceiptImage"
          :disabled="isGeneratingImage"
          class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-pink-300 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>📸</span>
          <span v-if="!isGeneratingImage">Tải Ảnh Biên Lai Về Máy</span>
          <span v-else>Đang xuất ảnh PNG...</span>
        </button>

        <!-- Copy Message button -->
        <button
          @click="copyMessageToClipboard"
          class="w-full py-2.5 px-4 rounded-2xl bg-white text-gray-700 font-bold text-xs shadow-sm border border-pink-200 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-pink-50"
        >
          <span>📋</span>
          <span>{{ copySuccess ? 'Đã sao chép tin nhắn! ✨' : 'Sao Chép Tin Nhắn Chốt Đơn' }}</span>
        </button>

        <!-- Restart / New Date Button -->
        <button
          @click="$emit('restart')"
          class="btn-restart w-full py-2 px-4 rounded-2xl text-white/90 hover:text-white font-bold text-xs text-center transition-all cursor-pointer underline underline-offset-4"
        >
          🔄 Quay Bữa Ăn Tiếp Theo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toPng } from 'html-to-image'

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
