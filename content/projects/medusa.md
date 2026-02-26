---
name: Medusa
description: Open-source headless commerce platform for building custom e-commerce experiences.
logo: '/assets/images/logos/medusa.svg'
homepage: 'https://medusajs.com/'
docker: 'https://docs.medusajs.com/learn/installation/docker'
github: 'https://github.com/medusajs/medusa'
tags: ["e-commerce", "headless", "cms"]
published: true
createdAt: "2026-02-26T13:22:20Z"
updatedAt: "2026-02-26T13:22:20Z"
---

## Getting Started

1. Clone the Medusa starter and install dependencies
    ```bash
    git clone https://github.com/medusajs/medusa-starter-default.git --depth=1 my-medusa-store
    cd my-medusa-store
    npm install --legacy-peer-deps
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      postgres:
        image: postgres:15-alpine
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: demo
          POSTGRES_DB: medusa-store
        volumes:
          - postgres_data:/var/lib/postgresql/data

      redis:
        image: redis:7-alpine

      medusa:
        build: .
        ports:
          - "7001:9000"
        environment:
          DATABASE_URL: postgres://postgres:demo@postgres:5432/medusa-store
          REDIS_URL: redis://redis:6379
          NODE_ENV: development
        depends_on:
          - postgres
          - redis

    volumes:
      postgres_data:
    ```
3. Create a `start.sh` file and add the following content:
    ```bash [start.sh]
    #!/bin/sh
    npx medusa db:migrate
    npm run seed
    npm run dev
    ```
4. Create a `Dockerfile` and add the following content:
    ```dockerfile [Dockerfile]
    FROM node:20-alpine
    WORKDIR /server
    COPY package*.json ./
    RUN npm install --legacy-peer-deps
    COPY . .
    EXPOSE 9000
    CMD ["sh", "start.sh"]
    ```
5. In `medusa-config.ts`, add `databaseDriverOptions` inside `projectConfig` to disable SSL:
    ```typescript [medusa-config.ts]
    projectConfig: {
      databaseUrl: process.env.DATABASE_URL,
      databaseDriverOptions: {
        ssl: false,
        sslmode: "disable",
      },
      // ... rest of config
    },
    ```
6. Start the containers:
    ```bash
    docker compose up --build -d
    ```
7. Wait for initialization (2-3 minutes on first run):
    ```bash
    docker compose logs -f medusa
    ```
    Look for `Medusa is ready` in the logs, then press Ctrl+C
8. Create an admin user:
    ```bash
    docker compose exec medusa npx medusa user -e admin@example.com -p demo1234
    ```
9. Open the browser and go to [http://localhost:7001/app](http://localhost:7001/app) to access the Medusa Admin.
    - Email: `admin@example.com`
    - Password: `demo1234`
