---
name: IT-Tools
description: Useful tools for developer and people working in IT.
logo: '/assets/images/logos/it-tools.png'
homepage: 'https://it-tools.tech/'
docker: 'https://github.com/CorentinTh/it-tools?tab=readme-ov-file#self-host'
github: 'https://github.com/CorentinTh/it-tools'
demo: 'https://it-tools.tech/'
tags: ["tools", "hash text", "bcrypt", "qr code", "crontab"]
screenshots: [
  '/assets/images/screenshots/it-tools/it-tools_01.png',
  '/assets/images/screenshots/it-tools/it-tools_02.png',
  '/assets/images/screenshots/it-tools/it-tools_03.png',
  '/assets/images/screenshots/it-tools/it-tools_04.png',
  '/assets/images/screenshots/it-tools/it-tools_05.png',
]
createdAt: "2025-04-12T03:40:27Z"
updatedAt: "2025-04-12T03:40:27Z"
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir it-tools && cd it-tools
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      it-tools:
        image: corentinth/it-tools:latest
        container_name: it-tools
        restart: unless-stopped
        ports:
          - "8080:80"
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the IT-Tools.
