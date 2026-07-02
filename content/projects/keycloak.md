---
name: Keycloak
description: Open-source Identity and Access Management solution for modern applications and services.
logo: ''
homepage: 'https://www.keycloak.org/'
docker: 'https://www.keycloak.org/getting-started/getting-started-docker'
github: 'https://github.com/keycloak/keycloak'
tags: ["authentication", "authorization", "identity", "IAM"]
published: false
createdAt: "2026-07-02T00:00:00Z"
updatedAt: "2026-07-02T00:00:00Z"
---

## Getting Started

1. Start the Cockpit container:
    ```bash
    docker run -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.6.3 start-dev
    ```

2. Access the Cockpit by opening [http://localhost:8080](http://localhost:8080) in your browser.
    ```
    Username: admin
    Password: admin
    ```