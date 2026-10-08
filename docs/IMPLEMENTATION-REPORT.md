# Implementation report — ClinDevLab BUILD-002

2026-10-08. Reviewable local release candidate delivered. The complete release command and the final typography/copy browser/performance refresh passed. The final artifact is restored to noindex preview mode. Manual accessibility and publication gates remain; this is not a fully release-verified or deployed product.

## Delivered scope and M1–M11 status

- **M1 complete locally:** dependency/runtime pins, lockfile, format/lint/typecheck and clean npm installation using Node 22.23.3. The host began with Node 22.17.0; a temporary copy of the pinned project runtime ran the clean-install check and was removed. No global configuration changed.
- **M2 complete locally:** static Next.js App Router export, 76 public content/index routes, genuine 404 and loopback preview server. No database, accounts, uploads, runtime backend, remote MDX, analytics or external fonts/assets.
- **M3 complete for local automated scope:** independent scientific-field-guide identity, responsive navigation, complete table/record modes, stacked metadata, source/version context and code controls. Metadata/data text is at least 14px; the small brand-edition mark is decorative. Manual accessibility supplements remain below.
- **M4 complete locally:** eight substantive original articles with objectives, prerequisites, worked explanations, pitfalls, related reading and sources; glossary and supporting pages. Local JSON-front-matter MDX accepts Markdown only; executable MDX, JSX, imports, raw HTML and remote images are rejected.
- **M5 complete for required profile:** six domains and exact 44 variable lessons with strict schemas, provenance, identities and negative tests. Official metadata is null; terminology is links-only.
- **M6 complete locally:** domain/class/text exploration, contextual variable pages, breadcrumbs and explicit unavailable official fields.
- **M7 complete locally:** local search, exact-code priority, deterministic ranking, literal escaping, hash/history/filter restoration, index-failure retry and no persistent search storage. Inputs wait for hydration/hash restoration to prevent lost early typing.
- **M8 complete locally:** three fixed synthetic walkthroughs, mappings, trace links, null/partial-date preservation, complete previews and four versioned downloads each.
- **M9 implemented; manual gates remain:** automated axe, keyboard interactions, no-JS reading, metadata/canonicals/sitemap and responsive checks pass. Human screen-reader, actual zoom and physical-device checks are not claimed.
- **M10 complete for local automation:** 19 unit tests; 22-project browser matrix; budgets and lab performance; pinned read-only CI workflow. Hosted CI has not run.
- **M11 complete for local preparation:** final-HTML CSP hashes, header-aware server, generated Vercel static config, file hashes, notices and [release/rollback instructions](RELEASE-OPERATIONS.md). Live hosting remains unauthorized and unverified.

## Exact content and provenance

- **8 original articles:** clinical-trials-for-developers; how-edc-systems-work; clinical-data-models; understanding-sdtm; variables-and-missingness; controlled-terminology; introduction-to-cdisc; edc-to-sdtm-walkthrough.
- **6 domains / 44 variable lessons:** DM 7, AE 8, CM 7, EX 6, LB 8, VS 8. Validation enforces the exact MVP identifier inventory, including all six contextual USUBJID lessons.
- **24 glossary concepts:** study, protocol, subject, site, visit, eCRF, EDC, audit trail, data query, CDISC, CDASH, ODM, SDTM, SDTMIG, domain, variable, observation, identifier, controlled terminology, codelist, submission value, metadata, Define-XML, synthetic data.
- **3 synthetic walkthroughs:** subject-identity (2 output rows), vital-signs-rows (4), adverse-events-timing (2). Twelve downloads: input JSON, output JSON, CSV and mapping manifest for each.
- **Required profile:** authored-only / links-only. Model 2.0, IG 3.4 and content 1.0.0 are separate context labels. No CT release, official label/type/core/role or codelist binding is inferred. AC-07B is not applicable.

Search/download generation first validates source references, authored-content contracts, identities, relationships and examples. Thirteen generated search/download files were regenerated with identical SHA-256 hashes. CDISC documents/tables/Library responses, medical dictionaries, logos and third-party clinical datasets are not bundled. Publisher links do not imply endorsement or redistribution permission. No employer or client resource was accessed. The later focused refinement inspected public Blueprint attribution links only, as expressly requested; see that section below.

