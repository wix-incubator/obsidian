# Update a PR

Important: Steps 2 and 3 require `required_permissions: ['all']` because:
- Pre-commit hooks need access to global npm/node paths outside the workspace
- `gh` CLI has TLS certificate issues in sandboxed mode

## Step 1: Check state (ONE command)

```bash
git branch --show-current && git status -s && git diff HEAD --stat && gh pr view --json number,title,body -q '"\nPR #\(.number): \(.title)\n\nCurrent body:\n\(.body)"'
```

- Verify you're on a feature branch with an existing PR (not `main`)
- If no PR exists for this branch, suggest using `/create-pr` instead

## Step 2: Commit + Push (`required_permissions: ['all']`)

If uncommitted changes exist:

**If staged files exist** (respect user's selection):
```bash
git commit -m "<msg>" && git push
```

**If unstaged files exist** (add specific files, NOT `git add .`):
```bash
git add <file1> <file2> ... && git commit -m "<msg>" && git push
```

## Step 3: Update PR (`required_permissions: ['all']`)

Update the PR title and/or body to reflect the new changes. Incorporate the new commit(s) into the existing description.

**Format:**
```
<feature_area>: <Title> (80 chars max)

<TLDR> (1-2 sentences, updated to reflect all changes)

- bullet 1
- bullet 2
- bullet for new changes
```

**Update PR title and body:**
```bash
gh pr edit --title "<title>" --body "<body>"
```

**Update only body (if title is still accurate):**
```bash
gh pr edit --body "<body>"
```

Display confirmation with the PR URL as a markdown link: `[PR #<number>](<url>)`
