---
name: Aptabase
description: Open Source alternative to Google Firebase Analytics
logo: '/assets/images/logos/aptabase.svg'
homepage: 'https://aptabase.com/'
docker: 'https://github.com/aptabase/self-hosting'
github: 'https://github.com/aptabase/aptabase'
tags: ["analytics"]
createdAt: "2025-02-17T15:22:42.000Z"
updatedAt: "2025-02-19T14:26:50.000Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir aptabase && cd aptabase
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      aptabase_db:
        container_name: aptabase_db
        image: postgres:15-alpine
        restart: always
        volumes:
          - db-data:/var/lib/postgresql/data
        environment:
          POSTGRES_USER: aptabase
          POSTGRES_PASSWORD: sTr0NGp4ssw0rd

      aptabase_events_db:
        container_name: aptabase_events_db
        image: clickhouse/clickhouse-server:23.8.4.69-alpine
        restart: always
        volumes:
          - events-db-data:/var/lib/clickhouse
        environment:
          CLICKHOUSE_USER: aptabase
          CLICKHOUSE_PASSWORD: sTr0NGp4ssw0rd
        ulimits:
          nofile:
            soft: 262144
            hard: 262144

      aptabase:
        container_name: aptabase_app
        image: ghcr.io/aptabase/aptabase:main
        restart: always
        depends_on:
          - aptabase_events_db
          - aptabase_db
        ports:
          - 8000:8080
        environment:
          BASE_URL: http://localhost:8000 # replace with your ip or domain, including port if needed
          AUTH_SECRET: c4rI4x8kz5DgKJ1is5Eiu9bNncSQ6ROD # get a strong secret from https://randomkeygen.com/
          DATABASE_URL: Server=aptabase_db;Port=5432;User Id=aptabase;Password=sTr0NGp4ssw0rd;Database=aptabase
          CLICKHOUSE_URL: Host=aptabase_events_db;Port=8123;Username=aptabase;Password=sTr0NGp4ssw0rd
          SMTP_HOST: mailhog
          SMTP_PORT: 1025
          SMTP_USERNAME: admin
          SMTP_PASSWORD: admin
          SMTP_FROM_ADDRESS: admin@example.com

      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - "8025:8025"

    volumes:
      db-data:
        driver: local
      events-db-data:
        driver: local
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8000](http://localhost:8000) to access the Aptabase
5. Open [http://localhost:8025](http://localhost:8025) to view emails sent by Aptabase during signup
