---
name: ZABBIX
description: Monitor anything - networks, cloud, websites, IoT, and more. Any time and anywhere.
logo: '/assets/images/logos/zabbix.svg'
homepage: 'https://www.zabbix.com/'
docker: 'https://www.zabbix.com/documentation/current/en/manual/installation/containers'
github: 'https://github.com/zabbix/zabbix'
tags: ["monitoring"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir zabbix && cd zabbix
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      # Zabbix database
      zabbix-db:
        container_name: zabbix-db
        image: mariadb:10.11.4
        restart: always
        volumes:
          - ${ZABBIX_DATA_PATH}/zabbix-db/mariadb:/var/lib/mysql:rw
          - ${ZABBIX_DATA_PATH}/zabbix-db/backups:/backups
        command:
          - mariadbd
          - --character-set-server=utf8mb4
          - --collation-server=utf8mb4_bin
          - --default-authentication-plugin=mysql_native_password
        environment:
          - MYSQL_USER=${MYSQL_USER}
          - MYSQL_PASSWORD=${MYSQL_PASSWORD}
          - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
        stop_grace_period: 1m

      # Zabbix server
      zabbix-server:
        container_name: zabbix-server
        image: zabbix/zabbix-server-mysql:ubuntu-6.4-latest
        restart: always
        ports:
          - 10051:10051
        volumes:
          - /etc/localtime:/etc/localtime:ro
          - ${ZABBIX_DATA_PATH}/zabbix-server/alertscripts:/usr/lib/zabbix/alertscripts:ro
          - ${ZABBIX_DATA_PATH}/zabbix-server/externalscripts:/usr/lib/zabbix/externalscripts:ro
          - ${ZABBIX_DATA_PATH}/zabbix-server/dbscripts:/var/lib/zabbix/dbscripts:ro
          - ${ZABBIX_DATA_PATH}/zabbix-server/export:/var/lib/zabbix/export:rw
          - ${ZABBIX_DATA_PATH}/zabbix-server/modules:/var/lib/zabbix/modules:ro
          - ${ZABBIX_DATA_PATH}/zabbix-server/enc:/var/lib/zabbix/enc:ro
          - ${ZABBIX_DATA_PATH}/zabbix-server/ssh_keys:/var/lib/zabbix/ssh_keys:ro
          - ${ZABBIX_DATA_PATH}/zabbix-server/mibs:/var/lib/zabbix/mibs:ro
        environment:
          - MYSQL_ROOT_USER=root
          - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
          - DB_SERVER_HOST=zabbix-db
          - ZBX_STARTPINGERS=${ZBX_STARTPINGERS}
        depends_on:
          - zabbix-db
        stop_grace_period: 30s
        sysctls:
          - net.ipv4.ip_local_port_range=1024 65000
          - net.ipv4.conf.all.accept_redirects=0
          - net.ipv4.conf.all.secure_redirects=0
          - net.ipv4.conf.all.send_redirects=0

      # Zabbix web UI
      zabbix-web:
        container_name: zabbix-web
        image: zabbix/zabbix-web-nginx-mysql:ubuntu-6.4-latest
        restart: always
        ports:
          - 8080:8080
        volumes:
          - /etc/localtime:/etc/localtime:ro
          - ${ZABBIX_DATA_PATH}/zabbix-web/nginx:/etc/ssl/nginx:ro
          - ${ZABBIX_DATA_PATH}/zabbix-web/modules/:/usr/share/zabbix/modules/:ro
        environment:
          - MYSQL_USER=${MYSQL_USER}
          - MYSQL_PASSWORD=${MYSQL_PASSWORD}
          - DB_SERVER_HOST=zabbix-db
          - ZBX_SERVER_HOST=zabbix-server
          - ZBX_SERVER_NAME=Zabbix Docker
          - PHP_TZ=Europe/London
        depends_on:
          - zabbix-db
          - zabbix-server
        stop_grace_period: 10s
    ```
3. Create `.env` file and add the following content:
    ```bash
    ZABBIX_DATA_PATH=/opt/zabbix/data
    MYSQL_USER=zabbix
    MYSQL_PASSWORD=zabbix
    MYSQL_ROOT_PASSWORD=zabbix
    ZBX_STARTPINGERS=4
    ```
5. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
6. Wait a minute for the containers to start up, then visit [http://localhost:8080](http://localhost:8080) to access the Zabbix.
7. Use the following credentials to login:
    ```
    username: Admin
    password: zabbix
    ```

## References
  - [Reddit comment in "Simplified Docker Compose?"](https://www.reddit.com/r/zabbix/comments/16jnhul/comment/k0rw7bg)
  - [USBAkimbo's Random github repo](https://github.com/USBAkimbo/Random/blob/master/Docker/zabbix-example.yml)