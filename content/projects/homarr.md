---
name: Homarr
description: A sleek, modern dashboard that puts all of your apps and services at your fingertips.
logo: '/assets/images/logos/homarr.png'
homepage: 'https://homarr.dev/'
docker: 'https://homarr.dev/docs/getting-started/installation/docker'
github: 'https://github.com/homarr-labs/homarr'
tags: ["dashboard"]
screenshots: [
  '/assets/images/screenshots/homarr/homarr_01.png',
  '/assets/images/screenshots/homarr/homarr_02.png',
  '/assets/images/screenshots/homarr/homarr_03.png',
  '/assets/images/screenshots/homarr/homarr_04.png',
]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir homarr && cd homarr
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      homarr:
        container_name: homarr
        image: ghcr.io/homarr-labs/homarr:latest
        restart: unless-stopped
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock # Optional, only if you want docker integration
          - appdata:/appdata
        environment:
          - SECRET_ENCRYPTION_KEY=d68c5259b2883bbe05ccceefcaa2ff39ef477d2c74d5849eb366d78a241e3fcc
        ports:
          - '7575:7575'
    volumes:
      appdata:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:7575](http://localhost:7575) to access the Homarr.
