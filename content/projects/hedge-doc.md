---
name: HedgeDoc
description: Open-source content management system (CMS) that helps users build, manage, and organize digital content
logo: '/assets/images/logos/hedge-doc.svg'
homepage: 'https://hedgedoc.org/'
docker: 'https://docs.hedgedoc.org/setup/docker/'
github: 'https://github.com/hedgedoc/hedgedoc'
demo: 'https://demo.hedgedoc.org/'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir hedge-doc && cd hedge-doc
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      database:
        image: postgres:13.4-alpine
        environment:
          - POSTGRES_USER=hedgedoc
          - POSTGRES_PASSWORD=password
          - POSTGRES_DB=hedgedoc
        volumes:
          - database:/var/lib/postgresql/data
        restart: always
      app:
        # Make sure to use the latest release from https://hedgedoc.org/latest-release
        image: quay.io/hedgedoc/hedgedoc:1.10.2
        environment:
          - CMD_DB_URL=postgres://hedgedoc:password@database:5432/hedgedoc
          - CMD_DOMAIN=localhost
          - CMD_URL_ADDPORT=true
        volumes:
          - uploads:/hedgedoc/public/uploads
        ports:
          - "3000:3000"
        restart: always
        depends_on:
          - database
    volumes:
      database:
      uploads:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Wait a minute for the containers to start up, then visit [http://localhost:3000](http://localhost:3000) to access the HedgeDoc.
