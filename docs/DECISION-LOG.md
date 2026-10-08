# Decision log and risks

All decisions dated 2026-10-08. Status: adopted for implementation planning, not deployed. Source evidence lives in DISCOVERY-REPORT, CLINICAL-STANDARDS-RESEARCH and DATA-SOURCES-AND-LICENSING.

## ADR-001 — Proceed with curated educational scope

Choose six domain lessons instead of a complete metadata catalog. Reason: official browsing exists; developer comprehension is the hypothesis worth testing, and full redistribution is not established. Trade-off: lower breadth and no normative lookup guarantee. Revisit after user-task evidence and licensing permission. Owner: product maintainer.

## ADR-002 — Original content is the baseline

Choose authored explanations, selected teaching identifiers, synthetic examples and official links. Never bundle specifications or Library tables under ambiguous rights. Trade-off: normative fields unavailable. This is a deliberate useful product state, not an error to “fill in.” Revisit only with explicit applicable rights and exact-version verification. Owner: content maintainer.

## ADR-003 — Pin three independent version dimensions

Use model 2.0, IG 3.4 and optional CT 2026-09-25; version original content separately. Reason: model/IG/CT are not interchangeable; public development versions are not the stable baseline. Trade-off: manual maintenance and larger identity keys. Revisit upon verified released standards, not projected dates.

## ADR-004 — Static Next.js, no backend

Use Next/React/TypeScript/Tailwind/local MDX and static export. Reason: one component model supports docs plus exploratory UI, while files suffice for data. Astro was a strong alternative for reduced JS; choose it only through a measured follow-up decision if budgets are unattainable. Trade-off: Next export limitations and careful client boundaries. No database or auth justification exists.

## ADR-005 — Small generated search index

Use original summaries and deterministic identifier-aware ranking. Reason: small fixed corpus, zero services and predictable tests. Trade-off: no typo tolerance or body full-text search. Revisit Pagefind if corpus grows beyond 500 records, index exceeds budget, or usability evidence shows body search is necessary; these are review triggers, not automatic migrations.

## ADR-006 — NCI CT optional, links-only always supported

NCI's permission statement supports evaluating a small CT supplement, but file-specific checks were not performed. Baseline has no import. Trade-off: less in-app terminology detail. Complete selected lists only; no inferred variable binding. Revisit when actual release bytes and notices are verified.

## ADR-007 — Vercel preferred, artifact portable

Use a static artifact and prepare Vercel config; evaluate Cloudflare Pages as fallback. Reason: simple maintenance and no runtime services. Trade-off: provider eligibility, quotas and header behavior must be checked. No host has been provisioned. Public launch remains separately authorized.

## ADR-008 — No patient inputs or tracking

Local search, fixed synthetic fixtures, no accounts/analytics. Reason: unnecessary personal-data collection creates risk without supporting the learning goal. Trade-off: weaker passive usage measurement. Later voluntary usability work can test hypotheses with separate consent and minimal information.

## ADR-009 — Light mode and system fonts

Reason: smaller visual QA surface, no remote font traffic, readable defaults. Trade-off: no dark preference at launch. Revisit after accessibility/performance gates and demonstrated demand.

## ADR-010 — No clinical-validation claim

Internal schema/example checks validate the website's own consistency only. They cannot establish SDTM conformance or regulatory acceptance. Reason: those depend on versioned rules and submission context outside this product. Trade-off: users must consult official sources and specialist tools.

## ADR-011 — Independent identity and responsive usability from inception

Owner clarification incorporated on 2026-10-08. ClinDevLab must not reuse Blueprint's blueprint/grid aesthetic, layouts, typography, colors, components, animations or branding. Choose an independently authored scientific field guide: warm neutral/teal colors, serif headings, monospace identifiers and annotated data exhibits. Avoid hospital-management visuals and unchanged generic documentation templates. Do not access Blueprint resources to establish this design. Trade-off: more original composition work and explicit visual review at AC-16.

Phones, tablets/iPad in both orientations, laptops and large desktops are first-class targets. Require complete table/record modes, stacked metadata, usable search/filter controls, wrapping code and retained provenance. Hiding important information is not a responsive strategy. Trade-off: additional component states and browser coverage; use one data model for all representations to prevent drift. AC-17 defines the authoritative Playwright matrix and functional parity checks, with responsiveness beginning in M3. These requirements supersede the earlier three-width smoke-check scope.

## Risk register and unresolved questions

