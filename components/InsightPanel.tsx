'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import type { TimeView } from './TimeNav';
import { tPalace, tStar, tSiHua } from '@/lib/ziwei/i18n-vi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  hidden?: boolean;
}

interface SelectedSiHua {
  starName: string;
  siHua: string;
  view: TimeView;
}

interface InsightPanelProps {
  chart: ZiweiChart;
  selectedPalace?: Palace | null;
  selectedSiHua?: SelectedSiHua | null;
}

const TOPICS = [
  { key: 'overview',     label: 'Mệnh Cách' },
  { key: 'love',        label: 'Tình Duyên' },
  { key: 'career',      label: 'Sự Nghiệp' },
  { key: 'wealth',      label: 'Tài Lộc' },
  { key: 'health',      label: 'Sức Khỏe' },
  { key: 'personality', label: 'Tính Cách' },
] as const;

const TOPIC_PROMPTS: Record<string, string> = {
  overview: `Xin hãy luận giải tổng quan Mệnh cách lá số theo cấu trúc:

**【Định Tính Mệnh Cách】**
Khái quát cách cục trọng tâm và khí chất cốt lõi của đương số.

**【Luận Giải Chính Tinh】**
Đặc tính các chính tinh cung Mệnh, kết hợp miếu vượng và tương tác.

**【Tam Phương Tứ Chính】**
Liên kết phân tích giữa Mệnh, Tài Bạch, Quan Lộc và Thiên Di.

**【Đại Hạn Hiện Tại】**
Phương hướng vận trình 10 năm hiện tại và các điểm trọng tâm cần lưu ý.

**【Ưu Thế & Lời Khuyên】**
Thế mạnh thiên bẩm và những bài học, rủi ro cần phòng tránh.`,

  love: `Xin hãy phân tích chuyên sâu vận trình tình duyên, hôn nhân theo cấu trúc:

**【Cách Cục Tình Cảm】**
Định tính tổng thể đường tình duyên và hôn nhân.

**【Phân Tích Cung Phu Thê】**
Chính tinh, phụ tinh, tứ hóa và vị trí miếu hãm tại cung Phu Thê.

**【Tương Tác Tam Phương】**
Ảnh hưởng từ các cung xung chiếu và tam hợp đến hạnh phúc lứa đôi.

**【Vận Trình Tình Duyên Đại Hạn】**
Diễn biến tình cảm trong giai đoạn 10 năm hiện tại và lưu niên.

**【Lời Khuyên Thực Tế】**
Giải pháp và lời khuyên giữ gìn hạnh phúc gia đạo.`,

  career: `Xin hãy phân tích chuyên sâu công danh sự nghiệp theo cấu trúc:

**【Cách Cục Sự Nghiệp】**
Định tính xu hướng: hợp làm chuyên môn, kinh doanh, tự do hay công chức/quản lý.

**【Phân Tích Cung Quan Lộc】**
Các sao tọa thủ tại cung Quan Lộc và năng lực chuyên môn nổi trội.

**【Liên Kết Cung Tài Bạch】**
Mối tương quan giữa sự nghiệp và nguồn tiền tài thu nhập.

**【Đại Hạn & Cơ Hội Hiện Tại】**
Xu thế phát triển công việc trong giai đoạn này.

**【Định Hướng Phát Triển】**
Các ngành nghề, lĩnh vực và chiến lược tối ưu nhất.`,

  wealth: `Xin hãy phân tích chi tiết tài lộc, tiền tài theo cấu trúc:

**【Cách Cục Tài Vận】**
Định tính mô hình tiền bạc: tài lộc chủ động, tích lũy hay đầu tư mạo hiểm.

**【Phân Tích Cung Tài Bạch】**
Sao thủ cung Tài Bạch, các nguồn thu và cách lưu chuyển dòng tiền.

**【Cung Điền Trạch (Kho Tài Sản)】**
Khả năng giữ của, bất động sản và tích lũy điền sản lâu dài.

**【Vận Tài Lộc Hiện Tại】**
Xu hướng tài chính giai đoạn hiện tại và cảnh báo rủi ro hao hụt.

**【Lời Khuyên Quản Lý Tài Chính】**
Chiến lược giữ và phát triển tiền tài hiệu quả.`,

  health: `Xin hãy luận giải về sức khỏe và thể trạng theo cấu trúc:

**【Cung Tật Ách & Thể Trạng】**
Các tinh bàn tại cung Tật Ách và thể chất bẩm sinh.

**【Các Nguy Cơ Tiềm Ẩn】**
Những cơ quan bộ phận cần đặc biệt chú ý chăm sóc và bảo dưỡng.

**【Vận Hạn Sức Khỏe】**
Những năm tháng, giai đoạn đại hạn cần phòng tránh tai nạn hay ốm đau.

**【Lời Khuyên Dưỡng Sinh】**
Chế độ sinh hoạt, vận động và phòng ngừa thích hợp.`,

  personality: `Xin hãy phân tích sâu về tính cách và tâm lý theo cấu trúc:

**【Tính Cách Cốt Lõi Cung Mệnh】**
Đặc điểm tư duy, phong thái và bản chất bên trong của mệnh tạo.

**【Tổng Hợp Tam Phương】**
Ảnh hưởng từ Tài, Quan, Di đến phong cách hành xử đời sống.

**【Phong Cách Đối Nhân Xử Thế】**
Cách tương tác với xã hội, đồng nghiệp và người xung quanh.

**【Điểm Mạnh & Bài Học Trưởng Thành】**
Năng khiếu bẩm sinh và điểm yếu cần trau dồi để hoàn thiện.`,
};

