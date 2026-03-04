import { useState, useRef, useEffect } from 'react'

// ============ 组件定义 ============

// 底部导航
function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: 'home', label: '首页' },
    { id: 'tips', icon: 'lightbulb', label: '育儿贴士' },
    { id: 'history', icon: 'history', label: '历史' },
    { id: 'settings', icon: 'settings', label: '设置' },
  ]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-pink-100 px-4 pb-4 pt-2 flex justify-between items-center max-w-md mx-auto shadow-lg shadow-pink-100/50 z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === tab.id 
              ? 'text-pink-500 scale-110' 
              : 'text-gray-400 hover:text-pink-300'
          }`}
        >
          <span className={`material-symbols-outlined text-2xl transition-transform ${
            activeTab === tab.id ? 'scale-110' : ''
          }`}>
            {tab.icon}
          </span>
          <p className="text-xs font-medium">{tab.label}</p>
        </button>
      ))}
    </div>
  )
}

// 首页
function HomePage({ onStartRecording, onUploadFile }) {
  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-4 min-h-screen">
      {/* 吉祥物 */}
      <div className="relative w-36 h-36 mb-6">
        <div className="absolute inset-0 bg-pink-200/40 rounded-full animate-pulse"></div>
        <div className="absolute inset-3 bg-pink-100/40 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-br from-pink-200 via-rose-200 to-blue-200 w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-pink-500 text-5xl">child_care</span>
          </div>
        </div>
      </div>
      
      <h1 className="text-gray-800 text-2xl font-bold text-center mb-2">听懂宝宝的心声</h1>
      <p className="text-gray-500 text-sm text-center max-w-[280px] mb-8">
        AI 智能识别哭声，解析宝宝的饥饿、困倦或不适
      </p>
      
      {/* 主按钮 */}
      <button 
        onClick={onStartRecording}
        className="w-full flex flex-col items-center justify-center gap-3 py-8 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl shadow-lg shadow-pink-200 active:scale-95 transition-all duration-200 mb-4 hover:shadow-xl hover:shadow-pink-200/50"
      >
        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
          <span className="material-symbols-outlined text-5xl font-bold">mic</span>
        </div>
        <span className="text-xl font-bold tracking-wide">一键录音翻译</span>
      </button>
      
      {/* 上传按钮 */}
      <button 
        onClick={onUploadFile}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white border-2 border-pink-100 text-gray-600 rounded-xl active:scale-95 transition-all duration-200 hover:bg-pink-50 hover:border-pink-200"
      >
        <span className="material-symbols-outlined text-pink-500">upload_file</span>
        <span className="text-base font-semibold">上传音频文件</span>
      </button>

      {/* 提示 */}
      <div className="mt-6 w-full bg-amber-50 p-4 rounded-xl flex items-start gap-3 border border-amber-100">
        <div className="bg-amber-100 rounded-full p-2 shrink-0">
          <span className="material-symbols-outlined text-amber-600 text-lg">lightbulb</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-1">温馨小贴士</p>
          <p className="text-xs text-amber-700/80">保持环境安静，录音效果更准确哦～</p>
        </div>
      </div>
    </div>
  )
}

// 录音页
function RecordingPage({ isRecording, onStop, onCancel, recordingTime }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-pink-50 via-white to-blue-50">
      <div className="relative w-52 h-52 mb-8">
        {/* 波纹 */}
        <div className={`absolute inset-0 bg-pink-200/30 rounded-full ${isRecording ? 'animate-ping' : ''}`}></div>
        <div className={`absolute inset-4 bg-pink-300/40 rounded-full ${isRecording ? 'animate-pulse' : ''}`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`bg-gradient-to-tr from-pink-400 to-rose-400 w-28 h-28 rounded-full flex items-center justify-center shadow-xl ${
            isRecording ? 'animate-bounce' : ''
          }`}>
            <span className="material-symbols-outlined text-white text-6xl animate-pulse">mic</span>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {isRecording ? '正在录音...' : '准备录音'}
      </h2>
      <p className="text-gray-500 mb-4">
        {isRecording ? '请靠近宝宝的声音来源' : '点击麦克风开始'}
      </p>
      
      <div className="text-5xl font-mono text-pink-500 mb-8 font-bold tracking-wider">
        {formatTime(recordingTime)}
      </div>
      
      <div className="flex gap-5">
        <button 
          onClick={onCancel}
          className="w-14 h-14 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full active:scale-90 transition-all hover:bg-gray-200"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        
        <button 
          onClick={onStop}
          className={`w-20 h-20 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            isRecording 
              ? 'bg-red-500 text-white animate-pulse shadow-red-200' 
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }`}
        >
          <span className="material-symbols-outlined text-4xl">{isRecording ? 'stop' : 'mic'}</span>
        </button>
      </div>
    </div>
  )
}

// 结果页
function ResultPage({ result, onPlayAudio, onRetry, targetLanguage, setTargetLanguage, languages, isPlaying, onLanguageChange }) {
  const handleLanguageChange = (langCode) => {
    setTargetLanguage(langCode)
    if (onLanguageChange) {
      onLanguageChange(langCode)
    }
  }
  
  return (
    <div className="flex flex-col items-center px-5 py-6 min-h-screen">
      <div className="w-full bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6 rounded-2xl shadow-lg shadow-pink-100 mb-6">
        <div className="text-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <span className="material-symbols-outlined text-white text-3xl">child_care</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">宝宝想说</h2>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 text-center mb-4 shadow-sm">
          <p className="text-2xl font-bold text-pink-600 mb-2">{result.text}</p>
          <p className="text-gray-500 text-sm">{result.description}</p>
        </div>
        
        <div className="flex justify-center items-center gap-2">
          <span className="text-gray-500 text-sm">置信度:</span>
          <span className="text-pink-500 font-bold">{result.confidence}%</span>
        </div>
      </div>
      
      <div className="w-full mb-5">
        <label className="text-sm font-medium text-gray-600 mb-2 block">翻译成</label>
        <div className="grid grid-cols-4 gap-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`py-2.5 px-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                targetLanguage === lang.code
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full flex justify-center">
        <button 
          onClick={onPlayAudio}
          disabled={isPlaying}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-pink-500 text-white rounded-xl shadow-lg shadow-pink-200 active:scale-95 transition-all duration-200 disabled:opacity-50 hover:bg-pink-600"
        >
          <span className="material-symbols-outlined">{isPlaying ? 'stop' : 'volume_up'}</span>
          <span className="font-semibold">{isPlaying ? '停止播放' : '语音播放'}</span>
        </button>
      </div>
    </div>
  )
}

