# 리액트 build하기
FROM node:latest AS build

WORKDIR /root/basil/client

COPY ./package*.json .
RUN yarn install

COPY . .
RUN yarn run build

# 리액트 production하기
FROM nginx:latest
COPY --from=build /root/basil/client/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]