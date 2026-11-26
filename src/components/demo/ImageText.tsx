import { Image, Link, RichText, Text, type Field, type ImageField, type LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

export type ImageTextFields = {
  Image?: ImageField;
  Title?: Field<string>;
  Description?: Field<string>;
  CTALink?: LinkField;
};

type ImageTextProps = ComponentWithContextProps & { fields?: ImageTextFields };

interface ImageTextViewProps extends ImageTextProps {
  variantClasses: string;
}

function ImageTextView({ fields, params, page, variantClasses }: ImageTextViewProps) {
  if (!fields) return null;

  return (
    <article
      className={`feature-row ${variantClasses}`}
      id={params.RenderingIdentifier || undefined}
    >
      <div className="feature-copy">
        {fields.Title && <Text field={fields.Title} tag="h2" />}
        {fields.Description && <RichText field={fields.Description} />}
        {fields.CTALink && (fields.CTALink.value.href || page.mode.isEditing) && (
          <Link field={fields.CTALink} className="primary-button btn btn--primary" />
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

// Default variant - image on left
export default function ImageText(props: ImageTextProps) {
  return <ImageTextView {...props} variantClasses="feature-row--image-left" />;
}

// Variant exports - each specifies its own CSS classes
export function ImageTextImageLeft(props: ImageTextProps) {
  return <ImageTextView {...props} variantClasses="feature-row--image-left" />;
}

export function ImageTextImageRight(props: ImageTextProps) {
  return <ImageTextView {...props} variantClasses="feature-row--image-right" />;
}

export function PortraitImageRight(props: ImageTextProps) {
  return (
    <ImageTextView
      {...props}
      variantClasses="feature-row--image-right feature-row--portrait"
    />
  );
}

export function PortraitImageLeft(props: ImageTextProps) {
  return (
    <ImageTextView
      {...props}
      variantClasses="feature-row--image-left feature-row--portrait"
    />
  );
}
