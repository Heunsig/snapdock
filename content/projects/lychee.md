---
name: Lychee
description: Free self-hosted photo-management tool, which runs on your server or web-space
logo: '/assets/images/logos/lychee.png'
homepage: 'https://lychee.electerious.com/'
docker: 'https://hub.docker.com/r/linuxserver/lychee'
github: 'https://github.com/electerious/Lychee'
tags: []
published: true
createdAt: "2025-02-14T13:13:19.000Z"
updatedAt: "2025-02-16T13:51:23.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir lychee && cd lychee
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      lychee:
        image: lscr.io/linuxserver/lychee:latest
        container_name: lychee
        environment:
          - TZ=Asia/Seoul
          - DB_CONNECTION=pgsql
          - DB_HOST=database
          - DB_PORT=5432
          - DB_USERNAME=postgres
          - DB_PASSWORD=postgres
          - DB_DATABASE=postgres
          - APP_NAME=Lychee
          - APP_URL=http://localhost:8081
          - TRUSTED_PROXIES= #optional
        networks:
          - lychee
        volumes:
          - lychee_config:/config
          - lychee_pictures:/pictures
        ports:
          - 8081:80
        restart: unless-stopped

      database:
        image: postgres:16
        restart: unless-stopped
        volumes:
          - postgres-data:/var/lib/postgresql/data
        environment:
          POSTGRES_PASSWORD: postgres
          POSTGRES_USER: postgres
          POSTGRES_DB: postgres
        ports:
          - "5432:5432"
        networks:
          - lychee
    networks:
      lychee:
        name: Lychee
        driver: bridge

    volumes:
      lychee_config:
      lychee_pictures:
      postgres-data:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8081](http://localhost:8081) to access the Lychee.
