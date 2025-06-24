# Etapa 1: Build de la app
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json (si lo tenés)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Build producción
RUN npm run build

# Etapa 2: Servir con serve
FROM node:18-alpine

WORKDIR /app

# Instalar serve globalmente para servir los archivos estáticos
RUN npm install -g serve

# Copiar carpeta dist generada en el build
COPY --from=builder /app/dist ./dist

# Definir variable de entorno PORT (Railway la va a sobreescribir)
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Usar la variable PORT para que serve escuche en el puerto correcto asignado por Railway
CMD ["sh", "-c", "serve -s dist -l $PORT"]
