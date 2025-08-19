# Imagen base ligera de Node.js
FROM node:20-alpine

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo package.json y package-lock.json primero (caché)
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar todo el proyecto al contenedor
COPY . .

# Construir Next.js en modo producción
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Comando por defecto para correr la app
CMD ["npm", "start"]
