---
name: Audiobookshelf
description: Audiobookshelf is an open-source self-hosted media server for your audiobooks and podcasts.
logo: '/assets/images/logos/audiobookshelf.png'
homepage: 'https://www.audiobookshelf.org/'
docker: 'https://www.audiobookshelf.org/docs/#docker-compose-install'
github: 'https://github.com/advplyr/audiobookshelf'
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir audiobookshelf && cd audiobookshelf
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      audiobookshelf:
        image: ghcr.io/advplyr/audiobookshelf:latest
        ports:
          - 13378:80
        volumes:
          - audiobookshelf_data:/audiobooks
          - audiobookshelf_config:/config
          - audiobookshelf_metadata:/metadata
        environment:
          - TZ=Asia/Seoul
    volumes:
      audiobookshelf_data:
      audiobookshelf_config:
      audiobookshelf_metadata:
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:13378](http://localhost:13378) to access the Audiobookshelf.
