// 狗狗翻译服务 - 使用模拟数据（待API修复）
// 后续可以接入真实的AI翻译API

const DOG_EMOTIONS = [
  { emotion: '开心', meaning: '狗狗很高兴看到你！', advice: '给它一些抚摸和表扬吧' },
  { emotion: '好奇', meaning: '狗狗发现了有趣的东西', advice: '让它探索一下周围环境' },
  { emotion: '警惕', meaning: '狗狗察觉到了一些动静', advice: '检查一下周围是否有异常' },
  { emotion: '饥饿', meaning: '狗狗想要吃东西了', advice: '看看是不是到了吃饭时间' },
  { emotion: '想要出去', meaning: '狗狗想出门散步或上厕所', advice: '带它出去走走' },
  { emotion: '困了', meaning: '狗狗需要休息了', advice: '给它一个安静的休息空间' },
  { emotion: '兴奋', meaning: '狗狗非常兴奋！', advice: '陪它玩一会儿消耗精力' },
  { emotion: '焦虑', meaning: '狗狗感到不安', advice: '给它安全感，安抚一下' },
];

/**
 * 翻译狗狗叫声
 * @param {Buffer|string} audioData - 音频数据或描述
 * @returns {Promise<{emotion: string, meaning: string, advice: string}>}
 */
async function translateBark(audioData) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 随机返回一个情绪
  const random = DOG_EMOTIONS[Math.floor(Math.random() * DOG_EMOTIONS.length)];
  
  return {
    ...random,
    timestamp: new Date().toISOString()
  };
}

/**
 * 使用文本描述翻译狗狗叫声
 * @param {string} description - 叫声描述
 * @returns {Promise<{emotion: string, meaning: string, advice: string}>}
 */
async function translateFromDescription(description) {
  // 根据描述关键词返回对应情绪
  const desc = description.toLowerCase();
  
  if (desc.includes('bark') || desc.includes('叫') || desc.includes('吠')) {
    if (desc.includes('continuous') || desc.includes('连续')) {
      return { emotion: '警惕', meaning: '狗狗发现异常，持续吠叫警告', advice: '检查周围环境，确认是否有入侵者' };
    }
    return { emotion: '兴奋', meaning: '狗狗在打招呼！', advice: '热情回应它吧' };
  }
  
  if (desc.includes('whine') || desc.includes('哼') || desc.includes('呜咽')) {
    return { emotion: '焦虑', meaning: '狗狗感到不舒服或孤独', advice: '检查狗狗状态，必要时带去看兽医' };
  }
  
  if (desc.includes('growl') || desc.includes('低吼')) {
    return { emotion: '警告', meaning: '狗狗感到威胁', advice: '保持距离，让狗狗冷静下来' };
  }
  
  // 默认随机
  return translateBark(description);
}

module.exports = {
  translateBark,
  translateFromDescription
};
