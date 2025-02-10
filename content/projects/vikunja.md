---
name: Vikunja
description: Vikunja, the fluffy, open-source, self-hostable to-do app.
logo: '/assets/images/logos/vikunja.svg'
homepage: 'https://vikunja.io/'
docker: 'https://vikunja.io/docs/full-docker-example/'
tags: []
draft: false
---

## Getting Started

1. Create a folder
    ```bash
    mkdir vikunja
    ```
2. Move to the folder and create `files` folder and change the ownership
    ```bash
    cd vikunja
    mkdir files
    chown 1000 files
    ```
3. Create a `docker-compose.yml` file and add the following content:
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
          VIKUNJA_SERVICE_JWTSECRET: <a super secure random secret>
        ports:
          - 3456:3456
        volumes:
          - ./files:/app/vikunja/files
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
          - ./db:/var/lib/mysql
        restart: unless-stopped
        healthcheck:
          test: ["CMD-SHELL", "mysqladmin ping -h localhost -u $$MYSQL_USER --password=$$MYSQL_PASSWORD"]
          interval: 2s
          start_period: 30s
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Open the browser and go to `http://localhost:3456` to access the Vikunja.