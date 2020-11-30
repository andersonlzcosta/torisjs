FROM node:13-alpine

WORKDIR /var/app

COPY package*.json ./
RUN npm install -g json-server

COPY server.json .

EXPOSE 3333

ENTRYPOINT ["json-server", "--port", "3333", "--host", "0.0.0.0"]
CMD ["server.json"]