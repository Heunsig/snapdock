---
name: Ackee
description: Self-hosted, Node.js based analytics tool for those who care about privacy.
logo: '/assets/images/logos/ackee.svg'
homepage: 'https://ackee.electerious.com/'
docker: 'https://docs.ackee.electerious.com/#/docs/Get%20started#with-docker-compose'
github: 'https://github.com/electerious/Ackee'
demo: 'https://demo.ackee.electerious.com/'
tags: ["analytics"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir ackee && cd ackee
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      ackee:
        image: electerious/ackee
        container_name: ackee
        restart: always
        ports:
          - "3000:3000"
        environment:
          - WAIT_HOSTS=mongo:27017
          - ACKEE_MONGODB=mongodb://mongo:27017/ackee
          - ACKEE_USERNAME=admin
          - ACKEE_PASSWORD=password
        depends_on:
          - mongo
      mongo:
        image: mongo
        container_name: mongo
        restart: always
        volumes:
          - ackee_mongodata:/data/db
    volumes:
      ackee_mongodata:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Visit [http://localhost:3000](http://localhost:3000) to access Ackee and login with the following credentials:
    ```
    Username: admin
    Password: password
    ```

