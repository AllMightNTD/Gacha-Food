# Thiết Kế Chi Tiết: Web Gacha Đồ Ăn Cho Cặp Đôi (Food Gacha Couple)

- **Ngày tạo:** 2026-09-10
- **Công nghệ:** Vite + Vue 3 (Composition API) + Tailwind CSS + Canvas Confetti + HTML-to-Image + Web Audio API
- **Mục tiêu:** Giải quyết tình huống kinh điển *"Hôm nay ăn gì?"* / *"Em ăn gì cũng được nhưng chọn món nào cũng chê"* của các cặp đôi trong các buổi hẹn hò thông qua trải nghiệm máy quay Gashapon ngộ nghĩnh, dễ thương, tối ưu 100% trên mọi kích cỡ màn hình điện thoại di động.

---

## 1. Mục Tiêu & Trải Nghiệm Người Dùng (UX/UI Vision)

### 1.1 Vấn đề & Giải pháp
* **Vấn đề:** Các cặp đôi thường tốn 30-60 phút tranh cãi khi chọn quán ăn tối. Câu cửa miệng "Em ăn gì cũng được" nhưng khi gợi ý món nào cũng bị từ chối.
* **Giải pháp:** Ứng dụng biến việc chọn đồ ăn thành một mini-game ngộ nghĩnh:
  * Máy quay trứng Gashapon sinh động, chân thực.
  * Phân loại món ăn theo phẩm cấp may mắn: SSR (Huyền thoại/Sang chảnh), SR (Gắn kết thơm ngon), R (Bình dị ấm lòng).
  * Quyền "Lật kèo / Veto" có giới hạn (3 lượt ❤️). Nếu lãng phí cả 3 lượt thì bị phạt hình phạt tình yêu ngộ nghĩnh và khóa món.
  * "Biên lai hẹn hò / Hợp đồng chốt kèo" dễ thương, có thể xuất ảnh PNG lưu về máy để gửi Zalo/Messenger nhằm "chốt hạ, cấm dỗi".
  * Không cần backend, dữ liệu tùy chỉnh lưu tự động trong `localStorage`.

### 1.2 Thiết kế Giao diện Mobile-First (Responsive Design)
* **Kích thước tối ưu:** Từ 360px (iPhone SE, Android màn nhỏ) đến 430px+ (iPhone Pro Max, Samsung Galaxy Ultra) và tự co giãn hoàn hảo trên tablet/desktop.
* **Màu sắc & Phong cách:**
  * Pastel ngọt ngào: Hồng kẹo (`#FFF1F2`, `#FDA4AF`), Vàng bơ (`#FEF08A`, `#FDE047`), Kem sữa (`#FFFBEB`), Tím mộng mơ (`#F3E8FF`).
  * Bo góc siêu mềm (`rounded-3xl`), đổ bóng 3D dịu mắt (`shadow-lg`), nút bấm nảy như thạch jelly (`active:scale-95 transition-all`).
  * Tương thích với thanh điều hướng và tai thỏ / Dynamic Island của điện thoại (`safe-area-inset`).

---

## 2. Kiến Trúc Hệ Thống & Thành Phần Ứng Dụng

