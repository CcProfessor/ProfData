# Imagem base
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para rodar o NestJS em dev
CMD ["npm", "run", "start:dev"]
