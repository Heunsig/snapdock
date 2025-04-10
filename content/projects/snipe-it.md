---
name: Snipe-IT
description: A free open source IT asset/license management system
logo: '/assets/images/logos/snipe-it.png'
homepage: 'https://snipeitapp.com/'
github: 'https://github.com/snipe/snipe-it'
demo: 'https://demo.snipeitapp.com/'
tags: ["inventory"]
screenshots: [
  '/assets/images/screenshots/snipe-it/snipe-it_01.png',
  '/assets/images/screenshots/snipe-it/snipe-it_02.png',
  '/assets/images/screenshots/snipe-it/snipe-it_03.png',
  '/assets/images/screenshots/snipe-it/snipe-it_04.png',
]
published: true
createdAt: "2025-03-01T13:43:01.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir snipe-it && cd snipe-it
    ```
2. Create a `.env` file and add the following content:
    ```[.env]
    # --------------------------------------------
    # REQUIRED: DOCKER SPECIFIC SETTINGS
    # --------------------------------------------
    APP_VERSION=
    APP_PORT=9092

    # --------------------------------------------
    # REQUIRED: BASIC APP SETTINGS
    # --------------------------------------------
    APP_ENV=production
    APP_DEBUG=false
    # Please regenerate the APP_KEY value by calling `docker compose run --rm app php artisan key:generate --show`. Copy paste the value here
    APP_KEY=base64:3ilviXqB9u6DX1NRcyWGJ+sjySF+H18CPDGb3+IVwMQ=
    APP_URL=http://localhost:9092
    # https://en.wikipedia.org/wiki/List_of_tz_database_time_zones - TZ identifier
    APP_TIMEZONE='UTC'
    APP_LOCALE=en-US
    MAX_RESULTS=500

    # --------------------------------------------
    # REQUIRED: UPLOADED FILE STORAGE SETTINGS
    # --------------------------------------------
    PRIVATE_FILESYSTEM_DISK=local
    PUBLIC_FILESYSTEM_DISK=local_public

    # --------------------------------------------
    # REQUIRED: DATABASE SETTINGS
    # --------------------------------------------
    DB_CONNECTION=mysql
    DB_HOST=db
    DB_PORT='3306'
    DB_DATABASE=snipeit
    DB_USERNAME=snipeit
    DB_PASSWORD=changeme1234
    MYSQL_ROOT_PASSWORD=changeme1234
    DB_PREFIX=null
    DB_DUMP_PATH='/usr/bin'
    DB_CHARSET=utf8mb4
    DB_COLLATION=utf8mb4_unicode_ci


    # --------------------------------------------
    # REQUIRED: OUTGOING MAIL SERVER SETTINGS
    # --------------------------------------------
    MAIL_MAILER=smtp
    MAIL_HOST=mailhog
    MAIL_PORT=1025
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_TLS_VERIFY_PEER=true
    MAIL_FROM_ADDR=you@example.com
    MAIL_FROM_NAME='Snipe-IT'
    MAIL_REPLYTO_ADDR=you@example.com
    MAIL_REPLYTO_NAME='Snipe-IT'
    MAIL_AUTO_EMBED_METHOD='attachment'

    # --------------------------------------------
    # REQUIRED: DATA PROTECTION
    # --------------------------------------------
    ALLOW_BACKUP_DELETE=false
    ALLOW_DATA_PURGE=false

    # --------------------------------------------
    # REQUIRED: IMAGE LIBRARY
    # This should be gd or imagick
    # --------------------------------------------
    IMAGE_LIB=gd
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      app:
        image: snipe/snipe-it:${APP_VERSION:-latest}
        restart: unless-stopped
        volumes:
          - storage:/var/lib/snipeit
        ports:
          - "${APP_PORT:-8000}:80"
        depends_on:
          db:
            condition: service_healthy
            restart: true
        env_file:
          - .env
      db:
        image: mariadb:11.5.2
        restart: unless-stopped
        volumes:
          - db_data:/var/lib/mysql
        environment:
          MYSQL_DATABASE: ${DB_DATABASE}
          MYSQL_USER: ${DB_USERNAME}
          MYSQL_PASSWORD: ${DB_PASSWORD}
          MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
        healthcheck:
          # https://mariadb.com/kb/en/using-healthcheck-sh/#compose-file-example
          test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
          interval: 5s
          timeout: 1s
          retries: 5
      mailhog:
          image: mailhog/mailhog
          restart: always
          ports:
            - "8025:8025"
    volumes:
      db_data:
      storage:
    ```
4. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
5. Wait a minute for the containers to start up, then visit [http://localhost:9092](http://localhost:9092) to access the Snipe-IT.

Note: For email confirmation during signup, check MailHog at [http://localhost:8025](http://localhost:8025).
