---
name: Grafana
description: Open-source platform that lets you visualize, monitor, and analyze data from many sources.
logo: '/assets/images/logos/grafana.svg'
homepage: 'https://grafana.com/'
docker: 'https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/'
github: 'https://github.com/grafana/grafana'
demo: 'https://play.grafana.org/'
tags: []
published: true
---

## Getting Started

1. Start Grafana using Docker:
    ```bash
    docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
    ```
2. Go to [http://localhost:3000](http://localhost:3000) to access the Grafana, use the following credentials to login:
    ```
    username: admin
    password: admin
    ```
