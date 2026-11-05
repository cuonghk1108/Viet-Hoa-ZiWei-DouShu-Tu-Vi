'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type { Star } from '@/lib/ziwei/types';
import { STAR_DESCRIPTIONS } from '@/lib/ziwei/constants';
import { tStar, tPalace, tSiHua, tBrightness } from '@/lib/ziwei/i18n-vi';

interface StarDetailPanelProps {
  star: Star | null;
  palaceName?: string;
  onClose: () => void;
}

// Luận giải chi tiết 14 Chính Tinh trong Tử Vi Đẩu Số
const STAR_DETAIL: Record<string, {
  niHaixia: string;
  classical: string;
  bestPalace: string;
  worstPalace: string;
  career: string;
  relationship: string;
  wealth: string;
  health: string;
}> = {
  '紫微': {
    niHaixia: 'Tử Vi là Đế Tọa chi tinh, chủ về tôn quý và độc lập. Người có Tử Vi thủ Mệnh mang khí chất lãnh đạo bẩm sinh, tự trọng cao, không thích bị người khác gò bó quản chế. Tử Vi cần có Tả Phù Hữu Bật củng chiếu như vua có cận thần phụ tá mới phát huy tối đa quyền uy; nếu đơn thủ dễ thành cô quân. Đắc địa nhất tại Thìn Tuất khi đồng cung cùng Thiên Phủ tạo cách Tử Phủ triều viên tài quan song mỹ.',
    classical: 'Cổ quyết: "Tử Vi đế tọa lâm Mệnh chủ tôn quý, thống lĩnh quần tinh, tọa Mệnh chủ quyền uy hiển đạt." Tử Vi thủ Mệnh tam phương hội cát tất xuất tướng nhập tướng.',
    bestPalace: 'Cung Mệnh (Thìn, Tuất), Cung Quan Lộc',
    worstPalace: 'Cung Tật Ách, Cung Phu Thê',
    career: 'Chính trị, quản lý cấp cao, khởi nghiệp độc lập, phù hợp vị trí đầu tàu dẫn dắt',
    relationship: 'Trong tình cảm có phần bị động, lòng tự trọng lớn, thích hợp kết hôn muộn để chín chắn',
    wealth: 'Tài vận vững vàng, giỏi quản lý và gìn giữ tài sản, tích lũy trường kỳ rất tốt',
    health: 'Hành Thổ, cần chú ý tỳ vị, tiêu hóa. Tránh làm việc quá độ, nên giữ nhịp sinh hoạt điều độ',
  },
  '天机': {
    niHaixia: 'Thiên Cơ là Thiện Tinh, chủ về trí tuệ, cơ mưu và sự biến động linh hoạt. Người có Thiên Cơ thủ Mệnh đầu óc cực kỳ nhanh nhạy, giỏi bày mưu tính kế, tư duy logic sâu sắc. Thiên Cơ hóa Kỵ dễ thành "thông minh quá hóa vụng". Là sao chủ về động, thích hợp đi xa lập nghiệp, thích ứng hoàn cảnh mau lẹ.',
    classical: 'Cổ quyết: "Thiên Cơ mộc tinh, vi nhân cơ xảo, đa mưu thiện biến." Miếu vượng thì thông minh tài trí xuất chúng, hãm địa thì lo nghĩ quá nhiều.',
    bestPalace: 'Cung Mệnh (Mão), Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê',
    career: 'Cố vấn chiến lược, công nghệ IT, nghiên cứu, hoạch định kế hoạch, tài chính kỹ thuật',
    relationship: 'Tư tưởng nhiều biến đổi, hay suy nghĩ phức tạp, nên học cách buông bỏ bớt âu lo trong hôn nhân',
    wealth: 'Kiếm tiền bằng trí óc và chuyên môn kỹ năng cao, cần học cách tích lũy bền vững',
    health: 'Hành Mộc, chú ý gan mật, hệ thần kinh. Suy nghĩ nhiều dễ mất ngủ, nên thiền định thư thái',
  },
  '太阳': {
    niHaixia: 'Thái Dương là quan lộc chủ tinh, tượng trưng cho ánh sáng mặt trời, danh tiếng và sự quang minh chính đại. Miếu tại Dần đến Ngọ sáng chói, hào sảng phóng khoáng, thích làm việc công ích và đứng trước công chúng. Rất lợi cho nam giới, nữ giới thì cá tính mạnh mẽ tự lập. Lạc hãm thì vất vả, làm nhiều hưởng ít.',
    classical: 'Cổ quyết: "Thái Dương cư Ngọ nhật lệ trung thiên, quang huy đại phóng, phú quý xuất chúng." Nam Mệnh đắc vị chủ quý hiển công danh.',
    bestPalace: 'Cung Mệnh (Mão đến Ngọ), Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê (Nữ Mệnh), Cung Tật Ách',
    career: 'Công chức, ngoại giao, truyền thông, giáo dục, chính trị, dịch vụ công chúng',
    relationship: 'Nam duyên tốt, nữ cá tính mạnh độc lập, nên chọn bạn đời thấu hiểu và ôn hòa',
    wealth: 'Kiếm tiền quang minh đắc thời, tính tình hào phóng thích giúp người nên cần kế hoạch tiết kiệm',
    health: 'Hành Hỏa, lưu ý tim mạch, huyết áp, thị lực và mắt',
  },
  '武曲': {
    niHaixia: 'Vũ Khúc là tài bạch chủ tinh, thuộc Kim, mang tính cương nghị quả quyết, hành động dứt khoát. Người có Vũ Khúc thủ Mệnh bản lĩnh kiên cường, giỏi xoay sở kinh doanh tiền bạc nhưng giao tiếp thẳng thắn, thiếu lãng mạn. Đắc miếu tại Thìn Tuất Sửu Mùi, đồng cung với Thất Sát hoặc Tham Lang tạo nên cách cục giàu có lớn.',
    classical: 'Cổ quyết: "Vũ Khúc vi tài bạch chủ, tính cương quả quyết." Thừa hưởng tài năng quản lý ngân sách và kinh tài.',
    bestPalace: 'Cung Mệnh (Thìn, Tuất, Sửu, Mùi), Cung Tài Bạch, Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê',
    career: 'Tài chính, ngân hàng, kế toán, quân đội, cơ khí kỹ thuật, đầu tư',
    relationship: 'Tính cách bộc trực thiếu uyển chuyển, tình duyên nên chậm mà chắc, kết hôn muộn cát lợi',
    wealth: 'Tài tinh đắc vị, năng lực tạo tiền tài và đầu tư xuất sắc',
    health: 'Hành Kim, chú ý hệ hô hấp, phổi, mũi họng và răng miệng',
  },
  '天同': {
    niHaixia: 'Thiên Đồng là phúc tinh, tính tình ôn hòa, dĩ hòa vi quý, thích cuộc sống thanh thản an nhàn. Thiên Đồng thủ Mệnh tính tình thiện lương, nhân duyên tốt, không thích tranh chấp hơn thua khốc liệt. Hóa Lộc là phúc lộc trọn vẹn suốt đời, hóa Kỵ thì giảm phúc, phải nỗ lực vượt qua sức ỳ bản thân.',
    classical: 'Cổ quyết: "Thiên Đồng vi phúc đức chi tinh, thủ Mệnh chủ nhân hòa nhã, y thực phong túc, tiêu dao tự tại."',
    bestPalace: 'Cung Mệnh, Cung Phúc Đức',
    worstPalace: 'Cung Quan Lộc',
    career: 'Dịch vụ, nghệ thuật, du lịch, nhà hàng khách sạn, văn hóa cộng đồng',
    relationship: 'Tình cảm dịu dàng, chu đáo, tính cách dễ gần, gia đạo êm ấm hòa thuận',
    wealth: 'Tài lộc bình ổn, thu nhập đều đặn, không ham làm giàu mạo hiểm',
    health: 'Hành Thủy, chú ý thận, bàng quang, hệ bài tiết, nên vận động thể thao đều đặn',
  },
  '廉贞': {
    niHaixia: 'Liêm Trinh là thứ đào hoa tinh, đồng thời là tù tinh và tài nghệ chi tinh. Tính cách đa tài, lòng tự tôn cao, dám nghĩ dám làm nhưng tâm lý phức tạp. Gặp cát tinh hoặc đi cùng Thiên Tướng thành cách Liêm Tướng thanh chính nắm quyền hành lớn. Rất kỵ hóa Kỵ vì dễ gặp rắc rối thị phi, kiện tụng.',
    classical: 'Cổ quyết: "Liêm Trinh vi thứ đào hoa, tài hoa hoành dật." Liêm Tướng đồng cung biến hung thành cát, chưởng quản ấn thụ quyền bính.',
    bestPalace: 'Cung Quan Lộc (hội Thiên Tướng), Cung Mệnh (hóa Lộc)',
    worstPalace: 'Cung Phu Thê, Cung Mệnh (khi hóa Kỵ)',
    career: 'Luật sư, tư pháp, quản trị hành chính, thiết kế nghệ thuật, giải trí',
    relationship: 'Đào hoa phong phú nhưng tình duyên hay gặp trắc trở thử thách, nên kết hôn muộn',
    wealth: 'Kiếm tiền nhờ tài năng sáng tạo độc đáo, cần phòng rủi ro giấy tờ pháp lý khi có hóa Kỵ',
    health: 'Hành Hỏa, lưu ý tim mạch, tuần hoàn máu, thần kinh căng thẳng',
  },
  '天府': {
    niHaixia: 'Thiên Phủ là Nam Đẩu đệ nhất tinh, là kho tiền bạc (Tài khố chi tinh), tính tình trầm tĩnh, cẩn trọng, bao dung độ lượng. Người có Thiên Phủ thủ Mệnh rất giỏi giữ tiền, quản trị tài sản và điều hành tổ chức. Rất ưa gặp Tử Vi hoặc Lộc Tồn, kỵ nhất gặp Tuần Triệt Địa Không Địa Kiếp làm thủng kho tài lộc.',
    classical: 'Cổ quyết: "Thiên Phủ tài khố chi tinh, thủ Mệnh ổn trọng bảo thủ, chủ tích tài vượng gia."',
    bestPalace: 'Cung Mệnh, Cung Tài Bạch, Cung Điền Trạch',
    worstPalace: 'Cung Thiên Di',
    career: 'Tài chính ngân hàng, hành chính quản trị, bất động sản, kho vận, bảo hiểm',
    relationship: 'Mẫu người của gia đình, trách nhiệm cao, vun vén kinh tế gia đạo vững chắc',
    wealth: 'Tài vận dồi dào, khả năng bảo toàn vốn và đầu tư bất động sản an toàn số một',
    health: 'Hành Thổ, chú ý tỳ vị, tiêu hóa, dạ dày, nên duy trì chế độ ăn thanh đạm',
  },
  '太阴': {
    niHaixia: 'Thái Âm là điền trạch chủ tinh, tượng trưng cho mặt trăng, mẹ, vợ và tài phú ngầm. Đắc miếu tại Hợi Tý Sửu phát quang rực rỡ, tính tình nhu hòa, thanh lịch, giàu cảm xúc và khiếu thẩm mỹ. Rất lợi về tài sản tích lũy, đất đai nhà cửa. Lạc hãm tại Mão Tỵ Ngọ thì vất vả, tình cảm dễ u buồn.',
    classical: 'Cổ quyết: "Thái Âm cư Hợi nguyệt lãng thiên môn, phú quý song toàn." Nhập miếu tài vận hanh thông, nữ Mệnh càng thêm cát mỹ.',
    bestPalace: 'Cung Mệnh (Hợi, Tý), Cung Tài Bạch, Cung Điền Trạch',
    worstPalace: 'Cung Mệnh (Ngọ, Tỵ hãm địa)',
    career: 'Tài chính, văn hóa nghệ thuật, kiến trúc, bất động sản, giáo dục, tâm lý',
    relationship: 'Nhẹ nhàng sâu lắng, coi trọng cảm xúc nội tâm và sự an toàn trong mái ấm',
    wealth: 'Tài vận tốt, giỏi gom góp tích lũy, đặc biệt có duyên sở hữu nhà đất điền sản',
    health: 'Hành Thủy, lưu ý thận, phụ khoa (nữ), mắt và hệ thần kinh',
  },
  '贪狼': {
    niHaixia: 'Tham Lang là đệ nhất đào hoa tinh, dục vọng và tài nghệ chi tinh. Tính cách đa tài đa nghệ, năng động, giỏi giao tế xã hội, có duyên với nghệ thuật và tâm linh huyền học. Tham Lang phát muộn sau tuổi trung niên, khi hội Hỏa Tinh hoặc Linh Tinh tạo cách "Hỏa Tham" hay "Linh Tham" bộc phát giàu sang nhanh chóng.',
    classical: 'Cổ quyết: "Tham Lang mộc thủy, đa tài đa nghệ, dục vọng đào hoa." Ngộ Hỏa Linh thành cách bộc phát phú ông.',
    bestPalace: 'Cung Mệnh (hội Hỏa/Linh), Cung Phúc Đức, Cung Thiên Di',
    worstPalace: 'Cung Tật Ách',
    career: 'Thương mại, quan hệ công chúng PR, giải trí nghệ thuật, kinh doanh ẩm thực, tâm linh',
    relationship: 'Sức hấp dẫn lớn, đào hoa vượng, cần tu tâm dưỡng tính để hôn nhân bền lâu',
    wealth: 'Kiếm tiền từ các mối quan hệ xã hội và sự nhạy bén thời cuộc, hậu vận rất khá',
    health: 'Hành Mộc (đới Thủy), chú ý gan mật, thận, tiết chế rượu bia và thức khuya',
  },
  '巨门': {
    niHaixia: 'Cự Môn là ám tinh, chủ về khẩu tài (lời ăn tiếng nói), thị phi và năng lực phản biện. Khi đắc miếu hoặc hội Hóa Lộc, Hóa Quyền sẽ biến thành cách "khẩu thiệt sinh tài" - kiếm tiền bằng tài hùng biện xuất sắc. Người có Cự Môn tư duy sắc sảo, tính đa nghi, thích hợp ngành nghề dùng ngôn ngữ làm vũ khí.',
    classical: 'Cổ quyết: "Cự Môn ám diệu, chủ thị phi khẩu thiệt; phùng Hóa Lộc Quyền tắc dĩ tài biện vi nghiệp đại phú quý."',
    bestPalace: 'Cung Quan Lộc (hóa Lộc/Quyền), Cung Mệnh (Tý, Ngọ)',
    worstPalace: 'Cung Phu Thê, Cung Tật Ách (khi hóa Kỵ)',
    career: 'Luật sư, nhà hùng biện, giảng viên, đàm phán, phát ngôn viên, bán hàng cao cấp',
    relationship: 'Tính hay ngờ vực suy nghĩ nhiều, giao tiếp vợ chồng cần chân thành cởi mở',
    wealth: 'Làm giàu bằng chuyên môn và kỹ năng giao tiếp thuyết phục, tránh tranh chấp kiện tụng',
    health: 'Hành Thủy, lưu ý vòm họng, hô hấp, tai và hệ bài tiết',
  },
  '天相': {
    niHaixia: 'Thiên Tướng là ấn tinh, chủ về thừa hành, phò tá và chức vị ấn tín. Tính cách đàng hoàng, cẩn trọng, coi trọng danh dự, quy tắc và chữ tín. Thiên Tướng cần có minh chủ hoặc chính tinh mạnh đi kèm mới phát huy trọn vẹn, đồng cung với Liêm Trinh rất đẹp, kỵ gặp Kình Dương Đà La hoặc Hóa Kỵ kẹp hai bên.',
    classical: 'Cổ quyết: "Thiên Tướng vi ấn thụ chi tinh, tư lý trật tự, chủ phụ tá trung lương."',
    bestPalace: 'Cung Quan Lộc, Cung Mệnh (đồng cung Liêm Trinh)',
    worstPalace: 'Cung Tài Bạch, Mệnh (bị Hình Kỵ giáp Ấn)',
    career: 'Hành chính sự nghiệp, quản lý, trợ lý cấp cao, nhân sự, kiểm soát tuân thủ',
    relationship: 'Chân thành, chung thủy, mẫu bạn đời đáng tin cậy, cùng chia ngọt sẻ bùi',
    wealth: 'Thu nhập ổn định từ bổng lộc chức vụ, tích lũy theo năm tháng, không hợp cờ bạc',
    health: 'Hành Thủy, chú ý hệ bài tiết, thận, da liễu và dị ứng',
  },
  '天梁': {
    niHaixia: 'Thiên Lương là ấm tinh, thọ tinh, chủ về sự che chở, bảo bọc, y dược, giáo dục và trưởng bối. Người có Thiên Lương thủ Mệnh tính tình già dặn trước tuổi, có lòng trắc ẩn, hay giúp đỡ kẻ yếu, tiền hung hậu cát (gặp khó khăn trước rồi được quý nhân giải cứu). Hội cùng Thái Dương thành cách Nhật Lương quang minh.',
    classical: 'Cổ quyết: "Thiên Lương vi ấm vi thọ, phùng hung hóa cát, ngộ nạn trình tường."',
    bestPalace: 'Cung Mệnh, Cung Phụ Mẫu, Cung Phúc Đức',
    worstPalace: 'Cung Mệnh (khi hóa Kỵ), Cung Tài Bạch',
    career: 'Y dược, giáo dục đào tạo, từ thiện xã hội, tôn giáo, pháp chế, kiểm sát',
    relationship: 'Thường có duyên với bạn đời chênh lệch tuổi tác hoặc người có tính tình chín chắn',
    wealth: 'Tiền bạc vừa đủ thanh bạch, hậu vận ấm no an nhàn, có của để dành cho con cháu',
    health: 'Hành Thổ, chú ý tỳ vị, xương khớp, tuổi già cần chú trọng dưỡng sinh sớm',
  },
  '七杀': {
    niHaixia: 'Thất Sát là tướng tinh trong quân đội, tính cách dũng mãnh, cương liệt, quyết đoán và độc lập tác chiến. Thủ Mệnh là người dám chịu trách nhiệm, có tài mở đường khai phá, không sợ gian nan thử thách. Tuy nhiên mang nét cô độc, cần có tả hữu cát tinh phụ tá để hóa giải sự cô khắc, hội Vũ Khúc thành tướng tài uy danh.',
    classical: 'Cổ quyết: "Thất Sát vi tướng tinh, quả quyết dũng mãnh, khai sáng lực cường."',
    bestPalace: 'Cung Mệnh (có cát tinh phò tá), Cung Quan Lộc',
    worstPalace: 'Cung Phu Thê, Cung Phụ Mẫu',
    career: 'Lực lượng vũ trang, chỉ huy tác chiến, khởi nghiệp mạo hiểm, quản lý dự án khắc nghiệt',
    relationship: 'Tính tình cứng cỏi, trong tình yêu có phần lạnh lùng, nên học cách mềm mỏng nhường nhịn',
    wealth: 'Tài vận thăng trầm theo chu kỳ hành động, có cơ hội làm giàu đột phá lớn',
    health: 'Hành Kim, chú ý chấn thương ngoại khoa, xương khớp, phổi và phế quản',
  },
  '破军': {
    niHaixia: 'Phá Quân là dũng tướng tiên phong, hao tinh, đại diện cho tinh thần phá cũ dựng mới, tiên phong đột phá. Cuộc đời mang tính cách mạng, không chấp nhận lối mòn rập khuôn, biến động nhiều. Sau khi hóa Lộc thì tài vận chuyển biến rất lớn, có khả năng kiến thiết sự nghiệp từ hoang tàn đổ nát.',
    classical: 'Cổ quyết: "Phá Quân vi tiên phong chi tướng, năng phá năng lập, dũng cảm khai sáng."',
    bestPalace: 'Cung Quan Lộc (hóa Lộc), Cung Thiên Di',
    worstPalace: 'Cung Phu Thê, Cung Phụ Mẫu',
    career: 'Khai phá thị trường mới, sáng tạo công nghệ, cải cách doanh nghiệp, kiến trúc xây dựng',
    relationship: 'Tình cảm nhiều biến động đổi thay, cần bạn đời có đức tính bao dung kiên nhẫn',
    wealth: 'Phải trải qua giai đoạn đầu tư tiêu hao rồi mới thu về thành quả lớn, hậu vận vững',
    health: 'Hành Thủy, chú ý thận, bàng quang, cơ quan sinh sản, đề phòng tai nạn bất ngờ',
  },
};

