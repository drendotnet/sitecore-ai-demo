import Link from 'next/link';

export type BreadcrumbsProps = {
  show?: boolean;
  pathname: string;
  siteName?: string;
  locale: string;
  heading: string;
};

function formatBreadcrumbLabel(segment: string) {
  const label = decodeURIComponent(segment).replace(/[-_]+/g, ' ');
  return label.charAt(0).toLocaleUpperCase() + label.slice(1);
}

export default function Breadcrumbs({ show = true, pathname, siteName, locale, heading }: BreadcrumbsProps) {
  if (!show) return null;

  const segments = pathname.split('/').filter(Boolean);
  let prefixLength = 0;

  if (siteName && segments[0]?.toLowerCase() === siteName.toLowerCase()) {
    prefixLength += 1;
  }
  if (segments[prefixLength]?.toLowerCase() === locale.toLowerCase()) {
    prefixLength += 1;
  }

  const prefix = segments.slice(0, prefixLength);
  const pageSegments = segments.slice(prefixLength);
  const homeHref = prefix.length ? `/${prefix.join('/')}` : '/';

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {pageSegments.length === 0 ? (
          <li className="breadcrumbs__element breadcrumbs__element--active" aria-current="page">
            {heading || 'Home'}
          </li>
        ) : (
          <>
            <li className="breadcrumbs__element breadcrumbs__element--desktop">
              <Link href={homeHref}>Home</Link>
            </li>
            {pageSegments.map((segment, index) => {
              const isActive = index === pageSegments.length - 1;
              const href = `/${[...prefix, ...pageSegments.slice(0, index + 1)].join('/')}`;

              return (
                <li
                  className={`breadcrumbs__element${isActive ? ' breadcrumbs__element--active' : ''}`}
                  key={href}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive ? heading || formatBreadcrumbLabel(segment) : <Link href={href}>{formatBreadcrumbLabel(segment)}</Link>}
                </li>
              );
            })}
          </>
        )}
      </ol>
    </nav>
  );
}
