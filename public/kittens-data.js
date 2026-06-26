/**
 * kittens-data.js — 小小貓屋幼貓共用資料檔
 * 新增幼貓時：同步更新此檔案 ＋ public/index.html 的 kittens 陣列
 * 品種頁、比較頁、毛色頁皆透過此檔取得即時在售資訊
 */
window.SITE_KITTENS = [
  {
    id: 'k28',
    breedEn: 'British Shorthair (Cream Tabby)',
    breedZh: '英國短毛貓・奶橘花紋',
    gender: '男生 ♂',
    birth: '2026-04-10',
    price: 25000,
    tag: '等待命定',
    desc: '奶橘花紋弟弟，毛色溫暖如陽光，大眼圓臉超療癒，調皮好動充滿活力。',
    breedCategory: '英短',
    genderCode: 'M',
    img: 'https://lovecat.cc/images/kitten-k28.jpg'
  },
  {
    id: 'k29',
    breedEn: 'British Shorthair (Cream & White)',
    breedZh: '英國短毛貓・奶油賓士加白',
    gender: '男生 ♂',
    birth: '2026-03-25',
    price: 30000,
    tag: '等待命定',
    desc: '奶油賓士加白弟弟，毛色白嫩帶奶油渲染，表情靈動可愛，親人好抱。',
    breedCategory: '英短',
    genderCode: 'M',
    img: 'https://lovecat.cc/images/kitten-k29.jpg'
  },
  {
    id: 'k30',
    breedEn: 'Munchkin (Cream)',
    breedZh: '曼赤肯短腿貓・奶橘色',
    gender: '男生 ♂',
    birth: '2026-04-03',
    price: 55000,
    tag: '等待命定',
    desc: '短腿奶橘弟弟，圓滾滾的身型超萌，好奇心旺盛，走路搖搖擺擺讓人心化。',
    breedCategory: '曼赤肯',
    genderCode: 'M',
    img: 'https://lovecat.cc/images/kitten-k30.jpg'
  },
  {
    id: 'k31',
    breedEn: 'British Shorthair (Blue)',
    breedZh: '英國短毛貓・煙燻藍色',
    gender: '女生 ♀',
    birth: '2026-03-28',
    price: 19000,
    tag: '等待命定',
    desc: '煙燻藍色妹妹，全身灰藍毛色如煙霧繚繞，眼神溫柔深邃，氣質優雅。',
    breedCategory: '英短',
    genderCode: 'F',
    img: 'https://lovecat.cc/images/kitten-k31.jpg'
  },
  {
    id: 'k32',
    breedEn: 'British Shorthair (Calico)',
    breedZh: '英國短毛貓・淺三花賓士',
    gender: '女生 ♀',
    birth: '2026-04-10',
    price: 30000,
    tag: '等待命定',
    desc: '淺三花賓士妹妹，橘白灰花色分佈獨特，個性活潑愛玩，是天生的小甜心。',
    breedCategory: '英短',
    genderCode: 'F',
    img: 'https://lovecat.cc/images/kitten-k32.jpg'
  },
  {
    id: 'k33',
    breedEn: 'British Longhair (Brown Tabby & White)',
    breedZh: '英國長毛貓・棕虎斑白手套',
    gender: '女生 ♀',
    birth: '2026-04-16',
    price: 40000,
    tag: '等待命定',
    desc: '棕虎斑白手套妹妹，長毛蓬鬆如絨球，四隻腳戴著白手套超吸睛，氣質優雅不凡。',
    breedCategory: '英長',
    genderCode: 'F',
    img: 'https://lovecat.cc/images/kitten-k33.jpg'
  },
  {
    id: 'k34',
    breedEn: 'British Longhair (White)',
    breedZh: '英國長毛貓・純白',
    gender: '女生 ♀',
    birth: '2026-04-16',
    price: 30000,
    tag: '等待命定',
    desc: '全身雪白長毛妹妹，純淨如白雪，毛量豐厚柔軟，氣質如童話中的白貓公主。',
    breedCategory: '英長',
    genderCode: 'F',
    img: 'https://lovecat.cc/images/kitten-k34.jpg'
  },
  {
    id: 'k35',
    breedEn: 'British Longhair (Dilute Calico)',
    breedZh: '英國長毛貓・淺三花',
    gender: '女生 ♀',
    birth: '2026-04-16',
    price: 30000,
    tag: '等待命定',
    desc: '淺三花長毛妹妹，灰白橘花色搭配長毛，色彩如水墨畫般柔美，個性溫柔可人。',
    breedCategory: '英長',
    genderCode: 'F',
    img: 'https://lovecat.cc/images/kitten-k35.jpg'
  },
  {
    id: 'k36',
    breedEn: 'American Shorthair (Silver Tabby)',
    breedZh: '美國短毛貓・銀白色',
    gender: '女生 ♀',
    birth: '2026-04-05',
    price: 35000,
    tag: '等待命定',
    desc: '銀白虎斑妹妹，紋路清晰立體，個性獨立優雅，眼神靈動充滿靈氣。',
    breedCategory: '美短',
    genderCode: 'F',
    img: 'https://lovecat.cc/images/kitten-k36.jpg'
  },
  {
    id: 'k37',
    breedEn: 'American Shorthair (Silver Tabby)',
    breedZh: '美國短毛貓・銀白色',
    gender: '女生 ♀',
    birth: '2026-02-24',
    price: 35000,
    tag: '等待命定',
    desc: '銀白虎斑妹妹，紋路深邃有力，眼神靈動翠綠，個性聰慧活潑，是大家族中的小公主。',
    breedCategory: '美短',
    genderCode: 'F',
    img: 'https://lovecat.cc/images/kitten-k37.jpg'
  },
  {
    id: 'k38',
    breedEn: 'Scottish Fold Munchkin (Blue & White)',
    breedZh: '捲耳曼赤肯短腿貓・乳牛藍白',
    gender: '男生 ♂',
    birth: '2026-02-20',
    price: 30000,
    tag: '等待命定',
    desc: '捲耳短腿乳牛色弟弟，藍白花色如小乳牛超可愛，小短腿走路萌態十足，愛撒嬌黏人。',
    breedCategory: '曼赤肯',
    genderCode: 'M',
    img: 'https://lovecat.cc/images/kitten-k38.jpg'
  }
];
