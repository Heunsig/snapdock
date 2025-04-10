---
name: Metube
description: Self-hosted YouTube downloader.
logo: '/assets/images/logo.png'
homepage: 'https://github.com/alexta69/metube'
docker: 'https://github.com/alexta69/metube?tab=readme-ov-file#run-using-docker-compose'
github: 'https://github.com/alexta69/metube'
tags: []
published: true
createdAt: "2025-02-17T12:05:37.000Z"
updatedAt: "2025-02-17T12:05:37.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir metube && cd metube
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      metube:
        image: ghcr.io/alexta69/metube
        container_name: metube
        restart: unless-stopped
        ports:
          - "8081:8081"
        volumes:
          - metube_downloads:/downloads
    volumes:
      metube_downloads:
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8081](http://localhost:8081) to access the Metube.
