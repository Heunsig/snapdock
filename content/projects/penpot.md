---
name: Penpot
description: Penpot is the only design & prototype platform that is deployment agnostic. You can use it or deploy it anywhere.
logo: '/assets/images/logos/penpot.svg'
homepage: 'https://penpot.app/'
docker: 'https://help.penpot.app/technical-guide/getting-started/#start-penpot'
github: 'https://github.com/penpot/penpot'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir penpot && cd penpot
    ```
2. Download `docker-compose.yml`
    ```bash
    wget https://raw.githubusercontent.com/penpot/penpot/main/docker/images/docker-compose.yaml
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Wait a minute for the containers to start up, then visit [http://localhost:9001](http://localhost:9001) to access the Penpot.

Note: "Bad Gateway" error may occur because the containers are not ready yet. After a minute, the error will disappear.
