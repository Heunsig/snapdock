---
description: Intelligently stage files for commit
agent: general
---

Analyze the current git status and intelligently suggest which files should be staged together.

Follow these steps:

1. Check current status:
   - Run git status to see all modified, new, and deleted files
   - Run git diff to see the nature of changes in each file

2. Group files logically:
   - Group files by the type of change (feature, fix, docs, chore)
   - Consider which files are related and should be committed together
   - Separate unrelated changes that should be in different commits

3. Analyze each group:
   - Identify what each group of changes accomplishes
   - Suggest an appropriate commit type and scope for each group
   - Warn if mixing different types of changes

4. Present recommendations:
   - Show grouped files with reasoning
   - Suggest which group to stage first
   - Explain why files are grouped together

5. Ask which group to stage:
   - Offer options: stage suggested group, stage specific files, or stage all
   - After user confirms, execute git add commands

Example groupings:
- New project guide + logo + screenshots → docs(projects)
- Component changes + test updates → feat(component-name)
- Multiple dependency updates → chore(dependencies)
- Bug fix + related test → fix(scope)

Present the analysis clearly and ask which files to stage.
