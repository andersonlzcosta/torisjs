FROM node:12

WORKDIR /var/www/server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=6000
