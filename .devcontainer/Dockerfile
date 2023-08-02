FROM ubuntu:20.04
LABEL maintainer="maxmilio@kiv.zcu.cz" \
      org.opencontainers.image.source="https://github.com/maxotta/iac-dev-docker"

ARG SRC_WORKDIR=/usr/src
# ARG SRC_GITREPO

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update ; \
    apt-get -y install gnupg software-properties-common wget apt-transport-https ; \
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | tee /usr/share/keyrings/hashicorp-archive-keyring.gpg ; \
    gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint ; \
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list ; \
    apt update

RUN apt-get -y install git
RUN apt-get -y install terraform

RUN wget -O- https://deb.nodesource.com/setup_16.x | bash ; \
    apt-get -y install nodejs ; \
    npm install --global @cdktf/cli-core@latest ; \
    npm install --global cdktf-cli@latest

RUN apt-get -y install python3 python3-pip ; \
    pip3 install ansible

RUN apt-get -y install mc

WORKDIR ${SRC_WORKDIR}
# RUN git clone ${SRC_GITREPO}

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV SHELL /bin/bash

CMD [ "sh", "-c", "while :; do cd ${SRC_WORKDIR}; bash -i; echo '==> NOPE ! Exiting the shell would also stop the Docker container! Please close the terminal window instead.'; done" ]
