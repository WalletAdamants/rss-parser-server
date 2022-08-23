FROM node:16.13.0

# RUN apt-get update && apt-get install -y
# RUN mkdir /google
# RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
# RUN rm google-chrome-stable_current_amd64.deb 

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --global pm2


# FROM node:16.13.0-alpine
# RUN apk update update && apk add bash
# RUN mkdir /home/app
# WORKDIR /home/app
# COPY package.json /home/app
# RUN yarn install
# COPY . /home/app
# RUN yarn build
# RUN yarn global add serve
# EXPOSE 3000
# CMD ["yarn", "deploy"]