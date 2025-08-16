---
name: Yamtrack
description: A self hosted media tracker for movies, tv shows, anime, manga, video games and books.
logo: '/assets/images/logos/yamtrack.png'
docker: 'https://github.com/FuzzyGrim/Yamtrack?tab=readme-ov-file#-installing-with-docker'
github: 'https://github.com/FuzzyGrim/Yamtrack'
tags: ["media tracker", "movies", "tv shows", "anime", "manga", "video games", "books"]
screenshots: [
  '/assets/images/screenshots/yamtrack/yamtrack_01.png',
  '/assets/images/screenshots/yamtrack/yamtrack_02.png',
  '/assets/images/screenshots/yamtrack/yamtrack_03.png',
  '/assets/images/screenshots/yamtrack/yamtrack_04.png',
  '/assets/images/screenshots/yamtrack/yamtrack_05.png',
  '/assets/images/screenshots/yamtrack/yamtrack_06.png',
  '/assets/images/screenshots/yamtrack/yamtrack_07.png',
  '/assets/images/screenshots/yamtrack/yamtrack_08.png',
  '/assets/images/screenshots/yamtrack/yamtrack_09.png',
  '/assets/images/screenshots/yamtrack/yamtrack_10.png',
  '/assets/images/screenshots/yamtrack/yamtrack_11.png',
]
createdAt: "2025-08-14T13:26:47Z"
updatedAt: "2025-08-14T13:26:47Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir yamtrack && cd yamtrack
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      yamtrack:
        container_name: yamtrack
        image: ghcr.io/fuzzygrim/yamtrack
        restart: unless-stopped
        depends_on:
          - redis
        environment:
          - TZ=Europe/Berlin
          - SECRET=longstring
          - REDIS_URL=redis://redis:6379
        volumes:
          - ./db:/yamtrack/db
        ports:
          - "8000:8000"

      redis:
        container_name: yamtrack-redis
        image: redis:7-alpine
        restart: unless-stopped
        volumes:
          - redis_data:/data

    volumes:
      redis_data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8000](http://localhost:8000) to access the Yamtrack.