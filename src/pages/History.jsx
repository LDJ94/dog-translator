import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHistory, deleteHistoryItem, clearHistory } from '../api/translator'

function History() {
  const [history, setHistory] = useState([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleDelete = (id) => {
    deleteHistoryItem(id)
    setHistory(getHistory())
  }

  const handleClear = () => {
    clearHistory()
    setHistory([])
    setShowClearConfirm(false)
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
    
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-xl font-bold text-brown-700 mb-2">暂无历史记录</h2>
        <p className="text-brown-400 mb-6">开始录音翻译，记录会保存到这里</p>
        <Link to="/record" className="btn-primary">
          去录音
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brown-700">历史记录</h2>
        <button
          onClick={() => setShowClearConfirm(true)}
          className="text-brown-400 hover:text-brown-600 text-sm"
        >
          清空全部
        </button>
      </div>

      {/* 记录列表 */}
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="card p-4 hover:shadow-warm-500/30 transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-bold text-brown-700 text-lg">
                  {item.meaning || '未知叫声'}
                </p>
                <p className="text-brown-500 text-sm line-clamp-2 mt-1">
                  {item.translation}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-brown-400">
                  {formatDate(item.timestamp)}
                </span>
                {item.confidence && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.confidence >= 80 ? 'bg-green-100 text-green-700' :
                    item.confidence >= 60 ? 'bg-warm-100 text-warm-700' :
                    'bg-brown-100 text-brown-600'
                  }`}>
                    {item.confidence}%
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 mt-3 pt-3 border-t border-warm-100">
              <Link
                to="/result"
                state={{ result: item }}
                className="flex-1 text-center py-2 bg-warm-100 text-warm-700 
                         rounded-xl hover:bg-warm-200 transition-colors text-sm"
              >
                查看详情
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 text-red-400 hover:text-red-600 
                         transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 清空确认弹窗 */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-brown-700 mb-2 text-center">
              确定清空所有记录？
            </h3>
            <p className="text-brown-500 text-center mb-6">
              此操作无法撤销
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-3 bg-brown-100 text-brown-700 
                         rounded-full hover:bg-brown-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-3 bg-red-500 text-white 
                         rounded-full hover:bg-red-600 transition-colors"
              >
                清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History
