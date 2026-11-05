/**
 * Từ điển và tiện ích dịch thuật Việt hóa Tử Vi Đẩu Số chuẩn xác (Hán - Việt)
 */

export const VI_STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'] as const;

export const VI_BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;

export const VI_SHICHEN = [
  { branch: 0, name: 'Giờ Tý', range: '23:00 - 01:00' },
  { branch: 1, name: 'Giờ Sửu', range: '01:00 - 03:00' },
  { branch: 2, name: 'Giờ Dần', range: '03:00 - 05:00' },
  { branch: 3, name: 'Giờ Mão', range: '05:00 - 07:00' },
  { branch: 4, name: 'Giờ Thìn', range: '07:00 - 09:00' },
  { branch: 5, name: 'Giờ Tỵ', range: '09:00 - 11:00' },
  { branch: 6, name: 'Giờ Ngọ', range: '11:00 - 13:00' },
  { branch: 7, name: 'Giờ Mùi', range: '13:00 - 15:00' },
  { branch: 8, name: 'Giờ Thân', range: '15:00 - 17:00' },
  { branch: 9, name: 'Giờ Dậu', range: '17:00 - 19:00' },
  { branch: 10, name: 'Giờ Tuất', range: '19:00 - 21:00' },
  { branch: 11, name: 'Giờ Hợi', range: '21:00 - 23:00' },
];

export const VI_PALACE_MAP: Record<string, string> = {
  '命宫': 'Mệnh',
  '兄弟宫': 'Huynh Đệ',
  '夫妻宫': 'Phu Thê',
  '子女宫': 'Tử Tức',
  '财帛宫': 'Tài Bạch',
  '疾厄宫': 'Tật Ách',
  '迁移宫': 'Thiên Di',
  '交友宫': 'Nô Bộc',
  '奴仆宫': 'Nô Bộc',
  '官禄宫': 'Quan Lộc',
  '事业宫': 'Quan Lộc',
  '田宅宫': 'Điền Trạch',
  '福德宫': 'Phúc Đức',
  '父母宫': 'Phụ Mẫu',
  '身宫': 'Thân',
  '命': 'Mệnh',
  '身': 'Thân',
};

export const VI_PALACE_FULL_MAP: Record<string, string> = {
  '命宫': 'Cung Mệnh',
  '兄弟宫': 'Cung Huynh Đệ',
  '夫妻宫': 'Cung Phu Thê',
  '子女宫': 'Cung Tử Tức',
  '财帛宫': 'Cung Tài Bạch',
  '疾厄宫': 'Cung Tật Ách',
  '迁移宫': 'Cung Thiên Di',
  '交友宫': 'Cung Nô Bộc',
  '奴仆宫': 'Cung Nô Bộc',
  '官禄宫': 'Cung Quan Lộc',
  '事业宫': 'Cung Quan Lộc',
  '田宅宫': 'Cung Điền Trạch',
  '福德宫': 'Cung Phúc Đức',
  '父母宫': 'Cung Phụ Mẫu',
  '身宫': 'Cung Thân',
};

