FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm install

COPY . .

