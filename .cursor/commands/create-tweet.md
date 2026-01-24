# Create Tweet for @ObsidianDI

Generate a tweet for https://x.com/ObsidianDI about Obsidian dependency injection framework.

## Input Required

If no input is provided:

1. **Fetch recent merged PRs** using:
   ```bash
   gh pr list --state merged --limit 10 --json number,title,body,mergedAt --jq 'sort_by(.mergedAt) | reverse'
   ```

2. **Select 4 meaningful PRs** - Choose PRs that are tweet-worthy:
   - New features (`feat/`)
   - Notable bug fixes
   - Performance improvements
   - Breaking changes or major updates
   - Skip minor chores, dependency bumps, or internal refactors

3. **Present options using AskQuestion tool** with 5 choices:
   - Options 1-4: The 4 most tweet-worthy PRs (show PR title)
   - Option 5: "Other - I'll describe what to tweet about"

4. If user selects option 5, ask them to describe what the tweet should be about.

## Research Before Writing

Before writing the tweet, thoroughly understand the feature:

1. **Read the PR** - Use `gh pr view <number>` to get the full PR description, then review the changed files to understand the implementation scope.

2. **Read the documentation** - Review `packages/documentation/COMPLETE_DOCUMENTATION.md` to understand:
   - How the project works overall
   - How this feature fits into the broader Obsidian ecosystem
   - Related features that might be worth mentioning
   - The terminology and tone used in the docs

This research ensures the tweet accurately represents the feature and uses consistent messaging with the project's documentation.

## Tweet Guidelines

- **Max 280 characters** (X.com limit)
- Keep it concise and engaging
- Use relevant hashtags: #ReactJS #TypeScript #DependencyInjection #OpenSource
- Include a few emojis to make the post stand out (2-3 max, don't overdo it)
- Do NOT include installation instructions (e.g., `npm i react-obsidian`)
- Do NOT use abbreviations - they look unprofessional (e.g., use "performance" not "perf", "calculate" not "calc")

## Code Snippet (When Relevant)

For feature announcements that benefit from visual code examples:
1. Create a concise code snippet (5-15 lines max)
2. Write the snippet to `.cursor/snippets/tweet-<timestamp>.ts` (e.g., `tweet-1706123456.ts`) using appropriate extension
3. User opens the file and screenshots it with the **CodeSnap** extension

**Code snippet quality guidelines:**
- The example must be **logically coherent** - class names, method names, and functionality should all relate to the same domain
- Use realistic, relatable examples
- Don't mix unrelated concepts (e.g., a Calculator class shouldn't have a getUserData method)
- Keep it simple - show the feature's value without unnecessary complexity
- If showing multiple methods, they should all make sense together in the same class/context
- Do NOT use abbreviations in code or comments (e.g., use `calculate` not `calc`, `configuration` not `config`)

## Output Format

Provide:
1. The tweet text in a code block for easy copy-paste (with character count)
2. If applicable: create the snippet file at `.cursor/snippets/tweet-snippet.ts` and mention it
3. Suggested links to include (shortened if needed)

## Example Output

**Tweet (147 chars):**
```
🚀 Obsidian v2.0 is here! Introducing async providers for lazy dependency initialization.

#ReactJS #DependencyInjection ⚡
```

**Code snippet:** Created at `.cursor/snippets/tweet-1706123456.ts` - open and use CodeSnap to screenshot.
