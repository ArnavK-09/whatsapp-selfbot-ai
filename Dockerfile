FROM scratch

#RUN         apt update \
       #     && apt -y install ffmpeg iproute2 git sqlite3 libsqlite3-dev python3 python3-dev ca-certificates dnsutils tzdata zip tar curl build-essential libtool iputils-ping libnss3 tini \
         #   && useradd -m -d /home/container container

#RUN         npm install npm@9.8.1 typescript ts-node @types/node --location=global

RUN node index.js
