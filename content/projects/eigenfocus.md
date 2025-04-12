---
name: Eigenfocus
description: All-in-One Project Management, Time Tracking and Focus App
logo: '/assets/images/logos/eigenfocus.svg'
homepage: 'https://eigenfocus.com/'
docker: 'https://github.com/Eigenfocus/eigenfocus?tab=readme-ov-file#docker-compose'
github: 'https://github.com/Eigenfocus/eigenfocus'
createdAt: "2025-02-22T07:07:41.000Z"
updatedAt: "2025-04-12T05:09:56.000Z"
published: true
screenshots: [
  "/assets/images/screenshots/eigenfocus/eigenfocus_01.png",
  "/assets/images/screenshots/eigenfocus/eigenfocus_02.png",
  "/assets/images/screenshots/eigenfocus/eigenfocus_03.png",
  "/assets/images/screenshots/eigenfocus/eigenfocus_04.png",
  "/assets/images/screenshots/eigenfocus/eigenfocus_05.png",
  "/assets/images/screenshots/eigenfocus/eigenfocus_06.png",
]
tags: ["project management", "time tracking", "focus"]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir eigenfocus && cd eigenfocus
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      web:
        image: eigenfocus/eigenfocus:0.8.0
        restart: unless-stopped
        volumes:
          - data:/eigenfocus-app/app-data
        environment:
        - DEFAULT_HOST_URL=http://localhost:3001
        ports:
          - 3001:3000
    volumes:
      data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:3001](http://localhost:3001) to access the Eigenfocus.
