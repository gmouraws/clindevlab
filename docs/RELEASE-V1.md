# BUILD-002 — Release v1 and production readiness

## Scope and checkpoint

Curated educational release: 8 articles, 6 SDTM domains, 44 variable lessons, 24 glossary concepts, 3 synthetic walkthroughs, local search and 78 routes. Teaching context remains SDTM 2.0 / SDTMIG 3.4. English only. Official metadata is unavailable; terminology is links-only. No application scope expansion.

Prompt 3 authorizes source publication to **gmouraws/clindevlab** and a release PR targeting main. **Do not merge, deploy, create/import a Vercel project, connect the domain or change DNS until owner approval.** The future canonical origin is **https://clindevlab.com**. Preparing files locally does not perform those actions.

## Audit and repository status

The initial repository had no commits or branches on GitHub, and all local application files were untracked. The local origin is `https://github.com/gmouraws/clindevlab.git`. The GitHub connector reported authenticated identity `gmouraws` and administrative/push access to exactly that public repository. Local GitHub CLI is unavailable; no global identity, credentials or authentication configuration was changed.

Publication status, PR and final evidence are recorded below when verified. A minimal bootstrap commit on main is necessary to provide a PR base for the empty repository; application code must remain on the release branch until owner review.

Release hardening adds canonical-origin enforcement, per-page Open Graph/Twitter metadata, an original local SVG favicon, HTML-alias header coverage in the local preview, source hygiene scanning and build-matched hosting artifacts. No clinical metadata, copyrighted standards content or external assets were added.

## Licensing and human verification

Original code/content has no outbound license selected. The package remains private/UNLICENSED (npm publication disabled). This does not prevent the owner-authorized initial GitHub source publication; it does not grant a public reuse license. Dependency notices and copyrights are retained separately, with 438 lockfile records and 445 collected notice/license files in this Windows build. Optional platform packages differ across runners. No terminology extract or official standard is redistributed.

Outstanding before production approval: human screen-reader review, actual 200% text/400% browser zoom, physical phone/tablet testing, qualified educational-content review and real Safari native-select/CSP verification. Automated axe/keyboard/emulation does not prove these. The bounded Windows WebKit warning remains documented; CSP is not relaxed. Hosting eligibility/cost, live header routing, HTTPS and domain control remain unverified until the authorized deployment stage.

## Post-merge production procedure — not executed

1. Owner reviews the PR, source/licensing limitations, CI and manual-check evidence, then explicitly authorizes merge and deployment. Record the approved commit. Never use this checklist as authorization by itself.
2. In the personal Vercel scope, confirm current plan eligibility/cost. Import only `gmouraws/clindevlab` with the GitHub integration scoped to this repository. Set production branch `main`; other approved branches produce previews. Creating/importing a project can deploy immediately, so do not begin it before approval.
3. Use Framework Preset **Other**, repository root, Node 22.x (the project pins 22.23.3), install command `npm ci`, build command `npm run build:host`. Use the generated Build Output API artifact `.vercel/output/`, not `.next/` and not a stale copied header configuration. Do not enable a Next server runtime. If provider detection/settings do not consume this artifact as documented, stop promotion and resolve on an authorized preview.
4. `build:host` derives mode from provider `VERCEL_ENV`: production uses the approved origin; all other environments build noindex previews. No secrets are needed. Do not set `SITE_MODE` globally; the wrapper controls it. An optional `SITE_ORIGIN` must match `https://clindevlab.com`; ordinary direct builds default to noindex. The production test command builds this origin locally and then restores preview output.
5. The build generates `out/`, validates content/links/notices/metadata, then copies it with route-specific final-HTML CSP hashes into `.vercel/output/static`. Version-3 routing rules serve canonical trailing-slash paths, redirect explicit index.html aliases, and return a genuine 404 with matching headers. Never transplant hashes from a different build. The older `artifacts/vercel.static.json` is diagnostic; it is not a configuration to paste before a build.
6. Verify an authorized preview first: noindex HTML and X-Robots-Tag, disallowing robots file, empty sitemap, no production canonical, CSP/headers, no console errors, navigation, search, filtering, table/record parity, code/copy and all downloads. Noindex is not access control; review preview-access settings. Disable unnecessary analytics/toolbar injection or explicitly assess compatibility with strict CSP.
7. After approval, add apex `clindevlab.com` and `www.clindevlab.com` in the project's Domains settings. Keep the apex as primary and set a permanent **www → apex** redirect, preserving path/query. Do not create the reverse redirect. Inspect the exact DNS values Vercel provides for this project: use the required apex A/ALIAS and www CNAME targets, and any ownership TXT record. Do not guess IP addresses or overwrite unrelated MX/TXT records. Document existing records before editing only the necessary ones.
8. Wait for DNS and provider domain verification and managed TLS issuance. Verify valid HTTPS for both hosts, HTTP→HTTPS, www→apex and no redirect loop. Do not enable HSTS includeSubDomains/preload without separately reviewing the entire domain scope. Canonical and OG URLs must use the apex regardless of which hostname receives the request.
9. On the actual production deployment, check home, an article, domain, variable, all walkthrough downloads, search retry/filter/history, icon, legal notices and an unknown URL. Confirm real 404 status, MIME, CSP, frame/referrer headers, canonical/OG URLs, indexable content, noindex search, production sitemap excluding search/404, and robots pointing at the canonical sitemap. Review provider logs/retention and update Privacy with verified hosting facts. Recheck budgets and runtime errors. Store deployment URL/ID, commit, build manifest and headers together.
10. Rollback: retain the previous reviewed deployment and use Vercel Instant Rollback to that exact deployment when available, preserving its matching assets/headers. For a first launch with no previous deployment, stop promotion or restore the pre-launch domain state from the recorded DNS snapshot only when authorized. If a rebuild is needed, rebuild the known-good pinned commit and rerun checks; never mix artifacts or reintroduce withdrawn content. Verify all smoke tests after rollback and explicitly review resumption of automatic production promotion.

