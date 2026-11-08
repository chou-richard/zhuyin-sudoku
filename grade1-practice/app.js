"use strict";

const UNITS = {
  chinese: ["全部國語", "注音符號", "拼音聲調", "國字詞語", "句子運用", "閱讀理解"],
  math: ["全部數學", "數到10", "比長短", "分與合", "順序和多少", "數到30", "加一加", "認識形狀", "減一減", "讀鐘錶"]
};

const INITIALS = ["ㄅ", "ㄆ", "ㄇ", "ㄈ", "ㄉ", "ㄊ", "ㄋ", "ㄌ", "ㄍ", "ㄎ", "ㄏ", "ㄐ", "ㄑ", "ㄒ", "ㄓ", "ㄔ", "ㄕ", "ㄖ", "ㄗ", "ㄘ", "ㄙ"];
const FINALS = ["ㄚ", "ㄛ", "ㄜ", "ㄝ", "ㄞ", "ㄟ", "ㄠ", "ㄡ", "ㄢ", "ㄣ", "ㄤ", "ㄥ", "ㄦ", "ㄧ", "ㄨ", "ㄩ"];
const TONES = [
  { name: "一聲", mark: "不標號", sample: "ㄇㄧㄢ" },
  { name: "二聲", mark: "ˊ", sample: "ㄇㄧㄢˊ" },
  { name: "三聲", mark: "ˇ", sample: "ㄇㄧㄢˇ" },
  { name: "四聲", mark: "ˋ", sample: "ㄇㄧㄢˋ" },
  { name: "輕聲", mark: "˙", sample: "˙ㄅㄚ" }
];

const WORDS = [
  ["天空", "ㄊㄧㄢ ㄎㄨㄥ", "☁️", "白雲飄在天空中。"],
  ["白雲", "ㄅㄞˊ ㄩㄣˊ", "☁️", "白雲像軟綿綿的糖。"],
  ["太陽", "ㄊㄞˋ ㄧㄤˊ", "☀️", "太陽升起，天亮了。"],
  ["月亮", "ㄩㄝˋ ㄌㄧㄤˋ", "🌙", "晚上的月亮很明亮。"],
  ["雨天", "ㄩˇ ㄊㄧㄢ", "🌧️", "雨天出門要帶雨傘。"],
  ["高山", "ㄍㄠ ㄕㄢ", "⛰️", "高山上的空氣很清新。"],
  ["小河", "ㄒㄧㄠˇ ㄏㄜˊ", "🌊", "小河裡有幾條魚。"],
  ["花朵", "ㄏㄨㄚ ㄉㄛˇ", "🌼", "花朵在陽光下開放。"],
  ["大樹", "ㄉㄚˋ ㄕㄨˋ", "🌳", "大樹下有一片涼快的陰影。"],
  ["早安", "ㄗㄠˇ ㄢ", "🌅", "早上見面時，我們說早安。"],
  ["你好", "ㄋㄧˇ ㄏㄠˇ", "👋", "見到新同學，我先說你好。"],
  ["同學", "ㄊㄨㄥˊ ㄒㄩㄝˊ", "🧒", "我和同學一起上課。"],
  ["老師", "ㄌㄠˇ ㄕ", "👩‍🏫", "老師帶著大家讀課文。"],
  ["學校", "ㄒㄩㄝˊ ㄒㄧㄠˋ", "🏫", "我每天開心地到學校。"],
  ["課本", "ㄎㄜˋ ㄅㄜㄣˇ", "📕", "課本裡有許多有趣的故事。"],
  ["鉛筆", "ㄑㄧㄢ ㄅㄧˇ", "✏️", "我用鉛筆寫下答案。"],
  ["書包", "ㄕㄨ ㄅㄠ", "🎒", "我把課本放進書包。"],
  ["桌子", "ㄓㄛ ˙ㄗ", "🪑", "桌子上放著一本書。"],
  ["家人", "ㄐㄧㄚ ㄖㄜㄣˊ", "👪", "我和家人一起吃晚餐。"],
  ["爸爸", "ㄅㄚˋ ˙ㄅㄚ", "👨", "爸爸帶我到公園散步。"],
  ["媽媽", "ㄇㄚ ˙ㄇㄚ", "👩", "媽媽和我一起整理房間。"],
  ["哥哥", "ㄍㄜ ˙ㄍㄜ", "👦", "哥哥正在房間裡看書。"],
  ["姐姐", "ㄐㄧㄝˇ ˙ㄐㄧㄝ", "👧", "姐姐教我折紙鶴。"],
  ["水果", "ㄕㄨㄟˇ ㄍㄛˇ", "🍎", "餐後吃水果很健康。"],
  ["蘋果", "ㄆㄧㄥˊ ㄍㄛˇ", "🍎", "紅紅的蘋果又脆又甜。"],
  ["香蕉", "ㄒㄧㄤ ㄐㄧㄠ", "🍌", "弟弟剝了一根香蕉。"],
  ["西瓜", "ㄒㄧ ㄍㄨㄚ", "🍉", "夏天吃西瓜很消暑。"],
  ["牛奶", "ㄋㄧㄡˊ ㄋㄞˇ", "🥛", "早餐時我喝一杯牛奶。"],
  ["麵包", "ㄇㄧㄢˋ ㄅㄠ", "🍞", "麵包烤好時香噴噴的。"],
  ["青菜", "ㄑㄧㄥ ㄘㄞˋ", "🥬", "多吃青菜讓身體有力氣。"],
  ["小狗", "ㄒㄧㄠˇ ㄍㄡˇ", "🐶", "小狗在門口搖尾巴。"],
  ["小貓", "ㄒㄧㄠˇ ㄇㄧㄠ", "🐱", "小貓蹲在窗邊曬太陽。"],
  ["小鳥", "ㄒㄧㄠˇ ㄋㄧㄠˇ", "🐦", "小鳥在樹枝上唱歌。"],
  ["金魚", "ㄐㄧㄣ ㄩˊ", "🐠", "金魚在水裡游來游去。"],
  ["兔子", "ㄊㄨˋ ˙ㄗ", "🐇", "兔子最喜歡吃新鮮的菜。"],
  ["跑步", "ㄆㄠˇ ㄅㄨˋ", "🏃", "我每天到操場跑步。"],
  ["唱歌", "ㄔㄤˋ ㄍㄜ", "🎤", "大家一起唱歌，心情很好。"],
  ["洗手", "ㄒㄧˇ ㄕㄡˇ", "🧼", "吃東西以前要先洗手。"],
  ["吃飯", "ㄔ ㄈㄢˋ", "🍚", "吃飯時要細細品嘗食物。"],
  ["睡覺", "ㄕㄨㄟˋ ㄐㄧㄠˋ", "😴", "睡覺前要把玩具收好。"],
  ["紅色", "ㄏㄨㄥˊ ㄙㄜˋ", "🔴", "那顆氣球是紅色的。"],
  ["藍色", "ㄌㄢˊ ㄙㄜˋ", "🔵", "哥哥穿著藍色的外套。"],
  ["黃色", "ㄏㄨㄤˊ ㄙㄜˋ", "🟡", "香蕉成熟後是黃色的。"],
  ["白色", "ㄅㄞˊ ㄙㄜˋ", "⚪", "小兔子有白色的毛。"],
  ["黑色", "ㄏㄟ ㄙㄜˋ", "⚫", "爸爸穿著黑色的鞋子。"],
  ["上面", "ㄕㄤˋ ㄇㄧㄢˋ", "⬆️", "鉛筆放在桌子上面。"],
  ["下面", "ㄒㄧㄚˋ ㄇㄧㄢˋ", "⬇️", "小貓躲在椅子下面。"],
  ["左邊", "ㄗㄨㄛˇ ㄅㄧㄢ", "⬅️", "圖書館在操場的左邊。"],
  ["右邊", "ㄧㄡˋ ㄅㄧㄢ", "➡️", "我把水杯放在書包右邊。"]
  ,["弟弟", "ㄉㄧˋ ˙ㄉㄧ", "👦", "弟弟在地墊上拼積木。"]
  ,["妹妹", "ㄇㄟˋ ˙ㄇㄟ", "👧", "妹妹抱著心愛的娃娃。"]
  ,["爺爺", "ㄧㄝˊ ˙ㄧㄝ", "👴", "爺爺在陽台上給花澆水。"]
  ,["奶奶", "ㄋㄞˇ ˙ㄋㄞ", "👵", "奶奶教我做簡單的紙花。"]
  ,["朋友", "ㄆㄥˊ ㄧㄡˇ", "🧒", "我和朋友一起分享故事書。"]
  ,["公園", "ㄍㄨ ㄩㄢˊ", "🏞️", "週末早上，我們到公園散步。"]
  ,["教室", "ㄐㄧㄠˋ ㄕˋ", "🏫", "同學們在教室裡安靜閱讀。"]
  ,["操場", "ㄘㄠ ㄔㄤˇ", "🏟️", "下課時，大家到操場運動。"]
  ,["圖書館", "ㄊㄨˊ ㄕㄨ ㄍㄨㄢˇ", "📚", "圖書館裡有許多適合兒童的書。"]
  ,["雨傘", "ㄩˇ ㄉㄞˇ", "☔", "下雨了，請記得帶雨傘。"]
  ,["水壺", "ㄕㄨㄟˇ ㄏㄨˊ", "🧴", "水壺裡裝著溫開水。"]
  ,["眼睛", "ㄧㄞˇ ˙ㄐㄧㄥ", "👀", "閱讀時要保持距離，保護眼睛。"]
  ,["耳朵", "ㄖˇ ˙ㄉㄨㄛ", "👂", "我用耳朵仔細聽老師說話。"]
  ,["牙齒", "ㄧㄚˊ ㄔˇ", "🦷", "早晚都要刷牙，才能保護牙齒。"]
  ,["雙手", "ㄕㄨㄤ ㄕㄡˇ", "🙌", "過馬路時，我用雙手緊握家人。"]
  ,["皮球", "ㄆㄧˊ ㄑㄧㄡˊ", "⚽", "國強在操場上輕輕拍皮球。"]
  ,["風箏", "ㄈㄥ ˙ㄓㄥ", "🪁", "風大的時候，風箏飛得很高。"]
  ,["汽車", "ㄑㄧˋ ㄔㄜ", "🚗", "汽車經過路口時慢慢停下。"]
  ,["火車", "ㄏㄨㄛˇ ㄔㄜ", "🚆", "火車沿著鐵軌向前行駛。"]
  ,["飛機", "ㄈㄟ ㄐㄧ", "✈️", "飛機穿過白雲，飛向遠方。"]
  ,["海洋", "ㄏㄞˇ ㄧㄤˊ", "🌊", "藍色的海洋看起來很寬廣。"]
  ,["春天", "ㄔㄨㄣ ㄊㄧㄞ", "🌸", "春天到了，公園裡開滿鮮花。"]
  ,["夏天", "ㄒㄧㄚˋ ㄊㄧㄞ", "☀️", "夏天天氣熱，要記得多喝水。"]
  ,["冬天", "ㄉㄨㄥ ㄊㄧㄞ", "❄️", "冬天出門時要穿上暖暖的外套。"]
].map(([word, reading, emoji, sentence]) => ({ word, reading, emoji, sentence }));

