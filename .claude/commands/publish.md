# /publish — Autonomous Simulator Publisher

## What this does

Full end-to-end, zero-interaction publish pipeline. Drop an HTML file in `public/simulations/`, run `/publish`, and the agent team handles everything:

1. **Scout** — finds the new file, reads it, infers all metadata
2. **Design Enforcer** — restyles HTML to match the blog design system
3. **Content Wirer** — registers the post in `posts.ts`, wires category infrastructure if new
4. **Test Guardian** — updates test counts, runs the suite, fixes failures
5. **Deploy Agent** — runs quality gates, commits, and pushes to GitHub Pages

No user questions. Fully autonomous.

---

## Execution

When `/publish` is invoked, follow these phases in order. Each phase uses a sub-agent (spawn with the Agent tool). Wait for each agent to complete before starting the next.

---

### Phase 1 — Scout

Spawn the **scout** sub-agent with this prompt:

```
You are the Scout agent. Follow your agent instructions exactly.

Working directory: c:/Users/advir/Desktop/Coding/Blog

Find any unregistered HTML simulator files in public/simulations/, read the HTML content, and infer all publish metadata autonomously. Return the SCOUT_RESULT JSON block.
```

Parse the `SCOUT_RESULT:` JSON from the Scout's output.

**If Scout reports `STATUS: NO_NEW_FILES`:**
Tell the user:
> No new HTML files found in `public/simulations/`. Drop your `.html` file there and run `/publish` again.

Then stop.

---

### Phase 2 — Design Enforcer

Spawn the **design-enforcer** sub-agent with this prompt (substitute values from Scout result):

```
You are the Design Enforcer agent. Follow your agent instructions exactly.

Working directory: c:/Users/advir/Desktop/Coding/Blog

Inputs:
- htmlFile: <scout.htmlFile>
- category: <scout.category>
- metadata: <paste full Scout JSON>

Audit and restyle the HTML file to match the KB blog design system. Write the updated file in place. Report DESIGN_ENFORCER_RESULT when done.
```

Wait for `DESIGN_ENFORCER_RESULT: DONE` before continuing.

---

### Phase 3 — Content Wirer

Spawn the **content-wirer** sub-agent with this prompt:

```
You are the Content Wirer agent. Follow your agent instructions exactly.

Working directory: c:/Users/advir/Desktop/Coding/Blog

Add the following post to src/lib/posts.ts. If isNewCategory is true, also create the full category infrastructure.

Metadata:
<paste full Scout JSON>

Report CONTENT_WIRER_RESULT when done.
```

Wait for `CONTENT_WIRER_RESULT: DONE` before continuing.

---

### Phase 4 — Test Guardian

Spawn the **test-guardian** sub-agent with this prompt:

```
You are the Test Guardian agent. Follow your agent instructions exactly.

Working directory: c:/Users/advir/Desktop/Coding/Blog

Update tests/lib/posts.test.ts for the new post:
- slug: <scout.slug>
- category: <scout.category>
- isNewCategory: <scout.isNewCategory>
- newCategorySlug: <scout.category if isNewCategory, else 'n/a'>
- newCategoryLabel: <scout.newCategoryLabel if isNewCategory, else 'n/a'>

Run pnpm test. Fix any failures. Report TEST_GUARDIAN_RESULT when all tests pass.
```

Wait for `TEST_GUARDIAN_RESULT: DONE` before continuing.

If Test Guardian reports `TEST_GUARDIAN_RESULT: FAILED`, stop and report the failure to the user. Do NOT proceed to Deploy.

---

### Phase 5 — Deploy Agent

Spawn the **deploy-agent** sub-agent with this prompt:

```
You are the Deploy Agent. Follow your agent instructions exactly.

Working directory: c:/Users/advir/Desktop/Coding/Blog

Run quality gates then commit and push:
- slug: <scout.slug>
- category: <scout.category>
- title: <scout.title>
- isNewCategory: <scout.isNewCategory>
- htmlFile: <scout.htmlFile>

Run pnpm ingest, pnpm tsc --noEmit, pnpm test in sequence. Only commit and push if all pass. Report DEPLOY_AGENT_RESULT when done.
```

---

### Final report to user

After Deploy Agent completes, report the following:

```
✅ Published: <title>

Post:     https://advirao.github.io/blog/<category>/<slug>
Category: https://advirao.github.io/blog/<category>
Actions:  https://github.com/Advirao/blog/actions

Live in ~2 minutes after GitHub Actions completes.
```

If a new category was created, add:
```
New category "<newCategoryLabel>" is live at /blog/<new-slug>
```

---

## Agent Team Summary

| Agent | Role | Runs after |
|---|---|---|
| **scout** | Finds HTML, reads content, infers all metadata | — (first) |
| **design-enforcer** | Restyles HTML: fonts, CSS vars, dark mode, mobile, tabs | scout |
| **content-wirer** | Registers post in posts.ts; builds category infra if new | design-enforcer |
| **test-guardian** | Updates test counts, runs suite, fixes failures | content-wirer |
| **deploy-agent** | pnpm ingest + tsc + test → git commit → git push | test-guardian |

All agents are defined in `.claude/agents/`. They run sequentially — each waits for the previous to succeed before starting.
