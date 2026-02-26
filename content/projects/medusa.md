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

1. Clone the Medusa starter:
    ```bash
    git clone https://github.com/medusajs/medusa-starter-default.git --depth=1 my-medusa-store
    cd my-medusa-store
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
          DATABASE_URL: postgres://postgres:demo@postgres:5432/medusa-store?sslmode=disable
          REDIS_URL: redis://redis:6379
          NODE_ENV: development
        command: sh -c "npx medusa db:migrate && npm run seed && npm run dev"
        depends_on:
          - postgres
          - redis

    volumes:
      postgres_data:
    ```
3. Create a `Dockerfile` and add the following content:
    ```dockerfile [Dockerfile]
    FROM node:20-alpine
    WORKDIR /server
    COPY package*.json ./
    RUN npm install --legacy-peer-deps
    COPY . .
    EXPOSE 9000
    ```
4. Start the containers:
    ```bash
    docker compose up --build -d
    ```
5. Wait for initialization (2-3 minutes on first run):
    ```bash
    docker compose logs -f medusa
    ```
    Look for `Medusa is ready` in the logs, then press Ctrl+C
6. Create an admin user:
    ```bash
    docker compose exec medusa npx medusa user -e admin@example.com -p demo1234
    ```
7. Open the browser and go to [http://localhost:7001/app](http://localhost:7001/app) to access the Medusa Admin.
    - Email: `admin@example.com`
    - Password: `demo1234`
