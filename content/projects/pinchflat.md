---
name: Pinchflat
description: Pinchflat is a self-hosted app for downloading YouTube content.
logo: '/assets/images/logos/pinchflat.png'
homepage: 'https://github.com/kieraneglin/pinchflat'
docker: 'https://github.com/kieraneglin/pinchflat?tab=readme-ov-file#docker'
github: 'https://github.com/kieraneglin/pinchflat'
published: true
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
          # Set the timezone to your local timezone
          - TZ=America/New_York
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
