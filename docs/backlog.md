# Backlog

Pipeline input. `/spec` reads one item from here and turns it into
`docs/01-spec.md`.

Pick **one** item per run. Delete the rest, or add your own.

---

## Item 0 — GDGoC chapter landing page  *(recommended for the live demo)*

Students hear about our GDGoC chapter from a friend, a poster, or a talk, and
then have nowhere to go — we send them a Google Form link in a WhatsApp message
that scrolls away by the next morning. People ask us in person what the chapter
actually does, when things happen, and how to join, and we answer it one
conversation at a time. Most of them are asking on a phone.

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

Notice what Item 0 does *not* say: it never says "build a website", never says
"make it look good", and never names a colour, a font, or a section. It says who
is stuck, what they are stuck on, and one hard fact about them — they are on a
phone. Everything else is the spec stage's job. If you write the solution into
the backlog, stage 1 has nothing left to do and you have skipped the only cheap
place to change direction.
