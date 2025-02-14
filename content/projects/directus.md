---
name: Directus
description: Built for developers who need more than just a CMS. Manage complex content structures, handle digital assets, and control user permissions – all through an intuitive Studio.
logo: '/assets/images/logos/directus.png'
homepage: 'https://directus.io/'
docker: 'https://docs.directus.io/self-hosted/quickstart.html#create-a-docker-compose-file'
github: 'https://github.com/directus/directus'
demo: 'https://directus.pizza/admin/login?template=cms'
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir directus && cd directus
    ```
2. Create required directories
    ```bash
    mkdir database uploads extensions
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      directus:
        image: directus/directus:11.3.5
        ports:
          - 8055:8055
        volumes:
          - ./database:/directus/database
          - ./uploads:/directus/uploads
          - ./extensions:/directus/extensions
        environment:
          SECRET: "replace-with-secure-random-value"
          ADMIN_EMAIL: "admin@example.com"
          ADMIN_PASSWORD: "d1r3ctu5"
          DB_CLIENT: "sqlite3"
          DB_FILENAME: "/directus/database/data.db"
          WEBSOCKETS_ENABLED: "true"
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Go to [http://localhost:8055](http://localhost:8055) to access the Directus using these credentials:
    ```bash
    Email: admin@example.com
    Password: d1r3ctu5
    ```