export default function NotFound() {
  return (
    <div className="page-shell">
      <p className="eyebrow">404 / Outside this field guide</p>
      <h1>This page isn’t in the collection.</h1>
      <p>
        The domain, variable or version may not be covered in this curated
        edition.
      </p>
      <a className="button" href="/explore/">
        Browse available content
      </a>
    </div>
  );
}
