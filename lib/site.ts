import type { Metadata } from 'next';

export const PRODUCTION_ORIGIN = 'https://clindevlab.com';
export const SITE_DESCRIPTION =
  'Learn clinical research software engineering, EDC, CDISC and SDTM through original lessons and synthetic examples.';
export function pageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const production = process.env.SITE_MODE === 'production';
  if (
    production &&
    process.env.SITE_ORIGIN &&
    process.env.SITE_ORIGIN !== PRODUCTION_ORIGIN
  )
    throw Error('Production SITE_ORIGIN must be https://clindevlab.com');
  return {
    title,
    description,
    alternates: production
      ? { canonical: `${PRODUCTION_ORIGIN}${path}` }
      : undefined,
    robots: { index: production && path !== '/search/', follow: true },
    openGraph: {
      type: 'website',
      siteName: 'ClinDevLab',
      title,
      description,
      ...(production ? { url: `${PRODUCTION_ORIGIN}${path}` } : {}),
      locale: 'en_US',
    },
    twitter: { card: 'summary', title, description },
  };
}
