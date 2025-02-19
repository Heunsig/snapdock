---
name: Beszel
description: Simple, lightweight server monitoring
logo: '/assets/images/logos/beszel.svg'
homepage: 'https://beszel.dev/'
docker: 'https://beszel.dev/guide/hub-installation'
github: 'https://github.com/henrygd/beszel'
tags: []
published: true
---

## Getting Started

1. Create and enter a new directory for Beszel:
    ```bash
    mkdir beszel && cd beszel
    ```
2. Create a `docker-compose.yml` file with the following configuration:
    ```yaml
    services:
      beszel:
        image: henrygd/beszel
        container_name: beszel
        restart: unless-stopped
        ports:
          - 8090:8090
        volumes:
          - beszel_data:/beszel_data
      beszel-agent:
        image: henrygd/beszel-agent:latest
        container_name: beszel-agent
        restart: unless-stopped
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock:ro
        environment:
          PORT: 45876
          KEY: "YOUR_PUBLIC_KEY_HERE"
    volumes:
      beszel_data:
    ```
3. Start the containers:
    ```bash
    docker compose up -d
    ```
4. Open [http://localhost:8090](http://localhost:8090) in your browser and create an account

## Connecting the Beszel Agent

1. In the Beszel dashboard, click "Add System" and copy your `Public Key`
    ![Beszel Dashboard](./assets/images/guides/beszel/beszel_guide_01.png)
2. Update your `docker-compose.yml` file by replacing `YOUR_PUBLIC_KEY_HERE` with the copied key
3. Restart the containers to apply the changes:
    ```bash
    docker compose up -d
    ```
4. Back in the Beszel dashboard, click "Add System" and configure your agent:
    - Name: Beszel agent
    - Host / IP: beszel-agent
    ![Beszel Dashboard](./assets/images/guides/beszel/beszel_guide_02.png)
