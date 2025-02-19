---
name: Rundeck
description: Automate IT operations & workflows with self-service job scheduling & execution.
logo: '/assets/images/logos/rundeck.svg'
homepage: 'https://www.rundeck.com/'
docker: 'https://docs.rundeck.com/docs/administration/install/docker.html'
github: 'https://github.com/rundeck/rundeck'
tags: ["automation"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir rundeck && cd rundeck
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      rundeck:
        image: rundeck/rundeck:5.9.0
        container_name: rundeck
        restart: unless-stopped
        ports:
          - "4440:4440"
        environment:
          RUNDECK_GRAILS_URL: "http://localhost:4440"
          RUNDECK_DATABASE_DRIVER: org.postgresql.Driver
          RUNDECK_DATABASE_USERNAME: rundeck
          RUNDECK_DATABASE_PASSWORD: rundeck
          RUNDECK_DATABASE_URL: "jdbc:postgresql://db:5432/rundeck"
        volumes:
          - rundeck_data:/home/rundeck/server/data
        depends_on:
          - db

      db:
        image: postgres:15
        container_name: rundeck_db
        restart: unless-stopped
        environment:
          POSTGRES_USER: rundeck
          POSTGRES_PASSWORD: rundeck
          POSTGRES_DB: rundeck
        volumes:
          - postgres_data:/var/lib/postgresql/data

    volumes:
      rundeck_data:
      postgres_data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Wait a minute for the containers to start up, then go to [http://localhost:4440](http://localhost:4440) to access the Rundeck.
    ```
    Username: admin
    Password: admin
    ```


NOTE: If you encounter a `Request Header Fields Too Large` error, try clearing your browser cookies and try again. 