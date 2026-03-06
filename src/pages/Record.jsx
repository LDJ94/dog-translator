import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { translateDogSound, saveToHistory } from '../api/translator'

function Record() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [waveformBars] = useState(() => 
    Array.from({ length: 20 }, () => Math.random() * 100)
  )
  const [activeBars, setActiveBars] = useState([])
  
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)
  const navigate = useNavigate()

  // 录音计时器
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
        // 随机激活波形条
        setActiveBars(
          Array.from({ length: 20 }, () => Math.random() > 0.5 ? Math.random() * 100 : 20)
        )
      }, 1000)
    } else {
      clearInterval(timerRef.current)
      setActiveBars([])
    }
    return () => clearInterval(timerRef.current)
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      setAudioBlob(null)
    } catch (err) {
      alert('无法访问麦克风，请确保已授权权限')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleTranslate = async () => {
    if (!audioBlob) return
    
    setIsTranslating(true)
    try {
      const result = await translateDogSound(audioBlob)
      // 保存到历史记录
      const saved = saveToHistory({
        audio: result.audio,
        translation: result.translation,
        meaning: result.meaning,
        confidence: result.confidence,
      })
      // 传递结果到结果页
      navigate('/result', { state: { result: saved } })
    } catch (err) {
      alert('翻译失败，请重试')
    } finally {
      setIsTranslating(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brown-700 mb-2">录制叫声</h2>
        <p className="text-brown-500">让狗狗对着麦克风叫几声</p>
      </div>

      {/* 录音区域 */}
      <div className="card p-8 text-center">
        {/* 波形动画 */}
        <div className="flex justify-center items-end gap-1 h-24 mb-8">
          {(isRecording ? activeBars : waveformBars).map((height, index) => (
            <div
              key={index}
              className={`w-2 rounded-full transition-all duration-150 ${
                isRecording 
                  ? 'bg-warm-500' 
                  : 'bg-warm-200'
              }`}
              style={{ 
                height: `${Math.max(10, height)}%`,
                opacity: isRecording ? 1 : 0.5
              }}
            />
          ))}
        </div>

        {/* 录音时间 */}
        <div className="text-4xl font-bold text-brown-700 mb-8 font-mono">
          {formatTime(recordingTime)}
        </div>

        {/* 录音按钮 */}
        <div className="flex justify-center gap-4">
          {!audioBlob ? (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center 
                        transition-all transform hover:scale-110 shadow-lg
                        ${isRecording 
                          ? 'bg-red-500 animate-pulse-soft' 
                          : 'bg-warm-500 hover:bg-warm-600'
                        }`}
            >
              <span className="text-4xl text-white">
                {isRecording ? '⏹️' : '🎙️'}
              </span>
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={startRecording}
                className="px-6 py-3 bg-warm-200 text-brown-700 rounded-full 
                         hover:bg-warm-300 transition-colors"
              >
                重新录制
              </button>
              <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className="btn-primary"
              >
                {isTranslating ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    翻译中...
                  </span>
                ) : (
                  '开始翻译'
                )}
              </button>
            </div>
          )}
        </div>

        {/* 录音状态提示 */}
        <p className="mt-6 text-brown-400 text-sm">
          {isRecording 
            ? '🎤 正在录音中...' 
            : audioBlob 
              ? '✅ 录音完成，点击开始翻译' 
              : '点击麦克风开始录音'
          }
        </p>
      </div>

      {/* 小贴士 */}
      <div className="bg-warm-100 rounded-2xl p-4 text-center">
        <p className="text-brown-600 text-sm">
          💡 建议录制3-10秒的狗狗叫声，获得更准确的翻译结果
        </p>
      </div>
    </div>
  )
}

export default Record
