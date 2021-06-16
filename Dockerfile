FROM node:12 as builder

WORKDIR '/app' 

COPY . .

RUN npm install

CMD [ "npm", "run", "build" ]


FROM node:12

COPY --from=builder '/app/dist' '/app/dist'

COPY --from=builder '/app/package.json' '/app'

COPY --from=builder '/app/package-lock.json' '/app'

CMD [ "npm", "run", "prod"]