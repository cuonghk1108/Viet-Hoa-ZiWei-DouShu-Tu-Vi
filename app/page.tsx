'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import StarField from '@/components/StarField';
import { useTheme, type Theme } from '@/components/ThemeProvider';
import AnnouncementModal from '@/components/AnnouncementModal';
import { tStar, tSiHua } from '@/lib/ziwei/i18n-vi';

// ─── Wrapper cuộn vào màn hình ────────────────────────────
function FadeIn({
  children, delay = 0, y = 28, className = '',
}: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WeakBoundary({ line }: { line: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
      style={{ background: `linear-gradient(to bottom, ${line}, transparent)`, opacity: 0.45 }} />
  );
}

// ─── Nút chuyển đổi giao diện Sáng / Tối ───────────────────
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
      style={{
        borderColor: isDark ? 'rgba(212,168,67,0.3)' : 'rgba(140,100,20,0.35)',
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,252,242,0.85)',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}
    >
      <div className="relative w-10 h-5 rounded-full flex-shrink-0"
        style={{
          background: isDark ? 'rgba(12,24,64,0.95)' : 'rgba(230,195,80,0.55)',
          transition: 'background 0.35s ease',
        }}>
        <motion.div
          animate={{ x: isDark ? 2 : 22 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="absolute top-1 w-3.5 h-3.5 rounded-full"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #b8a050, #e8d090)'
              : 'linear-gradient(135deg, #e89010, #f8d050)',
          }}
        />
      </div>
      <span className="text-[11px] font-medium tracking-wide select-none"
        style={{
          color: isDark ? 'rgba(212,180,100,0.85)' : 'rgba(110,72,8,0.8)',
          transition: 'color 0.35s ease',
        }}>
        {isDark ? 'Tối' : 'Sáng'}
      </span>
    </motion.button>
  );
}

// ─── Dữ liệu 14 Chính Tinh ─────────────────────────────────
const STARS = [
  { name: 'Tử Vi', raw: '紫微' }, { name: 'Thiên Cơ', raw: '天机' },
  { name: 'Thái Dương', raw: '太阳' }, { name: 'Vũ Khúc', raw: '武曲' },
  { name: 'Thiên Đồng', raw: '天同' }, { name: 'Liêm Trinh', raw: '廉贞' },
  { name: 'Thiên Phủ', raw: '天府' }, { name: 'Thái Âm', raw: '太阴' },
  { name: 'Tham Lang', raw: '贪狼' }, { name: 'Cự Môn', raw: '巨门' },
  { name: 'Thiên Tướng', raw: '天相' }, { name: 'Thiên Lương', raw: '天梁' },
  { name: 'Thất Sát', raw: '七杀' }, { name: 'Phá Quân', raw: '破军' },
];

// ─── Các tính năng nổi bật ────────────────────────────────
const FEATURES = [
  {
    tag: 'HỆ THỐNG AN SAO',
    title: 'Tử Vi Đẩu Số\nChính Tông Cổ Truyền',
    subtitle: 'Nghiêm ngặt tuân thủ quy tắc thuật số truyền thống, không đơn giản hóa',
    points: [
      'Nạp âm ngũ hành định cục số chính xác, không dùng thuật toán giản lược',
      'An Mệnh nghịch đếm giờ sinh, Thân thuận đếm giờ sinh chuẩn quy tắc cổ',
      'Mười bốn chính tinh và tứ hóa phi tinh diễn dịch chuẩn chỉ, cấu trúc minh bạch',
    ],
  },
  {
    tag: 'HIỂN THỊ TINH BÀN',
    title: 'Đầy Đủ 14 Chính Tinh\nVà Tứ Hóa Phi Tinh',
    subtitle: 'Bố cục khoa học, sáng sủa, dễ dàng bao quát toàn bộ thế trận',
    points: [
      '14 chính tinh an vị rõ ràng, mối quan hệ hội chiếu trực quan dễ đọc',
      'Phụ tinh và sát tinh bố trí cân đối, không bỏ sót cát hung ẩn tàng',
      'Phân cấp độ sáng Miếu Vượng Đắc Hãm chuẩn xác, nhận diện cường nhược nhanh chóng',
      'Nhấp vào bất kỳ sao nào để xem ngay phần luận giải chi tiết ý nghĩa',
    ],
  },
  {
    tag: 'LUẬN GIẢI CHUYÊN SÂU',
    title: 'Luận Đoán Đa Chiều\nThấu Tỏ Bản Thân',
    subtitle: 'Hệ thống tri thức Tử Vi bác đại tinh thâm kết hợp trợ lý AI',
    points: [
      'Phân tích bản mệnh: từ chính tinh tọa Mệnh kết hợp Tam Phương Tứ Chính để phác họa khí chất cốt lõi',
      'Sáu phương diện trọng yếu: Công danh sự nghiệp, Tình duyên hôn nhân, Tài vận, Thể trạng sức khỏe, Gia đạo, Con cái',
      'Theo dõi vận trình: Trọng tâm đại hạn 10 năm và gợi ý hành động cụ thể cho lưu niên từng năm',
      'Hỏi đáp tự do: Trực tiếp đặt câu hỏi cụ thể về công việc, xuất ngoại, tài lộc trên lá số của bạn',
    ],
  },
  {
    tag: 'NHẬN DIỆN CÁCH CỤC',
    title: 'Tự Động Phát Hiện\nCác Cách Cục Đặc Biệt',
    subtitle: 'Tìm ra tiềm năng vượt trội từ sự phối chiếu của các vì sao',
    points: [
      'Tự động nhận diện các cách cục trứ danh: Tử Phủ Đồng Cung, Sát Phá Tham, Cơ Nguyệt Đồng Lương, Phủ Tướng Triều Viên...',
      'Phân tích chính xác điều kiện đủ, điểm gia tăng cát lợi và các yếu tố phá cách',
      'Cảnh báo các trường hợp Hóa Kỵ hoặc sát tinh xung phá để chủ động phòng tránh',
      'Xếp hạng cát hung rõ rệt giúp bạn nhìn thấu cơ hội và thử thách trong đời',
    ],
  },
];

