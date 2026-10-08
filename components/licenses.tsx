import fs from 'node:fs';

type Package = {
  name: string;
  version: string;
  license: string;
  installed: boolean;
  category: string;
  location: string;
};
export function ThirdPartyLicenses() {
  const inventory = JSON.parse(
    fs.readFileSync('public/license-inventory.json', 'utf8'),
  ) as { packages: Package[] };
  const groups = [
    [
      'browser-runtime',
      'Browser runtime',
      'React, React DOM and their scheduler support interactive lessons. Next.js also supplies browser code, alongside build tools. Only portions of these packages are included in the static website.',
    ],
    [
      'build-or-transitive',
      'Build support and other dependencies',
      'MDX compiles local lessons and Zod validates content during the build. This group also includes transitive and optional packages from the production dependency graph. A production dependency declaration alone does not prove that a package is delivered to your browser.',
    ],
    [
      'development',
      'Development and test tools',
      'These packages support compilation, formatting, testing and release checks. The static export does not distribute the installed development toolchain or its native binaries.',
    ],
  ];
  return (
    <div className="prose">
      <p>
        ClinDevLab is built with open-source software. This page acknowledges
        that work and explains where to find its licenses.
      </p>
      <p>
        <a href="/third-party-notices.txt">
          Read or save the complete software notices (plain text)
        </a>
        . The file preserves collected copyright statements, license texts and
        notices, including components bundled inside Next.js.
      </p>
      <p>
        The notices deliberately include more than the code delivered to your
        browser: build and test tools are retained too. The groups below
        describe usage, not permission to omit attribution. A package may serve
        more than one role.
      </p>
      {groups.map(([id, title, description]) => {
        const packages = inventory.packages.filter((p) => p.category === id);
        return (
          <section key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
            <details>
              <summary>View {packages.length} dependency records</summary>
              <ul>
                {packages.map((p) => (
                  <li key={p.location}>
                    <strong>{p.name}</strong> {p.version} — {p.license}
                    {!p.installed &&
                      ' (optional platform package; not installed in this build)'}
                  </li>
                ))}
              </ul>
            </details>
          </section>
        );
      })}
      <h2>How this record is maintained</h2>
      <p>
        Every build checks installed versions against the dependency lockfile,
        rejects unknown licenses, and regenerates the inventory and notices
        twice to verify identical output. Optional platform packages are listed
        from the lockfile; their files are collected only when installed.
        Bundled Next.js notices are retained separately in full.
      </p>
      <p>
        <a href="/license-inventory.json">
          Download the detailed license inventory (JSON)
        </a>
        , including file hashes for review. This inventory describes this build
        environment; it is not a precise list of every module in the browser
        bundles.
      </p>
      <p>
        Clinical standards and teaching sources are documented separately in{' '}
        <a href="/reference/sources/">Sources and provenance</a>. For original
        ClinDevLab material, see{' '}
        <a href="/legal/">Privacy and legal information</a>.
      </p>
    </div>
  );
}
