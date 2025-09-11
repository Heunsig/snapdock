---
name: Firefly III
description: A free and open source personal finance manager
logo: '/assets/images/logos/firefly-iii.png'
homepage: 'https://firefly-iii.org/'
docker: 'https://docs.firefly-iii.org/how-to/firefly-iii/installation/docker/'
github: 'https://github.com/firefly-iii/firefly-iii/'
demo: 'https://demo.firefly-iii.org/'
tags: ["finance"]
screenshots: [
  '/assets/images/screenshots/firefly-iii/firefly-iii_01.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_02.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_03.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_04.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_05.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_06.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_07.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_08.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_09.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_10.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_11.png',
  '/assets/images/screenshots/firefly-iii/firefly-iii_12.png',
]
createdAt: "2025-02-11T15:15:55.000Z"
updatedAt: "2025-09-11T13:31:18Z"
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