const PASSAGES = [
  ["小雨天", "今天早上下著小雨。小安穿上雨鞋，帶著雨傘去上學。他慢慢走，不在水漥裡跑跳。", [
    ["小安出門時帶了什麼？", ["雨傘", "泳圈", "球棒", "風箏"], 0, "因為下雨，小安帶了雨傘。"],
    ["小安為什麼慢慢走？", ["避免滑倒", "等太陽", "找玩具", "數星星"], 0, "雨天地面潮濕，慢慢走比較安全。"]
  ]],
  ["整理書包", "晚上，小樂先看功課表，再把明天要用的課本和鉛筆盒放進書包。最後，他把水壺放在門邊。", [
    ["小樂先看什麼？", ["功課表", "電視", "圖畫", "時鐘"], 0, "短文說小樂先看功課表。"],
    ["水壺放在哪裡？", ["門邊", "床下", "桌上", "浴室"], 0, "最後一句說水壺放在門邊。"]
  ]],
  ["小貓找球", "小貓的藍球不見了。它先找桌子下面，再找窗簾後面。最後，它在椅子旁邊找到藍球。", [
    ["小貓在找什麼？", ["藍球", "紅筆", "黃花", "白雲"], 0, "小貓要找不見的藍球。"],
    ["小貓最後在哪裡找到球？", ["椅子旁邊", "桌子上", "門外", "書包裡"], 0, "它在椅子旁邊找到球。"]
  ]],
  ["校園花園", "學校的花園裡有紅花和黃花。下課時，孩子們站在小路上觀察，沒有踩進花園，也沒有摘花。", [
    ["花園裡有哪兩種顏色的花？", ["紅花和黃花", "黑花和白花", "藍花和黑花", "綠花和灰花"], 0, "短文提到紅花和黃花。"],
    ["孩子們怎麼愛護花園？", ["不踩進去也不摘花", "把花全部拔起來", "在花園裡跑步", "把書包放在花上"], 0, "他們留在小路上，不踩花園也不摘花。"]
  ]],
  ["分蘋果", "桌上有兩顆蘋果。小珍把一顆給弟弟，自己留下一顆。兩個人一起吃，都很開心。", [
    ["小珍把蘋果給了誰？", ["弟弟", "老師", "小貓", "校長"], 0, "小珍把一顆蘋果給弟弟。"],
    ["這個故事主要告訴我們什麼？", ["分享很快樂", "跑步要很快", "蘋果不能吃", "桌子要塗紅色"], 0, "小珍願意分享，兩人都很開心。"]
  ]],
  ["圖書角", "教室後面有一個圖書角。阿文選了一本動物故事，看完後輕輕放回原來的位置。", [
    ["圖書角在哪裡？", ["教室後面", "操場中間", "校門外", "廚房裡"], 0, "圖書角在教室後面。"],
    ["阿文看完書後怎麼做？", ["放回原位", "丟在地上", "帶到操場", "畫在書上"], 0, "他輕輕把書放回原來的位置。"]
  ]],
  ["紅氣球", "風吹來，紅氣球從小莉手中飛走了。氣球飛過屋頂，最後卡在大樹的樹枝上。", [
    ["氣球為什麼飛走？", ["風吹來了", "天黑了", "下雪了", "小鳥唱歌"], 0, "風把氣球吹走了。"],
    ["氣球最後在哪裡？", ["樹枝上", "水裡", "書包裡", "桌子下"], 0, "氣球卡在大樹的樹枝上。"]
  ]],
  ["一起吃飯", "晚餐時，爸爸盛飯，媽媽端菜，小元擺好筷子。全家坐好後，才一起開心吃飯。", [
    ["小元幫忙做什麼？", ["擺筷子", "洗汽車", "畫黑板", "踢足球"], 0, "小元幫忙把筷子擺好。"],
    ["家人什麼時候開始吃飯？", ["全家坐好後", "菜還沒煮時", "只有小元時", "大家都出門後"], 0, "短文說全家坐好後才開始吃飯。"]
  ]],
  ["小兔種菜", "小兔把菜籽放進土裡，每天澆一點水。過了幾天，土裡冒出小小的綠芽。", [
    ["小兔每天做什麼？", ["澆一點水", "把菜籽挖走", "在土上跳", "把綠芽摘掉"], 0, "小兔每天都給菜籽澆一點水。"],
    ["幾天後，土裡出現什麼？", ["綠芽", "石頭", "雨傘", "鉛筆"], 0, "土裡冒出小小的綠芽。"]
  ]],
  ["放學以後", "放學鐘響了，小光先把椅子推進桌下，再把地上的紙屑撿起來。他和老師說再見，才背著書包回家。", [
    ["小光離開教室前做了什麼？", ["整理椅子和紙屑", "在黑板上畫畫", "把課本丟在地上", "關掉校門"], 0, "他把椅子推好，也撿起紙屑。"],
    ["小光最後跟誰說再見？", ["老師", "小貓", "店員", "醫生"], 0, "小光和老師說再見後回家。"]
  ]]
];

