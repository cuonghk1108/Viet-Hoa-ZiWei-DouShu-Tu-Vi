'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollIntroProps {
  onComplete: () => void;
  /** Nút bỏ qua */
  skipLabel?: string;
}

const BEIDOU = ['Thiên Khu', 'Thiên Toàn', 'Thiên Cơ', 'Thiên Quyền', 'Ngọc Hoành', 'Khai Dương', 'Dao Quang'];

export default function ScrollIntro({ onComplete, skipLabel = 'Bỏ qua' }: ScrollIntroProps) {
  const [visible, setVisible] = useState(true);
  const [unrolled, setUnrolled] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setUnrolled(true), 1900);
    const t2 = setTimeout(() => setVisible(false), 3500);
    const t3 = setTimeout(onComplete, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    setTimeout(onComplete, 700);
  };

  const easeUnroll = [0.32, 0.72, 0.36, 1.0] as const;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'radial-gradient(ellipse at center, #1a120a 0%, #0a0604 70%, #000000 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Tinh tú nền */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              radial-gradient(2px 2px at 20% 30%, rgba(255,220,150,0.6), transparent),
              radial-gradient(1px 1px at 70% 20%, rgba(255,220,150,0.4), transparent),
              radial-gradient(1px 1px at 35% 75%, rgba(255,220,150,0.5), transparent),
              radial-gradient(1.5px 1.5px at 85% 65%, rgba(255,220,150,0.4), transparent),
              radial-gradient(1px 1px at 60% 88%, rgba(255,220,150,0.3), transparent),
              radial-gradient(2px 2px at 92% 40%, rgba(255,220,150,0.5), transparent)
            `,
          }} />

          {/* Trục cuộn */}
          <div style={{
            position: 'relative',
            width: 'min(90vw, 1080px)',
            height: 'min(60vh, 480px)',
          }}>
            <motion.div
              initial={{ width: 0, opacity: 0.92 }}
              animate={{ width: 'calc(100% - 32px)', opacity: 1 }}
              transition={{ duration: 1.9, ease: easeUnroll }}
              style={{
                position: 'absolute',
                top: '8%', bottom: '8%',
                right: '16px',
                background: `
                  linear-gradient(180deg, rgba(120,80,30,0.08) 0%, transparent 12%, transparent 88%, rgba(120,80,30,0.08) 100%),
                  linear-gradient(135deg, #efe1bf 0%, #e8d6ad 50%, #d6c08a 100%)
                `,
                boxShadow: `
                  inset 0 0 80px rgba(140,90,30,0.18),
                  inset 0 -2px 0 rgba(120,80,30,0.15),
                  0 8px 40px rgba(0,0,0,0.7),
                  0 16px 60px rgba(80,40,10,0.4)
                `,
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '8px',
                background: 'linear-gradient(180deg, rgba(80,50,20,0.35), transparent)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '8px',
                background: 'linear-gradient(0deg, rgba(80,50,20,0.35), transparent)',
              }} />

              <div style={{
                position: 'absolute', inset: 0,
                background: `
                  radial-gradient(at 20% 30%, rgba(120,80,30,0.06), transparent 50%),
                  radial-gradient(at 80% 70%, rgba(120,80,30,0.05), transparent 50%),
                  radial-gradient(at 50% 50%, rgba(120,80,30,0.04), transparent 60%)
                `,
                opacity: 0.7,
              }} />

              {/* Nội dung cuộn */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={unrolled ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '0 clamp(40px, 8vw, 120px)',
                  fontFamily: '"Cinzel", "Times New Roman", serif',
                }}
              >
                {/* Bắc đẩu thất tinh */}
                <div style={{
                  fontSize: 'clamp(10px, 1.1vw, 12px)',
                  color: '#8b5d18',
                  letterSpacing: '0.35em',
                  marginBottom: 'clamp(20px, 3vh, 36px)',
                  whiteSpace: 'nowrap',
                  opacity: 0.85,
                  fontWeight: 600,
                }}>
                  {BEIDOU.join(' · ')}
                </div>

                <div style={{
                  width: '60px', height: '1px',
                  background: 'linear-gradient(90deg, transparent, #a87a30, transparent)',
                  marginBottom: 'clamp(16px, 2.5vh, 28px)',
                }} />

                {/* Tiêu đề lớn */}
                <h1 style={{
                  fontSize: 'clamp(36px, 6vw, 76px)',
                  fontWeight: 800,
                  color: '#1a1208',
                  letterSpacing: 'clamp(0.12em, 0.18vw, 0.22em)',
                  lineHeight: 1.1,
                  margin: 0,
                  textShadow: '0 1px 0 rgba(255,250,235,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                  TỬ VI ĐẨU SỐ
                </h1>

                {/* Phụ đề */}
                <div style={{
                  fontSize: 'clamp(12px, 1.3vw, 16px)',
                  color: '#6b4818',
                  letterSpacing: '0.25em',
                  marginTop: 'clamp(16px, 2.5vh, 24px)',
                  marginBottom: '6px',
                  whiteSpace: 'nowrap',
                  fontWeight: 600,
                }}>
                  QUAN THIÊN CHI TƯỢNG · SÁT NHÂN CHI MỆNH
                </div>
                <div style={{
                  fontSize: 'clamp(11px, 1.1vw, 13px)',
                  color: '#8b6410',
                  letterSpacing: '0.15em',
                  whiteSpace: 'nowrap',
                  opacity: 0.85,
                }}>
                  Chính Tông Hệ Thống Tử Vi Đẩu Số
                </div>

                {/* Triện ấn */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                  animate={unrolled ? { opacity: 1, scale: 1, rotate: -4 } : {}}
                  transition={{ delay: 0.4, duration: 0.5, ease: 'backOut' }}
                  style={{
                    marginTop: 'clamp(20px, 3vh, 32px)',
                    width: 'clamp(50px, 6vw, 64px)',
                    height: 'clamp(50px, 6vw, 64px)',
                    background: '#a8302a',
                    color: '#f5ecd7',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(245,236,215,0.15)',
                    fontSize: 'clamp(10px, 1.1vw, 12px)',
                    borderRadius: '2px',
                  }}
                >
                  <div>TỬ VI</div>
                  <div>ĐẨU SỐ</div>
                </motion.div>

                {/* Bát quái */}
                <div style={{
                  marginTop: 'clamp(20px, 3vh, 32px)',
                  fontSize: 'clamp(13px, 1.4vw, 16px)',
                  color: '#a87a30',
                  letterSpacing: '0.6em',
                  opacity: 0.7,
                  whiteSpace: 'nowrap',
                }}>
                  ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷
                </div>
              </motion.div>
            </motion.div>

            {/* Trục cuộn phải */}
            <div
              style={{
                position: 'absolute', top: 0, bottom: 0, right: 0,
                width: '32px',
                background: 'linear-gradient(90deg, #4a2f0e 0%, #8b5d18 25%, #c89647 50%, #8b5d18 75%, #4a2f0e 100%)',
                borderRadius: '4px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.7), inset 0 0 12px rgba(0,0,0,0.4)',
                zIndex: 2,
              }}
            >
              <div style={{
                position: 'absolute', top: '-14px', left: '-6px', right: '-6px',
                height: '20px',
                background: 'radial-gradient(ellipse at 30% 30%, #f0d090 0%, #c89647 35%, #6a4218 90%)',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }} />
              <div style={{
                position: 'absolute', bottom: '-14px', left: '-6px', right: '-6px',
                height: '20px',
                background: 'radial-gradient(ellipse at 30% 30%, #f0d090 0%, #c89647 35%, #6a4218 90%)',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }} />
            </div>

            {/* Trục cuộn trái */}
            <motion.div
              initial={{ right: '0px' }}
              animate={{ right: 'calc(100% - 32px)' }}
              transition={{ duration: 1.9, ease: easeUnroll }}
              style={{
                position: 'absolute', top: 0, bottom: 0,
                width: '32px',
                background: 'linear-gradient(90deg, #4a2f0e 0%, #8b5d18 25%, #c89647 50%, #8b5d18 75%, #4a2f0e 100%)',
                borderRadius: '4px',
                boxShadow: '-2px 6px 24px rgba(0,0,0,0.7), inset 0 0 12px rgba(0,0,0,0.4)',
                zIndex: 3,
              }}
            >
              <div style={{
                position: 'absolute', top: '-14px', left: '-6px', right: '-6px',
                height: '20px',
                background: 'radial-gradient(ellipse at 30% 30%, #f0d090 0%, #c89647 35%, #6a4218 90%)',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }} />
              <div style={{
                position: 'absolute', bottom: '-14px', left: '-6px', right: '-6px',
                height: '20px',
                background: 'radial-gradient(ellipse at 30% 30%, #f0d090 0%, #c89647 35%, #6a4218 90%)',
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }} />
            </motion.div>
          </div>

          {/* Nút bỏ qua */}
          <button
            onClick={handleSkip}
            style={{
              position: 'absolute', bottom: '32px', right: '32px',
              padding: '8px 18px',
              background: 'transparent',
              color: 'rgba(232,220,196,0.55)',
              border: '1px solid rgba(232,220,196,0.18)',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              letterSpacing: '0.15em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(232,220,196,0.4)';
              e.currentTarget.style.color = 'rgba(232,220,196,0.9)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(232,220,196,0.18)';
              e.currentTarget.style.color = 'rgba(232,220,196,0.55)';
            }}
          >
            {skipLabel} →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}