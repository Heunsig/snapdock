---
name: checkmk
description: The IT monitoring platform. Scalable. Automated. Extensible.
logo: '/assets/images/logos/checkmk.png'
homepage: 'https://checkmk.com/'
docker: 'https://docs.checkmk.com/latest/en/introduction_docker.html'
github: 'https://github.com/Checkmk/checkmk'
tags: ['monitoring']
createdAt: "2025-02-22T09:07:23.000Z"
updatedAt: "2025-02-22T09:07:23.000Z"
published: true
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir checkmk && cd checkmk
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml
    services:
      monitoring:
        image: checkmk/check-mk-raw:2.3.0-latest
        container_name: monitoring
        restart: always
        ports:
          - "8080:5000"
          - "8000:8000"
        tmpfs:
          - "/opt/omd/sites/cmk/tmp:uid=1000,gid=1000"
        volumes:
          - monitoring:/omd/sites
          - /etc/localtime:/etc/localtime:ro
        tty: true
        stdin_open: true

    volumes:
      monitoring:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Get the initial password for your `cmkadmin` account by checking the container logs:
    ```bash
    docker container logs monitoring
    ```
    ![Checkmk Guide 01](/assets/images/guides/checkmk/checkmk_guide_01.png)

5. Access Checkmk by opening [http://localhost:8080](http://localhost:8080) in your browser and logging in with:
    ```
    Username: cmkadmin
    Password: [use the password from the logs]
    ```
    

