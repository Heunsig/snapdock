---
name: Metabase
description: Open-source BI platform for querying data and embedding analytics in apps, enabling users to explore their data independently.
logo: '/assets/images/logos/metabase.svg'
homepage: 'https://www.metabase.com/'
docker: 'https://www.metabase.com/docs/latest/installation-and-operation/running-metabase-on-docker'
github: 'https://github.com/metabase/metabase'
tags: []
published: true
---

## Getting Started

1. Run docker
    ```bash
    docker run -d -p 3002:3000 --name metabase metabase/metabase
    ```
2. Wait a minute for the containers to start up, then visit [http://localhost:3002](http://localhost:3002) to access the Metabase.
