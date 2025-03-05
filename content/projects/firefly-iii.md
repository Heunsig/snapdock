---
name: Firefly III
description: A free and open source personal finance manager
logo: '/assets/images/logos/firefly-iii.png'
homepage: 'https://firefly-iii.org/'
docker: 'https://docs.firefly-iii.org/how-to/firefly-iii/installation/docker/'
github: 'https://github.com/firefly-iii/firefly-iii/'
demo: 'https://demo.firefly-iii.org/'
tags: ["finance"]
published: true
---

## Getting Started

1. Create and enter a new directory for Firefly III
    ```bash
    mkdir firefly-iii && cd firefly-iii
    ```
2. Download the `docker-compose.yml` file
    ```bash
    curl -LO https://raw.githubusercontent.com/firefly-iii/docker/main/docker-compose.yml
    ```
3. Download the environment configuration files(`.env` and `.db.env`)
    ```bash
    curl -o .env -L https://raw.githubusercontent.com/firefly-iii/firefly-iii/main/.env.example
    curl -o .db.env -L https://raw.githubusercontent.com/firefly-iii/docker/main/database.env
    ```
4. Start the container
    ```bash
    docker compose up -d
    ```
5. Give the containers a minute to fully start up, then visit [http://localhost](http://localhost) in your browser to access Firefly III.
