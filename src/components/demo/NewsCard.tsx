import { Image, Text, Link, type Field, type ImageField, type LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

export type NewsCardFields = {
  Image?: ImageField;
  Title?: Field<string>;
  Description?: Field<string>;
  Date?: Field<string>;
  Location?: Field<string>;
  Link?: LinkField;
};

type NewsCardProps = ComponentWithContextProps & { fields?: NewsCardFields };

interface NewsCardViewProps extends NewsCardProps {
  variantClasses: string;
}

function NewsCardView({ fields, params, page, variantClasses }: NewsCardViewProps) {
  if (!fields) return null;

  const cardContent = (
    <>
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
    </>
  );

  if (fields.Link?.value?.href) {
    return (
      <Link field={fields.Link} className="news-card__link">
        <article
          className={`news-card__item ${variantClasses}`}
          id={params.RenderingIdentifier || undefined}
        >
          {cardContent}
        </article>
      </Link>
    );
  }

  return (
    <article
      className={`news-card__item ${variantClasses}`}
      id={params.RenderingIdentifier || undefined}
    >
      {cardContent}
    </article>
  );
}

// Default variant - full width
export default function NewsCard(props: NewsCardProps) {
  return (
    <div className="news-card news-card--full-width">
      <NewsCardView {...props} variantClasses="news-card__item" />
    </div>
  );
}

// Variant exports - each specifies its own width styling
export function NewsCardFullWidth(props: NewsCardProps) {
  return (
    <div className="news-card news-card--full-width">
      <NewsCardView {...props} variantClasses="news-card__item" />
    </div>
  );
}

export function NewsCardHalfWidth(props: NewsCardProps) {
  return (
    <div className="news-card news-card--half-width">
      <NewsCardView {...props} variantClasses="news-card__item" />
    </div>
  );
}
