FROM node:18-alpine as develop

RUN npm install -g pnpm

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN pnpm self-update
RUN pnpm install


EXPOSE 3333 

CMD [ "sh", "-c", "pnpm migrate && pnpm dev" ]