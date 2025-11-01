---
name: Termix
description: Open-source, self-hosted platform for unified server management with SSH access and remote file tools
logo: '/assets/images/logos/termix.svg'
homepage: 'https://docs.termix.site'
docker: 'https://github.com/Termix-SSH/Termix?tab=readme-ov-file#installation'
github: 'https://github.com/Termix-SSH/Termix'
tags: ["ssh", "server", "host management"]
createdAt: "2025-11-01T08:27:29Z"
updatedAt: "2025-11-01T08:27:29Z"
published: true
screenshots: [
  '/assets/images/screenshots/termix/termix_01.png',
  '/assets/images/screenshots/termix/termix_02.png',
  '/assets/images/screenshots/termix/termix_03.png',
  '/assets/images/screenshots/termix/termix_04.png',
  '/assets/images/screenshots/termix/termix_05.png',
  '/assets/images/screenshots/termix/termix_06.png',
  '/assets/images/screenshots/termix/termix_07.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir termix && cd termix
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      termix:
        image: ghcr.io/lukegus/termix:latest
        container_name: termix
        restart: unless-stopped
        ports:
          - "8080:8080"
        volumes:
          - termix-data:/app/data
        environment:
          PORT: "8080"

    volumes:
      termix-data:
        driver: local
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the Termix.