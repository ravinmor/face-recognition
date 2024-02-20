# Installer
# ARG NODE_VERSION=19.5.0

FROM node:18-slim

ENV NODE_ENV production

WORKDIR /usr/src/app

USER root

RUN apt-get update
RUN npm i -g node-gyp
RUN npm i -g @tensorflow/tfjs@3.18.0
RUN npm rebuild @tensorflow/tfjs-node build-addon-from-source

COPY package*.json ./

RUN  npm i

# ------------------------------------------------------
# Runner

# Expose the port that the application listens on.
EXPOSE 3000


# Copy the rest of the source files into the image.
COPY . .

# Run the application as a non-root user.
RUN  chown -R node /usr/src/app

# Run the application in dev mode to use with Compose watch feature
CMD ["npm", "start"]