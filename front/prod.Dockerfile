FROM node:13-alpine as build-stage

# ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=http://redeabrigo.tk/api

ARG CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_USEPOLLING=$CHOKIDAR_USEPOLLING

ARG COMPOSE_CONVERT_WINDOWS_PATHS=1
ENV COMPOSE_CONVERT_WINDOWS_PATHS=$COMPOSE_CONVERT_WINDOWS_PATHS

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
