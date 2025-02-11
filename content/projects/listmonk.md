---
name: listmonk
description: listmonk is a standalone, self-hosted, newsletter and mailing list manager.
logo: '/assets/images/logos/listmonk.svg'
homepage: 'https://listmonk.app/'
docker: 'https://listmonk.app/docs/installation/#docker'
github: 'https://github.com/knadh/listmonk'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir listmonk
    cd listmonk
    ```
2. Run the following command to download the docker-compose.yml file
    ```bash
    curl -LO https://github.com/knadh/listmonk/raw/master/docker-compose.yml
    ```
3. Run the following command to start the container
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to `http://localhost:9000` to access the Listmonk.