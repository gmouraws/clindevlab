# Product vision

Decision date: 2026-10-08. Status: recommended product hypothesis, not market validation.

ClinDevLab helps developers understand how clinical research data moves from collection structures to standardized tabular representations. Its useful unit is a connected explanation, variable example, and source trail—not the largest possible catalog. The public English product targets international software engineers and is independently maintained by `gmouraws` as BUILD-002.

## Outcome and positioning

A learner should be able to explain why one EDC form is not necessarily one SDTM dataset, distinguish a subject identifier from a row identifier, recognize different observation classes, and follow a synthetic value from collection to a tabular example. They should know when to consult an official specification rather than trust an educational simplification.

The proposed experience combines a short learning path with six curated domain lessons and linked variable pages. It complements official CDISC and NCI resources. It does not replace them, implement an EDC, prescribe clinical care, or certify submission readiness.

## Task-based personas

These are design hypotheses derived from task analysis, not people interviewed.

1. **Backend/full-stack newcomer.** Task: understand study, participant, visit, form, and repeated measurement relationships before designing an integration. Questions: what is EDC, and why are exports different from application tables? Likely friction: unfamiliar acronyms and hidden assumptions about clinical workflows. Outcome: explain the collection-to-tabulation diagram and identify three transformation decisions in the VS example.
2. **Integration developer.** Task: reason about identifiers, repeat events, missing values, and dates in an incoming payload. Questions: can I flatten the form, how do I retain traceability, and what must be reviewed by a domain specialist? Likely friction: vendor-specific APIs confused with standards. Outcome: trace three input fields to synthetic output rows and identify a deliberately unsupported mapping.
3. **SDTM structure learner.** Task: inspect AE, DM, or LB and understand row granularity and variable naming. Questions: which class is this, is this list complete, and which version applies? Likely friction: metadata presented without examples or context. Outcome: navigate from a domain to a variable and back, correctly distinguish example schema from official metadata.
4. **Technical terminology learner.** Task: distinguish a codelist, a term concept, and a submission value. Questions: is a C-code a value, can a list be extended, and which release is in use? Likely friction: confusing NCIt concepts with versioned CDISC list membership. Outcome: find the official terminology distribution and explain why an unverified binding remains absent.

## Value hypothesis and success measures

Proposed differentiators: engineering explanations, cross-linked small examples, visible provenance and version scope, and honest incomplete-reference states. These are product decisions, not claims that no competitor offers them.

After a release candidate exists, seek five consenting target developers through separately authorized recruitment. Proposed evaluation: four of five complete domain-to-variable navigation in two minutes; four explain model versus IG versus CT after reading the lesson; three correctly trace a measurement in five minutes. Record failures and revise content before enlarging the catalog. These targets are not observed results. No collection of participant clinical information is needed.

## Scope discipline

Optimize for one maintainer. No commercialization assumption, vendor integration, account system, user dataset upload, AI tutor, or regulatory validation. Reconsider expansion only after usability evidence and lawful data availability support it.
