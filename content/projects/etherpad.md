---
name: Etherpad
description: A highly customizable open source online editor providing collaborative editing in really real-time
logo: '/assets/images/logos/etherpad.svg'
homepage: 'https://etherpad.org/'
docker: 'https://docs.etherpad.org/docker.html'
github: 'https://github.com/ether/etherpad-lite'
demo: 'https://demo.etherpad.org/'
tags: ["notes", "collaboration"]
createdAt: "2026-02-13T11:29:21Z"
updatedAt: "2026-02-13T11:29:21Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir etherpad && cd etherpad
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      app:
        image: etherpad/etherpad:latest
        container_name: etherpad
        ports:
          - '9001:9001'
        environment:
          - TITLE=Etherpad
          - DB_TYPE=postgres
          - DB_HOST=postgres
          - DB_PORT=5432
          - DB_NAME=etherpad
          - DB_USER=etherpad
          - DB_PASS=demo
          - ADMIN_PASSWORD=demo
        volumes:
          - etherpad-data:/opt/etherpad-lite/var
        depends_on:
          - postgres
        restart: unless-stopped

      postgres:
        image: postgres:15-alpine
        container_name: etherpad_postgres
        environment:
          - POSTGRES_DB=etherpad
          - POSTGRES_USER=etherpad
          - POSTGRES_PASSWORD=demo
          - PGDATA=/var/lib/postgresql/data/pgdata
        volumes:
          - postgres-data:/var/lib/postgresql/data/pgdata
        restart: unless-stopped

    volumes:
      etherpad-data:
      postgres-data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9001](http://localhost:9001) to access Etherpad.
    - Admin page: [http://localhost:9001/admin](http://localhost:9001/admin)
    - Admin username: `admin`
    - Admin password: `demo`
