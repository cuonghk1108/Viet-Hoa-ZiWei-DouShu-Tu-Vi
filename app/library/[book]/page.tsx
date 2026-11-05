/**
 * /library/[book] — Trang mục lục từng bộ cổ tịch
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_BOOKS, getBookBySlug } from '@/lib/classics';

export async function generateStaticParams() {
  return ALL_BOOKS.map(b => ({ book: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: `《${book.title}》· ${book.dynasty} · Kho Cổ Tịch Tử Vi Đẩu Số`,
    description: book.intro,
  };
}

export default async function BookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none' }}>
          ← Kho Cổ Tịch
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.1em' }}>
          《{book.title}》
        </div>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none' }}>
          Trang chủ →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Thông tin sách */}
        <div className="text-center mb-12">
          <div style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.2em', marginBottom: '8px' }}>
            {book.dynasty} · {book.author}
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.08em', marginBottom: '14px' }}>
            《{book.title}》
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--tx-2)', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto' }}>
            {book.intro}
          </p>
        </div>

        {/* Mục lục chương */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid rgba(184,146,42,0.2)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(184,146,42,0.15)', fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.2em', fontWeight: 600 }}>
            MỤC LỤC CHƯƠNG HỒI · CHAPTERS
          </div>
          <div className="divide-y divide-amber-400/10">
            {book.chapters.map((ch, idx) => (
              <Link
                key={idx}
                href={`/library/${book.slug}/${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                className="hover:bg-amber-400/5"
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--tx-0)', letterSpacing: '0.04em', marginBottom: '4px' }}>
                    {ch.title}
                  </div>
                  {ch.subtitle && (
                    <div style={{ fontSize: '12px', color: 'var(--tx-3)' }}>
                      {ch.subtitle}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--tx-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{ch.paragraphs.length} đoạn</span>
                  <span style={{ color: 'var(--ac)' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}