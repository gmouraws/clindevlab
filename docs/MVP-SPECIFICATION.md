# MVP specification

Baseline: 2026-10-08. Normative product requirements use “must”; these are product requirements, not SDTM conformance rules. Acceptance IDs resolve in ACCEPTANCE-CRITERIA.

## Product profile

Ship **SDTM Explorer + Developer Documentation — curated educational edition**. The default is `authored-only`, with `terminologyMode: links-only`. Display the curated scope prominently. No full-catalog implication, user account, runtime backend, or patient input.

Teaching context: SDTM model `2.0`, SDTMIG `3.4`, authored content release `1.0.0`. CT is either absent or separately identified as `2026-09-25` after its gate passes. Do not display a CT badge merely because a candidate exists in this specification. The pairing is supported by [CDISC's 3.4 page](https://www.cdisc.org/standards/foundational/sdtmig/sdtmig-v3-4), accessed 2026-10-08.

## F01 — Landing page

State audience and purpose in the first screen. Primary action: Start learning. Secondary: Explore six domains. Explain the synthetic-only and unofficial educational scope; link standards/version policy and official sources. No testimonials, adoption counts, endorsements, or fabricated launch metrics. Pass AC-01.

## F02 — Learning path: eight complete articles

Every article has objective, prerequisites, original explanation, one worked illustration, at least one pitfall, related pages, sources, and review date. Target 500–900 words each as an editorial budget, not filler. All eight must be substantive and free of TODO placeholders.

1. `clinical-trials-for-developers`: studies, participants, visits, forms; separate research workflow from application workflow.
2. `how-edc-systems-work`: collection, queries, audit history and exports conceptually; no vendor architecture copied.
3. `introduction-to-cdisc`: CDASH, ODM, SDTM and ADaM at orientation level, without promising implementation coverage.
4. `understanding-sdtm`: model/IG/CT separation, classes, row granularity and scope limits.
5. `clinical-data-models`: relational/application structure versus tabulation; one authored relationship diagram.
6. `variables-and-missingness`: names, identifiers, dates, required/expected/permissible concepts, example types versus official types.
7. `controlled-terminology`: list ID, term ID, submission value, membership, release and extensibility.
8. `edc-to-sdtm-walkthrough`: follow the VS synthetic example, document assumptions and unsupported mappings.

Pass AC-02 and AC-08.

## F03 — Domain explorer: exactly six first-release lessons

Default alphabetical code order; show code, authored short title, class, one-sentence purpose, and curated-coverage badge. Filters: class and free-text within this collection. Use AND between text and class. Unknown query values reset to default. Provide a result count and Clear filters. No fake pagination for six records.

Coverage: DM (Demographics, special-purpose), AE (Adverse Events, events), CM (Concomitant Medications, interventions), EX (Exposure, interventions), LB (Laboratory Tests, findings), VS (Vital Signs, findings). These names identify the teaching topics; labels and descriptions in the shipped curriculum must be independently authored. Other classes and domains may be mentioned in education, but do not get empty stub pages.

Each detail page: teaching-context banner, purpose, illustrative record granularity, selected variable links, a synthetic row or linked walkthrough, common engineering mistake, official source links, and explicit incompleteness notice. Pass AC-03.

## F04 — Forty-four domain-variable lesson records

This is the exact authored teaching inventory, not a normative domain specification or official ordering. Common identifiers intentionally recur in domain context.

- DM (7): STUDYID, DOMAIN, USUBJID, SUBJID, AGE, SEX, RFSTDTC.
- AE (8): STUDYID, DOMAIN, USUBJID, AESEQ, AETERM, AESTDTC, AEENDTC, AESER.
- CM (7): STUDYID, DOMAIN, USUBJID, CMSEQ, CMTRT, CMSTDTC, CMENDTC.
- EX (6): STUDYID, DOMAIN, USUBJID, EXSEQ, EXTRT, EXDOSE.
- LB (8): STUDYID, DOMAIN, USUBJID, LBSEQ, LBTESTCD, LBORRES, LBORRESU, LBDTC.
- VS (8): STUDYID, DOMAIN, USUBJID, VSSEQ, VSTESTCD, VSORRES, VSORRESU, VSDTC.

For each: identifier, domain, original teaching title, explanation, example value and example JSON type, one pitfall, sources, review date, and related article. Display no authoritative core/type/role/label/codelist binding in the default profile. An explicit “Not bundled” state is required; empty strings, guessed enums, and inferred role mappings are forbidden. The generic metadata panel may support licensed fields later but must not suggest the sample is a complete official reference. No core filter in authored-only mode. Pass AC-04/AC-05.

## F05 — Search

Dedicated `/search/` route with a labeled input. Search authored titles, codes, keywords and short descriptions across articles, six domains, 44 variables, three examples and glossary entries. Filter by result kind and domain where applicable. Exact variable/domain identifiers rank before text matches. Domain-specific duplicates remain distinguishable. Show up to 20 results with an explicit Show more control; stable order. Query state lives in a URL hash, not a server query string, to reduce accidental search-query logging. Handle punctuation, blank input, no results, index failure and keyboard navigation. Pass AC-06.

## F06 — Terminology references

Default route explains terminology and links NCI distributions and CDISC release information; it is a populated educational page, not an empty browser. Optional enhancement: only two complete verified lists (NY and SEX) from the selected NCI release. IDs and terms must come from the actual source; no invented identifiers. Show release, source, attribution, list membership and extensibility where verified. Do not infer variable bindings from matching names. The optional import gate is AC-07B; default AC-07A suffices for V1.

## F07 — Three original synthetic walkthroughs

All examples use `CLD-SYN-001` and subjects `SYN-001` and `SYN-002`. They are small educational extracts, not complete conformant datasets. No names, addresses, DOBs, real subject data, external sample-study downloads or medical dictionary codes.

- `subject-identity`: two invented subjects; show study/subject identity versus an app-local key, input JSON, two DM-like rows, and limitations. Ages are arbitrary integers; identifiers are strings. Do not claim age derivation or a complete DM dataset.
- `vital-signs-rows`: two subjects with two fictional measurement observations each; four VS-like rows. Show that repeated measurements become rows and retain input-to-output trace IDs. Use only selected VS lesson fields in the downloadable tabular extract; additional trace metadata lives in the manifest. Measurement tokens must be verified before being called official CT; otherwise mark them as authored teaching tokens and explicitly not submission-ready.
- `adverse-events-timing`: two fictional AE-like rows demonstrating complete and partial date strings plus missing end date. Preserve unknown precision. AETERM is original uncoded symptom text; AESER examples are illustrative and not asserted as verified CT until approved evidence exists. Do not equate seriousness with severity.

Each example: explanatory page, source JSON, output JSON, CSV download, mapping manifest, expected row counts, and at least three limitations. Fixture values are fixed, never randomly regenerated. CSV is RFC 4180-compatible with explicit empty-value convention; JSON uses null for missing values. Formula-leading authored strings must be rejected during fixture checks. Do not add an upload or arbitrary code editor. Pass AC-08.

## F08 — Reference and navigation

Authored glossary: exactly these 24 concepts—study, protocol, subject, site, visit, eCRF, EDC, audit trail, data query, CDISC, CDASH, ODM, SDTM, SDTMIG, domain, variable, observation, identifier, controlled terminology, codelist, submission value, metadata, Define-XML, synthetic data. These are original teaching explanations, not copied glossary definitions.

Official resources and standards/version pages provide publisher links, access dates, coverage, provenance legend, correction policy and non-endorsement notice. Privacy and about pages identify the personal project and synthetic-only boundary. Pass AC-09.

## Cross-cutting requirements

**Independent identity is mandatory (AC-16).** ClinDevLab must combine clinical science, structured data and software engineering through the original scientific-field-guide direction in DESIGN-SYSTEM. Do not reuse Blueprint's blueprint/grid aesthetic, layouts, typography, colors, components, animations or branding. Do not access its repository or infrastructure. Avoid hospital-management visuals and unchanged generic documentation templates. Functional navigation patterns may be familiar, but the composition, tokens and visual language must be independently authored.

**Responsiveness is required from the first component milestone (AC-17).** Support phones, tablets/iPad in both orientations, laptops and large desktops using the exact test matrix in ACCEPTANCE-CRITERIA. Essential fields, metadata, versions, sources, filters and actions must remain available at every width. No page-level horizontal overflow, hidden important columns, unreadably small type or hover-only access. Domain-variable tables and synthetic datasets must offer both a semantic locally scrolling table and a complete labeled record-reading mode. Metadata and input/output walkthroughs stack on narrow screens. Code previews offer local scrolling and a presentation-only wrap-lines toggle. Search/filter controls wrap or stack with labels; navigation preserves all destinations and focus behavior. Downloads are supplementary, not the only mobile way to inspect data.

Keyboard-complete navigation, focus visibility, headings and semantic tables remain required. WCAG 2.2 AA target with automated and manual checks, not a certification claim. Static HTML must contain substantive page content for indexing and no-JS reading. Search/filter and alternative reading controls need JavaScript, with accessible static browsing and table fallbacks. Pass AC-10 through AC-17. Responsive behavior is included in F03–F08 completion, not deferred to a later polish phase.

## Explicit V1 exclusions

Complete SDTM/SDTMIG catalog; official normative tables; full CT or external dictionaries; automated standards updates; cross-version diff; standards validator; XPT or Define-XML generation; clinical conversion engine; production EDC integrations; real datasets; uploads; accounts; saved history; comments; newsletter; tracking analytics; payments; AI assistant; multilingual content; dark mode; runtime API; CMS; mobile app. Dark mode can follow later demand and contrast testing.
