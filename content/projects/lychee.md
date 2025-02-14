---
name: Lychee
description: Free self-hosted photo-management tool, which runs on your server or web-space
logo: '/assets/images/logos/lychee.png'
homepage: 'https://lychee.electerious.com/'
docker: 'https://hub.docker.com/r/linuxserver/lychee'
github: 'https://github.com/electerious/Lychee'
tags: []
published: false
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir lychee && cd lychee
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      lychee:
        image: lscr.io/linuxserver/lychee:latest
        container_name: lychee
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=Etc/UTC
          - DB_CONNECTION=pgsql
          - DB_HOST=database
          - DB_PORT=5432
          - DB_USERNAME=postgres
          - DB_PASSWORD=postgres
          - DB_DATABASE=postgres
          - APP_NAME=Lychee #optional
          - APP_URL= #optional
          - TRUSTED_PROXIES= #optional
        networks:
          - lychee
        volumes:
          - ./config:/config
          - ./pictures:/pictures
        ports:
          - 80:80
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
      postgres-data:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost](http://localhost) to access the Lychee.
