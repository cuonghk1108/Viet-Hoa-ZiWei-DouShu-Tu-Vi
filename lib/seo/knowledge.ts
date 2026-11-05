/**
 * SEO 知识页 — 数据 helper
 *
 * 14 主星 × 13 topic = 182 个独立 SEO URL
 * 每页都是 STAR_DB 中对应字段的 4 段 markers（一句话定调/核心论断/命盘依据/经典出处）
 */

import { STAR_DB } from '@/lib/ziwei/db-analysis';
import type { TopicKey } from '@/lib/ziwei/db-analysis';
import { TOPIC_PALACE_NAME, TOPIC_LABEL } from '@/lib/ziwei/db-analysis';

export const ALL_STARS = [
  '紫微', '天机', '太阳', '武曲', '天同', '廉贞', '天府',
  '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '破军',
];

// 主星名 ↔ 拼音 slug 映射（URL 用 slug，避免中文 URL 在 Vercel/CDN 上的边界问题）
export const STAR_TO_SLUG: Record<string, string> = {
  '紫微': 'ziwei',
  '天机': 'tianji',
  '太阳': 'taiyang',
  '武曲': 'wuqu',
  '天同': 'tiantong',
  '廉贞': 'lianzhen',
  '天府': 'tianfu',
  '太阴': 'taiyin',
  '贪狼': 'tanlang',
  '巨门': 'jumen',
  '天相': 'tianxiang',
  '天梁': 'tianliang',
  '七杀': 'qisha',
  '破军': 'pojun',
};

export const SLUG_TO_STAR: Record<string, string> = Object.fromEntries(
  Object.entries(STAR_TO_SLUG).map(([k, v]) => [v, k])
);

export const ALL_TOPICS: TopicKey[] = [
  'overview', 'personality', 'love', 'career', 'wealth', 'health',
  'family', 'children', 'move', 'friends', 'home', 'spirit', 'parents',
];

interface StarContent {
  mingGong: string;
  personality: string;
  xiongDi?: string;
  fuQi: string;
  ziNv?: string;
  caiBo: string;
  jiE: string;
  qianYi?: string;
  jiaoYou?: string;
  guanLu: string;
  tianZhai?: string;
  fuDe?: string;
  fuMu?: string;
}

const TOPIC_TO_FIELD: Record<TopicKey, keyof StarContent> = {
  overview:    'mingGong',
  personality: 'personality',
  love:        'fuQi',
  career:      'guanLu',
  wealth:      'caiBo',
  health:      'jiE',
  family:      'xiongDi' as keyof StarContent,
  children:    'ziNv' as keyof StarContent,
  move:        'qianYi' as keyof StarContent,
  friends:     'jiaoYou' as keyof StarContent,
  home:        'tianZhai' as keyof StarContent,
  spirit:      'fuDe' as keyof StarContent,
  parents:     'fuMu' as keyof StarContent,
};

interface ParsedContent {
  dingdiao: string;
  lundian: string;
  yiju: string;
  chuchu: string;
  raw: string;
  hasMarkers: boolean;
}

function parseStarContent(content: string): ParsedContent {
  const out: ParsedContent = { dingdiao: '', lundian: '', yiju: '', chuchu: '', raw: content, hasMarkers: false };
  if (!content) return out;
  if (!content.includes('**【一句话定调】**') && !content.includes('**【核心论断】**')) {
    out.lundian = content;
    return out;
  }
  out.hasMarkers = true;
  const re = /\*\*【([^】]+)】\*\*/g;
  const parts: { name: string; markerEnd: number; start: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    parts.push({ name: m[1], start: m.index, markerEnd: m.index + m[0].length });
  }
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const end = i + 1 < parts.length ? parts[i + 1].start : content.length;
    const text = content.slice(p.markerEnd, end).trim();
    if (p.name === '一句话定调' || p.name === 'Định điệu một câu') out.dingdiao = text;
    else if (p.name === '核心论断' || p.name === 'Luận đoán cốt lõi') out.lundian = text;
    else if (p.name === '命盘依据' || p.name === 'Căn cứ mệnh bàn') out.yiju = text;
    else if (p.name === '经典出处' || p.name === 'Xuất xứ kinh điển') out.chuchu = text;
  }
  return out;
}

export interface KnowledgeData {
  star: string;
  topic: TopicKey;
  topicLabel: string;
  palaceName: string;
  parsed: ParsedContent;
  exists: boolean;
}

