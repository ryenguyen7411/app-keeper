FROM node:9.4
LABEL author=ryenguyen7411<ryenguyen7411@gmail.com>

RUN npm install -g yarn sequelize-cli babel-cli babel-preset-env

# Set corresponding arguments in .env. Those will be passed into docker-compose file.
ARG NODE_ENV=development
ARG APP_PATH=/usr/local/web

# Configure main working directory.
# This directory will be used on each further RUN, COPY or ENTRYPOINT commands.
RUN mkdir -p ${APP_PATH}
WORKDIR ${APP_PATH}

# Install app dependencies. This will be cached unless having change on one of these file
COPY package.json yarn.lock ./
RUN yarn

# Load application into container
COPY . .
