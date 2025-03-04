---
name: Bookstack
description: A free, self-hosted wiki for easy information organization and storage.
logo: '/assets/images/logos/bookstack.svg'
homepage: 'https://www.bookstackapp.com/'
docker: 'https://www.bookstackapp.com/docs/admin/installation/#docker'
github: 'https://github.com/BookStackApp/BookStack'
demo: 'https://demo.bookstackapp.com/'
tags: ["wiki", "LIVE DEMO"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir bookstack && cd bookstack
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      bookstack:
        image: lscr.io/linuxserver/bookstack:24.12.1
        container_name: bookstack
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=Etc/UTC
          - APP_URL=http://localhost:6875
          - APP_KEY=base64:3qjlIoUX4Tw6fUQgZcxMbz6lb8+dAzqpvItqHvahW1c=

          - DB_HOST=mariadb
          - DB_PORT=3306
          - DB_DATABASE=bookstack
          - DB_USERNAME=bookstack
          - DB_PASSWORD=bookstack8432
        volumes:
          - bookstack_app_data:/config
        ports:
          - 6875:80
        restart: unless-stopped

      mariadb:
        image: lscr.io/linuxserver/mariadb:11.4.4
        container_name: mariadb
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=Etc/UTC

          - MYSQL_ROOT_PASSWORD=mysupersecretrootpassword
          - MYSQL_DATABASE=bookstack
          - MYSQL_USER=bookstack
          - MYSQL_PASSWORD=bookstack8432
        volumes:
          - bookstack_db_data:/config
        restart: unless-stopped
    volumes:
      bookstack_app_data:
      bookstack_db_data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:6875](http://localhost:6875) to access the Bookstack.
    ```
    Email: admin@admin.com
    Password: password
    ```
