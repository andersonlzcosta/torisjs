FROM node:12

WORKDIR /var/www/front

COPY package*.json ./

RUN npm install

RUN npm build

COPY . .

ENV PORT=3000

CMD ["npm", "start"]