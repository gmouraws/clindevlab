import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navigation } from '../components/interactive';
import { SITE_DESCRIPTION } from '../lib/site';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'ClinDevLab · A field guide to clinical data',
    template: '%s · ClinDevLab',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'ClinDevLab',
  icons: { icon: { url: '/icon.svg', type: 'image/svg+xml' } },
  robots: { index: process.env.SITE_MODE === 'production', follow: true },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main" tabIndex={0}>
          Skip to content
        </a>
        <header className="site-header">
          <a className="wordmark" href="/" aria-label="ClinDevLab home">
            ClinDev<span>Lab</span>
            <span className="edition">FIELD GUIDE / 01</span>
          </a>
          <Navigation />
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div>
            <a className="footer-brand" href="/">
              ClinDevLab
            </a>
            <p>Clinical software engineering for developers.</p>
            <p className="fine">
              Independent education. Synthetic examples only.
              <br />
              Not an official CDISC reference or regulatory validator.
            </p>
          </div>
          <nav aria-label="Footer">
            <a href="/about/">About</a>
            <a href="/legal/">Privacy & legal</a>
            <a href="/reference/sources/">Sources</a>
            <a href="/reference/standards-and-versions/">
              Standards & versions
            </a>
          </nav>
          <span className="fine">
            BUILD-002
            <br />
            Content edition 1.0.0
          </span>
        </footer>
      </body>
    </html>
  );
}
