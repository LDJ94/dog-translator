import { Link } from 'react-router-dom'

function Home() {
  const features = [
    { icon: '🎙️', title: '智能录音', desc: '一键录制狗狗叫声' },
    { icon: '🔍', title: 'AI分析', desc: '深度学习解读含义' },
    { icon: '💾', title: '历史记录', desc: '保存每一次的翻译' },
  ]

  return (
    <div className="space-y-8">
      {/* Hero区域 */}
      <div className="text-center py-8">
        <div className="text-6xl mb-4 animate-bounce-slow">🐕</div>
        <h2 className="text-3xl font-bold text-brown-700 mb-3">
          毛孩子的心里话
        </h2>
        <p className="text-brown-500 text-lg mb-6 max-w-md mx-auto">
          想知道你的狗狗在想什么吗？使用AI技术，让叫声变成温暖的话语
        </p>
        <Link to="/record" className="btn-primary inline-flex items-center gap-2">
          <span>开始翻译</span>
          <span>→</span>
        </Link>
      </div>

      {/* 特性卡片 */}
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="card p-6 text-center hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="font-bold text-brown-700 mb-2">{feature.title}</h3>
            <p className="text-brown-500 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* 使用提示 */}
      <div className="card p-6 bg-gradient-to-br from-warm-50 to-brown-50">
        <h3 className="font-bold text-brown-700 mb-4 flex items-center gap-2">
          <span>💡</span> 使用提示
        </h3>
        <ul className="space-y-2 text-brown-600">
          <li className="flex items-start gap-2">
            <span className="text-warm-500">✓</span>
            <span>选择安静的环境录音，效果更好</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warm-500">✓</span>
            <span>让狗狗在自然状态下发出声音</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warm-500">✓</span>
            <span>录音时长建议3-10秒</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
