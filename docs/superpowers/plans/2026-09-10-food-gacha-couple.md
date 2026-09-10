# Food Gacha Couple Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng ứng dụng web Gacha Đồ Ăn Cho Cặp Đôi (Food Gacha Couple) ngộ nghĩnh, đáng yêu giải quyết câu hỏi "Em ăn gì cũng được", bằng Vite + Vue 3 + Tailwind CSS, tối ưu 100% Mobile-First không cần backend.

**Architecture:** Ứng dụng Single Page Application (SPA) trên Vue 3 Composition API với kiến trúc mô đun: Composables quản lý state và logic độc lập (Gacha RNG, Veto/Hearts, FoodStore + LocalStorage, Web Audio API Sound Synthesizer), cùng hệ thống UI components cute chuẩn mobile (Gashapon machine, Capsule reveal, Love Receipt PNG exporter, Menu Drawer).

**Tech Stack:** 
- Vite 5, Vue 3 (Composition API, `<script setup>`)
- Tailwind CSS, Lucide Icons (`lucide-vue-next`)
- `canvas-confetti` (hiệu ứng pháo hoa mở trứng)
- `html-to-image` (kết xuất biên lai tình yêu thành ảnh PNG tải về điện thoại)
- Web Audio API (âm thanh synthesizer offline không phụ thuộc file mp3 ngoài)
- Vitest + `@vue/test-utils` + `happy-dom` (kiểm thử tự động các composables và components)

## Global Constraints

- 100% Mobile-First Responsive: Tối ưu từ 360px (màn hình nhỏ) đến 430px+ (màn hình lớn), hiển thị cân đối trên desktop/tablet.
- Phản hồi cảm ứng: Touch targets tối thiểu 44x44px, bo tròn siêu mềm `rounded-3xl`, nảy nút `active:scale-95`.
- Không phụ thuộc backend: Mọi dữ liệu tùy biến lưu trên trình duyệt qua `localStorage`.
- Âm thanh offline: Dùng Web Audio API synthesizer tự sinh âm thanh, có công tắc tắt tiếng (Mute/Unmute).

---

