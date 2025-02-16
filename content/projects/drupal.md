---
name: Drupal
description: Open-source content management system (CMS) that helps users build, manage, and organize digital content
logo: '/assets/images/logos/drupal.svg'
homepage: 'https://new.drupal.org'
github: 'https://github.com/drupal/drupal'
tags: []
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir drupal && cd drupal
    ```
3. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      drupal:
        container_name: drupal
        image: drupal
        ports:
          - 8081:80
        volumes:
          - drupal-data:/opt/drupal
        depends_on:
          - mariadb

      mariadb:
        container_name: drupal-mariadb
        image: mariadb
        environment:
          - MARIADB_ROOT_PASSWORD=root
          - MARIADB_DATABASE=drupal
          - MARIADB_USER=drupal
          - MARIADB_PASSWORD=drupal
        volumes:
          - mariadb-data:/var/lib/mysql
    volumes:
      drupal-data:
      mariadb-data:
    ```
4. Start the service using docker compose.
    ```bash
    docker compose up -d
    ```
5. Wait a minute for the containers to start up, then visit [http://localhost:8081](http://localhost:8081) to access the Drupal.

## Install Drupal

1. Choose language

    ![image](/assets/images/guides/drupal/drupal_guide_01.png)

2. Choose profile

    ![image](/assets/images/guides/drupal/drupal_guide_02.png)

3. Configure databased

    ![image](/assets/images/guides/drupal/drupal_guide_03.png)

    - Database type: `MySQL, MariaDB, Percona Server, or equivalent`
    - Database name: `drupal`
    - Database username: `drupal`
    - Database password: `drupal`
    - Advanced options > Host: `mariadb`
    - Advanced options > Database port: `3306`

4. Complete the installation

    ![image](/assets/images/guides/drupal/drupal_guide_04.png)

5. Configure site information

    ![image](/assets/images/guides/drupal/drupal_guide_05.png)

    Sample values (you can change them):

    - Site name: `My Site`
    - Site email address: `admin@example.com`
    - Username: `admin`
    - Password: `inputstrongpassword`
    - Email address: `admin@example.com`

## Redesign Drupal admin theme

The default Drupal Admin page may feel a bit outdated. However, one of Drupal's strengths is its ability to freely install and customize themes.  
By exploring [Drupal Themes](https://www.drupal.org/project/project_theme), you can find and apply various themes to give it a more modern look.

Here, we'll install and use the [Gin Admin Theme](https://www.drupal.org/project/gin) to completely refresh the Drupal Admin page with a modern design.

1. Install the Gin admin theme

    ```bash
    docker exec -it drupal sh -c "cd /opt/drupal && composer require 'drupal/gin'"
    ```

2. Navigate to Admin -> [Appearance page](http://localhost:8081/admin/appearance)

    - Find the Gin theme in the "Uninstalled themes" section
    - Click "Install" button.

3. Make Gin your admin theme:

    ![image](/assets/images/guides/drupal/drupal_guide_06.png)

    - Scroll to the "Administration theme" section
    - Select "Gin" from the dropdown
    - Click "Save configuration"

  