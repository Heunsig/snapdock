---
name: Leantime
description: Goal driven Project Management
logo: '/assets/images/logos/leantime.png'
homepage: 'https://leantime.io/'
docker: 'https://docs.leantime.io/installation/docker'
github: 'https://github.com/Leantime/leantime'
tags: []
published: true
---

## Getting Started

1. Clone the Leantime Docker repoository and move to it
    ```bash
    git clone https://github.com/Leantime/docker-leantime.git && cd docker-leantime
    ```
2. Copy the `sample.env` file to `.env`
    ```bash
    cp sample.env .env
    ```
3. Start the docker containers
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8081](http://localhost:8081) to access the Leantime.