FROM node:12 as builder

WORKDIR '/app' 

COPY . .

RUN npm install

RUN npm run build

FROM node:12

COPY --from=builder '/app/dist' '/app'

CMD [ "npm", "run", "prod" ]