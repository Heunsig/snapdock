---
name: Actual Budget
description: Super fast and privacy-focused app for managing your finances.
logo: '/assets/images/logos/actual-budget.png'
homepage: 'https://actualbudget.org/'
docker: 'https://actualbudget.org/docs/install/docker'
github: 'https://github.com/actualbudget/actual'
demo: 'https://demo.actualbudget.org/'
tags: ["finance"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir actual-budget && cd actual-budget
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      actual_server:
        image: docker.io/actualbudget/actual-server:latest
        ports:
          - '5006:5006'
        volumes:
          - actual_data:/data
        healthcheck:
          test: ['CMD-SHELL', 'node src/scripts/health-check.js']
          interval: 60s
          timeout: 10s
          retries: 3
          start_period: 20s
        restart: unless-stopped
    volumes:
      actual_data:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Visit [http://localhost:5006](http://localhost:5006) to access Actual Budget.


