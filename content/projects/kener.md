---
name: Kener
description: Stunning docker ready open source status pages
logo: '/assets/images/logos/kener.png'
homepage: 'https://kener.ing/'
docker: 'https://github.com/rajnandan1/kener/blob/main/docker-compose.yml'
github: 'https://github.com/rajnandan1/kener'
tags: ["healthcheck", "monitoring"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir kener && cd kener
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      kener:
        image: rajnandan1/kener:latest
        container_name: kener
        environment:
          TZ: Asia/Seoul
          KENER_SECRET_KEY: qwer##213e2323423rewrerrwer

          SMTP_HOST: mailhog
          SMTP_PORT: 1025
          SMTP_USER: admin
          SMTP_PASS: password
          SMTP_SECURE: 0
          SMTP_FROM_EMAIL: Admin <admin@kener.com>

          PORT: 3000
          ORIGIN: http://localhost:3000
        ports:
          - '3000:3000/tcp'
        volumes:
          - data:/app/database
          - uploads:/app/uploads
        restart: unless-stopped

      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - 8025:8025

    volumes:
      uploads:
      data:
        name: kener_db
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:3000](http://localhost:3000) to access the Kener.