## Acceptance outcomes

- **AC-01–02: pass locally.** Landing actions, learning routes, objectives/prerequisites, worked illustrations, pitfalls, related reading and source/review context. Editorial review is by the implementation agent, not a qualified human clinical reviewer.
- **AC-03–05: pass locally.** Exact inventory, combined filters/history/clear, contextual identities and null official metadata. Schemas reject fabricated authoritative values; example JSON types are visibly distinguished from SDTM metadata.
- **AC-06: pass locally.** AESEQ/USUBJID ranking, blank/punctuation/malformed-state/cap tests, reload/back/filter/clear/retry, safe literal rendering and network/storage assertions. Browse alternatives work without JavaScript.
- **AC-07A: pass. AC-07B: not applicable—links-only profile.** Original explanation and publisher links; no fabricated terminology records.
- **AC-08: pass locally.** 2/4/2 rows, stable identifiers, complete mappings, per-subject example sequences, trace links, null/partial dates, formula-leading CSV rejection, and input/output/manifest/download parity. Fixtures do not establish clinical or SDTM validity.
- **AC-09: pass locally.** Exact glossary, reference pages, independent version context, stable article heading IDs, internal-link/anchor crawl and unknown-version/record 404s.
- **AC-10: automated portion passes; manual portion pending.** Zero serious/critical axe violations across ten representative pages, including every required template. Automated keyboard checks cover skip-link activation, menu/Escape/focus return, controls and bounded table scrolling. Windows WebKit's default Tab policy skips links, so its skip link is explicitly focused before keyboard activation; this does not prove complete Safari keyboard behavior. Clipboard success/error uses a controlled stub, not OS-permission verification. No complete WCAG conformance claim.
- **AC-11: pass for local export/simulation.** Substantive no-JS HTML, unique titles/descriptions, preview/search noindex, explicit-origin canonicals, canonical-only production sitemap and empty preview sitemap. Live-origin checks remain pending.
- **AC-12: local lab targets pass.** Maximum initial route JS 176,879 gzip bytes (budget 204,800); search index 7,005 (budget 153,600). Warm search p95 0.2551 ms over 100 queries after 20 warmups. Lighthouse uses three simulated-mobile runs per home/article/VS-domain route. Final Lighthouse median performance: home 98, article 99, VS domain 99; accessibility and SEO 100 on each. LCP: 1.981s / 1.965s / 1.977s respectively; CLS 0 throughout. These are local lab results, not hosted-CI or field metrics.
- **AC-13: pass for authored-only profile.** Sources resolve and original authorship is identified. Negative cases reject missing sources, version mismatch, uncertain bundle permission, duplicate identities, invented codelist bindings, executable MDX, incomplete mappings and fabricated values.
- **AC-14: local checks pass with a documented engine warning.** Strict CSP, frame/MIME/referrer headers, escaped search, zero unexpected application console/page errors and zero dependency vulnerabilities. Windows WebKit 27.2 reports two native-select inline-style warnings on search, reproduced in a minimal static fixture without application scripts. Tests allow only that bounded exact warning and verify each policy event targets a SELECT without a style attribute. CSP remains strict. Real Safari/live-host behavior remains unverified. Output private-path/key-pattern checks are limited scans, not a full security audit.
- **AC-15: pass locally; host portion pending.** Clean pinned-runtime install, release command, reproducible generated content, 404s/downloads, notices and SHA-256 manifest. Deployment/rollback is documented, not executed.
- **AC-16: pass by agent visual/provenance review.** Original warm-neutral/teal palette, serif headings, system sans-serif prose, monospace identifiers, annotated observation exhibit and collection→representation→limitations examples. Reviewed own representative home/domain/variable/search/example screenshots at phone/tablet/desktop sizes. No decorative blueprint grids, hospital-dashboard motifs, imported documentation theme or external visual assets. No Blueprint comparison or owner approval is claimed.
- **AC-17: automated matrix passes; physical/manual supplement pending.** Every required engine/viewport and breakpoint edge ran. Assertions cover page overflow, all table/record labels and values, local scrolling, long source URLs, filters/history/resize, navigation focus, code bytes and downloads. Emulation is not physical-device testing.

