---
name: Healthchecks
description: Simple and Effective Cron Job Monitoring
logo: '/assets/images/logos/healthchecks.svg'
homepage: 'https://healthchecks.io/'
docker: 'https://healthchecks.io/docs/self_hosted_docker/'
github: 'https://github.com/healthchecks/healthchecks'
tags: ["monitoring", "healthcheck"]
screenshots: [
  '/assets/images/screenshots/healthchecks/healthchecks_01.png',
  '/assets/images/screenshots/healthchecks/healthchecks_02.png',
  '/assets/images/screenshots/healthchecks/healthchecks_03.png',
  '/assets/images/screenshots/healthchecks/healthchecks_04.png',
  '/assets/images/screenshots/healthchecks/healthchecks_05.png',
]
published: true
createdAt: "2025-03-08T14:30:07.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir healthchecks && cd healthchecks
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      healthchecks:
        image: healthchecks/healthchecks:latest
        container_name: healthchecks
        environment:
          - DB=sqlite
          - DB_NAME=/data/hc.sqlite
          - DEBUG=False
          - DEFAULT_FROM_EMAIL=admin@example.com
          - EMAIL_HOST=mailhog
          - EMAIL_HOST_PASSWORD=mailhog
          - EMAIL_HOST_USER=mailhog
          - EMAIL_PORT=1025
          - EMAIL_USE_TLS=False
          - SECRET_KEY=---
          - SITE_ROOT=http://localhost:8000
        ports:
          - 8000:8000
        volumes:
          - healthchecks-data:/data
        restart: unless-stopped
      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - 8025:8025
    volumes:
        healthchecks-data:
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8000](http://localhost:8000) to access Healthchecks.

Note: For email confirmation during signup, check MailHog at [http://localhost:8025](http://localhost:8025).
