FROM node:13-alpine

ENV JWT_APP_SECRET=desenvolvimento

WORKDIR /var/www/server

COPY package*.json ./
RUN npm install
RUN yarn typeorm migration:run

COPY . .

EXPOSE 2000

# RUN npm run dev:server
CMD ["npm", "run", "dev:server"]