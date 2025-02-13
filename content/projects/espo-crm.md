---
name: EspoCRM
description: Open-source CRM platform designed to help organizations build and maintain strong customer relationships.
logo: '/assets/images/logos/espo-crm.png'
homepage: 'https://www.espocrm.com/'
docker: 'https://docs.espocrm.com/administration/docker/installation/#install-espocrm-with-docker-compose'
github: 'https://github.com/espocrm/espocrm'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir espocrm-docker && cd espocrm-docker
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      mysql:
        image: mysql:8
        container_name: mysql
        environment:
          MYSQL_ROOT_PASSWORD: root_password
          MYSQL_DATABASE: espocrm
          MYSQL_USER: espocrm
          MYSQL_PASSWORD: database_password
        volumes:
          - mysql:/var/lib/mysql
        restart: always

      espocrm:
        image: espocrm/espocrm
        container_name: espocrm
        environment:
          ESPOCRM_DATABASE_PLATFORM: Mysql
          ESPOCRM_DATABASE_HOST: mysql
          ESPOCRM_DATABASE_USER: espocrm
          ESPOCRM_DATABASE_PASSWORD: database_password
          ESPOCRM_ADMIN_USERNAME: admin
          ESPOCRM_ADMIN_PASSWORD: password
          ESPOCRM_SITE_URL: "http://localhost:8080"
        volumes:
          - espocrm:/var/www/html
        restart: always
        ports:
          - 8080:80

      espocrm-daemon:
        image: espocrm/espocrm
        container_name: espocrm-daemon
        volumes:
          - espocrm:/var/www/html
        restart: always
        entrypoint: docker-daemon.sh

      espocrm-websocket:
        image: espocrm/espocrm
        container_name: espocrm-websocket
        environment:
          ESPOCRM_CONFIG_USE_WEB_SOCKET: "true"
          ESPOCRM_CONFIG_WEB_SOCKET_URL: "ws://localhost:8081"
          ESPOCRM_CONFIG_WEB_SOCKET_ZERO_M_Q_SUBSCRIBER_DSN: "tcp://*:7777"
          ESPOCRM_CONFIG_WEB_SOCKET_ZERO_M_Q_SUBMISSION_DSN: "tcp://espocrm-websocket:7777"
        volumes:
          - espocrm:/var/www/html
        restart: always
        entrypoint: docker-websocket.sh
        ports:
          - 8081:8080

    volumes:
      mysql:
      espocrm:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Give the containers a minute to fully start up, then visit [http://localhost:8080](http://localhost:8080) in your browser to access EspoCRM.
    ```
    Username: admin
    Password: password
    ```
