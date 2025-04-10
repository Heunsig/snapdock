---
name: GoMFT
description: web-based managed file transfer application built with Go, leveraging rclone for robust file transfer capabilities.
logo: '/assets/images/logos/gomft.svg'
homepage: 'https://github.com/starfleetcptn/gomft'
docker: 'https://github.com/starfleetcptn/gomft?tab=readme-ov-file#docker-compose-example'
github: 'https://github.com/starfleetcptn/gomft'
tags: ["file transfer"]
screenshots: [
  '/assets/images/screenshots/gomft/gomft_01.png',
  '/assets/images/screenshots/gomft/gomft_02.png',
  '/assets/images/screenshots/gomft/gomft_03.png',
  '/assets/images/screenshots/gomft/gomft_04.png',
  '/assets/images/screenshots/gomft/gomft_05.png',
  '/assets/images/screenshots/gomft/gomft_06.png',
  '/assets/images/screenshots/gomft/gomft_07.png',
  '/assets/images/screenshots/gomft/gomft_08.png',
  '/assets/images/screenshots/gomft/gomft_09.png',
  '/assets/images/screenshots/gomft/gomft_10.png',
  '/assets/images/screenshots/gomft/gomft_11.png',
  '/assets/images/screenshots/gomft/gomft_12.png',
  '/assets/images/screenshots/gomft/gomft_13.png',
  '/assets/images/screenshots/gomft/gomft_14.png',
]
published: true
createdAt: "2025-04-09T13:48:03.000Z"
updatedAt: "2025-04-09T13:48:03.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir gomft && cd gomft
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      gomft:
        image: starfleetcptn/gomft:latest
        container_name: gomft
        restart: unless-stopped
        ports:
          - "8080:8080"
        volumes:
          - data:/app/data
          - backups:/app/backups
        environment:
          - TZ=UTC
          - SERVER_ADDRESS=:8080
          - DATA_DIR=/app/data
          - BACKUP_DIR=/app/backups
          - JWT_SECRET=change_this_to_a_secure_random_string
          - BASE_URL=http://localhost:8080
    volumes:
      data:
      backups:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Visit [http://localhost:8080](http://localhost:8080) to access GoMFT and login with the following credentials:
    ```
    Email: admin@example.com
    Password: admin
    ```

