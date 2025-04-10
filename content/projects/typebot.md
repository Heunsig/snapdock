---
name: Typebot
description: An open-source chatbot builder for creating, deploying, and managing conversational apps
logo: '/assets/images/logos/typebot.svg'
homepage: 'https://typebot.io/'
docker: 'https://docs.typebot.io/self-hosting/deploy/docker'
github: 'https://github.com/baptisteArno/typebot.io'
screenshots: [
  '/assets/images/screenshots/typebot/typebot_01.png',
  '/assets/images/screenshots/typebot/typebot_02.png',
  '/assets/images/screenshots/typebot/typebot_03.png',
  '/assets/images/screenshots/typebot/typebot_04.png',
  '/assets/images/screenshots/typebot/typebot_05.png',
  '/assets/images/screenshots/typebot/typebot_06.png',
]
published: true
createdAt: "2025-03-01T06:29:24.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir typebot && cd typebot
    ```
2. Create a `.env` file and add the following content:
    ```
    ENCRYPTION_SECRET=do+UspMmB/rewbX2K/rskFmtgGSSZ8Ta
    DATABASE_URL=postgresql://postgres:typebot@typebot-db:5432/typebot

    NODE_OPTIONS=--no-node-snapshot

    NEXTAUTH_URL=http://localhost:9090
    NEXT_PUBLIC_VIEWER_URL=http://localhost:9091
    ADMIN_EMAIL=admin@example.com

    SMTP_USERNAME=admin
    SMTP_PASSWORD=admin
    SMTP_HOST=mailhog
    SMTP_PORT=1025
    NEXT_PUBLIC_SMTP_FROM=admin@typebot.com
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      typebot-db:
        image: postgres:16
        restart: always
        volumes:
          - db-data:/var/lib/postgresql/data
        environment:
          - POSTGRES_DB=typebot
          - POSTGRES_PASSWORD=typebot
        healthcheck:
            test: ["CMD-SHELL", "pg_isready -U postgres"]
            interval: 5s
            timeout: 5s
            retries: 5
      typebot-builder:
        image: baptistearno/typebot-builder:latest
        restart: always
        depends_on:
          typebot-db:
            condition: service_healthy
        ports:
          - '9090:3000'
        extra_hosts:
          - 'host.docker.internal:host-gateway'
        env_file: .env

      typebot-viewer:
        image: baptistearno/typebot-viewer:latest
        depends_on:
          typebot-db:
            condition: service_healthy
        restart: always
        ports:
          - '9091:3000'
        env_file: .env

      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - "8025:8025"

    volumes:
      db-data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9090](http://localhost:9090) to access the Typebot.

Note: For email confirmation during signup, check MailHog at [http://localhost:8025](http://localhost:8025).
