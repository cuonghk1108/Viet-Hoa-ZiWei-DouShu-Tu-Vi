'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANNOUNCEMENT_VERSION = '2026-05-01';
const STORAGE_KEY = `announcement_seen_${ANNOUNCEMENT_VERSION}`;

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    } catch { /* localStorage có thể bị tắt */ }
    setDecided(true);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* skip */ }
  };

  if (!decided) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(20,12,2,0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #fefcf6 0%, #faf3e3 100%)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '640px',
              maxHeight: 'min(85vh, 760px)',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(60,30,10,0.4), 0 4px 16px rgba(60,30,10,0.2)',
              border: '1px solid rgba(184,146,42,0.25)',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* Tiêu đề & nút đóng */}
            <div style={{
              padding: '22px 28px 14px',
              borderBottom: '1px solid rgba(184,146,42,0.15)',
              background: 'linear-gradient(180deg, rgba(184,146,42,0.08) 0%, transparent 100%)',
              flexShrink: 0,
              position: 'relative',
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.4em', color: '#b8922a', opacity: 0.8, marginBottom: '6px', fontWeight: 600 }}>
                THÔNG ĐIỆP GỬI NGƯỜI DÙNG
              </div>
              <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#3d2f10', letterSpacing: '0.02em', margin: 0 }}>
                Chào mừng bạn đến với Hệ thống Tử Vi Đẩu Số
              </h2>
              <button
                onClick={close}
                aria-label="Đóng"
                style={{
                  position: 'absolute', top: '14px', right: '16px',
                  width: '28px', height: '28px',
                  background: 'rgba(184,146,42,0.08)',
                  border: '1px solid rgba(184,146,42,0.2)',
                  borderRadius: '50%',
                  color: '#7a5e2a', fontSize: '14px',
                  cursor: 'pointer', lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>

            {/* Banner nổi bật */}
            <div style={{
              margin: '14px 22px 0',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #fff5e3 0%, #ffe1c0 100%)',
              border: '1.5px dashed rgba(232,132,62,0.5)',
              borderRadius: '12px',
              flexShrink: 0,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#c45a2d', marginBottom: '4px', fontWeight: 700 }}>
                PHIÊN BẢN VIỆT HÓA CHÍNH TÔNG
              </div>
              <div style={{ fontSize: '14px', color: '#8b3a1a', fontWeight: 600, lineHeight: 1.6 }}>
                Hỗ trợ đầy đủ 63 tỉnh thành Việt Nam & Chân Thái Dương Thời
                <br />
                <span style={{ fontSize: '12px', color: '#c45a2d', fontWeight: 500 }}>
                  Thuật toán an sao chuẩn mực theo cổ tịch Tử Vi Đẩu Số
                </span>
              </div>
            </div>

            {/* Nội dung thư ngỏ */}
            <div style={{
              padding: '18px 28px 24px',
              overflowY: 'auto',
              fontSize: '14px',
              lineHeight: 1.85,
              color: '#5a4a30',
              flex: 1,
            }}>
              <p style={{ margin: '0 0 12px' }}>
                Chào bạn,
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Mục tiêu của nền tảng này là mang tinh hoa của thuật số Tử Vi Đẩu Số cổ truyền đến với mọi người theo một phương thức trực quan, chuẩn xác, hiện đại và dễ tiếp cận nhất.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Chúng tôi áp dụng quy tắc an sao cổ điển nghiêm ngặt, kết hợp phép hiệu chỉnh giờ Chân Thái Dương Thời theo kinh độ thực tế của từng địa phương tại Việt Nam, giúp cho lá số đạt độ chính xác tối ưu.
              </p>
              <p style={{
                margin: '0 0 12px',
                padding: '10px 14px',
                background: 'rgba(184,146,42,0.07)',
                borderLeft: '3px solid rgba(184,146,42,0.45)',
                borderRadius: '0 8px 8px 0',
                fontStyle: 'italic',
                color: '#7a5e2a',
              }}>
                Giá trị thực sự của Tử Vi không phải là để trói buộc con người vào một định mệnh bất di bất dịch, mà là chiếc gương soi giúp ta sớm thấu tỏ ưu thế, khuyết điểm, từ đó tu tâm dưỡng tính và đưa ra những lựa chọn sáng suốt trong cuộc đời.
              </p>
              <p style={{ margin: '0 0 16px', color: '#3d2f10', fontWeight: 600 }}>
                Chúc bạn có những trải nghiệm khám phá bản thân thật sâu sắc và ý nghĩa!
              </p>
              <p style={{ margin: 0, textAlign: 'right', fontSize: '13px', color: '#7a5e2a' }}>
                —— Trân trọng 🙏
              </p>
            </div>

            {/* Nút bấm xác nhận */}
            <div style={{
              padding: '14px 22px',
              borderTop: '1px solid rgba(184,146,42,0.15)',
              background: 'rgba(184,146,42,0.04)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              flexShrink: 0,
            }}>
              <button
                onClick={close}
                style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #b8922a 0%, #9a7a20 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(184,146,42,0.3)',
                }}
              >
                Tôi Đã Hiểu · Bắt Đầu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
