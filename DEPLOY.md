# Zeabur 部署配置文档

## 项目地址
- GitHub: https://github.com/LDJ94/dog-translator

## 环境变量配置

在 Zeabur 服务面板中配置以下变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `PORT` | 服务端口 | `3001` |
| `GEMINI_API_KEY` | Gemini API 密钥 | (你的API Key) |

### 配置步骤

1. 进入 Zeabur 控制台
2. 找到 dog-translator 服务
3. 点击「环境变量」(Variables) 标签
4. 添加变量：
   - `GEMINI_API_KEY` = 你的 Gemini API Key
5. 重新部署服务

## 本地开发

```bash
# 安装依赖
npm install

# 启动后端（端口3001）
node server.cjs

# 启动前端开发（端口3000）
npm run dev
```

## 技术栈

- 前端: React + Tailwind CSS + Vite
- 后端: Node.js + Express
- 部署: Docker + Zeabur