export const VI_STAR_MAP: Record<string, string> = {
  // 14 Chính tinh
  '紫微': 'Tử Vi',
  '天机': 'Thiên Cơ',
  '太阳': 'Thái Dương',
  '武曲': 'Vũ Khúc',
  '天同': 'Thiên Đồng',
  '廉贞': 'Liêm Trinh',
  '天府': 'Thiên Phủ',
  '太阴': 'Thái Âm',
  '贪狼': 'Tham Lang',
  '巨门': 'Cự Môn',
  '天相': 'Thiên Tướng',
  '天梁': 'Thiên Lương',
  '七杀': 'Thất Sát',
  '破军': 'Phá Quân',

  // Phụ tinh, Lục cát, Lục sát, Tạp diệu
  '左辅': 'Tả Phù',
  '右弼': 'Hữu Bật',
  '文昌': 'Văn Xương',
  '文曲': 'Văn Khúc',
  '天魁': 'Thiên Khôi',
  '天钺': 'Thiên Việt',
  '禄存': 'Lộc Tồn',
  '天马': 'Thiên Mã',

  '擎羊': 'Kình Dương',
  '陀罗': 'Đà La',
  '火星': 'Hỏa Tinh',
  '铃星': 'Linh Tinh',
  '地空': 'Địa Không',
  '地劫': 'Địa Kiếp',

  '天空': 'Thiên Không',
  '旬空': 'Tuần Không',
  '副旬': 'Triệt Không',
  '截路': 'Triệt Không',
  '截空': 'Triệt Không',
  '副截': 'Phó Triệt',
  '大耗': 'Đại Hao',
  '小耗': 'Tiểu Hao',
  '天使': 'Thiên Sứ',
  '天伤': 'Thiên Thương',
  '天刑': 'Thiên Hình',
  '天哭': 'Thiên Khốc',
  '天虚': 'Thiên Hư',
  '天月': 'Thiên Nguyệt',
  '阴煞': 'Âm Sát',
  '蜚廉': 'Phi Liêm',
  '空亡': 'Không Vong',
  '孤辰': 'Cô Thần',
  '寡宿': 'Quả Tú',
  '红鸾': 'Hồng Loan',
  '天喜': 'Thiên Hỷ',
  '天官': 'Thiên Quan',
  '天福': 'Thiên Phúc',
  '天才': 'Thiên Tài',
  '天寿': 'Thiên Thọ',
  '三台': 'Tam Thai',
  '八座': 'Bát Tọa',
  '恩光': 'Ân Quang',
  '天贵': 'Thiên Quý',
  '台辅': 'Đài Phụ',
  '龙池': 'Long Trì',
  '凤阁': 'Phượng Các',
  '解神': 'Giải Thần',
  '天德': 'Thiên Đức',
  '月德': 'Nguyệt Đức',
  '年解': 'Niên Giải',
  '天巫': 'Thiên Vu',
  '华盖': 'Hoa Cái',
  '封诰': 'Phong Cáo',
  '劫煞': 'Kiếp Sát',
  '龙德': 'Long Đức',

  // Vòng Thái Tuế
  '太岁': 'Thái Tuế',
  '少阳': 'Thiếu Dương',
  '丧门': 'Tang Môn',
  '少阴': 'Thiếu Âm',
  '官符': 'Quan Phù',
  '死符': 'Tử Phù',
  '岁破': 'Tuế Phá',
  '白虎': 'Bạch Hổ',
  '福德星': 'Phúc Đức',
  '吊客': 'Điếu Khách',
  '病符': 'Bệnh Phù',

  // Vòng Bác Sĩ
  '博士': 'Bác Sĩ',
  '力士': 'Lực Sĩ',
  '青龙': 'Thanh Long',
  '将军': 'Tướng Quân',
  '奏书': 'Tấu Thư',
  '喜神': 'Hỷ Thần',
  '伏兵': 'Phục Binh',

  // Vòng Trường Sinh
  '长生': 'Trường Sinh',
  '沐浴': 'Mộc Dục',
  '冠带': 'Quan Đới',
  '临官': 'Lâm Quan',
  '帝旺': 'Đế Vượng',
  '衰': 'Suy',
  '病': 'Bệnh',
  '死': 'Tử',
  '墓': 'Mộ',
  '绝': 'Tuyệt',
  '胎': 'Thai',
  '养': 'Dưỡng',
};

export const VI_SIHUA_MAP: Record<string, string> = {
  '禄': 'Hóa Lộc',
  '权': 'Hóa Quyền',
  '科': 'Hóa Khoa',
  '忌': 'Hóa Kỵ',
};

export const VI_SIHUA_SHORT: Record<string, string> = {
  '禄': 'Lộc',
  '权': 'Quyền',
  '科': 'Khoa',
  '忌': 'Kỵ',
};

export const VI_BRIGHTNESS_MAP: Record<string, string> = {
  '庙': 'Miếu',
  '旺': 'Vượng',
  '得': 'Đắc',
  '利': 'Lợi',
  '平': 'Bình',
  '不': 'Bất',
  '闲': 'Nhàn',
  '陷': 'Hãm',
  '地': 'Địa',
};

export const VI_BRIGHTNESS_CODE: Record<string, string> = {
  '庙': 'M',
  '旺': 'V',
  '得': 'Đ',
  '利': 'L',
  '平': 'B',
  '不': 'B',
  '闲': 'N',
  '陷': 'H',
  '地': 'Đ',
};

export const VI_WUXING_JU_MAP: Record<string, string> = {
  '水二局': 'Thủy Nhị Cục',
  '木三局': 'Mộc Tam Cục',
  '金四局': 'Kim Tứ Cục',
  '土五局': 'Thổ Ngũ Cục',
  '火六局': 'Hỏa Lục Cục',
};

