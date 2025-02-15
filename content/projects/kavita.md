---
name: Kavita
description: Rocket-fueled self-hosted digital library which supports a vast array of file formats
logo: '/assets/images/logos/kavita.png'
homepage: 'https://wiki.kavitareader.com/'
docker: 'https://wiki.kavitareader.com/installation/docker/dockerhub/'
github: 'https://github.com/Kareadita/Kavita'
demo: 'https://demo.kavitareader.com/login?apiKey=9003cf99-9213-4206-a787-af2fe4cc5f1f'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir kavita && cd kavita
    ```
2. Create required directories
    ```bash
    mkdir -p manga comics books saved/config
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      kavita:
          image: jvmilazz0/kavita:latest    # Using the stable branch from the official dockerhub repo.
          container_name: kavita
          volumes:
              - ./manga:/manga
              - ./comics:/comics
              - ./books:/books
              - ./saved/config:/kavita/config     # /kavita/config must not be changed
          environment:
              - TZ=Asia/Seoul
              - DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true
          ports:
              - "5000:5000"
          restart: unless-stopped
    ```
4. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
5. Go to [http://localhost:5000](http://localhost:5000) to access the Kavita.
