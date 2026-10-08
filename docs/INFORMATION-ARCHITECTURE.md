# Information architecture

Product design dated 2026-10-08. Route spellings and stable IDs below are implementation contracts.

## Navigation

Top-level: Learn, Explore, Reference, Search. Brand goes home. Phones and tablets use a disclosure menu with focus return; persistent section navigation is optional from 1200px, and a separate contents rail is optional from 1600px. When a rail is absent its links remain in an in-page disclosure. Follow DESIGN-SYSTEM's content-driven layout bands; no destination or essential data disappears at a breakpoint. Footer: About, Privacy, Sources and versions. A skip link precedes the header. No account menu. ClinDevLab's original scientific-field-guide composition must not inherit Blueprint's visual system or an unchanged documentation template.

## Routes

- `/`: landing.
- `/learn/`: ordered eight-article learning path.
- `/learn/{slug}/`: exact article slugs from MVP-SPECIFICATION.
- `/explore/`: overview of the curated explorer and examples.
- `/explore/sdtm/`: available teaching profiles; V1 has one explicit profile link, not an auto-redirect.
- `/explore/sdtm/2-0/ig/3-4/`: domain index.
- `/explore/sdtm/2-0/ig/3-4/domains/{domain}/`: six lowercase domain slugs.
- `/explore/sdtm/2-0/ig/3-4/domains/{domain}/variables/{variable}/`: lowercase variable slug, display uppercase identifier; 44 records.
- `/explore/sdtm/2-0/ig/3-4/variables/`: selected variable index.
- `/explore/terminology/`: terminology explanation and official links; always exists.
- `/explore/terminology/2026-09-25/{codelistId}/`: optional verified lists only; case of IDs preserved as canonical source identifiers. No placeholder pages if absent.
- `/examples/` and `/examples/{subject-identity|vital-signs-rows|adverse-events-timing}/`.
- `/reference/glossary/`: 24 entries with stable kebab-case fragments.
- `/reference/resources/`, `/reference/standards-and-versions/`, `/reference/sources/`.
- `/search/`, `/about/`, `/privacy/`, and a true 404 document.

Static downloads: `/examples-data/1.0.0/{exampleId}/{input.json|output.json|output.csv|manifest.json}`. Asset paths are content-release-specific, same origin, and immutable for published releases.

## Content graph

Article links to relevant domains and examples. Domain owns variable lessons; variable owns its context-specific example and source references. Example links to all variables it actually demonstrates. Glossary concepts link back to relevant articles. Source records are shared by ID; every visible data-source card resolves to the same provenance register used by validation.

Breadcrumbs: Home → Explore → SDTM 2.0 / IG 3.4 → Domain → Variable. A variable's canonical identity includes the domain; do not collapse six STUDYID lessons into one ambiguous route. Reused prose can be generated from an original teaching fragment without erasing context.

## Deep links, versioning and state

Use lowercase kebab-case article/route slugs and uppercase display codes. Fixed section anchors: `#overview`, `#variables`, `#examples`, `#sources`. Do not derive these from mutable heading text. Domain filter state: `#class=findings&q=lab`; search: `#q=USUBJID&kind=variable&domain=dm`. Allowed kinds: article, domain, variable, example, glossary, terminology. Unknown keys are ignored; values are decoded safely and capped at 120 characters for q. Use replaceState while typing and pushState on explicit search/filter submission; restore state on back/forward. Hash values remain user-visible and must never be sent to telemetry.

A release context banner separates model, IG, content release and optional CT release. “Latest” is not a canonical path. Old published version paths remain stable; superseding releases require new records and redirects only for renamed authored content. Missing versions and unknown variable/domain combinations return 404, not the nearest available page.

## Search contract

Build one deterministic index from published records. Search tokens use Unicode normalization, case folding and whitespace splitting. Literal matching only; no user regex. Score: exact displayed code 100, code prefix 60, exact title 40, title token 20, keyword token 10, description token 3. Sum token matches; require every query token to match at least one indexed field. Resolve ties by kind order (domain, variable, article, example, glossary, terminology), title, then URL. Rank exact codes before aggregate scores with an explicit primary exact-match flag. Filters apply before ranking. No fuzzy matching in V1.

Empty query shows selected browse links, not every index record. A query with no match displays the query as escaped text and offers clear filters plus resources. Results show title, kind, domain context where applicable, original short description and teaching profile. No raw HTML snippets. Load index on first search focus/use; stale failed loads give retry plus browse links. Without JavaScript, display links to the domain, variable and learning indexes.

## SEO and URL policy

Canonical URLs omit fragments. Static unique titles/descriptions, sitemap and robots are generated from the route manifest; no search-state URLs in sitemap. Search page is noindex. Preview artifacts are noindex and must not assert a production origin. Public canonical origin must be supplied at production preparation; do not invent or purchase a domain. Include breadcrumb structured data only where visible breadcrumbs exist; no ratings, credentials or certification markup. Broken internal links, fragments and route collisions fail the build.

## Pre-release refinement — 2026-10-08

Primary header links are exposed directly from 1024px, with the accessible disclosure below that width. Section navigation retains its separate 1200px threshold. The product-focused footer links to `/legal/` (Privacy & legal); `/legal/third-party-licenses/` provides readable software acknowledgments and links to complete notices and the generated inventory. `/privacy/` remains available. About contains discreet creator attribution and verified public GitHub/Blueprint links; no personal attribution is added to the homepage or footer.
