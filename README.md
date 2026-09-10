# 🍱 Gacha Food - Hôm Nay Ăn Gì? ❤️

> **Cứu tinh cho câu nói kinh điển của các nàng:** *"Em ăn gì cũng được nhưng chọn món nào cũng chê!"*

Một ứng dụng web Gacha đồ ăn ngộ nghĩnh, đáng yêu dành cho các cặp đôi trong những buổi hẹn hò. Ứng dụng được xây dựng hoàn toàn phía client bằng **Vite + Vue 3 (Composition API) + Tailwind CSS**, tối ưu 100% **Mobile-First** cho mọi màn hình smartphone (kể cả iPhone SE màn hình nhỏ), không cần backend server.

---

## ✨ Tính Năng Nổi Bật

- 🎰 **Máy Quay Trứng Gashapon Kawaii**: Lồng kính vòm trong suốt chứa các quả bóng pastel rung lắc sinh động, núm vặn 3D tương tác chân thực.
- ⚡ **Tự Động Mở Món Liền Mạch**: Khi vặn núm, quả bóng rơi xuống khay và tự động bung vỏ trứng + bắn pháo hoa giấy confetti (`canvas-confetti`) để mở món ăn ngay lập tức!
- 🌟 **Hệ Thống Phẩm Cấp Đồ Ăn**:
  - 🌟 **SSR (Huyền thoại)**: Lẩu Haidilao, Buffet nướng Hàn Quốc, Bít tết Wagyu, Sashimi cá hồi, Cua sốt cajun...
  - 💖 **SR (Gắn kết thơm ngon)**: Bún đậu mắm tôm, Pizza phô mai, Gà rán sốt cay, Lẩu gà lá é, Ốc đêm...
  - 🍀 **R (Bình dị ấm lòng)**: Phở bò tái lăn, Bún bò Huế, Cơm tấm sườn bì chả, Mì cay 7 cấp độ, Bánh mì chảo...
  - 🧋 **Tráng miệng / Ăn vặt**: Trà sữa trân châu, Kem bơ Đà Lạt, Chè khúc bạch, Bingsu xoài...
- 💔 **Luật Lật Kèo & Hình Phạt Tình Yêu**:
  - Cặp đôi có **3 Trái Tim** $(\heartsuit\heartsuit\heartsuit)$ tương ứng 3 lần từ chối món.
  - Hết 3 tim sẽ bị khóa nút đổi món và máy tự động bốc **1 Thẻ Hình Phạt Tình Yêu** ngẫu nhiên (Thơm má 1 cái thật kêu, Khao ly trà sữa full topping, Đút 3 miếng đầu tiên, Khen 3 câu ngọt ngào, Rửa bát hôm nay...).
- 📜 **Biên Lai Hẹn Hò & Xuất Ảnh PNG**:
  - Hóa đơn tình yêu vintage cafe Hàn Quốc có thể sửa tên 2 bạn, ngày giờ thực tế và con dấu đỏ **[ ĐÃ CHỐT KÈO • MIỄN ĐỔI TRẢ ]**.
  - Nút **"Tải ảnh biên lai về máy"** (`html-to-image`) xuất file PNG sắc nét gửi Zalo/Messenger/Instagram.
  - Nút **"Sao chép tin nhắn chốt đơn"** tiện lợi.
- 📖 **Sổ Thực Đơn (Bottom Sheet) & Bộ Lọc Nhanh**:
  - Quản lý hơn 30 món ăn, bật/tắt món hôm nay không muốn ăn, tự thêm món ruột của hai đứa (lưu tự động vào `localStorage`).
  - Bộ lọc nhanh theo thể loại món và theo ngân sách (*Tùy duyên | Đầu tháng | Cuối tháng*).
- 🔊 **Âm Thanh Offline & Rung Haptic**:
  - Sử dụng **Web Audio API** tạo hiệu ứng âm thanh lách cách, tiếng bóng rơi, tiếng pop tách trứng và nhạc vinh danh fanfare mà không cần tải file mp3 ngoài.

---

## 🛠️ Công Nghệ Sử Dụng

- **Vite 6** + **Vue 3** (Composition API, `<script setup>`)
- **Tailwind CSS 3** (Giao diện bo tròn pastel, hiệu ứng chuyển động mượt mà)
- **canvas-confetti** (Hiệu ứng pháo hoa giấy)
- **html-to-image** (Kết xuất biên lai thành ảnh PNG)
- **Web Audio API** (Âm thanh synthesizer offline)
- **Vitest** + **@vue/test-utils** + **happy-dom** (34/34 tests pass 100%)

---

## 🚀 Cài Đặt & Chạy Dự Án

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Chạy môi trường phát triển:
```bash
npm run dev
```
Mở trình duyệt tại `http://localhost:5173`. Bạn có thể bật chế độ Device Emulation (`F12`) để trải nghiệm giao diện chuẩn điện thoại di động.

### 3. Chạy kiểm thử tự động:
```bash
npm run test
```

### 4. Build sản xuất:
```bash
npm run build
```

---

*Chúc hai bạn có những buổi hẹn hò thật vui vẻ, ngon miệng và không còn phải đau đầu chọn món nhé! ❤️*
