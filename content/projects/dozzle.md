---
name: Dozzle
description: Real-time logging and monitoring for Docker in the browser.
logo: '/assets/images/logos/dozzle.svg'
homepage: 'https://dozzle.dev/'
docker: 'https://dozzle.dev/guide/getting-started'
github: 'https://github.com/amir20/dozzle'
tags: ["monitoring", "Docker"]
createdAt: "2025-02-09T11:19:00.000Z"
updatedAt: "2025-02-19T14:26:50.000Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir dozzle && cd dozzle
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      dozzle:
        image: amir20/dozzle:v8
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock
        ports:
          - 8080:8080
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the Dozzle.
