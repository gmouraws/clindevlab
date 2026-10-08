# Local release operations

BUILD-002, 2026-10-08. No publication has been performed or authorized.

## Reproduce and inspect

1. Use Node 22.23.3 / npm 10.9.2 and `npm ci`.
2. Install the three pinned Playwright engines (`npx playwright install --with-deps chromium firefox webkit` on Linux).
3. Run `npm run check:release`. This validates content, types, lint, units, the static build, internal links, sizes, provenance, downloads, licenses and the browser matrix.
4. The release command includes `npm run check:production`; it can also run separately with no preview server running. This builds with a reserved `.invalid` origin for local SEO/performance checks, saves results, then restores preview output even on failure. The simulation does not prove a real host configuration. `npm run check:benchmark` records engine versions and 100 warm-query timings.
5. Run `npm run preview`; open localhost:4173. It applies generated final-HTML CSP hashes and standard security headers. The server binds loopback only and is a test/review tool, not a public web server.

`artifacts/build-manifest.json` lists SHA-256 hashes and byte sizes for every exported file. `headers.json` maps routes to final-HTML hashes and headers. Keep these with the matching `out/` directory: rebuilding changes inline script hashes. `export-report.json`, `dependency-licenses.json`, `playwright-results.json`, screenshots and Lighthouse reports provide evidence. Build IDs/framework chunks can differ between builds; deterministic authored search and fixture outputs are verified separately.

## Host preparation, not deployment

Primary prepared target: Vercel static hosting. The export generates `artifacts/vercel.static.json` with route-specific headers and `outputDirectory: out`. Review and copy it to the provider configuration only during a separately authorized publication. There is no provider account connection, deployment hook, token or domain configuration in this implementation.

For a real publication, explicitly set `SITE_MODE=production` and `SITE_ORIGIN` to the owner's verified HTTPS origin. The build rejects a missing/invalid production origin and validates route canonicals. The default build is noindex, with a disallowing robots file and an empty sitemap; search stays noindex in either mode. Never use the `.invalid` lab origin publicly. Serve unknown paths as an actual 404 with `404.html`, not a 200 fallback.

Apply the generated per-route CSP and shared headers to canonical routes and equivalent HTML URLs. Verify provider route matching, clean-URL redirects, cached assets, compression and header-size limits on a preview before promotion. HSTS belongs on the actual HTTPS host after verifying its certificate and domain scope. The local HTTP server cannot prove HTTPS/HSTS, provider caching or live headers.

Rollback: retain an immutable copy of the last verified `out/`, its matching header config and manifest. Restore that whole version atomically using the selected provider's previous-deployment mechanism; never mix HTML from one build with another build's CSP hashes. Recheck home, a variable, search, 404, downloads and response headers after rollback. No rollback was executed against a remote system.

## Publication gates

1. Finish the manual accessibility supplements: human screen reader, actual 200% text zoom/400% browser zoom, and physical phone/tablet keyboard/touch behavior. Review native WebKit select warnings on real Safari.
2. Obtain educational-content review; current explanations and fixtures are not clinical/SDTM validation. Review original content corrections and source/version context.
3. Choose an outbound license for original code/content. Keep third-party notices; restricted CDISC metadata and CT remain excluded. The license inventory includes build/test packages, including native image tooling that is not part of the static browser artifact.
4. Obtain explicit publication authorization. Before any remote repository operation verify the personal account `gmouraws` and exact target `gmouraws/clindevlab` without displaying credentials.
5. Confirm provider eligibility/cost, origin and domain ownership. Build with the real origin, run release gates, review prepared headers, then deploy only as authorized.
6. Verify live HTTPS, canonicals/sitemap/robots, CSP, MIME/frame/referrer headers, no unexpected runtime requests, 404s and download bytes. Preserve evidence and rollback artifacts.

The local GitHub Actions workflow has read-only repository permissions, no secrets, pinned action commits and no deployment job. It has not run remotely.

## Prompt 3 production plan

The approved origin is now https://clindevlab.com. The current post-approval procedure is in RELEASE-V1.md, including build-matched Build Output API routing, preview isolation, www-to-apex strategy and rollback. No provider or DNS action has been performed. Earlier reserved-origin simulation instructions are superseded by local validation with the approved origin.
