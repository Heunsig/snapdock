---
name: metadata-remote
description: Web-based audio metadata editor for headless servers.
logo: '/assets/images/logos/metadata-remote.svg'
docker: 'https://github.com/wow-signal-dev/metadata-remote?tab=readme-ov-file#docker-compose-recommended'
github: 'https://github.com/wow-signal-dev/metadata-remote'
tags: ['audio', 'metadata', 'editor']
screenshots: [
  '/assets/images/screenshots/metadata-remote/metadata-remote_01.png',
  '/assets/images/screenshots/metadata-remote/metadata-remote_02.png',
  '/assets/images/screenshots/metadata-remote/metadata-remote_03.png',
  '/assets/images/screenshots/metadata-remote/metadata-remote_04.png',
  '/assets/images/screenshots/metadata-remote/metadata-remote_05.png',
]
createdAt: "2025-11-14T13:53:49Z"
updatedAt: "2025-11-14T13:53:49Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir metadata-remote && cd metadata-remote
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      metadata-remote:
        image: ghcr.io/wow-signal-dev/metadata-remote:latest
        container_name: metadata-remote
        ports:
          - "8338:8338"
        volumes:
          - metadata-remote_data:/music
        environment:
          - PUID=1000
          - PGID=1000
        restart: unless-stopped
      filebrowser:
        image: filebrowser/filebrowser
        container_name: filebrowser
        ports:
          - "9999:80"
        environment:
          - FB_NOAUTH=true
        volumes:
          - metadata-remote_data:/srv
          - filebrowser_database:/database
    volumes:
      metadata-remote_data:
      filebrowser_database:
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8338](http://localhost:8338) to access the Metadata Remote.

NOTE: To upload files, go to [http://localhost:9999](http://localhost:9999). The data will be stored in the `/music` directory.