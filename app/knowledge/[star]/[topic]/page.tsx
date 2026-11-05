/**
 * /knowledge/[star]/[topic] — Trang chi tiết luận giải
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { TopicKey } from '@/lib/ziwei/db-analysis';
import {
  ALL_STARS,
  ALL_TOPICS,
  getKnowledge,
  getAllKnowledgeRoutes,
  STAR_BRIEF_SEO,
  STAR_TO_SLUG,
  SLUG_TO_STAR,
} from '@/lib/seo/knowledge';
import { SITE_URL } from '@/lib/site';
import { tStar } from '@/lib/ziwei/i18n-vi';

export const dynamicParams = false;

export async function generateStaticParams() {
  const routes = getAllKnowledgeRoutes();
  return routes.map(r => ({ star: r.slug, topic: r.topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ star: string; topic: string }> }) {
  const { star: slug, topic } = await params;
  const star = SLUG_TO_STAR[slug];
  if (!star) return {};
  const data = getKnowledge(star, topic as TopicKey);
  if (!data.exists) return {};

  const viStar = tStar(star);
  const title = `Sao ${viStar} tại cung ${data.palaceName} · ${data.topicLabel} · Luận giải Tử Vi Đẩu Số`;
  const description = data.parsed.dingdiao
    || `Luận giải sao ${viStar} đóng tại cung ${data.palaceName} trong Tử Vi Đẩu Số — Dựa trên hệ thống cổ tịch Tử Vi Đẩu Số Toàn Thư và Cốt Tủy Phú.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/knowledge/${slug}/${topic}`,
    },
    alternates: {
      canonical: `${SITE_URL}/knowledge/${slug}/${topic}`,
    },
    keywords: [
      'Tử Vi Đẩu Số', viStar, data.palaceName, data.topicLabel,
      `${viStar} ${data.palaceName}`, `${viStar} đóng cung ${data.palaceName}`,
      `Tử Vi ${viStar}`, 'Tử Vi Toàn Thư', 'Cốt Tủy Phú',
    ],
  };
}

export default async function KnowledgePage({ params }: { params: Promise<{ star: string; topic: string }> }) {
  const { star: slug, topic } = await params;
  const star = SLUG_TO_STAR[slug];
  if (!star) notFound();
  const data = getKnowledge(star, topic as TopicKey);
  if (!data.exists) notFound();

  const viStar = tStar(star);
  const otherTopicsForStar = ALL_TOPICS.filter(t => t !== topic && getKnowledge(star, t).exists);
  const otherStarsForTopic = ALL_STARS.filter(s => s !== star && getKnowledge(s, topic as TopicKey).exists);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Sao ${viStar} tại cung ${data.palaceName} · ${data.topicLabel}`,
    description: data.parsed.dingdiao,
    author: { '@type': 'Organization', name: 'Nghiên Cứu Tử Vi Đẩu Số' },
    publisher: {
      '@type': 'Organization',
      name: 'Tử Vi Đẩu Số',
      url: SITE_URL,
    },
    datePublished: '2026-04-28',
    dateModified: '2026-04-28',
    mainEntityOfPage: `${SITE_URL}/knowledge/${slug}/${topic}`,
    articleSection: 'Tử Vi Đẩu Số · Luận giải chính tông',
    keywords: [`Tử Vi Đẩu Số`, viStar, data.palaceName, data.topicLabel].join(', '),
  };

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Thanh điều hướng */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none' }}>
          ← Trang chủ
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em' }}>
          Kho Kiến Thức Tử Vi
        </div>
        <Link href="/chart" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none' }}>
          Lập lá số →
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.05em', marginBottom: '16px' }}>
          <Link href="/" style={{ color: 'var(--tx-3)', textDecoration: 'none' }}>Trang chủ</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/knowledge" style={{ color: 'var(--tx-3)', textDecoration: 'none' }}>Kho kiến thức</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>{viStar}</span>
          <span style={{ margin: '0 8px' }}>·</span>
          <span style={{ color: 'var(--ac)' }}>Cung {data.palaceName}</span>
        </nav>

        {/* Tiêu đề */}
        <header style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.2em', marginBottom: '8px' }}>
            {data.topicLabel} · Luận giải hệ thống kinh điển
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.05em', lineHeight: 1.2 }}>
            Sao {viStar} tại Cung {data.palaceName}
          </h1>
          {STAR_BRIEF_SEO[star] && (
            <p style={{ fontSize: '13px', color: 'var(--tx-2)', marginTop: '14px', lineHeight: 1.8 }}>
              {STAR_BRIEF_SEO[star]}
            </p>
          )}
        </header>

        {/* 4 phần luận giải */}
        {data.parsed.dingdiao && (
          <Section title="Định điệu một câu" gradient>
            <p style={{ fontSize: '16px', color: 'var(--tx-0)', lineHeight: 1.9, fontWeight: 500 }}>
              {data.parsed.dingdiao}
            </p>
          </Section>
        )}

        {data.parsed.lundian && (
          <Section title="Luận đoán cốt lõi">
            <div style={{ fontSize: '14px', color: 'var(--tx-0)', lineHeight: 2, whiteSpace: 'pre-wrap' }}>
              {data.parsed.lundian}
            </div>
          </Section>
        )}

        {data.parsed.yiju && (
          <Section title="Căn cứ mệnh bàn">
            <div style={{ fontSize: '14px', color: 'var(--tx-0)', lineHeight: 2, whiteSpace: 'pre-wrap' }}>
              {data.parsed.yiju}
            </div>
          </Section>
        )}

        {data.parsed.chuchu && (
          <Section title="Xuất xứ kinh điển" minimal>
            <div style={{ fontSize: '13px', color: 'var(--tx-2)', lineHeight: 2, whiteSpace: 'pre-wrap' }}>
              {data.parsed.chuchu}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div style={{
          margin: '40px 0 30px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(212,169,72,0.15) 0%, rgba(184,146,42,0.06) 100%)',
          borderRadius: '14px',
          border: '1px solid rgba(184,146,42,0.3)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', color: 'var(--tx-0)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '6px' }}>
            Bạn muốn xem {data.topicLabel} trên lá số của chính mình?
          </div>
          <div style={{ fontSize: '12px', color: 'var(--tx-2)', marginBottom: '16px' }}>
            Nhập ngày giờ sinh để an sao lập lá số · Khám phá vận mệnh chính xác
          </div>
          <Link href="/chart" style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: 'linear-gradient(135deg, #d4a948 0%, #b8922a 100%)',
            color: 'white',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(184,146,42,0.3)',
          }}>
            Lập Lá Số Ngay →
          </Link>
        </div>

        {/* Cung vị khác của cùng sao */}
        <Section title={`Sao ${viStar} tại các cung vị khác`} minimal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherTopicsForStar.map(t => {
              const d = getKnowledge(star, t);
              return (
                <Link
                  key={t}
                  href={`/knowledge/${slug}/${t}`}
                  style={{
                    fontSize: '12px',
                    padding: '6px 12px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(184,146,42,0.25)',
                    borderRadius: '999px',
                    color: 'var(--tx-2)',
                    textDecoration: 'none',
                  }}
                >
                  {viStar} tại cung {d.palaceName}
                </Link>
              );
            })}
          </div>
        </Section>

        {/* Sao khác tại cùng cung */}
        <Section title={`Các chính tinh khác tại cung ${data.palaceName}`} minimal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherStarsForTopic.slice(0, 13).map(s => (
              <Link
                key={s}
                href={`/knowledge/${STAR_TO_SLUG[s]}/${topic}`}
                style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  borderRadius: '999px',
                  color: 'var(--tx-2)',
                  textDecoration: 'none',
                }}
              >
                {tStar(s)} tại cung {data.palaceName}
              </Link>
            ))}
          </div>
        </Section>

        {/* Link Cổ tịch */}
        <div style={{
          marginTop: '40px',
          padding: '16px 20px',
          background: 'rgba(184,146,42,0.04)',
          border: '1px dashed rgba(184,146,42,0.25)',
          borderRadius: '10px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: 'var(--ac-dim)', letterSpacing: '0.15em', marginBottom: '6px' }}>
            Muốn tra cứu nguyên tác?
          </div>
          <Link href="/library" style={{ fontSize: '13px', color: 'var(--ac)', fontWeight: 500, letterSpacing: '0.05em', textDecoration: 'none' }}>
            📜 Tra cứu Kho Cổ Tịch Nguyên Văn — Tử Vi Đẩu Số Toàn Tập / Toàn Thư / Cốt Tủy Phú →
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(184,146,42,0.15)', padding: '20px 24px', textAlign: 'center', fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.05em' }}>
        <div style={{ marginBottom: '6px' }}>Nghiên Cứu Tử Vi Đẩu Số · Hệ Thống Chính Tông Cổ Điển · Dành Cho Học Tập & Tham Khảo</div>
        <div style={{ opacity: 0.85 }}>Thông tin mang tính tham khảo văn hóa cổ truyền, không cấu thành lời khuyên y tế, đầu tư hay pháp lý</div>
      </footer>
    </div>
  );
}

function Section({ title, children, gradient, minimal }: { title: string; children: React.ReactNode; gradient?: boolean; minimal?: boolean }) {
  return (
    <section style={{ marginBottom: minimal ? '24px' : '32px' }}>
      <h2 style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        color: 'var(--ac)',
        fontWeight: 600,
        letterSpacing: '0.15em',
        marginBottom: '12px',
      }}>
        <span style={{ width: '4px', height: '14px', background: 'var(--ac)', borderRadius: '2px' }} />
        {title}
      </h2>
      <div style={{
        background: gradient
          ? 'linear-gradient(135deg, rgba(212,169,72,0.12) 0%, rgba(184,146,42,0.04) 100%)'
          : 'white',
        border: '1px solid rgba(184,146,42,0.15)',
        borderRadius: '10px',
        padding: minimal ? '14px 18px' : '20px 22px',
      }}>
        {children}
      </div>
    </section>
  );
}