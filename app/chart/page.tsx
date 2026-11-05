'use client';
import { useState } from 'react';
import BirthForm from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import InsightPanel from '@/components/InsightPanel';
import TimeNav, { type TimeView } from '@/components/TimeNav';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { BirthInfo, ZiweiChart, Palace } from '@/lib/ziwei/types';

/**
 * Trang Lập Lá Số Tử Vi Đẩu Số
 */
export default function ChartPage() {
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [view, setView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState(() => new Date().getFullYear());

  // ── Chưa lập lá số: hiển thị form nhập ngày giờ sinh ──
  if (!chart) {
    return (
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--t-gold)' }}>
          Lập Lá Số Tử Vi Đẩu Số
        </h1>
        <p style={{ color: 'var(--t-faint)', marginBottom: 32, fontSize: 14, lineHeight: 1.7 }}>
          Nhập ngày tháng năm sinh và giờ sinh để hệ thống an sao lập lá số Tử Vi chuẩn xác theo trường phái truyền thống kết hợp Chân Thái Dương Thời.
        </p>
        <BirthForm onSubmit={(info: BirthInfo) => setChart(generateChart(info))} />
      </main>
    );
  }

  // ── Đã lập lá số: Bàn lá số + Bảng luận giải ──
  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>
      <button
        type="button"
        onClick={() => { setChart(null); setSelectedPalace(null); }}
        style={{
          marginBottom: 16,
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid var(--t-border)',
          borderRadius: 10,
          background: 'var(--t-surface)',
          color: 'var(--t-gold)',
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        ← Nhập lại thông tin / Lập lá số mới
      </button>

      <TimeNav
        chart={chart}
        view={view}
        liunianYear={liunianYear}
        onViewChange={setView}
        onYearChange={setLiunianYear}
      />

      <div
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]"
        style={{
          gap: 20, marginTop: 16, alignItems: 'start',
        }}
      >
        <ChartBoard chart={chart} onPalaceSelect={setSelectedPalace} />
        <InsightPanel chart={chart} selectedPalace={selectedPalace} />
      </div>
    </main>
  );
}
