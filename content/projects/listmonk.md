---
name: listmonk
description: listmonk is a standalone, self-hosted, newsletter and mailing list manager.
logo: '/assets/images/logos/listmonk.svg'
homepage: 'https://listmonk.app/'
docker: 'https://listmonk.app/docs/installation/#docker'
github: 'https://github.com/knadh/listmonk'
tags: ['Newsletter', 'Mailing List']
published: true
createdAt: "2025-02-11T13:43:11.000Z"
updatedAt: "2025-08-10T02:29:52Z"
screenshots: [
  '/assets/images/screenshots/listmonk/listmonk_01.png',
  '/assets/images/screenshots/listmonk/listmonk_02.png',
  '/assets/images/screenshots/listmonk/listmonk_03.png',
  '/assets/images/screenshots/listmonk/listmonk_04.png',
  '/assets/images/screenshots/listmonk/listmonk_05.png',
  '/assets/images/screenshots/listmonk/listmonk_06.png',
  '/assets/images/screenshots/listmonk/listmonk_07.png',
  '/assets/images/screenshots/listmonk/listmonk_08.png',
  '/assets/images/screenshots/listmonk/listmonk_09.png',
  '/assets/images/screenshots/listmonk/listmonk_10.png',
  '/assets/images/screenshots/listmonk/listmonk_11.png',
  '/assets/images/screenshots/listmonk/listmonk_12.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir listmonk && cd listmonk
    ```
2. Run the following command to download the docker-compose.yml file
    ```bash
    curl -LO https://github.com/knadh/listmonk/raw/master/docker-compose.yml
    ```
3. Run the following command to start the container
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9000](http://localhost:9000) to access the Listmonk.
