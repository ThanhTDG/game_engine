## Nguyên lý hoạt động

Game engine này hoạt động dựa trên mô hình **Entity-Component** kết hợp với **Scene Graph** và một vòng lặp game (game loop) liên tục. Các thành phần chính phối hợp với nhau như sau:

1. **Director**

   - Là singleton trung tâm điều phối mọi hoạt động của engine.
   - Khởi tạo và quản lý `Renderer` (vẽ lên canvas), `InputManager` (xử lý input), và `GameLoop` (vòng lặp game).
   - Quản lý scene hiện tại, chuyển scene, khởi động và dừng game.

2. **GameLoop**

   - Sử dụng `requestAnimationFrame` để tạo vòng lặp liên tục.
   - Ở mỗi frame, gọi callback `tick` để cập nhật logic (`update`) và vẽ lại màn hình (`render`).

3. **Scene**

   - Đại diện cho một màn chơi hoặc trạng thái của game.
   - Quản lý danh sách các `Node` gốc (root nodes).
   - Có các phương thức vòng đời như `onLoad`, `update`, `render`, `destroy`.

4. **Node**

   - Đại diện cho một thực thể (entity) trong game.
   - Có thể chứa nhiều `Component` để bổ sung hành vi (ví dụ: `Sprite`, `Button`).
   - Có thể có các node con, tạo thành một cây scene graph.
   - Quản lý vị trí, xoay, tỷ lệ, trạng thái hoạt động.

5. **Component**

   - Là các thành phần chức năng có thể gắn vào node.
   - Định nghĩa các phương thức vòng đời như `onLoad`, `onStart`, `onUpdate`, `onRender`, `onDestroy`.
   - Ví dụ: `Sprite` để hiển thị hình ảnh, `Button` để tạo nút bấm.

6. **Renderer**

   - Quản lý canvas và context 2D.
   - Cung cấp các phương thức vẽ cơ bản như `clear`, `drawRectangle`, `drawImage`.

7. **InputManager**
   - Theo dõi trạng thái bàn phím và chuột.
   - Cho phép các component truy vấn trạng thái input để xử lý tương tác.

---

## Cơ cấu thư mục

```
engine/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                # Export các thành phần chính của engine
    ├── assets/
    │   └── no-image.png        # Hình ảnh mặc định
    ├── components/
    │   ├── button.component.ts # Component nút bấm
    │   └── sprite.component.ts # Component hiển thị hình ảnh
    └── core/
        ├── component.ts        # Lớp cơ sở cho các component
        ├── director.ts         # Quản lý vòng lặp, scene, renderer
        ├── game-loop.ts        # Vòng lặp game
        ├── input-manager.ts    # Quản lý input
        ├── node.ts             # Đối tượng node (entity)
        ├── renderer.ts         # Quản lý canvas và vẽ
        └── scene.ts            # Quản lý scene và các node
```

---

## Tóm tắt luồng hoạt động

1. **Khởi tạo:**

   - `Director` được khởi tạo, thiết lập canvas, input, và scene đầu tiên.

2. **Vòng lặp game:**

   - `GameLoop` liên tục gọi `tick`.
   - Trong mỗi tick:  
     a. Gọi `update` trên scene → node → component.  
     b. Gọi `render` trên scene → node → component.

3. **Tương tác:**

   - `InputManager` cập nhật trạng thái input.
   - Các component (ví dụ: `Button`) kiểm tra input để xử lý sự kiện.

4. **Quản lý đối tượng:**
   - Các node và component có thể được thêm, xóa, hoặc cập nhật động trong quá trình chạy game.

---

#### **Thư mục game (Dự án game)**

Chứa mã nguồn của một game cụ thể sử dụng engine.

```
game/
├── index.html          # Tệp HTML chính để chạy game
├── styles.css          # Định dạng giao diện game
├── package.json        # Metadata và dependencies của game
├── tsconfig.json       # Cấu hình TypeScript cho game
└── src/                # Mã nguồn chính của game
    ├── config.ts       # Cấu hình chung cho game
    ├── game-scene.ts   # Định nghĩa scene chính của game
    ├── main.ts         # Điểm vào của game, khởi tạo Director và Scene
    ├── utils.ts        # Các hàm tiện ích
    ├── assets/         # Tài nguyên của game
    │   └── no-image.png
    └── player/         # Logic liên quan đến Player
        ├── player.controller.ts # Quản lý Player và các nút điều khiển
        └── player.ts            # Định nghĩa lớp Player
```

### **3. Cách chạy game**

#### **Bước 1: Cài đặt dependencies**

- Chạy lệnh sau trong thư mục game để cài đặt các dependencies:
  ```bash
  npm install
  ```

#### **Bước 2: Chạy game trong quá trình phát triển**

- Sử dụng Parcel để chạy game:
  ```bash
  npm start
  ```
- Mở trình duyệt và truy cập `http://localhost:1234` để xem game.

#### **Bước 3: Build game để triển khai**

- Build game để tạo phiên bản tối ưu hóa:
  ```bash
  npm run build
  ```
- Kết quả sẽ được lưu trong thư mục `dist`.

#### **Bước 4: Tương tác với game**

- Sử dụng các nút điều khiển hoặc nhập URL hình ảnh để thay đổi hình ảnh của player.
