FROM node:8.9.4-alpine

RUN addgroup -S app && adduser -S -g app app

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

ADD ./dist /app
RUN chown app:app -R /app && chmod 777 /tmp

WORKDIR /app
EXPOSE 3000
CMD ["node", "index.js"]
