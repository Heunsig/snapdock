---
name: Teable
description: 'The database designed for every team: generating, automating, collaborating with AI'
logo: '/assets/images/logos/teable.svg'
homepage: 'https://teable.io/'
docker: 'https://help.teable.io/en/deploy/docker'
github: 'https://github.com/teableio/teable'
tags: ['database', 'ai', 'collaboration']
createdAt: "2025-04-28T12:39:43Z"
updatedAt: "2025-04-28T12:39:43Z"
published: true
screenshots: [
  '/assets/images/screenshots/teable/teable_01.png',
  '/assets/images/screenshots/teable/teable_02.png',
  '/assets/images/screenshots/teable/teable_03.png',
  '/assets/images/screenshots/teable/teable_04.png',
  '/assets/images/screenshots/teable/teable_05.png',
  '/assets/images/screenshots/teable/teable_06.png',
  '/assets/images/screenshots/teable/teable_07.png',
  '/assets/images/screenshots/teable/teable_08.png',
  '/assets/images/screenshots/teable/teable_09.png',
  '/assets/images/screenshots/teable/teable_10.png',
  '/assets/images/screenshots/teable/teable_11.png',
  '/assets/images/screenshots/teable/teable_12.png',
  '/assets/images/screenshots/teable/teable_13.png',
  '/assets/images/screenshots/teable/teable_14.png',
  '/assets/images/screenshots/teable/teable_15.png',
  '/assets/images/screenshots/teable/teable_16.png',
  '/assets/images/screenshots/teable/teable_17.png',
  '/assets/images/screenshots/teable/teable_18.png',
  '/assets/images/screenshots/teable/teable_19.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir teable && cd teable
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      teable:
        image: ghcr.io/teableio/teable:latest
        restart: always
        ports:
          - '3000:3000'
        volumes:
          - teable-data:/app/.assets:rw
        env_file:
          - .env
        environment:
          - NEXT_ENV_IMAGES_ALL_REMOTE=true
        networks:
          - teable
        depends_on:
          teable-db:
            condition: service_healthy
          teable-cache:
            condition: service_healthy
        healthcheck:
          test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
          start_period: 5s
          interval: 5s
          timeout: 3s
          retries: 3

      teable-db:
        image: postgres:15.4
        restart: always
        ports:
          - '42345:5432'
        volumes:
          - teable-db:/var/lib/postgresql/data:rw
        environment:
          - POSTGRES_DB=${POSTGRES_DB}
          - POSTGRES_USER=${POSTGRES_USER}
          - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
        networks:
          - teable
        healthcheck:
          test: ['CMD-SHELL', "sh -c 'pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}'"]
          interval: 10s
          timeout: 3s
          retries: 3

      teable-cache:
        image: redis:7.2.4
        restart: always
        expose:
          - '6379'
        volumes:
          - teable-cache:/data:rw
        networks:
          - teable
        command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
        healthcheck:
          test: ['CMD', 'redis-cli', '--raw', 'incr', 'ping']
          interval: 10s
          timeout: 3s
          retries: 3

    networks:
      teable:
        name: teable-network

    volumes:
      teable-db: {}
      teable-data: {}
      teable-cache: {}
    ```
3. Create a `.env` file and add the following content:
    ```bash [.env]
    # Replace the default password below with a strong password (ASCII) of at least 8 characters.
    POSTGRES_PASSWORD=replace_this_password
    REDIS_PASSWORD=replace_this_password
    SECRET_KEY=replace_this_secret_key

    # Replace the following with a publicly accessible address
    PUBLIC_ORIGIN=http://127.0.0.1:3000

    # ---------------------

    # Postgres
    POSTGRES_HOST=teable-db
    POSTGRES_PORT=5432
    POSTGRES_DB=teable
    POSTGRES_USER=teable

    # Redis
    REDIS_HOST=teable-cache
    REDIS_PORT=6379
    REDIS_DB=0

    # App
    PRISMA_DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
    BACKEND_CACHE_PROVIDER=redis
    BACKEND_CACHE_REDIS_URI=redis://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/${REDIS_DB}
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Open the browser and go to [http://localhost:3000](http://localhost:3000) to access the Teable.
