---
name: QloApps
description: Free and Open Source Hotel Management System
logo: '/assets/images/logos/qloapps.png'
homepage: 'https://qloapps.com/'
github: 'https://github.com/Qloapps/QloApps'
docker: 'https://hub.docker.com/r/webkul/qloapps_docker'
demo: 'https://demo.qloapps.com/'
tags: ["CMS", "LIVE DEMO"]
published: true
---

## Live Demo

Try out QloApps via the [live demo](https://demo.qloapps.com/).

```
Username : demo@demo.com
Password : demodemo
```

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir qloapps && cd qloapps
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      qloapps:
        container_name: qloapps
        image: webkul/qloapps_docker:latest
        restart: always
        ports:
          - 9090:80
        environment:
          - USER_PASSWORD=qloappsuserpassword
          - MYSQL_DATABASE=qloapps
      qloapps_db:
        container_name: qloapps_db
        image: mysql:5.7
        restart: always
        environment:
          - MYSQL_DATABASE=qloapps
          - MYSQL_ALLOW_EMPTY_PASSWORD=true
        volumes:
          - qloapps_db:/var/lib/mysql

    volumes:
      qloapps_db:

    ```
4. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
5. Wait a minute for the containers to start up, then visit [http://localhost:9090](http://localhost:9090) to access the QloApps.

## Install QloApps

Once you've accessed the installation page, follow these steps to complete the setup:

1. Choose your preferred language from the dropdown menu
    ![image](/assets/images/guides/qloapps/qloapps_installation_01.png)

2. Read and accept the license agreement to proceed
    ![image](/assets/images/guides/qloapps/qloapps_installation_02.png)

3. Set up your shop information and admin account
    - Enter your website name
    - Create your admin account credentials
    ![image](/assets/images/guides/qloapps/qloapps_installation_03.png)

4. Configure the database connection
    - Enter `qloapps_db` as the database server address
    - Leave all other fields with their default values
    - Click 'Test your database connection now!' to verify
    - If successful, click 'Next' to proceed
    ![image](/assets/images/guides/qloapps/qloapps_installation_04.png)

5. After installation completes, run this command to clean up and secure your installation:
    ```bash
    docker exec -it qloapps sh -c "rm -rf install && mv ./admin ./admindemo"
    ```

6. You can now access your QloApps installation:
    - Frontend: [http://localhost:9090](http://localhost:9090)
    - Admin Panel: [http://localhost:9090/admindemo](http://localhost:9090/admindemo)
