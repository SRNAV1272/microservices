FROM node:alpine
WORKDIR /app

COPY index.js .
COPY database.cjs .
COPY build ./build
COPY /package.json .

RUN npm install

CMD [ "npm", "start" ]