// ─── 4 Phân hệ nghiên cứu ─────────────────────────────────
const SECTIONS = [
  {
    key: 'ziwei',
    name: 'Tử Vi',
    en: 'Zi Wei',
    desc: '14 Chính Tinh · 12 Cung Vị · Luận Giải',
    status: 'ready' as const,
    when: 'Hiện tại',
    icon: '◉',
    note: 'Đã sẵn sàng',
  },
  {
    key: 'tianji',
    name: 'Thiên Kỷ',
    en: 'Tian Ji',
    desc: 'Tử Vi · Kinh Dịch · Kỳ Môn Độn Giáp',
    status: 'soon' as const,
    when: 'Giai đoạn 2',
    icon: '⊙',
    note: 'Đang phát triển',
  },
  {
    key: 'diji',
    name: 'Địa Kỷ',
    en: 'Di Ji',
    desc: 'Địa Lý Phong Thủy · Địa Mạch Môi Trường',
    status: 'soon' as const,
    when: 'Giai đoạn 3',
    icon: '⊞',
    note: 'Nghiên cứu',
  },
  {
    key: 'renji',
    name: 'Nhân Kỷ',
    en: 'Ren Ji',
    desc: 'Hoàng Đế Nội Kinh · Thương Hàn · Dưỡng Sinh',
    status: 'soon' as const,
    when: 'Giai đoạn 4',
    icon: '⊕',
    note: '',
  },
];

// ─── Giáo lý cốt lõi ──────────────────────────────────────
const NI_TEACHINGS = [
  {
    title: 'Cung Mệnh làm gốc, Tam Phương làm dụng',
    body: 'Xem lá số Tử Vi trước hết phải nhìn cung Mệnh. Chính tinh cung Mệnh quyết định khí chất và tính cách bẩm sinh; tam phương (Tài Bạch, Quan Lộc, Thiên Di) quyết định môi trường dụng võ. Bốn cung vị tương tác tạo nên bức tranh toàn cảnh đời người.',
  },
  {
    title: 'Mượn sao đối cung, tuyệt đối không xem nhẹ',
    body: 'Điểm tinh tế của Tử Vi nằm ở đối cung. Khi một cung vị rơi vào thế Vô Chính Diệu (không có chính tinh tọa thủ), bắt buộc phải mượn chính tinh ở cung đối diện chiếu về để luận đoán. Hai cung đối xung tương tác mật thiết với nhau.',
  },
  {
    title: 'Tứ Hóa - bàn tay vô hình chuyển dịch vận thế',
    body: 'Tinh đẩu chỉ là nền tảng, Tứ Hóa (Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ) mới là chìa khóa then chốt định hình cát hung thời vận. Cùng một ngôi sao, khi đắc Hóa Lộc hay gặp Hóa Kỵ sẽ mang đến quỹ đạo hoàn toàn trái ngược.',
  },
  {
    title: 'Đại hạn mười năm, thời vận tuần hoàn',
    body: 'Đời người trải qua các đại hạn, mỗi đại hạn kéo dài 10 năm chuyển dời qua từng cung vị. Hiểu rõ bản thân đang ở đại hạn nào, có cát tinh sát tinh ra sao sẽ giúp bạn nắm bắt đúng thời cơ và đưa ra lựa chọn sáng suốt.',
  },
];

