# Clinical standards research

All sources accessed 2026-10-08. This document separates factual research, original teaching decisions, and unavailable normative metadata.

## Selected version context

[SDTM 2.0](https://www.cdisc.org/standards/foundational/sdtm/sdtm-v2-0) and [SDTMIG 3.4](https://www.cdisc.org/standards/foundational/sdtmig/sdtmig-v3-4) were published on 2021-11-29; the IG page specifies their pairing. The model defines general structures, while the human-clinical-trial IG applies them to datasets. CDISC lists [SDTM 3.0 and SDTMIG 4.0 as in development](https://www.cdisc.org/standards/in-development), projected for 2027, as observed on the access date. Do not treat projections as release commitments.

Controlled Terminology is separately versioned: [CDISC's release announcement](https://www.cdisc.org/standards/terminology/controlled-terminology) identifies 2026-09-25, package P62. This is the candidate CT release, not a claim that its binary files have been verified here. Selecting an IG does not automatically select a CT release.

## Conceptual structure

The public [SDTMIG 3.3 HTML](https://www.cdisc.org/standards/foundational/sdtmig/sdtmig-v3-3/html) was consulted for conceptual background only. General observation classes include Interventions, Events, and Findings; special-purpose and trial-design structures also exist. In the proposed teaching set, CM/EX illustrate interventions, AE events, LB/VS findings, and DM special-purpose data. A domain groups related observations; a variable describes an attribute. Generic names such as `--TESTCD` acquire a domain prefix, while identifiers such as `STUDYID` do not. Required variables need presence and nonmissing values; Expected variables need presence even where values are missing; Permissible variables depend on applicability and collected information. Permissible does not mean freely discard collected data. These simplified concepts do not assign core status to any V1 record. Exact status, exceptions, role, and type require the applicable IG. Older-version research cannot establish a 3.4 field value.

An instructive version hazard is the [SDTM 2.0 erratum](https://www.cdisc.org/standards/foundational/sdtm/sdtm-v2-0): a passage incorrectly described Subject Visits as Events; the correction identifies it as Special Purpose. The project must preserve correction dates and sources instead of silently treating every published paragraph as definitive.

## Metadata is not terminology

Dataset metadata describes a field's structure and use. CT describes controlled values and their concepts. A codelist identifier and a term identifier are separate entities; the same term may participate in more than one list. Submission values must not be replaced by NCI concept codes. Extensibility is a property to verify for a list and release, not permission to invent terms globally. A link to a codelist is not proof that every variable in a domain uses it. These distinctions guide our data model.

Sources: [NCI CDISC terminology](https://www.cancer.gov/about-nci/organization/cbiit/vocabulary/cdisc), [CDISC CT overview](https://www.cdisc.org/standards/terminology/controlled-terminology). The first describes date-versioned distribution; the second describes codelists and submission values. No codelist IDs or bindings are asserted by this planning package.

## Original teaching model for EDC-to-tabulation

Use an invented collection object containing study, subject, visit, measurement code, value, unit, and collection date. Show how repeated measurements become separate rows, how identifiers preserve traceability, and why null, absent, and unknown are different. The input shape is ClinDevLab-authored, not a vendor API or production eCRF. Do not imply a universal one-to-one mapping or produce an automatic converter.

Keep dates as strings in examples; distinguish a complete date from a partial date and avoid silently supplying a day. Keep original text separate from normalized numeric demonstration values. An educational example may demonstrate a transformation but cannot establish a clinically correct conversion, coding decision, or submission rule. Use fixed simple values with explicit assumptions.

## Three levels of claim

1. **Education:** independently written explanation with a worked synthetic example. Label it as a simplification.
2. **Standards reference:** exact-version verified field, permission evidence, source locator, and any erratum. These fields are absent in the default profile.
3. **Regulatory validation:** depends on applicable regulator, submission context, supported versions, conformance rules, and substantive review. Not implemented or claimed.

[FDA's study-data page](https://www.fda.gov/industry/fda-data-standards-advisory-board/study-data-standards-resources) and [March 2025 catalog landing page](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/data-standards-catalog) are reference links only. The catalog workbook was not evaluated for a particular submission; no acceptance date or regulatory mandate is inferred from the choice of teaching versions.

## Release content checks

Every domain lesson must explain granularity, identify its educational scope, and link the selected model/IG. Every variable lesson must distinguish example semantics from normative metadata. Every walkthrough must list omitted submission requirements and include a visible synthetic-data notice. Content review must catch version conflation, invented codelist associations, missing-value oversimplification, unlicensed dictionary terms, and claims of validation. Technical tests check only internal consistency; clinical review status must be reported separately.
