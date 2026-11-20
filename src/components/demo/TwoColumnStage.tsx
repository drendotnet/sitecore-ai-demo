'use client';

import {
  Image,
  Link as SitecoreLink,
  RichText,
  Text,
  type Field,
  type ImageField,
  type LinkField,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentWithContextProps } from 'lib/component-props';

export type TwoColumnStageFields = {
  HeadingOverline?: Field<string>;
  Heading?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
  PrimaryCTA?: LinkField;
  SecondaryCTA?: LinkField;
};

type TwoColumnStageProps = ComponentWithContextProps & { fields?: TwoColumnStageFields };

function formatBreadcrumbLabel(segment: string) {
  const label = decodeURIComponent(segment).replace(/[-_]+/g, ' ');
  return label.charAt(0).toLocaleUpperCase() + label.slice(1);
}

export default function TwoColumnStage({ fields, page, params }: TwoColumnStageProps) {
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
  const activeLabel =
    route?.displayName || route?.name || fields.Heading?.value || fields.HeadingOverline?.value || '';
  const homeHref = prefix.length ? `/${prefix.join('/')}` : '/';

  return (
    <section
      className="section section--stage two-column-stage"
      id={params.RenderingIdentifier || undefined}
    >
      <div className="container">
        <div className="component two-column-stage__layout">
          <div className="two-column-stage__content">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol className="breadcrumbs__list">
                {pageSegments.length > 0 && (
                  <li className="breadcrumbs__element breadcrumbs__element--desktop">
                    <Link href={homeHref}>Home</Link>
                  </li>
                )}
                {pageSegments.map((segment, index) => {
                  const isActive = index === pageSegments.length - 1;
                  const href = `/${[...prefix, ...pageSegments.slice(0, index + 1)].join('/')}`;
                  const label = isActive
                    ? activeLabel || formatBreadcrumbLabel(segment)
                    : formatBreadcrumbLabel(segment);

                  return (
                    <li
                      className={`breadcrumbs__element${isActive ? ' breadcrumbs__element--active' : ''}`}
                      key={href}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive ? label : <Link href={href}>{label}</Link>}
                    </li>
                  );
                })}
                {pageSegments.length === 0 && (
                  <li className="breadcrumbs__element breadcrumbs__element--active" aria-current="page">
                    {activeLabel || 'Home'}
                  </li>
                )}
              </ol>
            </nav>

            <h1 className="two-column-stage__heading">
              {fields.HeadingOverline && (
                <Text field={fields.HeadingOverline} tag="span" className="two-column-stage__overline" />
              )}
              {fields.Heading && <Text field={fields.Heading} tag="span" />}
            </h1>

            {fields.Description && (
              <div className="two-column-stage__description">
                <RichText field={fields.Description} />
              </div>
            )}

            {(fields.PrimaryCTA || fields.SecondaryCTA) && (
              <div className="two-column-stage__ctas">
                {fields.PrimaryCTA && (fields.PrimaryCTA.value.href || page.mode.isEditing) && (
                  <SitecoreLink field={fields.PrimaryCTA} className="two-column-stage__button btn btn--primary" />
                )}
                {fields.SecondaryCTA && (fields.SecondaryCTA.value.href || page.mode.isEditing) && (
                  <SitecoreLink field={fields.SecondaryCTA} className="two-column-stage__button btn btn--secondary" />
                )}
              </div>
            )}
          </div>

          {fields.Image && (
            <div className="two-column-stage__image-wrapper">
              <Image field={fields.Image} className="two-column-stage__image" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
