---
name: Uptime Kuma
description: Uptime Kuma is an easy-to-use self-hosted monitoring tool.
logo: '/assets/images/logos/uptime-kuma.svg'
homepage: 'https://uptime.kuma.pet/'
github: 'https://github.com/louislam/uptime-kuma'
tags: []
draft: false
---

# Getting Started

1. Run docker 
    ```bash
    docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
    ```
2. Open the browser and go to `http://localhost:3001` to access the Uptime Kuma.