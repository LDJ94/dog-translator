import { useState, useEffect } from 'react'
import { getSettings, saveSettings } from '../api/translator'

function Settings() {
  const [settings, setSettings] = useState({
    language: 'zh-CN',
    theme: 'warm',
    notifications: true,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSettings(getSettings())
  }, [])

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveSettings(newSettings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const languages = [
    { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
    { value: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
    { value: 'en-US', label: 'English', flag: '🇺🇸' },
    { value: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brown-700 mb-2">设置</h2>
        <p className="text-brown-400">自定义你的翻译体验</p>
      </div>

      {/* 保存提示 */}
      {saved && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl text-center">
          ✅ 设置已保存
        </div>
      )}

      {/* 语言设置 */}
      <div className="card p-6">
        <h3 className="font-bold text-brown-700 mb-4 flex items-center gap-2">
          <span>🌐</span> 语言
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {languages.map(lang => (
            <button
              key={lang.value}
              onClick={() => handleChange('language', lang.value)}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3
                        ${settings.language === lang.value 
                          ? 'border-warm-500 bg-warm-50' 
                          : 'border-warm-100 hover:border-warm-200'
                        }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium text-brown-700">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 主题设置 */}
      <div className="card p-6">
        <h3 className="font-bold text-brown-700 mb-4 flex items-center gap-2">
          <span>🎨</span> 主题色
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleChange('theme', 'warm')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3
                      ${settings.theme === 'warm' 
                        ? 'border-warm-500 bg-warm-50' 
                        : 'border-warm-100 hover:border-warm-200'
                      }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-400 to-warm-600" />
            <span className="font-medium text-brown-700">暖心橙</span>
          </button>
          <button
            onClick={() => handleChange('theme', 'brown')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3
                      ${settings.theme === 'brown' 
                        ? 'border-warm-500 bg-warm-50' 
                        : 'border-warm-100 hover:border-warm-200'
                      }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brown-400 to-brown-600" />
            <span className="font-medium text-brown-700">可可棕</span>
          </button>
        </div>
      </div>

      {/* 通知设置 */}
      <div className="card p-6">
        <h3 className="font-bold text-brown-700 mb-4 flex items-center gap-2">
          <span>🔔</span> 通知
        </h3>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-brown-600">翻译完成通知</span>
          <button
            onClick={() => handleChange('notifications', !settings.notifications)}
            className={`w-14 h-8 rounded-full transition-all relative
                      ${settings.notifications ? 'bg-warm-500' : 'bg-brown-200'}`}
          >
            <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md 
                           transition-transform flex items-center justify-center text-sm
                           ${settings.notifications ? 'left-7' : 'left-1'}`}>
              {settings.notifications ? '✓' : ''}
            </span>
          </button>
        </label>
      </div>

      {/* 关于 */}
      <div className="card p-6 text-center">
        <div className="text-4xl mb-2">🐕</div>
        <h3 className="font-bold text-brown-700">毛孩子翻译器</h3>
        <p className="text-brown-400 text-sm mt-1">Version 1.0.0</p>
        <p className="text-brown-300 text-xs mt-4">
          用AI读懂毛孩子的心声 ❤️
        </p>
      </div>
    </div>
  )
}

export default Settings