// ─── Theme color helper ──────────────────────────────────
function useColors(theme: Theme) {
  const d = theme === 'dark';
  return {
    bgBase:       d ? '#020810'                                : '#f5efe0',
    navBg:        d ? '#020810'                                : '#f5efe0',
    navBorder:    d ? 'rgba(255,255,255,0.05)'                : 'rgba(160,120,30,0.15)',
    goldGrad:     d ? 'linear-gradient(160deg,#c8993a 0%,#f0d070 40%,#c8993a 70%,#f0c755 100%)'
                    : 'linear-gradient(160deg,#6a4206 0%,#9a6a10 40%,#6a4206 70%,#885010 100%)',
    goldSolid:    d ? '#d4a843'                               : '#8b6410',
    goldLine:     d ? 'rgba(212,168,67,0.4)'                  : 'rgba(140,100,20,0.4)',
    tagText:      d ? 'rgba(212,168,67,0.6)'                  : 'rgba(120,80,10,0.65)',
    textPrimary:  d ? '#e8eef6'                               : '#1a1d24',
    textSecond:   d ? '#b8c6df'                               : '#3a3f4a',
    textMuted:    d ? '#9db0d0'                               : '#5a6275',
    textFaint:    d ? 'rgba(240,246,255,0.56)'                : '#9da4b3',
    accent:       d ? '#3a78d4'                               : '#3a5a82',
    accentSoft:   d ? 'rgba(58,120,212,0.18)'                 : 'rgba(58,90,130,0.10)',
    cardBg:       d ? 'rgba(255,255,255,0.05)'                : 'rgba(255,255,255,0.88)',
    cardBorder:   d ? 'rgba(255,255,255,0.10)'                : 'rgba(200,160,60,0.25)',
    cardShadow:   d ? '0 4px 32px rgba(0,0,0,0.5)'           : '0 4px 24px rgba(140,100,20,0.12)',
    featureBg:    d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.75)',
    featureBord:  d ? 'rgba(255,255,255,0.08)'                : 'rgba(200,160,60,0.2)',
    glowTint:     d ? 'rgba(212,168,67,0.07)'                 : 'rgba(180,140,40,0.06)',
    glowBlue:     d ? 'rgba(40,80,160,0.12)'                  : 'rgba(58,90,130,0.06)',
    glowPurple:   d ? 'rgba(120,50,180,0.08)'                 : 'rgba(96,80,140,0.04)',
    niBg:         d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.8)',
    niBorder:     d ? 'rgba(212,168,67,0.2)'                  : 'rgba(180,130,40,0.25)',
    niDivider:    d ? 'rgba(255,255,255,0.08)'                : 'rgba(180,130,40,0.12)',
    niCardBg:     d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.9)',
    niCardBord:   d ? 'rgba(255,255,255,0.08)'                : 'rgba(200,160,60,0.2)',
    niCardShadow: d ? '0 2px 20px rgba(0,0,0,0.4)'           : '0 2px 16px rgba(140,100,20,0.1)',
    starBg:       d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.7)',
    starBorder:   d ? 'rgba(212,168,67,0.22)'                 : 'rgba(160,120,30,0.3)',
    starText:     d ? 'rgba(212,168,67,0.7)'                  : 'rgba(120,80,10,0.7)',
    ctaBg:        d ? 'linear-gradient(135deg,#b8892a,#f0d070,#b8892a)'
                    : 'linear-gradient(135deg,#6a4206,#9a6810,#6a4206)',
    ctaText:      d ? '#08080a'                               : '#f8f3e8',
    footerText:   d ? 'rgba(255,255,255,0.08)'                : '#d0b878',
    scrollLine:   d ? 'rgba(212,168,67,0.3)'                  : 'rgba(140,100,20,0.3)',
    scrollText:   d ? 'rgba(255,255,255,0.12)'                : '#c0a870',
    altSection:   d ? 'rgba(255,255,255,0.02)'                : 'rgba(255,255,255,0.4)',
    quoteBg:      d ? 'rgba(212,168,67,0.04)'                 : 'rgba(255,255,255,0.9)',
  };
}

// ─── Tóm tắt Tứ Hóa ───────────────────────────────────────
const SIHUA_BRIEF: Record<string, { attr: string; brief: string }> = {
  'Hóa Lộc': { attr: 'Cát hóa · Gia tăng', brief: 'Chủ tài lộc dồi dào, phúc khí gia tăng. Tọa cung nào thì sự vụ nơi đó hanh thông, là cát tinh được hoan nghênh nhất.' },
  'Hóa Quyền': { attr: 'Cát hóa · Quyền uy', brief: 'Chủ quyền bính, năng lực lãnh đạo và sự quyết đoán. Đắc vị tại Quan Lộc và Mệnh cung chủ nắm thực quyền lớn.' },
  'Hóa Khoa': { attr: 'Cát hóa · Danh vọng', brief: 'Chủ văn chương, thanh danh, quý nhân tương trợ và thi cử đỗ đạt. Rất lợi cho học thuật, danh tiếng.' },
  'Hóa Kỵ': { attr: 'Hung hóa · Trắc trở', brief: 'Chủ chấp niệm, biến động và trở ngại. Cung vị có Hóa Kỵ cần đặc biệt chú ý, là bài học tôi luyện lớn của đời người.' },
};

