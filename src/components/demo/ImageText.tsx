import { Image, Link, RichText, Text, type Field, type ImageField, type LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

export type ImageTextFields = {
  Image?: ImageField;
  Title?: Field<string>;
  Description?: Field<string>;
  CTALink?: LinkField;
};

type ImageTextProps = ComponentWithContextProps & { fields?: ImageTextFields };

export default function ImageText({ fields, params, page }: ImageTextProps) {
  if (!fields) return null;

  const variantName = params.FieldNames || 'Default';

  // Map variant name to CSS classes
  const getVariantClasses = (name: string): string => {
    const name_lower = name.toLowerCase();
    
    // Start with default (image on left)
    let classes = ['feature-row--image-left'];
    
    // Add additional classes based on variant name
    if (name_lower.includes('right')) {
      classes = ['feature-row--image-right'];
    }
    if (name_lower.includes('background')) {
      classes.push('feature-row--with-background');
    }
    if (name_lower.includes('grey')) {
      classes.push('feature-row--grey-background');
    }
    if (name_lower.includes('portrait')) {
      classes.push('feature-row--portrait');
    }
    if (name_lower.includes('small')) {
      classes.push('feature-row--small');
    }
    if (name_lower.includes('medium')) {
      classes.push('feature-row--medium');
    }
    
    return classes.join(' ');
  };

  const variantClasses = getVariantClasses(variantName);

  return (
    <article
      className={`feature-row ${variantClasses}`}
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

// Named exports for variants (must match Sitecore variant item names)
export { ImageText as ImageTextImageRight };
export { ImageText as ImageTextImageLeft };
export { ImageText as PortraitImageRight };
export { ImageText as PortraitImageLeft };
