---
description: Generate commit message based on staged changes
agent: general
---

Generate a conventional commit message for the current staged changes following the snapdock project's commit conventions.

Follow these steps:

1. Analyze recent commit patterns:
   - Check the last 20 commits to understand the project's commit style
   - Identify the most commonly used types and scopes

2. Examine staged changes:
   - Run git status to see what files are staged
   - Run git diff --cached to understand the nature of changes

3. Determine the appropriate commit type and scope:
   - Use the commit-message skill patterns from .agents/skills/commit-message/SKILL.md
   - Match file paths to types and scopes:
     * content/projects/*.md (new) → docs(projects): add <project-name> guide
     * content/projects/*.md (update) → docs(projects) or docs(<project-name>)
     * public/assets/images/screenshots/* → docs(<project-name>): add screenshots
     * package.json, pnpm-lock.yaml → chore(dependencies)
     * .agents/skills/* → chore(skills)
     * .opencode/commands/* → chore(commands)
     * components/* → feat or fix with appropriate scope
     * And other patterns from the skill file

4. Generate the commit message:
   - Format: <type>(<scope>): <description>
   - Use lowercase, imperative mood
   - Keep description clear and concise (under 72 characters)
   - No trailing period

5. Validate the message:
   - Ensure it follows conventional commits format
   - Check against project conventions
   - Compare with similar commits in history

6. Present the suggested commit message clearly and ask for confirmation

Reference examples from .agents/skills/commit-message/examples.txt if needed.
