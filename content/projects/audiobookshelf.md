---
name: Audiobookshelf
description: Audiobookshelf is an open-source self-hosted media server for your audiobooks and podcasts.
logo: '/assets/images/logos/audiobookshelf.png'
homepage: 'https://www.audiobookshelf.org/'
docker: 'https://www.audiobookshelf.org/docs/#docker-compose-install'
github: 'https://github.com/advplyr/audiobookshelf'
createdAt: "2025-02-10T11:44:29.000Z"
updatedAt: "2025-02-10T12:33:05.000Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir audiobookshelf && cd audiobookshelf
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      audiobookshelf:
        image: ghcr.io/advplyr/audiobookshelf:latest
        ports:
          - 13378:80
        volumes:
          - audiobookshelf_data:/audiobookshelf_data
          - audiobookshelf_config:/config
          - audiobookshelf_metadata:/metadata
        environment:
          - TZ=Asia/Seoul
      filebrowser:
        image: filebrowser/filebrowser
        container_name: filebrowser
        ports:
          - "9999:80"
        environment:
          - FB_NOAUTH=true
        volumes:
          - audiobookshelf_data:/srv
          - filebrowser_database:/database
        restart: always
    volumes:
      audiobookshelf_data:
      audiobookshelf_config:
      audiobookshelf_metadata:
      filebrowser_database:

    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:13378](http://localhost:13378) to access the Audiobookshelf.

NOTE: To upload files, go to [http://localhost:9999](http://localhost:9999). The data will be stored in the `audiobookshelf_data` directory.