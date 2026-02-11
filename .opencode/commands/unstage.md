---
description: Unstage files from staging area
agent: general
---

Analyze staged files and help unstage them selectively.

Follow these steps:

1. Check what's staged:
   - Run git status to see staged files
   - Run git diff --cached to see the actual changes

2. Present staged files:
   - List all staged files with their change type (modified, new, deleted)
   - Show a brief summary of changes in each file

3. Offer unstaging options:
   - Unstage all files
   - Unstage specific files
   - Unstage by pattern (e.g., all screenshots, all in a directory)

4. Execute based on user choice:
   - Use git restore --staged <files> for specific files
   - Use git restore --staged . for all files

5. Confirm the action:
   - Show which files were unstaged
   - Show the new git status

Present the options clearly and ask which files to unstage.
