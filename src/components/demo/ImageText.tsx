import { Image, Link, RichText, Text, type Field, type ImageField, type LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

type ImageTextFields = {
  Image?: ImageField;
  Title?: Field<string>;
  Description?: Field<string>;
  CTALink?: LinkField;
};

type ImageTextProps = ComponentWithContextProps & { fields?: ImageTextFields };

export default function ImageText({ fields, params, page }: ImageTextProps) {
  if (!fields) return null;

  const imagePosition = params.ImagePosition?.toLowerCase() === 'right' ? 'right' : 'left';

  return (
    <article
      className={`feature-row feature-row--image-${imagePosition}`}
      id={params.RenderingIdentifier || undefined}
    >
      <div className="feature-copy">
        {fields.Title && <Text field={fields.Title} tag="h2" />}
        {fields.Description && <RichText field={fields.Description} />}
        {fields.CTALink && (fields.CTALink.value.href || page.mode.isEditing) && (
          <Link field={fields.CTALink} className="primary-button" />
        )}
      </div>
      {fields.Image && (
        <figure className="feature-media">
          <Image field={fields.Image} />
        </figure>
      )}
    </article>
  );
}
