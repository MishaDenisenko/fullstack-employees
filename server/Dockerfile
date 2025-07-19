# Используем образ линукс alpine с верией node 14
FROM node:22-alpine

# Рабочая директория
WORKDIR /app

# Bundle files
COPY . .

#Update npm
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Expose port 8000
EXPOSE 8000

# Start app
CMD source migrate-and-start.sh