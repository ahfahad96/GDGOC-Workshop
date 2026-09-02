---
name: conventional-commits
description: Writes commit messages in Conventional Commits format with a subject that says the behaviour change and a body that says why. Use when committing, staging changes, or when asked to write a commit message or changelog entry.
---

# Conventional commits

## Format

```
<type>(<scope>): <subject>

<body — why, not what>

<footer — BREAKING CHANGE, refs>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
`ci`, `chore`, `revert`.

## Subject rules

- 50 characters or fewer
- imperative mood: "add", not "added" or "adds"
- lowercase after the colon, no trailing period
- describe the behaviour change, not the file edit

| Weak | Strong |
| --- | --- |
| `fix: bug fix` | `fix(auth): reject tokens issued before password reset` |
| `chore: update code` | `refactor(api): move rate limiting into middleware` |
| `feat: changes to user.py` | `feat(users): allow soft delete with 30-day recovery` |

## When to write a body

Write one when the "why" is not visible from the diff:

```
fix(cache): invalidate on write instead of on a 60s timer

Two writes inside one window left the second one invisible until the
timer expired, so the UI showed stale totals for up to a minute.
Invalidating on write costs one extra round trip per write.
```

Skip the body for genuinely obvious changes (`docs: fix typo in README`).

## Breaking changes

```
feat(api)!: return 404 instead of empty list for unknown user

BREAKING CHANGE: callers relying on an empty list must now handle 404.
```

## Anti-patterns

- One commit doing three unrelated things. Split it.
- A body that restates the diff line by line.
- `chore:` used as a dumping ground for real behaviour changes.
