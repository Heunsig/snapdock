---
name: Maybe
description: The OS for your personal finances
logo: '/assets/images/logos/maybe.svg'
homepage: 'https://maybefinance.com/'
docker: 'https://github.com/maybe-finance/maybe/blob/main/docs/hosting/docker.md'
github: 'https://github.com/maybe-finance/maybe'
tags: ["finance"]
screenshots: [
  '/assets/images/screenshots/maybe/maybe_01.png',
  '/assets/images/screenshots/maybe/maybe_02.png',
  '/assets/images/screenshots/maybe/maybe_03.png',
  '/assets/images/screenshots/maybe/maybe_04.png',
  '/assets/images/screenshots/maybe/maybe_05.png',
  '/assets/images/screenshots/maybe/maybe_06.png',
]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir maybe && cd maybe
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      app:
        image: ghcr.io/maybe-finance/maybe:latest
        volumes:
          - app-storage:/rails/storage
        ports:
          - 3000:3000
        restart: unless-stopped
        environment:
          SELF_HOSTED: "true"
          RAILS_FORCE_SSL: "false"
          RAILS_ASSUME_SSL: "false"
          GOOD_JOB_EXECUTION_MODE: async
          SECRET_KEY_BASE: 7d47733012c0e0c1d750506c75541c44767dc78b0e3a1d81f010ad400cec4de9b5ba95e617092ef272decf2d12ee48096a8437361adba4cb8de2cbec1b94d063
          DB_HOST: postgres
          POSTGRES_DB: postgres
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        depends_on:
          postgres:
            condition: service_healthy

      postgres:
        image: postgres:16
        restart: unless-stopped
        volumes:
          - postgres-data:/var/lib/postgresql/data
        environment:
          POSTGRES_USER: postgres
          POSTGRES_DB: postgres
          POSTGRES_PASSWORD: postgres
        healthcheck:
          test: [ "CMD-SHELL", "pg_isready -U postgres -d postgres" ]
          interval: 5s
          timeout: 5s
          retries: 5

    volumes:
      app-storage:
      postgres-data:

    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:3000](http://localhost:3000) to access the Maybe.
