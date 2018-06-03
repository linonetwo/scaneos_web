# Dockerfile.alpine
FROM mhart/alpine-node:latest

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# Setup yarn
# RUN yarn config set registry https://registry.npm.taobao.org

# Create app directory and bundle app source
RUN mkdir -p /usr/src/app

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

CMD [ "http-server", "./build", "-g", "-p", "5000" ]
# CMD [ "yarn", "start" ]