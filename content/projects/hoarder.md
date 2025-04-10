---
name: Hoarder
description: "open source 'Bookmark Everything' app that uses AI for automatically tagging the content you throw at it"
logo: '/assets/images/logos/hoarder.svg'
homepage: 'https://hoarder.app/'
docker: 'https://docs.hoarder.app/Installation/docker'
github: 'https://github.com/hoarder-app/hoarder'
demo: 'https://try.hoarder.app/signin'
tags: ["bookmark", "ai"]
screenshots: [
  '/assets/images/screenshots/hoarder/hoarder_01.png',
  '/assets/images/screenshots/hoarder/hoarder_02.png',
  '/assets/images/screenshots/hoarder/hoarder_03.png',
  '/assets/images/screenshots/hoarder/hoarder_04.png',
  '/assets/images/screenshots/hoarder/hoarder_05.png',
  '/assets/images/screenshots/hoarder/hoarder_06.png',
]
published: true
createdAt: "2025-02-27T12:23:23.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir hoarder && cd hoarder
    ```
2. Create a `.env` file and add the following content:
    ```
    HOARDER_VERSION=release
    NEXTAUTH_SECRET=xes4B9iLk/jWHGJtLtVR10EhKRLATEuksNJ2avaD5a+LKuoG
    MEILI_MASTER_KEY=8HfDWUlLjixb3kelG8nIXliUaEqOKroExYyLvg9Un/LlC7q
    NEXTAUTH_URL=http://localhost:9090
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      web:
        image: ghcr.io/hoarder-app/hoarder:${HOARDER_VERSION:-release}
        restart: unless-stopped
        volumes:
          - data:/data
        ports:
          - 9090:3000
        env_file:
          - .env
        environment:
          MEILI_ADDR: http://meilisearch:7700
          BROWSER_WEB_URL: http://chrome:9222
          # OPENAI_API_KEY: ...
          DATA_DIR: /data # DON'T CHANGE THIS
      chrome:
        image: gcr.io/zenika-hub/alpine-chrome:123
        restart: unless-stopped
        command:
          - --no-sandbox
          - --disable-gpu
          - --disable-dev-shm-usage
          - --remote-debugging-address=0.0.0.0
          - --remote-debugging-port=9222
          - --hide-scrollbars
      meilisearch:
        image: getmeili/meilisearch:v1.11.1
        restart: unless-stopped
        env_file:
          - .env
        environment:
          MEILI_NO_ANALYTICS: "true"
        volumes:
          - meilisearch:/meili_data

    volumes:
      meilisearch:
      data:
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Go to [http://localhost:9090](http://localhost:9090) to access the Hoarder.
