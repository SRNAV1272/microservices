FROM node:20.10

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./index.js .
COPY ./database.cjs .

EXPOSE 80

CMD [ "npm", "start" ]