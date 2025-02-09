---
name: Dozzle
description: Dozzle is a free and open source audiobook manager for your Mac, Windows, and Linux.
logo: '/assets/images/logos/dozzle.svg'
homepage: 'https://dozzle.dev/'
docker: 'https://dozzle.dev/guide/getting-started'
github: 'https://github.com/amir20/dozzle'
tags: ['monitoring', 'self-hosted']
draft: false
---

# Getting Started

1. Create a folder
    ```bash
    mkdir dozzle
    ```
2. Move to the folder and create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      dozzle:
        image: amir20/dozzle:latest
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
        ports:
          - 8080:8080
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to `http://localhost:8080` to access the Dozzle.