### 2.1 Cấu trúc Thư mục
```
gacha-food/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.js
    ├── App.vue
    ├── assets/
    │   └── styles/
    │       └── main.css
    ├── data/
    │   ├── defaultFoods.js      # Danh sách ~35 món ăn Việt Nam chuẩn bị sẵn
    │   ├── punishmentList.js    # Danh sách hình phạt tình yêu hài hước
    │   └── quotes.js            # Khẩu hiệu & lời khuyên tình yêu cute
    ├── composables/
    │   ├── useGacha.js          # Logic quay, tỷ lệ phẩm cấp, tính toán kết quả
    │   ├── useVeto.js           # Logic 3 trái tim lật kèo & kích hoạt hình phạt
    │   ├── useFoodStore.js      # Quản lý món ăn, thêm/xóa/lọc & localStorage
    │   └── useAudio.js          # Web Audio API tạo âm thanh cute không cần file mp3
    └── components/
        ├── GashaponMachine.vue  # Lồng kính, bóng lắc lư, núm vặn & khay đón bóng
        ├── CapsuleModal.vue     # Hoạt ảnh tách vỏ trứng & pháo hoa bùng nổ
        ├── ResultCard.vue       # Thẻ hiển thị món ăn, phẩm cấp, nút Chốt / Đổi
        ├── PunishmentCard.vue   # Thẻ hình phạt khi hết 3 lần từ chối
        ├── ReceiptModal.vue     # Biên lai hẹn hò phong cách vintage cafe xuất ảnh PNG
        ├── MenuDrawer.vue       # Bảng trượt quản lý thực đơn (thêm/sửa/tắt món)
        ├── FilterBar.vue        # Thanh lọc nhanh thể loại món & mức ví tiền
        └── TopBar.vue           # Header với nút Âm thanh, Thực đơn & Trợ giúp
```

---

## 3. Chi Tiết Các Tính Năng Cốt Lõi

### 3.1 Máy Quay Trứng Gashapon (GashaponMachine.vue)
* **Lồng kính trong suốt:** Chứa 10 quả bóng viên nang nhiều màu (Hồng, Xanh ngọc, Vàng, Cam, Tím).
* **Hiệu ứng lắc bóng:** Khi kích hoạt quay, các quả bóng bên trong rung lắc nảy lên nảy xuống sống động nhờ CSS Keyframe Animation.
* **Núm vặn xúc giác (Interactive Crank/Knob):**
  * Núm vặn hình tròn ở giữa thân máy với rãnh bám dễ thương.
  * Hỗ trợ chạm (Tap) để tự xoay 360 độ hoặc vuốt xoay trên màn hình cảm ứng.
  * Khi xoay phát ra âm thanh cạch cạch rộn rã và kích hoạt bóng rơi.
* **Ống xả & Khay hứng bóng:**
  * Một quả bóng rơi từ từ theo đường ống xuống khay hứng phía dưới, nảy 2 nhịp.
  * Bóng phát sáng nhấp nháy kèm huy hiệu: *"Chạm vào trứng để mở quà!"*.

### 3.2 Hiệu Ứng Mở Trứng & Phẩm Cấp (CapsuleModal.vue)
* Khi bấm vào quả trứng ở khay, quả trứng phóng to giữa màn hình:
  * Trứng rung lắc 3 nhịp: *Cạch... Cạch... Cạch...*
  * Vỏ trứng nứt đôi theo hình ziczac và tách ra hai bên.
  * Bùng nổ chùm pháo hoa giấy nhiều màu (`canvas-confetti`).
* **Hệ thống phẩm cấp món ăn (Rarity):**
  * 🌟 **SSR (Huyền thoại - 15%):** Ánh sáng vàng kim, viền kim tuyến, nhạc chiến thắng ngân vang (Lẩu Haidilao, Buffet nướng King BBQ, Steak bò Wagyu lãng mạn, Cua sốt trứng muối, Sashimi cá hồi...).
  * 💖 **SR (Gắn kết đậm đà - 35%):** Ánh sáng tím hồng (Bún đậu mắm tôm, Pizza ngập phô mai, Gà rán giòn sốt cay, Lẩu gà lá é, Đồ nướng ngói Đà Lạt...).
  * 🍀 **R (Bình dị ấm lòng - 50%):** Ánh sáng xanh mint tươi tắn (Phở bò tái lăn, Bún bò Huế giò heo, Cơm tấm sườn bì chả, Mì cay 7 cấp độ, Bánh mì chảo pate...).

