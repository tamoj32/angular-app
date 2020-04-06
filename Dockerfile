# stage 1
FROM node:latest as node

COPY package.json package-lock.json ./

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . /ng-app

RUN npm run ng build -- --prod --output-path=dist


# stage 2
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=node /ng-app/nginx.config /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /ng-app/dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]