// ─── Tóm tắt 14 Chính Tinh ─────────────────────────────────
const STAR_BRIEF: Record<string, { attr: string; brief: string }> = {
  'Tử Vi': { attr: 'Hành Thổ · Đế Vương Tinh', brief: 'Chủ tôn quý, thống ngự quần tinh. Người có Tử Vi thủ Mệnh mang khí chất lãnh đạo bẩm sinh, tự trọng cao, độc lập tác chiến.' },
  'Thiên Cơ': { attr: 'Hành Mộc · Trí Tuệ Tinh', brief: 'Chủ trí mưu, mẫn tiệp và biến động. Đầu óc nhanh nhạy, tư duy chiến lược sâu sắc, thích hợp làm cố vấn, công nghệ, kế hoạch.' },
  'Thái Dương': { attr: 'Hành Hỏa · Quan Lộc Chủ', brief: 'Tượng trưng cho mặt trời, quang minh chính đại, hào sảng phóng khoáng. Đắc địa tại Dần - Ngọ, danh tiếng vang dội.' },
  'Vũ Khúc': { attr: 'Hành Kim · Tài Bạch Chủ', brief: 'Chủ tài chính và sự quyết đoán. Ý chí kiên cường, hành động dứt khoát, thích hợp ngành tài chính, kinh doanh, quân sự.' },
  'Thiên Đồng': { attr: 'Hành Thủy · Phúc Đức Tinh', brief: 'Chủ phúc lộc, an nhàn và hòa hợp nhân duyên. Tính tình ôn hậu, thiện lương, dĩ hòa vi quý, hậu vận an lạc.' },
  'Liêm Trinh': { attr: 'Hành Hỏa · Đa Tài Tinh', brief: 'Thứ đào hoa tinh, vừa có tài năng nghệ thuật xuất sắc vừa quyết đoán. Đi cùng Thiên Tướng thành cách quyền bính hanh thông.' },
  'Thiên Phủ': { attr: 'Hành Thổ · Tài Khố Tinh', brief: 'Nam Đẩu chủ tinh, kho tiền bạc và tích lũy. Tính trầm tĩnh, chu toàn, giỏi gìn giữ tài sản và quản trị doanh nghiệp.' },
  'Thái Âm': { attr: 'Hành Thủy · Điền Trạch Chủ', brief: 'Chủ tài lộc ngầm, đất đai nhà cửa và sự dịu dàng nhu hậu. Rất lợi cho nữ giới, đắc địa tại Hợi Tý rực rỡ.' },
  'Tham Lang': { attr: 'Hành Mộc/Thủy · Đào Hoa Tinh', brief: 'Đệ nhất đào hoa, đa tài đa nghệ, dục vọng và chí tiến thủ cao. Hội cùng Hỏa Tinh hoặc Linh Tinh bộc phát đại phú.' },
  'Cự Môn': { attr: 'Hành Thủy · Ám Tinh Khẩu Tài', brief: 'Chủ lời ăn tiếng nói, phản biện sắc sảo. Hóa Lộc hoặc Hóa Quyền thành cách "khẩu thiệt sinh tài", đại lợi ngành nói.' },
  'Thiên Tướng': { attr: 'Hành Thủy · Ấn Tinh Phò Tá', brief: 'Chủ chức vị, ấn tín và phụ tá trung lương. Trọng chữ tín, quy củ, thích hợp vai trò quản lý điều hành và hành chính.' },
  'Thiên Lương': { attr: 'Hành Thổ · Ấm Tinh Thọ Tinh', brief: 'Chủ che chở, bảo bọc, y dược và đạo đức. Người có lòng trắc ẩn lớn, hay giúp đỡ kẻ yếu, tiền hung hậu cát.' },
  'Thất Sát': { attr: 'Hành Kim/Hỏa · Tướng Tinh Dũng Mãnh', brief: 'Tướng tiên phong trong quân ngũ, cương liệt, quyết đoán, dám nghĩ dám làm. Giỏi mở đường khai phá, độc lập tác chiến.' },
  'Phá Quân': { attr: 'Hành Thủy · Hao Tinh Đột Phá', brief: 'Tiên phong dũng tướng, phá cũ dựng mới, tinh thần cách mạng không ngừng nghỉ. Hóa Lộc thì sự nghiệp chuyển biến rực rỡ.' },
};

