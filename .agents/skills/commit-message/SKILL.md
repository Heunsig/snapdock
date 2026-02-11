# Snapdock Commit Message Guide

A skill for generating consistent Git commit messages based on Conventional Commits specification and this project's commit history patterns.

## Overview

This skill helps you write commit messages that follow the snapdock project's conventions by:
1. Analyzing recent commit history to understand patterns
2. Examining staged changes
3. Suggesting appropriate commit messages
4. Validating message format

## When to Use This Skill

Use this skill whenever you need to create a Git commit message. The AI will automatically:
- Analyze the last 20 commits for patterns
- Check staged changes with `git diff --cached`
- Match file paths to appropriate types and scopes
- Generate a properly formatted commit message
- Validate the message against project conventions

## Workflow

When a user requests a commit message, follow these steps:

### Step 1: Analyze Recent Commits
```bash
git log --oneline -20
git log --pretty=format:"%s" | grep -oE "^[a-z]+(\([a-z-]+\))?" | sort | uniq -c | sort -rn
```

This shows the most frequently used commit types and scopes.

### Step 2: Check Staged Changes
```bash
git status
git diff --cached
```

Understand what files are being changed and the nature of the changes.

### Step 3: Match Patterns

Based on file paths and change types, determine the appropriate commit type and scope:

#### File Path → Type & Scope Mapping

| File Pattern | Type | Scope | Example |
|--------------|------|-------|---------|
| `content/projects/*.md` (new) | `docs` | `projects` | `docs(projects): add photoprism guide` |
| `content/projects/*.md` (update) | `docs` | `projects` or project name | `docs(photoprism): update installation steps` |
| `public/assets/images/logos/*` | `docs` | `projects` or project name | `docs(projects): add project logo` |
| `public/assets/images/screenshots/*` | `docs` | project name | `docs(photoprism): add screenshots` |
| `package.json`, `pnpm-lock.yaml` | `chore` | `dependencies` | `chore(dependencies): update @nuxt/ui to v4.1.0` |
| `.cursorrules` | `chore` | `cursorrules` | `chore(cursorrules): add commit guidelines` |
| `.agents/skills/*` | `chore` | `skills` | `chore(skills): add commit-message skill` |
| `README.md` | `docs` | `README` | `docs(README): add installation instructions` |
| `components/*` (new feature) | `feat` | `component` or specific | `feat(ProjectCard): add date display` |
| `components/*` (bug fix) | `fix` | `component` or specific | `fix(ProsePre): add text color` |
| `pages/*`, `app.vue` | `feat` or `fix` | `app` or `layout` | `feat(app): add loading indicator` |
| Code refactoring | `refactor` | relevant scope | `refactor(projects): simplify data fetching` |
| CSS/styling only | `style` | relevant scope | `style(ProsePre): update background color` |

### Step 4: Generate Commit Message

Use this template:

```
<type>(<scope>): <description>
```

**Rules:**
- All lowercase
- Use imperative mood (add, update, fix, implement, not added, updated, fixed)
- No period at the end
- Description should be clear and concise (under 72 characters)
- No body unless absolutely necessary (rare in this project)

### Step 5: Validate Message

Check that the message follows these rules:

