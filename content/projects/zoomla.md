---
name: Zoomla
description: Award-winning content management system (CMS), which enables you to build web sites and powerful online applications.
logo: '/assets/images/logos/zoomla.svg'
homepage: 'https://www.joomla.org/'
docker: 'https://www.avonture.be/blog/docker-joomla/'
github: 'https://github.com/joomla/joomla-cms'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir zoomla && cd zoomla
    ```
2. Create required folders
    ```bash
    mkdir -p db site_joomla
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      joomla:
        image: joomla:5.1-php8.2-apache
        restart: always
        ports:
          - 8080:80
        environment:
          - JOOMLA_DB_HOST=joomladb
          - JOOMLA_DB_PASSWORD=password
        depends_on:
          joomladb:
            condition: service_healthy
        user: 1000:1000
        volumes:
          - ./site_joomla:/var/www/html

      joomladb:
        image: mysql:8.0.13
        restart: always
        environment:
          - MYSQL_ROOT_PASSWORD=password
        healthcheck:
          test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
          timeout: 20s
          retries: 10
        user: 1000:1000
        volumes:
          - ./db:/var/lib/mysql
    ```
4. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
5. Go to [http://localhost:8080](http://localhost:8080) to access Joomla.

## Installation
1. Choose your site name

    ![image](/assets/images/guides/zoomla/joomla_guide_01.png)
    - Enter the name of you Joomla site: `My Site` (or any other value)
2. Set up administrator account

    ![image](/assets/images/guides/zoomla/joomla_guide_02.png)
    - Enter the real name of your Super User: `admin`  (or any other value)
    - Set the username for your Super User account: `admin` (or any other value)
    - Set the password for your Super User account: `inputpassword` (or any other value)
    - Enter the email address of the website Super User: `admin@example.com` (or any other value)
3. Configure database connection

    ![image](/assets/images/guides/zoomla/joomla_guide_03.png)
    - Select the database type: `MySQLi` **(must be this value)**
    - Enter the host name, usually "localhost" or a name provided by your host: `joomladb` **(must be this value)**
    - Enter the database username you created or a username provided by your host: `root` **(must be this value)**
    - Enter the database password you created or a password provided by your host: `password` **(must be this value)**
    - Enter the database name: `joomla_db` **(must be this value)**
    - Enter a table prefix or use the randomly generated one: (automatically generated)
    - Connection Encryption: `Default (server controlled)`
4. Complete the installation

    ![image](/assets/images/guides/zoomla/joomla_guide_04.png)
5. Access your Joomla site
    - Your site: [http://localhost:8080](http://localhost:8080)
    - Joomla Admin: [http://localhost:8080/administrator](http://localhost:8080/administrator)
