# Data sources and licensing

Register reviewed 2026-10-08. All URLs below were accessed on that date unless explicitly described as candidate download paths. This is an operational inclusion policy, not a legal opinion. The safe default is authored-only content plus links. No external dataset has been imported.

## Inclusion rule

Public access, a free account, an API key, a software license, and data redistribution rights are different things. Each imported field requires a publisher, canonical source URL, exact release and publication date, terms URL, permission disposition, redistribution limits, attribution text, retrieval date, and file digest. Unknown permission fails publication rather than silently passing. References may be linked without copying their substantive content.

## Source register

### S01 — SDTM model

- Publisher: CDISC. [SDTM 2.0](https://www.cdisc.org/standards/foundational/sdtm/sdtm-v2-0), published 2021-11-29.
- Terms: [CDISC standard terms](https://www.cdisc.org/terms-and-conditions), displayed copyright 2014; effective/revision date not stated.
- Restrictions: the document grant is organization-limited and excludes external distribution and derivative works. Attribution does not override these restrictions.
- Disposition: **prohibited for the proposed public document/table redistribution under the reviewed terms**. Link only; do not bundle or extract official tables. Identify CDISC and version in references; no logo or endorsement.

### S02 — SDTM implementation guides

- Publisher: CDISC. [SDTMIG 3.4](https://www.cdisc.org/standards/foundational/sdtmig/sdtmig-v3-4), 2021-11-29. [SDTMIG 3.3 public HTML](https://www.cdisc.org/standards/foundational/sdtmig/sdtmig-v3-3/html), version 3.3; publication date not independently confirmed in this review.
- Same terms and attribution treatment as S01. Public HTML is not a redistribution exception.
- Disposition: **prohibited for copied tables/documents under reviewed terms**; source links and independently authored conceptual discussion only. No 3.3-derived data labeled 3.4.

### S03 — CDISC Library metadata/API

- Publisher: CDISC. [FAQ](https://www.cdisc.org/cdisc-library/faq), [API documentation](https://www.cdisc.org/cdisc-library/api-documentation/oas3), [benefits](https://www.cdisc.org/cdisc-library/api-benefits).
- API documentation displayed 1.1.0; page publication dates unspecified. Dataset releases vary and are not API-version equivalents.
- The API page names a member/open-source developer license; the reviewed pages do not establish a public-republication grant for this project. Entitlements and terms require independent verification.
- Disposition: **uncertain; excluded** from public bundles, indexes, caches, and screenshots. Attribution requirements must come from a confirmed applicable agreement before use. No key or authenticated download is necessary for V1.

### S04 — CDISC Controlled Terminology distributed by NCI EVS

- Publishers: CDISC in collaboration with NCI EVS; distributor NCI. [NCI description and permission statement](https://www.cancer.gov/about-nci/organization/cbiit/vocabulary/cdisc), updated 2025-09-03. [Release announcement](https://www.cdisc.org/standards/terminology/controlled-terminology), 2026-09-25/P62. [SDTM distribution directory](https://evs.nci.nih.gov/ftp1/CDISC/SDTM/).
- NCI explicitly states that CDISC terminology is freely usable without licensing restrictions. [NCI reuse policy](https://www.cancer.gov/policies/copyright-reuse) still distinguishes third-party content and endorsement; its revision date was not established here.
- Disposition: **permitted in principle for NCI-distributed CDISC CT**, conditional on checking the selected file's notices and scope. No blanket permission for other dictionaries or SDTM specification metadata follows.
- Attribution: credit NCI as distributor and CDISC/NCI EVS as creators; link the original title and exact release. Preserve any required file notices; do not relicense third-party content as project-owned.
- Candidate import: complete codelists whose submission names are `NY` and `SEX`, from the dated SDTM 2026-09-25 package only. Resolve actual IDs and terms from that package; do not hardcode guessed C-codes. Exclude QRS and external dictionaries. If either list cannot be uniquely resolved with release evidence, import neither and use link-only mode.
- Verification still required: actual dated archive URL, package header, file format, notices, release match, SHA-256 and exact row count. The directory returned no extractable listing in this research tool. No binary inspection or redistribution decision for specific bytes has occurred.

### S05 — NCI Thesaurus / EVS Explore

- Publisher: NCI. [EVS Explore](https://evsexplore.semantics.cancer.gov/evsexplore/), [publisher announcement](https://datascience.cancer.gov/news-events/news/evs-explore-new-browser-offers-faster-searches-standardized-cancer-data-terms), 2021-08-05. Live browser release unspecified.
- Reference-only in V1; no NCIt corpus copied. Broader concept reuse requires exact distribution notices, especially third-party content. Disposition: **uncertain for a broad import; excluded**. Attribute NCI when linking. CT scope S04 is narrower and separately reviewed.

### S06 — FDA study-data material

- Publisher: US FDA. [Resources](https://www.fda.gov/industry/fda-data-standards-advisory-board/study-data-standards-resources), rolling page, publication date unspecified; [Data Standards Catalog](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/data-standards-catalog), landing page March 2025.
- Selected use: links with publisher/title, no reproduced tables or dataset. Detailed republication terms and third-party exceptions were not assessed.
- Disposition: **reference links only; uncertain for imported content and therefore excluded**. Not evidence of FDA endorsement or a release-specific submission determination.

### S07 — CDISC Knowledge Base, examples and external sample studies

- Publisher: CDISC. [Knowledge Base](https://www.cdisc.org/kb), rolling pages; per-example version/date not selected.
- Per-artifact licenses and attribution have not been established. A repository's code license cannot be presumed to cover its clinical dataset.
- Disposition: **uncertain; no copied examples, pilot datasets, definitions, or screenshots**. Use original synthetic fixtures. Link to CDISC with title attribution only.

### S08 — Vendor documentation

- Publishers: OpenClinica and Certara. [OpenClinica technical guide](https://docs.openclinica.com/3-1-technical-documents/?r=2274), legacy 3.x context, publication date not confirmed; [Pinnacle 21 resources](https://www.certara.com/pinnacle-21-enterprise-software/), current landing page, version/date unspecified.
- Reference-only comparison; no API schemas, code, screenshots, or datasets copied. Redistribution licenses and required notices not assessed.
- Disposition: **uncertain for incorporation; excluded**. Name publishers and link original pages in discovery citations.

### S09 — External medical dictionaries and instruments

MedDRA, WHODrug, SNOMED CT, questionnaires and rating instruments are not selected data sources. No versions downloaded, rights reviewed, or attribution grants assumed. **Excluded/uncertain**; no coded clinical terms or instrument items may be introduced through sample data or CT expansion. Original plain-language symptom text is not represented as dictionary-coded content.

### S10 — ClinDevLab original material

Publisher/author: personal project owner and independent contributors. Version: content release `1.0.0` planned; publication date pending. Source: this repository; public remote URL unverified. Original explanatory text, selected teaching identifiers, and invented sample values only. Distribution in this project is intended; outbound open-source/content license selection remains for the owner before public release. Until then, do not claim the whole repository is MIT or CC-licensed. This does not block local implementation. Third-party imports retain separate notices.

## Metadata fallback contract

The default explorer is an authored curriculum, not an extracted standards database. Its records contain independently written titles, explanations, example fields, source links, and a declared teaching context. Official label, core, role, type, notes, order, and CT bindings are absent. Display “Official metadata is not bundled; consult the linked standard.” A metadata field becomes publishable only after exact-version evidence and distribution permission are recorded per field. No legal uncertainty blocks this fallback.

## Optional ingestion process

1. Fetch only a specifically selected public NCI CT release during a manual maintenance task; production builds are offline. Never access employer credentials or auto-follow authenticated links.
2. Keep candidate bytes outside the tracked distribution. Record URL, response/date, file digest, release header and relevant notices in a manifest. Do not use mutable “latest” as the sole identity.
3. Parse strict TSV/text headers; preserve strings, codes, case and parent-child membership. Reject malformed encoding, duplicate conflicting identities, unexpected columns, or release mismatches. XML is unnecessary for V1.
4. Select the complete two-list allowlist by verified submission name; preserve list-level extensibility and all member records from that release. Do not truncate a codelist and imply completeness.
5. Validate unique `(release, codelistId, termId)` memberships, sources, allowed field set, and no dangling parents. Compare to the previous approved manifest and review added/removed records.
6. Publish only normalized approved records, digest manifest, attribution and exact release provenance. Delete/quarantine unapproved generated output. Search must consume the same approved set.
7. If checks fail, keep `terminologyMode: links-only`; no guessed records and no broken empty browser. No permission request is needed to use this fallback.

## Technology references and dependency licensing

Technical documentation is consulted and linked, not copied into product content: [Next.js static export](https://nextjs.org/docs/app/guides/static-exports) (updated 2026-03-25), [Astro collections](https://docs.astro.build/en/guides/content-collections/) (rolling), [Pagefind](https://pagefind.app/) (rolling), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) (version 2.2), [Vercel pricing](https://vercel.com/pricing) (rolling), [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) (updated 2026-09-05). No documentation-reproduction license is assumed. Actual package versions, licenses, notices and transitive dependencies must be inventoried in Prompt 2 before distribution; no dependencies were installed in this phase.

## Prompt 3 update

The owner has selected https://clindevlab.com and authorized initial source publication without choosing an outbound license. This supersedes the earlier requirement to select a reuse license before initial source publication. Original material remains unlicensed; third-party rights and inclusion gates are unchanged. Deployment remains separately gated. See RELEASE-V1.md.
