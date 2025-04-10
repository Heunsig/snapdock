---
name: Monica
description: Personal Relationship Manager
logo: '/assets/images/logos/monica.png'
homepage: 'https://monicahq.com/'
docker: 'https://github.com/monicahq/docker'
github: 'https://github.com/monicahq/monica'
tags: ["crm"]
screenshots: [
  '/assets/images/screenshots/monica/monica_01.png',
  '/assets/images/screenshots/monica/monica_02.png',
  '/assets/images/screenshots/monica/monica_03.png',
  '/assets/images/screenshots/monica/monica_04.png',
  '/assets/images/screenshots/monica/monica_05.png',
  '/assets/images/screenshots/monica/monica_06.png',
]
published: true
createdAt: "2025-03-08T15:08:09.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir monica && cd monica
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      mysql:
        image: mysql:5.7
        restart: always
        environment:
          MYSQL_RANDOM_ROOT_PASSWORD: "true"
          MYSQL_DATABASE: "monica"
          MYSQL_USER: "homestead"
          MYSQL_PASSWORD: "secret"
        ports:
          - "3306:3306"
        volumes:
          - mysql_data:/var/lib/mysql

      monica:
        image: monica
        restart: always
        depends_on:
          - mysql
        environment:
          DB_HOST: mysql
        ports:
          - "8080:80"

    volumes:
      mysql_data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Wait a minute for the containers to start up, then open the browser and go to [http://localhost:8080](http://localhost:8080) to access the Monica.

