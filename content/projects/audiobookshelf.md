---
name: Audiobookshelf
description: Audiobookshelf is an open-source self-hosted media server for your audiobooks and podcasts.
logo: '/assets/images/logos/audiobookshelf.png'
homepage: 'https://www.audiobookshelf.org/'
docker: 'https://www.audiobookshelf.org/docs/#docker-compose-install'
github: 'https://github.com/advplyr/audiobookshelf'
draft: false
---

# Getting Started

1. Create a folder
    ```bash
    mkdir audiobookshelf
    ```
2. Move to the folder and create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      audiobookshelf:
        image: ghcr.io/advplyr/audiobookshelf:latest
        ports:
          - 13378:80
        volumes:
          - .:/audiobooks
          - .:/podcasts
          - .:/config
          - .:/metadata
        environment:
          - TZ=America/Toronto
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to `http://localhost:13378` to access the Audiobookshelf.