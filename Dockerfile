FROM node:16.15.0 as build

ARG BUILD_ENV=prod

WORKDIR /app

COPY ./server/package.json /app/package.json
COPY ./server/package-lock.json /app/package-lock.json

RUN npm cache clean --force
RUN npm install
RUN npm install -g ts-node --save

COPY ./server .

CMD ["ts-node", "./server/src/app.ts"]