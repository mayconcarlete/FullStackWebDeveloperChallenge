FROM node:12 as builder

WORKDIR '/app'

COPY . .

RUN npm install

RUN npm run build


FROM node:12

WORKDIR '/app'

COPY --from=builder '/app/dist' '/app'

COPY --from=builder '/app/package.json' '/app'

COPY --from=builder '/app/package-lock.json' '/app'

RUN ls -la

RUN npm install --only=prod

CMD [ "node", "index.js"]


# docker run --rm -it --entrypoint /bin/sh fullstackwebdeveloperchallenge_api