Provider documentation checked during this audit: [Build Output API configuration](https://vercel.com/docs/build-output-api/configuration), [build settings](https://vercel.com/docs/builds/configure-a-build), [custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [domain redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting), [Instant Rollback](https://vercel.com/docs/instant-rollback). The procedure combines those interfaces with this project's build contracts; provider behavior has not been live-tested.

## Verified local audit

2026-10-08: full release command passed; 22 unit tests; browser matrix 136 passed / 32 intentional duplicate-coverage skips / 0 failed; axe 13 templates with zero serious/critical findings. Static routes: 78, no export failures. All 11 outbound links resolved. Dependency vulnerabilities: 0. Source hygiene: 76 candidate files, no findings. Lighthouse home/article/VS performance 99/99/98, accessibility/SEO 100 throughout, CLS 0. Local hosting route/header/alias/fallback verification passed. Detailed commands, metrics and limits are in IMPLEMENTATION-REPORT.md. All production results are local tests, not live-host proof.

## Publication checkpoint — blocked before remote publication

Authenticated GitHub identity: **gmouraws** (connector). Verified remote: **https://github.com/gmouraws/clindevlab.git**; repository owner/name and reported push permission match. However, the first minimal bootstrap-file write was rejected by GitHub with **403 Resource not accessible by integration**. No source file, branch or PR was published; no CI run exists for this release. Repository-level user permission did not establish the integration's write permission.

Required owner action: authorize the GitHub connection for this repository with contents write (including workflow-file updates), pull-request write and Actions/check read access, or make the normal GitHub CLI available authenticated as gmouraws. Do not share tokens in chat. The agent did not change credentials, install authentication workarounds or try another write route after the rejection. Reverify identity/remote before resuming publication.

Prepared release branch: `release/v1`, targeting `main`. Local commits retain a minimal ignore-file bootstrap on main and the reviewed implementation on the release branch. PR URL: **not created**. GitHub Actions status: **not run**. The workflow's pinned action SHAs were verified publicly and the same release command passed locally. No merge, Vercel project/configuration, domain attachment or DNS action occurred.

### Prepared PR description

Title: `feat: release ClinDevLab BUILD-002 v1`

Introduce the independent clinical software engineering field guide: eight original lessons, six SDTM domains, 44 variable lessons, glossary, three synthetic walkthroughs and local search. Preserve authored-only metadata and links-only terminology, responsive table/record access and source attribution.

Validation: 22 unit tests; 136 passing browser tests across 24 projects with 32 intentional duplicate-coverage skips; 78 validated static routes; no serious/critical axe findings across 13 templates; zero dependency vulnerabilities; source hygiene and reproducible notice integrity pass. Local Lighthouse performance 99/99/98 for home/article/VS; accessibility and SEO 100 throughout. CI must run once publication authorization is repaired.

Release hardening adds the approved canonical origin, per-page social metadata, original favicon, public README and build-matched hosting artifacts. Original material has no outbound reuse license; dependency notices remain intact; no restricted standards or terminology data is bundled. Manual accessibility/device/Safari and qualified content review remain outstanding. Production is prepared for GitHub → Vercel → https://clindevlab.com, with www redirected to the apex, noindex previews and documented smoke/rollback procedures. Do not merge or deploy before owner approval.
