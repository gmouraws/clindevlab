import type { ReactNode } from 'react';
import { sources } from '../lib/data';
export function VersionStrip() {
  return (
    <div className="version-strip">
      <span>
        Model <strong>2.0</strong>
      </span>
      <span>
        IG <strong>3.4</strong>
      </span>
      <span>
        Content <strong>1.0.0</strong>
      </span>
      <span>Curated educational coverage</span>
    </div>
  );
}
export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </header>
  );
}
export function Note({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="note">
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
export function Sources({ ids = ['sdtm', 'ig'] }: { ids?: string[] }) {
  return (
    <section className="sources" id="sources">
      <h2>Follow the source</h2>
      <p>
        Original ClinDevLab explanations. Publisher material is linked, not
        reproduced. Reviewed 8 October 2026.
      </p>
      <ul>
        {sources
          .filter((s) => ids.includes(s.id))
          .map((s) => (
            <li key={s.id}>
              <a href={s.url}>{s.title}</a>
              <span className="source-url">{s.url}</span>
              <span>
                {' '}
                · {s.publisher}
                {s.sourceVersion ? ` · ${s.sourceVersion}` : ''} · accessed{' '}
                {s.accessedAt}
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="/">Home</a>
        </li>
        {items.map((i) => (
          <li key={i.label}>
            {i.href ? (
              <a href={i.href}>{i.label}</a>
            ) : (
              <span aria-current="page">{i.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
