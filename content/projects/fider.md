---
name: Fider
description: Feedback portal for feature requests and suggestions.
logo: '/assets/images/logos/fider.png'
homepage: 'https://fider.io/'
docker: 'https://docs.fider.io/hosting-instance'
github: 'https://github.com/getfider/fider'
tags: []
screenshots: [
  '/assets/images/screenshots/fider/fider_01.png',
  '/assets/images/screenshots/fider/fider_02.png',
  '/assets/images/screenshots/fider/fider_03.png',
  '/assets/images/screenshots/fider/fider_04.png',
  '/assets/images/screenshots/fider/fider_05.png',
]
published: true
---

## Getting Started

1. Create a folder and move to it
    ```bash
    mkdir fider && cd fider
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      db:
        restart: always
        image: postgres:12
        volumes:
          - fider_data:/var/lib/postgresql/data
        environment:
          POSTGRES_USER: fider
          POSTGRES_PASSWORD: s0m3g00dp4ssw0rd
      app:
        restart: always
        image: getfider/fider:stable
        ports:
          - "8082:3000"
        environment:
          # Public Host Name
          BASE_URL: http://localhost:8082

          # Connection string to the PostgreSQL database
          DATABASE_URL: postgres://fider:s0m3g00dp4ssw0rd@db:5432/fider?sslmode=disable

          # Generate a secure secret, for example using https://jwtsecret.com
          JWT_SECRET: VERY_STRONG_SECRET_SHOULD_BE_USED_HERE

          # From which account e-mails will be sent
          EMAIL_NOREPLY: noreply@yourdomain.com
          EMAIL_SMTP_HOST: mailhog
          EMAIL_SMTP_PORT: 1025
      mailhog:
        image: mailhog/mailhog
        restart: always
        ports:
          - "8025:8025"
    volumes:
      fider_data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8082](http://localhost:8082) to access Fider

Note: For email confirmation during signup, check MailHog at [http://localhost:8025](http://localhost:8025).