## Executed checks and evidence

The complete release command exited successfully: typecheck, lint (zero errors; CSS specificity/important warnings and template-literal suggestions remain), 19 passing unit tests, validated export, licenses, browsers and production-mode Lighthouse with preview restoration. The full matrix recorded **126 passed, 28 intentionally skipped, 0 failed, 0 flaky**. Twenty-one skips avoid repeating the full axe/no-JS scan; seven omit duplicate breakpoint screenshots. No required responsive functional project was skipped. There are 75 representative screenshots across 15 full/smoke projects; initial failure evidence was preserved.

Matrix: Chromium full at 360×800, 390×844, 844×390, 768×1024, 820×1180, 1024×768, 1180×820, 1366×768, 1920×1080 and 2560×1440; Chromium reflow at 320×800 and widths 767/768/1199/1200/1599/1600 at height 900; WebKit smoke at 390×844, 820×1180 and 1180×820; Firefox smoke at 1366×768 and 1920×1080.

Runner: Windows 10.0.26200 x64, AMD Ryzen 5 5600, 12 logical CPUs, Node 22.23.3 / npm 10.9.2. Engines: Chromium 156.0.8078.4, Firefox 157.0, WebKit 27.2 via Playwright 1.64.0. This is a local workstation, not hosted CI.

Evidence:

- [Release log](../artifacts/release-verification.log), [final responsive refresh](../artifacts/final-responsive.log), [final production refresh](../artifacts/final-production.log).
- [Playwright JSON](../artifacts/playwright-results.json), [HTML report](../playwright-report/index.html); screenshots in artifacts/screenshots; initial failures in artifacts/failure-evidence.
- [Export checks](../artifacts/export-report.json), [production simulation](../artifacts/production-simulation.json), [reproducibility](../artifacts/reproducibility.json), [file hashes](../artifacts/build-manifest.json), [headers](../artifacts/headers.json).
- [Performance summary](../artifacts/performance-report.json), nine Lighthouse JSON reports, [runtime/search benchmark](../artifacts/runtime-and-search.json).
- [Dependency audit](../artifacts/dependency-audit.json), [license inventory](../artifacts/dependency-licenses.json), generated out/third-party-notices.txt.

## Versions and licensing

Next 16.4.0; React/React DOM 19.3.0; TypeScript 5.9.3; Tailwind/PostCSS 4.3.3; MDX 3.1.1; Zod 4.6.5; Biome 2.5.15; Vitest 5.0.3; Playwright 1.64.0; axe Playwright 4.13.0; Lighthouse 13.5.0; tsx 4.23.15; Cheerio 1.2.0. Remaining pins are in package.json/lockfile. There are 438 lockfile entries, zero unknown license declarations and zero audited vulnerabilities. The clean installation has 329 dependency packages; optional platforms account for additional lockfile entries.

Generated notices retain installed package licenses and Next's bundled component notices. MPL/LGPL tooling appears in the inventory (axe/Lightning CSS/native image tooling); native build tools/binaries are not copied into the static artifact. Notices remain separate from original content. The project is private/UNLICENSED pending the owner's outbound-license decision, which does not block local implementation.

## Remaining limits and publication steps

Unperformed: human screen-reader smoke; actual 200% text zoom/400% browser zoom; physical phone/tablet touch and on-screen-keyboard testing; qualified educational-content review; real Safari review of the native-select warning. Automated axe/keyboard/emulation and agent screenshot review do not replace these. No interviews or clinical/SDTM validation occurred. Screenshots are review evidence, not automatically approved regression snapshots.

