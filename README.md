# Historia Magistra — leadership & geopolitics

A "lessons from the past" research apparatus: twelve public-domain texts from
philosophy, political theory, early modern globalization and military strategy
— Thucydides, Sun Tzŭ, Kautilya, Machiavelli, Grotius, Bacon, Mun, Hobbes,
Smith, Clausewitz, Mahan, Mackinder — curated for current C-level management
challenges.

Each work ships with a scholarly headnote, exact excerpts with paragraph-level
citation anchors, and an "executive lens." An introductory essay sets out the
historiographical case (and its limits, via Koselleck, Neustadt & May, and
Khong); an executive concordance maps eight current leadership challenges to
the exact passages that address their structure; an applications page bridges
to two live companion tools:

- [Ukraine War Monitor](https://ukraine-war-monitor.netlify.app/)
- [Geopolitical Analogist](https://geopolitical-analogist.netlify.app/)

## Architecture

Static site, no build step: `index.html` + `style.css` + `app.js`
(hash-routed single-page app) + `data/*.json` (one file per work, plus
`works.json` for corpus metadata). Deployable as-is via Netlify (drop or
repo link). No cookies, no analytics, no third-party requests; all assets
served from the site itself.

Companion in spirit to
[Calculemus — Philosophical Predecessors of AI](https://philosophical-predecessors-of-ai.netlify.app/),
which pioneered the format.

## Rights

All primary texts are in the United States public domain (youngest: Mackinder,
1904). Editorial matter CC BY 4.0 · code MIT · derived excerpt data CC0 —
see [LICENSES](LICENSES). Sources and editions are documented, edition by
edition, on the site's method page.