✅ **Valid:**
- Type is lowercase: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`
- Scope is lowercase, in parentheses, may contain hyphens: `(projects)`, `(github-stars)`
- Colon and space after scope: `: `
- Description starts with lowercase verb
- No trailing period

❌ **Invalid:**
- Uppercase type or scope: `Feat`, `DOCS`
- Description starts with uppercase: `Add feature`
- Past tense verbs: `added`, `updated`
- Trailing period: `add feature.`
- Emojis (unless user specifically requests)

## Commit Type Usage Frequency

Based on historical analysis of this project:

| Type | Usage | Primary Use Cases |
|------|-------|-------------------|
| `docs(projects)` | ⭐⭐⭐⭐⭐ (Most common) | Adding new project guides, screenshots, metadata |
| `feat` | ⭐⭐⭐⭐ | New features, UI improvements, functionality |
| `chore` | ⭐⭐⭐ | Dependencies, automated updates, tooling |
| `fix` | ⭐⭐⭐ | Bug fixes, accessibility improvements |
| `refactor` | ⭐⭐ | Code structure improvements |
| `style` | ⭐ | CSS/styling changes only |

## Common Commit Patterns

### Adding New Project Guides
```
docs(projects): add <project-name> guide
```

Examples:
- `docs(projects): add PhotoPrism guide`
- `docs(projects): add n8n guide`
- `docs(projects): add Alexandrie project documentation and assets`

### Adding Screenshots
```
docs(<project-name>): add screenshots
```

Examples:
- `docs(kener): add screenshots for Kener project`
- `docs(memos): add screenshots for Memos project`
- `docs(hyperdx): add screenshots for Hyper DX project`

### Updating Project Details
```
docs(<project-name>): <action> <what>
docs(projects): <action> <what>
```

Examples:
- `docs(projects): update project details with GitHub links and tags`
- `docs(yamtrack): remove outdated screenshot from Yamtrack project`
- `docs(hyperdx): update updatedAt timestamp`

### New Features
```
feat(<scope>): <action> <feature-description>
```

Examples:
- `feat(projects): implement swipe navigation for image gallery`
- `feat(ui): implement color mode selection`
- `feat(github-stars): add script to fetch GitHub stars for projects`
- `feat: only the currently expanded image is displayed, improving performance and user experience`

### Dependency Updates
```
chore(dependencies): update <package-name> to <version>
chore(dependencies): <action> <description>
```

Examples:
- `chore(dependencies): update @nuxt/ui to v4.1.0`
- `chore(dependencies): update package versions for Nuxt and related libraries`

### GitHub Stars Updates
```
chore(github-stars-report): update star and fork counts for multiple projects
chore(github-stars-report): update project star and fork counts
```

### Bug Fixes
```
fix(<scope>): <action> <issue-description>
```

Examples:
- `fix(projects): add tabindex to project links for accessibility`
- `fix(projects): enhance modal styles and image container`
- `fix(ProsePre): add text color for plain text`
- `fix(config): change primary color to yellow`

### Refactoring
```
refactor(<scope>): <action> <what-improved>
```

Examples:
- `refactor(projects): simplify data fetching for projects`
- `refactor(projects): enhance image handling and update styles`
- `refactor: adopt Nuxt 4 folder structure`

### Tooling and Configuration
```
chore(<scope>): <action> <description>
```

Examples:
- `chore(skills): add snapdock-guide skill for demo-focused guide creation`
- `chore(cursorrules): add commit message guidelines and conventions`
- `chore: upgrade Nuxt UI to v3`

## Decision Tree

When generating a commit message, ask yourself:

1. **What files changed?**
   - `content/projects/*.md` → Likely `docs(projects)`
   - `components/*`, `pages/*` → Likely `feat` or `fix`
   - `package.json` → Likely `chore(dependencies)`
   - Multiple types → Ask user or pick primary change

2. **What's the nature of the change?**
   - New file/feature → `feat` or `docs`
   - Bug fix → `fix`
   - Update/improve → `feat` or `docs` depending on context
   - Code structure → `refactor`
   - Dependencies → `chore(dependencies)`

3. **Is there a specific scope?**
   - Project guides → `(projects)` or `(project-name)`
   - UI components → `(component-name)` or `(ui)`
   - App-wide → `(app)` or `(layout)`
   - Tools → `(skills)`, `(cursorrules)`
   - Dependencies → `(dependencies)`
   - GitHub data → `(github-stars-report)`

4. **Generate and validate:**
   - Format: `type(scope): description`
   - Lowercase, imperative mood, concise
   - No period at end

## Interactive Process

When the user asks for a commit message:

1. **Analyze** the git history and staged changes
2. **Present findings**: "I found changes to: [file list]"
3. **Determine type/scope** based on patterns
4. **Generate message**: "Suggested commit message: `<message>`"
5. **Ask for confirmation**: "Does this look good, or would you like me to adjust it?"
6. **Validate** before final suggestion

## Examples from Real Commit History

```bash
# Project documentation (most common)
docs(projects): add PhotoPrism guide
docs(projects): add metadata-remote guide
docs(projects): add n8n guide
docs(projects): add Alexandrie project documentation and assets
docs(projects): add termix docker guide
docs(projects): add teable guide
docs(projects): add it-tools guide

# Project screenshots
docs(kener): add screenshots for Kener project
docs(memos): add screenshots for Memos project
docs(ackee): add screenshots
docs(formbricks): add screenshots

# Features
feat(projects): implement swipe navigation for image gallery
feat(ui): implement color mode selection
feat(github-stars): integrate GitHub stars display in project details
feat(app): add loading indicator to the main layout
feat: only the currently expanded image is displayed, improving performance and user experience

# Dependencies
chore(dependencies): update @nuxt/ui to v4.1.0
chore(dependencies): update package versions for Nuxt and related libraries

# Fixes
fix(projects): add tabindex to project links for accessibility
fix(projects): enhance modal styles and image container
fix(ProsePre): add text color for plain text

# Refactoring
refactor(projects): simplify data fetching for projects
refactor(projects): enhance image handling and update styles
refactor: adopt Nuxt 4 folder structure

# README updates
docs(README): add main page screenshot
docs(README): add instructions for fetching GitHub stars

# Chores
chore(skills): add snapdock-guide skill for demo-focused guide creation
chore(github-stars-report): update star and fork counts for multiple projects
chore: upgrade Nuxt UI to v3
```

## Tips for AI

- **Always analyze before suggesting**: Don't guess, check the actual git history
- **Be consistent**: Follow the established patterns in the project
- **Be specific**: Use project names in scopes when adding screenshots
- **Ask when uncertain**: If multiple patterns fit, ask the user
- **Validate**: Double-check the format before suggesting
- **Learn**: If the user corrects you, remember their preference

## Output Format

When presenting a commit message to the user:

```
Based on the staged changes, I suggest:

`<type>(<scope>): <description>`

This follows the project's convention because:
- Type `<type>` is appropriate for [reason]
- Scope `<scope>` matches [pattern]
- Similar recent commits: [example]

Would you like me to use this message?
```
