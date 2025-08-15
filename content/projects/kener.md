---
name: Kener
description: Stunning docker ready open source status pages
logo: '/assets/images/logos/kener.png'
homepage: 'https://kener.ing/'
docker: 'https://github.com/rajnandan1/kener/blob/main/docker-compose.yml'
github: 'https://github.com/rajnandan1/kener'
tags: ["healthcheck", "monitoring"]
published: true
createdAt: "2025-02-21T05:12:45.000Z"
updatedAt: "2025-08-15T07:58:48Z"
screenshots: [
  '/assets/images/screenshots/kener/kener_01.png',
  '/assets/images/screenshots/kener/kener_02.png',
  '/assets/images/screenshots/kener/kener_03.png',
  '/assets/images/screenshots/kener/kener_04.png',
  '/assets/images/screenshots/kener/kener_05.png',
  '/assets/images/screenshots/kener/kener_06.png',
  '/assets/images/screenshots/kener/kener_07.png',
  '/assets/images/screenshots/kener/kener_08.png',
  '/assets/images/screenshots/kener/kener_09.png',
  '/assets/images/screenshots/kener/kener_10.png',
  '/assets/images/screenshots/kener/kener_11.png',
  '/assets/images/screenshots/kener/kener_12.png',
  '/assets/images/screenshots/kener/kener_13.png',
  '/assets/images/screenshots/kener/kener_14.png',
]
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