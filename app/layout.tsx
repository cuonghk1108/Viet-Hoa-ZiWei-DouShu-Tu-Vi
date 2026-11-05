import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tử Vi Đẩu Số · Luận Giải Lá Số Mệnh Lý Chính Tông',
  description: 'Hệ thống an sao lập lá số Tử Vi Đẩu Số chuẩn xác, kết hợp Chân Thái Dương Thời theo kinh độ, 14 chính tinh, 12 cung vị, luận giải đại hạn, lưu niên, sự nghiệp, tài lộc, tình duyên',
  keywords: 'tử vi, tử vi đẩu số, an sao tử vi, lá số tử vi, 14 chính tinh, 12 cung, luận giải tử vi, chân thái dương thời, đại hạn, lưu niên',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tử Vi Đẩu Số · Luận Giải Lá Số Mệnh Lý Chính Tông',
    description: 'Hệ thống an sao lập lá số Tử Vi Đẩu Số chuẩn xác, kết hợp Chân Thái Dương Thời theo kinh độ, 14 chính tinh, 12 cung vị, luận giải đại hạn, lưu niên, sự nghiệp, tài lộc, tình duyên',
    url: SITE_URL,
    siteName: 'Tử Vi Nghiên Cứu',
    locale: 'vi_VN',
    type: 'website',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '808FFC6023A2C359B375DD860FEDA856',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ziwei-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();` }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
