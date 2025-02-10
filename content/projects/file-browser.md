---
name: File Browser
description: Self-hosted file management with a clean web interface.
logo: '/assets/images/logos/file-browser.png'
homepage: 'https://filebrowser.org/'
docker: 'https://filebrowser.org/installation#docker'
github: 'https://github.com/filebrowser/filebrowser'
tags: []
published: true
---

## Getting Started

1. Create a folder
    ```bash
    mkdir file-browser
    ```
3. Move to the folder and create required folders and files
    ```bash
    mkdir srv
    touch filebrowser.db
    touch filebrowser.json
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      filebrowser:
        image: filebrowser/filebrowser
        container_name: filebrowser
        user: 1000:1000
        ports:
          - "8080:80"
        volumes:
          - ./srv:/srv # files will be stored here
          - ./filebrowser.db:/database/filebrowser.db # users info/settings will be stored here
          - ./filebrowser.json:/.filebrowser.json # config file
        restart: always
    ```

4. In the `filebrowser.json` file, add the following content:
    ```json
    {
      "port": 80,
      "baseURL": "",
      "address": "",
      "log": "stdout",
      "database": "/database/filebrowser.db",
      "root": "/srv"
    }
    ```
5. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
6. Open the browser and go to `http://localhost:8080` to access the File Browser.
7. Use the following credentials to login:
    ```
    username: admin
    password: admin
    ```