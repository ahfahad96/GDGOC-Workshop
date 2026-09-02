# Backlog

Pipeline input. `/spec` reads one item from here and turns it into
`docs/01-spec.md`.

Pick **one** item per run. Delete the rest, or add your own.

---

## Item 1 — Link shortener

Users paste a long URL and get a short one back. Short links should keep working
after a year. We want to know how many times each link was opened.

## Item 2 — Session timeout

People complain they get logged out mid-form and lose their work. Nobody has
written down what the timeout actually is or when it resets.

## Item 3 — Bulk CSV import

Ops uploads a spreadsheet of new users once a week and currently adds them one
by one through the admin screen. It takes an afternoon and they make typos.

---

## Writing your own item

Keep it to three or four sentences, and state the **problem**, not the solution.
"The dashboard takes nine seconds to load" gives the pipeline something to reason
about. "Add a Redis cache" skips the reasoning and hides the actual constraint.
