---
name: Organizr
description: A sleek, modern dashboard that puts all of your apps and services at your fingertips.
logo: '/assets/images/logos/organizr.png'
homepage: 'https://github.com/causefx/Organizr'
docker: 'https://github.com/causefx/Organizr?tab=readme-ov-file#usage'
github: 'https://github.com/causefx/Organizr'
tags: ["dashboard"]
screenshots: [
  '/assets/images/screenshots/organizr/organizr_01.png',
  '/assets/images/screenshots/organizr/organizr_02.png',
  '/assets/images/screenshots/organizr/organizr_03.png',
  '/assets/images/screenshots/organizr/organizr_04.png',
  '/assets/images/screenshots/organizr/organizr_05.png',
]
published: true
createdAt: "2025-02-25T13:32:03.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir organizr && cd organizr
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      organizr:
        container_name: organizr
        image: organizr/organizr
        restart: unless-stopped
        ports:
          - "9005:80"
        environment:
          - PGID=1000
          - PUID=1000
          - fpm=false
          - branch=v2-master
        volumes:
          - config:/config
    volumes:
      config:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9005](http://localhost:9005) to access the Organizr.