const PALACE_ROLES: Record<string, string> = {
  '命宫':   'Bản mệnh, bản ngã, tính cách, diện mạo, tiên thiên',
  '兄弟宫': 'Anh chị em, tri kỷ, đối tác hợp tác',
  '夫妻宫': 'Tình duyên, hôn nhân, bạn đời',
  '子女宫': 'Con cái, duyên hậu duệ, cấp dưới',
  '财帛宫': 'Tài vận, phương thức kiếm tiền, năng lực tài chính',
  '疾厄宫': 'Sức khỏe, thể trạng, tai ách tiềm ẩn',
  '迁移宫': 'Giao tế xã hội, xuất ngoại, thời vận bên ngoài',
  '交友宫': 'Bạn bè, đồng nghiệp, nhân duyên xã hội, tiểu nhân/quý nhân',
  '官禄宫': 'Công danh, sự nghiệp, học vấn, vị thế xã hội',
  '田宅宫': 'Điền sản, bất động sản, gia đạo, môi trường sống',
  '福德宫': 'Đời sống tinh thần, phúc phận, nội tâm, tuổi thọ',
  '父母宫': 'Cha mẹ, trưởng bối, giấy tờ pháp lý, huyết thống',
};

/** Render Markdown định dạng kết quả AI */
function AiContent({ text, streaming }: { text: string; streaming?: boolean }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        const sectionMatch = line.match(/^\*\*【(.+?)】\*\*$/);
        if (sectionMatch) {
          return (
            <div key={i} className="pt-3 pb-0.5 first:pt-0">
              <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'var(--t-gold)' }}>
                【{sectionMatch[1]}】
              </span>
            </div>
          );
        }
        if (line.trim() === '') return <div key={i} className="h-1" />;
        const parts = line.split(/\*\*(.+?)\*\*/);
        return (
          <div key={i} className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>
            {parts.map((part, j) =>
              j % 2 === 0
                ? part
                : <strong key={j} className="font-medium" style={{ color: 'var(--t-text)' }}>{part}</strong>
            )}
          </div>
        );
      })}
      {streaming && (
        <span
          className="inline-block w-1.5 h-3 ml-0.5 animate-pulse rounded-sm align-middle"
          style={{ background: 'var(--t-gold)', opacity: 0.6 }}
        />
      )}
    </div>
  );
}

