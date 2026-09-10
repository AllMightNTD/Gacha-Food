<template>
  <div class="w-full bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border-2 border-rose-300 rounded-2xl p-3.5 shadow-md animate-bounce-gentle my-2">
    <!-- Punishment header -->
    <div class="flex items-center justify-between border-b border-rose-200 pb-1.5 mb-2">
      <span class="text-xs font-black text-rose-600 flex items-center gap-1">
        🚨 HẾT QUYỀN TỪ CHỐI!
      </span>
      <span class="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
        Hình Phạt Tình Yêu
      </span>
    </div>

    <!-- Punishment content -->
    <div class="flex items-start gap-2.5">
      <div class="text-3xl shrink-0 p-1.5 bg-white rounded-xl shadow-xs border border-rose-100">
        {{ punishment.icon }}
      </div>
      <div>
        <h4 class="text-xs font-extrabold text-gray-800">
          {{ punishment.title }}
        </h4>
        <p class="text-[11px] text-gray-600 mt-0.5 leading-snug">
          {{ punishment.description }}
        </p>
      </div>
    </div>

    <!-- Slogan -->
    <div class="mt-2 text-center text-[10px] text-rose-500 font-bold bg-white/60 py-1 rounded-lg">
      ⚠️ Hai bạn phải thực hiện ngay hình phạt này trước khi đi ăn!
    </div>
  </div>
</template>

<script setup>
defineProps({
  punishment: {
    type: Object,
    required: true,
  }
})
</script>
