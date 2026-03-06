<<<<<<< HEAD
FROM node:22-slim

WORKDIR /app

# 安装依赖
COPY package.json package-lock.json* ./
RUN npm install

# 复制代码
COPY . .

# 构建前端
RUN npm run build

# 暴露端口
EXPOSE 3001

# 启动服务
CMD ["node", "server.cjs"]
=======
FROM node:18-alpine

WORKDIR /app

# Copy package files for backend
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Copy all source code
COPY . .

# Build frontend (if needed)
# RUN npm run build

EXPOSE 3001

CMD ["sh", "-c", "cd backend && npm start"]
>>>>>>> c7dfee4daf7d2a508ae354230d23a0b9b1b9d269
