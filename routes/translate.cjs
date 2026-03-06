const express = require('express');
const multer = require('multer');
const path = require('path');
const { translateBark, translateFromDescription } = require('../services/translation.cjs');

const router = express.Router();

// 配置 multer 用于处理音频文件上传
const storage = multer.memoryStorage(); // 使用内存存储
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 限制
  },
  fileFilter: (req, file, cb) => {
    // 允许的音频类型
    const allowedTypes = [
      'audio/webm',
      'audio/wav', 
      'audio/mp3',
      'audio/mpeg',
      'audio/ogg',
      'audio/flac',
      'audio/aac',
      'audio/x-m4a'
    ];
    
    if (allowedTypes.includes(file.mimetype) || file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('不支持的音频格式'), false);
    }
  }
});

/**
 * POST /api/translate
 * 接收音频文件，返回翻译结果
 */
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const audioFile = req.file;
    const description = req.body.description;

    let translationResult;

    if (audioFile) {
      // 有音频文件
      console.log('📥 收到音频文件:', audioFile.originalname, audioFile.size, 'bytes');
      translationResult = await translateBark(audioFile.buffer);
    } else if (description) {
      // 只有文本描述
      console.log('📥 收到描述:', description);
      translationResult = await translateFromDescription(description);
    } else {
      return res.status(400).json({
        error: '请提供音频文件或叫声描述'
      });
    }

    // 添加时间戳
    const result = {
      ...translationResult,
      timestamp: new Date().toISOString()
    };

    console.log('✅ 翻译结果:', result);

    res.json(result);
  } catch (error) {
    console.error('❌ 翻译错误:', error);
    res.status(500).json({
      error: '翻译失败',
      message: error.message
    });
  }
});

/**
 * POST /api/translate/describe
 * 使用文本描述进行翻译（备用接口）
 */
router.post('/describe', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        error: '请提供叫声描述'
      });
    }

    const result = await translateFromDescription(description);
    
    res.json({
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ 翻译错误:', error);
    res.status(500).json({
      error: '翻译失败',
      message: error.message
    });
  }
});

module.exports = router;
