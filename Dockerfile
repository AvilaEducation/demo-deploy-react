# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de proyecto y dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY ./src ./src
COPY ./public ./public

RUN npm install
RUN npm run build

# Etapa 2: Producción (sirviendo los archivos estáticos)
FROM node:18-alpine

WORKDIR /app

# Instalar `serve` globalmente
RUN npm install -g serve

# Copiar solo la carpeta `dist` desde el build
COPY --from=builder /app/dist ./dist

# Usar el puerto proporcionado por Railway (3000 o el que sea)
ENV PORT=3000
EXPOSE 3000

# Servir la app
CMD ["serve", "-s", "dist", "-l", "3000"]
