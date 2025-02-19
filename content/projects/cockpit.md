---
name: Cockpit
description: Cockpit provides a straightforward way to manage content for various applications.
logo: '/assets/images/logos/cockpit.svg'
homepage: 'https://getcockpit.com/'
docker: 'https://getcockpit.com/documentation/core/quickstart/installation#docker'
github: 'https://github.com/Cockpit-HQ/Cockpit'
tags: ["CMS"]
published: true
---

## Getting Started

1. Start the Cockpit container:
    ```bash
    docker run -d --name cockpit -p 8080:80 cockpithq/cockpit:core-latest
    ```
2. Once the container is running, open your browser and go to [http://localhost:8080/install](http://localhost:8080/install) to complete the initial setup.
3. After setup, visit [http://localhost:8080](http://localhost:8080) to access Cockpit.
    ```
    Username: admin
    Password: admin
    ```
