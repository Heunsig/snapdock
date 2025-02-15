---
name: Tandoor
description: The recipe manager that allows you to manage your ever growing collection of digital recipes.
logo: '/assets/images/logos/tandoor.svg'
homepage: 'https://docs.tandoor.dev/'
docker: 'https://docs.tandoor.dev/install/docker/'
github: 'https://github.com/TandoorRecipes/recipes'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir tandoor && cd tandoor
    ```
2. Create `.env` file and add the following content:
    ```bash [.env]
    SECRET_KEY=rZ/l7fgyixfJHyE07OgyEknkR4B9WNcyKb7nyPLJf81cDIcGbB
    DB_ENGINE=django.db.backends.postgresql
    POSTGRES_HOST=db_recipes
    POSTGRES_DB=djangodb
    POSTGRES_PORT=5432
    POSTGRES_USER=djangouser
    POSTGRES_PASSWORD=password
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      db_recipes:
        restart: always
        image: postgres:16-alpine
        volumes:
          - ./postgresql:/var/lib/postgresql/data
        env_file:
          - ./.env

      web_recipes:
        restart: always
        image: vabene1111/recipes
        env_file:
          - ./.env
        volumes:
          - staticfiles:/opt/recipes/staticfiles
          # Do not make this a bind mount, see https://docs.tandoor.dev/install/docker/#volumes-vs-bind-mounts
          - nginx_config:/opt/recipes/nginx/conf.d
          - ./mediafiles:/opt/recipes/mediafiles
        depends_on:
          - db_recipes

      nginx_recipes:
        image: nginx:mainline-alpine
        restart: always
        ports:
          - 8082:80
        env_file:
          - ./.env
        depends_on:
          - web_recipes
        volumes:
          # Do not make this a bind mount, see https://docs.tandoor.dev/install/docker/#volumes-vs-bind-mounts
          - nginx_config:/etc/nginx/conf.d:ro
          - staticfiles:/static:ro
          - ./mediafiles:/media:ro

    volumes:
      nginx_config:
      staticfiles:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Wait for the containers to start (this may take up to 3 minutes). Then visit [http://localhost:8082](http://localhost:8082) to access Tandoor.
