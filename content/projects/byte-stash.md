---
name: ByteStash
description: Self-hosted web application designed to store, organise, and manage your code snippets efficiently.
logo: '/assets/images/logos/byte-stash.png'
homepage: 'https://github.com/jordan-dalby/ByteStash'
docker: 'https://github.com/jordan-dalby/ByteStash?tab=readme-ov-file#docker'
github: 'https://github.com/jordan-dalby/ByteStash'
tags: []
published: true
---

## Getting Started

1. Create and enter a new directory for ByteStash
    ```bash
    mkdir byte-stash && cd byte-stash
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      bytestash:
        image: "ghcr.io/jordan-dalby/bytestash:latest"
        restart: always
        volumes:
          - /your/snippet/path:/data/snippets
        ports:
          - "5000:5000"
        environment:
          # See https://github.com/jordan-dalby/ByteStash/wiki/FAQ#environment-variables
          BASE_PATH: ""
          JWT_SECRET: your-secret
          TOKEN_EXPIRY: 24h
          ALLOW_NEW_ACCOUNTS: "true"
          DEBUG: "true"
          DISABLE_ACCOUNTS: "false"
          DISABLE_INTERNAL_ACCOUNTS: "false"

          # See https://github.com/jordan-dalby/ByteStash/wiki/Single-Sign%E2%80%90on-Setup for more info
          OIDC_ENABLED: "false"
          OIDC_DISPLAY_NAME: ""
          OIDC_ISSUER_URL: ""
          OIDC_CLIENT_ID: ""
          OIDC_CLIENT_SECRET: ""
          OIDC_SCOPES: ""
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:5000](http://localhost:5000) to access the ByteStash.
