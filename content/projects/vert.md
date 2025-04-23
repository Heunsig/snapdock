---
name: Vert
description: All image and audio processing is done on your device
logo: '/assets/images/logos/vert.svg'
homepage: 'https://vert.sh/'
docker: 'https://github.com/VERT-sh/VERT?tab=readme-ov-file#with-docker'
github: 'https://github.com/VERT-sh/VERT'
demo: 'https://vert.sh/'
tags: ["image processing", "audio processing", "converter"]
published: true
screenshots: [
  '/assets/images/screenshots/vert/vert_01.png',
  '/assets/images/screenshots/vert/vert_02.png',
  '/assets/images/screenshots/vert/vert_03.png',
  '/assets/images/screenshots/vert/vert_04.png',
  '/assets/images/screenshots/vert/vert_05.png',
  '/assets/images/screenshots/vert/vert_06.png',
  '/assets/images/screenshots/vert/vert_07.png',
  '/assets/images/screenshots/vert/vert_08.png',
]
createdAt: "2025-04-23T06:35:37.000Z"
updatedAt: "2025-04-23T06:35:37.000Z"
---

## Getting Started

1. Start Vert using Docker:
    ```bash
    docker run -d --restart unless-stopped -p 3000:80 --name "vert" ghcr.io/vert-sh/vert:latest
    ```
2. Go to [http://localhost:3000](http://localhost:3000) to access the Vert.
