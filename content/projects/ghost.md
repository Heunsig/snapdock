---
name: Ghost
description: An open source, professional publishing platform built on a modern Node.js technology stack
logo: '/assets/images/logos/ghost.png'
homepage: 'https://ghost.org/'
docker: 'https://hub.docker.com/_/ghost/'
github: 'https://github.com/TryGhost/Ghost'
tags: []
published: true
createdAt: "2025-02-10T11:53:56.000Z"
updatedAt: "2025-02-11T15:20:34.000Z"
---

## Getting Started

1. Run docker 
    ```bash
    docker run -d --name some-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost
    ```
2. Open the browser and go to the following URLs to access the Ghost.
    - Your site: [http://localhost:3001](http://localhost:3001)
    - Ghost Admin: [http://localhost:3001/ghost](http://localhost:3001/ghost)
