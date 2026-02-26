# Snapdock Project Guide Creator

This skill helps you create high-quality project guides for the Snapdock platform - a curated collection of self-hosted Docker applications.

## When to use this skill

Use this skill when you need to:
- Create a new project guide for Snapdock
- Update an existing project guide
- Generate Docker Compose configurations for self-hosted applications
- Document installation and setup procedures for Docker-based projects

## Snapdock Philosophy

**Snapdock's core concept**: Users should be able to run any SaaS app locally immediately by following the guide alone, without consulting external documentation.

### Key Principles:
1. **Demo-First Approach**: Guides are for testing and exploring features, not for production deployment
2. **Zero Configuration**: Users should only need to copy-paste-run-access (keep steps minimal and clear)
3. **Instant Gratification**: Minimize setup time and complexity - get to working demo in under 5 minutes
4. **Self-Contained**: All necessary information must be in the guide itself
5. **Simplicity Over Completeness**: A working 30-line config beats a comprehensive 100-line config

### What This Means for Guides:
- ✅ Simple credentials (e.g., `admin` / `demo`)
- ✅ Minimal environment variables (only what's needed to run)
- ✅ No production optimizations (no security hardening, backup configs, performance tuning)
- ✅ Clear waiting instructions if initialization takes time
- ✅ Direct URLs with ports (e.g., `http://localhost:2342`)
- ❌ No "change password immediately" warnings
- ❌ No complex multi-file setups unless absolutely necessary
- ❌ No configurations requiring external documentation

## Project Guide Structure

All project guides in Snapdock follow a consistent markdown format with frontmatter metadata and step-by-step installation instructions.

### Required Frontmatter Fields

```yaml
---
name: [Project Name]
description: [One-line description of the project]
logo: '/assets/images/logos/[project-slug].png'  # or .svg
homepage: '[Official project website]'
docker: '[Official Docker documentation URL]'  # optional
github: '[GitHub repository URL]'
demo: '[Live demo URL]'  # optional
tags: ["tag1", "tag2", ...]  # relevant tags
published: true
createdAt: "[ISO 8601 timestamp]"
updatedAt: "[ISO 8601 timestamp]"
screenshots: [  # optional
  '/assets/images/screenshots/[project-slug]/screenshot_01.png',
  '/assets/images/screenshots/[project-slug]/screenshot_02.png',
]
---
```

### Content Structure

The main content should follow this pattern:

```markdown
## Getting Started

1. [Step description]
    ```bash
    [commands]
    ```
2. [Next step]
    ```yaml [filename]
    [config content]
    ```
3. [Continue steps...]
4. [Final step - usually accessing the application]
    - [Additional access info if needed]
```

## Installation Patterns

### Pattern 1: Simple Docker Run
For simple applications that don't require complex setup:

```markdown
1. Run docker 
    ```bash
    docker run -d --restart=always -p [PORT]:[PORT] -v [volume]:/path --name [container-name] [image]:[tag]
    ```
2. Open the browser and go to [http://localhost:[PORT]](http://localhost:[PORT]) to access the [Project Name].
```

### Pattern 2: Docker Compose with Single Service
For applications requiring a bit more configuration:

```markdown
1. Create a folder and move to the folder
    ```bash
    mkdir [project-name] && cd [project-name]
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    version: '3.8'
    services:
      [service-name]:
        image: [image-name]
        container_name: [container-name]
        ports:
          - '[PORT]:[PORT]'
        volumes:
          - [volume-name]:/path
        environment:
          - KEY=value
        restart: always
    
    volumes:
      [volume-name]:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:[PORT]](http://localhost:[PORT]) to access the [Project Name].
```

### Pattern 3: Docker Compose with Multiple Services
For applications with databases or multiple containers:

```markdown
1. Create a folder and move to the folder
    ```bash
    mkdir [project-name] && cd [project-name]
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    name: [project-name]
    services:
      app:
        image: [app-image]
        container_name: [app-container]
        ports:
          - '[PORT]:[PORT]'
        depends_on:
          - database
        environment:
          DB_HOST: database
          DB_USER: [user]
          DB_PASSWORD: [password]
        volumes:
          - app-data:/data
        restart: always
      
      database:
        image: postgres:16  # or mysql, redis, etc.
        container_name: [db-container]
        environment:
          POSTGRES_USER: [user]
          POSTGRES_PASSWORD: [password]
          POSTGRES_DB: [dbname]
        volumes:
          - db-data:/var/lib/postgresql/data
        restart: always
    
    volumes:
      app-data:
      db-data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:[PORT]](http://localhost:[PORT]) to access the [Project Name].
```

### Pattern 4: Complex Setup with Additional Files
For applications requiring environment files or initialization scripts:

```markdown
1. Create a folder and move to the folder
    ```bash
    mkdir [project-name] && cd [project-name]
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    [compose content]
    ```
3. Create a `[config-file]` file and add the following content:
    ```bash [filename.ext]
    [config content]
    ```
4. Create a `.env` file and add the following content:
    ```bash [.env]
    KEY=value
    ANOTHER_KEY=another_value
    ```
5. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
6. Open the browser and go to [http://localhost:[PORT]](http://localhost:[PORT]) to access the [Project Name].
```

### Pattern 5: Multi-Service with Initialization Wait
For complex applications (like PhotoPrism, Nextcloud, Gitlab) that need time to initialize databases and perform first-run setup:

```markdown
1. Create a folder and move to the folder
    ```bash
    mkdir [project-name] && cd [project-name]
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    services:
      app:
        image: [app-image]
        container_name: [app-container]
        ports:
          - '[PORT]:[PORT]'
        depends_on:
          - database
        environment:
          # Only essential variables for demo
          DB_HOST: database
          DB_NAME: [dbname]
          DB_USER: [user]
          DB_PASSWORD: demo
          ADMIN_USER: admin
          ADMIN_PASSWORD: demo
        volumes:
          - ./data:/app/data
      
      database:
        image: [db-image]
        container_name: [db-container]
        environment:
          MYSQL_ROOT_PASSWORD: demo
          MYSQL_DATABASE: [dbname]
          MYSQL_USER: [user]
          MYSQL_PASSWORD: demo
        volumes:
          - ./database:/var/lib/mysql
    ```
3. Start the containers:
    ```bash
    docker compose up -d
    ```
4. Wait for initialization (this may take 1-2 minutes on first run):
    ```bash
    docker compose logs -f [app-container]
    ```
    Look for startup completion messages like "ready", "started", or "listening on port" in the logs, then press Ctrl+C to exit
5. Open the browser and go to [http://localhost:[PORT]](http://localhost:[PORT])
    - Username: `admin`
    - Password: `demo`
```

**When to use this pattern:**
- Apps that require database schema creation (e.g., PhotoPrism, Nextcloud)
- Apps with initial indexing or setup processes
- Apps where immediate access after `docker compose up` would show errors or incomplete setup

**Key differences from Pattern 3:**
- Includes explicit waiting step with log monitoring
- Simpler environment variables (focus on authentication and DB connection only)
- Clear "ready" signal for users to know when to proceed
- Always use simple demo credentials: `admin` / `demo`

## Best Practices

### DO's (Demo-Focused):
- ✅ **Minimize configuration**: Only include environment variables necessary for the app to run
- ✅ **Use simple credentials**: Passwords like `demo`, `password`, or the project name for easy testing
- ✅ **Test locally before publishing**: Ensure the guide works from start to finish on a fresh system
- ✅ **Include wait times**: If initialization takes time, mention "Wait 1-2 minutes..." or show log monitoring
- ✅ **Provide immediate feedback**: Show users how to verify the service is ready (logs, status checks)
- ✅ **Keep it under 50 lines**: Shorter guides = easier to follow = better demo experience
- ✅ Use the official Docker image when available
- ✅ Include proper volume mounts for data persistence
- ✅ Use specific port numbers (check project defaults)
- ✅ Use descriptive container names
- ✅ Include links to localhost with proper ports in final steps
- ✅ Use ISO 8601 timestamps for createdAt/updatedAt
- ✅ Research the official documentation for best practices

### DON'Ts (Demo-Focused):
- ❌ **Don't overwhelm with options**: Avoid listing 20+ environment variables
- ❌ **Don't require configuration changes**: No "change this password immediately" warnings
- ❌ **Don't assume prior knowledge**: Every step should be copy-paste ready
- ❌ **Don't include production optimizations**: Buffer sizes, connection pools, etc. are unnecessary for demos
- ❌ **Don't skip initialization steps**: If the app needs time to start, include a waiting step
- ❌ **Don't use complex credential schemes**: No separate .env files unless absolutely necessary
- ❌ Don't use `latest` tag without reason (prefer specific versions when known to be stable)
- ❌ Don't expose unnecessary ports
- ❌ Don't skip volume definitions for stateful services
- ❌ Don't forget the final access URL

## Configuration Simplification Guide

When adapting official Docker Compose files for Snapdock, follow these simplification rules:

### 🔍 What to Remove

#### Security Settings (Demo doesn't need security hardening)
```yaml
# ❌ REMOVE
security_opt:
  - seccomp:unconfined
  - apparmor:unconfined
user: "1000:1000"
read_only: true
cap_drop:
  - ALL
```

#### Production Optimizations (Demo doesn't need performance tuning)
```yaml
# ❌ REMOVE
command: >
  --innodb-buffer-pool-size=512M
  --max-connections=512
  --innodb-lock-wait-timeout=120
deploy:
  resources:
    limits:
      memory: 4G
      cpus: '2.0'
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

#### Restart Policies (Demo is temporary, use minimal)
```yaml
# ❌ REMOVE complex restart configs
restart: always
stop_grace_period: 30s
stop_signal: SIGTERM

# ✅ KEEP simple (or omit entirely)
restart: unless-stopped
```

#### Feature Flags (Keep defaults, remove explicit disables)
```yaml
# ❌ REMOVE if they're just setting defaults
PHOTOPRISM_DISABLE_TLS: "false"
PHOTOPRISM_DISABLE_WEBDAV: "false"
PHOTOPRISM_DISABLE_FACES: "false"
PHOTOPRISM_DISABLE_CLASSIFICATION: "false"
# ... (20+ similar flags)

# ✅ KEEP only if enabling non-default features
PHOTOPRISM_DEMO_MODE: "true"
ENABLE_EXPERIMENTAL: "true"
```

#### Backup/Scheduling (Demo doesn't need automation)
```yaml
# ❌ REMOVE
BACKUP_SCHEDULE: "daily"
AUTO_BACKUP: "true"
CRON_EXPRESSION: "0 2 * * *"
INDEX_SCHEDULE: "0 3 * * *"
```

#### Verbose Logging/Monitoring (Demo doesn't need production logging)
```yaml
# ❌ REMOVE
LOG_LEVEL: "debug"
ENABLE_METRICS: "true"
SENTRY_DSN: "..."
TELEMETRY_ENABLED: "true"
```

### ✅ What to Keep

#### Essential Authentication
```yaml
# ✅ KEEP - Users need to log in
ADMIN_USER: "admin"
ADMIN_PASSWORD: "demo"
# or
DEFAULT_USER: "admin"
DEFAULT_PASSWORD: "demo"
```

#### Database Connection
```yaml
# ✅ KEEP - App needs to connect to DB
DB_HOST: database
DB_NAME: appdb
DB_USER: appuser
DB_PASSWORD: demo
```

#### Port Configuration
```yaml
# ✅ KEEP - Users need to access the app
ports:
  - "8080:8080"
```

#### Required Volumes
```yaml
# ✅ KEEP - For data persistence across restarts
volumes:
  - ./data:/app/data
  - ./database:/var/lib/mysql
```

#### Essential App Settings
```yaml
# ✅ KEEP - Only if required for basic functionality
SITE_URL: "http://localhost:8080"
LANGUAGE: "en"
TIMEZONE: "UTC"
```

### 📊 Before/After Example

#### Before (Production-focused, 111 lines - from actual PhotoPrism guide)
```yaml
services:
  photoprism:
    image: photoprism/photoprism:latest
    depends_on:
      - mariadb
    restart: unless-stopped
    security_opt:
      - seccomp:unconfined
      - apparmor:unconfined
    ports:
      - "2342:2342"
    environment:
      PHOTOPRISM_ADMIN_USER: "admin"
      PHOTOPRISM_ADMIN_PASSWORD: "insecure"
      PHOTOPRISM_AUTH_MODE: "password"
      PHOTOPRISM_SITE_URL: "http://localhost:2342/"
      PHOTOPRISM_DISABLE_TLS: "false"
      PHOTOPRISM_DEFAULT_TLS: "true"
      PHOTOPRISM_ORIGINALS_LIMIT: 5000
      PHOTOPRISM_HTTP_COMPRESSION: "gzip"
      PHOTOPRISM_LOG_LEVEL: "info"
      PHOTOPRISM_READONLY: "false"
      PHOTOPRISM_EXPERIMENTAL: "false"
      PHOTOPRISM_DISABLE_CHOWN: "false"
      PHOTOPRISM_DISABLE_WEBDAV: "false"
      PHOTOPRISM_DISABLE_SETTINGS: "false"
      PHOTOPRISM_DISABLE_TENSORFLOW: "false"
      PHOTOPRISM_DISABLE_FACES: "false"
      PHOTOPRISM_DISABLE_CLASSIFICATION: "false"
      PHOTOPRISM_DISABLE_VECTORS: "false"
      PHOTOPRISM_DISABLE_RAW: "false"
      PHOTOPRISM_RAW_PRESETS: "false"
      PHOTOPRISM_SIDECAR_YAML: "true"
      PHOTOPRISM_BACKUP_ALBUMS: "true"
      PHOTOPRISM_BACKUP_DATABASE: "true"
      PHOTOPRISM_BACKUP_SCHEDULE: "daily"
      PHOTOPRISM_INDEX_SCHEDULE: ""
      PHOTOPRISM_AUTO_INDEX: 300
      PHOTOPRISM_AUTO_IMPORT: -1
      PHOTOPRISM_DETECT_NSFW: "false"
      PHOTOPRISM_UPLOAD_NSFW: "true"
      # ... 50+ environment variables total
    volumes:
      - "./originals:/photoprism/originals"
      - "./storage:/photoprism/storage"

  mariadb:
    image: mariadb:11
    restart: unless-stopped
    stop_grace_period: 5s
    security_opt:
      - seccomp:unconfined
      - apparmor:unconfined
    command: >
      --innodb-buffer-pool-size=512M
      --transaction-isolation=READ-COMMITTED
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
      --max-connections=512
      --innodb-rollback-on-timeout=OFF
      --innodb-lock-wait-timeout=120
    volumes:
      - "./database:/var/lib/mysql"
    environment:
      MARIADB_AUTO_UPGRADE: "1"
      MARIADB_INITDB_SKIP_TZINFO: "1"
      MARIADB_DATABASE: "photoprism"
      MARIADB_USER: "photoprism"
      MARIADB_PASSWORD: "insecure"
      MARIADB_ROOT_PASSWORD: "insecure"
```

#### After (Demo-focused, ~45 lines)
```yaml
services:
  photoprism:
    image: photoprism/photoprism:latest
    container_name: photoprism
    ports:
      - "2342:2342"
    environment:
      PHOTOPRISM_ADMIN_USER: "admin"
      PHOTOPRISM_ADMIN_PASSWORD: "demo"
      PHOTOPRISM_DATABASE_DRIVER: "mysql"
      PHOTOPRISM_DATABASE_SERVER: "mariadb:3306"
      PHOTOPRISM_DATABASE_NAME: "photoprism"
      PHOTOPRISM_DATABASE_USER: "photoprism"
      PHOTOPRISM_DATABASE_PASSWORD: "demo"
      PHOTOPRISM_SITE_URL: "http://localhost:2342/"
    volumes:
      - ./originals:/photoprism/originals
      - ./storage:/photoprism/storage
    depends_on:
      - mariadb

  mariadb:
    image: mariadb:11
    container_name: photoprism_mariadb
    environment:
      MARIADB_ROOT_PASSWORD: "demo"
      MARIADB_DATABASE: "photoprism"
      MARIADB_USER: "photoprism"
      MARIADB_PASSWORD: "demo"
    volumes:
      - ./database:/var/lib/mysql
```

**Result**: 111 lines → 45 lines (59% reduction) while maintaining full functionality for demo purposes.

### 🎯 Simplification Checklist

When creating a guide, ask yourself:

- [ ] Can I remove this environment variable and the app still works for demo purposes?
- [ ] Is this setting only relevant for production/scaling scenarios?
- [ ] Would a first-time user understand why this setting exists?
- [ ] Can I use "demo" or "password" instead of "insecure" with change warnings?
- [ ] Does this configuration step require reading external documentation?
- [ ] Is the Docker Compose file under 50 lines?
- [ ] Have I removed all security hardening (seccomp, apparmor, user mapping)?
- [ ] Have I removed all performance optimizations (buffer sizes, connection limits)?
- [ ] Have I removed all feature flags that just set defaults?
- [ ] Are credentials simple and consistent (`admin` / `demo`)?

If you answered "yes" to the first two or "no" to items 3-5, simplify further.

## Tag Categories

Use relevant tags to categorize projects:

**Common Tags:**
- `monitoring` - System/service monitoring tools
- `automation` - Workflow and task automation
- `workflow` - Business process management
- `photo` - Photo management/gallery
- `video` - Video management
- `analytics` - Web/app analytics
- `cms` - Content Management Systems
- `wiki` - Documentation/knowledge base
- `crm` - Customer Relationship Management
- `erp` - Enterprise Resource Planning
- `finance` - Financial management
- `budget` - Budgeting tools
- `notes` - Note-taking applications
- `tasks` - Task/project management
- `calendar` - Calendar/scheduling
- `bookmarks` - Bookmark managers
- `pdf` - PDF tools
- `ai` - AI-powered features
- `database` - Database management
- `git` - Git repository hosting
- `ci-cd` - Continuous Integration/Deployment
- `dashboard` - Dashboard applications
- `logs` - Log management
- `backup` - Backup solutions
- `security` - Security tools
- `password` - Password managers

## File Naming Convention

- Use lowercase with hyphens: `project-name.md`
- Match the GitHub repository name when possible
- Keep it short but descriptive

## Logo Assets

- Store logos in: `/public/assets/images/logos/[project-slug].[png|svg]`
- Prefer SVG format when available
- Ensure logos are properly sized and optimized

## Screenshots (Optional)

If the project has a UI worth showcasing:
- Store in: `/public/assets/images/screenshots/[project-slug]/`
- Name sequentially: `screenshot_01.png`, `screenshot_02.png`, etc.
- Or use descriptive names: `[project-slug]_01.png`
- Keep file sizes reasonable (compress if needed)

## Workflow

When creating a new project guide:

1. **Research Phase**
   - Visit the project's official website
   - Read the official Docker documentation
   - Check the GitHub repository
   - Look for Docker Hub images
   - Note the default ports and configuration
   - **⚡ Demo Focus**: Identify minimum required configuration for basic functionality
   - **⚡ Demo Focus**: Check if official demo exists to understand what features should work immediately

2. **Metadata Collection**
   - Gather all required frontmatter fields
   - Download/locate the project logo
   - Identify relevant tags
   - Check if there's a live demo
   - **⚡ Demo Focus**: Note initialization time (does it need a waiting step?)

3. **Guide Creation**
   - Choose the appropriate installation pattern (prefer Pattern 1-3, use Pattern 5 if initialization takes time)
   - **⚡ Demo Focus**: Strip down official config to bare minimum (~30-50 lines max)
   - **⚡ Demo Focus**: Remove all production settings (see Configuration Simplification Guide)
   - Write clear, step-by-step instructions
   - Include proper code blocks with language hints
   - Add the final access URL with simple credentials (`admin` / `demo`)
   - **⚡ Demo Focus**: Add initialization waiting step if needed (Pattern 5)

4. **Verification**
   - Ensure all links work
   - Verify Docker image names and tags
   - Check port numbers
   - Validate YAML syntax
   - **⚡ Demo Focus**: Test on a fresh system - does it work from copy-paste to access in under 5 minutes?
   - **⚡ Demo Focus**: Verify no external documentation is needed to complete the guide

5. **File Placement**
   - Save as: `/content/projects/[project-slug].md`
   - Add logo to: `/public/assets/images/logos/`
   - Add screenshots if available
   - **⚡ Demo Focus**: Verify guide length is under 60 lines of markdown (excluding frontmatter)

## Example: Complete Guide

Here's a complete example for a fictional project:

```markdown
---
name: ExampleApp
description: A self-hosted example application for demonstration
logo: '/assets/images/logos/example-app.svg'
homepage: 'https://example-app.io/'
docker: 'https://docs.example-app.io/installation/docker'
github: 'https://github.com/example/example-app'
demo: 'https://demo.example-app.io/'
tags: ["dashboard", "monitoring", "analytics"]
published: true
createdAt: "2025-02-11T10:00:00.000Z"
updatedAt: "2025-02-11T10:00:00.000Z"
---

## Getting Started

1. Create a folder and move to the folder
    ```bash
    mkdir example-app && cd example-app
    ```
2. Create a `docker-compose.yml` file and add the following content:
    ```yaml [docker-compose.yml]
    version: '3.8'
    services:
      app:
        image: exampleapp/app:latest
        container_name: example_app
        ports:
          - '8080:8080'
        environment:
          - DATABASE_URL=postgresql://user:password@db:5432/exampledb
        volumes:
          - app-data:/data
        depends_on:
          - db
        restart: always
      
      db:
        image: postgres:16
        container_name: example_db
        environment:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: exampledb
        volumes:
          - db-data:/var/lib/postgresql/data
        restart: always
    
    volumes:
      app-data:
      db-data:
    ```
3. Run the following command to start the container:
    ```bash
    docker compose up -d
    ```
4. Open the browser and go to [http://localhost:8080](http://localhost:8080) to access the ExampleApp.
```

## Common Issues & Solutions

### Issue: Port Conflicts
If a port is already in use, change the external port:
```yaml
ports:
  - '8081:8080'  # Changed from 8080:8080
```

### Issue: Database Connection Errors
Ensure `depends_on` and `healthcheck` are properly configured:
```yaml
depends_on:
  database:
    condition: service_healthy
```

### Issue: Data Persistence
Always use named volumes for important data:
```yaml
volumes:
  - important-data:/app/data  # Named volume (persists)
```

## Quality Checklist

Before submitting a guide, verify:

- [ ] All frontmatter fields are present and correct
- [ ] Logo file exists and path is correct
- [ ] GitHub repository link is valid
- [ ] Docker image name is correct and available
- [ ] Port numbers are accurate
- [ ] Step numbering is sequential
- [ ] Code blocks have proper language hints
- [ ] Final access URL is included
- [ ] YAML indentation is correct (2 spaces)
- [ ] File is saved in `/content/projects/`
- [ ] Filename follows convention (lowercase with hyphens)
- [ ] Tags are relevant and from common categories
- [ ] Timestamps are in ISO 8601 format

## Tips for AI-Assisted Guide Creation

When using AI tools to create guides:

1. **Provide Context**: Share the project's official documentation
2. **Specify Pattern**: Mention which installation pattern fits best
3. **Verify Output**: Always cross-check generated configurations
4. **Test When Possible**: Run the Docker commands to ensure they work
5. **Follow Conventions**: Stick to the established patterns and naming
6. **Be Consistent**: Match the style of existing guides
7. **Update Timestamps**: Use current dates for new guides

---

## Summary

This skill ensures all Snapdock project guides are:
- **Consistent**: Following established patterns and structure
- **Complete**: Including all required metadata and steps
- **Clear**: Providing step-by-step instructions anyone can follow
- **Correct**: Using verified Docker configurations and accurate information
- **Maintainable**: Following conventions that make updates easy

Happy guide creating! 🚀