export const VI_PATTERN_MAP: Record<string, { name: string; desc?: string }> = {
  '紫府同宫': { name: 'Tử Phủ Đồng Cung' },
  '杀破狼': { name: 'Sát Phá Tham' },
  '机月同梁': { name: 'Cơ Nguyệt Đồng Lương' },
  '府相朝垣': { name: 'Phủ Tướng Triều Viên' },
  '日月同宫': { name: 'Nhật Nguyệt Đồng Cung' },
  '日月并明': { name: 'Nhật Nguyệt Tịnh Minh' },
  '巨日同宫': { name: 'Cự Nhật Đồng Cung' },
  '阳梁昌禄': { name: 'Dương Lương Xương Lộc' },
  '武贪同行': { name: 'Vũ Tham Đồng Hành' },
  '廉相清正': { name: 'Liêm Tướng Thanh Chính' },
  '七杀朝斗': { name: 'Thất Sát Triều Đẩu' },
  '金灿光辉': { name: 'Kim Xán Quang Huy' },
  '日照雷门': { name: 'Nhật Chiếu Lôi Môn' },
  '月朗天门': { name: 'Nguyệt Lãng Thiên Môn' },
  '明珠出海': { name: 'Minh Châu Xuất Hải' },
  '石中隐玉': { name: 'Thạch Trung Ẩn Ngọc' },
  '寿星入庙': { name: 'Thọ Tinh Nhập Miếu' },
  '文星拱命': { name: 'Văn Tinh Củng Mệnh' },
  '左右夹命': { name: 'Tả Hữu Giáp Mệnh' },
  '昌曲夹命': { name: 'Xương Khúc Giáp Mệnh' },
  '魁钺夹命': { name: 'Khôi Việt Giáp Mệnh' },
  '科权禄夹': { name: 'Khoa Quyền Lộc Giáp' },
  '三奇嘉会': { name: 'Tam Kỳ Gia Hội' },
  '禄马交驰': { name: 'Lộc Mã Giao Trì' },
  '双禄朝垣': { name: 'Song Lộc Triều Viên' },
  '极向离明': { name: 'Cực Hướng Ly Minh' },
  '君臣庆会': { name: 'Quân Thần Khánh Hội' },
  '贪武同行': { name: 'Tham Vũ Đồng Hành' },
  '马头带箭': { name: 'Mã Đầu Đới Tiễn' },
  '巨火擎羊': { name: 'Cự Hỏa Kình Dương' },
  '铃昌陀武': { name: 'Linh Xương Đà Vũ' },
};

export function tStar(name?: string): string {
  if (!name) return '';
  return VI_STAR_MAP[name] ?? name;
}

export function tPalace(name?: string, full = false): string {
  if (!name) return '';
  if (full) return VI_PALACE_FULL_MAP[name] ?? `Cung ${name}`;
  return VI_PALACE_MAP[name] ?? name.replace('宫', '');
}

export function tStem(stem: number | string): string {
  const idx = typeof stem === 'number' ? stem : ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'].indexOf(stem);
  return VI_STEMS[idx] ?? String(stem);
}

export function tBranch(branch: number | string): string {
  const idx = typeof branch === 'number' ? branch : ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].indexOf(branch);
  return VI_BRANCHES[idx] ?? String(branch);
}

export function tGanzhi(stemIdx: number, branchIdx: number): string {
  return `${tStem(stemIdx)} ${tBranch(branchIdx)}`;
}

export function tGanzhiStr(str?: string): string {
  if (!str || str.length < 2) return str ?? '';
  const s = tStem(str[0]);
  const b = tBranch(str[1]);
  return `${s} ${b}`;
}

export function tSiHua(sihua?: string, short = false): string {
  if (!sihua) return '';
  if (short) return VI_SIHUA_SHORT[sihua] ?? sihua;
  return VI_SIHUA_MAP[sihua] ?? sihua;
}

export function tBrightness(brightness?: string, code = false): string {
  if (!brightness) return '';
  if (code) return VI_BRIGHTNESS_CODE[brightness] ?? brightness;
  return VI_BRIGHTNESS_MAP[brightness] ?? brightness;
}

export function tWuxingJu(ju?: string): string {
  if (!ju) return '';
  return VI_WUXING_JU_MAP[ju] ?? ju;
}

export function tYinYangGender(yyg?: string): string {
  if (!yyg) return '';
  return yyg
    .replace('阳男', 'Dương Nam')
    .replace('阴男', 'Âm Nam')
    .replace('阳女', 'Dương Nữ')
    .replace('阴女', 'Âm Nữ')
    .replace('男', 'Nam')
    .replace('女', 'Nữ');
}

export function tPatternName(patternName: string): string {
  return VI_PATTERN_MAP[patternName]?.name ?? patternName;
}
