---
name: Omni Tools
description: Self-hosted web app offering a variety of online tools to simplify everyday tasks
logo: '/assets/images/logos/omnitools.svg'
homepage: 'https://github.com/iib0011/omni-tools'
docker: 'https://github.com/iib0011/omni-tools?tab=readme-ov-file#docker-compose'
github: 'https://github.com/iib0011/omni-tools'
demo: 'https://omnitools.app/'
createdAt: "2025-04-11T16:02:32.000Z"
updatedAt: "2025-04-11T16:02:32.000Z"
published: true
screenshots: [
  '/assets/images/screenshots/omni-tools/omnitools_01.png',
  '/assets/images/screenshots/omni-tools/omnitools_02.png',
  '/assets/images/screenshots/omni-tools/omnitools_03.png',
  '/assets/images/screenshots/omni-tools/omnitools_04.png',
]
tags: ["tools", "image", "video", "pdf", "text", "gif"]
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir omni-tools && cd omni-tools
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      omni-tools:
        image: iib0011/omni-tools:latest
        container_name: omni-tools
        restart: unless-stopped
        ports:
          - "8080:80"
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the Omni Tools.
