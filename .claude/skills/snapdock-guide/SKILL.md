Create a Snapdock project guide for a self-hosted Docker application.

## Trigger

Use this skill when the user asks to create or write a guide for a project/service on Snapdock. Examples: "write a guide for X", "add X to snapdock", "X 가이드 작성해줘".

## What You Must Do

When invoked, perform these steps in order:

### 1. Research the project

If the user provides a documentation URL, fetch it. Otherwise search for the official Docker documentation.

Key information to collect:
- Docker image name and tag
- Required ports
- Required environment variables (minimum set only)
- Whether it needs a database (PostgreSQL / MySQL / Redis)
- Whether initialization takes time on first run

### 2. Choose an installation pattern

Pick the simplest pattern that works:

| Pattern | When to use |
|---------|-------------|
| `docker run` | Single container, no database |
| Docker Compose (single service) | Needs volumes/env but no DB |
| Docker Compose (multi-service) | Requires database |
| Multi-service + wait step | Requires DB AND takes 1-2 min to initialize |

### 3. Write the guide

Save to `content/projects/[project-slug].md` using this structure:

```markdown
---
name: [Project Name]
description: [One-line description]
logo: '/assets/images/logos/[slug].svg'
homepage: '[official site]'
docker: '[docker docs URL]'
github: '[github repo URL]'
tags: ["tag1", "tag2"]
published: true
createdAt: "[ISO 8601 timestamp]"
updatedAt: "[ISO 8601 timestamp]"
---

## Getting Started

1. [step]
    ```bash
    [command]
    ```
2. [step]
    ```yaml [docker-compose.yml]
    [content]
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:PORT](http://localhost:PORT) to access the [Name].
    - Username: `admin`
    - Password: `demo`
```

## Demo-First Rules (CRITICAL)

**Keep only what's needed to run the demo.** Strip everything else.

✅ Keep:
- Credentials (`admin` / `demo`)
- DB connection variables
- Port mappings
- Essential volumes

❌ Remove:
- `security_opt`, `cap_drop`, `read_only`
- Performance tuning (`--innodb-buffer-pool-size`, `--max-connections`)
- `healthcheck` blocks
- Feature flags that just set defaults (e.g., `DISABLE_X: "false"`)
- Backup/schedule configs
- `LOG_LEVEL`, `TELEMETRY_ENABLED`, `SENTRY_DSN`

**Target: docker-compose.yml under 50 lines.**

## Example: Multi-service with wait step

Use this when the app needs database initialization time:

```markdown
3. Start the containers:
    ```bash
    docker compose up -d
    ```
4. Wait for initialization (1-2 minutes on first run):
    ```bash
    docker compose logs -f [app-container]
    ```
    Look for "ready" or "listening on port" in the logs, then press Ctrl+C
5. Open the browser and go to [http://localhost:PORT](http://localhost:PORT)
    - Username: `admin`
    - Password: `demo`
```

## Tags Reference

`monitoring` `automation` `workflow` `photo` `video` `analytics` `cms` `wiki` `crm` `erp` `finance` `notes` `tasks` `calendar` `pdf` `ai` `database` `git` `ci-cd` `dashboard` `logs` `backup` `security` `password` `e-commerce`

## Quality Checklist

Before finishing, verify:
- [ ] Docker image name is correct and available on Docker Hub
- [ ] Port numbers match official documentation
- [ ] All DB passwords set to `demo`
- [ ] Admin credentials are `admin` / `demo`
- [ ] No production settings (security hardening, tuning, feature flags)
- [ ] File saved to `content/projects/[slug].md`
- [ ] Filename is lowercase with hyphens
- [ ] `createdAt` / `updatedAt` set to today's date in ISO 8601