To publish: complete those manual/content checks; choose the outbound license; obtain explicit publication authorization; verify personal gmouraws identity and exact gmouraws/clindevlab repository; confirm provider eligibility/cost and real HTTPS origin; build/review matching static output and generated Vercel headers; deploy only when authorized; verify live HTTPS/headers/canonicals/robots/sitemap/404/downloads and retain rollback artifacts. [RELEASE-OPERATIONS](RELEASE-OPERATIONS.md) provides commands and rollback. The reserved .invalid origin is used only for local production simulation, followed by restoration of noindex preview output.

**Local commits: 0.** Planning files and implementation remain in the workspace. No push, PR, deployment, remote write, DNS change, purchase, credential change or global Git configuration change occurred.


## Focused pre-release refinement — 2026-10-08

This section supersedes the earlier route count and browser totals for the refined candidate. The educational inventory remains 8 articles, 6 domains, 44 variables, 24 glossary entries and 3 synthetic walkthroughs; there are now 78 routes, including two legal pages.

### Changes and review

- The home introduction immediately identifies clinical research software engineering, EDC, CDISC, SDTM and synthetic learning examples. The existing composition, typography, palette and product-focused footer remain.
- About now includes a discreet “Created by Guilherme Moura” section. Brazilian nationality and 12+ years of experience come from the owner's supplied biography. Personal GitHub and Blueprint Engineering Lab links resolve publicly. Blueprint's public About text identifies the creator; only public attribution/link evidence was inspected, not its visual system, repository or infrastructure. No personal LinkedIn link could be verified from those sources, so none was guessed. No employer/client attribution appears in the application.
- Main navigation is directly visible from 1024px; mobile disclosure, keyboard dismissal and focus return remain. The separate article navigation breakpoint stays at 1200px.
- All 18 STUDYID/DOMAIN/USUBJID descriptions now explain their respective DM/AE/CM/EX/LB/VS context. Search uses those same original descriptions. Official metadata stays null and all provenance gates remain active.
- Variable pages retain explicit unavailable official fields but replace the repeated explanatory callout with a reference link. Domain notes are shorter. Detailed standards, sources, attribution and legal information remain accessible. Visible “fixtures” wording was simplified where it did not help readers; engineering terminology within technical lessons remains intentional.
- The footer now points to Privacy & legal. A human-readable Third-party licenses page groups browser runtime, build/transitive and development/test dependencies, with expandable records. Complete plain-text notices remain available. The inventory explicitly avoids claiming that every production dependency is shipped or that its categorization permits omitting attribution.
- License generation preserves 445 collected notice/license files, including Next bundled components. Its 438 dependency records comprise 4 runtime records, 168 build/transitive records and 266 development records. Installed versions are checked against the lockfile; missing required dependencies, unknown licenses and missing runtime license files fail the build. Two independent generations must match. Export checks verify the lockfile hash, notices hash and exact inclusion of each collected license text. Reproducibility is scoped to the same installed dependency tree; optional packages differ by platform.
- Reviewed representative home, About and license-page screenshots at phone/laptop sizes, plus existing browser template coverage. Every exported internal link/anchor passes; all 10 unique external destinations returned HTTP 200 (including redirects). This is a point-in-time availability check, not an endorsement or a redistribution grant.

### Verification evidence

- Typecheck passes; lint has zero errors (15 existing-style warnings and 4 informational suggestions).
- All 19 unit tests pass; content validation preserves the exact educational inventory and authored-only restrictions.
- Full browser run: **136 passed, 32 intentional skips, zero failures**, across 24 projects. Added 1023px/1024px boundary projects; the other engine/viewport coverage remains. Skips are 23 duplicate full accessibility scans and 9 duplicate breakpoint screenshots, not omitted responsive functionality.
- Axe scans cover 13 representative templates, including About and both legal pages, with no serious/critical violations. Legal navigation, expanded dependency records, notice/inventory availability, no-JS reading, table/record parity, downloads, search and header behavior pass. The previously documented bounded native-select warning in Windows WebKit remains; CSP was not relaxed.
- Static export: 78 routes, no link/metadata/provenance/download/license-integrity failures; maximum initial JavaScript 176,879 gzip bytes, search index 7,560 gzip bytes.
- Evidence: `artifacts/refinement-typecheck.log`, `refinement-lint.log`, `refinement-unit.log`, `refinement-responsive.log`, `refinement-full-playwright.json`, `external-link-review.json`, `license-reproducibility.json`, and `screenshots/refinement-*`. Production simulation/performance and the final preview verification are recorded below after completion.

