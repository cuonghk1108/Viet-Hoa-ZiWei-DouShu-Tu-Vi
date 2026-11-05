export const metadata = {
  title: 'Điều Khoản Dịch Vụ · Tử Vi Đẩu Số',
  description: 'Điều khoản dịch vụ và thỏa thuận người dùng hệ thống Tử Vi Đẩu Số',
};

export default function TermsPage() {
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
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Điều Khoản Dịch Vụ</h1>
        <p style={{ fontSize: 12, color: 'var(--tx-3)', marginBottom: 32 }}>Cập nhật lần cuối: Tháng 4 năm 2026</p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>1. Tổng quan dịch vụ</h2>
        <p>Hệ thống Tử Vi Đẩu Số (sau đây gọi là "nền tảng") cung cấp dịch vụ an sao lập lá số và diễn giải mệnh bàn dựa trên hệ thống học thuật Tử Vi Đẩu Số chính tông. Toàn bộ nội dung mệnh lý trên nền tảng mang tính chất học thuật văn hóa cổ truyền và tham khảo, <strong>không cấu thành bất kỳ lời khuyên y tế, đầu tư tài chính, pháp lý, tâm lý học hay các quyết định trọng đại trong đời sống</strong>.</p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>2. Quy chuẩn hành vi người dùng</h2>
        <p>Khi sử dụng nền tảng này, bạn đồng ý:</p>
        <ul style={{ paddingLeft: 24 }}>
          <li>Chỉ sử dụng nền tảng cho mục đích hợp pháp, học tập, nghiên cứu và tham khảo cá nhân</li>
          <li>Không sử dụng nội dung nền tảng để thương mại hóa trái phép hoặc phát tán với mục đích trục lợi</li>
          <li>Không thực hiện các hành vi gây cản trở hoặc làm gián đoạn sự vận hành bình thường của hệ thống</li>
          <li>Cung cấp thông tin ngày giờ sinh chính xác; hệ thống không chịu trách nhiệm đối với các sai lệch giải đoán do thông tin nhập sai</li>
        </ul>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>3. Sở hữu trí tuệ & Bản quyền</h2>
        <p style={{ background: 'rgba(168,50,40,0.06)', border: '1px solid rgba(168,50,40,0.2)', padding: 16, borderRadius: 8 }}>
          <strong>Toàn bộ nội dung mệnh lý, cơ sở tri thức (bao gồm 14 chính tinh × 12 cung × Tứ Hóa × Đại hạn Lưu niên), thiết kế giao diện UI và thuật toán kết hợp đều thuộc bản quyền hợp pháp của nền tảng.</strong><br /><br />
          Nghiêm cấm các hành vi cào quét tự động (crawler), sao chép hàng loạt hoặc sử dụng dữ liệu phản hồi của nền tảng để huấn luyện trái phép các mô hình AI khác mà không có sự đồng ý bằng văn bản.
        </p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>4. Tuyên bố miễn trừ trách nhiệm</h2>
        <p>Nội dung mệnh lý dựa trên sự tổng hợp tri thức Tử Vi Đẩu Số cổ điển, <strong>không đảm bảo tính tuyệt đối 100%</strong>. Vận mệnh con người chịu ảnh hưởng tổng hòa của Thiên thời, Địa lợi, Nhân hòa và nỗ lực tự thân. Người dùng cần giữ thái độ khách quan, khoa học, không nên phụ thuộc mù quáng vào bất kỳ phán đoán mệnh lý đơn lẻ nào.</p>

        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 12 }}>5. Điều chỉnh dịch vụ</h2>
        <p>Hệ thống có quyền điều chỉnh, tối ưu hóa hoặc tạm ngưng các tính năng để bảo trì nâng cấp mà không cần báo trước trong những trường hợp khẩn cấp.</p>

        <p style={{ marginTop: 48, fontSize: 12, color: 'var(--tx-3)' }}>
          <a href="/privacy" style={{ color: 'var(--ac)' }}>Chính sách bảo mật</a> · <a href="/" style={{ color: 'var(--ac)' }}>Quay về trang chủ</a>
        </p>
      </main>
    </>
  );
}