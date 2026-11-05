'use client';

/**
 * Thẻ ảnh xuất lá số Tử Vi (12 cung + tóm tắt thông tin)
 */

import type { ZiweiChart } from '@/lib/ziwei/types';
import { SITE_HOST } from '@/lib/site';
import { tStar, tPalace, tBranch, tWuxingJu, tSiHua } from '@/lib/ziwei/i18n-vi';

// Cách sắp xếp 12 cung chuẩn bàn cờ Tử Vi
// Dần Mão Thìn Tỵ → Hàng trên
// Sửu          Ngọ
// Tý           Mùi
// Hợi Tuất Dậu Thân → Hàng dưới
const ZHIWEI_LAYOUT: Array<{ branch: number; row: number; col: number }> = [
  { branch: 2,  row: 0, col: 0 }, // Dần
  { branch: 3,  row: 0, col: 1 }, // Mão
  { branch: 4,  row: 0, col: 2 }, // Thìn
  { branch: 5,  row: 0, col: 3 }, // Tỵ
  { branch: 1,  row: 1, col: 0 }, // Sửu
  { branch: 6,  row: 1, col: 3 }, // Ngọ
  { branch: 0,  row: 2, col: 0 }, // Tý
  { branch: 7,  row: 2, col: 3 }, // Mùi
  { branch: 11, row: 3, col: 0 }, // Hợi
  { branch: 10, row: 3, col: 1 }, // Tuất
  { branch: 9,  row: 3, col: 2 }, // Dậu
  { branch: 8,  row: 3, col: 3 }, // Thân
];

interface ShareCardProps {
  chart: ZiweiChart;
  birth: { year: string; month: string; day: string; hour: string; minute: string; gender: 'male' | 'female'; city?: string };
  highlight?: string;
}

