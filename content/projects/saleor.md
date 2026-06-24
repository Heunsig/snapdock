---
name: Saleor
description: Open-source, headless e-commerce platform built with Python, GraphQL, Django, and React.
logo: '/assets/images/logos/saleor.svg'
homepage: 'https://saleor.io/'
docker: 'https://docs.saleor.io/setup/docker-compose'
github: 'https://github.com/saleor/saleor-platform'
tags: ["e-commerce"]
published: false
createdAt: "2026-06-24T00:00:00Z"
updatedAt: "2026-06-24T00:00:00Z"
---

## Getting Started

1. Clone the Saleor platform repository:
    ```bash
    git clone https://github.com/saleor/saleor-platform.git
    cd saleor-platform
    ```
2. Pull all Docker images:
    ```bash
    docker compose pull
    ```
3. Run database migrations:
    ```bash
    docker compose run --rm api python3 manage.py migrate
    ```
4. Populate the database with sample data:
    ```bash
    docker compose run --rm api python3 manage.py populatedb
    ```
5. Create an admin user:
    ```bash
    docker compose run --rm api python3 manage.py createsuperuser
    ```
    When prompted, enter:
    - Email: `admin@example.com`
    - Password: `demo`
6. Run the following command to start the containers:
    ```bash
    docker compose up -d
    ```
7. Wait for initialization (1-2 minutes on first run):
    ```bash
    docker compose logs -f api
    ```
    Look for `Booting worker` in the logs, then press Ctrl+C
8. Open the browser and go to [http://localhost:9000](http://localhost:9000) to access the Saleor Dashboard.
    - Email: `admin@example.com`
    - Password: `demo`
