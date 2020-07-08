# <PYTHON>
FROM python:3
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    apt-utils \
    gettext
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
# </PYTHON>

# <NODE>
COPY build /stack/boilerplate
ENV NVM_DIR=/opt/nvm \
    NVM_VERSION=0.35.3 \
    NODE_VERSION=12.16.2 \
    NPM_VERSION=6.14.4
RUN bash /stack/boilerplate/install.sh
ENV NODE_PATH=$NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules \
    PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
# </NODE>

# <NPM>
ENV PATH=/node_modules/.bin:$PATH
COPY package.json /
RUN (cd / && npm install --production && rm -rf /tmp/*)
# </NPM>

# <GULP>
ENV GULP_MODE=production
RUN gulp build
# </GULP>