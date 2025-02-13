---
name: NocoDB
description: building no-code database solutions with ease of spreadsheets.
logo: '/assets/images/logos/nocodb.png'
homepage: 'https://nocodb.com/'
docker: 'https://docs.nocodb.com/getting-started/self-hosted/installation/docker-compose/'
github: 'https://github.com/nocodb/nocodb'
tags: []
published: true
---

## Getting Started

1. Clone the NocoDB GitHub repository.
    ```bash
    git clone https://github.com/nocodb/nocodb.git
    ```
2. Navigate to the docker-compose directory.
    ```bash
    cd nocodb/docker-compose/2_pg
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Access NocoDB by navigating to [http://localhost:8080](http://localhost:8080) in your web browser.