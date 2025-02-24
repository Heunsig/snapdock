---
name: RALLLY
description: Streamline your scheduling process and save time
logo: '/assets/images/logos/rallly.svg'
homepage: 'https://rallly.co/'
docker: 'https://support.rallly.co/self-hosting/docker-compose'
github: 'https://github.com/lukevella/rallly'
tags: ['calendar', 'scheduling']
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir rallly && cd rallly
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      rallly_db:
        image: postgres:14.2
        restart: always
        volumes:
          - db-data:/var/lib/postgresql/data
        environment:
          - POSTGRES_PASSWORD=postgres
          - POSTGRES_DB=db
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U postgres"]
          interval: 5s
          timeout: 5s
          retries: 5

      rallly:
        image: lukevella/rallly:latest
        restart: always
        depends_on:
          - rallly_db
        ports:
          - 3000:3000
        environment:
          - DATABASE_URL=postgres://postgres:postgres@rallly_db/db
        env_file:
          - .env

      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - 8025:8025

    volumes:
      db-data:
    ```
3. Create a `.env` file and add the following content:
    ```
    DATABASE_URL=postgres://postgres:postgres@rallly_db:5432/db
    SECRET_PASSWORD=6E4AYHRwftiy1+q9Mv8vwRJiiOo47BQZfPcPO/eDACw=
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    SUPPORT_EMAIL=admin@example.com
    SMTP_HOST=mailhog
    SMTP_PORT=1025
    SMTP_SECURE=false
    SMTP_USER=admin
    SMTP_PWD=admin
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Open the browser and go to [http://localhost:3000](http://localhost:3000) to access Rallly

Note: For email confirmation during signup, check MailHog at [http://localhost:8025](http://localhost:8025).

