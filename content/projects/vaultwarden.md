---
name: Vaultwarden
description: The recipe manager that allows you to manage your ever growing collection of digital recipes.
logo: '/assets/images/logos/vaultwarden.svg'
homepage: 'https://github.com/dani-garcia/vaultwarden'
docker: 'https://github.com/dani-garcia/vaultwarden?tab=readme-ov-file#docker-compose'
github: 'https://github.com/dani-garcia/vaultwarden'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir vaultwarden && cd vaultwarden
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      vaultwarden:
        image: vaultwarden/server:latest
        container_name: vaultwarden
        restart: unless-stopped
        environment:
          DOMAIN: "http://localhost:9020"
        volumes:
          - vw-data:/data/
        ports:
          - 9020:80
    volumes:
      vw-data:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Go to [http://localhost:9020](http://localhost:9020) to access Vaultwarden.
