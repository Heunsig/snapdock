---
name: memos
description: Privacy-first, lightweight note-taking solution that allows you to effortlessly capture and share your ideas.
logo: '/assets/images/logos/memos.png'
homepage: 'https://www.usememos.com/'
docker: 'https://www.usememos.com/docs/install/container-install'
github: 'https://github.com/usememos/memos'
demo: 'https://demo.usememos.com/'
tags: []
published: true
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
