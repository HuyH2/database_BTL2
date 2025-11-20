
# BTL2 – Client/Server

Một monorepo cho ứng dụng client/server nhỏ dùng trong đồ án/BTL.

Tổng quan
- `client/` — Frontend: React + Vite
- `server/` — Backend: Node.js + Express

Hai phần cần chú ý (hãy đọc trước khi chạy)

> **‼️ Chú ý 1 — Biến môi trường**
>
> - Frontend (Vite) dùng biến bắt đầu bằng `VITE_` (ví dụ `VITE_API_URL`).
> - Backend thường dùng `PORT`, `MONGODB_URI` (hoặc chuỗi kết nối DB khác). Tạo `server/.env` và `client/.env`/`client/.env.local` khi cần.
>
> **‼️ Chú ý 2 — CORS & Ports**
>
> - Frontend (mặc định Vite) chạy trên port khác so với backend -> server phải bật CORS hoặc cấu hình proxy trong `client/vite.config.js`.

Yêu cầu
- Node.js (khuyến nghị >=16)
- npm hoặc yarn
- (Nếu backend dùng database) Một instance MongoDB / PostgreSQL / MySQL — tùy cấu hình trong `server/config`

Cấu trúc thư mục

- client/
  - src/
    - api/ — helper gọi API
    - components/ — các component React (SearchBar, Table...)
    - pages/ — các page (ItemsList, ItemDetail, ItemForm)
  - index.html, vite.config.js, package.json

- server/
  - src/
    - controllers/ — xử lý request
    - routes/ — định nghĩa routes (ví dụ: `items.routes.js`)
    - services/ — logic nghiệp vụ
    - config/ — cấu hình DB (ví dụ: `db.js`)
    - app.js, server.js
  - package.json

Chạy dự án (local) — các bước quan trọng

1) Server

 - Tạo file biến môi trường (ví dụ `server/.env`) nếu cần. Ví dụ tối thiểu:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-db-name
```

 - Cài và chạy:

```bash
cd server
npm install
npm run dev
```

Ghi chú:
- `npm run dev` thường dùng nodemon để phát triển; kiểm tra `server/package.json` để biết script chính xác.

2) Client

 - Tạo file môi trường cho Vite nếu cần: `client/.env` hoặc `client/.env.local` với biến bắt đầu bằng `VITE_`:

```env
VITE_API_URL=http://localhost:5000
```

 - Cài và chạy:

```bash
cd client
npm install
npm run dev
```

Ghi chú:
- Nếu frontend không gọi được API vì khác port, bật CORS ở server hoặc cấu hình proxy trong `client/vite.config.js`.

API (ví dụ)

Endpoint mẫu (đường dẫn có thể khác trong code):

- GET /api/items — Lấy danh sách items
- GET /api/items/:id — Lấy chi tiết item
- POST /api/items — Tạo item mới (body: JSON)
- PUT /api/items/:id — Cập nhật item
- DELETE /api/items/:id — Xóa item

Kiểm tra nhanh (smoke test)

1) Mở terminal: chạy server

```bash
cd server
npm install
npm run dev
```

2) Mở terminal khác: chạy client

```bash
cd client
npm install
npm run dev
```

3) Mở trình duyệt: vào địa chỉ Vite dev server (mặc định `http://localhost:5173`) và thử các chức năng.

Gợi ý thêm
- Thêm file `server/.env.example` và `client/.env.example` vào repo để tiện cho người khác.
- Kiểm tra `client/package.json` và `server/package.json` để đảm bảo các scripts (`dev`, `start`) tồn tại.

Contributing
- Mở PR vào branch `main` (hoặc theo quy ước branch của nhóm).
- Viết mô tả thay đổi rõ ràng và cập nhật bất kỳ document nào liên quan.

License
- Nếu chưa có, thêm file `LICENSE` hoặc ghi rõ bản quyền. Mặc định có thể dùng MIT.

Liên hệ
- Nếu cần trợ giúp, mở issue hoặc gửi tin nhắn cho tác giả/nhóm.

---

Tài liệu này là hướng dẫn khởi động nhanh; để biết chi tiết API hoặc cấu hình DB, xem các file trong `server/src` (ví dụ `routes` và `config/db.js`) và mã nguồn frontend trong `client/src`.
