import { Image, Link, RichText, Text, type Field, type ImageField, type LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

export type DemoHeroFields = {
  Heading?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
  Link?: LinkField;
};

type DemoHeroProps = ComponentWithContextProps & { fields?: DemoHeroFields };

export default function DemoHero({ fields, params, page }: DemoHeroProps) {
  if (!fields) return null;

  return (
    <section className="hero-stage" id={params.RenderingIdentifier || undefined}>
      {fields.Image && <Image field={fields.Image} className="hero-image" />}
      <div className="hero-copy">
        {fields.Heading && <Text field={fields.Heading} tag="h1" />}
        {fields.Description && <RichText field={fields.Description} />}
        {fields.Link && (fields.Link.value.href || page.mode.isEditing) && (
          <Link field={fields.Link} className="primary-button" />
        )}
      </div>
    </section>
  );
}