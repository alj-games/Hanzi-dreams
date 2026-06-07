/* ============================================================================
   HANZI DATABASE
   ============================================================================
   This file holds the CHARACTERS only (the "facts"). Your personal stuff —
   notes, the links you create, and pictures — is saved separately by the app,
   so adding new characters here will NEVER erase your notes or links. 💖

   HOW TO ADD A NEW CHARACTER
   --------------------------
   Copy one of the lines below, paste it at the end of the list (before the
   closing  ]; ), and change the values. Keep the commas!

     { char: "好", pinyin: "hǎo", tone: 3, meaning: "good", category: "People & Family" },

   THE FIELDS
   --------------------------
   char     – the character itself (Simplified)
   pinyin   – pronunciation WITH the tone mark, e.g. "mā", "hǎo", "nǐ"
   tone     – a number for the colour-coding:
                1 = first tone   (pink)     ˉ
                2 = second tone  (orange)   ˊ
                3 = third tone   (blue)     ˇ
                4 = fourth tone  (lilac)    ˋ
                5 = neutral tone (grey)     · (e.g. 吗, 们, 么)
   meaning  – the English meaning
   category – any label you like. The app builds the filter buttons
              automatically from whatever categories it finds here, so if you
              invent a new category it just appears. ✨

   TIP: to type pinyin tone marks easily, search "online pinyin input" or copy
   them from here:  ā á ǎ à   ē é ě è   ī í ǐ ì   ō ó ǒ ò   ū ú ǔ ù   ǖ ǘ ǚ ǜ
   ============================================================================ */