### 3.3 Cơ Chế "Quyền Lật Kèo" & Hình Phạt Tình Yêu (useVeto.js)
* Màn hình có thanh trạng thái hiển thị **3 Trái Tim** $(\heartsuit\heartsuit\heartsuit)$.
* Cặp đôi có 2 nút lựa chọn:
  * 💚 **"Chốt Món Này Luôn!"** $\rightarrow$ Mở Biên lai hẹn hò.
  * 💔 **"Không Chịu! Đổi Món Khác"**:
    * Mỗi lần bấm, 1 trái tim vỡ tan $(\heartsuit \rightarrow \heartsuit\heartsuit \rightarrow \heartsuit \rightarrow \text{0})$.
    * Máy phát âm thanh "Ouch!" tiếc nuối và quay lại lượt mới.
* **Khi hết 3 lượt (0 trái tim còn lại):**
  * Nút "Đổi món" bị khóa lại hoàn toàn (Disabled) kèm icon ổ khóa 🔒.
  * Còi cảnh báo vui nhộn: *"Hết lượt lật kèo rồi! Vũ trụ ra lệnh hai bạn phải ăn món này!"*.
  * Tự động rút **1 Thẻ Hình Phạt Tình Yêu** ngẫu nhiên:
    * 💋 *Phạt thơm má người yêu 1 cái thật to và rõ tiếng!*
    * 🧋 *Phạt phải bao người yêu 1 cốc trà sữa full topping!*
    * 🥄 *Phải đút 3 miếng đầu tiên cho người yêu ăn!*
    * 🥰 *Phải khen người yêu 3 câu chân thành không được trùng lặp!*
    * 🧼 *Hôm nay bạn nam/nữ phải rửa bát / dọn dẹp sau buổi hẹn!*

### 3.4 Biên Lai Hẹn Hò Chốt Kèo & Xuất Ảnh (ReceiptModal.vue)
* Mẫu biên lai thiết kế dạng phiếu tính tiền vintage cafe Hàn Quốc:
  * **Header:** Tiệm Gacha Hẹn Hò • Số hóa đơn may mắn ngẫu nhiên (`#LOVE-xxxx`).
  * **Thời gian:** Ngày giờ thực tế hiện tại.
  * **Tên 2 bạn:** Cho phép gõ nhanh tên để cá nhân hóa (vd: "Anh Đạt" & "Em Hằng").
  * **Món đã chốt:** Tên món, phân loại, phẩm cấp, đánh giá mức độ ngon miệng 5 sao.
  * **Hình phạt đi kèm:** Ghi nhận hình phạt nếu đã lật kèo hết 3 lần.
  * **Điều khoản cam kết:** *"Hai bên đồng thuận cùng đi ăn trong hòa bình, không mặt sưng mày sỉa, không nói câu 'sao cũng được', vi phạm sẽ bị phạt x2 hình phạt!"*.
  * **Dấu mộc đỏ:** Đã đóng dấu "CHỐT KÈO • MIỄN ĐỔI TRẢ".
* **Chức năng xuất ảnh & Chia sẻ:**
  * 📸 **Nút "Tải ảnh biên lai về máy":** Sử dụng `html-to-image` xuất thẻ biên lai thành file `.png` sắc nét, tự động tải về thư viện ảnh để gửi Messenger/Zalo/Instagram Story.
  * 📋 **Nút "Copy tin nhắn chốt đơn":** Tạo sẵn đoạn text ngộ nghĩnh copy vào clipboard:
    > *"Thông báo chốt đơn ăn tối hôm nay: Món [Tên món] (Phẩm cấp [SSR/SR/R]). Hai đứa đã ký cam kết không dỗi, không lật kèo! Mau chuẩn bị đồ đi ăn thuiii ❤️"*
  * 🔄 **Nút "Hẹn hò bữa tiếp theo":** Đặt lại trạng thái để chơi lại.

