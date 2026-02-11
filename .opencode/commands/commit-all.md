---
description: Full workflow - analyze, stage, generate message, and commit
agent: general
---

Execute a complete commit workflow from analysis to commit creation.

Follow these steps:

1. Analyze changes:
   - Run git status to see all changes
   - Run git diff to understand the nature of changes
   - Check the last 20 commits for pattern analysis

2. Determine what to stage:
   - Analyze which files logically belong together
   - Group related changes
   - Ask user to confirm which files to stage
   - If there are unrelated changes, warn and suggest splitting into multiple commits

3. Stage the files:
   - Execute git add for the selected files
   - Confirm what was staged

4. Generate commit message:
   - Use the commit-message skill patterns from .agents/skills/commit-message/SKILL.md
   - Match file paths to appropriate types and scopes
   - Generate a conventional commit message following project conventions
   - Format: <type>(<scope>): <description>

5. Validate and present:
   - Show the complete commit that will be created
   - Display: files staged + commit message
   - Show similar commits from history for reference

6. Execute commit:
   - Ask for final confirmation
   - If confirmed, execute git commit -m "<message>"
   - Show the commit hash and summary

7. Post-commit status:
   - Run git status to show clean state
   - Run git log -1 to show the created commit

Reference .agents/skills/commit-message/SKILL.md for commit message conventions.

Present each step clearly and ask for confirmation before proceeding to the next step.
