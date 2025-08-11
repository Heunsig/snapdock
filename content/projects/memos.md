---
name: memos
description: Privacy-first, lightweight note-taking solution that allows you to effortlessly capture and share your ideas.
logo: '/assets/images/logos/memos.png'
homepage: 'https://www.usememos.com/'
docker: 'https://www.usememos.com/docs/install/container-install'
github: 'https://github.com/usememos/memos'
demo: 'https://demo.usememos.com/'
tags: ["note"]
published: true
createdAt: "2025-02-17T21:34:24.000Z"
updatedAt: "2025-08-11T12:44:51Z"
screenshots: [
  '/assets/images/screenshots/memos/memos_01.png',
  '/assets/images/screenshots/memos/memos_02.png',
  '/assets/images/screenshots/memos/memos_03.png',
  '/assets/images/screenshots/memos/memos_04.png',
  '/assets/images/screenshots/memos/memos_05.png',
  '/assets/images/screenshots/memos/memos_06.png',
]
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir memos && cd memos
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      memos:
        image: neosmemo/memos:stable
        container_name: memos
        volumes:
          - memos:/var/opt/memos
        ports:
          - 5230:5230
    volumes:
      memos:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Wait a minute for the containers to start up, then visit [http://localhost:5230](http://localhost:5230) to access the Memos.