// ─── Phần thị giác trang trí ──────────────────────────────
function FeatureVisual({ index, colors: c }: { index: number; colors: ReturnType<typeof useColors> }) {
  if (index === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <div className="grid grid-cols-4 gap-1.5 w-72 mx-auto">
          {Array.from({ length: 16 }).map((_, i) => {
            const isCenter = [5, 6, 9, 10].includes(i);
            const isActive = [0, 3, 12, 15].includes(i);
            return (
              <motion.div key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="h-14 rounded-sm flex items-center justify-center text-xs transition-all duration-300"
                style={{
                  border: `1px solid ${isActive ? c.goldLine : c.cardBorder}`,
                  background: isCenter ? 'transparent' : isActive ? c.starBg : c.featureBg,
                  color: isActive ? c.goldSolid : c.textFaint,
                  opacity: isCenter ? 0 : 1,
                }}>
                {isActive ? '★' : ''}
              </motion.div>
            );
          })}
        </div>
        <p className="text-[10px] tracking-widest transition-colors duration-300 font-semibold"
          style={{ color: c.textFaint }}>BÀN CỜ 12 CUNG CHÍNH TÔNG</p>
      </div>
    );
  }

  if (index === 1) {
    const [sel, setSel] = useState<string | null>(null);
    const selInfo = sel ? (STAR_BRIEF[sel] ?? SIHUA_BRIEF[sel] ?? null) : null;
    return (
      <div className="flex flex-col gap-4 h-full justify-center">
        {[
          { group: 'Tử Vi Hệ (6 Tinh)', stars: ['Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh'] },
          { group: 'Thiên Phủ Hệ (8 Tinh)', stars: ['Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương', 'Thất Sát', 'Phá Quân'] },
        ].map(group => (
          <div key={group.group}>
            <div className="text-[11px] tracking-widest mb-2 transition-colors duration-300 font-medium"
              style={{ color: c.textFaint }}>{group.group}</div>
            <div className="flex flex-wrap gap-1.5">
              {group.stars.map(s => (
                <motion.button key={s}
                  onClick={() => setSel(sel === s ? null : s)}
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="text-xs px-2.5 py-1 rounded-md cursor-pointer"
                  style={{
                    border: `1px solid ${sel === s ? c.goldSolid : c.goldLine}`,
                    color: c.goldSolid,
                    background: sel === s ? `${c.goldLine}30` : 'transparent',
                    fontWeight: sel === s ? 600 : 400,
                  }}>
                  {s}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div className="text-[11px] tracking-widest mb-2 transition-colors duration-300 font-medium"
            style={{ color: c.textFaint }}>Tứ Hóa Phi Tinh</div>
          <div className="flex gap-2 flex-wrap">
            {[['Hóa Lộc', 'rgba(52,211,153,0.8)'], ['Hóa Quyền', 'rgba(96,165,250,0.8)'], ['Hóa Khoa', 'rgba(250,204,21,0.8)'], ['Hóa Kỵ', 'rgba(248,113,113,0.8)']].map(([label, color]) => (
              <motion.button key={label}
                onClick={() => setSel(sel === label ? null : label)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="text-xs px-2.5 py-1 rounded-md cursor-pointer"
                style={{
                  border: `1px solid ${color}`,
                  color,
                  background: sel === label ? `${color.replace('0.8', '0.15')}` : 'transparent',
                  fontWeight: sel === label ? 600 : 400,
                }}>
                {label}
              </motion.button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {selInfo && (
            <motion.div key={sel}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl p-4 mt-1.5"
              style={{ border: `1px solid ${c.goldLine}`, background: c.featureBg }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-bold" style={{ color: c.goldSolid }}>{sel}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ color: c.tagText, border: `1px solid ${c.goldLine}` }}>{selInfo.attr}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>{selInfo.brief}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (index === 2) {
    const msgs = [
      { role: 'user', text: 'Năm nay vận thế sự nghiệp của tôi tiến triển thế nào?' },
      { role: 'ai', text: 'Cung Mệnh có Thiên Cơ Hóa Lộc, đại hạn năm nay gặp cung Quan Lộc, tam phương có Tả Phù tương trợ, công việc có quý nhân nâng đỡ, thích hợp mở rộng đầu tư…' },
      { role: 'user', text: 'Giai đoạn nào vận tình duyên thuận lợi nhất?' },
    ];
    return (
      <div className="flex flex-col gap-2 h-full justify-center">
        {msgs.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%] text-[11px] px-3 py-2 rounded-lg leading-relaxed"
              style={{
                border: `1px solid ${m.role === 'user' ? c.goldLine : c.cardBorder}`,
                background: m.role === 'user' ? c.starBg : c.featureBg,
                color: m.role === 'user' ? c.goldSolid : c.textSecond,
              }}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (index === 3) {
    const patterns = [
      { name: 'Cách Sát Phá Tham', desc: 'Mệnh cách dũng mãnh, mở đường khai phá', ok: true },
      { name: 'Cách Liêm Tướng Thanh Chính', desc: 'Nắm giữ ấn tín, quyền uy hành chính', ok: true },
      { name: 'Hóa Kỵ nhập Mệnh', desc: 'Cần lưu ý kiểm soát tâm lý, vượt qua thử thách', ok: false },
    ];
    return (
      <div className="flex flex-col gap-3 h-full justify-center">
        {patterns.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{
              border: `1px solid ${p.ok ? 'rgba(96,165,250,0.25)' : 'rgba(251,146,60,0.25)'}`,
              background: p.ok ? 'rgba(96,165,250,0.05)' : 'rgba(251,146,60,0.05)',
            }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: p.ok ? 'rgba(96,165,250,0.6)' : 'rgba(251,146,60,0.6)' }} />
            <div>
              <div className="text-[11px] font-semibold"
                style={{ color: p.ok ? 'rgba(147,197,253,0.9)' : 'rgba(253,186,116,0.9)' }}>{p.name}</div>
              <div className="text-[10px]" style={{ color: c.textMuted }}>{p.desc}</div>
            </div>
          </motion.div>
        ))}
        <div className="text-[9px] mt-2 tracking-wider text-center" style={{ color: c.textFaint }}>
          Tự động phát hiện các cách cục kinh điển
        </div>
      </div>
    );
  }

  return null;
}

// ─── Trang chủ chính ───────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = useColors(theme);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useLayoutEffect(() => {
    document.documentElement.style.background = c.bgBase;
    document.body.style.background = c.bgBase;
    return () => {
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, [c.bgBase]);

  return (
    <div style={{ background: c.bgBase, transition: 'background 0.35s ease' }} className="overflow-x-hidden">
      {/* Modal thông báo */}
      <AnnouncementModal />

      <StarField />

      {/* Hiệu ứng ánh sáng nền */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(ellipse, ${c.glowTint} 0%, transparent 70%)` }} />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{ background: `radial-gradient(ellipse, ${c.glowBlue} 0%, transparent 70%)` }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{ background: `radial-gradient(ellipse, ${c.glowPurple} 0%, transparent 70%)` }} />
      </div>

      {/* ── Thanh điều hướng đầu trang ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 gap-2"
        style={{
          background: c.navBg,
        }}>
        <div className="text-[12px] sm:text-sm tracking-[0.25em] font-bold transition-colors duration-300 flex-shrink-0"
          style={{ color: c.goldSolid }}>
          TỬ VI ĐẨU SỐ
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/chart')}
            className="text-[11px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-300 font-semibold"
            style={{ border: `1px solid ${c.goldLine}`, color: c.goldSolid }}>
            Lập Lá Số Ngay
          </motion.button>
        </div>
      </nav>

      {/* ══ HERO BANNER ════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[82svh] lg:min-h-[92vh] flex flex-col items-center justify-center px-6 z-10 pb-24 pt-10">
        <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: '960px' }} className="text-center w-full mx-auto mt-10">
          {/* Nhãn giới thiệu */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
            <span className="text-[11px] tracking-[0.35em] transition-colors duration-300 font-semibold uppercase" style={{ color: c.tagText }}>
              Tử Vi Đẩu Số · Tinh Hoa Thuật Số
            </span>
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
          </motion.div>

          {/* Tiêu đề chính */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative', display: 'inline-block' }}>
            <h1
              className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold leading-none mb-5`}
              style={{
                fontSize: 'clamp(48px, 9vw, 110px)',
                letterSpacing: '0.05em',
              }}>
              LÁ SỐ TỬ VI
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-base md:text-lg tracking-[0.1em] mb-2 font-medium"
            style={{ color: c.textSecond }}>
            Tử Vi Vi Môn · Thiên Địa Nhân Vi Lộ · Tri Mệnh Thuận Mệnh
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-xs md:text-sm tracking-[0.2em] mb-6 font-semibold"
            style={{ color: c.textMuted, opacity: 0.85 }}>
            An Sao Chính Tông · Chân Thái Dương Thời
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-sm max-w-xl mx-auto leading-relaxed mb-10"
            style={{ color: c.textMuted }}>
            Nhập ngày tháng năm sinh và giờ sinh để hệ thống an sao lập lá số Tử Vi Đẩu Số chuẩn xác — Khám phá bản mệnh, vận hạn, công danh sự nghiệp và tài lộc.
          </motion.p>

          {/* Nút hành động kêu gọi */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ y: -2, filter: 'brightness(1.06)' }} whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/chart')}
              className="px-12 py-4 font-bold text-base tracking-widest rounded-full shadow-lg"
              style={{ background: c.ctaBg, color: c.ctaText }}>
              LẬP LÁ SỐ NGAY
            </motion.button>
          </motion.div>

          {/* 14 Chính Tinh */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-12 grid grid-cols-7 gap-1.5 max-w-[560px] mx-auto">
            {STARS.map((star, i) => (
              <motion.div key={star.name}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.05 + i * 0.03, duration: 0.35 }}
                className="flex items-center justify-center px-1.5 py-1 rounded-full"
                style={{ background: c.starBg, border: `1px solid ${c.starBorder}` }}>
                <span className="text-[11px] tracking-wide font-medium" style={{ color: c.starText }}>{star.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hộp thông báo góc màn hình Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -4 }}
          transition={{ delay: 1.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute hidden lg:block pointer-events-none"
          style={{
            right: 'clamp(2%, 6vw, 8%)',
            top: '54%',
            maxWidth: '240px',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #fff5e3 0%, #ffe1c0 100%)',
            border: '2px dashed rgba(232,132,62,0.45)',
            borderRadius: '16px',
            padding: '14px 18px',
            boxShadow: '0 8px 24px rgba(196,90,45,0.18), 0 2px 6px rgba(196,90,45,0.1)',
          }}>
            <div style={{ fontSize: '20px', marginBottom: '6px', lineHeight: 1 }}>🎁</div>
            <div style={{ fontSize: '13px', lineHeight: 1.7, color: '#8b3a1a', fontWeight: 600 }}>
              Hệ thống an sao Tử Vi
            </div>
            <div style={{ fontSize: '12px', lineHeight: 1.6, color: '#8b3a1a' }}>
              Hoàn toàn <strong style={{ color: '#c45a2d' }}>miễn phí & chuẩn xác</strong>
            </div>
          </div>
        </motion.div>

        {/* Cuộn trang xem thêm */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: c.scrollText }}>Khám phá thêm</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${c.scrollLine}, transparent)` }} />
        </motion.div>
      </section>

      {/* ══ TRIẾT LÝ MỆNH LÝ ═══════════════════════════════ */}
      <section className="relative z-10 overflow-hidden min-h-[82svh] lg:min-h-[92vh] flex items-center" style={{ padding: '72px 24px' }}>
        <WeakBoundary line={c.navBorder} />
        <div className="absolute inset-0"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to bottom, #020810 0%, #020810 6%, #030a18 22%, #0d0820 40%, #0a0618 68%, #030a18 86%, #020810 100%)'
              : 'linear-gradient(to bottom, #f5efe0 0%, #f5efe0 6%, #c08055 18%, #6a2810 32%, #1e0a02 50%, #1e0a02 70%, #6a2810 84%, #f5efe0 100%)',
            transition: 'background 0.4s ease',
          }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-bold opacity-5" style={{ fontSize: 'clamp(180px, 32vw, 380px)', color: 'var(--t-gold)', lineHeight: 1 }}>☯</span>
        </div>
        <FadeIn className="relative mx-auto text-center w-full" y={20}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.45))' }} />
            <span className="text-[10px] tracking-[0.45em] uppercase font-bold" style={{ color: 'rgba(212,168,67,0.7)' }}>MỆNH · VẬN · QUAN</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.45))' }} />
          </div>
          <div className="space-y-3" style={{ maxWidth: '840px', margin: '0 auto' }}>
            {[
              { text: 'Ý nghĩa của việc thấu tỏ mệnh lý', size: 'clamp(17px, 2.2vw, 28px)', color: 'rgba(215,228,252,0.85)', delay: 0.1 },
              { text: 'Không phải để cam chịu định mệnh', size: 'clamp(21px, 2.6vw, 32px)', color: 'rgba(220,232,250,0.85)', delay: 0.25 },
              { text: 'Mà là để không ngừng thấu hiểu chính mình', size: 'clamp(24px, 3vw, 40px)', color: 'rgba(218,230,248,0.95)', delay: 0.34 },
            ].map((line, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: line.delay }}
                className="tracking-wider" style={{ fontSize: line.size, color: line.color, fontWeight: 500 }}>
                {line.text}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold`}
              style={{ fontSize: 'clamp(24px, 3.4vw, 48px)', letterSpacing: '0.05em', lineHeight: 1.35 }}>
              Tự tay kiến tạo nên kịch bản cuộc đời rực rỡ nhất
            </motion.p>
          </div>
        </FadeIn>
      </section>

      {/* ══ 4 PHÂN HỆ HỌC THUẬT ═════════════════════════════ */}
      <section className="relative z-10 py-20 lg:py-24 px-6"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, transparent 0%, rgba(184,146,42,0.03) 50%, transparent 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(184,146,42,0.04) 50%, transparent 100%)',
        }}>
        <FadeIn className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: c.goldSolid, opacity: 0.8 }}>HỆ THỐNG HỌC THUẬT</span>
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
          </div>
          <div className="text-2xl lg:text-3xl font-bold mb-2 tracking-[0.05em]" style={{ color: c.textPrimary }}>
            Khởi Đầu Từ Tử Vi Đẩu Số
          </div>
          <div className="text-xs lg:text-sm tracking-[0.05em]" style={{ color: c.textMuted }}>
            Từ nền tảng Tử Vi nhập môn, từng bước mở rộng sang Thiên Kỷ, Địa Kỷ và Nhân Kỷ
          </div>
        </FadeIn>

        <div className="max-w-sm lg:max-w-5xl mx-auto relative">
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-4 lg:gap-4">
            {SECTIONS.map((s, i) => {
              const ready = s.status === 'ready';
              return (
                <motion.div key={s.key}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex flex-row lg:flex-col items-center lg:items-center text-left lg:text-center gap-4 lg:gap-0">
                  <div className="relative w-14 h-14 shrink-0 rounded-full flex items-center justify-center lg:mb-3"
                    style={{
                      background: ready
                        ? `linear-gradient(135deg, ${c.goldSolid} 0%, ${c.goldSolid}cc 100%)`
                        : (theme === 'dark' ? 'rgba(184,146,42,0.05)' : '#fdf8ee'),
                      border: ready ? 'none' : `2px dashed ${c.goldLine}`,
                      color: ready ? '#fff' : c.textMuted,
                      boxShadow: ready ? `0 4px 16px ${c.goldSolid}55` : 'none',
                    }}>
                    <span className="text-2xl">{s.icon}</span>
                    {ready && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white"
                        style={{ background: '#10b981', boxShadow: '0 2px 6px rgba(16,185,129,0.4)' }}>
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="flex-1 lg:flex-none flex flex-col items-start lg:items-center min-w-0">
                    <div className="flex items-baseline gap-2 lg:flex-col lg:gap-0 lg:mb-1">
                      <div className="text-[10px] tracking-[0.1em] lg:mb-1.5"
                        style={{ color: ready ? '#10b981' : c.textMuted, fontWeight: 600 }}>
                        {s.when}
                      </div>
                      <div className="text-base lg:text-xl font-bold tracking-[0.05em]"
                        style={{ color: c.textPrimary }}>
                        {s.name}
                      </div>
                      {s.note && (
                        <div className="text-[9px] tracking-[0.05em] px-2 py-0.5 rounded-full"
                          style={{
                            color: c.goldSolid,
                            background: theme === 'dark' ? 'rgba(184,146,42,0.1)' : 'rgba(184,146,42,0.08)',
                            border: `1px solid ${c.goldLine}`,
                          }}>
                          {s.note}
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] lg:text-xs leading-relaxed lg:max-w-[200px] mt-0.5 lg:mt-0"
                      style={{ color: c.textSecond }}>
                      {s.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CHI TIẾT TÍNH NĂNG ═════════════════════════════ */}
      <section className="relative z-10">
        {FEATURES.map((feature, i) => (
          <div key={i}
            className={`flex items-center px-6 md:px-10 lg:px-14 py-20 md:py-24 ${i <= 2 ? 'min-h-[82svh] lg:min-h-[92vh]' : ''}`}
            style={{ background: i % 2 === 1 ? c.altSection : 'transparent' }}>
            <div className="mx-auto w-full" style={{ maxWidth: '1280px' }}>
              <div className={`grid grid-cols-1 ${i % 2 === 0 ? 'lg:grid-cols-[0.45fr_0.55fr]' : 'lg:grid-cols-[0.55fr_0.45fr]'} gap-10 lg:gap-16 items-start ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <FadeIn delay={0}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px w-8" style={{ background: c.goldLine }} />
                      <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: c.tagText }}>{feature.tag}</span>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold leading-tight mb-5 tracking-tight`}
                      style={{
                        fontSize: i < 2 ? 'clamp(32px, 3.5vw, 50px)' : 'clamp(28px, 3vw, 44px)',
                        whiteSpace: 'pre-line',
                      }}>
                      {feature.title}
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <p className="text-base mb-8 leading-relaxed font-medium" style={{ color: c.textSecond }}>{feature.subtitle}</p>
                  </FadeIn>
                  <div className="space-y-4">
                    {feature.points.map((point, j) => (
                      <FadeIn key={j} delay={0.25 + j * 0.08}>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: c.goldSolid, opacity: 0.8 }} />
                          <p className="text-sm leading-relaxed" style={{ color: c.textMuted }}>{point}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <FadeIn delay={0.15}>
                    <div className="relative rounded-2xl overflow-hidden p-8 md:p-12"
                      style={{
                        border: `1px solid ${c.featureBord}`,
                        background: c.featureBg,
                        minHeight: i <= 1 ? '540px' : i === 2 ? '460px' : '320px',
                        boxShadow: c.cardShadow,
                      }}>
                      <FeatureVisual index={i} colors={c} />
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ══ THIÊN · ĐỊA · NHÂN TAM PHÂN LUẬN ═══════════════ */}
      <section className="relative z-10 flex items-center px-6 md:px-10 lg:px-14 py-20"
        style={{ background: c.altSection, minHeight: '82svh' }}>
        <WeakBoundary line={c.navBorder} />
        <div className="mx-auto w-full" style={{ maxWidth: '1280px' }}>
          <FadeIn>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: c.tagText }}>TRIẾT LÝ MỆNH LÝ</span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
              </div>
              <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold mb-5 tracking-tight`}
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Thiên · Địa · Nhân
              </h2>
              <p className="max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: c.textSecond }}>
                Quan điểm mệnh lý truyền thống: Số mệnh chưa bao giờ là toàn bộ cuộc đời.<br />
                Đời người là sự tương tác đồng đẳng của ba chiều không gian quyền năng.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { glyph: 'Thiên', label: 'Mệnh Tiên Thiên', pct: '⅓', color: c.goldSolid, borderColor: c.goldLine, desc: 'Lá số Tử Vi phản ánh cấu trúc tiên thiên: bố cục tinh đẩu, ngũ hành cục số định hình từ thời khắc cất tiếng khóc chào đời. Đây là bức nền của sinh mệnh, chiếm một phần ba.', sub: 'Tinh Bàn · Ngũ Hành Cục' },
              { glyph: 'Địa', label: 'Địa Lý Môi Trường', pct: '⅓', color: 'rgba(96,165,250,0.9)', borderColor: 'rgba(96,165,250,0.3)', desc: 'Nơi chốn sinh sống, kinh độ, hoàn cảnh xã hội, phong thủy và môi trường nuôi dưỡng. Cùng một lá số nhưng sinh trưởng ở hai vùng đất khác nhau sẽ có những trải nghiệm khác biệt.', sub: 'Địa Lý · Phong Thủy · Xã Hội' },
              { glyph: 'Nhân', label: 'Ý Chí & Hành Động', pct: '⅓', color: 'rgba(100,216,139,0.9)', borderColor: 'rgba(100,216,139,0.3)', desc: 'Tâm thái, sự tu dưỡng, ý chí kiên định và những lựa chọn hành động của chính bạn. Thấu hiểu lá số để hoàn thiện bản thân, nỗ lực không ngừng chính là sức mạnh chuyển mệnh lớn nhất.', sub: 'Ý Chí · Lựa Chọn · Hành Động' },
            ].map((item, i) => (
              <FadeIn key={item.glyph} delay={0.1 + i * 0.12}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.1 }}
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{ background: c.cardBg, border: `1px solid ${item.borderColor}`, boxShadow: c.cardShadow }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="text-3xl font-bold leading-none" style={{ color: item.color }}>{item.glyph}</div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: item.color }}>{item.pct}</div>
                      <div className="text-[9px] mt-0.5 tracking-wider" style={{ color: c.textMuted }}>cuộc đời</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm font-semibold mb-0.5" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-[10px] tracking-wider" style={{ color: c.textMuted }}>{item.sub}</div>
                  </div>
                  <div className="h-px mb-4" style={{ background: item.borderColor }} />
                  <p className="text-xs leading-relaxed flex-1" style={{ color: c.textSecond }}>{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BẬC THẦY & LỜI DẠY CỐT LÕI ═══════════════════════ */}
      <section className="relative z-10 flex items-center px-6 md:px-10 lg:px-14 py-20" style={{ minHeight: '82svh' }}>
        <WeakBoundary line={c.navBorder} />
        <div className="mx-auto w-full" style={{ maxWidth: '1280px' }}>
          <FadeIn>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: c.tagText }}>TINH HOA TRUYỀN THỪA</span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
              </div>
              <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold mb-6 tracking-tight`}
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Bốn Trụ Cột Luận Đoán
              </h2>
              <p className="max-w-2xl mx-auto leading-relaxed text-sm" style={{ color: c.textSecond }}>
                Nguyên tắc luận giải theo trường phái Tam Hợp chính tông, chú trọng bản chất tinh đẩu và logic khả chứng
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NI_TEACHINGS.map((teaching, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.1 }}
                  className="rounded-xl p-6 h-full"
                  style={{ border: `1px solid ${c.niCardBord}`, background: c.niCardBg, boxShadow: c.niCardShadow }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mt-0.5"
                      style={{ borderColor: c.goldLine }}>
                      <span className="text-[9px] font-bold" style={{ color: c.goldSolid }}>{i + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold leading-relaxed" style={{ color: c.goldSolid }}>{teaching.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed pl-8" style={{ color: c.textSecond }}>{teaching.body}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ KÊU GỌI HÀNH ĐỘNG CUỐI ══════════════════════════ */}
      <section className="relative z-10 py-32 px-6 text-center" style={{ background: c.altSection }}>
        <FadeIn>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6 font-bold" style={{ color: c.tagText }}>HÀNH TRÌNH KHÁM PHÁ VẬN MỆNH</p>
          <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold mb-8 tracking-tight leading-tight`}
            style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
            Lá Số Tử Vi Của Bạn<br />Đang Chờ Luận Giải
          </h2>
          <p className="text-sm mb-10 max-w-md mx-auto leading-relaxed" style={{ color: c.textSecond }}>
            Nhập ngày giờ sinh để lập lá số chỉ trong vài giây và bắt đầu thấu hiểu bản mệnh
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/chart')}
            className="px-14 py-4 font-bold text-base tracking-widest rounded-full shadow-xl"
            style={{ background: c.ctaBg, color: c.ctaText }}>
            LẬP LÁ SỐ MIỄN PHÍ
          </motion.button>
        </FadeIn>
      </section>

      {/* ══ FOOTER CHÂN TRANG ═══════════════════════════════ */}
      <footer className="relative z-10 py-10 px-6"
        style={{ borderTop: `1px solid ${c.niCardBord}` }}>
        <div className="text-center">
          <p className="text-[11px] tracking-wider mb-2 font-medium" style={{ color: c.goldSolid }}>
            Tử Vi Đẩu Số · Thuật Số Cổ Truyền Phương Đông
          </p>
          <p className="text-[10px] tracking-wider mb-3 max-w-2xl mx-auto leading-relaxed"
            style={{ color: c.footerText, opacity: 0.85 }}>
            Nền tảng phục vụ mục đích nghiên cứu học thuật và tham khảo phát triển bản thân.<br />
            Số mệnh thực sự nằm trong bàn tay, ý chí và hành động của chính bạn.
          </p>
        </div>
      </footer>
    </div>
  );
}
