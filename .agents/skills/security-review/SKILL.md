---
name: security-review
description: Reviews a diff or a design for injection, authorization, secret exposure, and unsafe data handling. Use when reviewing code before merge, when handling user input, authentication, file paths, or database queries, or when asked for a security check.
---

# Security review

## Method: follow untrusted input

Start at every point where data enters the system — request body, query string,
headers, uploaded file, environment, a third-party API response, database rows
written by users — and follow each one until it either gets validated or reaches
something dangerous.

Dangerous destinations:

| Destination | Risk | Correct handling |
| --- | --- | --- |
| SQL string | Injection | Parameterised query. Never string interpolation. |
| Shell command | Command injection | Argument array, no shell. Never `shell=True` with input. |
| File path | Path traversal | Resolve, then confirm it is inside the allowed root. |
| HTML or template | XSS | Context-aware escaping. Never mark user input as safe. |
| Deserialiser | RCE | Never `pickle`, `yaml.load`, or `eval` on untrusted input. |
| Outbound URL | SSRF | Allowlist the host. Block private ranges and redirects to them. |
| Log line | Data leak | Never log tokens, passwords, or full payment fields. |

## Authorization checklist

- Is there an authorization check on **every** state change, not just on the read
  that renders the page?
- Is the check on the **object**, not just the endpoint? (Can user A pass user
  B's record id and succeed?)
- Does a failed check return the same shape as "not found", so it does not leak
  existence?

## Secrets

- No key, token, password, or connection string in the diff, in a test fixture,
  in a comment, or in a default argument.
- Config comes from the environment. The repository holds the variable name and
  a placeholder, never the value.
- If a secret was ever committed, rotating it is the fix. Deleting the line is
  not.

## Common findings worth checking every time

- Secret compared with `==` — timing leak. Use a constant-time compare.
- Error message echoing the query, the stack trace, or the internal path back to
  the caller.
- Rate limiting missing on login, password reset, and any endpoint that sends
  mail.
- A redirect target taken from user input without an allowlist.

## Reporting

One finding per line, with the concrete failing input:

```
api/users.py:88  BLOCKER  user_id from query used in f-string SQL; ?id=1 OR 1=1 dumps all rows. Use a parameterised query.
```

Report only what you can trace to a real failing input. A speculative finding
costs the reader more than it saves.