export default function InsightPanel({ chart, selectedPalace, selectedSiHua }: InsightPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>('overview');
  const messagesRef = useRef<Message[]>([]);
  const loadingRef = useRef(false);
  const autoLoaded = useRef(false);
  const lastPalaceBranch = useRef<number | undefined>(undefined);
  const lastSiHuaKey = useRef<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { loadingRef.current = loading; }, [loading]);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Tự động khởi tạo luận giải tổng quan khi mở
  useEffect(() => {
    if (autoLoaded.current) return;
    autoLoaded.current = true;
    sendMessage(TOPIC_PROMPTS.overview, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Phân tích cung vị khi người dùng chọn cung
  useEffect(() => {
    if (!selectedPalace || selectedPalace.branch === lastPalaceBranch.current) return;
    lastPalaceBranch.current = selectedPalace.branch;

    const majorStars = selectedPalace.stars.filter(s => s.type === 'major');
    const starDesc = majorStars.length > 0
      ? majorStars.map(s => `${tStar(s.name)}${s.siHua ? ' ' + tSiHua(s.siHua) : ''}`).join(', ')
      : 'Vô Chính Diệu (mượn chính tinh đối cung)';
    const palaceViName = tPalace(selectedPalace.name, true);
    const role = PALACE_ROLES[selectedPalace.name] ?? '';

    const prompt = `Phân tích chuyên sâu 【${palaceViName}】 (Chủ quản: ${role}), chính tinh tọa thủ gồm ${starDesc}, theo cấu trúc:

**【Ý Nghĩa Cung Vị】**
Ý nghĩa của ${palaceViName} trên lá số mệnh tạo và tổng quan sự bố trí tinh bàn tại đây.

**【Luận Giải Tinh Đẩu】**
Đặc tính các sao tọa thủ tại cung này trong hệ thống Tử Vi Đẩu Số truyền thống.

**【Tam Phương Tứ Chính Tác Động】**
Tác động hợp chiếu từ các cung vị đối xung và tam hợp đến cung này.

**【Lời Khuyên & Định Hướng】**
Những lưu ý thực tiễn và giải pháp tốt nhất đối với cung vị này.`;

    sendMessage(prompt, true);
  }, [selectedPalace]); // eslint-disable-line react-hooks/exhaustive-deps

  // Phân tích Tứ Hóa khi nhấp vào badge Tứ Hóa
  useEffect(() => {
    if (!selectedSiHua) return;
    const key = `${selectedSiHua.starName}-${selectedSiHua.siHua}-${selectedSiHua.view}`;
    if (key === lastSiHuaKey.current) return;
    lastSiHuaKey.current = key;

    const palaceOfStar = chart.palaces.find(p =>
      p.stars.some(s => s.name === selectedSiHua.starName)
    );
    const palaceName = palaceOfStar ? tPalace(palaceOfStar.name, true) : 'Cung vị liên quan';
    const viewLabel = selectedSiHua.view === 'daxian' ? 'Đại Hạn' : 'Lưu Niên';
    const starVi = tStar(selectedSiHua.starName);
    const siHuaVi = tSiHua(selectedSiHua.siHua);

    const prompt = `Phân tích tác động phi hóa 【${viewLabel} ${starVi} ${siHuaVi}】 theo cấu trúc:

**【Ý Nghĩa Cốt Lõi】**
Ý nghĩa của ${siHuaVi} và sự kết hợp đặc thù khi ${starVi} đắc ${siHuaVi}.

**【Tác Động Lạc Cung】**
Khi ${starVi} ${siHuaVi} tọa tại 【${palaceName}】, các lĩnh vực cung vị này quản lý sẽ chịu ảnh hưởng ra sao.

**【Đường Đi Tam Phương Tứ Chính】**
Sự cộng hưởng của ${siHuaVi} đối với các cung đối diện và tam hợp.

**【Lời Khuyên Hành Động】**
Những định hướng hành động cụ thể để tận dụng cát hóa hoặc hóa giải hung hiểm.`;

    sendMessage(prompt, true);
  }, [selectedSiHua]); // eslint-disable-line react-hooks/exhaustive-deps

  const streamResponse = async (apiMessages: { role: 'user' | 'assistant'; content: string }[]) => {
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart, messages: apiMessages }),
      });
      if (res.status === 404) throw new Error('api-missing');
      if (!res.ok) throw new Error('Yêu cầu thất bại');
      if (!res.body) throw new Error('Không có luồng phản hồi');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const delta = JSON.parse(data).delta?.text ?? '';
            assistantText += delta;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: assistantText };
              return updated;
            });
          } catch { /* bỏ qua */ }
        }
      }
    } catch (e) {
      const missing = e instanceof Error && e.message === 'api-missing';
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: missing
            ? 'Bản mã nguồn mở chưa kết nối endpoint AI luận giải (/api/interpret). Toàn bộ bàn tính toán an sao, cung vị, tam phương tứ chính và cách cục đều đã được tính toán đầy đủ và chuẩn xác trên bàn lá số phía bên trái.'
            : 'Luận giải gặp sự cố gián đoạn kết nối, vui lòng thử lại sau giây lát.',
        },
      ]);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  const sendMessage = (text: string, hidden = false) => {
    if (!text.trim() || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const userMsg: Message = { role: 'user', content: text, hidden };
    const apiMessages = [...messagesRef.current, userMsg].map(m => ({
      role: m.role,
      content: m.content,
    }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    streamResponse(apiMessages);
  };

  const handleTopicClick = (topicKey: string) => {
    if (loadingRef.current) return;
    setActiveTopic(topicKey);
    sendMessage(TOPIC_PROMPTS[topicKey], true);
  };

  const handleSend = () => {
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden card-glass">

      {/* ── Các nút chủ đề luận giải ── */}
      <div className="flex-shrink-0 px-2 pt-2.5 pb-2" style={{ borderBottom: '1px solid var(--t-border)' }}>
        <div className="grid grid-cols-6 gap-1">
          {TOPICS.map(t => {
            const isActive = activeTopic === t.key;
            return (
              <button
                key={t.key}
                onClick={() => handleTopicClick(t.key)}
                disabled={loading}
                className="py-1.5 text-[10px] font-medium rounded-lg transition-all duration-150 disabled:opacity-40"
                style={{
                  background: isActive ? 'rgba(212,168,67,0.12)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(212,168,67,0.3)' : 'var(--t-border)'}`,
                  color: isActive ? 'var(--t-gold)' : 'var(--t-faint)',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Khu vực tin nhắn luận giải ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">

        {/* Trạng thái ban đầu */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-3" style={{ color: 'var(--t-gold)', opacity: 0.1 }}>✦</div>
            <p className="text-[10px] animate-pulse" style={{ color: 'var(--t-faint)' }}>Đang chuẩn bị dữ liệu luận giải mệnh cách…</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            if (msg.role === 'user' && msg.hidden) return null;

            if (msg.role === 'user') {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div
                    className="max-w-[85%] rounded-xl px-3 py-2 text-[11px]"
                    style={{
                      background: 'rgba(212,168,67,0.08)',
                      border: '1px solid rgba(212,168,67,0.18)',
                      color: 'var(--t-gold)',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              );
            }

            // Tin nhắn phản hồi
            const isLastMsg = i === messages.length - 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="text-[9px] tracking-widest mb-2 flex items-center gap-1.5 font-semibold"
                  style={{ color: 'var(--t-faint)' }}
                >
                  <span style={{ color: 'var(--t-gold)', opacity: 0.6 }}>✦</span>
                  LUẬN GIẢI TỬ VI
                </div>
                <AiContent text={msg.content} streaming={loading && isLastMsg} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Ô nhập câu hỏi ── */}
      <div className="flex-shrink-0 px-3 pb-3 pt-2" style={{ borderTop: '1px solid var(--t-border)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Hỏi đáp về lá số, ví dụ: Năm nay vận sự nghiệp ra sao?"
            disabled={loading}
            className="flex-1 rounded-lg px-3 py-2 text-[11px] focus:outline-none transition-colors"
            style={{
              background: 'var(--t-card)',
              border: '1px solid var(--t-border)',
              color: 'var(--t-text)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-3 py-2 rounded-lg text-[11px] font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(212,168,67,0.15)',
              border: '1px solid rgba(212,168,67,0.25)',
              color: 'var(--t-gold)',
            }}
          >
            {loading ? '…' : 'Gửi'}
          </button>
        </div>
      </div>

    </div>
  );
}
