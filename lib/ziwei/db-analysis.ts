/**
 * lib/ziwei/db-analysis —— Bản mã nguồn mở (STAR_DB nội dung rút gọn)
 *
 * Bản hoàn chỉnh chứa 14 Chính tinh × 13 Cung vị ngữ cảnh luận đoán chi tiết
 * (Định điệu một câu / Luận đoán cốt lõi / Căn cứ mệnh bàn / Xuất xứ kinh điển).
 */

export type TopicKey =
  | 'overview' | 'personality' | 'love' | 'career' | 'wealth' | 'health'
  | 'family' | 'children' | 'move' | 'friends' | 'home' | 'spirit' | 'parents';

// iztro zh-CN tên cung vị
export const TOPIC_PALACE_NAME: Record<TopicKey, string> = {
  overview:    'Mệnh',
  personality: 'Mệnh',
  love:        'Phu Thê',
  career:      'Quan Lộc',
  wealth:      'Tài Bạch',
  health:      'Tật Ách',
  family:      'Huynh Đệ',
  children:    'Tử Tức',
  move:        'Thiên Di',
  friends:     'Nô Bộc',
  home:        'Điền Trạch',
  spirit:      'Phúc Đức',
  parents:     'Phụ Mẫu',
};

export const TOPIC_LABEL: Record<TopicKey, string> = {
  overview:    'Tổng quan Mệnh cách',
  personality: 'Tính cách đặc trưng',
  love:        'Tình duyên & Hôn nhân',
  career:      'Sự nghiệp & Công danh',
  wealth:      'Tài lộc & Vận tiền',
  health:      'Sức khỏe & Tật ách',
  family:      'Huynh đệ & Hợp tác',
  children:    'Tử tức & Con cái',
  move:        'Thiên di & Xuất hành',
  friends:     'Bạn bè & Quý nhân',
  home:        'Điền trạch & Nhà đất',
  spirit:      'Phúc đức & Tinh thần',
  parents:     'Phụ mẫu & Trưởng bối',
};

/**
 * Kho luận giải mở rộng
 */
export const STAR_DB: Record<string, unknown> = {};