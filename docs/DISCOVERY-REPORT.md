# Discovery report

Research/access date for every source below: 2026-10-08.

## Verdict

Proceed with reduced reference scope: **a curated educational SDTM Explorer plus developer documentation**, built around authored explanations and synthetic examples. Do not launch as a complete browser of official SDTM metadata. This is technically feasible without a paid standards feed; product demand remains unvalidated.

## Evidence and interpretation

- **Verified:** CDISC provides a standards browser and API, with cdiscID/API-key access described in its [Library FAQ](https://www.cdisc.org/cdisc-library/faq). **Inference:** rebuilding catalog access alone offers weak differentiation.
- **Verified:** the [CDISC Knowledge Base](https://www.cdisc.org/kb) exposes articles and an examples collection. **Inference:** ClinDevLab should connect concepts to developer tasks rather than claim education is absent.
- **Verified:** [NCI distributes CDISC terminology](https://www.cancer.gov/about-nci/organization/cbiit/vocabulary/cdisc) without licensing restrictions and versions it by date. **Inference:** a small approved terminology supplement is feasible, but does not supply domain-variable metadata rights.
- **Verified:** [CDISC document terms](https://www.cdisc.org/terms-and-conditions) restrict redistribution. **Decision:** no official specifications, table extractions, or replicated catalog in the distributable package.
- **Verified:** [SDTMIG 3.4](https://www.cdisc.org/standards/foundational/sdtmig/sdtmig-v3-4) is paired with SDTM 2.0. [The development page](https://www.cdisc.org/standards/in-development) lists SDTM 3.0/SDTMIG 4.0 in development with projected publication in 2027. **Decision:** use the published 2.0/3.4 pair, never label the product evergreen or universally current.

## Adequately served problems

Authoritative specifications and standards browsing already exist through CDISC. Terminology lookup is served by NCI. Submission-oriented validation is an established tool category. Vendor API instructions exist. ClinDevLab need not recreate these services.

## Remaining friction hypotheses

New developers may struggle to connect form-centric structures, repeated observations, identifiers, terminology, and domain datasets. A compact cross-linked learning journey may reduce the cognitive cost of moving among separate resources. Desk research supports testing this hypothesis; it does not establish its prevalence, willingness to pay, or superior learning outcomes.

## Smallest useful release

Eight articles, six curated domains, a fixed list of 44 domain-variable lesson records, three walkthroughs, a 24-term authored glossary, official source links, and local search. The terminology area teaches concepts and links to official releases in the default profile. It is useful even with no imported reference corpus. Details and exact inventories are in MVP-SPECIFICATION.

## Research method and limits

Primary public pages were inspected; no private resources, accounts, employer directories, or standards downloads behind sign-in were accessed. Competitor assessment reflects documented capabilities, not hands-on benchmarking. EVS Explore is a JavaScript application whose interface was not exercised. One guessed OpenClinica URL failed; the official published documentation URL recorded in COMPETITIVE-ANALYSIS was found instead. No datasets were downloaded, checksummed, or imported. No software experiment was necessary to establish the documented static-export architecture, and no application performance was measured.

## Decision triggers

- Continue with authored-only V1 while official metadata redistribution remains unresolved.
- Add CT only after release-specific file/header/license checks pass; otherwise retain source links.
- Consider a full reference catalog only with explicit redistribution permission and demonstrated user need.
- Reduce to documentation plus examples if the six-domain pilot does not improve navigation or comprehension in later usability work.
- Stop expansion, not local implementation, if paid access or an incompatible license is required.

Risks and owners are recorded in DECISION-LOG. The next phase has sufficient technical direction; publication remains subject to content and release checks.
