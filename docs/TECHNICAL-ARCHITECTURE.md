# Technical architecture

Decision baseline: 2026-10-08. This is a design contract; no framework was installed or tested in this phase.

## Architecture decision

Use Next.js App Router with TypeScript, React, Tailwind CSS, local MDX and validated JSON, producing a static `out/` directory. Use Vitest for data/search logic, Playwright for browser flows, and GitHub Actions for verification. Recommend Vercel for a later authorized deployment, with Cloudflare Pages as a static-output alternative. No database, authentication, functions, scheduler, CMS or external search service.

[Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports), accessed 2026-10-08, supports build-generated route HTML and requires all dynamic routes to be known. Its limitations include runtime server features and framework header handling. Generate route parameters from approved manifests; keep page content in build-rendered components and limit client components to search, filters, disclosures and copy buttons. Set `output: 'export'` and `trailingSlash: true`. Use native images or unoptimized local assets; do not depend on server image optimization. Configure response headers at the host, not through Next runtime configuration.

## Alternatives and trade-offs

- **Astro + React islands:** a strong alternative for a content-heavy static product; [collections](https://docs.astro.build/en/guides/content-collections/) support typed content and static routes (accessed 2026-10-08). Likely lower hydration overhead. Next is selected to keep one React component model for the explorer and familiar future extensibility, at the cost of more JavaScript discipline. Switch only if measured budgets fail after reducing client boundaries; record an ADR rather than silently mixing frameworks.
- **Docusaurus:** plausible documentation shell, but no hands-on evaluation was performed. Not chosen because the reference explorer needs bespoke data relationships and there is no demonstrated need for its broader documentation feature set.
- **React SPA:** simple client architecture, but requires extra work to deliver substantive crawlable/no-JS content. Reject for V1.
- **Hosted search:** unnecessary cost, data handling and service dependency for fewer than 150 index records.
- **Pagefind:** [static indexing](https://pagefind.app/) and [filters](https://pagefind.app/docs/filtering/) are documented (accessed 2026-10-08). A good growth path for larger full-text content. V1 needs deterministic code ranking and only title/summary/keyword search, so use a generated JSON index and a pure ranking function instead. Do not build a general full-text engine.

## Visual independence and responsive architecture

All visual tokens, layout compositions and presentation components are authored for ClinDevLab. Do not import Blueprint assets, styling, component packages, fonts, animation recipes or branding, and do not inspect its repository/infrastructure. Use the original scientific-field-guide direction in DESIGN-SYSTEM rather than a finished documentation theme. Shared generic platform primitives are acceptable; inheriting another product's visual system is not. Record asset origins and design rationale for AC-16.

Responsive behavior is part of each component's initial implementation. Use mobile-first CSS, flexible tracks with `min-width: 0`, wrapping control groups and locally bounded table/code overflow. Layout must depend on available space, not user-agent detection or separate mobile URLs. Keep reading order stable between stacked and side-by-side arrangements; avoid CSS ordering that separates visual and keyboard order. Keep viewport scaling enabled.

Use one canonical column/row model for table and record views of both variables and synthetic data. Both views expose identical labeled values and provenance; the reading mode does not change source data, filters, sorting or exports. Render the semantic table as the no-JS baseline, then progressively enhance with the record-view control. Only the active representation participates in focus/accessibility navigation; avoid duplicate IDs and two simultaneous screen-reader copies. This switches representation rather than removing information. Code wrapping likewise affects presentation only. Do not use viewport-driven JavaScript to exclude fields or generate a hydration-dependent mobile content subset.

Native `<details>` is suitable for no-JS navigation/contents disclosures. If a custom control is used, preserve a readable no-JS fallback. Resize/orientation changes retain search hash state and reading mode and must not strand focus in a hidden navigation element. Main-content tables use bounded scroll containers; ordinary metadata/source links wrap. Keep initial static content and bundle budgets from this document.

Add `tests/e2e/responsive.spec.ts` and `tests/e2e/visual.spec.ts` in Prompt 2, not during discovery. Implement the authoritative viewport/engine matrix and assertions in AC-17; save viewport-specific screenshots and failure traces from the production export. Visual snapshots are approved against ClinDevLab's own reviewed screens, never Blueprint screenshots. Functional value/field parity assertions are required in addition to screenshots. Record actual browser versions and distinguish emulation from physical device testing.

## Proposed source layout

```text
app/                         route/layout components
components/                  accessible presentation and small client controls
content/learn/               trusted local MDX
content/reference/           authored glossary/about/privacy content
data/authored/               domains, variable lessons, example manifests
data/approved/               optional license-approved CT subsets only
data/provenance/             source records and release profiles
lib/content/                 loaders and link graph
lib/schema/                  runtime schema validation
lib/search/                  deterministic index and ranking
scripts/                     content checks, build indexes, header generation
public/examples-data/        generated approved synthetic downloads
tests/unit/                  schemas, ranking, provenance, fixture consistency
tests/e2e/                   browsing, search, keyboard, responsive checks
docs/                        this planning package and later implementation evidence
```

Treat generated data as outputs of tracked approved inputs. No network request is allowed in normal production builds. Raw optional imports stay outside public and tracked paths until reviewed. Schema examples below describe contracts; they are not instructions to fabricate official data.

## Data contracts

Use Zod or an equivalent runtime schema library; TypeScript alone does not validate input files. Reject unknown keys for reference records.

Shared `sourceRefs` entries are `{sourceId, locator, claimScope}`: locator is a section title or stable publisher anchor when available; claimScope states the supported claim and whether it is conceptual or exact-version metadata. Do not require copied source text. IDs use ASCII lowercase kebab-case except displayed standard codes and preserved external concept IDs. Dates are ISO calendar dates, not locale strings. Every relation must resolve within the selected content/profile manifest.

**SourceRecord**: `id`, `publisher`, `title`, `url` (HTTPS), `sourceVersion` (string or explicit null), `publicationDate` (ISO date or null), `accessedAt` (date), `termsUrl` (HTTPS or null for original work), `permission` (`original|permitted|prohibited|uncertain`), `approvedUses` (subset of `link|quote|bundle`), `restrictions`, `attribution`, `reviewedAt`, `evidenceNote`. Imported byte sources also require `downloadUrl`, `sha256` (64 hex), and `retrievedAt`. Do not make up dates to satisfy validation. A source's permission must be evaluated for the particular artifact/use, not inferred from publisher alone.

**Profile**: `id: sdtm-2-0_ig-3-4`, `modelVersion: 2.0`, `igVersion: 3.4`, `contentVersion: 1.0.0`, `referenceMode: authored-only`, `terminologyMode: links-only|approved-subset`, `ctRelease: null|2026-09-25`, `sourceIds`, `coverageNotice`, `reviewedAt`. Mode/release coherence is mandatory.

**DomainLesson**: `id` = profile + code; `code`, `slug`, `teachingTitle`, `class` (`events|interventions|findings|special-purpose` for this curriculum), `summary`, `recordGranularityExplanation`, `variableIds[]`, `exampleIds[]`, `articleSlugs[]`, `sourceRefs[]`, `authorship: original`, `reviewedAt`. Class is an independently checked factual teaching classification, not a copied metadata table. No domain implies complete variable coverage.

**VariableLesson**: `id` = profile + domain + variable name; `profileId`, `domainCode`, `name`, `slug`, `teachingTitle`, `explanation`, `pitfall`, `exampleValue` (string/number/null), `exampleJsonType`, `sourceRefs[]`, `relatedArticleSlugs[]`, `officialMetadata: null|OfficialMetadata`, `reviewedAt`. Use `exampleJsonType`, never `sdtmType`, for the authored sample schema. Original wording and identifiers do not imply permission to reconstruct official tables.

**OfficialMetadata** (future/optional, default null): each field is an evidence-wrapped value `{value, sourceId, sourceLocator, sourceVersion, permissionEvidenceId}`. Fields may include officialLabel, sdtmType, role, core, order, notes, codelistBindings. Partial availability is explicit. Any populated field lacking exact-version verification or a permitted bundle grant fails validation. Core only accepts Required/Expected/Permissible if evidence exists. Missing status is not Permissible. Do not implement this as unverified strings with a generic source footer.

**Codelist**: `(ctRelease, codelistId)` identity; `submissionName`, `displayName`, `extensible` (boolean or verified unavailable), `sourceId`, `memberKeys[]`. **TermMembership**: `(ctRelease,codelistId,termId)` identity; `submissionValue`, permitted labels/synonyms only if sourced, `sourceId`. Membership belongs to a release. Do not collapse all list memberships by term ID or assume codelist/version binding from a variable's name.

**ExampleManifest**: `id`, `contentVersion`, `synthetic: true`, `authorship: original`, `profileId`, `inputFile`, `outputJsonFile`, `outputCsvFile`, `expectedRowCount`, `columnOrder`, `exampleFieldTypes`, `nullConvention`, `mappings[]` (input path, output field, authored transformation explanation), `traceLinks[]` (input row ID to output row ID), `limitations[]`, `ctClaims[]`, `reviewedAt`. `ctClaims` is empty unless each claim resolves to approved CT membership. This manifest does not assert standards validation.

**MDX front matter**: stable slug/title/description, ordering, learning objective, prerequisites, keywords, related IDs, source references, authoring/review date. Disallow arbitrary imports/exports and raw HTML; only approved locally registered MDX components may execute.

**SearchRecord**: stable id, canonical relative URL, kind, title, code(s), domain or null, summary, keyword array, profile or null. Derived only from published approved content. No official reference text enters an index unless its bundle permission passes the same gate as rendering.

## Build pipeline

1. Parse trusted source files, validate schemas and mode consistency.
2. Validate provenance and permitted usage; reject guessed official fields.
3. Resolve all references, uniqueness, 44-variable inventory, eight articles, six domains, glossary and example counts.
4. Generate deterministic fixture downloads, route manifest and search index; stable sorting and no wall-clock timestamps in reproducible output.
5. Run unit checks; then static build using the complete route manifest.
6. Inspect emitted HTML for broken internal links/anchors, unauthorized assets, noindex/canonical policy and search-index URL validity.
7. Generate host-specific security headers from the final HTML, not source templates; verify CSP compatibility and provider limits.
8. Serve `out/` locally and run browser/accessibility checks, recording versions and results.

Proposed package commands to provide in Prompt 2: `dev`, `typecheck`, `lint`, `content:check`, `data:check`, `generate`, `test`, `build`, `check:export`, `test:e2e`, `check:licenses`, `check:release`. `build` invokes validation/generation before Next. `check:release` runs typecheck, lint, content/data checks, tests, build, export checks, license inventory and E2E exactly once in dependency order. Tests must not rely on a live standards service.

## Performance and failure behavior

Project budgets (targets, not measurements): search index ≤150 KB gzip, initial route JavaScript ≤200 KB gzip, no eager full-content client payload, local warm query p95 ≤100 ms for the V1 corpus. Cache immutable hashed assets for one year; HTML revalidates. No service worker in V1.

Missing required authored content fails the build. Optional CT failure selects the link-only profile through an explicit reviewed configuration change; do not silently downgrade a previously approved release. Runtime search-index failure offers retry and static browsing. Unknown routes are 404. Never leak build paths, stack traces or secrets to visitors.

## Maintenance

Content/data updates are reviewed changes with source dates and diff summaries. The maintainer checks official release pages quarterly or before a substantive content update, manually; this phase creates no automation. Preserve older content releases when correcting examples, and document material educational corrections. Keep implementation-specific evidence separate from standards provenance.
