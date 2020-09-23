FROM node:13-alpine

WORKDIR /var/www/front

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

CMD ["npm", "start"]