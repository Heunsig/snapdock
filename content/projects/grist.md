---
name: Grist
description: Modern relational spreadsheet combining spreadsheet flexibility with database robustness
logo: '/assets/images/logos/grist.png'
homepage: 'https://www.getgrist.com/'
docker: 'https://support.getgrist.com/self-managed/#how-do-i-install-grist'
github: 'https://github.com/gristlabs/grist-core'
demo: 'https://docs.getgrist.com'
tags: ["spreadsheet", "database", "no-code", "collaboration", "forms"]
published: true
createdAt: "2026-02-12T12:13:10Z"
updatedAt: "2026-02-12T12:13:10Z"
---

## Getting Started

1. Run Grist with Docker
    ```bash
    docker run -d \
      --name grist \
      -p 8484:8484 \
      -v $PWD/grist-data:/persist \
      -e GRIST_SESSION_SECRET=replace-with-random-secret \
      -e GRIST_DEFAULT_EMAIL=admin@example.com \
      --restart unless-stopped \
      gristlabs/grist
    ```
2. Open your browser and go to [http://localhost:8484](http://localhost:8484) to access Grist.
    - You'll be automatically logged in as the admin user
    - Start creating documents, importing data, or exploring templates