// 历史页
function HistoryPage({ records, onSelectRecord }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
    
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) + ' ' + 
           date.getHours().toString().padStart(2, '0') + ':' + 
           date.getMinutes().toString().padStart(2, '0')
  }

  return (
    <div className="px-4 py-4 pb-24">
      <h2 className="text-xl font-bold text-gray-800 mb-4">翻译历史</h2>
      
      {records.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-gray-300 text-6xl">history</span>
          <p className="text-gray-400 mt-4">暂无记录</p>
          <p className="text-gray-300 text-sm">开始录音，了解宝宝的需求</p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map(record => (
            <button
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className="w-full bg-white p-4 rounded-xl shadow-sm border border-pink-50 text-left hover:shadow-md hover:border-pink-100 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{record.text}</span>
                <span className="text-xs text-gray-400">{formatTime(record.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{record.lang}</span>
                <span className="text-sm font-medium text-pink-500">{record.confidence}%</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// 育儿贴士页面
function ParentingTipsPage() {
  const tips = [
    { icon: 'child_care', title: '宝宝哭闹的原因', content: '宝宝哭闹可能是饥饿、困倦、不舒服或需要安抚' },
    { icon: 'hotel', title: '如何判断宝宝困了', content: '宝宝困了会揉眼睛、打哈欠、变得烦躁' },
    { icon: 'restaurant', title: '喂养知识', content: '新生儿按需喂养，一般2-3小时一次' },
    { icon: 'bedtime', title: '睡眠建议', content: '0-3个月宝宝每天需要14-17小时睡眠' },
    { icon: 'thermostat', title: '温度适宜', content: '室温保持在24-26度最适宜宝宝' },
    { icon: 'medical_services', title: '健康观察', content: '定期测量体温，关注宝宝精神状态' },
  ]
  
  return (
    <div className="px-4 py-4 pb-24">
      <h2 className="text-xl font-bold text-gray-800 mb-4">育儿贴士</h2>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-pink-50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-pink-500">{tip.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
                <p className="text-sm text-gray-500">{tip.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 设置页
function SettingsPage() {
  const [avatar, setAvatar] = useState(null)
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleBindPhone = () => {
    alert('绑定手机功能开发中...')
  }
  
  const handleBindWechat = () => {
    alert('微信绑定功能开发中...')
  }
  
  const handleBindDouyin = () => {
    alert('抖音绑定功能开发中...')
  }
  
  const handleBindXiaohongshu = () => {
    alert('小红书绑定功能开发中...')
  }
  
  return (
    <div className="px-4 py-4 pb-24">
      <h2 className="text-xl font-bold text-gray-800 mb-4">设置</h2>
      
      {/* 用户头像和信息 */}
      <div className="bg-white rounded-xl shadow-sm border border-pink-50 p-4 mb-4">
        <div className="flex items-center gap-4">
          <label className="cursor-pointer relative">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-3xl text-pink-500">person</span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">camera_alt</span>
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
          <div>
            <h3 className="font-semibold text-gray-800">用户</h3>
            <p className="text-sm text-gray-500">点击头像更换照片</p>
          </div>
        </div>
      </div>
      
      {/* 账号关联 */}
      <div className="bg-white rounded-xl shadow-sm border border-pink-50 mb-4 overflow-hidden">
        <div className="p-4 border-b border-pink-50">
          <h3 className="font-semibold text-gray-700">账号关联</h3>
        </div>
        <div className="p-2">
          <button onClick={handleBindPhone} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">📱</span>
              <span className="text-gray-700">手机号</span>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </button>
          <button onClick={handleBindWechat} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">💬</span>
              <span className="text-gray-700">微信</span>
            </div>
            <span className="text-gray-400 text-sm">未绑定</span>
          </button>
          <button onClick={handleBindDouyin} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎵</span>
              <span className="text-gray-700">抖音</span>
            </div>
            <span className="text-gray-400 text-sm">未绑定</span>
          </button>
          <button onClick={handleBindXiaohongshu} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">📕</span>
              <span className="text-gray-700">小红书</span>
            </div>
            <span className="text-gray-400 text-sm">未绑定</span>
          </button>
        </div>
      </div>
      
      {/* 关于 */}
      <div className="bg-white rounded-xl shadow-sm border border-pink-50 overflow-hidden">
        <div className="p-4 border-b border-pink-50">
          <h3 className="font-semibold text-gray-700">关于</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">版本</span>
            <span className="text-gray-700">1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">开发者</span>
            <span className="text-gray-700">AI Team</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ 主应用 ============
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [activeTab, setActiveTab] = useState('home')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [result, setResult] = useState(null)
  const [targetLanguage, setTargetLanguage] = useState('zh')
  const [history, setHistory] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef(null)
  const timerRef = useRef(null)

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ]

  // 模拟结果（多语言）
  const mockResults = {
    zh: [
      { text: '我饿了', description: '宝宝可能感到饥饿', confidence: 95 },
      { text: '我困了', description: '宝宝想睡觉了', confidence: 88 },
      { text: '我不舒服', description: '宝宝可能身体不适', confidence: 82 },
      { text: '我想抱抱', description: '宝宝需要安抚', confidence: 90 },
      { text: '我无聊了', description: '宝宝想要玩耍', confidence: 85 },
    ],
    en: [
      { text: "I'm hungry", description: 'Baby may be hungry', confidence: 95 },
      { text: "I'm sleepy", description: 'Baby wants to sleep', confidence: 88 },
      { text: "I'm uncomfortable", description: 'Baby may be uncomfortable', confidence: 82 },
      { text: 'I want a hug', description: 'Baby needs comfort', confidence: 90 },
      { text: "I'm bored", description: 'Baby wants to play', confidence: 85 },
    ],
    ja: [
      { text: 'お腹が空いた', description: '赤ちゃんはお腹が空いているかもしれません', confidence: 95 },
      { text: '眠い', description: '赤ちゃんは眠たいです', confidence: 88 },
      { text: '不舒服', description: '赤ちゃんは不舒服かもしれません', confidence: 82 },
      { text: '抱っこして', description: '赤ちゃんは抱っこが必要です', confidence: 90 },
      { text: '退屈だ', description: '赤ちゃんは遊びたいです', confidence: 85 },
    ],
    ko: [
      { text: '배가 고파요', description: '아기가 배가 고플 수 있어요', confidence: 95 },
      { text: '졸려요', description: '아기가 자고 싶어 해요', confidence: 88 },
      { text: '불편해요', description: '아기가 불편해할 수 있어요', confidence: 82 },
      { text: '안아주세요', description: '아기가 안아달라고 해요', confidence: 90 },
      { text: '심심해요', description: '아기가 놀고 싶어 해요', confidence: 85 },
    ],
  }

  // 开始录音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      const audioChunks = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        await processAudio()
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      
      setCurrentPage('recording')
    } catch (error) {
      console.error('录音失败:', error)
      alert('无法访问麦克风，请检查权限设置')
    }
  }

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      clearInterval(timerRef.current)
    }
  }

  // 处理音频（模拟）
  const processAudio = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const langResults = mockResults[targetLanguage] || mockResults.zh
    const randomResult = langResults[Math.floor(Math.random() * langResults.length)]
    const newResult = {
      ...randomResult,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      targetLanguage
    }
    
    setResult(newResult)
    setHistory(prev => [newResult, ...prev])
    setCurrentPage('result')
  }

  // 上传文件
  const handleUploadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'audio/*'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        await processAudio()
      }
    }
    input.click()
  }

  // 语音播放
  const playAudio = () => {
    if (!result) return
    
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }
    
    const utterance = new SpeechSynthesisUtterance(result.text)
    
    // 设置语言
    const langMap = {
      'zh': 'zh-CN',
      'en': 'en-US', 
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    }
    utterance.lang = langMap[targetLanguage] || 'zh-CN'
    utterance.rate = 0.9
    utterance.pitch = 1.1
    
    // 尝试获取可用的语音
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      const matchedVoice = voices.find(v => v.lang.startsWith(targetLanguage))
      if (matchedVoice) {
        utterance.voice = matchedVoice
      }
    }
    
    // 语音加载完成后播放
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices()
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        loadVoices()
      }
    }
    
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)
    
    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }

  // 标签切换
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'home') {
      setCurrentPage('home')
      setResult(null)
    } else if (tab === 'tips') {
      setCurrentPage('tips')
      setResult(null)
    } else if (tab === 'history') {
      setCurrentPage('history')
      setResult(null)
    } else if (tab === 'settings') {
      setCurrentPage('settings')
      setResult(null)
    }
  }

  // 渲染页面
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStartRecording={startRecording} onUploadFile={handleUploadFile} />
      case 'recording':
        return (
          <RecordingPage 
            isRecording={isRecording}
            recordingTime={recordingTime}
            onStop={stopRecording}
            onCancel={() => { stopRecording(); setCurrentPage('home') }}
          />
        )
      case 'result':
        return (
          <ResultPage 
            result={result}
            onPlayAudio={playAudio}
            onRetry={() => { setResult(null); setCurrentPage('home') }}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            languages={languages}
            isPlaying={isPlaying}
            onLanguageChange={(langCode) => {
              // 当用户切换语言时，重新生成对应语言的结果
              const langResults = mockResults[langCode] || mockResults.zh
              const randomResult = langResults[Math.floor(Math.random() * langResults.length)]
              setResult({
                ...randomResult,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                targetLanguage: langCode
              })
            }}
          />
        )
      case 'history':
        return (
          <HistoryPage 
            records={history}
            onSelectRecord={(record) => {
              setResult(record)
              setTargetLanguage(record.targetLanguage || 'zh')
              setCurrentPage('result')
            }}
          />
        )
      case 'tips':
        return <ParentingTipsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage onStartRecording={() => {}} onUploadFile={() => {}} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 max-w-md mx-auto shadow-2xl relative">
      {/* 顶部 */}
      {currentPage !== 'recording' && currentPage !== 'result' && (
        <div className="flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 sticky top-0 z-10 border-b border-pink-50">
          <div className="w-11"></div>
          <h2 className="text-lg font-bold text-gray-800 text-center flex-1">婴儿翻译器</h2>
          <div className="w-11 flex justify-end">
            <button className="flex items-center justify-center rounded-full h-11 w-11 bg-transparent text-gray-500 hover:bg-pink-50 transition-colors">
              <span className="material-symbols-outlined text-2xl">notifications</span>
            </button>
          </div>
        </div>
      )}
      
      {renderPage()}
      
      {currentPage !== 'recording' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  )
}
