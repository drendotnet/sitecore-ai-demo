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
import { usePathname } from 'next/navigation';
import type { ComponentWithContextProps } from 'lib/component-props';
import Breadcrumbs from './Breadcrumbs';

export type TwoColumnStageFields = {
  HeadingOverline?: Field<string>;
  Heading?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
  PrimaryCTA?: LinkField;
  SecondaryCTA?: LinkField;
  ShowBreadcrumbs?: Field<boolean>;
};

type TwoColumnStageProps = ComponentWithContextProps & { fields?: TwoColumnStageFields };

export default function TwoColumnStage({ fields, page, params }: TwoColumnStageProps) {
  const pathname = usePathname() ?? '/';
  if (!fields) return null;

  const route = page.layout.sitecore.route;
  const activeLabel =
    route?.displayName || route?.name || fields.Heading?.value || fields.HeadingOverline?.value || '';

  return (
    <section
      className="section section--stage two-column-stage"
      id={params.RenderingIdentifier || undefined}
    >
      <div className="container">
        <div className="component two-column-stage__layout">
          <div className="two-column-stage__content">
            <Breadcrumbs
              show={fields.ShowBreadcrumbs?.value !== false}
              pathname={pathname}
              siteName={page.siteName}
              locale={page.locale}
              heading={activeLabel}
            />

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
