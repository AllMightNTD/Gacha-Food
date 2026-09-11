# Design Specification: Love Contract Receipt Modal (Refactor Biên Lai Hẹn Hò)

**Date**: 2026-09-11  
**Status**: Approved  
**Target Component**: `src/components/ReceiptModal.vue`

## Overview

Refactor the `ReceiptModal.vue` component into a modern, cute "Love Contract Card" (Thẻ Tình Yêu / Passport Hẹn Hò) aligned 100% with the new Gacha Food design system (featuring Sora & Bricolage Grotesque typography, romantic gradients, vibrant violet `#8B5CF6`, soft pink `#FCE7F3`, electric blue `#3B82F6` CTAs, and 32px rounded containers).

---

## 1. Modal Overlay & Container Architecture

- **Backdrop Overlay**:
  - CSS: `fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E1B4B]/80 backdrop-blur-sm select-none overflow-y-auto font-sora`
  - Ensures strict horizontal & vertical centering across mobile and desktop viewports.
- **Card Container**:
  - Max Width: `361px`, Max Height: `90vh`, Overflow: `overflow-y-auto no-scrollbar`
  - Fill: `bg-gradient-to-b from-white via-pink-50/40 to-[#FCE7F3]/50`
  - Border: `border-4 border-[#FCE7F3] rounded-[32px]`
  - Shadow: `shadow-[0_16px_32px_rgba(30,27,75,0.5)]`

---

## 2. Component Design & Sections

### 2.1 Header & Love Passport Badge
- **Top Badge**:
  - Text: `"📜 THẺ THỦ CUNG HẸN HÒ"` (`Sora` ExtraBold 11px uppercase white text).
  - Background: Gold `#F59E0B` with 2px white border, 12px rounded corners.
- **Receipt ID & Time**:
  - ID Tag: `#LOVE-XXXX` (`Sora` SemiBold 11px `#6B21A8`).
  - Time Stamp: `HH:MM - DD/MM/YYYY`.

### 2.2 Couple Identity Fields (Love Passport Slots)
- **Person 1 Slot**:
  - Label: `"Người thương 1"` (`Sora` Bold 11px `#1E1B4B`).
  - Input field: `v-model="boyName"`, height 36px, background `#FFFBEB`, border `1.5px border-[#DDD6FE]`, 12px rounded corners, text `#1E1B4B` font-bold.
- **Heart Separator**:
  - Icon: Animated pulsing heart `💖` centered between fields.
- **Person 2 Slot**:
  - Label: `"Người thương 2"` (`Sora` Bold 11px `#1E1B4B`).
  - Input field: `v-model="girlName"`, height 36px, background `#FCE7F3`, border `1.5px border-[#DDD6FE]`, 12px rounded corners, text `#1E1B4B` font-bold.

### 2.3 Food Showcase & Punishment Banner
- **Dish Showcase Box**:
  - Background `#FFFBEB`, border `2px border-[#F3E8FF]`, 20px rounded corners, padding 12px.
  - Dish Icon & Name: `Bricolage Grotesque` ExtraBold 18px `#1E1B4B`.
  - Rarity Badge: `SSR` / `SR` / `R` with pink background `#FCE7F3` and violet border `#8B5CF6`.
  - Estimated Budget: `Ví: $$$`.
- **Punishment Banner** (If active):
  - Yellow-amber card: `bg-amber-50 border-amber-200 border rounded-xl p-2.5`, text `Sora` 11px.

### 2.4 Cute Commitment Clause & 3D Approval Seal
- **Commitment Clause Box**:
  - Background `#FCE7F3/60`, border `1.5px border-[#DDD6FE]`, 16px rounded corners, padding 12px.
  - Title: `"📜 ĐIỀU KHOẢN CAM KẾT HẸN HÒ"` (`Sora` ExtraBold 11px text-[#6B21A8] uppercase).
  - Body: *"Hai bên cam kết vui vẻ đi ăn, cấm dỗi hờn, tuyệt đối không nói câu 'Em/Anh ăn gì cũng được'. Vi phạm phạt gấp đôi!"*
- **3D Red Approval Seal Stamp**:
  - Rotated -12deg circular stamp in bottom right.
  - Border: 3px solid `#DC2626` (Red), text: `★ ĐÃ CHỐT KÈO ★ MIỄN ĐỔI TRẢ`.

### 2.5 Action Buttons (CTAs)
1. **Primary CTA**: `"TẢI THẺ TÌNH YÊU (PNG)"`
   - Background `#3B82F6` Electric Blue, height 48px, border 2px white, rounded 24px, shadow `0px 4px 8px rgba(59,130,246,0.3)`.
   - Text: `Sora` ExtraBold 14px white.
   - Generates PNG download using `html-to-image`.
2. **Secondary CTA**: `"SAO CHÉP LỜI CHỐT KÈO"`
   - Background `#FFFFFF`, height 48px, border 2px `#DDD6FE`, rounded 24px.
   - Text: `Sora` ExtraBold 14px `#6B21A8`.
   - Copies commitment message to clipboard.
3. **Tertiary Link**: `"🔄 QUAY BỮA ĂN TIẾP THEO"`
   - Emits `@restart` event.

---

## 3. Spec Self-Review Checklist

- [x] **Placeholder Scan**: No TODOs or TBDs. All classes, specs, and properties are defined.
- [x] **Internal Consistency**: Matches Home & Modal design language (Sora + Bricolage fonts, `#8B5CF6`, `#FCE7F3`, `#3B82F6`).
- [x] **Scope Check**: Focused strictly on refactoring `ReceiptModal.vue`.
- [x] **Ambiguity Check**: Clear component props, events, and styling rules.
