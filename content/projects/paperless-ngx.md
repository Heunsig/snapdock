---
name: Paperless-ngx
description: Scan, index, and archive all of your paper documents
logo: '/assets/images/logos/paperless-ngx.svg'
homepage: 'https://docs.paperless-ngx.com/'
docker: 'https://docs.paperless-ngx.com/setup/#docker'
github: 'https://github.com/paperless-ngx/paperless-ngx'
demo: 'https://demo.paperless-ngx.com/'
tags: ['document management']
screenshots: [
  '/assets/images/screenshots/paperless-ngx/paperless-ngx_01.png',
  '/assets/images/screenshots/paperless-ngx/paperless-ngx_02.png',
  '/assets/images/screenshots/paperless-ngx/paperless-ngx_03.png',
  '/assets/images/screenshots/paperless-ngx/paperless-ngx_04.png',
  '/assets/images/screenshots/paperless-ngx/paperless-ngx_05.png',
]
published: true
createdAt: "2025-03-08T16:18:14.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir paperless-ngx && cd paperless-ngx
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      broker:
        image: docker.io/library/redis:7
        restart: unless-stopped
        volumes:
          - redisdata:/data

      webserver:
        image: ghcr.io/paperless-ngx/paperless-ngx:latest
        restart: unless-stopped
        depends_on:
          - broker
        ports:
          - "8000:8000"
        volumes:
          - data:/usr/src/paperless/data
          - media:/usr/src/paperless/media
          - export:/usr/src/paperless/export
          - consume:/usr/src/paperless/consume
        environment:
          PAPERLESS_REDIS: redis://broker:6379

    volumes:
      data:
      media:
      redisdata:
      export:
      consume:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Create a superuser by running the following command:
    ```bash
    docker compose run --rm webserver createsuperuser
    ```
5. Open the browser and go to [http://localhost:8000](http://localhost:8000) to access Paperless-ngx with the credentials you created.
