---
name: FileGator
description: Open-source, self-hosted web application for managing files and folders.
logo: '/assets/images/logos/file-gator.svg'
homepage: 'https://filegator.io/'
docker: 'https://docs.filegator.io/install.html'
github: 'https://github.com/filegator/filegator'
tags: ["storage", "file manager"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir file-gator && cd file-gator
    ```
2. Create `docker-compose.yml` file with the following content:
    ```yaml [docker-compose.yml]
    services:
      filegator:
        container_name: filegator
        image: filegator/filegator
        restart: always
        ports:
          - "9096:8080"
        volumes:
          - files:/var/www/filegator/repository
    volumes:
      files:
    ```
3. Run the following command to start the container
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9096](http://localhost:9096) to access the FileGator.
    ```
    Username: admin
    Password: admin123
    ```
