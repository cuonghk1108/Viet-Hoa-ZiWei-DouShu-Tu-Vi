export const metadata = {
  title: 'Chính Sách Bảo Mật · Tử Vi Đẩu Số',
  description: 'Chính sách bảo mật thông tin người dùng hệ thống Tử Vi Đẩu Số',
};

export default function PrivacyPage() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--tx-3)', textDecoration: 'none' }}>
          <span style={{ fontSize: '16px' }}>‹</span>
          <span>Về trang chủ</span>
        </a>
        <div style={{ width: '1px', height: '20px', background: 'var(--bdr-med)' }} />
        <span style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', fontWeight: 600 }}>Tử Vi Đẩu Số</span>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px', color: 'var(--tx-1)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Chính Sách Bảo Mật</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: Tháng 4 năm 2026</p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>1. Thông tin thu thập</h2>
        <p>Để thực hiện việc an sao lập lá số Tử Vi chính xác theo kinh độ địa lý và giờ sinh chân thực tế, hệ thống có thể cần xử lý các thông tin sau:</p>
        <ul style={{ paddingLeft: 24 }}>
          <li><strong>Thông tin lập lá số</strong>: Họ tên (tùy chọn), ngày tháng năm sinh Dương lịch / Âm lịch, giờ sinh, giới tính, nơi sinh (kinh độ địa lý)</li>
          <li><strong>Lịch sử trình duyệt cục bộ</strong>: Lưu trữ trạng thái lá số vừa tạo trong bộ nhớ máy (localStorage) để thuận tiện cho việc xem lại mà không cần tải lại</li>
          <li><strong>Tùy chọn giao diện</strong>: Tùy chỉnh chế độ sáng / tối (Dark / Light mode)</li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>2. Mục đích sử dụng</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li>Thông tin ngày giờ sinh chỉ được sử dụng cho việc tính toán các tọa độ sao, cục số, đại hạn và lưu niên trên lá số</li>
          <li>Hệ thống tôn trọng quyền riêng tư của người dùng, không bán hay chia sẻ thông tin cá nhân cho bên thứ ba vì mục đích tiếp thị</li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>3. An toàn thông tin</h2>
        <p>Mọi kết nối dữ liệu giữa thiết bị của bạn và hệ thống đều được bảo vệ thông qua giao thức mã hóa HTTPS chuẩn công nghiệp. Thuật toán lập lá số chạy trực tiếp trên trình duyệt của người dùng.</p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>4. Quyền của bạn</h2>
        <ul style={{ paddingLeft: 24 }}>
          <li>Bạn có thể xóa toàn bộ lịch sử lá số lưu trên trình duyệt bất cứ lúc nào bằng cách xóa dữ liệu trang web hoặc bấm nút thiết lập lại</li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>5. Cookie và Lưu trữ Cục bộ</h2>
        <p>Trang web sử dụng localStorage để lưu trữ các tùy chọn cá nhân (giao diện, lá số gần nhất). Bạn có thể xóa bất cứ lúc nào trong phần cài đặt trình duyệt.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/terms" style={{ color: 'var(--ac)' }}>Điều khoản dịch vụ</a> · <a href="/" style={{ color: 'var(--ac)' }}>Quay về trang chủ</a>
        </p>
      </main>
    </>
  );
}