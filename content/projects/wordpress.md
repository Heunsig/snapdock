---
name: Wordpress
description: The world’s most popular tool for building websites & blogs
logo: '/assets/images/logos/wordpress.svg'
homepage: 'https://wordpress.org/'
docker: 'https://github.com/nezhar/wordpress-docker-compose'
tags: ["CMS"]
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir wordpress && cd wordpress
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      wp:
        image: wordpress:latest
        ports:
          - 80:80
        volumes:
          - wp_app:/var/www/html
        environment:
          WORDPRESS_DB_HOST: db
          WORDPRESS_DB_NAME: wordpress
          WORDPRESS_DB_USER: root
          WORDPRESS_DB_PASSWORD: password
        depends_on:
          - db
        links:
          - db

      db:
        image: mysql:latest
        ports:
          - 3306:3306
        command: [
            '--character-set-server=utf8mb4',
            '--collation-server=utf8mb4_unicode_ci'
        ]
        volumes:
          - db_data:/var/lib/mysql
        environment:
          MYSQL_DATABASE: wordpress
          MYSQL_ROOT_PASSWORD: password

    volumes:
      wp_app:
      db_data:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to the following URLs to access the Wordpress
    - Web site: [http://localhost](http://localhost)
    - Wordpress Admin: [http://localhost/wp-admin](http://localhost/wp-admin)