### Task 1: Khởi Tạo Dự Án Vite + Vue 3 + Tailwind CSS & Testing Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `postcss.config.js`
- Create: `tailwind.config.js`
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/assets/styles/main.css`
- Create: `vitest.config.js`
- Test: `tests/setup.test.js`

**Interfaces:**
- Consumes: None
- Produces: Môi trường chạy Vite development server và Vitest runner sẵn sàng.

- [ ] **Step 1: Khởi tạo package.json với dependencies cần thiết**

Tạo `package.json` với Vue 3, Tailwind CSS, Lucide icons, canvas-confetti, html-to-image và Vitest:
```json
{
  "name": "gacha-food",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "html-to-image": "^1.11.13",
    "lucide-vue-next": "^0.475.0",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/test-utils": "^2.4.6",
    "autoprefixer": "^10.4.20",
    "happy-dom": "^17.1.8",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "vite": "^6.1.0",
    "vitest": "^3.0.5"
  }
}
```

- [ ] **Step 2: Cài đặt npm dependencies**

Chạy lệnh cài đặt:
`npm install`
Expected: Hoàn thành cài đặt các node_modules thành công không báo lỗi.

- [ ] **Step 3: Cấu hình Tailwind CSS, PostCSS và Vite**

Tạo `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cute: {
          pink: '#FFE4E6',
          rose: '#FDA4AF',
          primary: '#FB7185',
          dark: '#E11D48',
          cream: '#FFFBEB',
          yellow: '#FEF08A',
          mint: '#D1FAE5',
          lavender: '#F3E8FF',
        }
      },
      fontFamily: {
        cute: ['"Nunito"', '"Quicksand"', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s infinite ease-in-out',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
```

Tạo `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Tạo `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```

Tạo `vitest.config.js`:
```javascript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
  },
})
```

- [ ] **Step 4: Cấu hình index.html, main.css và main.js**

Tạo `src/assets/styles/main.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Nunito', sans-serif;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
```

Tạo `index.html`:
```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍱</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <meta name="theme-color" content="#FDA4AF" />
    <title>Gacha Đồ Ăn Cặp Đôi - Hôm Nay Ăn Gì? ❤️</title>
  </head>
  <body class="bg-[#FFF5F7] text-gray-800 min-h-screen overflow-x-hidden">
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 5: Viết test môi trường và chạy thử nghiệm**

Tạo `tests/setup.test.js`:
```javascript
import { describe, it, expect } from 'vitest'

describe('Project Setup Verification', () => {
  it('should run vitest correctly in happy-dom environment', () => {
    expect(true).toBe(true)
    expect(window).toBeDefined()
  })
})
```
Chạy: `npm run test`
Expected: PASS 1 test.

- [ ] **Step 6: Commit git**

```bash
git add .
git commit -m "chore: scaffold vite vue3 project with tailwind and vitest"
```

---

### Task 2: Xây Dựng Bộ Dữ Liệu Thực Đơn, Hình Phạt & Lời Khuyên Hẹn Hò

**Files:**
- Create: `src/data/defaultFoods.js`
- Create: `src/data/punishmentList.js`
- Create: `src/data/quotes.js`
- Test: `tests/data.test.js`

**Interfaces:**
- Consumes: None
- Produces:
  - `defaultFoods`: Array of `{ id, name, category, rarity, icon, priceLevel, description }`
  - `punishmentList`: Array of `{ id, title, description, icon }`
  - `coupleQuotes`: Array of `{ id, text, author }`

- [ ] **Step 1: Viết test kiểm tra cấu trúc dữ liệu**

Tạo `tests/data.test.js`:
```javascript
import { describe, it, expect } from 'vitest'
import { defaultFoods } from '../src/data/defaultFoods.js'
import { punishmentList } from '../src/data/punishmentList.js'
import { coupleQuotes } from '../src/data/quotes.js'

describe('Data Specifications', () => {
  it('defaultFoods should contain at least 25 items with valid rarities and categories', () => {
    expect(defaultFoods.length).toBeGreaterThanOrEqual(25)
    defaultFoods.forEach(food => {
      expect(['SSR', 'SR', 'R']).toContain(food.rarity)
      expect(['hotpot', 'bbq', 'noodle', 'rice', 'snack', 'dessert']).toContain(food.category)
      expect(food.name).toBeTruthy()
      expect(food.icon).toBeTruthy()
    })
  })

  it('punishmentList should have at least 8 romantic punishments', () => {
    expect(punishmentList.length).toBeGreaterThanOrEqual(8)
    punishmentList.forEach(p => {
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
    })
  })

  it('coupleQuotes should contain funny excuses', () => {
    expect(coupleQuotes.length).toBeGreaterThanOrEqual(5)
  })
})
```

- [ ] **Step 2: Chạy test và xác nhận thất bại (TDD)**

Chạy: `npm run test`
Expected: FAIL vì các file data chưa tồn tại.

- [ ] **Step 3: Tạo `src/data/defaultFoods.js`**

Tạo danh sách thực đơn đậm chất Việt Nam phong phú:
- SSR (Huyền thoại): Lẩu Haidilao, Buffet nướng Hàn Quốc, Bò bít tết Steak, Cua sốt trứng muối, Sashimi cá hồi Nhật...
- SR (Gắn kết): Bún đậu mắm tôm, Pizza phô mai, Gà rán sốt cay, Lẩu gà lá é, Lẩu ốc sườn sụn, Bò né hoa tuyết...
- R (Bình dị ấm lòng): Phở bò tái lăn, Bún bò Huế, Cơm tấm sườn bì chả, Mì cay 7 cấp độ, Bánh mì chảo, Hủ tiếu Nam Vang, Bún chả Hà Nội, Cơm rang dưa bò...
- Tráng miệng/Ăn vặt: Trà sữa trân châu, Kem bơ Đà Lạt, Chè khúc bạch, Bingsu xoài, Bánh tráng nướng...

- [ ] **Step 4: Tạo `src/data/punishmentList.js` & `src/data/quotes.js`**

Tạo danh sách hình phạt tình yêu hài hước khi lật kèo quá 3 lần và các câu trích dẫn "Em ăn gì cũng được".

- [ ] **Step 5: Chạy lại test xác nhận thành công**

Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 6: Commit git**

```bash
git add src/data/ tests/data.test.js
git commit -m "feat(data): add default foods, punishments and couple quotes"
```

---

### Task 3: Xây Dựng Audio Synthesizer (Web Audio API) & Rung Haptic

**Files:**
- Create: `src/composables/useAudio.js`
- Test: `tests/useAudio.test.js`

**Interfaces:**
- Consumes: Web Audio API (`window.AudioContext` or `webkitAudioContext`), `navigator.vibrate`
- Produces:
  - `isMuted`: Ref<boolean>
  - `toggleMute()`: Function
  - `playCrankSound()`: Function (tiếng vặn cót lách cách)
  - `playDropSound()`: Function (tiếng bóng rơi khay)
  - `playOpenSound()`: Function (tiếng nổ pop tách vỏ trứng)
  - `playFanfareSound(rarity)`: Function (nhạc arpeggio chúc mừng theo phẩm cấp SSR/SR/R)
  - `playVetoSound()`: Function (âm thanh tiếc nuối khi lật kèo)
  - `triggerHaptic(pattern)`: Function

- [ ] **Step 1: Viết test cho useAudio**

Tạo `tests/useAudio.test.js` giả lập AudioContext mock và kiểm tra các hàm gọi không bị lỗi crash khi âm thanh bật hoặc tắt.

- [ ] **Step 2: Triển khai `src/composables/useAudio.js`**

Xây dựng bộ phát âm thanh tổng hợp (sine/square/triangle wave) với envelope nhẹ nhàng, giai điệu ngọt ngào dễ thương, kèm hỗ trợ rung haptic cho điện thoại.

- [ ] **Step 3: Chạy test xác nhận useAudio chạy ổn định**

Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 4: Commit git**

```bash
git add src/composables/useAudio.js tests/useAudio.test.js
git commit -m "feat(audio): implement Web Audio API sound synthesizer and haptics"
```

---

### Task 4: Xây Dựng Quản Lý Thực Đơn, Bộ Lọc & LocalStorage (useFoodStore)

**Files:**
- Create: `src/composables/useFoodStore.js`
- Test: `tests/useFoodStore.test.js`

**Interfaces:**
- Consumes: `src/data/defaultFoods.js`
- Produces:
  - `foods`: Ref<Array<Food>>
  - `activeFoods`: Computed<Array<Food>>
  - `selectedCategory`: Ref<string>
  - `selectedBudget`: Ref<string>
  - `filteredFoods`: Computed<Array<Food>>
  - `toggleFoodActive(id)`: Function
  - `addCustomFood(food)`: Function
  - `deleteFood(id)`: Function
  - `resetToDefault()`: Function
  - `setCategory(category)`: Function
  - `setBudget(budget)`: Function

- [ ] **Step 1: Viết test cho useFoodStore**

Tạo `tests/useFoodStore.test.js`:
- Kiểm tra load mặc định từ defaultFoods.
- Kiểm tra lọc theo category (`hotpot`, `bbq`, `noodle`...).
- Kiểm tra lọc theo ngân sách/phẩm cấp (`all`, `SSR`, `R`).
- Kiểm tra thêm món mới và lưu vào localStorage.
- Kiểm tra tắt/bật món và reset về mặc định.

- [ ] **Step 2: Triển khai `src/composables/useFoodStore.js`**

Viết composable hoàn chỉnh quản lý dữ liệu với localStorage serialization an toàn, xử lý fallback khi dữ liệu trống.

- [ ] **Step 3: Chạy test xác nhận logic hoạt động chính xác**

Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 4: Commit git**

```bash
git add src/composables/useFoodStore.js tests/useFoodStore.test.js
git commit -m "feat(store): implement food store with filtering and localStorage persistence"
```

---

### Task 5: Xây Dựng Logic Gacha RNG & Quyền Lật Kèo / Hình Phạt (useGacha & useVeto)

**Files:**
- Create: `src/composables/useVeto.js`
- Create: `src/composables/useGacha.js`
- Test: `tests/gachaLogic.test.js`

**Interfaces:**
- Consumes: `useFoodStore`, `punishmentList`
- Produces:
  - `useVeto`:
    - `hearts`: Ref<number> (3 -> 0)
    - `isVetoAvailable`: Computed<boolean>
    - `activePunishment`: Ref<Punishment | null>
    - `useVeto()`: Function -> giảm tim, nếu 0 thì rút hình phạt
    - `resetVeto()`: Function -> hồi phục 3 tim
  - `useGacha`:
    - `machineState`: Ref<'idle' | 'spinning' | 'dropped' | 'opening' | 'revealed'>
    - `currentCapsuleColor`: Ref<string>
    - `currentResult`: Ref<Food | null>
    - `startSpin()`: Function
    - `openCapsule()`: Function
    - `resetGacha()`: Function

- [ ] **Step 1: Viết test cho useVeto & useGacha**

Tạo `tests/gachaLogic.test.js`:
- Kiểm tra 3 lượt veto giảm dần: 3 -> 2 -> 1 -> 0.
- Khi đạt 0: `isVetoAvailable` thành `false`, `activePunishment` được gán ngẫu nhiên 1 hình phạt từ `punishmentList`.
- Kiểm tra `useGacha`: xác suất chọn món từ danh sách `filteredFoods`, đổi trạng thái máy từ `idle` -> `spinning` -> `dropped` -> `revealed`.

- [ ] **Step 2: Triển khai `src/composables/useVeto.js` & `src/composables/useGacha.js`**

Viết code hoàn chỉnh đảm bảo các ràng buộc logic.

- [ ] **Step 3: Chạy test xác nhận logic Gacha & Veto**

Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 4: Commit git**

```bash
git add src/composables/useVeto.js src/composables/useGacha.js tests/gachaLogic.test.js
git commit -m "feat(logic): implement gacha spin rng and couple veto punishment logic"
```

---

### Task 6: Xây Dựng Giao Diện Máy Gashapon Mobile-First (GashaponMachine.vue)

**Files:**
- Create: `src/components/GashaponMachine.vue`
- Create: `src/components/FilterBar.vue`
- Create: `src/components/TopBar.vue`
- Modify: `src/App.vue`
- Test: `tests/GashaponMachine.test.js`

**Interfaces:**
- Consumes: `useGacha`, `useFoodStore`, `useAudio`
- Produces: Giao diện máy quay trứng chuẩn mobile với lồng kính hoạt hình, núm vặn cảm ứng xoay 360 độ và khay bóng nảy.

- [ ] **Step 1: Viết test cho GashaponMachine component**

Tạo `tests/GashaponMachine.test.js` kiểm tra rendering máy, sự kiện chạm vào núm vặn xoay để kích hoạt spin, hiển thị bóng rơi khi trạng thái là `dropped`.

- [ ] **Step 2: Triển khai `TopBar.vue` & `FilterBar.vue`**

Tạo `TopBar.vue` với nút bật tắt âm thanh, nút mở thực đơn và slogan cute.
Tạo `FilterBar.vue` cuộn ngang êm ái trên mobile để lọc danh mục món ăn và mức ví tiền.

- [ ] **Step 3: Triển khai `GashaponMachine.vue`**

Thiết kế giao diện máy quay Gashapon kiểu dáng Kawaii:
- Lồng kính vòm trong suốt bo tròn bóng bẩy, bên trong có 10 quả bóng viên nang pastel nhảy nhót khi quay.
- Núm xoay tactile tròn ở giữa máy với rãnh bám và mũi tên chỉ dẫn. Hỗ trợ bấm vào để quay hoặc vuốt xoay.
- Ống trượt và khay hứng bóng ở đáy máy, quả bóng may mắn rơi xuống và nhấp nháy nhịp nhàng.

- [ ] **Step 4: Ghép nối vào `App.vue` và kiểm thử hiển thị**

Tích hợp vào `App.vue` với background pastel gradient, bubble lơ lửng và responsive container `max-w-md mx-auto`.
Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 5: Commit git**

```bash
git add src/components/TopBar.vue src/components/FilterBar.vue src/components/GashaponMachine.vue src/App.vue tests/GashaponMachine.test.js
git commit -m "feat(ui): create kawaii mobile-first gashapon machine with interactive crank"
```

---

### Task 7: Xây Dựng Hoạt Ảnh Tách Trứng, Thẻ Kết Quả & Thẻ Hình Phạt (CapsuleModal, ResultCard & PunishmentCard)

**Files:**
- Create: `src/components/CapsuleModal.vue`
- Create: `src/components/ResultCard.vue`
- Create: `src/components/PunishmentCard.vue`
- Modify: `src/App.vue`
- Test: `tests/ResultCard.test.js`

**Interfaces:**
- Consumes: `useGacha`, `useVeto`, `useAudio`, `canvas-confetti`
- Produces: Modal hoạt ảnh tách vỏ trứng ziczac, thẻ kết quả món ăn với 3 tim veto, nút Chốt / Đổi món và thẻ phạt khi hết lượt.

- [ ] **Step 1: Viết test cho ResultCard & Veto interaction**

Tạo `tests/ResultCard.test.js`:
- Kiểm tra hiển thị thông tin món ăn (tên, phẩm cấp SSR/SR/R, giá tiền).
- Kiểm tra hiển thị đúng 3 biểu tượng trái tim.
- Kiểm tra bấm nút đổi món kích hoạt veto.
- Kiểm tra khi 0 tim: nút đổi món bị vô hiệu hóa `disabled`.

- [ ] **Step 2: Triển khai `CapsuleModal.vue`**

Hoạt ảnh tách vỏ trứng chân thực:
- Trứng rung lắc 3 nhịp kịch tính.
- Nửa trên vỏ trứng bay lên, nửa dưới hạ xuống.
- Bắn pháo hoa giấy đầy màu sắc với `canvas-confetti`.
- Hào quang tỏa sáng theo phẩm cấp (Vàng kim cho SSR, Tím cho SR, Xanh bạc hà cho R).

- [ ] **Step 3: Triển khai `ResultCard.vue` & `PunishmentCard.vue`**

- `ResultCard.vue`: Card đồ ăn dễ thương với icon to bự, huy hiệu phẩm cấp, câu quote hài hước, thanh 3 trái tim. Nút to đùng bấm tiện tay bằng 1 ngón cái: 💚 "Chốt Món Này Luôn!" và 💔 "Không Chịu! Đổi Món Khác".
- `PunishmentCard.vue`: Chiếc hộp cảnh báo màu vàng kem/cam pastel vui nhộn khi hết quyền từ chối, hiển thị hình phạt ngộ nghĩnh rút được.

- [ ] **Step 4: Chạy test và xác nhận chức năng**

Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 5: Commit git**

```bash
git add src/components/CapsuleModal.vue src/components/ResultCard.vue src/components/PunishmentCard.vue tests/ResultCard.test.js
git commit -m "feat(ui): implement capsule hatching animation, result card and punishment card"
```

---

### Task 8: Xây Dựng "Biên Lai Hẹn Hò Chốt Kèo" & Xuất Ảnh PNG (ReceiptModal.vue)

**Files:**
- Create: `src/components/ReceiptModal.vue`
- Modify: `src/App.vue`
- Test: `tests/ReceiptModal.test.js`

**Interfaces:**
- Consumes: `currentResult`, `activePunishment`, `html-to-image`
- Produces: Phiếu tính tiền hẹn hò chuẩn phong cách vintage cafe có thể tải về máy dưới dạng file ảnh PNG và sao chép văn bản chốt kèo.

- [ ] **Step 1: Viết test cho ReceiptModal**

Tạo `tests/ReceiptModal.test.js`:
- Kiểm tra render đúng tên món ăn đã chọn.
- Cho phép chỉnh sửa tên 2 bạn (Anh Bạn Trai / Em Bé).
- Kiểm tra hiển thị điều khoản cam kết "không dỗi, không lật kèo".
- Kiểm tra hiển thị dấu mộc đỏ "ĐÃ CHỐT KÈO".

- [ ] **Step 2: Triển khai `ReceiptModal.vue`**

Thiết kế biên lai tinh tế:
- Hiệu ứng mép giấy răng cưa (jagged edge).
- Tên cặp đôi có thể bấm vào sửa trực tiếp hoặc đổi tên nhanh.
- Mã vạch barcode xinh xắn và số thứ tự hóa đơn tình yêu may mắn.
- Con dấu mộc đỏ tròn "CHỐT KÈO • MIỄN ĐỔI TRẢ".
- Nút 📸 "Tải ảnh biên lai về máy" dùng `htmlToImage.toPng()` kích hoạt tải file `bien-lai-hen-ho-[ngay].png`.
- Nút 📋 "Sao chép tin nhắn chốt đơn" copy đoạn chat cute vào bộ nhớ tạm.
- Nút 🔄 "Hẹn hò bữa tiếp theo" reset lại máy.

- [ ] **Step 3: Chạy test và kiểm tra render**

Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 4: Commit git**

```bash
git add src/components/ReceiptModal.vue tests/ReceiptModal.test.js
git commit -m "feat(receipt): add romantic date receipt with html-to-image PNG exporter"
```

---

### Task 9: Xây Dựng Bảng Trượt Quản Lý Thực Đơn (MenuDrawer.vue)

**Files:**
- Create: `src/components/MenuDrawer.vue`
- Modify: `src/App.vue`
- Test: `tests/MenuDrawer.test.js`

**Interfaces:**
- Consumes: `useFoodStore`
- Produces: Bottom Sheet trượt mượt mà trên mobile cho phép xem, bật/tắt, thêm món ruột mới và reset thực đơn.

- [ ] **Step 1: Viết test cho MenuDrawer**

Tạo `tests/MenuDrawer.test.js`:
- Kiểm tra hiển thị danh sách món ăn.
- Kiểm tra bấm toggle bật/tắt trạng thái hoạt động của món ăn.
- Kiểm tra form thêm món mới hoạt động đúng.
- Kiểm tra nút reset thực đơn về mặc định.

- [ ] **Step 2: Triển khai `MenuDrawer.vue`**

Thiết kế Bottom Sheet tối ưu ngón tay cái:
- Thanh kéo (drag pill) ở đỉnh bảng.
- Danh sách món ăn cuộn mượt mà có tag màu phẩm cấp (Vàng SSR, Tím SR, Xanh R).
- Công tắc bật/tắt (Toggle switch) trực quan.
- Form "Thêm món ruột của hai đứa": Nhập tên món, chọn phẩm cấp (SSR/SR/R), chọn danh mục.
- Nút "Khôi phục thực đơn gốc".

- [ ] **Step 3: Chạy test và xác nhận**

Chạy: `npm run test`
Expected: PASS.

- [ ] **Step 4: Commit git**

```bash
git add src/components/MenuDrawer.vue tests/MenuDrawer.test.js
git commit -m "feat(drawer): add mobile bottom sheet menu manager with custom food creation"
```

---

### Task 10: Tinh Chỉnh Giao Diện Mobile-First, Hiệu Ứng & Kiểm Thử Toàn Diện

**Files:**
- Modify: `src/App.vue`
- Modify: `src/assets/styles/main.css`
- Create: `tests/e2eFlow.test.js`

**Interfaces:**
- Consumes: Toàn bộ hệ thống components và composables
- Produces: Ứng dụng hoàn thiện 100%, bóng bẩy, mượt mà trên mọi thiết bị di động.

- [ ] **Step 1: Kiểm thử luồng trải nghiệm hoàn chỉnh (E2E Integration Test)**

Tạo `tests/e2eFlow.test.js`:
- Kiểm tra toàn bộ chu trình: Mở app -> Chọn bộ lọc lẩu -> Quay Gashapon -> Rơi bóng -> Mở trứng ra món -> Lật kèo 3 lần -> Nhận hình phạt -> Chốt món -> Xuất biên lai.
Chạy: `npm run test`
Expected: PASS toàn bộ test suite.

- [ ] **Step 2: Tinh chỉnh thẩm mỹ & Responsive trên các viewport di động**

- Kiểm tra padding safe-area (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`).
- Tinh chỉnh hiệu ứng bóng đổ 3D, hạt lấp lánh (sparkles), hoạt ảnh nảy nút.
- Đảm bảo layout không bị tràn thanh cuộn ngang trên viewport 360px - 430px.

- [ ] **Step 3: Build production để kiểm tra lỗi biên dịch**

Chạy: `npm run build`
Expected: Build thành công không có warning hoặc lỗi type/syntax.

- [ ] **Step 4: Commit hoàn thiện dự án**

```bash
git add .
git commit -m "feat: complete mobile-first food gacha app for couples with full polish"
```