### 3.5 Quản Lý Thực Đơn & Lưu Trữ Cục Bộ (MenuDrawer.vue & useFoodStore.js)
* Biểu tượng cuốn sổ thực đơn 📖 trên thanh công cụ:
  * Mở Bottom Sheet trượt mượt mà từ dưới lên.
  * Hiển thị danh sách các món ăn kèm thẻ màu theo phẩm cấp.
  * **Công tắc bật/tắt (Toggle Switch):** Nếu hôm nay không muốn ăn món nào (ví dụ vừa ăn hôm qua), gạt tắt để máy không quay vào món đó.
  * **Thêm món ruột của cặp đôi:** Form nhập tên món, chọn phẩm cấp (SSR/SR/R), chọn loại món (Đồ nước, Đồ nướng, Cơm, Đồ cay, Ăn vặt).
  * **Xóa món:** Cho phép xóa các món tự tạo.
  * **Khôi phục mặc định:** Nút reset về bộ ~35 món gốc bất kỳ lúc nào.
  * Toàn bộ thay đổi lưu tự động vào `localStorage` với key `gacha_food_couple_data`.

### 3.6 Bộ Lọc Nhanh (FilterBar.vue)
* Dải thẻ cuộn ngang (Horizontal scroll pills) ngay trên đầu máy Gashapon:
  * **Thể loại:** Tất cả | 🍜 Đồ nước (Lẩu/Bún/Phở) | 🥩 Nướng & Chiên | 🍚 Cơm & Chắc bụng | 🍢 Ăn vặt & Trà sữa.
  * **Ví tiền:** 🎲 Tùy duyên | 👑 Đầu tháng (Sang chảnh) | 🪙 Cuối tháng (Bình dân).

### 3.7 Hệ Thống Âm Thanh (Web Audio API Synthesizer)
* Thiết kế hoàn toàn bằng code Web Audio API oscillator/gain node (không cần tải file âm thanh mp3 nặng nề, không sợ 404):
  * `playCrankSound()`: Tiếng bánh răng cơ học lách cách khi vặn núm.
  * `playDropSound()`: Tiếng "bộp" êm ái khi quả bóng chạm đáy khay.
  * `playOpenSound()`: Tiếng "pop" vang khi tách vỏ trứng.
  * `playFanfareSound()`: Hợp âm arpeggio tươi sáng vui vẻ khi mở ra món ăn (đặc biệt hoành tráng nếu là SSR).
  * `playVetoSound()`: Nốt trầm buồn khi bị mất trái tim lật kèo.
  * Nút công tắc âm thanh (Mute/Unmute) luôn hiển thị ở góc trên để người dùng chủ động điều khiển.

---

## 4. Kế Hoạch Kiểm Thử & Tiêu Chí Thành Công

### 4.1 Tiêu chí Responsive & Mobile UX
* [ ] Kiểm tra hiển thị chuẩn trên màn hình nhỏ 360px (Samsung Galaxy A, iPhone SE), không bị tràn ngang, không che lấp nút bấm.
* [ ] Kiểm tra hiển thị trên màn hình 390px - 430px (iPhone 14/15/16 Pro Max, Pixel 8) bố cục cân đối, lồng kính và khay bóng tỉ lệ hài hòa.
* [ ] Các nút bấm có kích thước tối thiểu 44x44px theo tiêu chuẩn touch target của Apple/Google.

### 4.2 Tiêu chí Chức Năng
* [ ] Vặn núm / bấm quay: Hoạt ảnh bóng rung lắc trong lồng kính chạy trơn tru, bóng rơi vào khay hứng đúng thời gian.
* [ ] Mở trứng: Hoạt ảnh tách vỏ và pháo hoa giấy xuất hiện mượt mà.
* [ ] Phẩm cấp: Hiển thị đúng màu sắc và huy hiệu SSR, SR, R.
* [ ] Luật lật kèo: Giảm đúng số trái tim sau mỗi lần từ chối. Hết 3 tim thì khóa nút đổi món và hiện thẻ hình phạt.
* [ ] Biên lai xuất ảnh: Nút tải ảnh tạo ra file `.png` rõ đẹp, đầy đủ thông tin tên cặp đôi, món ăn và dấu mộc.
* [ ] Quản lý món: Thêm món mới, bật tắt món, xóa món thành công và lưu chuẩn vào `localStorage`.
* [ ] Âm thanh: Phát đúng âm thanh tương tác và có thể tắt tiếng khi cần.
