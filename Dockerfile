# Installer
# ARG NODE_VERSION=19.5.0

FROM node:18-slim

ENV NODE_ENV production

WORKDIR /usr/src/app

USER root

# Atualize os pacotes e instale o Python
RUN apt-get update
RUN apt-get install -y python3 python3-pip
RUN apt-get install python3.11-venv -y
RUN python3 -m venv .venv
# RUN source .venv/bin/activate
RUN apt-get clean

# Configure o pip e instale pacotes Python conforme necessário
# RUN python3 -m pip install requests

RUN npm i -g node-pre-gyp

COPY package*.json ./

RUN npm i -g @tensorflow/tfjs@3.6.0
RUN npm i -g @tensorflow/tfjs-node
# RUN npm rebuild @tensorflow/tfjs-node -build-from-source

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