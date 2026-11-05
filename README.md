<div align="center">

# Tử Vi Đẩu Số · Công Cụ An Sao Lập Lá Số Mã Nguồn Mở

### Thuật toán là trí tuệ cổ truyền chung, không nên bị giam cầm trong những bức tường đóng kín

[![CI](https://github.com/Renhuai123/ziwei-doushu/actions/workflows/ci.yml/badge.svg)](https://github.com/Renhuai123/ziwei-doushu/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](./LICENSE)
[![Dataset: CC BY 4.0](https://img.shields.io/badge/dataset-CC%20BY%204.0-green.svg)](./DATASET-LICENSE)

[Tiếng Việt](./README.md) · [English](./README.en.md)

</div>

**I. Triết lý dự án**: Tử Vi Đẩu Số là kho tàng vô giá của thuật số cổ truyền phương Đông, được thầy Nghê Hải Hạ hệ thống hóa bài bản và chính tông trong bộ tác phẩm *Thiên Kỷ*. Dự án này được tạo ra nhằm ứng dụng công nghệ hiện đại giúp mọi người tiếp cận, học tập và nghiên cứu tinh hoa học thuật cổ xưa một cách chuẩn xác, minh bạch.

Chúng tôi mã nguồn mở toàn bộ thuật toán lập lá số và cơ sở dữ liệu vì tin rằng: **Thuật toán là trí tuệ cổ truyền chung, không nên bị biến thành hàng rào độc quyền**. Giá trị cốt lõi đích thực nằm ở chiều sâu luận giải, độ tinh tế của trải nghiệm người dùng và quá trình tích lũy nghiên cứu lâu dài.

**II. Giới thiệu tổng quan**: Hệ thống an sao lập lá số Tử Vi Đẩu Số theo hệ thống chính tông **Nghê Hải Hạ《Thiên Kỷ》**, tích hợp đầy đủ thuật toán an sao, hệ thống Tứ Hóa, cơ sở dữ liệu cách cục, dữ liệu cổ tịch nguyên văn, cùng bộ dữ liệu luận giải mã nguồn mở đồ sộ: **Tập dữ liệu luận giải v4.0 — 675.000 lá số × 13 chiều luận giải = 8,77 triệu đoạn giải đoán, dung lượng giải nén 56,6 GB** (phát hành 15/10/2026).

| Tập dữ liệu | Số lá số | Số đoạn giải đoán | Sau khi giải nén | Phạm vi năm | Dung lượng chữ mỗi lá số |
|---|---|---|---|---|---|
| **Tập dữ liệu luận giải v4.0** | **674.976** | **8.774.688** | **56.6 GB** | **1950–2026** (chỉ tính ngày thực tế) | **~30.000 từ** |
| Tập dữ liệu mẫu v3.0 | 518.400 | 6.739.200 | 33.1 GB | 1924–1983 | ~21.000 từ |
| Mức tăng | +30% | +30% | **+71%** | +17 năm | +44% |

<sub>Dung lượng chữ v3.0 được ước tính trên mẫu 2.160 lá số, các thông số còn lại là thống kê toàn phần; cả hai phiên bản đều có đủ 13 chiều luận giải cho mỗi lá số.</sub>

Trải nghiệm trực tuyến: [ouranic.cn](https://ouranic.cn/?from=gh-readme) (mở toàn bộ an sao, luận đoán AI và lịch sử lá số).

> **Lưu ý: Về việc luận đoán Lục Thân (Người thân)**
>
> Tử Vi Đẩu Số có giới hạn nhất định trong việc xem chi tiết lục thân (cha mẹ, anh chị em, con cái). Thầy Nghê từng chỉ rõ: *"Đẩu số khi phê đoán về lục thân vốn dĩ có phần hạn chế hơn."* ([Tập 2 thượng · 00:25:27](https://www.bilibili.com/video/BV1KJsLekEfA?p=3&t=1527)). Trong các thuật số cổ, Thiết Bản Thần Số có ưu thế riêng khi khảo nghiệm lục thân ([Tập 2 thượng · 00:03:15](https://www.bilibili.com/video/BV1KJsLekEfA?p=3&t=195)); thầy Nghê lấy Tử Vi Đẩu Số làm nòng cốt vì nó kết hợp hài hòa Thiên thời, Địa lợi và Nhân sự — tạo thành hệ thống hoàn chỉnh *"Trên hiểu thiên văn, dưới tường địa lý, giữa rõ nhân sự"* ([Tập 2 thượng · 00:25:43](https://www.bilibili.com/video/BV1KJsLekEfA?p=3&t=1543)). Vì vậy, các phần luận giải liên quan đến lục thân chỉ mang tính chất tham khảo.

---

## Mục Lục

| | Chương | Tóm tắt nhanh |
|---|---|---|
| I | [Cập nhật mới nhất](#i-cập-nhật-mới-nhất) | Hiệu chỉnh 13 chiều luận đoán theo nguyên văn thầy Nghê &《Đẩu Số Toàn Thư》, phát hành Dataset v4.0 |
| II-Mới | [Tập dữ liệu luận giải 13 chiều v4.0](#ii-mới-tập-dữ-liệu-luận-giải-13-chiều-v40) | Dữ liệu luận đoán mới, 675.000 lá số, tải theo từng năm |
| II | [Tập dữ liệu mẫu 518.000 lá số v3.0](#ii-tập-dữ-liệu-mẫu-518000-lá-số-v30) | Thông số, cách tải, mục đích sử dụng, giấy phép |
| III | [Khởi động nhanh](#iii-khởi-động-nhanh) | Từ git clone đến chạy hệ thống (hỗ trợ `start.bat`) |
| IV | [Công cụ an sao lập lá số](#iv-công-cụ-an-sao-lập-lá-số) | Năng lực thuật toán, cấu trúc file, dữ liệu cổ tịch |
| V | [Nguyên văn Nghê Hải Hạ《Thiên Kỷ · Tử Vi Đẩu Số》](#v-nguyên-văn-nghê-hải-hạ-thiên-kỷ--tử-vi-đẩu-số) | 14 bài giảng + 2 phần bổ sung, 1.848 trích dẫn, tra cứu theo mốc thời gian |
| VI | [Giao diện mẫu (Demo)](#vi-giao-diện-mẫu-demo) | Khác biệt giữa bản Demo mã nguồn mở và bản thương mại |
| VII | [Phạm vi mã nguồn mở](#vii-phạm-vi-mã-nguồn-mở) | Những gì có sẵn và những gì không có trong bản mở |
| VIII | [Bảo trì & Đóng góp](#viii-bảo-trì--đóng-góp) | Nhịp độ cập nhật, quy trình gửi Issue / PR |
| IX | [Giấy phép bản quyền](#ix-giấy-phép-bản-quyền) | Mã nguồn MIT / Dữ liệu CC BY 4.0 / Cổ tịch Công cộng |
| X | [Về dự án & Liên hệ](#x-về-dự-án--liên-hệ) | Triết lý, Tech stack, kênh liên hệ |

---

## I. Cập Nhật Mới Nhất

Bản cập nhật đồng bộ với nội dung phát hành hệ thống (content version `ca268829f7a9`):

![Tổng quan cập nhật](./docs/update-20261015.png)

**1. Phát hành Tập dữ liệu luận giải 13 chiều v4.0** —— 674.976 lá số (mọi ngày thực tế Dương lịch 1950–2026 × 12 giờ can chi × Nam/Nữ) × 13 chiều = **8.774.688 đoạn luận giải**. Sau khi giải nén đạt 56,6 GB (tăng 71% so với v3.0), khi nén chỉ còn 161 MB (định dạng zstd, chia thành 77 file theo năm hoặc tải trọn gói `ziwei-interp-v4-all.tar`). Tải tại [Release v4.0-13d](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v4.0-13d).

**2. Hiệu đính 13 chiều luận giải theo nguyên văn kinh điển**:
- Loại bỏ các trích dẫn không tìm thấy nguồn gốc; gắn mốc số tập, phút, giây đối với từng câu thoại của thầy Nghê trong *Thiên Kỷ*.
- Loại bỏ các trường hợp tứ hóa không tồn tại trên thực tế (như Thất Sát Hóa Quyền, Tử Vi Hóa Kỵ); bổ sung đầy đủ điều kiện kích hoạt đối với các cách cục đặc thù.
- Sức khỏe: Xác định cơ quan tạng phủ cần lưu tâm dựa trên cung vị quy tụ nhiều sát tinh nhất trên toàn bàn, kết hợp địa chi của cung đó; không suy đoán theo ngũ hành sao đơn thuần.
- Trích dẫn kinh điển được mở rộng từ 244 lên 405 vị trí, tất cả đều đối chiếu chuẩn xác với nguyên văn *Tử Vi Đẩu Số Toàn Thư*.

**3. Đồng bộ thuật toán an sao & địa lý**:
- Bổ sung kinh độ của 63 tỉnh/thành phố Việt Nam và các đơn vị hành chính chuẩn, hỗ trợ hiệu chỉnh **Giờ sinh chân mặt trời (True Solar Time)** chính xác tuyệt đối.
- Giờ Tý muộn (Dạ Tý 23:00–23:59) đổi ngày dựa theo **Giờ sinh chân mặt trời thực tế**.
- Tham số tháng nhuận được kiểm tra chặt chẽ, từ chối tham số không hợp lệ thay vì âm thầm xử lý sai lệch.

---

## II (Mới). Tập Dữ Liệu Luận Giải 13 Chiều v4.0

> **Tải tại: [Releases → v4.0-13d](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v4.0-13d)**

### Thông số kỹ thuật

| Tiêu chí | Chi tiết |
|---|---|
| Số lượng lá số | **674.976 lá số** (Dương lịch 1950–2026 × số ngày thực tế × 12 giờ × Nam/Nữ) |
| Số đoạn giải đoán | **8.774.688 đoạn** (mỗi lá số 13 chiều) |
| 13 Chiều luận giải | Tổng quan mệnh cách, Tính cách, Tình cảm, Sự nghiệp, Tài vận, Sức khỏe, Huynh đệ, Tử tức, Thiên di, Bạn bè & Quý nhân, Điền trạch, Phúc đức, Phụ mẫu |
| Dung lượng | Giải nén: 56.6 GB; Nén (zstd): 161 MB (77 file theo năm hoặc 1 file tar tổng) |
| Cơ chế sinh | Thuật toán an sao + kho luận đoán xác định, không phụ thuộc AI ngẫu nhiên, cùng đầu vào luôn cho cùng kết quả |

**Cấu trúc dữ liệu mỗi dòng (JSON Lines):**
* `k`: Khóa định danh dạng `YYYY-MM-DD-Giờ-GiớiTính`, ví dụ `1990-01-01-0-male`
* `y` / `m` / `d`: Ngày tháng năm sinh Dương lịch (chỉ chứa ngày thực tế hợp lệ)
* `h`: Chỉ số giờ sinh 0–11 (0 = Tý, 1 = Sửu ... 11 = Hợi)
* `g`: `male` (Nam) / `female` (Nữ)
* `ms`: Tên chính tinh thủ Mệnh (nếu Mệnh Vô Chính Diệu là `null`)
* `c`: Nội dung Markdown 13 chiều luận giải

### Tải và giải nén

```bash
# Tải trọn gói bằng GitHub CLI:
gh release download v4.0-13d --repo Renhuai123/ziwei-doushu -p "ziwei-interp-v4-all.tar"

# Giải nén từng năm (ví dụ năm 1990, bắt buộc có cờ --long=27):
zstd -d --long=27 year-1990.jsonl.zst
shasum -a 256 -c SHA256SUMS.txt --ignore-missing
```

---

## II. Tập Dữ Liệu Mẫu 518.000 Lá Số (v3.0)

> **Tải tại: [Releases → v3.0-samples](https://github.com/Renhuai123/ziwei-doushu/releases/tag/v3.0-samples)**

Bao phủ **518.400 tổ hợp lá số** (60 năm Hoa Giáp × 12 tháng × 30 ngày × 12 giờ × 2 giới tính), chứa cấu trúc lá số JSON và văn bản giải đoán theo hệ thống Nghê Hải Hạ.

### Bảng đối chiếu giờ sinh Can Chi:

| Chỉ số | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Giờ | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
| Khung giờ | 23–1 | 1–3 | 3–5 | 5–7 | 7–9 | 9–11 | 11–13 | 13–15 | 15–17 | 17–19 | 19–21 | 21–23 |

### Giấy phép sử dụng dữ liệu:
* **Mã nguồn mở hoàn toàn · Được phép dùng thương mại tự do** theo giấy phép **CC BY 4.0**.
* **Yêu cầu duy nhất**: Ghi rõ nguồn gốc dữ liệu:
  > Dự án sử dụng **Tập dữ liệu Tử Vi Đẩu Số mã nguồn mở** (Nguồn: https://github.com/Renhuai123/ziwei-doushu)

---

## III. Khởi Động Nhanh

### Cách 1: Chạy 1-Click trên Windows (Khuyên dùng)
Dự án đã tích hợp sẵn file khởi động nhanh:
* **Nhấp đúp chuột vào file `start.bat`** ở thư mục gốc. Hệ thống sẽ tự động kiểm tra Node.js, tự cài thư viện nếu thiếu, mở trình duyệt tại `http://localhost:3000` và khởi chạy máy chủ.

### Cách 2: Chạy thủ công bằng dòng lệnh

```bash
# 1. Tải mã nguồn về máy
git clone https://github.com/Renhuai123/ziwei-doushu.git
cd ziwei-doushu

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi động môi trường phát triển (Dev Server)
npm run dev
```

Kiểm tra kiểm thử và kiểu dữ liệu:
```bash
npm run typecheck   # Kiểm tra kiểu toàn diện TypeScript (0 lỗi)
npm test            # Chạy toàn bộ 17 bộ kiểm tra hồi quy với 768 lá số mẫu
```

> **Lưu ý về API AI**: Bản mã nguồn mở vận hành thuật toán an sao lập lá số, hiển thị 12 cung, xem đại hạn lưu niên hoàn toàn **offline trong trình duyệt, không cần bất kỳ API Key nào**. Các chức năng gọi AI tự do (`/api/interpret` và `/api/heming`) dành cho việc tự tích hợp LLM riêng của bạn.

---

## IV. Công Cụ An Sao Lập Lá Số

Toàn bộ nhân thuật toán an sao nằm tại thư mục `lib/ziwei/`:

| Năng lực thuật toán | Giải thích chi tiết |
|---|---|
| **Giờ sinh chân mặt trời** | Tính góc chênh lệch kinh độ thực tế và phương trình thời gian (Equation of Time), tránh lệch giờ sinh giữa các miền |
| **Hỗ trợ 63 tỉnh/thành VN** | Tích hợp sẵn tọa độ địa lý 63 tỉnh/thành phố Việt Nam cùng các thành phố lớn trên thế giới |
| **Quy tắc giờ Tý muộn (Dạ Tý)** | 23:00–23:59 đổi ngày; kết hợp giờ sinh chân mặt trời để phán đoán chính xác |
| **4 Quy chuẩn tháng nhuận** | Nhuận theo tháng trước / tháng sau / cắt nửa tháng / theo tháng thực tế, linh hoạt theo trường phái |
| **7 Cấp độ sáng tối tinh diệu** | Miếu (M) / Vượng (V) / Đắc (Đ) / Lợi / Bình (B) / Bất / Hãm (H) |
| **Tứ Hóa & Phi Tinh** | Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ theo năm sinh, can đại hạn, can lưu niên, phi tinh tự hóa |
| **Thập Nhị Thần Sát** | Bản mệnh khởi theo năm sinh, lưu niên khởi theo địa chi năm xem hạn |
| **Nhận diện cách cục** | Hơn 1.100 dòng mã nhận diện các thế đứng kinh điển (Tử Phủ Vũ Tướng, Sát Phá Tham, Cơ Nguyệt Đồng Lương, Nhật Chiếu Lôi Môn, Song Lộc Triều Viên, v.v.) |

### Phân bổ cấu trúc file:
* [`lib/ziwei/algorithm.ts`](file:///c:/Users/Xuan%20Cuong/Desktop/tuvi/lib/ziwei/algorithm.ts): Luồng an sao đầy đủ (An mệnh, định cục, an 14 chính tinh, phụ tinh, đại hạn, lưu niên).
* [`lib/ziwei/i18n-vi.ts`](file:///c:/Users/Xuan%20Cuong/Desktop/tuvi/lib/ziwei/i18n-vi.ts): Hệ thống thuật ngữ và hàm chuyển ngữ tiếng Việt chuẩn mệnh lý.
* [`lib/ziwei/cities.ts`](file:///c:/Users/Xuan%20Cuong/Desktop/tuvi/lib/ziwei/cities.ts): Danh bạ tọa độ địa lý các tỉnh/thành phố.
* [`lib/ziwei/sihua.ts`](file:///c:/Users/Xuan%20Cuong/Desktop/tuvi/lib/ziwei/sihua.ts): Bảng tra cứu Tứ Hóa can chi.
* [`lib/ziwei/patterns.ts`](file:///c:/Users/Xuan%20Cuong/Desktop/tuvi/lib/ziwei/patterns.ts): Thư viện nhận diện cách cục cổ điển.
* [`lib/classics/`](file:///c:/Users/Xuan%20Cuong/Desktop/tuvi/lib/classics/): Dữ liệu cổ tịch nguyên văn (*Cốt Tủy Phú*, *Tử Vi Đẩu Số Toàn Tập*, *Tử Vi Đẩu Số Toàn Thư*).

---

## V. Nguyên Văn Nghê Hải Hạ《Thiên Kỷ · Tử Vi Đẩu Số》

Toàn bộ **1.848 trích dẫn nguyên văn** từ 14 bài giảng chính khóa và 2 phần phụ lục của thầy Nghê Hải Hạ được lưu trữ chi tiết tại [`docs/tianji-ziwei/`](./docs/tianji-ziwei/), kèm đường dẫn thời gian tra cứu video trực quan.

* **Bản quyền**: Nội dung mục này thuộc giấy phép **CC BY-NC-SA 4.0** (chỉ phục vụ học tập nghiên cứu, **phi thương mại**).

---

## VI. Giao Diện Mẫu (Demo)

Giao diện trong kho mã nguồn là **bản mẫu hoàn chỉnh tối thiểu (Minimal Working Demo)** giúp bạn chạy ngay hệ thống, xem lá số và phát triển tiếp:
* Đã bao gồm: Form nhập ngày giờ sinh, bản đồ lá số 12 cung, chuyển đổi Bản Mệnh / Đại Hạn / Lưu Niên, tra cứu kho cổ tịch, kho kiến thức 14 chính tinh, hỗ trợ Dark / Light mode, responsive trên mobile.
* Không bao gồm: Mã nguồn API backend khép kín, hệ thống tài khoản thành viên thương mại và thanh toán trực tuyến.

---

## VII. Phạm Vi Mã Nguồn Mở

| Thành phần | Trạng thái |
|---|---|
| **Mã nguồn mở** | Thuật toán an sao lập lá số (`lib/ziwei/`), Dữ liệu nguyên văn cổ tịch (`lib/classics/`), Bộ chuyển ngữ tiếng Việt (`lib/ziwei/i18n-vi.ts`), Giao diện web Next.js (`app/`, `components/`), Bộ dữ liệu 518.000 lá số v3.0, Bộ dữ liệu 675.000 lá số v4.0 |
| **Không mở** | API backend xử lý thanh toán, prompt AI độc quyền của phiên bản thương mại trực tuyến, cơ chế phòng chống cào dữ liệu của server production |

---

## VIII. Đóng Góp & Phát Triển

Chúng tôi rất hoan nghênh sự đóng góp từ cộng đồng:
* Hoan nghênh các đóng góp về bổ sung kiểm thử hồi quy (regression tests), tối ưu thuật toán an sao, hiệu đính ngữ liệu cổ tịch.
* Khi đề xuất sửa đổi liên quan đến phương pháp an sao, vui lòng đính kèm dẫn chứng từ cổ tịch kinh điển.

---

## IX. Giấy Phép Bản Quyền

| Thành phần | Giấy phép | Quyền hạn |
|---|---|---|
| **Mã nguồn phần mềm** (`lib/`, `app/`, `components/`) | [MIT License](./LICENSE) | Tự do sử dụng, chỉnh sửa, tích hợp thương mại |
| **Dữ liệu giải đoán** (Dataset v3.0, v4.0) | [CC BY 4.0](./DATASET-LICENSE) | Tự do sử dụng, thương mại, yêu cầu ghi nguồn |
| **Văn bản cổ tịch** (*Cốt Tủy Phú*, *Toàn Thư*, *Toàn Tập*) | Public Domain | Tác phẩm cổ điển thuộc phạm vi công cộng |
| **Bài giảng thầy Nghê** ([`docs/tianji-ziwei/`](./docs/tianji-ziwei/)) | [CC BY-NC-SA 4.0](./docs/tianji-ziwei/LICENSE.md) | Phi thương mại, chia sẻ tương tự |

---

## X. Về Dự Án & Công Nghệ

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
* **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
* **Giao diện**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
* **Động lực học**: [Framer Motion](https://www.framer.com/motion/)
* **Nền tảng thuật số**: [iztro](https://github.com/SylarLong/iztro) + lunar-javascript
