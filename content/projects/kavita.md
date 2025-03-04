---
name: Kavita
description: Rocket-fueled self-hosted digital library which supports a vast array of file formats
logo: '/assets/images/logos/kavita.png'
homepage: 'https://wiki.kavitareader.com/'
docker: 'https://wiki.kavitareader.com/installation/docker/dockerhub/'
github: 'https://github.com/Kareadita/Kavita'
demo: 'https://demo.kavitareader.com/login?apiKey=9003cf99-9213-4206-a787-af2fe4cc5f1f'
tags: ["book", "LIVE DEMO"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir kavita && cd kavita
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      kavita:
        image: jvmilazz0/kavita:latest
        container_name: kavita
        volumes:
          - kavita_data:/kavita_data
          - kavita_config:/kavita/config
        environment:
          - TZ=Asia/Seoul
          - DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true
        ports:
          - "5000:5000"
        restart: unless-stopped
      filebrowser:
        image: filebrowser/filebrowser
        ports:
          - "9999:80"
        environment:
          - FB_NOAUTH=true
        volumes:
          - kavita_data:/srv
          - filebrowser_database:/database
        restart: always
    volumes:
      kavita_data:
      kavita_config:
      filebrowser_database:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Go to [http://localhost:5000](http://localhost:5000) to access the Kavita.

NOTE: To upload files, go to [http://localhost:9999](http://localhost:9999). The data will be stored in the `kavita_data` directory.