Publication blockers remain unchanged: manual screen-reader/zoom/physical-device and real-Safari checks; qualified educational-content review; an outbound license decision for original material; explicit publication authorization and verified personal repository/hosting/origin configuration followed by live-host checks. LinkedIn is an optional missing attribution link, not a release blocker. No push, deployment, DNS/production configuration or remote write occurred. No local commit was made; the pre-existing entirely untracked workspace is preserved for review.


Production-mode verification passed locally with the reserved `.invalid` origin, followed by successful restoration of noindex preview output. Three-run Lighthouse medians: home performance 100 / accessibility 100 / SEO 100, LCP 1.518s; introductory article 99 / 100 / 100, LCP 1.934s; VS domain 99 / 100 / 100, LCP 1.519s. CLS was 0 on all three. See `artifacts/refinement-production.log` and `artifacts/performance-report.json`. These measurements are local simulated-mobile results, not live-host performance claims.

Final restored-preview verification also passed the full 24-project matrix: **136 passed, 32 intentional skips, zero failures** (`artifacts/refinement-final-preview.log`, current `artifacts/playwright-results.json`). This rerun includes the final legal breadcrumb/context adjustment. Updated screenshots are in `artifacts/screenshots/`. The candidate remains local and noindex.

## Final creator-copy and legal UX confirmation — 2026-10-08

Updated the About biography to the owner's supplied **14+ years of experience building software and enterprise applications**, followed by the stated interest in software engineering, clinical research and structured clinical data. The concise professional row now reads **GitHub · Blueprint Engineering Lab**, retaining `https://github.com/gmouraws` and `https://blueprint.app.br/`. A project-wide source/documentation search found no LinkedIn URL. The owner still needs to supply it; no URL or placeholder link was invented. This supersedes the earlier 12+ years biography, which remains documented above as historical context.

The existing legal UX already satisfies the renewed request: no raw Software notices link in the footer; Privacy & legal leads to a human-readable Third-party licenses page; full generated notices and inventory remain available. Browser runtime, build/transitive and development/test usage distinctions remain explicit, with no license texts removed. Existing license generation and export-integrity checks were rerun rather than replacing this working implementation.

Typecheck, content/provenance validation, 19 unit tests, the 78-route static export and the full 24-project browser suite passed (**136 passed, 32 intentional skips, zero failures**). Axe/template and legal-navigation checks are included. Lint has no errors; the existing 15 warnings and 4 informational suggestions remain. An additional exported-DOM check confirms the exact biography, unchanged creator URLs, absent LinkedIn link and product-focused footer. Reviewed the refreshed phone About screenshot. Evidence: `artifacts/final-attribution-release.log`, current `artifacts/playwright-results.json`, `artifacts/verify-final-attribution.mjs`, and `artifacts/screenshots/refinement-about-*`.

No homepage, visual-system, architecture, educational-inventory or provenance-rule changes were made. Local commits: none. No push, deployment, Vercel configuration, DNS change or remote write occurred. Existing manual accessibility/device/content-review, outbound-license and publication-authorization gates remain unchanged.

The complete `npm run check:release` command exited 0 for this final refinement, including production-mode simulation and successful restoration to noindex preview. Three-run Lighthouse medians were performance 99/100/99 for home/article/VS, accessibility 100 and SEO 100 throughout, CLS 0. License generation reproduced all 438 dependency records and retained all 445 collected notice/license files; exported hashes/text integrity passed. The final restored preview also passed the creator-copy/link assertions. Local preview remains the review target; no publication is implied.

## Owner-verified LinkedIn link — 2026-10-08

The owner supplied and verified `https://www.linkedin.com/in/guilherme-moura16`. Added it to About so the existing creator row reads **LinkedIn · GitHub · Blueprint Engineering Lab**. Existing styling, separator pattern, same-tab behavior and other URLs remain unchanged. This resolves the missing-LinkedIn notes in earlier report sections; no owner action remains for this link.

