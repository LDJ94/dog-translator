import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = location.state?.result
  const [isPlaying, setIsPlaying] = useState(false)

  if (!result) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-brown-700 mb-4">没有翻译结果</h2>
        <Link to="/record" className="btn-primary">
          去录音
        </Link>
      </div>
    )
  }

  // 播放录音
  const playAudio = () => {
    if (!result.audio) return
    const audio = new Audio(result.audio)
    audio.onplay = () => setIsPlaying(true)
    audio.onended = () => setIsPlaying(false)
    audio.play()
  }

  // 置信度颜色
  const getConfidenceColor = (score) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-warm-500'
    return 'bg-brown-400'
  }

  const getConfidenceText = (score) => {
    if (score >= 80) return '非常准确'
    if (score >= 60) return '比较准确'
    return '可能存在误差'
  }

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <div className="text-6xl mb-2">🐕</div>
        <h2 className="text-2xl font-bold text-brown-700">翻译结果</h2>
      </div>

      {/* 录音回放 */}
      {result.audio && (
        <div className="card p-4 flex items-center justify-center gap-4">
          <button
            onClick={playAudio}
            className={`w-14 h-14 rounded-full flex items-center justify-center 
                      transition-all ${isPlaying ? 'bg-warm-600' : 'bg-warm-500'}`}
          >
            <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
          <span className="text-brown-600">播放原声</span>
        </div>
      )}

      {/* 翻译内容 */}
      <div className="card p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-brown-400 mb-2 uppercase tracking-wide">
            叫声含义
          </h3>
          <p className="text-2xl font-bold text-brown-700">
            {result.meaning || '未能识别'}
          </p>
        </div>

        <div className="border-t border-warm-200 pt-4">
          <h3 className="text-sm font-bold text-brown-400 mb-2 uppercase tracking-wide">
            翻译成人类语言
          </h3>
          <p className="text-lg text-brown-700 leading-relaxed">
            {result.translation || '暂无翻译'}
          </p>
        </div>

        {/* 置信度 */}
        {result.confidence && (
          <div className="bg-warm-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-brown-600">置信度</span>
              <span className="text-sm font-bold text-brown-700">
                {result.confidence}% · {getConfidenceText(result.confidence)}
              </span>
            </div>
            <div className="h-2 bg-warm-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getConfidenceColor(result.confidence)}`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 时间 */}
      <p className="text-center text-brown-400 text-sm">
        翻译时间：{new Date(result.timestamp).toLocaleString('zh-CN')}
      </p>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/record" className="btn-primary text-center">
          再次翻译
        </Link>
        <button
          onClick={() => navigate('/history')}
          className="px-6 py-3 bg-brown-200 text-brown-700 rounded-full 
                   hover:bg-brown-300 transition-colors"
        >
          查看历史
        </button>
      </div>
    </div>
  )
}

export default Result
