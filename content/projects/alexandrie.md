---
name: Alexandrie
description: A modern and elegant application for taking notes in extended Markdown.
logo: '/assets/images/logos/alexandrie.svg'
homepage: 'https://alexandrie-hub.fr/'
docker: 'https://alexandrie-hub.fr/'
github: 'https://github.com/Smaug6739/Alexandrie'
tags: ['notion', 'wiki', 'note', 'markdown']
published: true
createdAt: "2025-11-03T13:10:52Z"
updatedAt: "2025-11-03T13:10:52Z"
screenshots: [
  '/assets/images/screenshots/alexandrie/alexandrie_01.png',
  '/assets/images/screenshots/alexandrie/alexandrie_02.png',
  '/assets/images/screenshots/alexandrie/alexandrie_03.png',
  '/assets/images/screenshots/alexandrie/alexandrie_04.png',
  '/assets/images/screenshots/alexandrie/alexandrie_05.png',
  '/assets/images/screenshots/alexandrie/alexandrie_06.png',
  '/assets/images/screenshots/alexandrie/alexandrie_07.png',
  '/assets/images/screenshots/alexandrie/alexandrie_08.png',
  '/assets/images/screenshots/alexandrie/alexandrie_09.png',
  '/assets/images/screenshots/alexandrie/alexandrie_10.png',
]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir alexandrie && cd alexandrie
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      # MySQL Database
      mysql:
        image: mysql:8.0
        container_name: alexandrie-mysql
        restart: unless-stopped
        environment:
          MYSQL_ROOT_PASSWORD: rootpassword
          MYSQL_DATABASE: alexandrie
          MYSQL_USER: alexandrie
          MYSQL_PASSWORD: password
        volumes:
          - mysql_data:/var/lib/mysql
        ports:
          - '3307:3306'
        networks:
          - alexandrie-network
        healthcheck:
          test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost']
          timeout: 10s
          retries: 5
          start_period: 30s

      # Object Storage
      rustfs:
        image: rustfs/rustfs:latest
        container_name: alexandrie-rustfs
        restart: unless-stopped
        environment:
          # définition des clés directement
          RUSTFS_ACCESS_KEY: alexandrie-key
          RUSTFS_SECRET_KEY: alexandrie-secret
          RUSTFS_CONSOLE_ENABLE: 'false' # ou true si tu veux console graphique
          # autres variables selon besoin (volume, domain, etc.)
        ports:
          - '9000:9000' # API S3
        volumes:
          - rustfs_data:/data
          - rustfs_data:/logs
        networks:
          - alexandrie-network
        healthcheck:
          test: ['CMD-SHELL', 'nc -z localhost 9000 || exit 1']
          interval: 30s
          timeout: 10s
          retries: 3
          start_period: 20s

      # Alexandrie Backend
      backend:
        image: ghcr.io/smaug6739/alexandrie-backend:latest
        restart: unless-stopped
        container_name: alexandrie-backend
        environment:
          # Database Configuration
          DATABASE_HOST: mysql
          DATABASE_PORT: 3306
          DATABASE_NAME: alexandrie
          DATABASE_USER: alexandrie
          DATABASE_PASSWORD: password
          ALLOW_UNSECURE: 'true' # Set to 'true' if you run without HTTPS (e.g., local dev); in production, use 'false' and set up HTTPS

          # Application Configuration
          JWT_SECRET: your-secure-jwt-secret-key-change-this-in-production
          DOMAIN_CLIENT: http://localhost:8200 # For CORS Policy, if you have "Cors" error, check this
          COOKIE_DOMAIN: localhost # Very optional, can be left empty. For auth cookies: If you can't login (or you are disconnected immediatly), check this; DON'T set an URL just the DOMAIN (e.g., "example.com" or "localhost")

          # MinIO Configuration (optional, you can replace config with "" to disable MinIO usage)
          MINIO_ENDPOINT: rustfs:9000
          MINIO_ACCESSKEY: alexandrie-key
          MINIO_SECRETKEY: alexandrie-secret
          MINIO_BUCKET: alexandrie

          # SMTP Configuration (optional)
          SMTP_HOST: ''
          SMTP_MAIL: ''
          SMTP_PASSWORD: ''

          # Port Configuration
          BACKEND_PORT: 8201
          CPWD: /app/
          CONFIG_CPWD: ''
          GIN_MODE: release
        ports:
          - '8201:8201'
        depends_on:
          mysql:
            condition: service_healthy
          rustfs:
            condition: service_healthy
        networks:
          - alexandrie-network

      # Alexandrie Frontend
      frontend:
        image: ghcr.io/smaug6739/alexandrie-frontend:latest
        container_name: alexandrie-frontend
        restart: unless-stopped
        environment:
          PORT: 8200
          # Runtime configuration - builds with these values at startup
          NUXT_PUBLIC_BASE_API: http://localhost:8201
          NUXT_PUBLIC_BASE_CDN: http://localhost:9000/alexandrie
          NUXT_PUBLIC_BASE_URL: http://localhost:8200
        ports:
          - '8200:8200'
        depends_on:
          - backend
        networks:
          - alexandrie-network

    networks:
      alexandrie-network:
        driver: bridge

    volumes:
      mysql_data:
        driver: local
      rustfs_data:
        driver: local
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8200](http://localhost:8200) to access the Alexandrie.
    ```
    Email: admin@example.com
    Password: admin
    ```