---
name: Nginx Proxy Manager
description: Expose your services easily and securely
logo: '/assets/images/logos/nginx-proxy-manager.svg'
homepage: 'https://nginxproxymanager.com/'
docker: 'https://nginxproxymanager.com/guide/#quick-setup'
github: 'https://github.com/NginxProxyManager/nginx-proxy-manager'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir nginx-proxy-manager && cd nginx-proxy-manager
    ```
2. Create required directories
    ```bash
    mkdir -p data letsencrypt
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      app:
        image: 'jc21/nginx-proxy-manager:latest'
        restart: unless-stopped
        ports:
          - '80:80'
          - '81:81'
          - '443:443'
        volumes:
          - ./data:/data
          - ./letsencrypt:/etc/letsencrypt
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Go to [http://localhost:81](http://localhost:81) to access the Nginx Proxy Manager.
    ```
    Email: admin@example.com
    Password: changeme
    ```
