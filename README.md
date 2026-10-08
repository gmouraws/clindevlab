# ClinDevLab — BUILD-002

ClinDevLab teaches clinical research software engineering to developers through original explanations and synthetic data.

Production website (prepared for launch; not deployed): **https://clindevlab.com**.

## What you can explore

- Eight guided articles covering clinical research, EDC, CDISC and clinical data modeling.
- Six SDTM domain lessons: DM, AE, CM, EX, LB and VS; 44 contextual variable lessons.
- A 24-term glossary, three synthetic walkthroughs with JSON/CSV downloads, and local search.
- Responsive tables with complete record-reading alternatives and source attribution.

Teaching context: **SDTM 2.0 / SDTMIG 3.4**, content edition 1.0.0. Official metadata and controlled terminology are not bundled. All examples are synthetic. ClinDevLab is independent educational material, not a certified validator, complete standards catalog or regulatory submission tool.

## Run locally

Use Node 22.23.3 and npm 10.9.2, then:

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4173. For editing, run `npm run dev` after the first build; it uses localhost:3000. Builds need no API keys, external standards service or secrets.

## Verification

```sh
npx playwright install --with-deps chromium firefox webkit
npm run check:release
npm audit --audit-level=high
```

The release gate checks types, lint, units, content/provenance, the static export, browsers, accessibility, responsive layouts and production-mode performance. It tests the approved canonical origin locally and restores a noindex preview afterward; it does not deploy. Stop an existing preview before the gate so the server reads current CSP hashes.

Focused commands: `content:check`, `typecheck`, `lint`, `test`, `build`, `test:e2e`, `check:licenses`, `check:benchmark`. Evidence is generated under ignored `artifacts/`, `playwright-report/` and `test-results/` directories.

## Architecture and content

Static Next.js/React/TypeScript export, local MDX and validated authored JSON. Small client components handle search, filters, tables and code controls. No database, accounts, uploads, analytics or runtime API.

Edit lessons in `content/learn/`, reference lessons/examples in `data/authored/`, and source/permission records in `data/provenance/`. Executable MDX and unapproved metadata are rejected. The build validates inputs before generating search or downloads. Official publisher material is linked rather than reproduced.

## Licensing

No outbound license has been selected for original ClinDevLab code/content; public source availability does not grant a reuse license. The owner has authorized initial source publication in this state. Dependencies retain their own licenses and complete collected notices, generated on every build. External clinical standards and terminology retain their publishers' rights; no third-party rights are claimed. See [licensing and source policy](docs/DATA-SOURCES-AND-LICENSING.md).

## Release and engineering records

[Release readiness and production procedure](docs/RELEASE-V1.md) records the audit, publication status, owner checkpoint and deployment steps. [Implementation report](docs/IMPLEMENTATION-REPORT.md) preserves BUILD-002 evidence. [Architecture](docs/TECHNICAL-ARCHITECTURE.md), [design](docs/DESIGN-SYSTEM.md), [acceptance criteria](docs/ACCEPTANCE-CRITERIA.md) and [decisions](docs/DECISION-LOG.md) retain engineering history. Discovery documents are historical baselines; later release decisions supersede their pending-phase wording.

No merge, Vercel deployment or DNS changes are authorized before the release PR owner checkpoint.
