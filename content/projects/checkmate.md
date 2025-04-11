---
name: Checkmate
description: An open source uptime and infrastructure monitoring application
logo: '/assets/images/logos/checkmate.svg'
homepage: 'https://checkmate.so/'
docker: 'https://docs.checkmate.so/users-guide/quickstart'
github: 'https://github.com/bluewave-labs/Checkmate'
demo: 'https://checkmate-demo.bluewavelabs.ca/'
tags: ['monitoring', 'status', 'uptime', 'healthcheck']
createdAt: "2025-02-22T15:22:26.000Z"
updatedAt: "2025-04-11T14:40:31.000Z"
published: true
screenshots: [
  '/assets/images/screenshots/checkmate/checkmate_01.png',
  '/assets/images/screenshots/checkmate/checkmate_02.png',
  '/assets/images/screenshots/checkmate/checkmate_03.png',
  '/assets/images/screenshots/checkmate/checkmate_04.png',
  '/assets/images/screenshots/checkmate/checkmate_05.png',
  '/assets/images/screenshots/checkmate/checkmate_06.png',
  '/assets/images/screenshots/checkmate/checkmate_07.png',
  '/assets/images/screenshots/checkmate/checkmate_08.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir checkmate && cd checkmate
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    name: checkmate
    services:
      client:
        image: bluewaveuptime/uptime_client:latest
        restart: always
        environment:
          UPTIME_APP_API_BASE_URL: "http://localhost:5000/api/v1"
        ports:
          - "9025:80"
        depends_on:
          - server
      server:
        image: bluewaveuptime/uptime_server:latest
        restart: always
        ports:
          - "5000:5000"
        depends_on:
          - redis
          - mongodb
        environment:
          - DB_CONNECTION_STRING=mongodb://mongodb:27017/uptime_db
          - REDIS_HOST=redis
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock:ro
      redis:
        image: bluewaveuptime/uptime_redis:latest
        restart: always
        ports:
          - "6379:6379"
        volumes:
          - redis_data:/data
        healthcheck:
          test: ["CMD", "redis-cli", "ping"]
          interval: 30s
          timeout: 10s
          retries: 5
          start_period: 5s
      mongodb:
        image: bluewaveuptime/uptime_database_mongo:latest
        restart: always
        volumes:
          - mongo_data:/data/db
        command: ["mongod", "--quiet"]
        ports:
          - "27017:27017"
    volumes:
      redis_data:
      mongo_data:

    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9025](http://localhost:9025) to access the Checkmate.
