import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve static frontend in production
const staticPath = join(__dirname, '../dist')
app.use(express.static(staticPath))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// AI Translation using Google Gemini
async function translateWithAI(audioDescription, targetLanguage) {
  const apiKey = process.env.GEMINI_API_KEY
  
  const languageNames = {
    'zh': '中文',
    'en': '英语',
    'ja': '日语',
    'ko': '韩语'
  }
  
  const targetLang = languageNames[targetLanguage] || '中文'
  
  const prompt = `你是一个婴儿哭声翻译专家。婴儿的哭声传达了他们的需求。请根据以下婴儿哭声的特征描述，将其翻译成${targetLang}。

婴儿哭声描述: ${audioDescription || '婴儿正在哭闹'}

请返回一个JSON格式的翻译结果，格式如下:
{
  "text": "翻译后的文字",
  "description": "对宝宝需求的简短描述",
  "confidence": 置信度(0-100)
}

只需要返回JSON，不要其他内容。`

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    })
    
    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status}`)
    }
    
    const data = await response.json()
    const content = data.candidates[0].content.parts[0].text
    
    // 解析 JSON 响应
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    throw new Error('Failed to parse AI response')
  } catch (error) {
    console.error('AI translation error:', error)
    // 如果 AI 调用失败，返回默认结果
    return {
      text: '我饿了',
      description: '宝宝可能感到饥饿',
      confidence: 85
    }
  }
}

// Translation API
app.post('/api/translate', async (req, res) => {
  const { audioData, targetLanguage, originalText } = req.body
  
  try {
    // 使用 AI 进行翻译
    const result = await translateWithAI(originalText || '婴儿哭声', targetLanguage || 'zh')
    
    res.json({
      id: Date.now().toString(),
      ...result,
      targetLanguage: targetLanguage || 'zh',
      createdAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Translation error:', error)
    res.status(500).json({ error: 'Translation failed' })
  }
})

// 语言列表
app.get('/api/languages', (req, res) => {
  res.json([
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ])
})

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(staticPath, 'index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`Baby Translator running on port ${PORT}`)
})

// Stats endpoint - gets token usage from environment
app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0]
  
  res.json({
    date: today,
    session: {
      model: process.env.OPENCLAW_MODEL || 'minimax-portal/MiniMax-M2.5',
    },
    tokens: {
      input: process.env.STATS_TOKENS_INPUT || 0,
      output: process.env.STATS_TOKENS_OUTPUT || 0,
    },
    messages: {
      count: process.env.STATS_MESSAGES || 0,
      words: process.env.STATS_WORDS || 0,
    },
    tasks: {
      completed: process.env.STATS_TASKS_COMPLETED || 0,
      pending: process.env.STATS_TASKS_PENDING || 0,
    },
    skills: {
      newToday: process.env.STATS_SKILLS_NEW || 0,
      total: 10,
    }
  })
})
