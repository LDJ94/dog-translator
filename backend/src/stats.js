// 统计 API
import express from 'express'

const router = express.Router()

// 获取统计数据
router.get('/stats', (req, res) => {
  // 这里可以连接数据库获取更详细的统计
  // 目前返回模拟数据
  const stats = {
    date: new Date().toISOString().split('T')[0],
    tokens: {
      input: Math.floor(Math.random() * 100000) + 50000,
      output: Math.floor(Math.random() * 5000) + 1000,
    },
    messages: {
      total: Math.floor(Math.random() * 100) + 20,
      words: Math.floor(Math.random() * 5000) + 1000,
    },
    tasks: {
      completed: Math.floor(Math.random() * 20) + 5,
      pending: Math.floor(Math.random() * 5),
    },
    skills: {
      new: Math.floor(Math.random() * 2),
      total: 10,
    }
  }
  
  res.json(stats)
})

export default router