export default function ShareCardCanvas({ chart, birth, highlight }: ShareCardProps) {
  const mingPalace = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  const mingMajorStars = mingPalace?.stars.filter(s => s.type === 'major').map(s => tStar(s.name)) ?? [];
  const mingStarStr = mingMajorStars.length > 0 ? mingMajorStars.join(' · ') : 'Vô Chính Diệu';
  const mingBranchName = tBranch(chart.mingGongBranch);
  const shenBranchName = tBranch(chart.shenGongBranch);
  const dx = chart.daXians?.[chart.currentDaXianIndex];

  const cells = ZHIWEI_LAYOUT.map(slot => {
    const palace = chart.palaces.find(p => p.branch === slot.branch);
    const majors = palace?.stars.filter(s => s.type === 'major') ?? [];
    const isMing = palace?.branch === chart.mingGongBranch;
    const isShen = palace?.branch === chart.shenGongBranch;
    return { ...slot, palace, majors, isMing, isShen };
  });

  return (
    <div id="share-card" style={{
      width: '680px',
      height: '420px',
      background: 'linear-gradient(135deg, #fef9eb 0%, #f7e8c4 60%, #efd8a0 100%)',
      padding: '20px 28px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: '14px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Họa tiết ánh kim mờ */}
      <div style={{
        position: 'absolute', top: '-60px', left: '-60px',
        width: '180px', height: '180px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,146,42,0.18) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-50px', right: '-50px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,90,45,0.12) 0%, transparent 70%)',
      }} />

      {/* Đầu thẻ */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4a948 0%, #b8922a 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '15px', fontWeight: 700,
          }}>☯</div>
          <div>
            <div style={{ fontSize: '15px', color: '#3d2f10', fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1.2 }}>LÁ SỐ TỬ VI ĐẨU SỐ</div>
            <div style={{ fontSize: '9px', color: '#a89b7c', letterSpacing: '0.12em', marginTop: '2px' }}>CHÍNH TÔNG · TỬ VI ĐẨU SỐ</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '10px', color: '#6b5d3f', letterSpacing: '0.02em', fontWeight: 500 }}>
            {birth.day}/{birth.month}/{birth.year} · {birth.hour.padStart(2,'0')}:{birth.minute.padStart(2,'0')}
            <span style={{ margin: '0 4px', color: '#b8922a' }}>·</span>
            {birth.gender === 'male' ? 'Nam Mạng' : 'Nữ Mạng'}
            {birth.city && <><span style={{ margin: '0 4px', color: '#b8922a' }}>·</span>{birth.city}</>}
          </div>
          <div style={{ fontSize: '8px', color: '#b8922a', letterSpacing: '0.05em', marginTop: '2px' }}>
            {SITE_HOST}
          </div>
        </div>
      </div>

      {/* Thân thẻ: Bàn cờ 12 cung bên trái + Thông tin chính bên phải */}
      <div style={{ display: 'flex', gap: '16px', flex: 1, position: 'relative', zIndex: 1, minHeight: 0 }}>
        {/* Bàn cờ 12 cung thu nhỏ */}
        <div style={{
          width: '300px',
          height: '288px',
          background: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(184,146,42,0.3)',
          borderRadius: '8px',
          padding: '6px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: '3px',
          position: 'relative',
        }}>
          {cells.map((cell, i) => {
            if ((cell.row === 1 || cell.row === 2) && (cell.col === 1 || cell.col === 2)) return null;
            return (
              <div key={i} style={{
                gridRow: cell.row + 1,
                gridColumn: cell.col + 1,
                background: cell.isMing ? 'rgba(184,146,42,0.18)' : 'rgba(255,255,255,0.6)',
                border: cell.isMing
                  ? '1.5px solid #b8922a'
                  : '0.5px solid rgba(184,146,42,0.2)',
                borderRadius: '4px',
                padding: '3px 4px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  fontSize: '8px',
                  color: cell.isMing ? '#8b6a14' : '#a89b7c',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontWeight: cell.isMing ? 700 : 500 }}>
                    {cell.palace ? tPalace(cell.palace.name) : ''}
                    {cell.isShen ? '·Thân' : ''}
                  </span>
                  <span style={{ fontSize: '7px', opacity: 0.7 }}>{tBranch(cell.branch)}</span>
                </div>
                <div style={{
                  marginTop: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                  {cell.majors.length > 0 ? cell.majors.slice(0, 2).map((s, j) => (
                    <div key={j} style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      color: cell.isMing ? '#8b6a14' : '#3d2f10',
                      lineHeight: 1.1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {tStar(s.name)}{s.siHua ? <span style={{ fontSize: '7px', color: '#c45a2d', marginLeft: '1px' }}>{tSiHua(s.siHua, true)}</span> : ''}
                    </div>
                  )) : (
                    <div style={{ fontSize: '8px', color: '#a89b7c', fontStyle: 'italic' }}>Vô C.Diệu</div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Ô trung cung */}
          <div style={{
            gridRow: '2 / 4',
            gridColumn: '2 / 4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(184,146,42,0.06)',
            border: '0.5px dashed rgba(184,146,42,0.3)',
            borderRadius: '4px',
          }}>
            <div style={{ fontSize: '7px', color: '#a89b7c', letterSpacing: '0.15em', marginBottom: '2px' }}>TỬ VI</div>
            <div style={{ fontSize: '13px', color: '#3d2f10', fontWeight: 700, letterSpacing: '0.05em' }}>TỬ VI ĐẨU SỐ</div>
            <div style={{ fontSize: '9px', color: '#6b5d3f', marginTop: '4px' }}>Mệnh tại {mingBranchName}</div>
            <div style={{ fontSize: '9px', color: '#6b5d3f' }}>Thân tại {shenBranchName}</div>
            <div style={{ fontSize: '9px', color: '#6b5d3f', marginTop: '2px', fontWeight: 600 }}>{tWuxingJu(chart.wuxingJuName)}</div>
          </div>
        </div>

        {/* Khối thông tin bên phải */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#a89b7c', letterSpacing: '0.1em', marginBottom: '2px', fontWeight: 600 }}>
              CUNG MỆNH · TẠI {mingBranchName.toUpperCase()}
            </div>
            <div style={{
              fontSize: mingStarStr.length > 12 ? '28px' : '36px',
              fontWeight: 800,
              color: '#8b6a14',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              marginBottom: '10px',
            }}>{mingStarStr}</div>

            {highlight && (
              <div style={{
                fontSize: '11px',
                color: '#5b4c2e',
                fontWeight: 500,
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.6)',
                borderLeft: '3px solid #b8922a',
                borderRadius: '4px',
                lineHeight: 1.4,
                marginBottom: '10px',
              }}>{highlight}</div>
            )}
          </div>

          <div>
            {dx && (
              <div style={{
                fontSize: '11px',
                color: '#3d2f10',
                marginBottom: '8px',
              }}>
                <span style={{ color: '#a89b7c' }}>Đại Hạn Hiện Tại: </span>
                <span style={{ fontWeight: 700 }}>{dx.startAge}–{dx.endAge} tuổi · {tPalace(dx.palaceName, true)}</span>
              </div>
            )}
            <div style={{
              padding: '8px 10px',
              background: 'linear-gradient(135deg, rgba(212,169,72,0.18) 0%, rgba(184,146,42,0.08) 100%)',
              border: '1px solid rgba(184,146,42,0.3)',
              borderRadius: '6px',
            }}>
              <div style={{ fontSize: '11px', color: '#3d2f10', fontWeight: 700, lineHeight: 1.4 }}>
                Tử Vi Đẩu Số · Tinh Hoa Thuật Số Phương Đông
              </div>
              <div style={{ fontSize: '9px', color: '#8b6a14', fontWeight: 500, marginTop: '2px' }}>
                Hệ thống an sao và luận giải mệnh cách đa chiều
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Chụp hình chuyển đổi div sang PNG dataURL */
export async function captureShareCard(): Promise<string | null> {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const node = document.getElementById('share-card');
    if (!node) return null;
    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    return canvas.toDataURL('image/png');
  } catch (e) {
    console.error('captureShareCard failed', e);
    return null;
  }
}

export function downloadDataURL(dataURL: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
