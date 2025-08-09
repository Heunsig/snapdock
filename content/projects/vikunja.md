---
name: Vikunja
description: Vikunja, the fluffy, open-source, self-hostable to-do app.
logo: '/assets/images/logos/vikunja.svg'
homepage: 'https://vikunja.io/'
docker: 'https://vikunja.io/docs/full-docker-example/'
tags: []
published: true
createdAt: "2025-02-08T13:40:43.000Z"
updatedAt: "2025-08-09T05:04:19Z"
screenshots: [
  '/assets/images/screenshots/vikunja/vikunja_01.png',
  '/assets/images/screenshots/vikunja/vikunja_02.png',
  '/assets/images/screenshots/vikunja/vikunja_03.png',
  '/assets/images/screenshots/vikunja/vikunja_04.png',
  '/assets/images/screenshots/vikunja/vikunja_05.png',
  '/assets/images/screenshots/vikunja/vikunja_06.png',
  '/assets/images/screenshots/vikunja/vikunja_07.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir vikunja && cd vikunja
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services: 
      vikunja:
        image: vikunja/vikunja
        environment:
          VIKUNJA_SERVICE_PUBLICURL: http://localhost
          VIKUNJA_DATABASE_HOST: db
          VIKUNJA_DATABASE_PASSWORD: changeme
          VIKUNJA_DATABASE_TYPE: mysql
          VIKUNJA_DATABASE_USER: vikunja
          VIKUNJA_DATABASE_DATABASE: vikunja
          VIKUNJA_SERVICE_JWTSECRET: qwerqwer$#@#erfwer2334234
        ports:
          - 3456:3456
        user: 0:0
        volumes:
          - vikunja_files:/app/vikunja/files
        depends_on:
          db:
            condition: service_healthy
        restart: unless-stopped
      db:
        image: mariadb:10
        command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
        environment:
          MYSQL_ROOT_PASSWORD: supersecret
          MYSQL_USER: vikunja
          MYSQL_PASSWORD: changeme
          MYSQL_DATABASE: vikunja
        volumes:
          - vikunja_db:/var/lib/mysql
        restart: unless-stopped
        healthcheck:
          test: ["CMD-SHELL", "mysqladmin ping -h localhost -u $$MYSQL_USER --password=$$MYSQL_PASSWORD"]
          interval: 2s
          start_period: 30s
    volumes:
      vikunja_files:
      vikunja_db:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:3456](http://localhost:3456) to access the Vikunja.
