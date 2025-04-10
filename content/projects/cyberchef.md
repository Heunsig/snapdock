---
name: CyberChef
description: Cyber Swiss Army Knife web app for encryption, encoding, compression and data analysis.
logo: '/assets/images/logos/cyberchef.png'
homepage: 'https://github.com/gchq/CyberChef/'
docker: 'https://github.com/mpepping/docker-cyberchef'
github: 'https://github.com/gchq/CyberChef/'
demo: 'https://gchq.github.io/CyberChef/'
tags: ["encryption", "compression"]
screenshots: [
  '/assets/images/screenshots/cyberchef/cyberchef_01.png',
  '/assets/images/screenshots/cyberchef/cyberchef_02.png',
  '/assets/images/screenshots/cyberchef/cyberchef_03.png',
  '/assets/images/screenshots/cyberchef/cyberchef_04.png',
]
createdAt: "2025-03-07T13:16:41.000Z"
updatedAt: "2025-03-09T06:02:43.000Z"
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir cyberchef && cd cyberchef
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      cyber-chef:
        image: mpepping/cyberchef:latest
        ports:
          - "9099:8000"
    ```
3. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
4. Wait a minute for the containers to start up, then visit [http://localhost:9099](http://localhost:9099) to access the CyberChef.
