# Etapa 1: build del frontend
FROM node:20-alpine as builder

WORKDIR /app

# Copiamos solo los package.json primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Ejecutamos el build de producción de Vite
RUN npm run build

# Etapa 2: contenedor mínimo con Nginx para servir el frontend
FROM nginx:alpine

# Copiamos el build ya generado al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Nginx arranca automáticamente al iniciarse el contenedor
