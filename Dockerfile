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
