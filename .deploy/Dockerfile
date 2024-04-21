FROM docker.io/library/node:20.11.0-alpine as build
WORKDIR /workspace
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 600000
COPY . .
RUN yarn build

FROM docker.io/library/nginx:1.24.0-alpine as production
COPY --from=build /workspace/build /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/templates/default.conf.template
CMD /docker-entrypoint.d/20-envsubst-on-templates.sh && \
    nginx -g 'daemon off;'
EXPOSE 80