function hashCode(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle(values, seedText) {
  const result = [...values];
  let seed = hashCode(seedText) || 1;
  for (let i = result.length - 1; i > 0; i -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function optionSet(correct, pool, seedText, size = 4) {
  const unique = [...new Set(pool.filter(item => String(item) !== String(correct)))];
  return seededShuffle([correct, ...seededShuffle(unique, `${seedText}-pool`).slice(0, size - 1)], `${seedText}-final`);
}

function question({ id, subject, unit, level = 1, prompt, support = "", options, correct, explanation, hint, visual = null, speak = null }) {
  return { id, subject, unit, level, prompt, support, options, correct, explanation, hint, visual, speak: speak || prompt };
}

function buildChineseQuestions() {
  const list = [];
  INITIALS.forEach((symbol, index) => {
    const options = optionSet(symbol, [...FINALS, ...INITIALS.filter(x => x !== symbol).slice(index % 8, index % 8 + 2)], `initial-${symbol}`);
    list.push(question({
      id: `zh-initial-${index}`, subject: "chinese", unit: "注音符號", level: 1,
      prompt: "下面哪一個是聲符？", support: "聲符通常放在音節的前面。",
      options, correct: options.indexOf(symbol), explanation: `${symbol} 是聲符。`, hint: "先想想「ㄅ、ㄆ、ㄇ、ㄈ」是哪一類符號。"
    }));
  });
  FINALS.forEach((symbol, index) => {
    const options = optionSet(symbol, [...INITIALS, ...FINALS.filter(x => x !== symbol).slice(index % 7, index % 7 + 2)], `final-${symbol}`);
    list.push(question({
      id: `zh-final-${index}`, subject: "chinese", unit: "注音符號", level: 1,
      prompt: "下面哪一個是韻符？", support: "韻符會和聲符一起拼成音節。",
      options, correct: options.indexOf(symbol), explanation: `${symbol} 是韻符。`, hint: "ㄊ、ㄋ、ㄌ是聲符，找出和它們不同類的符號。"
    }));
  });
  TONES.forEach((tone, index) => {
    const nameOptions = optionSet(tone.name, TONES.map(x => x.name), `tone-name-${tone.name}`);
    list.push(question({
      id: `zh-tone-${index}`, subject: "chinese", unit: "拼音聲調", level: index === 4 ? 2 : 1,
      prompt: `「${tone.sample}」使用了哪一種聲調？`, options: nameOptions, correct: nameOptions.indexOf(tone.name),
      explanation: `${tone.sample} 是${tone.name}。`, hint: tone.name === "輕聲" ? "輕聲的小點要放在整個注音音節前面。" : "注意音節旁邊的調號。"
    }));
  });

  const readingPool = WORDS.map(item => item.reading);
  const wordPool = WORDS.map(item => item.word);
  const sentencePool = WORDS.map(item => item.sentence);
  WORDS.forEach((item, index) => {
    let options = optionSet(item.reading, readingPool, `word-reading-${item.word}`);
    list.push(question({
      id: `zh-reading-${index}`, subject: "chinese", unit: "國字詞語", level: 1,
      prompt: `「${item.word}」的注音是哪一個？`, support: item.emoji, options, correct: options.indexOf(item.reading),
      explanation: `${item.word}：${item.reading}。`, hint: "先慢慢念一遍詞語，再對照每個音節。", speak: item.word
    }));

    options = optionSet(item.word, wordPool, `reading-word-${item.word}`);
    list.push(question({
      id: `zh-word-${index}`, subject: "chinese", unit: "國字詞語", level: 2,
      prompt: `哪一個詞語讀作「${item.reading}」？`, support: item.emoji, options, correct: options.indexOf(item.word),
      explanation: `${item.word} 讀作 ${item.reading}。`, hint: "一個一個念出選項，找出相同的讀音。", speak: item.reading
    }));

    const sentencePrompt = item.sentence.replace(item.word, "□□");
    options = optionSet(item.word, wordPool, `sentence-${item.word}`);
    list.push(question({
      id: `zh-sentence-${index}`, subject: "chinese", unit: "句子運用", level: 2,
      prompt: "選出最適合填進句子的詞語。", support: sentencePrompt, options, correct: options.indexOf(item.word),
      explanation: item.sentence, hint: `這個空格和 ${item.emoji} 有關。`, speak: sentencePrompt
    }));

    options = optionSet(item.word, wordPool, `picture-word-${item.word}`);
    list.push(question({
      id: `zh-picture-${index}`, subject: "chinese", unit: "國字詞語", level: 1,
      prompt: "看圖和注音，選出正確的詞語。", support: `${item.emoji}　${item.reading}`,
      options, correct: options.indexOf(item.word), explanation: `${item.word}：${item.reading}。`,
      hint: "先拼讀注音，再看圖找出對應的詞語。", speak: item.word
    }));

    options = optionSet(item.sentence, sentencePool, `sentence-match-${item.word}`);
    list.push(question({
      id: `zh-sentence-match-${index}`, subject: "chinese", unit: "句子運用", level: 3,
      prompt: `哪一句話正確使用了「${item.word}」？`, support: `${item.word}　${item.reading}`,
      options, correct: options.indexOf(item.sentence), explanation: item.sentence,
      hint: "逐句閱讀，找出句意通順且包含題目詞語的選項。", speak: `${item.word}。哪一句話使用正確？`
    }));

    const correctPair = `${item.word}－${item.reading}`;
    const pairPool = WORDS.map(other => `${item.word}－${other.reading}`);
    options = optionSet(correctPair, pairPool, `pair-${item.word}`);
    list.push(question({
      id: `zh-pair-${index}`, subject: "chinese", unit: "拼音聲調", level: 3,
      prompt: "哪一組詞語和注音的配對正確？", support: item.emoji,
      options, correct: options.indexOf(correctPair), explanation: `${item.word} 讀作 ${item.reading}。`,
      hint: "注意每個音節和聲調符號。", speak: `${item.word}讀作${item.reading}`
    }));
  });

  PASSAGES.forEach(([title, text, items], passageIndex) => {
    items.forEach(([prompt, options, correct, explanation], itemIndex) => {
      list.push(question({
        id: `zh-passage-${passageIndex}-${itemIndex}`, subject: "chinese", unit: "閱讀理解", level: itemIndex === 0 ? 2 : 3,
        prompt, support: `【${title}】${text}`, options, correct, explanation,
        hint: "再讀一次短文，把題目中的關鍵詞和短文對照。", speak: `${title}。${text}。${prompt}`
      }));
    });
  });
  return list;
}

function nearbyNumberOptions(correct, min, max, seedText) {
  const pool = [];
  for (let n = min; n <= max; n += 1) pool.push(String(n));
  return optionSet(String(correct), pool, seedText);
}

function buildMathQuestions() {
  const list = [];
  const icons = ["🍎", "⭐", "🍓", "🐟", "🧩", "🌈"];

  for (let n = 0; n <= 10; n += 1) {
    const options = nearbyNumberOptions(n, 0, 10, `count-${n}`);
    list.push(question({
      id: `math-count-${n}`, subject: "math", unit: "數到10", level: 1,
      prompt: "數一數，一共有幾個？", options, correct: options.indexOf(String(n)),
      explanation: `一個一個點數，共有 ${n} 個。`, hint: "用手指從左到右點一次。",
      visual: { type: "dots", count: n, emoji: icons[n % icons.length] }, speak: `數一數，一共有幾個？`
    }));
  }
  for (let n = 0; n < 10; n += 1) {
    let options = nearbyNumberOptions(n + 1, 0, 10, `next-${n}`);
    list.push(question({ id: `math-next-${n}`, subject: "math", unit: "數到10", level: 1, prompt: `${n} 的後面一個數是多少？`, options, correct: options.indexOf(String(n + 1)), explanation: `從 ${n} 往後數一個是 ${n + 1}。`, hint: "從題目的數再往後數一下。", visual: { type: "expression", text: `${n} → □` } }));
  }

  const lengthItems = [
    ["比較鉛筆和橡皮擦的長度，通常哪一個比較長？", ["鉛筆", "橡皮擦", "一樣長", "不能比"], 0],
    ["比長短時，應該先怎麼放？", ["一端對齊", "一個放高處", "隨便丟", "互相重疊看不見"], 0],
    ["用相同的回形針量桌邊，用得越多表示怎麼樣？", ["桌邊越長", "桌邊越短", "顏色越深", "桌子越輕"], 0],
    ["紅繩用 8 個積木量，藍繩用 6 個積木量，哪條比較長？", ["紅繩", "藍繩", "一樣長", "資料不夠"], 0]
  ];
  lengthItems.forEach((item, i) => list.push(question({ id: `math-length-${i}`, subject: "math", unit: "比長短", level: i < 2 ? 1 : 2, prompt: item[0], options: item[1], correct: item[2], explanation: `正確答案是「${item[1][item[2]]}」。`, hint: "比長短時，要有相同的起點或相同的測量物。" })));

  for (let total = 2; total <= 10; total += 1) {
    for (let part = 0; part <= total; part += 1) {
      const missing = total - part;
      const options = nearbyNumberOptions(missing, 0, 10, `split-${total}-${part}`);
      list.push(question({
        id: `math-split-${total}-${part}`, subject: "math", unit: "分與合", level: total <= 5 ? 1 : 2,
        prompt: `${total} 可以分成 ${part} 和多少？`, options, correct: options.indexOf(String(missing)),
        explanation: `${part} 和 ${missing} 合起來是 ${total}。`, hint: `從 ${part} 再往後數，數到 ${total} 看看數了幾次。`,
        visual: { type: "expression", text: `${part} + □ = ${total}` }
      }));
    }
  }

  for (let n = 1; n <= 9; n += 1) {
    let options = nearbyNumberOptions(n + 1, 0, 10, `after-order-${n}`);
    list.push(question({ id: `math-order-after-${n}`, subject: "math", unit: "順序和多少", level: 1, prompt: `數字 ${n} 後面緊接著哪一個數？`, options, correct: options.indexOf(String(n + 1)), explanation: `${n} 後面是 ${n + 1}。`, hint: "把數字從 1 開始念一次。" }));
    options = nearbyNumberOptions(n - 1, 0, 10, `before-order-${n}`);
    list.push(question({ id: `math-order-before-${n}`, subject: "math", unit: "順序和多少", level: 1, prompt: `數字 ${n} 前面緊接著哪一個數？`, options, correct: options.indexOf(String(n - 1)), explanation: `${n} 前面是 ${n - 1}。`, hint: "把數字從 1 開始念一次。" }));
  }
  for (let a = 1; a <= 10; a += 1) {
    const b = (a * 3 + 2) % 11;
    const correct = a === b ? "一樣多" : (a > b ? `${a} 比較多` : `${b} 比較多`);
    const comparisonPool = a === b
      ? [`${a} 比較多`, "一樣多", "兩個都沒有", "無法比較"]
      : [`${a} 比較多`, `${b} 比較多`, "一樣多", "無法比較"];
    const options = optionSet(correct, comparisonPool, `more-${a}-${b}`);
    list.push(question({ id: `math-more-${a}`, subject: "math", unit: "順序和多少", level: 2, prompt: `${a} 和 ${b} 比一比，哪一個數量比較多？`, options, correct: options.indexOf(correct), explanation: correct === "一樣多" ? `${a} 和 ${b} 一樣多。` : `正確答案是${correct}。`, hint: "可以把數字放到數線上，比較後面的數較多。" }));
  }

  for (let n = 11; n <= 30; n += 1) {
    let options = nearbyNumberOptions(n, 10, 30, `read-30-${n}`);
    list.push(question({ id: `math-read30-${n}`, subject: "math", unit: "數到30", level: 1, prompt: `1 個十和 ${n - 10} 個一合起來是多少？`, options, correct: options.indexOf(String(n)), explanation: `1 個十是 10，再加 ${n - 10} 是 ${n}。`, hint: `先想 10，再往後數 ${n - 10} 個。`, visual: { type: "expression", text: `10 + ${n - 10} = □` } }));
  }
  for (let n = 11; n < 30; n += 1) {
    const options = nearbyNumberOptions(n + 1, 10, 30, `next30-${n}`);
    list.push(question({ id: `math-next30-${n}`, subject: "math", unit: "數到30", level: 2, prompt: `${n} 再數一個是多少？`, options, correct: options.indexOf(String(n + 1)), explanation: `${n} 的後面是 ${n + 1}。`, hint: "往後數一個。" }));
  }

  for (let a = 0; a <= 10; a += 1) {
    for (let b = 0; b <= 10 - a; b += 1) {
      const sum = a + b;
      const options = nearbyNumberOptions(sum, 0, 10, `add-${a}-${b}`);
      list.push(question({ id: `math-add-${a}-${b}`, subject: "math", unit: "加一加", level: sum <= 5 ? 1 : 2, prompt: `${a} + ${b} = ？`, options, correct: options.indexOf(String(sum)), explanation: `${a} 加 ${b} 等於 ${sum}。`, hint: `從 ${a} 開始，往後數 ${b} 個。`, visual: { type: "expression", text: `${a} + ${b} = □` } }));
    }
  }

  const shapes = [
    ["圓形", "circle", "沒有角，邊緣是彎彎的。"],
    ["正方形", "square", "有 4 條一樣長的邊和 4 個角。"],
    ["三角形", "triangle", "有 3 條邊和 3 個角。"],
    ["長方形", "rectangle", "有 4 條邊和 4 個角，有長邊和短邊。"]
  ];
  shapes.forEach(([name, shape, explanation], index) => {
    const options = optionSet(name, shapes.map(item => item[0]), `shape-${name}`);
    list.push(question({ id: `math-shape-${index}`, subject: "math", unit: "認識形狀", level: 1, prompt: "圖中是什麼形狀？", options, correct: options.indexOf(name), explanation: `${name}${explanation}`, hint: "數數看有幾條邊、幾個角。", visual: { type: "shape", shape } }));
  });
  const shapeUses = [
    ["輪子最像哪一種形狀？", "圓形"], ["方形手帕最像哪種形狀？", "正方形"],
    ["三角板最像哪一種形狀？", "三角形"], ["書本的封面最像哪種形狀？", "長方形"]
  ];
  shapeUses.forEach(([prompt, correct], index) => { const options = optionSet(correct, shapes.map(item => item[0]), `shape-use-${index}`); list.push(question({ id: `math-shape-use-${index}`, subject: "math", unit: "認識形狀", level: 2, prompt, options, correct: options.indexOf(correct), explanation: `正確答案是${correct}。`, hint: "想想看這個物品的邊和角。" })); });

  for (let a = 1; a <= 10; a += 1) {
    for (let b = 0; b <= a; b += 1) {
      const difference = a - b;
      const options = nearbyNumberOptions(difference, 0, 10, `sub-${a}-${b}`);
      list.push(question({ id: `math-sub-${a}-${b}`, subject: "math", unit: "減一減", level: a <= 5 ? 1 : 2, prompt: `${a} - ${b} = ？`, options, correct: options.indexOf(String(difference)), explanation: `${a} 減 ${b} 等於 ${difference}。`, hint: `從 ${a} 開始，往前數 ${b} 個。`, visual: { type: "expression", text: `${a} - ${b} = □` } }));
    }
  }

  for (let hour = 1; hour <= 12; hour += 1) {
    let options = optionSet(`${hour} 點`, ["1 點", "3 點", "6 點", "9 點", "12 點", `${((hour + 3) % 12) || 12} 點`], `clock-${hour}`);
    list.push(question({ id: `math-clock-${hour}`, subject: "math", unit: "讀鐘錶", level: 1, prompt: "鐘面上是幾點？", options, correct: options.indexOf(`${hour} 點`), explanation: `分針指著 12，時針指著 ${hour}，所以是 ${hour} 點。`, hint: "先看短短的時針指在哪一個數字。", visual: { type: "clock", hour, minute: 0 } }));
  }
  [1, 3, 5, 7, 9, 11].forEach(hour => {
    const correctText = `${hour} 點半`;
    const options = optionSet(correctText, [`${hour} 點`, `${hour} 點半`, `${(hour % 12) + 1} 點`, `${(hour % 12) + 1} 點半`], `half-${hour}`);
    list.push(question({ id: `math-half-${hour}`, subject: "math", unit: "讀鐘錶", level: 2, prompt: "鐘面上是幾點半？", options, correct: options.indexOf(correctText), explanation: `分針指著 6，時間是 ${hour} 點半。`, hint: "分針指著 6 時，就是半點。", visual: { type: "clock", hour, minute: 30 } }));
  });

  for (let n = 1; n <= 10; n += 1) {
    const options = nearbyNumberOptions(n - 1, 0, 10, `previous-${n}`);
    list.push(question({
      id: `math-previous-${n}`, subject: "math", unit: "數到10", level: 1,
      prompt: `${n} 的前面一個數是多少？`, options, correct: options.indexOf(String(n - 1)),
      explanation: `從 ${n} 往前數一個是 ${n - 1}。`, hint: "從題目的數往前數一下。",
      visual: { type: "expression", text: `□ → ${n}` }
    }));
  }

  let compareIndex = 0;
  compareLoop:
  for (let smaller = 0; smaller <= 10; smaller += 1) {
    for (let larger = smaller + 1; larger <= 10; larger += 1) {
      if (compareIndex >= 20) break compareLoop;
      const left = compareIndex % 2 === 0 ? smaller : larger;
      const right = compareIndex % 2 === 0 ? larger : smaller;
      const correct = left > right ? `${left} 比較多` : `${right} 比較多`;
      const options = optionSet(correct, [`${left} 比較多`, `${right} 比較多`, "一樣多", "無法比較"], `count-compare-${compareIndex}`);
      list.push(question({
        id: `math-count-compare-${compareIndex}`, subject: "math", unit: "順序和多少", level: 2,
        prompt: `${left} 個和 ${right} 個比一比，哪一邊比較多？`, options, correct: options.indexOf(correct),
        explanation: `${Math.max(left, right)} 大於 ${Math.min(left, right)}，所以${correct}。`, hint: "把兩個數放到數線上，較後面的數比較多。"
      }));
      compareIndex += 1;
    }
  }

  let orderIndex = 0;
  orderLoop:
  for (let a = 0; a <= 8; a += 1) {
    for (let b = a + 1; b <= 9; b += 1) {
      for (let c = b + 1; c <= 10; c += 1) {
        if (orderIndex >= 20) break orderLoop;
        const correct = `${a}、${b}、${c}`;
        const options = optionSet(correct, [`${c}、${b}、${a}`, `${a}、${c}、${b}`, `${b}、${a}、${c}`, `${b}、${c}、${a}`], `order-three-${orderIndex}`);
        list.push(question({
          id: `math-order-three-${orderIndex}`, subject: "math", unit: "順序和多少", level: 3,
          prompt: `把 ${c}、${a}、${b} 從小到大排列。`, options, correct: options.indexOf(correct),
          explanation: `從小到大是 ${correct}。`, hint: "先找出最小的數，再找出最大的數。"
        }));
        orderIndex += 1;
      }
    }
  }

  for (let n = 11; n <= 30; n += 1) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    const options = nearbyNumberOptions(n, 10, 30, `tens-ones-${n}`);
    list.push(question({
      id: `math-tens-ones-${n}`, subject: "math", unit: "數到30", level: 2,
      prompt: `${tens} 個十和 ${ones} 個一合起來是多少？`, options, correct: options.indexOf(String(n)),
      explanation: `${tens} 個十是 ${tens * 10}，再加 ${ones} 是 ${n}。`, hint: "先看十位，再看個位。",
      visual: { type: "expression", text: `${tens * 10} + ${ones} = □` }
    }));
  }

  for (let a = 0; a <= 10; a += 1) {
    for (let b = 0; b <= 10 - a; b += 1) {
      const sum = a + b;
      const options = nearbyNumberOptions(sum, 0, 10, `add-story-${a}-${b}`);
      const prompt = a === 0
        ? `盤子原本沒有草莓，放進 ${b} 顆，現在有幾顆？`
        : b === 0
          ? `盤子裡有 ${a} 顆草莓，沒有再放進草莓，現在有幾顆？`
          : `盤子裡有 ${a} 顆草莓，又放進 ${b} 顆，現在有幾顆？`;
      list.push(question({
        id: `math-add-story-${a}-${b}`, subject: "math", unit: "加一加", level: sum <= 5 ? 2 : 3,
        prompt, options, correct: options.indexOf(String(sum)), explanation: `${a} + ${b} = ${sum}，所以有 ${sum} 顆草莓。`,
        hint: "「又放進」表示數量變多，可以用加法。", visual: { type: "expression", text: `${a} + ${b} = □` }
      }));
    }
  }

  for (let a = 1; a <= 10; a += 1) {
    for (let b = 1; b <= a; b += 1) {
      if (a <= 3 && b === a) continue;
      const difference = a - b;
      const options = nearbyNumberOptions(difference, 0, 10, `sub-story-${a}-${b}`);
      list.push(question({
        id: `math-sub-story-${a}-${b}`, subject: "math", unit: "減一減", level: a <= 5 ? 2 : 3,
        prompt: `盒子裡有 ${a} 片餅乾，吃了 ${b} 片，還剩幾片？`, options, correct: options.indexOf(String(difference)),
        explanation: `${a} - ${b} = ${difference}，所以還剩 ${difference} 片。`,
        hint: "「吃了」表示數量變少，可以用減法。", visual: { type: "expression", text: `${a} - ${b} = □` }
      }));
    }
  }
  return list;
}

const QUESTION_BANK = [...buildChineseQuestions(), ...buildMathQuestions()];

const els = {
  home: document.querySelector("#homeView"), quiz: document.querySelector("#quizView"), result: document.querySelector("#resultView"),
  setupForm: document.querySelector("#setupForm"), unitSelect: document.querySelector("#unitSelect"), levelSelect: document.querySelector("#levelSelect"),
  totalAnswered: document.querySelector("#totalAnswered"), accuracyRate: document.querySelector("#accuracyRate"), bestScore: document.querySelector("#bestScore"),
  chineseProgress: document.querySelector("#chineseProgress"), chineseProgressText: document.querySelector("#chineseProgressText"), mathProgress: document.querySelector("#mathProgress"), mathProgressText: document.querySelector("#mathProgressText"),
  soundToggle: document.querySelector("#soundToggle"), resetProgress: document.querySelector("#resetProgress"), quitQuiz: document.querySelector("#quitQuiz"), readQuestion: document.querySelector("#readQuestion"),
  subjectTag: document.querySelector("#subjectTag"), unitTag: document.querySelector("#unitTag"), questionCounter: document.querySelector("#questionCounter"), scoreCounter: document.querySelector("#scoreCounter"), quizProgressBar: document.querySelector("#quizProgressBar"),
  difficultyLabel: document.querySelector("#difficultyLabel"), questionTitle: document.querySelector("#questionTitle"), questionSupport: document.querySelector("#questionSupport"), questionVisual: document.querySelector("#questionVisual"), answers: document.querySelector("#answers"),
  hintButton: document.querySelector("#hintButton"), nextQuestion: document.querySelector("#nextQuestion"), feedback: document.querySelector("#feedback"),
  resultTitle: document.querySelector("#resultTitle"), resultEmoji: document.querySelector("#resultEmoji"), resultSummary: document.querySelector("#resultSummary"), resultScore: document.querySelector("#resultScore"), resultTotal: document.querySelector("#resultTotal"), resultMessage: document.querySelector("#resultMessage"), retryWrong: document.querySelector("#retryWrong"), returnHome: document.querySelector("#returnHome"),
  bankCount: document.querySelector("#bankCount"), toast: document.querySelector("#toast")
};

const defaultStats = { total: 0, correct: 0, best: 0, chinese: { total: 0, correct: 0 }, math: { total: 0, correct: 0 } };
let stats = loadStats();
let soundOn = localStorage.getItem("grade1-sound") !== "off";
let quiz = { questions: [], index: 0, correct: 0, wrong: [], answered: false };

function loadStats() {
  try { return { ...defaultStats, ...JSON.parse(localStorage.getItem("grade1-stats") || "{}") }; }
  catch { return structuredClone(defaultStats); }
}

function saveStats() { localStorage.setItem("grade1-stats", JSON.stringify(stats)); }

function selectedSubject() { return document.querySelector('input[name="subject"]:checked').value; }

function updateUnitOptions() {
  const subject = selectedSubject();
  const options = subject === "mixed" ? ["全部範圍"] : UNITS[subject];
  els.unitSelect.replaceChildren(...options.map(unit => {
    const option = document.createElement("option"); option.value = unit; option.textContent = unit; return option;
  }));
}

function updateStatsView() {
  els.totalAnswered.textContent = stats.total;
  els.accuracyRate.textContent = stats.total ? `${Math.round((stats.correct / stats.total) * 100)}%` : "--";
  els.bestScore.textContent = stats.best;
  ["chinese", "math"].forEach(subject => {
    const data = stats[subject] || { total: 0, correct: 0 };
    const percent = data.total ? Math.round((data.correct / data.total) * 100) : 0;
    els[`${subject}Progress`].value = percent;
    els[`${subject}ProgressText`].textContent = `${data.correct} / ${data.total}`;
  });
}

function showView(name) {
  [els.home, els.quiz, els.result].forEach(view => view.classList.remove("is-active"));
  els[name].classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function chooseQuestions(subject, unit, level, count) {
  let pool = QUESTION_BANK.filter(q => subject === "mixed" || q.subject === subject);
  if (!unit.startsWith("全部")) pool = pool.filter(q => q.unit === unit);
  if (level !== "all") pool = pool.filter(q => String(q.level) === level);
  if (pool.length < count) {
    pool = QUESTION_BANK.filter(q => (subject === "mixed" || q.subject === subject) && (unit.startsWith("全部") || q.unit === unit));
  }
  return seededShuffle(pool, `${Date.now()}-${subject}-${unit}-${level}`).slice(0, Math.min(count, pool.length));
}

function startQuiz(questions) {
  quiz = { questions, index: 0, correct: 0, wrong: [], answered: false };
  showView("quiz");
  renderQuestion();
}

function renderVisual(visual) {
  els.questionVisual.replaceChildren();
  if (!visual) return;
  if (visual.type === "dots") {
    if (visual.count === 0) { els.questionVisual.textContent = "（沒有任何物品）"; return; }
    for (let i = 0; i < visual.count; i += 1) { const span = document.createElement("span"); span.className = "dot-item"; span.textContent = visual.emoji; els.questionVisual.append(span); }
  } else if (visual.type === "expression") {
    const span = document.createElement("span"); span.className = "math-expression"; span.textContent = visual.text; els.questionVisual.append(span);
  } else if (visual.type === "shape") {
    const wrap = document.createElement("div"); wrap.className = "shape-visual";
    const shape = document.createElement("div"); shape.className = `shape-${visual.shape}`; wrap.append(shape); els.questionVisual.append(wrap);
  } else if (visual.type === "clock") {
    const clock = document.createElement("div"); clock.className = "clock";
    const hour = document.createElement("div"); hour.className = "clock-hand";
    const minute = document.createElement("div"); minute.className = "clock-hand minute";
    const hourDegrees = (visual.hour % 12) * 30 + visual.minute * .5;
    hour.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minute.style.transform = `translateX(-50%) rotate(${visual.minute * 6}deg)`;
    const center = document.createElement("div"); center.className = "clock-center";
    clock.append(hour, minute, center); els.questionVisual.append(clock);
  }
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  quiz.answered = false;
  els.questionCounter.textContent = `第 ${quiz.index + 1} 題 / ${quiz.questions.length}`;
  els.scoreCounter.textContent = `答對 ${quiz.correct} 題`;
  els.quizProgressBar.style.width = `${(quiz.index / quiz.questions.length) * 100}%`;
  els.subjectTag.textContent = q.subject === "chinese" ? "📖 國語" : "🧮 數學";
  els.unitTag.textContent = q.unit;
  els.difficultyLabel.textContent = ["", "🌱 基礎題", "🌿 進階題", "🌳 挑戰題"][q.level];
  els.questionTitle.textContent = q.prompt;
  els.questionSupport.textContent = q.support;
  renderVisual(q.visual);
  els.answers.replaceChildren();
  q.options.forEach((option, index) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "answer-button";
    const letter = document.createElement("span"); letter.className = "choice-letter"; letter.textContent = String.fromCharCode(65 + index);
    const text = document.createElement("span"); text.textContent = option;
    button.append(letter, text); button.addEventListener("click", () => answerQuestion(index)); els.answers.append(button);
  });
  els.feedback.className = "feedback"; els.feedback.textContent = "";
  els.nextQuestion.disabled = true; els.hintButton.disabled = false;
  els.nextQuestion.textContent = quiz.index === quiz.questions.length - 1 ? "看成績 →" : "下一題 →";
  els.questionTitle.focus?.();
}

function answerQuestion(choice) {
  if (quiz.answered) return;
  quiz.answered = true;
  const q = quiz.questions[quiz.index];
  const isCorrect = choice === q.correct;
  const buttons = [...els.answers.children];
  buttons.forEach((button, index) => { button.disabled = true; if (index === q.correct) button.classList.add("is-correct"); });
  if (!isCorrect) { buttons[choice].classList.add("is-wrong"); quiz.wrong.push(q); }
  else quiz.correct += 1;
  stats.total += 1; stats.correct += isCorrect ? 1 : 0;
  stats[q.subject] = stats[q.subject] || { total: 0, correct: 0 };
  stats[q.subject].total += 1; stats[q.subject].correct += isCorrect ? 1 : 0; saveStats(); updateStatsView();
  els.feedback.textContent = `${isCorrect ? "✅ 答對了！" : `❌ 正確答案是「${q.options[q.correct]}」。`} ${q.explanation}`;
  els.feedback.className = `feedback is-visible ${isCorrect ? "correct" : "wrong"}`;
  els.nextQuestion.disabled = false; els.hintButton.disabled = true; playTone(isCorrect ? "correct" : "wrong");
}

function nextQuestion() {
  if (!quiz.answered) return;
  if (quiz.index < quiz.questions.length - 1) { quiz.index += 1; renderQuestion(); }
  else finishQuiz();
}

function finishQuiz() {
  stats.best = Math.max(stats.best, quiz.correct); saveStats(); updateStatsView();
  const rate = quiz.correct / quiz.questions.length;
  els.resultScore.textContent = quiz.correct; els.resultTotal.textContent = quiz.questions.length;
  els.resultSummary.textContent = `這次答對 ${quiz.correct} 題，答錯 ${quiz.wrong.length} 題。`;
  if (rate === 1) { els.resultTitle.textContent = "全部答對！"; els.resultEmoji.textContent = "🏆"; els.resultMessage.textContent = "你已經很熟練了，可以挑戰進階題。"; }
  else if (rate >= .8) { els.resultTitle.textContent = "做得很棒！"; els.resultEmoji.textContent = "🎉"; els.resultMessage.textContent = "差一點就全部答對，再練習答錯題就更棒了。"; }
  else if (rate >= .6) { els.resultTitle.textContent = "有進步喲！"; els.resultEmoji.textContent = "🌟"; els.resultMessage.textContent = "不懂的地方慢慢讀，先把答錯題再做一次。"; }
  else { els.resultTitle.textContent = "繼續加油！"; els.resultEmoji.textContent = "💪"; els.resultMessage.textContent = "學習就是一步一步來，建議先選「基礎」再練一回。"; }
  els.retryWrong.hidden = quiz.wrong.length === 0; showView("result"); playTone("finish");
}

function speakCurrent() {
  if (!("speechSynthesis" in window)) { showToast("這個瀏覽器不支援語音朗讀。"); return; }
  const q = quiz.questions[quiz.index]; if (!q) return;
  speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(q.speak); utterance.lang = "zh-TW"; utterance.rate = .85;
  const voices = speechSynthesis.getVoices(); utterance.voice = voices.find(voice => /zh[-_]TW/i.test(voice.lang)) || voices.find(voice => /^zh/i.test(voice.lang)) || null;
  speechSynthesis.speak(utterance);
}

function playTone(type) {
  if (!soundOn) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext; const ctx = new AudioCtx(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination); osc.type = "sine"; osc.frequency.value = type === "wrong" ? 210 : type === "finish" ? 660 : 520;
    gain.gain.setValueAtTime(.07, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + (type === "finish" ? .45 : .2)); osc.start(); osc.stop(ctx.currentTime + (type === "finish" ? .45 : .2));
  } catch { /* Audio is optional. */ }
}

let toastTimer;
function showToast(message) { clearTimeout(toastTimer); els.toast.textContent = message; els.toast.classList.add("show"); toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200); }

