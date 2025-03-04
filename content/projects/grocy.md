---
name: Grocy
description: Web-based self-hosted groceries & household management solution for your home.
logo: '/assets/images/logos/grocy.png'
homepage: 'https://grocy.info/'
docker: 'https://github.com/grocy/grocy?tab=readme-ov-file#how-to-run-using-docker'
github: 'https://github.com/grocy/grocy'
demo: 'https://en.demo.grocy.info/'
tags: ["inventory", "LIVE DEMO"]
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir grocy && cd grocy
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      grocy:
        image: lscr.io/linuxserver/grocy:latest
        container_name: grocy
        environment:
          - TZ=Asia/Seoul
        volumes:
          - grocy_config:/config
        ports:
          - 9283:80
        restart: unless-stopped
    volumes:
      grocy_config:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:9283](http://localhost:9283) to access the Grocy.
    ```
    Username: admin
    Password: admin
    ```
