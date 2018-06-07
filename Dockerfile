# Dockerfile.alpine
FROM mhart/alpine-node:10.4.0

# Setup yarn
# RUN yarn config set registry https://registry.npm.taobao.org

# Create app directory
RUN mkdir -p /usr/src/app

# Installs the latest Chromium (64) package.
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories
RUN apk add git make gcc g++ python linux-headers paxctl gnupg
RUN apk add --no-cache nss@edge
RUN apk add --no-cache chromium@edge

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Puppeteer v0.13.0 works with Chromium 64.
RUN yarn add puppeteer@0.13.0
# Add user so we don't need --no-sandbox. (Currently broken, commented.)
# RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
#     && mkdir -p /home/pptruser/Downloads \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /usr/src/app
# # Run everything after as non-privileged user.
# USER pptruser

# bundle app source
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
COPY yarn.lock /tmp/yarn.lock
# Use America source since we are ouside GFW
# RUN sed -i 's/registry.npm.taobao.org/registry.npmjs.org/g' /tmp/yarn.lock
RUN cd /tmp && yarn && cp -a /tmp/node_modules /usr/src/app/

# Install nginx
RUN apk add --no-cache nginx && \
    chown -R nginx:www-data /var/lib/nginx
COPY nginx.conf /etc/nginx/nginx.conf

# From here we load our application's code in, therefore the previous docker
# "layer" that's been cached will be used if possible
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn build

# Expose port
EXPOSE 80 443

CMD ["nginx", "-g", "pid /tmp/nginx.pid; daemon off;"]
