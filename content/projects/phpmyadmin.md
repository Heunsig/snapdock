---
name: phpMyAdmin
description: A web-based MySQL/MariaDB management tool for databases
logo: '/assets/images/logos/phpmyadmin.svg'
homepage: 'https://www.phpmyadmin.net/'
docker: 'https://hub.docker.com/_/phpmyadmin'
github: 'https://github.com/phpmyadmin/phpmyadmin'
tags: ['database']
screenshots: [
  '/assets/images/screenshots/phpmyadmin/phpmyadmin_01.png',
  '/assets/images/screenshots/phpmyadmin/phpmyadmin_02.png',
  '/assets/images/screenshots/phpmyadmin/phpmyadmin_03.png',
  '/assets/images/screenshots/phpmyadmin/phpmyadmin_04.png',
  '/assets/images/screenshots/phpmyadmin/phpmyadmin_05.png',
  
]
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir phpmyadmin && cd phpmyadmin
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      mysql:
        image: mysql:8.0
        container_name: mysql_db
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: rootpassword
          MYSQL_DATABASE: exampledb
          MYSQL_USER: admin
          MYSQL_PASSWORD: admin
        volumes:
          - mysql_data:/var/lib/mysql
        ports:
          - "3306:3306"
        healthcheck:
          test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
          interval: 10s
          retries: 5

      phpmyadmin:
        image: phpmyadmin/phpmyadmin
        container_name: phpmyadmin
        restart: always
        environment:
          PMA_HOST: mysql
        ports:
          - "8080:80"
        depends_on:
          mysql:
            condition: service_healthy
    volumes:
      mysql_data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access phpMyAdmin with the following credentials:
    ```
    Username: admin
    Password: admin
    ```
