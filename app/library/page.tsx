/**
 * Kho Cổ Tịch Tử Vi Đẩu Số · Trang chủ
 *
 * Danh mục cổ tịch kinh điển + Tìm kiếm toàn văn
 */

import Link from 'next/link';
import { ALL_BOOKS, TOTAL_PARAGRAPHS } from '@/lib/classics';
import LibrarySearch from './LibrarySearch';

export const metadata = {
  title: 'Kho Cổ Tịch Nguyên Văn Tử Vi Đẩu Số · Toàn Tập / Toàn Thư / Cốt Tủy Phú',
  description: 'Tra cứu toàn văn cổ tịch kinh điển Tử Vi Đẩu Số: Tử Vi Đẩu Số Toàn Tập, Tử Vi Đẩu Số Toàn Thư, Cốt Tủy Phú.',
};

export default function LibraryHomePage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* Thanh điều hướng */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none' }}>
          ← Trang chủ
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.2em' }}>
          KHO CỔ TỊCH · CLASSICS
        </div>
        <Link href="/chart" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none' }}>
          Lập lá số →
        </Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 py-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, rgba(184,146,42,0.4))' }} />
          <span style={{ fontSize: '11px', color: 'var(--ac)', letterSpacing: '0.3em' }}>TỬ VI ĐẨU SỐ · CỔ TỊCH KINH ĐIỂN</span>
          <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, rgba(184,146,42,0.4))' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.1em', marginBottom: '12px' }}>
          Kho Cổ Tịch Nguyên Văn
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--tx-2)', letterSpacing: '0.04em', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Tra cứu toàn văn các bộ cổ tịch Tử Vi Đẩu Số kinh điển<br />
          Lưu trữ <strong style={{ color: 'var(--ac)' }}>{ALL_BOOKS.length}</strong> bộ cổ tịch · Tổng cộng <strong style={{ color: 'var(--ac)' }}>{TOTAL_PARAGRAPHS}</strong> đoạn tinh hoa
        </p>
      </div>

      {/* Tìm kiếm */}
      <div className="max-w-2xl mx-auto px-6 mb-12">
        <LibrarySearch />
      </div>

      {/* Danh sách sách cổ tịch */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_BOOKS.map(book => (
            <Link
              key={book.slug}
              href={`/library/${book.slug}`}
              style={{
                display: 'block',
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.2)',
                borderRadius: '14px',
                padding: '24px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(184,146,42,0.06)',
              }}
              className="hover:shadow-lg"
            >
              <div style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.15em', marginBottom: '6px' }}>
                {book.dynasty} · {book.author.split(' ')[0]}
              </div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--tx-0)', marginBottom: '10px', letterSpacing: '0.05em' }}>
                《{book.title}》
              </div>
              <div style={{ fontSize: '12px', color: 'var(--tx-2)', lineHeight: 1.7, marginBottom: '14px' }}>
                {book.intro}
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--tx-3)' }}>
                <span>{book.chapters.length} chương</span>
                <span style={{ color: 'rgba(184,146,42,0.4)' }}>·</span>
                <span>{book.chapters.reduce((s, c) => s + c.paragraphs.length, 0)} đoạn nguyên văn</span>
              </div>
              <div style={{
                display: 'inline-flex',
                marginTop: '14px',
                fontSize: '11px',
                color: 'var(--ac)',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}>
                Vào đọc cổ tịch →
              </div>
            </Link>
          ))}
        </div>

        {/* Giới thiệu kho sách */}
        <div style={{ marginTop: '60px', padding: '24px', background: 'rgba(184,146,42,0.05)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--ac-dim)', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '8px' }}>
            VỀ KHO TƯ LIỆU CỔ TỊCH
          </div>
          <div style={{ fontSize: '12px', color: 'var(--tx-2)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Các văn bản cổ tịch được lưu trữ đều là tác phẩm kinh điển công cộng.<br />
            Phục vụ mục đích học thuật, nghiên cứu và gìn giữ văn hóa thuật số cổ truyền.
          </div>
        </div>
      </div>
    </div>
  );
}