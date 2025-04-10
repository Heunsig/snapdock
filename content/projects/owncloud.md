---
name: ownCloud
description: open-source file sync, share and content collaboration software.
logo: '/assets/images/logos/owncloud.svg'
homepage: 'https://owncloud.com/'
docker: 'https://doc.owncloud.com/server/next/admin_manual/installation/docker/'
tags: ["file manager", "storage", "file sharing"]
screenshots: [
  '/assets/images/screenshots/owncloud/owncloud_01.png',
  '/assets/images/screenshots/owncloud/owncloud_02.png',
  '/assets/images/screenshots/owncloud/owncloud_03.png',
  '/assets/images/screenshots/owncloud/owncloud_04.png',
  '/assets/images/screenshots/owncloud/owncloud_05.png',
  '/assets/images/screenshots/owncloud/owncloud_06.png',
]
published: true
createdAt: "2025-04-06T01:35:10.000Z"
updatedAt: "2025-04-06T01:35:10.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir owncloud && cd owncloud
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    volumes:
      files:
        driver: local
      mysql:
        driver: local
      redis:
        driver: local

    services:
      owncloud:
        image: owncloud/server:${OWNCLOUD_VERSION}
        container_name: owncloud_server
        restart: always
        ports:
          - ${HTTP_PORT}:8080
        depends_on:
          - mariadb
          - redis
        environment:
          - OWNCLOUD_DOMAIN=${OWNCLOUD_DOMAIN}
          - OWNCLOUD_TRUSTED_DOMAINS=${OWNCLOUD_TRUSTED_DOMAINS}
          - OWNCLOUD_DB_TYPE=mysql
          - OWNCLOUD_DB_NAME=owncloud
          - OWNCLOUD_DB_USERNAME=owncloud
          - OWNCLOUD_DB_PASSWORD=owncloud
          - OWNCLOUD_DB_HOST=mariadb
          - OWNCLOUD_ADMIN_USERNAME=${ADMIN_USERNAME}
          - OWNCLOUD_ADMIN_PASSWORD=${ADMIN_PASSWORD}
          - OWNCLOUD_MYSQL_UTF8MB4=true
          - OWNCLOUD_REDIS_ENABLED=true
          - OWNCLOUD_REDIS_HOST=redis
        healthcheck:
          test: ["CMD", "/usr/bin/healthcheck"]
          interval: 30s
          timeout: 10s
          retries: 5
        volumes:
          - files:/mnt/data

      mariadb:
        image: mariadb:10.11 # minimum required ownCloud version is 10.9
        container_name: owncloud_mariadb
        restart: always
        environment:
          - MYSQL_ROOT_PASSWORD=owncloud
          - MYSQL_USER=owncloud
          - MYSQL_PASSWORD=owncloud
          - MYSQL_DATABASE=owncloud
          - MARIADB_AUTO_UPGRADE=1
        command: ["--max-allowed-packet=128M", "--innodb-log-file-size=64M"]
        healthcheck:
          test: ["CMD", "mysqladmin", "ping", "-u", "root", "--password=owncloud"]
          interval: 10s
          timeout: 5s
          retries: 5
        volumes:
          - mysql:/var/lib/mysql

      redis:
        image: redis:6
        container_name: owncloud_redis
        restart: always
        command: ["--databases", "1"]
        healthcheck:
          test: ["CMD", "redis-cli", "ping"]
          interval: 10s
          timeout: 5s
          retries: 5
        volumes:
          - redis:/data
    ```
3. Create a `.env` file and add the following content:
    ```bash
    OWNCLOUD_VERSION=10.15
    OWNCLOUD_DOMAIN=localhost:8080
    OWNCLOUD_TRUSTED_DOMAINS=localhost
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=admin
    HTTP_PORT=8080
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the ownCloud.
    ```
    Username: admin
    Password: admin
    ```