const hanziDatabase = [

  // ---- Numbers ----
  { char: "一", pinyin: "yī",   tone: 1, meaning: "one",          category: "Numbers" },
  { char: "二", pinyin: "èr",   tone: 4, meaning: "two",          category: "Numbers" },
  { char: "三", pinyin: "sān",  tone: 1, meaning: "three",        category: "Numbers" },
  { char: "四", pinyin: "sì",   tone: 4, meaning: "four",         category: "Numbers" },
  { char: "五", pinyin: "wǔ",   tone: 3, meaning: "five",         category: "Numbers" },
  { char: "六", pinyin: "liù",  tone: 4, meaning: "six",          category: "Numbers" },
  { char: "七", pinyin: "qī",   tone: 1, meaning: "seven",        category: "Numbers" },
  { char: "八", pinyin: "bā",   tone: 1, meaning: "eight",        category: "Numbers" },
  { char: "九", pinyin: "jiǔ",  tone: 3, meaning: "nine",         category: "Numbers" },
  { char: "十", pinyin: "shí",  tone: 2, meaning: "ten",          category: "Numbers" },
  { char: "百", pinyin: "bǎi",  tone: 3, meaning: "hundred",      category: "Numbers" },
  { char: "千", pinyin: "qiān", tone: 1, meaning: "thousand",     category: "Numbers" },
  { char: "万", pinyin: "wàn",  tone: 4, meaning: "ten thousand", category: "Numbers" },
  { char: "零", pinyin: "líng", tone: 2, meaning: "zero",         category: "Numbers" },

  // ---- Pronouns & Particles ----
  { char: "我", pinyin: "wǒ",   tone: 3, meaning: "I, me",            category: "Pronouns" },
  { char: "你", pinyin: "nǐ",   tone: 3, meaning: "you",             category: "Pronouns" },
  { char: "他", pinyin: "tā",   tone: 1, meaning: "he, him",         category: "Pronouns" },
  { char: "她", pinyin: "tā",   tone: 1, meaning: "she, her",        category: "Pronouns" },
  { char: "们", pinyin: "men",  tone: 5, meaning: "(plural marker)", category: "Pronouns" },
  { char: "这", pinyin: "zhè",  tone: 4, meaning: "this",            category: "Pronouns" },
  { char: "那", pinyin: "nà",   tone: 4, meaning: "that",            category: "Pronouns" },
  { char: "哪", pinyin: "nǎ",   tone: 3, meaning: "which",           category: "Pronouns" },
  { char: "谁", pinyin: "shéi", tone: 2, meaning: "who",             category: "Pronouns" },
  { char: "什", pinyin: "shén", tone: 2, meaning: "what (什么)",      category: "Pronouns" },
  { char: "么", pinyin: "me",   tone: 5, meaning: "(suffix, 什么)",   category: "Pronouns" },
  { char: "吗", pinyin: "ma",   tone: 5, meaning: "(question word)", category: "Pronouns" },

  // ---- People & Family ----
  { char: "人", pinyin: "rén",  tone: 2, meaning: "person",         category: "People & Family" },
  { char: "大", pinyin: "dà",   tone: 4, meaning: "big",            category: "People & Family" },
  { char: "小", pinyin: "xiǎo", tone: 3, meaning: "small",          category: "People & Family" },
  { char: "男", pinyin: "nán",  tone: 2, meaning: "male, man",      category: "People & Family" },
  { char: "女", pinyin: "nǚ",   tone: 3, meaning: "female, woman",  category: "People & Family" },
  { char: "子", pinyin: "zǐ",   tone: 3, meaning: "child",          category: "People & Family" },
  { char: "好", pinyin: "hǎo",  tone: 3, meaning: "good",           category: "People & Family" },
  { char: "妈", pinyin: "mā",   tone: 1, meaning: "mother",         category: "People & Family" },
  { char: "爸", pinyin: "bà",   tone: 4, meaning: "father",         category: "People & Family" },
  { char: "哥", pinyin: "gē",   tone: 1, meaning: "older brother",  category: "People & Family" },
  { char: "姐", pinyin: "jiě",  tone: 3, meaning: "older sister",   category: "People & Family" },
  { char: "弟", pinyin: "dì",   tone: 4, meaning: "younger brother",category: "People & Family" },
  { char: "妹", pinyin: "mèi",  tone: 4, meaning: "younger sister", category: "People & Family" },
  { char: "朋", pinyin: "péng", tone: 2, meaning: "friend (朋友)",   category: "People & Family" },
  { char: "友", pinyin: "yǒu",  tone: 3, meaning: "friend",         category: "People & Family" },
  { char: "名", pinyin: "míng", tone: 2, meaning: "name",           category: "People & Family" },

  // ---- Body ----
  { char: "口", pinyin: "kǒu",  tone: 3, meaning: "mouth",     category: "Body" },
  { char: "目", pinyin: "mù",   tone: 4, meaning: "eye",       category: "Body" },
  { char: "手", pinyin: "shǒu", tone: 3, meaning: "hand",      category: "Body" },
  { char: "心", pinyin: "xīn",  tone: 1, meaning: "heart",     category: "Body" },
  { char: "头", pinyin: "tóu",  tone: 2, meaning: "head",      category: "Body" },
  { char: "足", pinyin: "zú",   tone: 2, meaning: "foot",      category: "Body" },
  { char: "力", pinyin: "lì",   tone: 4, meaning: "strength",  category: "Body" },

  // ---- Nature ----
  { char: "木", pinyin: "mù",   tone: 4, meaning: "tree, wood",   category: "Nature" },
  { char: "林", pinyin: "lín",  tone: 2, meaning: "woods",        category: "Nature" },
  { char: "森", pinyin: "sēn",  tone: 1, meaning: "forest",       category: "Nature" },
  { char: "本", pinyin: "běn",  tone: 3, meaning: "root, origin", category: "Nature" },
  { char: "村", pinyin: "cūn",  tone: 1, meaning: "village",      category: "Nature" },
  { char: "寸", pinyin: "cùn",  tone: 4, meaning: "inch",         category: "Nature" },
  { char: "休", pinyin: "xiū",  tone: 1, meaning: "to rest",      category: "Nature" },
  { char: "水", pinyin: "shuǐ", tone: 3, meaning: "water",        category: "Nature" },
  { char: "火", pinyin: "huǒ",  tone: 3, meaning: "fire",         category: "Nature" },
  { char: "山", pinyin: "shān", tone: 1, meaning: "mountain",     category: "Nature" },
  { char: "石", pinyin: "shí",  tone: 2, meaning: "stone",        category: "Nature" },
  { char: "田", pinyin: "tián", tone: 2, meaning: "field",        category: "Nature" },
  { char: "土", pinyin: "tǔ",   tone: 3, meaning: "earth, soil",  category: "Nature" },
  { char: "日", pinyin: "rì",   tone: 4, meaning: "sun, day",     category: "Nature" },
  { char: "月", pinyin: "yuè",  tone: 4, meaning: "moon, month",  category: "Nature" },
  { char: "明", pinyin: "míng", tone: 2, meaning: "bright",       category: "Nature" },
  { char: "星", pinyin: "xīng", tone: 1, meaning: "star",         category: "Nature" },
  { char: "天", pinyin: "tiān", tone: 1, meaning: "sky, day",     category: "Nature" },
  { char: "云", pinyin: "yún",  tone: 2, meaning: "cloud",        category: "Nature" },
  { char: "风", pinyin: "fēng", tone: 1, meaning: "wind",         category: "Nature" },
  { char: "雨", pinyin: "yǔ",   tone: 3, meaning: "rain",         category: "Nature" },
  { char: "电", pinyin: "diàn", tone: 4, meaning: "electricity",  category: "Nature" },
  { char: "花", pinyin: "huā",  tone: 1, meaning: "flower",       category: "Nature" },
  { char: "草", pinyin: "cǎo",  tone: 3, meaning: "grass",        category: "Nature" },

  // ---- Animals ----
  { char: "鱼", pinyin: "yú",   tone: 2, meaning: "fish",     category: "Animals" },
  { char: "鸟", pinyin: "niǎo", tone: 3, meaning: "bird",     category: "Animals" },
  { char: "马", pinyin: "mǎ",   tone: 3, meaning: "horse",    category: "Animals" },
  { char: "牛", pinyin: "niú",  tone: 2, meaning: "cow, ox",  category: "Animals" },
  { char: "羊", pinyin: "yáng", tone: 2, meaning: "sheep",    category: "Animals" },
  { char: "猫", pinyin: "māo",  tone: 1, meaning: "cat",      category: "Animals" },
  { char: "狗", pinyin: "gǒu",  tone: 3, meaning: "dog",      category: "Animals" },

  // ---- Verbs ----
  { char: "是", pinyin: "shì",   tone: 4, meaning: "to be",            category: "Verbs" },
  { char: "有", pinyin: "yǒu",   tone: 3, meaning: "to have",          category: "Verbs" },
  { char: "看", pinyin: "kàn",   tone: 4, meaning: "to look, watch",   category: "Verbs" },
  { char: "听", pinyin: "tīng",  tone: 1, meaning: "to listen",        category: "Verbs" },
  { char: "说", pinyin: "shuō",  tone: 1, meaning: "to speak",         category: "Verbs" },
  { char: "读", pinyin: "dú",    tone: 2, meaning: "to read",          category: "Verbs" },
  { char: "写", pinyin: "xiě",   tone: 3, meaning: "to write",         category: "Verbs" },
  { char: "吃", pinyin: "chī",   tone: 1, meaning: "to eat",           category: "Verbs" },
  { char: "喝", pinyin: "hē",    tone: 1, meaning: "to drink",         category: "Verbs" },
  { char: "去", pinyin: "qù",    tone: 4, meaning: "to go",            category: "Verbs" },
  { char: "来", pinyin: "lái",   tone: 2, meaning: "to come",          category: "Verbs" },
  { char: "爱", pinyin: "ài",    tone: 4, meaning: "to love",          category: "Verbs" },
  { char: "想", pinyin: "xiǎng", tone: 3, meaning: "to think, want",   category: "Verbs" },
  { char: "学", pinyin: "xué",   tone: 2, meaning: "to study, learn",  category: "Verbs" },
  { char: "会", pinyin: "huì",   tone: 4, meaning: "can, to know how", category: "Verbs" },
  { char: "做", pinyin: "zuò",   tone: 4, meaning: "to do, make",      category: "Verbs" },
  { char: "买", pinyin: "mǎi",   tone: 3, meaning: "to buy",           category: "Verbs" },
  { char: "卖", pinyin: "mài",   tone: 4, meaning: "to sell",          category: "Verbs" },
  { char: "开", pinyin: "kāi",   tone: 1, meaning: "to open",          category: "Verbs" },
  { char: "关", pinyin: "guān",  tone: 1, meaning: "to close",         category: "Verbs" },

  // ---- Adjectives ----
  { char: "多", pinyin: "duō",   tone: 1, meaning: "many, much", category: "Adjectives" },
  { char: "少", pinyin: "shǎo",  tone: 3, meaning: "few, little", category: "Adjectives" },
  { char: "高", pinyin: "gāo",   tone: 1, meaning: "tall, high",  category: "Adjectives" },
  { char: "长", pinyin: "cháng", tone: 2, meaning: "long",        category: "Adjectives" },
  { char: "新", pinyin: "xīn",   tone: 1, meaning: "new",         category: "Adjectives" },
  { char: "老", pinyin: "lǎo",   tone: 3, meaning: "old",         category: "Adjectives" },
  { char: "热", pinyin: "rè",    tone: 4, meaning: "hot",         category: "Adjectives" },
  { char: "冷", pinyin: "lěng",  tone: 3, meaning: "cold",        category: "Adjectives" },
  { char: "快", pinyin: "kuài",  tone: 4, meaning: "fast",        category: "Adjectives" },
  { char: "慢", pinyin: "màn",   tone: 4, meaning: "slow",        category: "Adjectives" },

  // ---- Position & Time ----
  { char: "上", pinyin: "shàng", tone: 4, meaning: "up, above",       category: "Position & Time" },
  { char: "下", pinyin: "xià",   tone: 4, meaning: "down, below",     category: "Position & Time" },
  { char: "中", pinyin: "zhōng", tone: 1, meaning: "middle, centre",  category: "Position & Time" },
  { char: "前", pinyin: "qián",  tone: 2, meaning: "front, before",   category: "Position & Time" },
  { char: "后", pinyin: "hòu",   tone: 4, meaning: "back, after",     category: "Position & Time" },
  { char: "左", pinyin: "zuǒ",   tone: 3, meaning: "left",            category: "Position & Time" },
  { char: "右", pinyin: "yòu",   tone: 4, meaning: "right",           category: "Position & Time" },
  { char: "里", pinyin: "lǐ",    tone: 3, meaning: "inside",          category: "Position & Time" },
  { char: "外", pinyin: "wài",   tone: 4, meaning: "outside",         category: "Position & Time" },
  { char: "东", pinyin: "dōng",  tone: 1, meaning: "east",            category: "Position & Time" },
  { char: "西", pinyin: "xī",    tone: 1, meaning: "west",            category: "Position & Time" },
  { char: "南", pinyin: "nán",   tone: 2, meaning: "south",           category: "Position & Time" },
  { char: "北", pinyin: "běi",   tone: 3, meaning: "north",           category: "Position & Time" },
  { char: "年", pinyin: "nián",  tone: 2, meaning: "year",            category: "Position & Time" },
  { char: "今", pinyin: "jīn",   tone: 1, meaning: "today, now",      category: "Position & Time" },
  { char: "时", pinyin: "shí",   tone: 2, meaning: "time",            category: "Position & Time" },

  // ---- Food & Drink ----
  { char: "食", pinyin: "shí",  tone: 2, meaning: "food, to eat",   category: "Food & Drink" },
  { char: "饭", pinyin: "fàn",  tone: 4, meaning: "rice, meal",     category: "Food & Drink" },
  { char: "茶", pinyin: "chá",  tone: 2, meaning: "tea",            category: "Food & Drink" },
  { char: "菜", pinyin: "cài",  tone: 4, meaning: "dish, vegetable",category: "Food & Drink" },

  // ---- Colours ----
  { char: "白", pinyin: "bái",   tone: 2, meaning: "white",  category: "Colours" },
  { char: "黑", pinyin: "hēi",   tone: 1, meaning: "black",  category: "Colours" },
  { char: "红", pinyin: "hóng",  tone: 2, meaning: "red",    category: "Colours" },
  { char: "绿", pinyin: "lǜ",    tone: 4, meaning: "green",  category: "Colours" },
  { char: "蓝", pinyin: "lán",   tone: 2, meaning: "blue",   category: "Colours" },
  { char: "黄", pinyin: "huáng", tone: 2, meaning: "yellow", category: "Colours" },

  // ---- Everyday ----
  { char: "国", pinyin: "guó",  tone: 2, meaning: "country",          category: "Everyday" },
  { char: "家", pinyin: "jiā",  tone: 1, meaning: "home, family",     category: "Everyday" },
  { char: "校", pinyin: "xiào", tone: 4, meaning: "school",           category: "Everyday" },
  { char: "书", pinyin: "shū",  tone: 1, meaning: "book",             category: "Everyday" },
  { char: "字", pinyin: "zì",   tone: 4, meaning: "character, word",  category: "Everyday" },
  { char: "钱", pinyin: "qián", tone: 2, meaning: "money",            category: "Everyday" },
  { char: "车", pinyin: "chē",  tone: 1, meaning: "car, vehicle",     category: "Everyday" },
  { char: "飞", pinyin: "fēi",  tone: 1, meaning: "to fly",           category: "Everyday" },
  { char: "机", pinyin: "jī",   tone: 1, meaning: "machine",          category: "Everyday" },
  { char: "门", pinyin: "mén",  tone: 2, meaning: "door, gate",       category: "Everyday" },

];

// Make the database available to the app. (No need to touch this line.)
if (typeof window !== "undefined") { window.hanziDatabase = hanziDatabase; }
