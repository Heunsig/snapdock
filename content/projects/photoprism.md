---
name: PhotoPrism
description: AI-Powered Photos App for the Decentralized Web
logo: '/assets/images/logos/photoprism.svg'
homepage: 'https://www.photoprism.app/'
docker: 'https://docs.photoprism.app/getting-started/docker-compose/'
github: 'https://github.com/photoprism/photoprism'
demo: 'https://try.photoprism.app/'
tags: ["photo", "ai", "self-hosted", "machine-learning"]
published: true
createdAt: "2026-02-11T23:15:00.000Z"
updatedAt: "2026-02-11T23:15:00.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir photoprism && cd photoprism
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      photoprism:
        image: photoprism/photoprism:latest
        container_name: photoprism
        ports:
          - "2342:2342"
        environment:
          PHOTOPRISM_ADMIN_USER: "admin"
          PHOTOPRISM_ADMIN_PASSWORD: "demo"
          PHOTOPRISM_DATABASE_DRIVER: "mysql"
          PHOTOPRISM_DATABASE_SERVER: "mariadb:3306"
          PHOTOPRISM_DATABASE_NAME: "photoprism"
          PHOTOPRISM_DATABASE_USER: "photoprism"
          PHOTOPRISM_DATABASE_PASSWORD: "demo"
        volumes:
          - ./originals:/photoprism/originals
          - ./storage:/photoprism/storage
        depends_on:
          - mariadb

      mariadb:
        image: mariadb:11
        container_name: photoprism_mariadb
        environment:
          MARIADB_ROOT_PASSWORD: "demo"
          MARIADB_DATABASE: "photoprism"
          MARIADB_USER: "photoprism"
          MARIADB_PASSWORD: "demo"
        volumes:
          - ./database:/var/lib/mysql
    ```
3. Start the containers:
    ```bash
    docker compose up -d
    ```
4. Wait for initialization (this may take 1-2 minutes on first run):
    ```bash
    docker compose logs -f photoprism
    ```
    Look for "server started" message in the logs, then press Ctrl+C to exit
5. Open the browser and go to [http://localhost:2342](http://localhost:2342)
    - Username: `admin`
    - Password: `demo`
