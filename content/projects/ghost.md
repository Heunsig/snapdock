---
name: Ghost
description: An open source, professional publishing platform built on a modern Node.js technology stack
logo: '/assets/images/logos/ghost.png'
homepage: 'https://ghost.org/'
docker: 'https://hub.docker.com/_/ghost/'
github: 'https://github.com/TryGhost/Ghost'
tags: []
published: true
---

## Getting Started

1. Run docker 
    ```bash
    docker run -d --name some-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost
    ```
2. Open the browser and go to the following URLs to access the Ghost
    ```
    Your site: http://localhost:3001
    Ghost Admin: http://localhost:3001/ghost
    ```