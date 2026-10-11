/* 逐篇插圖對照表；新增插圖時只需在此加入文章 id 與檔名。 */
(() => {
  const artById = {
    s1: 'story-s001.webp',
    s2: 'story-s002.webp',
    s3: 'story-s003.webp',
    s4: 'story-s004.webp',
  };

  window.READER_CONTENT.forEach((item) => {
    if (artById[item.id]) item.art = artById[item.id];
  });
})();