document.querySelectorAll('input[name="subject"]').forEach(input => input.addEventListener("change", updateUnitOptions));
els.setupForm.addEventListener("submit", event => {
  event.preventDefault(); const subject = selectedSubject(); const unit = els.unitSelect.value; const level = els.levelSelect.value; const count = Number(document.querySelector('input[name="count"]:checked').value);
  const questions = chooseQuestions(subject, unit, level, count); if (!questions.length) { showToast("目前這個篩選沒有題目，請改選混合難度。"); return; } startQuiz(questions);
});
els.nextQuestion.addEventListener("click", nextQuestion);
els.hintButton.addEventListener("click", () => { const q = quiz.questions[quiz.index]; els.feedback.textContent = `💡 ${q.hint}`; els.feedback.className = "feedback is-visible"; });
els.readQuestion.addEventListener("click", speakCurrent);
els.quitQuiz.addEventListener("click", () => { if (confirm("要離開這次練習嗎？")) { speechSynthesis?.cancel?.(); showView("home"); } });
els.returnHome.addEventListener("click", () => showView("home"));
els.retryWrong.addEventListener("click", () => startQuiz(seededShuffle(quiz.wrong, `retry-${Date.now()}`)));
els.resetProgress.addEventListener("click", () => { if (confirm("確定要清除這台裝置的練習紀錄嗎？")) { stats = structuredClone(defaultStats); saveStats(); updateStatsView(); showToast("練習紀錄已清除。"); } });
els.soundToggle.addEventListener("click", () => { soundOn = !soundOn; localStorage.setItem("grade1-sound", soundOn ? "on" : "off"); els.soundToggle.textContent = soundOn ? "🔊" : "🔇"; els.soundToggle.setAttribute("aria-pressed", String(soundOn)); els.soundToggle.setAttribute("aria-label", soundOn ? "關閉按鍵音效" : "開啟按鍵音效"); });

updateUnitOptions(); updateStatsView(); els.soundToggle.textContent = soundOn ? "🔊" : "🔇";
els.bankCount.textContent = `題庫共 ${QUESTION_BANK.length} 題｜國語 ${QUESTION_BANK.filter(q => q.subject === "chinese").length} 題｜數學 ${QUESTION_BANK.filter(q => q.subject === "math").length} 題`;

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
