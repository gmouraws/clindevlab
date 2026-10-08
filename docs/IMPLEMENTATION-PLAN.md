# Autonomous implementation plan

Baseline 2026-10-08. Execute only after the owner supplies Prompt 2. This plan authorizes no action by itself. Estimated effort: 10–18 focused developer days including content authoring and verification; this is a rough planning range, not an autonomous-agent delivery promise. No user interviews or external approvals are assumed completed.

## Execution rules

Read AGENTS.md first. Preserve existing documentation and local changes. Default to authored-only/links-only; do not spend the implementation phase trying to acquire a full standards license. Keep a milestone checklist and record acceptance evidence in `docs/IMPLEMENTATION-REPORT.md` during Prompt 2. Do not mark a milestone complete because a page renders if its content/provenance gate fails. Fix failures before dependent work. Make ordinary reversible decisions autonomously; document material changes in DECISION-LOG.

## M1 — Repository foundation

Dependencies: none. Inspect this workspace and local Git status only; verify identity before any later authorized remote action. Establish package manager and Node LTS pins, lockfile, formatting/lint/typecheck, ignore patterns and proposed license inventory process. Do not alter global identity. Completion: deterministic clean install, scripts documented, no employer resources or unrelated files touched. Tests: typecheck/lint scaffold and package installation; no placeholder application feature tests yet.

## M2 — Application architecture

Depends M1. Create static Next App Router structure, local content loaders and schema boundaries from TECHNICAL-ARCHITECTURE. Produce minimal route manifest/export and true 404. Keep server features out. Completion: local static HTML build and serve work without credentials or runtime services. Tests: static export and unknown-route handling; no deployment. Supports AC-11/15.

## M3 — Design system

Depends M2. Independently author ClinDevLab's scientific-field-guide identity, tokens, typography and page compositions; no Blueprint visual assets or inherited theme. Implement header/navigation disclosure, semantic table with complete record-reading mode, source/version strip, stacked metadata, callouts, code wrapping controls and landing page. Build phone/tablet/laptop/large-desktop and long-content states before filling every page. Completion: representative templates meet AC-16, with keyboard controls and contrast checked. Tests: AC-01, applicable AC-10, and AC-17 responsive cases from this milestone onward; do not defer responsiveness to M9.

## M4 — Documentation system and authored content

Depends M2–3. Add reviewed local MDX pipeline, approved component allowlist, eight complete articles and 24 original glossary entries. Add about/privacy/resources/version pages. Source every external claim with scope/date. Completion: all learning routes have substantive content and related links; no copied standards definitions or TODO text. Tests: AC-02/09, disallowed MDX syntax and source-link validation. Reference official resources for factual accuracy without copying their tables.

## M5 — Reference data model and provenance

Depends M2. Implement strict records, profile and rights gate; author six domain and 44 variable lessons from the exact inventory. Keep official metadata null. Build links-only terminology content. Optional CT enhancement only if package-specific evidence can be obtained through authorized public sources with no account escalation; otherwise mark excluded and continue. Completion: deterministic validated dataset with full original-authorship/source trails. Tests: AC-04/05/07A/13; optional 07B must be explicitly elected and verified. Negative cases are required because they protect against fabricated reference claims.

## M6 — SDTM Explorer

Depends M3–5. Generate domain index/detail, selected-variable index/detail, and contextual breadcrumbs/source panels. Implement class filter and URL hash state. Completion: all specified routes exist with useful authored content, scope visible, no unverified official values. Tests: AC-03/04/07A/09; missing combination yields 404. Check no-JS readability.

## M7 — Search and filtering

Depends M4–6. Build approved-content JSON index and literal ranking with exact-code priority. Implement dedicated search page, filters, hash restoration, loading/failure/no-results and static fallback. Completion: expected queries and navigation work, index within budget. Tests: AC-06, ranking ties, malformed state, safe rendering and initial AC-12 measurements. Avoid premature fuzzy/full-text features.

## M8 — Synthetic examples

Depends M4–6. Independently author fixed source/output fixtures and manifests for the three walkthroughs. Build previews and downloads from one validated source; document traceability and limitations. Completion: 2/4/2 row counts with JSON/CSV parity, linked lessons and synthetic notices. Tests: AC-08, missing/partial dates, fixture/manifest mismatch, formula-leading CSV prevention. No external clinical dataset or medical dictionary needed.

## M9 — SEO and accessibility

Depends M6–8. Finalize metadata, canonical/preview policy, sitemap, page anchors, no-JS reading, contrast and keyboard/screen-reader flows. Completion: templates and critical interactions meet AC-09–11 plus the integrated AC-16/17 visual and responsive gates; manual evidence recorded. Automated scans do not substitute for manual review. If tools cannot perform a manual check, state exactly what remains for publication instead of inventing a pass.

## M10 — Tests and CI

Depends M1–9. Assemble release command and read-only GitHub Actions configuration locally. Verify clean install, build, content/provenance and negative cases, search, examples, static crawl, browser flows and performance budgets. Pin action commits and avoid secrets. Completion: AC-12–17 local scope passes with logs and pinned versions. Execute the exact AC-17 Chromium/WebKit/Firefox viewport matrix, value-parity assertions, screenshots and failure traces. Missing required browser runs remain unverified gates, not passes; distinguish emulation from physical-device evidence. Do not connect CI remotely without authorization.

## M11 — Production preparation

