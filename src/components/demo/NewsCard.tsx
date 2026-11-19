import { Image, Text, type Field, type ImageField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

export type NewsCardFields = {
  Image?: ImageField;
  Title?: Field<string>;
  Description?: Field<string>;
  Date?: Field<string>;
  Location?: Field<string>;
};

type NewsCardProps = ComponentWithContextProps & { fields?: NewsCardFields };

export default function NewsCard({ fields, params, page }: NewsCardProps) {
  if (!fields) return null;

  const variantName = params.FieldNames || 'Default';

  // Map variant name to CSS classes
  const getVariantClasses = (name: string): string => {
    const name_lower = name.toLowerCase();
    
    // Start with default (full width)
    let classes = ['news-card--full-width'];
    
    // Add classes based on variant name
    if (name_lower.includes('half') || name_lower.includes('grid')) {
      classes = ['news-card--half-width'];
    }
    
    return classes.join(' ');
  };

  const variantClasses = getVariantClasses(variantName);

  return (
    <div
      className={`news-card ${variantClasses}`}
      id={params.RenderingIdentifier || undefined}
    >
      <article className="news-card__item">
        {fields.Image && (
          <div className="news-card__image-wrapper">
            <Image field={fields.Image} className="news-card__image" />
          </div>
        )}
        <div className="news-card__content">
          {(fields.Date || fields.Location) && (
            <div className="news-card__meta">
              {fields.Date && (
                <span className="news-card__date">
                  <Text field={fields.Date} />
                </span>
              )}
              {fields.Location && (
                <span className="news-card__location">
                  <Text field={fields.Location} />
                </span>
              )}
            </div>
          )}
          {fields.Title && (
            <h3 className="news-card__title">
              <Text field={fields.Title} />
            </h3>
          )}
          {fields.Description && (
            <p className="news-card__description">
              <Text field={fields.Description} />
            </p>
          )}
        </div>
      </article>
    </div>
  );
}

// Named exports for variants (must match Sitecore variant item names)
export { NewsCard as NewsCardFullWidth };
export { NewsCard as NewsCardHalfWidth };
