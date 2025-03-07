---
name: Stirling PDF
description: A locally hosted one-stop shop for all your PDF needs
logo: '/assets/images/logos/stirling-pdf.svg'
homepage: 'https://www.stirlingpdf.com/'
docker: 'https://docs.stirlingpdf.com/Installation/Docker%20Install'
github: 'https://github.com/Stirling-Tools/Stirling-PDF'
demo: 'https://stirlingpdf.io/'
tags: ["PDF"]
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir stirling-pdf && cd stirling-pdf
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      stirling-pdf:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
        ports:
          - '9099:8080'
        volumes:
          - trainingData:/usr/share/tessdata
          - extraConfigs:/configs
          - customFiles:/customFiles/
          - logs:/logs/
          - pipeline:/pipeline/
        environment:
          - DOCKER_ENABLE_SECURITY=false
          - LANGS=en_GB
    volumes:
      trainingData:
      extraConfigs:
      customFiles:
      logs:
      pipeline:
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Wait a minute for the containers to start up, then visit [http://localhost:9099](http://localhost:9099) to access the Stirling PDF.
