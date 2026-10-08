'use client';
import { useEffect, useRef, useState } from 'react';
import { parseState, search, type SearchRecord } from '../lib/search';
import type { Domain } from '../lib/schema';
const base = '/explore/sdtm/2-0/ig/3-4/';

export function Navigation() {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 1024px)');
    const sync = () => {
      if (ref.current) ref.current.open = desktop.matches;
    };
    sync();
    desktop.addEventListener('change', sync);
    return () => desktop.removeEventListener('change', sync);
  }, []);
  return (
    <details
      className="navigation"
      ref={ref}
      open
      onKeyDown={(e) => {
        if (
          e.key === 'Escape' &&
          ref.current &&
          !matchMedia('(min-width: 1024px)').matches
        ) {
          ref.current.open = false;
          ref.current.querySelector('summary')?.focus();
        }
      }}
    >
      <summary>Menu</summary>
      <nav aria-label="Main navigation">
        <a href="/learn/">Learn</a>
        <a href="/explore/">Explore</a>
        <a href="/reference/resources/">Reference</a>
        <a className="nav-search" href="/search/">
          Search <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </details>
  );
}
export type Cell = string | number | null;
export function DatasetView({
  caption,
  columns,
  rows,
  links = {},
}: {
  caption: string;
  columns: string[];
  rows: Record<string, Cell>[];
  links?: Record<string, string>;
}) {
  const [records, setRecords] = useState(false),
    [overflow, setOverflow] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflow(el.scrollWidth > el.clientWidth + 1);
    const observer = new ResizeObserver(check);
    observer.observe(el);
    check();
    return () => observer.disconnect();
  }, []);
  const value = (row: Record<string, Cell>, key: string) => {
    const v = row[key];
    return v === null ? (
      <span className="null-value">null (missing)</span>
    ) : links[String(v)] ? (
      <a href={links[String(v)]}>{v}</a>
    ) : (
      String(v)
    );
  };
  return (
    <section className="data-view" aria-label={caption}>
      <div className="data-toolbar">
        <span className="eyebrow">
          {rows.length} records · all fields included
        </span>
        <button
          type="button"
          aria-pressed={records}
          onClick={() => setRecords(!records)}
        >
          {records ? 'Read as table' : 'Read as records'}
        </button>
      </div>
      <p className="scroll-hint" hidden={!overflow || records}>
        Scroll this table horizontally to inspect every field, or read as
        records.
      </p>
      <section
        ref={ref}
        className="table-scroll"
        aria-label={`${caption} table`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Bounded table scrolling requires keyboard access.
        tabIndex={0}
        hidden={records}
      >
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th scope="col" key={c}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={JSON.stringify(row)}>
                {columns.map((c, j) =>
                  j === 0 ? (
                    <th key={c} scope="row">
                      {value(row, c)}
                    </th>
                  ) : (
                    <td key={c}>{value(row, c)}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {records && (
        <div className="record-list">
          {rows.map((row, i) => (
            <article className="record" key={JSON.stringify(row)}>
              <h3>Record {i + 1}</h3>
              <dl>
                {columns.map((c) => (
                  <div key={c}>
                    <dt>{c}</dt>
                    <dd>{value(row, c)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
export function CodeView({ text, label }: { text: string; label: string }) {
  const [wrap, setWrap] = useState(false),
    [message, setMessage] = useState('');
  return (
    <section className="code-view" aria-label={label}>
      <div className="data-toolbar">
        <span>{label}</span>
        <div className="button-group">
          <button
            type="button"
            aria-pressed={wrap}
            onClick={() => setWrap(!wrap)}
          >
            {wrap ? 'Preserve lines' : 'Wrap lines'}
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(text);
                setMessage('Copied exact source text.');
              } catch {
                setMessage(
                  'Copy unavailable. Select the text or use the download.',
                );
              }
            }}
          >
            Copy
          </button>
        </div>
      </div>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: Code overflow must remain keyboard-scrollable. */}
      <pre className={wrap ? 'wrapped' : ''} tabIndex={0}>
        <code>{text}</code>
      </pre>
      <p className="status" role="status">
        {message}
      </p>
    </section>
  );
}
function useHash() {
  const [state, setState] = useState(() => parseState(''));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const restore = () => setState(parseState(location.hash));
    restore();
    setReady(true);
    window.addEventListener('hashchange', restore);
    window.addEventListener('popstate', restore);
    return () => {
      window.removeEventListener('hashchange', restore);
      window.removeEventListener('popstate', restore);
    };
  }, []);
  const update = (patch: Partial<typeof state>, push = false) => {
    const next = { ...state, ...patch };
    setState(next);
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) params.set(k, v);
    const hash = params.toString();
    history[push ? 'pushState' : 'replaceState'](
      null,
      '',
      `${location.pathname}${hash ? '#' + hash : ''}`,
    );
  };
  return [state, update, ready] as const;
}
export function DomainExplorer({ domains }: { domains: Domain[] }) {
  const [state, update, ready] = useHash();
  const shown = domains.filter(
    (d) =>
      (!state.class || d.class === state.class) &&
      `${d.code} ${d.teachingTitle} ${d.summary}`
        .toLowerCase()
        .includes(state.q.toLowerCase()),
  );
  return (
    <>
      <div className="filter-bar">
        <label>
          Find a domain
          <input
            disabled={!ready}
            type="search"
            maxLength={120}
            value={state.q}
            onChange={(e) => update({ q: e.target.value })}
          />
        </label>
        <label>
          Observation class
          <select
            disabled={!ready}
            aria-label="Observation class"
            value={state.class}
            onChange={(e) => update({ class: e.target.value }, true)}
          >
            <option value="">All classes</option>
            {['events', 'findings', 'interventions', 'special-purpose'].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </label>
        <button
          type="button"
          onClick={() => update({ q: '', class: '' }, true)}
        >
          Clear filters
        </button>
      </div>
      <p role="status">
        {shown.length} of 6 domains · {state.class || 'all classes'}
      </p>
      <div className="domain-grid">
        {shown.map((d) => (
          <a
            className="domain-card"
            href={`${base}domains/${d.slug}/`}
            key={d.code}
          >
            <span className="card-top">
              <strong className="domain-code">{d.code}</strong>
              <span className="tag">{d.class}</span>
            </span>
            <h2>{d.teachingTitle}</h2>
            <p>{d.summary}</p>
            <span className="card-bottom">
              {d.variableNames.length} selected variables{' '}
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
      {!shown.length && (
        <p>No domains match. Clear the filters to browse all six.</p>
      )}
    </>
  );
}
export function SearchPanel() {
  const [state, update, ready] = useHash(),
    [index, setIndex] = useState<SearchRecord[] | null>(null),
    [error, setError] = useState(false),
    [limit, setLimit] = useState(20),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    // The retry counter deliberately triggers a fresh same-origin request.
    if (attempt < 0) return;
    let active = true;
    setError(false);
    fetch('/search-index.json')
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((data) => {
        if (active) setIndex(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  const results = index ? search(index, state.q, state.kind, state.domain) : [];
  return (
    <>
      <form
        className="filter-bar search-controls"
        onSubmit={(e) => {
          e.preventDefault();
          update({}, true);
        }}
      >
        <label className="search-input">
          Search the field guide
          <input
            disabled={!ready}
            type="search"
            maxLength={120}
            value={state.q}
            placeholder="Try USUBJID, missing dates, or findings"
            onChange={(e) => {
              update({ q: e.target.value });
              setLimit(20);
            }}
          />
        </label>
        <label>
          Result kind
          <select
            aria-label="Result kind"
            disabled={!ready}
            value={state.kind}
            onChange={(e) => {
              update({ kind: e.target.value }, true);
              setLimit(20);
            }}
          >
            <option value="">All kinds</option>
            {[
              'article',
              'domain',
              'variable',
              'example',
              'glossary',
              'terminology',
            ].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label>
          Domain
          <select
            aria-label="Domain"
            disabled={!ready}
            value={state.domain}
            onChange={(e) => {
              update({ domain: e.target.value }, true);
              setLimit(20);
            }}
          >
            <option value="">All domains</option>
            {['ae', 'cm', 'dm', 'ex', 'lb', 'vs'].map((d) => (
              <option key={d} value={d}>
                {d.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={() => {
            update({ q: '', kind: '', domain: '' }, true);
            setLimit(20);
          }}
        >
          Clear filters
        </button>
      </form>
      <p className="muted">
        Search stays in your browser. No query history is stored or sent to a
        search service.
      </p>
      {error ? (
        <div role="alert">
          <p>
            The search index could not load. Browse the sections below or retry.
          </p>
          <button type="button" onClick={() => setAttempt(attempt + 1)}>
            Retry search
          </button>
        </div>
      ) : !index ? (
        <p role="status">Loading the local index…</p>
      ) : state.q.trim() ? (
        <>
          <p role="status">
            {results.length} {results.length === 1 ? 'result' : 'results'} for “
            {state.q}” · {state.kind || 'all kinds'} ·{' '}
            {state.domain.toUpperCase() || 'all domains'}
          </p>
          <ol className="search-results">
            {results.slice(0, limit).map((r) => (
              <li key={`${r.kind}:${r.id}`}>
                <span className="eyebrow">
                  {r.kind}
                  {r.domain
                    ? ` / ${r.domain.toUpperCase()} · Model 2.0 / IG 3.4`
                    : ''}
                </span>
                <h2>
                  <a href={r.url}>{r.title}</a>
                </h2>
                <p>{r.summary}</p>
              </li>
            ))}
          </ol>
          {!results.length && (
            <p>No matches. Try a variable identifier or clear the filters.</p>
          )}
          {results.length > limit && (
            <button type="button" onClick={() => setLimit(limit + 20)}>
              Show more
            </button>
          )}
        </>
      ) : (
        <p>
          Start with a concept or an identifier. Exact variable codes appear
          first.
        </p>
      )}
      <div className="browse-links">
        <a href="/learn/">Browse lessons</a>
        <a href={base}>Browse domains</a>
        <a href={`${base}variables/`}>Browse variables</a>
      </div>
      <noscript>
        Interactive search requires JavaScript. All content remains available
        through the browse links.
      </noscript>
    </>
  );
}
