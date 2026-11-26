'use client';

import { Image, Text, RichText, type Field, type ImageField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentWithContextProps } from 'lib/component-props';

export type FullWidthStageFields = {
  Heading?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
};

type FullWidthStageProps = ComponentWithContextProps & { fields?: FullWidthStageFields };

function formatBreadcrumbLabel(segment: string) {
  const label = decodeURIComponent(segment).replace(/[-_]+/g, ' ');
  return label.charAt(0).toLocaleUpperCase() + label.slice(1);
}

export default function FullWidthStage({ fields, page, params }: FullWidthStageProps) {
  const pathname = usePathname() ?? '/';
  if (!fields) return null;

  const segments = pathname.split('/').filter(Boolean);
  let prefixLength = 0;

  if (page.siteName && segments[0]?.toLowerCase() === page.siteName.toLowerCase()) {
    prefixLength += 1;
  }
  if (segments[prefixLength]?.toLowerCase() === page.locale.toLowerCase()) {
    prefixLength += 1;
  }

  const prefix = segments.slice(0, prefixLength);
  const pageSegments = segments.slice(prefixLength);
  const route = page.layout.sitecore.route;
  const heading = fields.Heading?.value || route?.displayName || route?.name || '';
  const homeHref = prefix.length ? `/${prefix.join('/')}` : '/';

  return (
    <section className="section section--stage full-width-stage" id={params.RenderingIdentifier || undefined}>
      <div className="content-stage">
        {fields.Image && (
          <div className="content-stage__image-wrapper">
            <Image field={fields.Image} className="content-stage__image" />
          </div>
        )}
        <div className="container">
          <div className="overlapped-content">
            <div className="content-stage__wrapper">
              <div className="content-stage__box">
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
                              {isActive ? (
                                heading || formatBreadcrumbLabel(segment)
                              ) : (
                                <Link href={href}>{formatBreadcrumbLabel(segment)}</Link>
                              )}
                            </li>
                          );
                        })}
                      </>
                    )}
                  </ol>
                </nav>
                {fields.Heading && <Text field={fields.Heading} tag="h1" className="content-stage__heading" />}
                {fields.Description && (
                  <RichText field={fields.Description} className="content-stage__content" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}