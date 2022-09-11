# Automated build and deployment
FROM node:16-alpine
RUN apk add --update nodejs npm --no-cache

ARG ENVIRONMENT

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN addgroup -S appGroup && adduser -S -D appUser -G appGroup
RUN chown -R appUser:appGroup /usr/src/app

USER appUser

RUN npm ci
RUN npm run build:${ENVIRONMENT}

EXPOSE 8080
CMD ["npm", "run", "start"]
