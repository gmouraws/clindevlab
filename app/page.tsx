import { VersionStrip } from '../components/editorial';
import { BASE } from '../lib/data';
import { pageMetadata, SITE_DESCRIPTION } from '../lib/site';
export const metadata = pageMetadata(
  '/',
  'A field guide to clinical data',
  SITE_DESCRIPTION,
);
export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">An independent field guide</p>
          <h1>
            Understand the science.
            <br />
            <em>Read the data.</em>
            <br />
            Build with context.
          </h1>
          <p className="hero-description">
            Learn clinical research software engineering: from electronic data
            capture (EDC) to CDISC standards and the Study Data Tabulation Model
            (SDTM). Explore clinical data concepts through guided lessons and
            synthetic examples.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/learn/">
              Start learning <span aria-hidden="true">→</span>
            </a>
            <a className="text-action" href={BASE}>
              Explore six domains <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="fine">
            For software engineers entering clinical research.
          </p>
        </div>
        <div className="specimen">
          <div className="specimen-head">
            <span className="eyebrow">Observation 001</span>
            <span className="tag">Synthetic</span>
          </div>
          <p className="specimen-label">A value is only the beginning.</p>
          <div className="specimen-value">
            72<span>recorded as text</span>
          </div>
          <dl className="specimen-fields">
            <div>
              <dt>WHO</dt>
              <dd>
                SYN-001 <span>Subject identity</span>
              </dd>
            </div>
            <div>
              <dt>WHAT</dt>
              <dd>
                DEMO_A <span>Teaching token</span>
              </dd>
            </div>
            <div>
              <dt>WHEN</dt>
              <dd>
                2025-02-03 <span>Recorded date</span>
              </dd>
            </div>
          </dl>
          <p className="specimen-note">
            Identity, meaning and timing turn a value into an observation you
            can reason about.
          </p>
          <a href="/examples/vital-signs-rows/">
            Follow this example <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <VersionStrip />
      <section className="home-section">
        <div className="section-intro">
          <p className="eyebrow">Find your footing</p>
          <h2>
            A bridge between software
            <br />
            and clinical research.
          </h2>
          <p>
            No clinical background required. Bring your curiosity about how
            systems and data fit together.
          </p>
        </div>
        <ol className="pathways">
          <li>
            <span className="step-number">01</span>
            <div>
              <h3>
                <a href="/learn/">Build a mental model</a>
              </h3>
              <p>
                From studies and collection forms to the shape of a dataset.
                Eight connected lessons.
              </p>
            </div>
            <span aria-hidden="true">↗</span>
          </li>
          <li>
            <span className="step-number">02</span>
            <div>
              <h3>
                <a href={BASE}>Look inside a domain</a>
              </h3>
              <p>
                Explore six SDTM topics and 44 selected variable lessons, with
                context at every step.
              </p>
            </div>
            <span aria-hidden="true">↗</span>
          </li>
          <li>
            <span className="step-number">03</span>
            <div>
              <h3>
                <a href="/examples/">Trace an observation</a>
              </h3>
              <p>
                Inspect original synthetic inputs, output rows and the decisions
                between them.
              </p>
            </div>
            <span aria-hidden="true">↗</span>
          </li>
        </ol>
      </section>
      <section className="scope-band">
        <p className="eyebrow">Know the boundary</p>
        <h2>
          A learning companion.
          <br />
          With a clear trail to the source.
        </h2>
        <p>
          Every lesson distinguishes an authored explanation from an official
          rule. This curated edition links to the standards; it does not
          reproduce their metadata or validate clinical datasets.
        </p>
        <a href="/reference/standards-and-versions/">
          How to read this field guide →
        </a>
      </section>
    </div>
  );
}