export function getKnowledge(star: string, topic: TopicKey): KnowledgeData {
  const profile = STAR_DB[star] as StarContent | undefined;
  const field = TOPIC_TO_FIELD[topic];
  const content = profile && field ? (profile[field] as string | undefined) ?? '' : '';
  return {
    star,
    topic,
    topicLabel: TOPIC_LABEL[topic],
    palaceName: TOPIC_PALACE_NAME[topic],
    parsed: parseStarContent(content),
    exists: Boolean(content),
  };
}

/** 生成所有 14×13 组合（用于 generateStaticParams） */
export function getAllKnowledgeRoutes() {
  const routes: { star: string; slug: string; topic: TopicKey }[] = [];
  for (const star of ALL_STARS) {
    for (const topic of ALL_TOPICS) {
      const data = getKnowledge(star, topic);
      if (data.exists) routes.push({ star, slug: STAR_TO_SLUG[star], topic });
    }
  }
  return routes;
}

/** 主星属性简介（用于 SEO 页"了解 XX 星"section） */
export const STAR_BRIEF_SEO: Record<string, string> = {
  '紫微': 'Tử Vi là Đế tinh, chủ tôn quý, hóa khí vi Tôn. Thủ Mệnh có khí chất lãnh đạo, tôn nghiêm, hợp nền tảng lớn và vị trí quản lý cao.',
  '天机': 'Thiên Cơ là Trí tuệ tinh, chủ thiện biến linh hoạt, hóa khí vi Thiện. Thủ Mệnh thông minh cơ mưu, giỏi hoạch định chiến lược, phụ tá đắc lực.',
  '太阳': 'Thái Dương là Quý tinh, chủ danh dự công vụ, hóa khí vi Quý. Thủ Mệnh quang minh lỗi lạc, khẳng khái nhiệt tình, hợp công quyền và danh tiếng.',
  '武曲': 'Vũ Khúc là Tài tinh, chủ cương nghị quyết đoán, hóa khí vi Tài. Thủ Mệnh ý chí kiên định, năng lực tài chính mạnh mẽ, hợp kinh doanh và tài chính.',
  '天同': 'Thiên Đồng là Phúc tinh, chủ ôn hòa hưởng lạc, hóa khí vi Phúc. Thủ Mệnh tính tình đôn hậu hiền hòa, nhân duyên tốt, hậu vận an khang hưởng phúc.',
  '廉贞': 'Liêm Trinh là Thứ Đào Hoa, văn võ kiêm toàn, hóa khí vi Tù. Thủ Mệnh đa tài đa nghệ, cá tính cương trực, tình cảm phong phú, phong cách quyết liệt.',
  '天府': 'Thiên Phủ là Nam Đẩu Lệnh tinh, chủ vững vàng cẩn trọng, hóa khí vi Lệnh. Thủ Mệnh phong thái đĩnh đạc, tài khố đầy đủ, giỏi giữ gìn và quản trị.',
  '太阴': 'Thái Âm là Phú tinh (Mặt Trăng), chủ điền trạch tài lộc, hóa khí vi Phú. Thủ Mệnh tâm tư tinh tế nhu hòa, giàu óc thẩm mỹ, nữ mệnh đại cát.',
  '贪狼': 'Tham Lang là Đào Hoa dục vọng tinh, nhiều tài hoa giao thiệp, hóa khí vi Đào Hoa. Thủ Mệnh hoạt bát, quảng giao, nhiều tham vọng và đa tài nghệ.',
  '巨门': 'Cự Môn là Ám tinh chủ khẩu tài tài biện luận, hóa khí vi Ám. Thủ Mệnh ăn nói sắc bén, tư duy logic, hợp công việc tư vấn, giảng dạy, pháp lý, truyền thông.',
  '天相': 'Thiên Tướng là Ấn tinh phò tá, chủ trung hậu thành tín, hóa khí vi Ấn. Thủ Mệnh phẩm hạnh đoan chính, xử sự công tâm, hợp tham mưu cố vấn, pháp chế.',
  '天梁': 'Thiên Lương là Ấm tinh (Thọ tinh), giỏi phùng hung hóa cát, hóa khí vi Ấm. Thủ Mệnh từ bi bác ái, chính trực thanh cao, hợp y dược, pháp luật, giáo dục.',
  '七杀': 'Thất Sát là Tướng tinh dũng mãnh, chủ cô độc quyết đoán mạo hiểm, hóa khí vi Quyền Sát. Thủ Mệnh cương nghị kiên cường, dám nghĩ dám làm, hợp khởi nghiệp.',
  '破军': 'Phá Quân là Dũng tinh tiên phong, chủ biến động đổi mới không ngừng, hóa khí vi Hao. Thủ Mệnh sáng tạo độc đáo, dám phá vỡ lối mòn, hợp kỹ thuật công nghệ.',
};