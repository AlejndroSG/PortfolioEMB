# Etapa 1: Construcción
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copiar el resto del proyecto y compilar
COPY . .
RUN npm run build

# Etapa 2: Ejecución
FROM node:20-alpine AS runner

# Establecer directorio de trabajo
WORKDIR /app

# Establecer entorno de producción
ENV NODE_ENV=production

# Copiar solo lo necesario para correr la app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto usado por Next.js
EXPOSE 3000

# Comando de ejecución
CMD ["npm", "start"]
