---
name: Wordpress
description: The world’s most popular tool for building websites & blogs
logo: '/assets/images/logos/wordpress.svg'
homepage: 'https://wordpress.org/'
docker: 'https://github.com/nezhar/wordpress-docker-compose'
tags: []
draft: false
---

# Getting Started

1. Create a folder and move to it
    ```bash
    mkdir wordpress
    cd wordpress
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      wp:
        image: wordpress:latest
        ports:
          - ${IP}:${PORT}:80
        volumes:
          - ./config/wp_php.ini:/usr/local/etc/php/conf.d/conf.ini
          - ./wp-app:/var/www/html
        environment:
          WORDPRESS_DB_HOST: db
          WORDPRESS_DB_NAME: "${DB_NAME}"
          WORDPRESS_DB_USER: root
          WORDPRESS_DB_PASSWORD: "${DB_ROOT_PASSWORD}"
        depends_on:
          - db
        links:
          - db

      pma:
        image: phpmyadmin:latest
        environment:
          PMA_HOST: db
          PMA_PORT: 3306
          MYSQL_ROOT_PASSWORD: "${DB_ROOT_PASSWORD}"
          UPLOAD_LIMIT: 50M
        ports:
          - ${IP}:8080:80
        links:
          - db:db
        volumes:
        - ./config/pma_php.ini:/usr/local/etc/php/conf.d/conf.ini
        - ./config/pma_config.php:/etc/phpmyadmin/config.user.inc.php

      db:
        image: mysql:latest
        ports:
          - ${IP}:3306:3306
        command: [
            '--character-set-server=utf8mb4',
            '--collation-server=utf8mb4_unicode_ci'
        ]
        volumes:
          - ./wp-data:/docker-entrypoint-initdb.d
          - db_data:/var/lib/mysql
        environment:
          MYSQL_DATABASE: "${DB_NAME}"
          MYSQL_ROOT_PASSWORD: "${DB_ROOT_PASSWORD}"

    volumes:
      db_data:
    ```
3. Create `.env` file and add the following content:
    ```
    IP=127.0.0.1
    PORT=80
    DB_ROOT_PASSWORD=password
    DB_NAME=wordpress
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Open the browser and go to `http://localhost` to access the Wordpress.
