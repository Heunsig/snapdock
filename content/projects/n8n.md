---
name: n8n
description: Fair-code workflow automation platform with native AI capabilities.
logo: '/assets/images/logos/n8n.svg'
homepage: 'https://n8n.io/'
docker: 'https://docs.n8n.io/hosting/installation/docker/'
github: 'https://github.com/n8n-io/n8n'
tags: ["automation", "workflow", "ai", "zapier"]
published: true
createdAt: "2025-11-10T14:05:07Z"
updatedAt: "2025-11-10T14:05:07Z"
screenshots: [
  '/assets/images/screenshots/n8n/n8n_01.png',
  '/assets/images/screenshots/n8n/n8n_02.png',
  '/assets/images/screenshots/n8n/n8n_03.png',
  '/assets/images/screenshots/n8n/n8n_04.png',
  '/assets/images/screenshots/n8n/n8n_05.png',
  '/assets/images/screenshots/n8n/n8n_06.png',
  '/assets/images/screenshots/n8n/n8n_07.png',
  '/assets/images/screenshots/n8n/n8n_08.png',
  '/assets/images/screenshots/n8n/n8n_09.png',
  '/assets/images/screenshots/n8n/n8n_10.png',
  '/assets/images/screenshots/n8n/n8n_11.png',
  '/assets/images/screenshots/n8n/n8n_12.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir n8n && cd n8n
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    version: '3.8'

    volumes:
      db_storage:
      n8n_storage:

    services:
      postgres:
        image: postgres:16
        restart: always
        environment:
          - POSTGRES_USER
          - POSTGRES_PASSWORD
          - POSTGRES_DB
          - POSTGRES_NON_ROOT_USER
          - POSTGRES_NON_ROOT_PASSWORD
        volumes:
          - db_storage:/var/lib/postgresql/data
          - ./init-data.sh:/docker-entrypoint-initdb.d/init-data.sh
        healthcheck:
          test: ['CMD-SHELL', 'pg_isready -h localhost -U ${POSTGRES_USER} -d ${POSTGRES_DB}']
          interval: 5s
          timeout: 5s
          retries: 10

      n8n:
        image: docker.n8n.io/n8nio/n8n
        restart: always
        environment:
          - DB_TYPE=postgresdb
          - DB_POSTGRESDB_HOST=postgres
          - DB_POSTGRESDB_PORT=5432
          - DB_POSTGRESDB_DATABASE=${POSTGRES_DB}
          - DB_POSTGRESDB_USER=${POSTGRES_NON_ROOT_USER}
          - DB_POSTGRESDB_PASSWORD=${POSTGRES_NON_ROOT_PASSWORD}
        ports:
          - 5678:5678
        links:
          - postgres
        volumes:
          - n8n_storage:/home/node/.n8n
        depends_on:
          postgres:
            condition: service_healthy
    ```
3. Create a `init-data.sh` file and add the following content:
    ```bash [init-data.sh]
    #!/bin/bash
    set -e;


    if [ -n "${POSTGRES_NON_ROOT_USER:-}" ] && [ -n "${POSTGRES_NON_ROOT_PASSWORD:-}" ]; then
      psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE USER ${POSTGRES_NON_ROOT_USER} WITH PASSWORD '${POSTGRES_NON_ROOT_PASSWORD}';
        GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_NON_ROOT_USER};
        GRANT CREATE ON SCHEMA public TO ${POSTGRES_NON_ROOT_USER};
      EOSQL
    else
      echo "SETUP INFO: No Environment variables given!"
    fi
    ```
3. Create a `.env` file and add the following content:
    ```bash [.env]
    POSTGRES_USER=changeUser
    POSTGRES_PASSWORD=changePassword
    POSTGRES_DB=n8n

    POSTGRES_NON_ROOT_USER=changeUser
    POSTGRES_NON_ROOT_PASSWORD=changePassword
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Open the browser and go to [http://localhost:5678](http://localhost:5678) to access the n8n.
