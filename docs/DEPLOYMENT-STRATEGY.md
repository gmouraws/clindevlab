# Deployment and cost strategy

Research date/access date: 2026-10-08. No account, domain, infrastructure or deployment was created. All future deployment actions require separate authorization.

## Recommendation and alternatives

**Preferred: Vercel, static export.** It aligns with Next.js and offers a straightforward later Git deployment workflow. [Pricing](https://vercel.com/pricing) lists Hobby at USD 0/month and Pro starting at USD 20/month, before applicable taxes. [Hobby documentation](https://vercel.com/docs/plans/hobby) restricts Hobby to personal, non-commercial use. An independent free educational project is a plausible fit, but promotion/monetization changes require checking provider terms; “personal repository” alone does not establish eligibility. Do not start a trial or upgrade automatically. The inspected Hobby documentation lists 1,000,000 edge requests; recheck live limits before deployment. Overage handling and service availability must not be assumed to be unlimited.

**Alternative: Cloudflare Pages, static export.** [Limits](https://developers.cloudflare.com/pages/platform/limits/) lists Free-plan 500 builds/month, one concurrent build, a 20-minute build timeout, 20,000 files, 25 MiB maximum per asset, and unlimited active previews. [Preview documentation](https://developers.cloudflare.com/pages/configuration/preview-deployments/) describes previews and default noindex headers. Functions are excluded from our design. This is a credible low-cost fallback with provider-specific headers and DNS setup; do not assume moving hosts is configuration-free.

No paid database, storage bucket, search provider, server function or email system is justified. GitHub Pages was not selected because host-level security-header control would need separate evaluation; no claim is made that it cannot host static pages.

## Planning assumptions and costs

Estimates, not measured usage or quotes: 5,000 monthly visits × 3 pages × 0.3 MB transferred/page ≈ 4.5 GB/month, excluding unusual repeat downloads and cache effects. At 10 requests/page this is roughly 150,000 requests/month. Assume under 100 HTML pages, under 100 MB total static output, and 60 builds/month. Actual build time, transfer size and provider accounting must be measured before launch.

Expected baseline hosting: USD 0/month while eligibility and quotas hold; custom domain optional. Budget USD 10–30/year for a conventional domain as a planning allowance, not a verified registrar price. Provider subdomain avoids purchase. Paid contingency: at least the advertised Pro starting price plus any usage/taxes, only if separately approved. CI cost depends on eventual repository visibility/account entitlement; no free-minute claim is made without verification. Engineering and standards-review time are the dominant unpriced costs.

## Domain and independence

Do not assume ownership or availability of any ClinDevLab domain. Do not change Blueprint DNS, hosting, repositories, or accounts. A future owner-selected domain or provider subdomain supplies `SITE_ORIGIN`; production build fails when origin is absent/invalid. Local/preview builds use a preview flag and noindex instead of an invented canonical production hostname.

If Cloudflare is selected later, follow its [custom-domain instructions](https://developers.cloudflare.com/pages/configuration/custom-domains/): apex-domain and externally managed subdomain paths have different DNS requirements. Apply only to the authorized personal project domain, with HTTPS verified before HSTS. Provider-managed certificates are part of the selected workflow; no certificate purchase is planned.

## Proposed release workflow

1. Verify personal account `gmouraws` and exact repository before any remote action; no remote action is required in Prompt 1.
2. Implement and run local checks in Prompt 2. Preserve a release report, artifact manifest and pinned dependency versions. Prepare host config files locally, without connecting a provider.
3. Only after deployment authorization, connect the verified personal repository/project. Treat preview publication as deployment too; no automatic preview setup is authorized now.
4. Later pull-request previews use approved artifacts only. They are noindex, never contain private data, and receive no production secrets. Verify headers on actual URLs; noindex is not access control.
5. Promote only a commit/artifact whose complete release gate passed. Record commit SHA, content profile, CT mode, build/tool versions and checksums. A build on a provider must reproduce the same validated inputs.
6. Check home, one article, domain, variable, example download, search, true 404, HTTPS, headers and canonical URLs after authorized publication.

## Rollback

Keep at least the prior reviewed artifact and its matching headers/manifests. Prefer provider rollback to that known production deployment; Cloudflare documents [rollback support](https://developers.cloudflare.com/pages/configuration/rollbacks/). The attempted Vercel rollback URL was inaccessible during this review, so verify its current plan/UI procedure before launch. Portable fallback: redeploy the archived known-good static artifact, or rebuild its pinned commit and compare output. Never hot-edit generated data alone. Preserve any licensing withdrawal: a rollback must not reintroduce revoked material. No database migration exists.

## Monitoring and maintenance

Begin with build logs, host availability/error views and manual smoke checks after releases. No third-party analytics or error SDK. Review quota use monthly after launch; verify references and dependency advisories during maintenance. Automated uptime/link checks may be added later if explicitly authorized and useful. Broken official links should be reviewed, not blindly replaced with unofficial mirrors. Provider features, prices and quotas are time-sensitive and must be rechecked at launch.
