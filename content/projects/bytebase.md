---
name: Bytebase
description: Collaborative database management tool offering schema collaboration, version control, and an embedded SQL Editor with access control. 
logo: '/assets/images/logos/bytebase.svg'
homepage: 'https://www.bytebase.com/'
docker: 'https://www.bytebase.com/docs/get-started/self-host/#docker'
github: 'https://github.com/bytebase/bytebase'
tags: []
published: true
screenshots: [
  '/assets/images/screenshots/bytebase/bytebase_01.png',
  '/assets/images/screenshots/bytebase/bytebase_02.png',
  '/assets/images/screenshots/bytebase/bytebase_03.png',
  '/assets/images/screenshots/bytebase/bytebase_04.png',
  '/assets/images/screenshots/bytebase/bytebase_05.png',
  '/assets/images/screenshots/bytebase/bytebase_06.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir bytebase && cd bytebase
    ```
2. Create `docker-compose.yml` file with the following content:
    ```yaml [docker-compose.yml]
    services:
      bytebase:
        container_name: bytebase
        image: bytebase/bytebase:3.4.0
        restart: unless-stopped
        init: true
        ports:
          - "8080:8080"
        volumes:
          - bytebase_data:/var/opt/bytebase
    volumes:
      bytebase_data:
    ```
3. Run the following command to start the container
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the Bytebase.
