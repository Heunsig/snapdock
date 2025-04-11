---
name: Docuseal
description: Open-source document signing platform.
logo: '/assets/images/logos/docuseal.svg'
homepage: 'https://www.docuseal.com/'
docker: 'https://www.docuseal.com/install'
github: 'https://github.com/docusealco/docuseal'
tags: ["document", "signing"]
screenshots: [
  '/assets/images/screenshots/docuseal/docuseal_01.png',
  '/assets/images/screenshots/docuseal/docuseal_02.png',
  '/assets/images/screenshots/docuseal/docuseal_03.png',
  '/assets/images/screenshots/docuseal/docuseal_04.png',
  '/assets/images/screenshots/docuseal/docuseal_05.png',
  '/assets/images/screenshots/docuseal/docuseal_06.png',
]
createdAt: "2025-03-01T10:44:41.000Z"
updatedAt: "2025-04-11T14:40:31.000Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir docuseal && cd docuseal
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      app:
        depends_on:
          postgres:
            condition: service_healthy
        image: docuseal/docuseal:latest
        ports:
          - 9008:3000
        volumes:
          - docuseal:/data/docuseal
        environment:
          - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/docuseal

      postgres:
        image: postgres:15
        volumes:
          - pg_data:/var/lib/postgresql/data
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: docuseal
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U postgres"]
          interval: 5s
          timeout: 5s
          retries: 5
    volumes:
      docuseal:
      pg_data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9008](http://localhost:9008) to access the Grocy.