Focused validation passed: typecheck, static preview build (including its existing content/license/export checks), and an exported-DOM assertion of the exact three URLs, link order and same-tab behavior. The full browser/performance matrix was not rerun for this static-link-only edit. Evidence: `artifacts/linkedin-validation.log` and `artifacts/verify-linkedin.mjs`. No push or deployment occurred.

## Prompt 3 final local audit — 2026-10-08

Production origin is now https://clindevlab.com. Added per-page Open Graph/Twitter metadata, origin enforcement and an original local SVG favicon. Preview/search/404 indexing restrictions remain. The header-aware server now applies page headers to explicit index.html aliases. Prepared a local Build Output API artifact with canonical routes, index-file redirects, true 404 handling and matching per-build CSP hashes; no provider action was taken. README was rewritten for public developers. A source-candidate hygiene scan is available as `check:hygiene` and CI runs it. Local AGENTS.md remains unchanged and authoritative, excluded from publication; generated files, environment files and local evidence remain ignored. Historical organization-specific identifiers were sanitized from the public implementation prompt without relaxing its personal-only rule.

The complete release gate exited 0: typecheck, lint (zero errors, existing 15 warnings/4 infos), 22 unit tests, exact content/provenance validation, static export, 136 passing browser tests and 32 intentional duplicate-coverage skips across 24 projects, production-origin build/SEO checks and preview restoration. Axe has zero serious/critical violations across 13 templates. All 78 routes pass link/metadata/download/license checks. Initial JS remains 176,879 gzip bytes; search 7,560. Lighthouse medians home/article/VS: performance 99/99/98, accessibility 100/100/100, SEO 100/100/100, LCP 1.934/1.517/1.927 seconds, CLS 0. All 11 external destinations returned HTTP 200. Dependency audit: zero vulnerabilities. License inventory: 438 records, 445 preserved collected texts, reproducibility and export integrity pass. A route-level artifact check verified all 78 canonical header rules, HTML alias redirects and 404 fallback. Final type/lint checks also cover the new hygiene/hosting scripts. Evidence: artifacts/prompt3-release.log, prompt3-additional-checks.log, prompt3-dependency-audit.json, publication-hygiene.json, external-link-review.json and check-host.mjs. These generated local files are intentionally not versioned; CI uploads its own evidence.

The verified connector identity is gmouraws; origin and repository resolve exactly to gmouraws/clindevlab. The repository began empty. No global Git identity or credentials were changed. Source publication and PR/CI state are recorded in RELEASE-V1.md. Earlier statements that no remote writes were authorized describe Prompt 2, not Prompt 3. The outbound license remains unselected, which the owner explicitly allows for initial source publication. Manual accessibility/device/content review and live hosting checks remain outstanding. No merge/deployment/DNS action is authorized.

### Prompt 3 remote publication result

GitHub source publication is blocked: the gmouraws connector identity and exact gmouraws/clindevlab repository were verified, but GitHub rejected the first bootstrap write with 403 “Resource not accessible by integration.” No remote file, branch, PR or CI run was created. Remote writes stopped immediately; credentials and global configuration remain unchanged. The owner must grant the integration contents/workflow and pull-request write access (plus CI read access), or provide a normally authenticated gmouraws CLI session. No credential workaround was attempted. Local release work is complete and committed separately; RELEASE-V1.md includes the prepared PR description and post-approval deployment procedure. This is an authorization blocker, not a failing local application gate.

## Prompt 3 publication resumed — 2026-10-08

Owner authorization was reverified against both the connected GitHub account and the existing native gmouraws Git credential. The exact audited history was pushed unchanged to gmouraws/clindevlab (main bootstrap and release/v1). PR #1 is open: https://github.com/gmouraws/clindevlab/pull/1. The prior publication blocker is resolved. GitHub Actions push/PR runs started; this documentation commit records their initial running state, with final inspected status on the PR checks page and in the completion report. No merge, hosting deployment or DNS/domain action occurred. Credential and global Git settings were not modified.
