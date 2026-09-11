# Design Specification: Menu Drawer Responsive Hybrid Mobile Bottom Sheet

**Date**: 2026-09-11  
**Status**: Approved  
**Target Component**: `src/components/MenuDrawer.vue`

## Overview

Redesign `MenuDrawer.vue` to deliver a native mobile app bottom-sheet experience on mobile viewports (<640px) and a centered modal card on desktop viewports (≥640px).

---

## 1. Responsive Positioning & Container Architecture

- **Backdrop Overlay**:
  - CSS: `fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-[#1E1B4B]/80 backdrop-blur-sm transition-all select-none font-sora`
  - Mobile (<640px): `justify-end` -> slides up from bottom as a Native Bottom Sheet.
  - Desktop (≥640px): `sm:justify-center sm:p-4` -> centers as a desktop modal dialog.
- **Drawer / Modal Container**:
  - Width: `w-full max-w-[393px] sm:max-w-[380px]`
  - Height: `max-h-[85vh] sm:max-h-[88vh]`
  - Border Radius: `rounded-t-[32px] sm:rounded-[32px]`
  - Border: `border-t-4 sm:border-4 border-[#FCE7F3]`
  - Shadow: `shadow-[0_-8px_24px_rgba(30,27,75,0.3)] sm:shadow-[0_16px_32px_rgba(30,27,75,0.5)]`
  - Animation: `animate-pop`

---

## 2. Component Elements & UX Details

### 2.1 Drag Handle Pill (Mobile Indication)
- Top drag pill bar: `w-12 h-1.5 bg-[#DDD6FE] rounded-full mx-auto my-2 shrink-0`

### 2.2 Header
- Layout: `px-5 pt-3 pb-3 flex items-center justify-between border-b border-[#F3E8FF]`
- Left: `BookIconCircle` (36x36px `#FCE7F3` circle with `BookHeart` icon `#8B5CF6`), Title "SỔ THỰC ĐƠN CẶP ĐÔI" (`Bricolage Grotesque` ExtraBold 18px), Subtitle `"{{ activeFoods.length }} món đang hoạt động"`.
- Right: 36x36px circular close button `X` with `#DDD6FE` 1.5px border.

### 2.3 Add Custom Food Form
- Container: `mx-4 p-4 bg-white rounded-[24px] border-2 border-[#FCE7F3] shadow-[0_4px_8px_rgba(30,27,75,0.04)] flex flex-col gap-3 shrink-0`
- Input field: `h-[44px]` touch target, `#DDD6FE` 1.5px border, 16px radius, placeholder "Tên món / Quán ruột...".
- Add button: `w-[90px] h-[44px] bg-[#EC4899] border-2 border-white rounded-[16px]` text "Thêm ✨".
- Category & Rarity Selects: `h-[38px] bg-white rounded-[12px] border-[1.5px] border-[#DDD6FE]`.

### 2.4 Scrollable Dish List
- Container: `flex-1 overflow-y-auto no-scrollbar touch-pan-y flex flex-col gap-2 px-4`
- Dish Item Row: `p-3 bg-white rounded-[20px] border-[1.5px] border-[#FCE7F3] flex items-center justify-between gap-3 shadow-xs`
- Thumbnail: 44x44px `#FFFBEB` background, 12px radius, emoji text.
- Title & Details: Dish name, Rarity badge (`SSR`/`SR`/`R`), price level.
- Actions: Delete icon for custom items + Active toggle switch (`#EC4899` pink active fill).

---

## 3. Spec Self-Review Checklist

- [x] **Placeholder Scan**: No TODOs or TBDs. All classes and properties defined.
- [x] **Internal Consistency**: Matches Home & Modal design language (Sora + Bricolage fonts, `#8B5CF6`, `#FCE7F3`, `#EC4899`).
- [x] **Scope Check**: Focused on responsive UX for `MenuDrawer.vue`.
- [x] **Ambiguity Check**: Clear mobile (<640px) vs desktop (≥640px) layout classes.
