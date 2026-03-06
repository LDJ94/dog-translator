import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/record', label: '录音', icon: '🎙️' },
  { path: '/history', label: '历史', icon: '📋' },
  { path: '/settings', label: '设置', icon: '⚙️' },
]

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐕</span>
            <h1 className="text-xl font-bold text-brown-700">毛孩子翻译器</h1>
          </div>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-warm-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
          </button>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition-all ${
                    isActive 
                      ? 'bg-warm-500 text-white' 
                      : 'text-brown-600 hover:bg-warm-100'
                  }`
                }
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* 移动端下拉菜单 */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-warm-200 px-4 py-2">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-warm-500 text-white' 
                      : 'text-brown-600 hover:bg-warm-100'
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* 主内容区 */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      {/* 底部装饰 */}
      <footer className="text-center py-6 text-brown-400 text-sm">
        <p>🐾 让我们一起听懂毛孩子的心声 🐾</p>
      </footer>
    </div>
  )
}

export default Layout
