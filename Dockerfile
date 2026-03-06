FROM node:22-slim

WORKDIR /app

# 安装依赖
COPY package.json package-lock.json* ./
RUN npm install

# 复制代码
COPY . .

# 暴露端口
EXPOSE 3001

# 启动服务
CMD ["node", "server.cjs"]
