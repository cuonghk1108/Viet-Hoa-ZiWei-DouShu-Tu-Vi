'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ScrollIntro from '@/components/ScrollIntro';

export default function PreviewPage() {
  const router = useRouter();
  const [replayKey, setReplayKey] = useState(0);
  const [done, setDone] = useState(false);

  return (
    <>
      {/* Hiệu ứng mở cuộn */}
      <ScrollIntro key={replayKey} onComplete={() => setDone(true)} />

      {/* Bảng thao tác sau khi kết thúc */}
      {done && (
        <main style={{
          minHeight: '100vh',
          background: '#0d0a08',
          color: '#e8dcc4',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#c89647', marginBottom: '16px' }}>
            SCROLL · INTRO · PREVIEW
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            letterSpacing: '0.1em',
            color: '#e8dcc4',
            marginBottom: '16px',
            fontWeight: 700,
          }}>
            Cuộn Thư Tử Vi · Xem Trước Khởi Động
          </h1>
          <p style={{
            fontSize: '14px', color: '#a89878',
            maxWidth: '500px', lineHeight: 1.9,
            marginBottom: '40px',
          }}>
            Hiệu ứng cuộn thư cổ kính mở ra khi bắt đầu xem lá số mệnh bàn.<br />
            Bạn có thể phát lại hiệu ứng hoặc vào ngay trang lập lá số.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
            <button
              onClick={() => { setDone(false); setReplayKey(k => k + 1); }}
              style={{
                background: '#a8302a',
                color: '#f5ecd7',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Phát lại hoạt cảnh ↺
            </button>
            <button
              onClick={() => router.push('/chart')}
              style={{
                background: '#c89647',
                color: '#1a1208',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Lập Lá Số Ngay →
            </button>
          </div>

          <Link href="/" style={{ fontSize: '12px', color: '#8b5d18', textDecoration: 'none' }}>
            ← Quay về trang chủ
          </Link>
        </main>
      )}
    </>
  );
}