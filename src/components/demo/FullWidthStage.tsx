'use client';

import { Image, Text, RichText, type Field, type ImageField } from '@sitecore-content-sdk/nextjs';
import { usePathname } from 'next/navigation';
import type { ComponentWithContextProps } from 'lib/component-props';
import Breadcrumbs from './Breadcrumbs';

export type FullWidthStageFields = {
  Heading?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
  ShowBreadcrumbs?: Field<boolean>;
};

type FullWidthStageProps = ComponentWithContextProps & { fields?: FullWidthStageFields };

export default function FullWidthStage({ fields, page, params }: FullWidthStageProps) {
  const pathname = usePathname() ?? '/';
  if (!fields) return null;

  const route = page.layout.sitecore.route;
  const heading = fields.Heading?.value || route?.displayName || route?.name || '';

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
                <Breadcrumbs
                  show={fields.ShowBreadcrumbs?.value !== false}
                  pathname={pathname}
                  siteName={page.siteName}
                  locale={page.locale}
                  heading={heading}
                />
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