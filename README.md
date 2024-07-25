# SSR - CSR

- Server side rendering (SSR) : render mã HTML từ server

* Tốt cho sale, dễ dàng tìm kiếm, truy cập nhanh ở lần đầu tiên

- Client side rendering (CSR) : render mã HTML từ client

* Không bị reload trang

# Install express

- npm install --save express

# Install nodemon

- Install nodemon:

* npm i nodemon --save-dev
* add key-value: "start": "nodemon index.js" vào scripts trong package.json
* npm start

# Install morgan

# Template engine (handlebars)

# Static sass

# Prettier

- npm i prettier lint-staged husky --save-dev

# Boostrap

# Form default behavior

- Tất cả nội dung trong thẻ form có name sẽ được đính kèm vào khi submit tạo thành query parameter
- Khi đã submit form với phương thức là post thì khi reload nó vẫn là post
- form tag
- method: POST, GET
- action: /news: re-direct thẻ form sang /news

# Model

- install mongoose
- install mongoose slug generator
- install method override

# Soft delete

- Chức năng không xoá thật, chỉ xoá trên UI nhưng không xoá dưới DB
- Dùng khi:
  - Cần đối soát
  - Cần truy vết
  - Liên quan tới đơn hàng, tiền tệ, dữ liệu nhạy cảm
- Nghiệp vụ:
  - Delete (soft)
  - Restore
  - Force delete

# Requirement

- Tạo thẻ chọn tất cả bên thùng rác
- Fix lại thứ tự cho mỗi user
