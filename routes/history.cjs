const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/history.json');

// 确保数据文件存在
function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// 读取历史记录
function getHistory() {
  ensureDataFile();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取历史记录失败:', error);
    return [];
  }
}

// 保存历史记录
function saveHistory(history) {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(history, null, 2));
    return true;
  } catch (error) {
    console.error('保存历史记录失败:', error);
    return false;
  }
}

/**
 * GET /api/history
 * 获取所有翻译历史记录
 */
router.get('/', (req, res) => {
  try {
    const history = getHistory();
    
    // 按时间倒序排列
    history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // 返回最新50条
    const limit = parseInt(req.query.limit) || 50;
    const result = history.slice(0, limit);
    
    res.json({
      success: true,
      data: result,
      total: history.length
    });
  } catch (error) {
    console.error('❌ 获取历史记录错误:', error);
    res.status(500).json({
      error: '获取历史记录失败',
      message: error.message
    });
  }
});

/**
 * POST /api/history
 * 保存翻译记录
 */
router.post('/', (req, res) => {
  try {
    const { emotion, meaning, advice, timestamp } = req.body;

    // 验证必填字段
    if (!emotion || !meaning || !advice) {
      return res.status(400).json({
        error: '缺少必填字段',
        message: '需要提供 emotion, meaning, advice'
      });
    }

    const history = getHistory();

    const newRecord = {
      id: uuidv4(),
      emotion,
      meaning,
      advice,
      timestamp: timestamp || new Date().toISOString()
    };

    history.push(newRecord);

    // 最多保留100条记录
    if (history.length > 100) {
      history.shift(); // 删除最老的记录
    }

    const saved = saveHistory(history);

    if (!saved) {
      throw new Error('保存到文件失败');
    }

    console.log('✅ 保存历史记录:', newRecord.id);

    res.json({
      success: true,
      data: newRecord
    });
  } catch (error) {
    console.error('❌ 保存历史记录错误:', error);
    res.status(500).json({
      error: '保存历史记录失败',
      message: error.message
    });
  }
});

/**
 * DELETE /api/history/:id
 * 删除指定记录
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const history = getHistory();
    
    const index = history.findIndex(item => item.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        error: '记录不存在'
      });
    }

    history.splice(index, 1);
    saveHistory(history);

    res.json({
      success: true,
      message: '删除成功'
    });
  } catch (error) {
    console.error('❌ 删除历史记录错误:', error);
    res.status(500).json({
      error: '删除历史记录失败',
      message: error.message
    });
  }
});

/**
 * DELETE /api/history
 * 清空所有历史记录
 */
router.delete('/', (req, res) => {
  try {
    saveHistory([]);
    
    res.json({
      success: true,
      message: '历史记录已清空'
    });
  } catch (error) {
    console.error('❌ 清空历史记录错误:', error);
    res.status(500).json({
      error: '清空历史记录失败',
      message: error.message
    });
  }
});

module.exports = router;
