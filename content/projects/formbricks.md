---
name: Formbricks
description: Versatile open-source platform for collecting and analyzing feedback from customers, users, and employees through targeted surveys.
logo: '/assets/images/logos/formbricks.svg'
homepage: 'https://formbricks.com/'
docker: 'https://formbricks.com/docs/self-hosting/setup/docker'
github: 'https://github.com/formbricks/formbricks'
tags: ["feedback", "survey"]
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir formbricks && cd formbricks
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    x-environment: &environment
      environment:
        ######################################################## REQUIRED ########################################################

        # The url of your Formbricks instance used in the admin panel
        WEBAPP_URL: http://localhost:3000

        # Required for next-auth. Should be the same as WEBAPP_URL
        NEXTAUTH_URL: http://localhost:3000

        # PostgreSQL DB for Formbricks to connect to
        DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/formbricks?schema=public"

        # NextJS Auth
        # @see: https://next-auth.js.org/configuration/options#nextauth_secret
        NEXTAUTH_SECRET: 8bc9d4df47385f1ed857c39de244b5205de1eeae213f2f42a9c7d69175afa8fb

        # Encryption Key is used for 2FA & Single use URLs for Link Surveys
        ENCRYPTION_KEY: 9bb13a455624f2f7b790c72064d15c41c5c7ef8f1c90380f04d07af62e63469e

        # API Secret for running cron jobs.
        CRON_SECRET: afe7e702742ec70629bf64df9aad6c0362fa279c1710eb139657dde164244f90

        # Email Configuration
        MAIL_FROM: admin@example.com
        SMTP_HOST: mailhog
        SMTP_PORT: 1025
        SMTP_USER: admin
        SMTP_PASSWORD: admin
        SMTP_AUTHENTICATED: 0

        EMAIL_VERIFICATION_DISABLED: 1
        PASSWORD_RESET_DISABLED: 1
        S3_FORCE_PATH_STYLE: 0

    services:
      postgres:
        restart: always
        image: pgvector/pgvector:pg17
        volumes:
          - postgres:/var/lib/postgresql/data
        environment:
          - POSTGRES_PASSWORD=postgres

      formbricks:
        restart: always
        image: ghcr.io/formbricks/formbricks:latest
        depends_on:
          - postgres
        ports:
          - 3000:3000
        volumes:
          - uploads:/home/nextjs/apps/web/uploads/
        <<: *environment

      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - "8025:8025"

    volumes:
      postgres:
        driver: local
      uploads:

    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Wait about 5 minutes for the containers to start up and initialize, then visit [http://localhost:3000](http://localhost:3000) to access Formbricks.

Note: All emails in this environment are received in [http://localhost:8025](http://localhost:8025), so please check there.