Depends M10. Generate and test provider-specific security headers against final HTML, document origin configuration, build artifact manifest, rollback and owner launch checklist. Choose one host configuration as primary; keep the static artifact portable. Completion: local release candidate and IMPLEMENTATION-REPORT, including license inventory and residual verification/launch gates. No deploy, purchase, paid service or domain/DNS modification. Actual public launch requires a subsequent explicit instruction.

## Completion report

Report implemented scope, acceptance outcomes with evidence, exact dependency/runtime versions, original content counts, CT mode, license status, manual checks performed/pending, artifact location, test failures and next launch steps. Never report a local build as a deployed product or a fixture check as SDTM validation.

## Exact Prompt 2

Copy the following as a new request in this project:

> Implement ClinDevLab BUILD-002 locally using AGENTS.md and the complete documentation package dated 2026-10-08. Execute milestones M1–M11 autonomously and continue working until you have produced the strongest reviewable local release candidate that can reasonably be achieved within the documented constraints.
>
> Read the entire relevant documentation package before implementation and treat the documented product, architecture, provenance, visual independence, responsive behavior, security requirements and acceptance criteria as the source of truth.
>
> Use the authored-only reference profile and links-only terminology as the required baseline: eight original learning articles, six domain lessons, the exact 44 domain-variable lessons, 24 glossary entries, and three original synthetic walkthroughs.
>
> Content quality is a release requirement, not a quantity target. Do not create shallow, repetitive, placeholder, filler, or obviously AI-generated educational content merely to satisfy inventory counts. Each article, domain lesson and variable lesson must provide useful context specifically for software engineers entering clinical research software. Research authoritative public sources when necessary for factual accuracy, prefer primary sources, respect licensing restrictions, and never invent or copy official metadata.
>
> Implement the complete SDTM Explorer experience defined by the planning package, including navigation, search, filtering, domain and variable exploration, provenance/version context, synthetic examples and developer documentation.
>
> Implement the independent ClinDevLab visual identity described in DESIGN-SYSTEM.md. ClinDevLab must not visually resemble Blueprint and must not fall back to a generic documentation-template appearance. The UI should communicate clinical science, structured data and software engineering while remaining clean, professional and distinctive.
>
> Responsiveness is part of implementation, not post-release polish. Continuously verify phone, tablet/iPad, laptop and large-desktop layouts while building. Tables, metadata, search/filter controls, navigation, code blocks and synthetic datasets must remain genuinely usable at narrow widths without hiding important information.
>
> Follow the documented static Next.js architecture, provenance contracts, route inventory, security requirements and acceptance criteria. Prefer the simplest architecture satisfying those requirements. Do not introduce a database, authentication, runtime backend, external production service or unnecessary infrastructure.
>
> Preserve all planning documents and existing legitimate workspace changes. Record material architectural or product deviations in docs/DECISION-LOG.md.
>
> Maintain docs/IMPLEMENTATION-REPORT.md throughout implementation with milestone status, acceptance evidence, content counts, dependency/runtime versions, licensing status, tests performed, unresolved limitations and remaining production checks.
>
> Work autonomously. Do not pause for approval for ordinary implementation choices, dependency selection, refactoring, bug fixes, test fixes, responsive adjustments, accessibility fixes, content organization or other reversible engineering decisions covered by the documentation.
>
> After implementing each milestone, execute its relevant validation. If a test, build, lint, typecheck, content validation, accessibility check or browser test fails, investigate and fix the underlying issue before proceeding when reasonably possible. Do not report a milestone as complete merely because the application renders.
>
> Run the complete local release verification defined by the acceptance criteria, including production build, static output verification, content/provenance validation, negative tests, search tests, synthetic fixture validation, route crawling and the documented Playwright browser/viewport matrix. Capture screenshots and failure evidence where required.
>
> Perform a final autonomous quality pass after M11. Review the application as both a software engineer unfamiliar with clinical research and as a maintainer. Fix obvious UX inconsistencies, broken navigation, weak content, visual problems, responsive problems, accessibility issues, console errors, broken links and unnecessary complexity before declaring the release candidate ready.
>
> You may create local Git commits for coherent implementation milestones. Use clear conventional commit messages and preserve useful history. Do not modify global Git identity or credentials.
>
> Do not access employer/client resources or repositories, Blueprint resources, or use any GitHub identity other than gmouraws. This project belongs exclusively to the personal gmouraws context.
>
> Do not push, create pull requests, perform remote writes, deploy, configure production services, modify DNS, purchase anything, or create paid resources during this phase.
>
> Do not wait for optional Controlled Terminology imports, market interviews, a custom domain or an outbound project license decision to complete the authored-only local implementation.
>
> If optional functionality is blocked by licensing or unavailable external resources, document the limitation and continue with the compliant baseline rather than weakening or fabricating the implementation.
>
> Stop only after producing a reviewable local release candidate, or when a genuine blocking issue prevents further progress.
>
> At completion, report:
>
> 1. What was implemented.
> 2. Milestone M1–M11 status.
> 3. Acceptance criteria results and evidence.
> 4. Exact content inventory delivered.
> 5. Test/build/browser results.
> 6. Responsive and accessibility verification performed.
> 7. Licensing/provenance status.
> 8. Local commits created.
> 9. Known limitations and unresolved risks.
> 10. Exact remaining steps required for production publication.
>
> Never describe a local build as deployed, synthetic fixtures as clinical validation, authored educational metadata as official CDISC metadata, or an automated check as a manual verification that was not actually performed.
