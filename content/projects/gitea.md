---
name: Gitea
description: A self-hosted, lightweight Git service that offers a complete platform for version control and software development collaboration.
logo: '/assets/images/logos/gitea.svg'
homepage: 'https://about.gitea.com/'
docker: 'https://docs.gitea.com/installation/install-with-docker'
github: 'https://github.com/go-gitea/gitea'
demo: 'https://demo.gitea.com/'
tags: ["git", 'github', 'version control']
published: true
createdAt: "2025-08-14T13:26:47Z"
updatedAt: "2025-08-14T13:26:47Z"
screenshots: [
  '/assets/images/screenshots/gitea/gitea_01.png',
  '/assets/images/screenshots/gitea/gitea_02.png',
  '/assets/images/screenshots/gitea/gitea_03.png',
  '/assets/images/screenshots/gitea/gitea_04.png',
  '/assets/images/screenshots/gitea/gitea_05.png',
  '/assets/images/screenshots/gitea/gitea_06.png',
  '/assets/images/screenshots/gitea/gitea_07.png',
  '/assets/images/screenshots/gitea/gitea_08.png',
  '/assets/images/screenshots/gitea/gitea_09.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir gitea && cd gitea
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    networks:
      gitea:
        external: false

    services:
      server:
        image: docker.gitea.com/gitea:1.24.5
        container_name: gitea
        environment:
          - USER_UID=1000
          - USER_GID=1000
        restart: always
        networks:
          - gitea
        volumes:
          - gitea:/data
          - /etc/timezone:/etc/timezone:ro
          - /etc/localtime:/etc/localtime:ro
        ports:
          - "3000:3000"
          - "222:22"
    volumes:
      gitea:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Visit [http://localhost:3000](http://localhost:3000) to access Gitea.

