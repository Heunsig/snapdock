---
name: Docmost
description: Open-source collaborative wiki and documentation software
logo: '/assets/images/logos/docmost.png'
homepage: 'https://docmost.com/'
docker: 'https://docmost.com/docs/installation'
github: 'https://github.com/docmost/docmost'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir docmost && cd docmost
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      docmost:
        image: docmost/docmost:latest
        depends_on:
          - db
          - redis
        environment:
          APP_URL: "http://localhost:3000"
          APP_SECRET: "qwerqwerqerqewr23$@#$@EWrwerf23r23421!234fef3wf234"
          DATABASE_URL: "postgresql://docmost:STRONG_DB_PASSWORD@db:5432/docmost?schema=public"
          REDIS_URL: "redis://redis:6379"
          MAIL_DRIVER: "smtp"
          SMTP_HOST: "mailhog"
          SMTP_PORT: "1025"
          SMTP_USERNAME: "admin"
          SMTP_PASSWORD: "admin"
          SMTP_SECURE: "secure"
          MAIL_FROM_ADDRESS: "hello@example.com"
          MAIL_FROM_NAME: "Docmost"
        ports:
          - "3000:3000"
        restart: unless-stopped
        volumes:
          - docmost:/app/data/storage

      db:
        image: postgres:16-alpine
        environment:
          POSTGRES_DB: docmost
          POSTGRES_USER: docmost
          POSTGRES_PASSWORD: STRONG_DB_PASSWORD
        restart: unless-stopped
        volumes:
          - db_data:/var/lib/postgresql/data

      redis:
        image: redis:7.2-alpine
        restart: unless-stopped
        volumes:
          - redis_data:/data

      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - "8025:8025"

    volumes:
      docmost:
      db_data:
      redis_data:
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:3000](http://localhost:3000) to access the Docmost.