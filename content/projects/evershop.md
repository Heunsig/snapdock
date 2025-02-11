---
name: Evershop
description: All-in-One open source ecommerce solution.
logo: '/assets/images/logos/evershop.svg'
homepage: 'https://evershop.io/'
docker: 'https://evershop.io/docs/development/getting-started/installation-guide'
github: 'https://github.com/evershopcommerce/evershop'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir evershop
    cd evershop
    ```
2. Run the following command to download the docker-compose.yml file
    ```bash
    curl -sSL https://raw.githubusercontent.com/evershopcommerce/evershop/main/docker-compose.yml > docker-compose.yml 
    ```
3. Run the following command to start the container
    ```bash
    docker compose up -d
    ```
4. Run the following command to create a new admin user
    ```bash
    docker exec -it evershop-app-1 npm run user:create -- --email "admin@example.com" --password "evershopadmin" --name "Admin"
    ```
4. Open the browser and go to the following URLs to access the Evershop
    ```
    Your site: http://localhost:3000
    Evershop Admin: http://localhost:3000/admin
    ```
5. Use the following credentials to login
    ```
    Email: admin@example.com
    Password: evershopadmin
    ```