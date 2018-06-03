# Dockerfile.alpine
FROM mhart/alpine-node:latest

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python
# Setup yarn
# RUN yarn config set registry https://registry.npm.taobao.org

# Create app directory
RUN mkdir -p /usr/src/app


# Installs latest Chromium (63) package.
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories
RUN apk add --no-cache nss@edge
RUN apk add --no-cache chromium@edge

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Puppeteer v0.11.0 works with Chromium 63.
RUN yarn add puppeteer
# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/src/app
# Run everything after as non-privileged user.
USER pptruser

# bundle app source
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
COPY yarn.lock /tmp/yarn.lock
# RUN sed -i '' 's/registry.npm.taobao.org/registry.npmjs.org/g' yarn.lock
RUN cd /tmp && yarn
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

# simple http server
RUN yarn global add http-server

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn build
# Expose port
EXPOSE 5000

CMD [ "http-server", "./build", "-g", "-p", "5000", "-P" ]
# CMD [ "yarn", "start" ]