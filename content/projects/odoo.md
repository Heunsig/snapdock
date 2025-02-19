---
name: Odoo
description: All your business on one platform. Simple, efficient, yet affordable!
logo: '/assets/images/logos/odoo.png'
homepage: 'https://www.odoo.com/'
github: 'https://github.com/odoo/odoo'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir odoo && cd odoo
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      db:
        image: postgres:17
        user: root
        environment:
          - POSTGRES_USER=odoo
          - POSTGRES_PASSWORD=odoo18@2024
          - POSTGRES_DB=postgres
        restart: always
        volumes:
            - postgres_data:/var/lib/postgresql/data
      odoo18:
        image: odoo:18
        user: root
        depends_on:
          - db
        ports:
          - "10018:8069"
          - "20018:8072" # live chat
        tty: true
        command: --
        environment:
          - HOST=db
          - USER=odoo
          - PASSWORD=odoo18@2024
        volumes:
          - addons:/mnt/extra-addons
          - etc:/etc/odoo
        restart: always
    volumes:
      postgres_data:
      odoo_data:
      addons:
      etc:
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:10018](http://localhost:10018) to access Odoo.

## References
  - [odoo-18-docker-compose](https://github.com/minhng92/odoo-18-docker-compose/tree/master)