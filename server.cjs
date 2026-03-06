require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const translateRoutes = require('./routes/translate.cjs');
const historyRoutes = require('./routes/history.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务 - 如果前端构建后放在 dist 或 public 目录
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src/public')));

// API 路由
app.use('/api/translate', translateRoutes);
app.use('/api/history', historyRoutes);

// 前端 fallback
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist/index.html');
  const srcIndexPath = path.join(__dirname, 'src/index.html');
  
  res.sendFile(path.exists(indexPath) ? indexPath : srcIndexPath);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🐕 狗狗翻译器服务器运行在 http://localhost:${PORT}`);
  console.log(`📡 API 端点:`);
  console.log(`   POST /api/translate - 翻译狗狗叫声`);
  console.log(`   GET  /api/history  - 获取翻译历史`);
  console.log(`   POST /api/history - 保存翻译记录`);
});

module.exports = app;
