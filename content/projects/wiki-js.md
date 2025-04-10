---
name: Wiki.js
description: The most powerful and extensible open source Wiki software.
logo: '/assets/images/logos/wikijs.svg'
homepage: 'https://js.wiki/'
docker: 'https://docs.requarks.io/install/docker'
github: 'https://github.com/Requarks/wiki'
tags: ["wiki"]
published: true
createdAt: "2025-02-15T03:37:04.000Z"
updatedAt: "2025-02-19T14:26:50.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir wikijs && cd wikijs
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      db:
        image: postgres:15-alpine
        environment:
          POSTGRES_DB: wiki
          POSTGRES_PASSWORD: wikijsrocks
          POSTGRES_USER: wikijs
        logging:
          driver: none
        restart: unless-stopped
        volumes:
          - db-data:/var/lib/postgresql/data
      wiki:
        image: ghcr.io/requarks/wiki:2
        depends_on:
          - db
        environment:
          DB_TYPE: postgres
          DB_HOST: db
          DB_PORT: 5432
          DB_USER: wikijs
          DB_PASS: wikijsrocks
          DB_NAME: wiki
        restart: unless-stopped
        ports:
          - "8085:3000"
    volumes:
      db-data:
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Go to [http://localhost:8085](http://localhost:8085) to access Wiki.js