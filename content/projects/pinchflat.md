---
name: Pinchflat
description: Pinchflat is a self-hosted app for downloading YouTube content.
logo: '/assets/images/logos/pinchflat.png'
homepage: 'https://github.com/kieraneglin/pinchflat'
docker: 'https://github.com/kieraneglin/pinchflat?tab=readme-ov-file#docker'
github: 'https://github.com/kieraneglin/pinchflat'
tags: ["youtube", "downloader"]
screenshots: [
  '/assets/images/screenshots/pinchflat/pinchflat_01.png',
  '/assets/images/screenshots/pinchflat/pinchflat_02.png',
  '/assets/images/screenshots/pinchflat/pinchflat_03.png',
  '/assets/images/screenshots/pinchflat/pinchflat_04.png',
  '/assets/images/screenshots/pinchflat/pinchflat_05.png',
]
published: true
createdAt: "2025-02-11T13:26:08.000Z"
updatedAt: "2025-03-14T13:00:31.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir pinchflat
    cd pinchflat
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      pinchflat:
        image: ghcr.io/kieraneglin/pinchflat:latest
        environment:
          - TZ=Asia/Seoul
        ports:
          - '8945:8945'
        volumes:
          - ./config:/config
          - ./downloads:/downloads
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8945](http://localhost:8945) to access the Pinchflat.
