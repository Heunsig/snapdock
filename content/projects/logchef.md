---
name: LogChef
description: A modern, single binary, high-performance log analytics platform
logo: '/assets/images/logos/logchef.svg'
homepage: 'https://logchef.app/'
docker: 'https://logchef.app/getting-started/quickstart/'
github: 'https://github.com/mr-karan/logchef'
demo: 'https://demo.logchef.app/'
createdAt: "2025-08-09T04:22:06Z"
updatedAt: "2025-08-09T04:22:06Z"
screenshots: [
  '/assets/images/screenshots/logchef/logchef_01.png',
  '/assets/images/screenshots/logchef/logchef_02.png',
  '/assets/images/screenshots/logchef/logchef_03.png',
  '/assets/images/screenshots/logchef/logchef_04.png',
  '/assets/images/screenshots/logchef/logchef_05.png',
  '/assets/images/screenshots/logchef/logchef_06.png',
  '/assets/images/screenshots/logchef/logchef_07.png',
]
published: true
tags: ['kibana', 'log', 'elasticsearch']
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir logchef && cd logchef
    ```
2. Download the Docker Compose file
    ```bash
    curl -LO https://raw.githubusercontent.com/mr-karan/logchef/refs/heads/main/deployment/docker/docker-compose.yml
    ```
3. Start the service using docker compose
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8125](http://localhost:8125) to access the LogChef.
    ```
    Username: admin@logchef.internal
    Password: password
    ```