- **R1, high: metadata redistribution.** Library/public-document access does not establish public reuse rights. Mitigation: no copied normative fields. Owner: project owner if a future expansion is desired. Blocks expanded catalog, not baseline.
- **R2, high: educational accuracy.** Independent writing can oversimplify dates, missingness, coding and mapping. Mitigation: source checks, explicit limitations, content review and correction log. Owner: implementation/content maintainer; no qualified human clinical review is claimed. A qualified reviewer is recommended before broad promotion, and review status must remain honest.
- **R3, medium: no user validation.** Proposed personas and benefits may be wrong. Mitigation: five-user task study after a prototype; no recruitment or messages sent now. Owner: product maintainer. Does not block initial implementation.
- **R4, medium: CT bytes unverified.** Candidate release and list availability need actual download/header/notice checks. Mitigation: links-only baseline. Owner: data maintainer. Optional gate only.
- **R5, medium: framework/CSP/static-host integration.** Generated inline scripts and host header limits may complicate policy. Mitigation: hash final HTML, test locally and later on the authorized host. Owner: implementation agent. Blocks publication if unresolved.
- **R6, medium: provider eligibility/cost changes.** Hobby conditions and quotas may not fit future monetization. Mitigation: recheck at launch, static-host fallback, no auto-upgrades. Owner: project owner.
- **R7, medium: outbound license undecided.** Owner has not selected a code/content license. Local original work can proceed; public distribution requires an explicit decision and notices. Do not apply a permissive blanket license to external material. Owner: project owner, before publication.
- **R8, low: repository identity and remote availability unverified.** No remote operations were performed or needed. Before any authorized remote action confirm `gmouraws` and `gmouraws/clindevlab`. Owner: acting agent. Wrong identity blocks remote work only.
- **R9, low: domain not selected.** Use local/preview mode; no made-up public origin. Owner: project owner before launch. No domain purchase required for implementation.
- **R10, medium: unperformed implementation tests.** The planning phase cannot demonstrate performance, accessibility, data import, CSP or build feasibility experimentally. Mitigation: explicit acceptance gates and evidence report in Prompt 2. Owner: implementation agent.

## Implementation decisions — 2026-10-08

- Local implementation uses Next 16.4.0, React 19.3.0, TypeScript 5.9.3 and project-local Node 22.23.3. Webpack is explicitly selected for the static production build. No global runtime or Git identity changes were made.
- A single statically generated catch-all route renders the fixed route inventory with shared templates. Unknown combinations use a genuine 404. This keeps the small curated catalog simpler than dozens of repeated route modules.
- Local MDX front matter is JSON, avoiding a YAML parsing dependency. Only Markdown syntax is accepted; executable MDX, JSX, raw HTML and remote images are rejected before build-time evaluation. No runtime MDX execution is shipped.
- Typography uses system fonts and original warm-neutral/teal styling. Metadata and data text were raised to at least 14px during review. No imported visual assets, themes, fonts, Blueprint or employer resources are used.
- Filters are disabled until hash restoration/hydration completes, preventing early input loss found in WebKit. Static browse alternatives remain usable without JavaScript.
- WebKit 27.2 on Windows emits a native-select CSP style warning reproducible in a minimal static HTML select with no application scripts. Do not weaken CSP to silence it. Browser tests record the bounded known warning separately; real Safari remains a launch check. This is an engine observation, not a claim of universal Safari behavior.
- Dependency notices are generated from installed package notices, including Next's bundled component licenses. Build-only native tooling is not copied to the static output. Original project licensing remains an owner decision.
- Vercel header configuration is generated locally from final HTML. A reserved `.invalid` origin is used only for a production-mode lab simulation, followed by restoration of noindex preview output. No remote configuration or deployment occurs.

## Original discovery readiness decision

**READY WITH DOCUMENTED LIMITATIONS.** Local implementation has a complete baseline, fixed content scope, routes, contracts and tests. Optional metadata/CT expansion, outbound licensing, owner-authorized publication and actual release verification remain distinct later gates. No owner decision is needed to begin the specified local authored-only implementation.

## Pre-release UX/content refinement — 2026-10-08

User-requested focused changes preserve the visual system, static architecture, authored-only metadata and full educational inventory. Header navigation now exposes links at 1024px, independently of the 1200px section-navigation layout. Shared-variable teaching descriptions distinguish DM/AE/CM/EX/LB/VS context. A legal landing page and readable software-license page replace the raw-notices footer destination. The raw notices are retained as a conservative superset: browser runtime, build/transitive dependencies and development/test tools are distinguished without treating a production dependency declaration as proof of browser distribution. Builds regenerate notices/inventory twice and verify exported text and SHA-256 integrity. Public creator links were checked only as explicitly requested attribution evidence; no external visual design, repository or infrastructure was used.

## Final creator attribution refinement — 2026-10-08

Owner-supplied biography supersedes the earlier 12+ years wording: About now states 14+ years building software and enterprise applications and describes the intersection of software engineering, clinical research and structured clinical data. The professional link row is GitHub · Blueprint Engineering Lab, using the existing verified URLs unchanged. No LinkedIn URL is recorded in the project; it remains omitted until the owner supplies it. Homepage and footer remain product-focused. The existing Privacy & legal → Third-party licenses experience already satisfies the renewed request and is preserved, including the raw notices, dependency-role distinctions and deterministic inventory/integrity gates. No scope, architecture or visual-system change is needed.

LinkedIn attribution resolved on 2026-10-08: owner supplied the verified URL `https://www.linkedin.com/in/guilherme-moura16`. About now uses LinkedIn · GitHub · Blueprint Engineering Lab, with the existing styling and navigation behavior. This supersedes the earlier missing-link status.

## Prompt 3 superseding release decisions — 2026-10-08

The owner selected https://clindevlab.com as the canonical origin and authorized source publication only to gmouraws/clindevlab through a release PR. A pending outbound license does not block that initial source publication; no blanket reuse rights are granted. Vercel/domain actions and PR merge remain forbidden until the mandatory owner checkpoint. RELEASE-V1.md contains the current procedure; earlier discovery/operations statements about an undecided domain or reserved test origin are historical. Production tests now use the approved origin locally and restore preview output. Source publication excludes unchanged local AGENTS.md safety instructions and all generated artifacts. Organization-specific names were removed from the historical implementation prompt while preserving its personal-only boundary.
