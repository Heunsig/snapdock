---
name: hi.events
description: Self-hosted event management and ticket selling platform that allows you to create, manage and promote events easily.
logo: '/assets/images/logos/hi-events.svg'
homepage: 'https://hi.events/'
docker: 'https://hi.events/docs/getting-started/quick-start#quick-start-with-docker'
github: 'https://github.com/HiEventsDev/hi.events'
tags: []
published: true
createdAt: "2025-02-13T13:50:31.000Z"
updatedAt: "2025-02-13T13:50:31.000Z"
---

## Getting Started

1. Clone github repository and move to the docker compose folder
    ```bash
    git clone https://github.com/HiEventsDev/hi.events.git && cd hi.events/docker/all-in-one
    ```
2. Generate `APP_KEY` and `JWT_SECRET` by running the following command:
    ```bash
    grep -q "^APP_KEY=" .env && sed -i "s|^APP_KEY=.*|APP_KEY=base64:$(openssl rand -base64 32)|" .env || echo "APP_KEY=base64:$(openssl rand -base64 32)" >> .env
    grep -q "^JWT_SECRET=" .env && sed -i "s|^JWT_SECRET=.*|JWT_SECRET=$(openssl rand -base64 32)|" .env || echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Wait a minute for containers to initialize, then open [http://localhost:8123/auth/register](http://localhost:8123/auth/register) to create an account.

