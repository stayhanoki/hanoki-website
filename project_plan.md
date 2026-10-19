# Homestay Booking Website - Việt Nam

## 1. Project Description

Website đặt phòng homestay lưu trú ngắn ngày tại Việt Nam với thương hiệu "HANOKI" (dựa trên thiết kế hiện có). Sản phẩm cung cấp trải nghiệm tìm kiếm và đặt phòng đơn giản, giao diện ấm áp, gần gũi thiên nhiên.

**Đối tượng người dùng:**
- Khách du lịch trong nước và quốc tế tìm homestay tại Việt Nam
- Chủ nhà muốn quản lý đặt phòng

**Giá trị cốt lõi:**
- Tìm kiếm phòng dễ dàng với bộ lọc đa dạng
- Đặt phòng nhanh chóng không cần đăng nhập
- Thanh toán linh hoạt (Stripe + chuyển khoản)
- Giao diện thân thiện, thiết kế tối giản ấm áp

## 2. Page Structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Trang chủ - hero, giới thiệu, danh sách homestay nổi bật |
| `/rooms` | Rooms List | Danh sách phòng với bộ lọc |
| `/room/:id` | Room Detail | Chi tiết phòng, đặt phòng |
| `/booking` | Booking | Trang đặt phòng, form thông tin |
| `/payment` | Payment | Thanh toán Stripe/chuyển khoản |
| `/booking-success` | Booking Success | Xác nhận đặt phòng thành công |
| `/about` | About | Giới thiệu về HANOKI |
| `/contact` | Contact | Liên hệ, hỗ trợ |
| `/host` | Host Dashboard | Quản lý đặt phòng cho chủ nhà (đơn giản) |

## 3. Core Features

- [ ] Trang chủ với hero section, giới thiệu homestay nổi bật
- [ ] Danh sách phòng với bộ lọc (địa điểm, giá, tiện nghi, số khách)
- [ ] Trang chi tiết phòng với gallery ảnh, mô tả, tiện ích
- [ ] Form đặt phòng (không cần đăng nhập - email/SĐT)
- [ ] Thanh toán Stripe (thẻ quốc tế)
- [ ] Thanh toán chuyển khoản ngân hàng
- [ ] Trang xác nhận đặt phòng thành công
- [ ] Quản lý đơn đặt phòng cho chủ nhà (đơn giản)
- [ ] SEO optimized

## 4. Data Model Design

### Table: rooms
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| name | text | Tên phòng/homestay |
| location | text | Địa điểm (Hà Nội, Sapa, Tam Đảo...) |
| price_per_night | integer | Giá/đêm (VND) |
| description | text | Mô tả chi tiết |
| images | text[] | Danh sách ảnh |
| amenities | text[] | Tiện nghi (wifi, bếp, máy giặt...) |
| max_guests | integer | Số khách tối đa |
| rating | numeric | Đánh giá (1-5) |
| reviews_count | integer | Số lượt đánh giá |
| available | boolean | Còn trống hay không |
| created_at | timestamp | Ngày tạo |

### Table: bookings
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| room_id | uuid | FK đến rooms |
| guest_name | text | Tên khách |
| guest_email | text | Email khách |
| guest_phone | text | SĐT khách |
| check_in | date | Ngày nhận phòng |
| check_out | date | Ngày trả phòng |
| guests_count | integer | Số khách |
| total_price | integer | Tổng tiền |
| payment_method | text | stripe / bank_transfer |
| payment_status | text | pending / paid / cancelled |
| status | text | confirmed / pending / cancelled |
| notes | text | Ghi chú |
| created_at | timestamp | Ngày đặt |

## 5. Backend / Third-party Integration Plan

- **Supabase (Readdy Cloud):** Lưu trữ dữ liệu phòng và đơn đặt, quản lý qua dashboard
- **Stripe:** Thanh toán thẻ quốc tế (tích hợp qua Supabase Edge Functions)
- **Form submission:** Lưu thông tin đặt phòng qua form API nếu chưa kết nối Supabase

## 6. Development Phase Plan

### Phase 1: Trang chủ + Thiết kế giao diện
- **Goal:** Xây dựng trang chủ đẹp mắt với hero section, giới thiệu homestay nổi bật, footer
- **Deliverable:** Trang chủ hoàn chỉnh, đúng tone màu ấm áp như thiết kế TOKI

### Phase 2: Danh sách phòng + Chi tiết phòng
- **Goal:** Tạo trang tìm kiếm phòng với bộ lọc, và trang chi tiết từng phòng
- **Deliverable:** Trang `/rooms` và `/room/:id` với đầy đủ thông tin

### Phase 3: Đặt phòng + Thanh toán
- **Goal:** Form đặt phòng và tích hợp thanh toán Stripe + chuyển khoản
- **Deliverable:** Trang `/booking`, `/payment`, `/booking-success`

### Phase 4: Quản lý đặt phòng cho chủ nhà
- **Goal:** Trang đơn giản để chủ nhà xem danh sách đơn đặt
- **Deliverable:** Trang `/host` với bảng đơn đặt

### Phase 5: Tối ưu + Hoàn thiện
- **Goal:** SEO, responsive, animation, kiểm tra tổng thể
- **Deliverable:** Website hoàn chỉnh, tối ưu hiệu suất