const levelConfig = {
  major: { label: 'Chính Tinh', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  lucky: { label: 'Cát Tinh', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
  sha:   { label: 'Sát Tinh', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  minor: { label: 'Phụ Tinh', color: 'text-slate-400 border-slate-500/25 bg-slate-500/10' },
};

const siHuaColors: Record<string, string> = {
  '禄': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  '权': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  '科': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  '忌': 'text-red-400 bg-red-500/10 border-red-500/30',
};

export default function StarDetailPanel({ star, palaceName, onClose }: StarDetailPanelProps) {
  const desc = star ? STAR_DESCRIPTIONS[star.name] : null;
  const detail = star ? STAR_DETAIL[star.name] : null;
  const typeConfig = star ? levelConfig[star.type] : null;

  return (
    <AnimatePresence>
      {star && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="card-glass rounded-xl overflow-hidden"
        >
          {/* Thanh tiêu đề sao */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--t-border)' }}>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: 'var(--t-gold)' }}>{tStar(star.name)}</span>
              {typeConfig && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${typeConfig.color}`}>
                  {typeConfig.label}
                </span>
              )}
              {star.siHua && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${siHuaColors[star.siHua] || ''}`}>
                  {tSiHua(star.siHua)}
                </span>
              )}
            </div>
            <button onClick={onClose} className="transition-colors text-lg leading-none hover:opacity-75" style={{ color: 'var(--t-faint)' }}>×</button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[560px]">
            {/* Thông tin cơ bản ngũ hành, tính chất */}
            {desc && (
              <div className="flex flex-wrap gap-1.5">
                {[
                  `Ngũ hành · ${desc.element === '土' ? 'Thổ' : desc.element === '木' ? 'Mộc' : desc.element === '火' ? 'Hỏa' : desc.element === '金' ? 'Kim' : desc.element === '水' ? 'Thủy' : desc.element}`,
                  `Tính chất · ${desc.nature === '吉星' ? 'Cát Tinh' : desc.nature === '凶星' ? 'Hung Tinh' : desc.nature === '中性偏吉' ? 'Thiên Cát' : desc.nature === '凶中带吉' ? 'Hung đới Cát' : 'Trung tính'}`,
                  ...(palaceName ? [`Tọa cung · ${tPalace(palaceName, true)}`] : []),
                  ...(star.brightness ? [star.brightness === 'bright' ? 'Miếu Vượng' : star.brightness === 'dim' ? 'Lạc Hãm' : 'Đắc Bình'] : []),
                ].map(tag => (
                  <div key={tag} className="text-[10px] px-2 py-1 rounded-full font-medium"
                    style={{
                      border: '1px solid var(--t-border)',
                      color: tag.includes('Miếu Vượng') ? '#eab308' : tag.includes('Lạc Hãm') ? '#ef4444' : 'var(--t-text2)',
                    }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* Từ khóa đặc tính */}
            {desc && (
              <div>
                <div className="text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--t-faint)' }}>ĐẶC TÍNH CỐT LÕI</div>
                <div className="flex flex-wrap gap-1.5">
                  {desc.keywords.split('·').map(k => (
                    <span key={k} className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--t-gold)', border: '1px solid rgba(212,168,67,0.2)', background: 'rgba(212,168,67,0.06)' }}>
                      {k.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trích dẫn Cổ Thư */}
            {detail && (
              <div className="rounded-xl p-3" style={{ background: 'rgba(212,168,67,0.04)', border: '1px solid rgba(212,168,67,0.12)' }}>
                <div className="text-[10px] tracking-widest mb-1.5 flex items-center gap-1 font-semibold" style={{ color: 'var(--t-gold)', opacity: 0.85 }}>
                  CỔ THƯ PHÚ QUYẾT
                </div>
                <p className="text-[11px] leading-relaxed italic" style={{ color: 'var(--t-gold)', opacity: 0.85 }}>{detail.classical}</p>
              </div>
            )}

            {/* Luận giải chi tiết */}
            {detail && (
              <>
                <div>
                  <div className="text-[10px] tracking-widest mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--t-faint)' }}>
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                    LUẬN GIẢI CHÍNH TÔNG
                    <span className="w-3 h-px inline-block" style={{ background: 'var(--t-border-acc)' }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>{detail.niHaixia}</p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: 'Hướng nghiệp & Công danh', value: detail.career, icon: '◈' },
                    { label: 'Tình duyên & Hôn nhân', value: detail.relationship, icon: '♡' },
                    { label: 'Tài lộc & Tiền tài', value: detail.wealth, icon: '◆' },
                    { label: 'Sức khỏe & Dưỡng sinh', value: detail.health, icon: '☯' },
                  ].map(item => (
                    <div key={item.label} className="card-inner rounded-lg p-3">
                      <div className="text-[10px] mb-1 flex items-center gap-1 font-semibold" style={{ color: 'var(--t-gold)' }}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(74,222,128,0.15)', background: 'rgba(74,222,128,0.05)' }}>
                    <div className="text-emerald-500 mb-0.5 font-medium">Cung vị đắc cách</div>
                    <div className="text-emerald-500/80">{detail.bestPalace}</div>
                  </div>
                  <div className="text-[10px] p-2.5 rounded-lg" style={{ border: '1px solid rgba(248,113,113,0.15)', background: 'rgba(248,113,113,0.05)' }}>
                    <div className="text-red-500 mb-0.5 font-medium">Cung vị cần lưu tâm</div>
                    <div className="text-red-500/80">{detail.worstPalace}</div>
                  </div>
                </div>
              </>
            )}

            {/* Phụ tinh và Sát tinh giải nghĩa */}
            {!detail && star.type !== 'major' && (
              <div className="text-xs leading-relaxed" style={{ color: 'var(--t-text2)' }}>
                {star.type === 'lucky' && (
                  <>
                    {star.name === '文昌' && 'Văn Xương tọa cung chủ về văn chương thi cử đỗ đạt, công danh hiển hách, giấy tờ ấn tín thuận lợi.'}
                    {star.name === '文曲' && 'Văn Khúc tọa cung chủ về tài nghệ xuất chúng, ăn nói lưu loát, tài hoa nghệ thuật và trí tuệ mẫn tiệp.'}
                    {star.name === '左辅' && 'Tả Phù là trợ tinh đắc lực, chủ về có nhiều bạn bè đồng chí hướng giúp đỡ, phò tá, tăng thêm sức mạnh cho cung vị.'}
                    {star.name === '右弼' && 'Hữu Bật là trợ tinh âm trợ, chủ về quý nhân phò trợ, hóa giải tai ương, giúp việc làm ăn thêm thuận buồm xuôi gió.'}
                    {star.name === '天魁' && 'Thiên Khôi là đệ nhất quý nhân tinh, chủ về gặp quý nhân nâng đỡ công khai, thi cử đỗ đầu, phùng hung hóa cát.'}
                    {star.name === '天钺' && 'Thiên Việt là ngọc đường quý nhân, chủ về âm đức che chở, cơ hội may mắn bất ngờ đến trong cuộc sống.'}
                    {star.name === '禄存' && 'Lộc Tồn là tài tinh thiên lộc, chủ về nguồn tiền tài ổn định, giàu có bền vững, cẩn trọng giữ gìn cơ nghiệp.'}
                    {star.name === '天马' && 'Thiên Mã chủ về biến động, xuất ngoại, bôn ba khắp nơi, đắc Lộc Mã giao trì chủ phát tài phương xa.'}
                  </>
                )}
                {star.type === 'sha' && (
                  <>
                    {star.name === '地空' && 'Địa Không chủ về hư hao, dễ mất mát tiền bạc hoặc tư tưởng bay bổng không thực tế, hợp với nghiên cứu triết học, tâm linh.'}
                    {star.name === '地劫' && 'Địa Kiếp chủ về sóng gió bất ngờ, cướp bóc hao tài, làm ăn cần cẩn trọng đề phòng tiểu nhân lừa gạt.'}
                    {star.name === '火星' && 'Hỏa Tinh tính khí bốc đồng nóng nảy, phát tác mau lẹ, tuy nhiên khi hội Tham Lang tạo thành cách Hỏa Tham bộc phát đại phú.'}
                    {star.name === '铃星' && 'Linh Tinh mang tính âm sát, ngấm ngầm âm thầm, cẩn trọng thị phi sau lưng, hội Tham Lang đắc Linh Tham bộc phát.'}
                    {star.name === '擎羊' && 'Kình Dương là hình khắc chi tinh, tính cương trực quả quyết nhưng dễ gặp tai nạn thương tích va chạm phẫu thuật.'}
                    {star.name === '陀罗' && 'Đà La chủ về chần chừ do dự, ám hại dây dưa khó dứt, làm việc hay bị trì hoãn cản trở, cần kiên trì bền bỉ.'}
                  </>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
