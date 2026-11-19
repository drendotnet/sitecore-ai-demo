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

interface NewsCardViewProps extends NewsCardProps {
  variantClasses: string;
}

function NewsCardView({ fields, params, page, variantClasses }: NewsCardViewProps) {
  if (!fields) return null;

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

// Default variant - full width
export default function NewsCard(props: NewsCardProps) {
  return <NewsCardView {...props} variantClasses="news-card--full-width" />;
}

// Variant exports - each specifies its own CSS classes
export function NewsCardFullWidth(props: NewsCardProps) {
  return <NewsCardView {...props} variantClasses="news-card--full-width" />;
}

export function NewsCardHalfWidth(props: NewsCardProps) {
  return <NewsCardView {...props} variantClasses="news-card--half-width" />;
}
