---
name: Tianji
description: Website Analytics + Uptime Monitor + Server Status
logo: '/assets/images/logos/tianji.svg'
homepage: 'https://tianji.msgbyte.com/'
docker: 'https://tianji.msgbyte.com/docs/intro'
github: 'https://github.com/msgbyte/tianji'
tags: ["monitoring", "analytics", "uptime"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir tianji && cd tianji
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      tianji:
        image: moonrailgun/tianji
        ports:
          - "12345:12345"
        environment:
          DATABASE_URL: postgresql://tianji:tianji@postgres:5432/tianji
          JWT_SECRET: replace-me-with-a-random-string
          ALLOW_REGISTER: "false"
          ALLOW_OPENAPI: "true"
        depends_on:
          - postgres
        restart: always
      postgres:
        image: postgres:15.4-alpine
        environment:
          POSTGRES_DB: tianji
          POSTGRES_USER: tianji
          POSTGRES_PASSWORD: tianji
        volumes:
          - tianji-db-data:/var/lib/postgresql/data
        restart: always
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
          interval: 5s
          timeout: 5s
          retries: 5
    volumes:
      tianji-db-data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:12345](http://localhost:12345) to access the Tianji.
    ```
    Username: admin
    Password: admin
    ```
