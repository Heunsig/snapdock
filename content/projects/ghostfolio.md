---
name: Ghostfolio
description: Open source wealth management software built with web technology.
logo: '/assets/images/logos/ghostfolio.png'
homepage: 'https://ghostfol.io/'
docker: 'https://github.com/ghostfolio/ghostfolio?tab=readme-ov-file#run-with-docker-compose'
github: 'https://github.com/ghostfolio/ghostfolio'
demo: 'https://ghostfol.io/en/demo'
tags: ["finance"]
published: true
---

## Getting Started

1. Clone the repository and move to the folder
    ```bash
    git clone git@github.com:ghostfolio/ghostfolio.git && cd ghostfolio
    ```
2. Copy the file `.env.example` to `.env`
    ```bash
    cp .env.example .env
    ```
3. Run the following command to start the container
    ```bash
    docker compose -f docker/docker-compose.yml up -d
    ```
4. Give the containers a minute to fully start up, then visit [http://localhost:3333](http://localhost:3333) in your browser to access Ghostfolio.
5. Create a new user via Get Started (this first user will get the role ADMIN)