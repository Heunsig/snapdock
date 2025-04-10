---
name: Immich
description: Self-hosted photo and video management solution
logo: '/assets/images/logos/immich.png'
homepage: 'https://immich.app/'
docker: 'https://immich.app/docs/install/docker-compose'
github: 'https://github.com/immich-app/immich'
demo: 'https://demo.immich.app/'
tags: ["photo", "video"]
published: true
createdAt: "2025-02-17T22:05:38.000Z"
updatedAt: "2025-03-05T13:21:25.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir immich && cd immich
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    name: immich
    services:
      immich-server:
        container_name: immich_server
        image: ghcr.io/immich-app/immich-server:release
        volumes:
          - upload:/usr/src/app/upload
        environment:
          DB_PASSWORD: postgres
          DB_USERNAME: postgres
          DB_DATABASE_NAME: immich
        ports:
          - '2283:2283'
        depends_on:
          - redis
          - database
        restart: always
        healthcheck:
          disable: false

      redis:
        container_name: immich_redis
        image: docker.io/redis:6.2-alpine@sha256:905c4ee67b8e0aa955331960d2aa745781e6bd89afc44a8584bfd13bc890f0ae
        healthcheck:
          test: redis-cli ping || exit 1
        restart: always

      database:
        container_name: immich_postgres
        image: docker.io/tensorchord/pgvecto-rs:pg14-v0.2.0@sha256:90724186f0a3517cf6914295b5ab410db9ce23190a2d9d0b9dd6463e3fa298f0
        environment:
          POSTGRES_PASSWORD: postgres
          POSTGRES_USER: postgres
          POSTGRES_DB: immich
          POSTGRES_INITDB_ARGS: '--data-checksums'
        volumes:
          - postgres:/var/lib/postgresql/data
        healthcheck:
          test: >-
            pg_isready --dbname="$${POSTGRES_DB}" --username="$${POSTGRES_USER}" || exit 1;
            Chksum="$$(psql --dbname="$${POSTGRES_DB}" --username="$${POSTGRES_USER}" --tuples-only --no-align
            --command='SELECT COALESCE(SUM(checksum_failures), 0) FROM pg_stat_database')";
            echo "checksum failure count is $$Chksum";
            [ "$$Chksum" = '0' ] || exit 1
          interval: 5m
          start_interval: 30s
          start_period: 5m
        command: >-
          postgres
          -c shared_preload_libraries=vectors.so
          -c 'search_path="$$user", public, vectors'
          -c logging_collector=on
          -c max_wal_size=2GB
          -c shared_buffers=512MB
          -c wal_compression=on
        restart: always

    volumes:
      upload:
      postgres:

    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:2283](http://localhost:2283) to access the Immich.
