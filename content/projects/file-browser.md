---
name: File Browser
description: Self-hosted file management with a clean web interface.
logo: '/assets/images/logos/file-browser.png'
homepage: 'https://filebrowser.org/'
docker: 'https://filebrowser.org/installation#docker'
github: 'https://github.com/filebrowser/filebrowser'
tags: ["storage", "file manager"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir file-browser && cd file-browser
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      filebrowser:
        image: filebrowser/filebrowser
        container_name: filebrowser
        ports:
          - "8080:80"
        volumes:
          - filebrowser_srv:/srv # files will be stored here
          - filebrowser_database:/database # users info/settings will be stored here
        restart: always
    volumes:
      filebrowser_srv:
      filebrowser_database:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the File Browser.
5. Use the following credentials to login:
    ```
    username: admin
    password: admin
    ```