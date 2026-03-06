// 翻译API调用
export const translateDogSound = async (audioBlob) => {
  const formData = new FormData()
  formData.append('audio', audioBlob, 'recording.webm')
  
  const response = await fetch('/api/translate', {
    method: 'POST',
    body: formData,
  })
  
  if (!response.ok) {
    throw new Error('翻译失败，请重试')
  }
  
  return response.json()
}

// 历史记录相关API
const STORAGE_KEY = 'dog_translator_history'

export const getHistory = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveToHistory = (record) => {
  const history = getHistory()
  const newRecord = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...record
  }
  history.unshift(newRecord)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  return newRecord
}

export const deleteHistoryItem = (id) => {
  const history = getHistory().filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY)
}

// 设置相关API
const SETTINGS_KEY = 'dog_translator_settings'

export const getSettings = () => {
  const defaults = {
    language: 'zh-CN',
    theme: 'warm',
    notifications: true,
  }
  const data = localStorage.getItem(SETTINGS_KEY)
  return data ? { ...defaults, ...JSON.parse(data) } : defaults
}

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
