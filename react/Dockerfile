FROM node:14.15.3-alpine

COPY package.json /srv/react/

WORKDIR /srv/react
RUN chown -R node:node .
USER node

RUN npm install --quiet --loglevel=error
COPY src /srv/react/src
COPY public /srv/react/public

USER root
# RUN chown -R node:node .
# USER node

RUN npm run build --loglevel=error

COPY django_admin_static /srv/react/build/static/admin