import { Image, Text, type Field, type ImageField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

type QuoteFields = {
  Author?: Field<string>;
  Quote?: Field<string>;
  Image?: ImageField;
};

type QuoteProps = ComponentWithContextProps & { fields?: QuoteFields };

function QuoteView({ fields, params, page, background }: QuoteProps & { background?: string }) {
  if (!fields) return null;

  const isEditing = page.mode.isEditing;
  const quote = fields.Quote;
  const author = fields.Author;
  const image = fields.Image;
  const showImage = image && (image.value?.src || isEditing);

  if (!quote || (!quote.value?.trim() && !isEditing)) return null;

  return (
    <section className="section">
      <div
        className={[
          'component single-quote-component',
          background,
          showImage && 'single-quote-component--with-image',
        ].filter(Boolean).join(' ')}
        id={params.RenderingIdentifier || undefined}
      >
        <div className="container">
          <div className="overlapped-content">
            <div className="single-quote">
              {showImage && (
                <div className="single-quote__image">
                  <Image field={image} />
                </div>
              )}
              <div className="single-quote__wrapper">
                <div className="single-quote__author-wrap">
                  <svg className="icon single-quote__icon" viewBox="0 0 44 36" aria-hidden="true">
                    <path d="M0 36V23C0 10 6 3 19 0v7c-7 2-10 6-10 12h10v17H0Zm25 0V23C25 10 31 3 44 0v7c-7 2-10 6-10 12h10v17H25Z" />
                  </svg>
                  {author && (author.value?.trim() || isEditing) && (
                    <Text field={author} tag="div" className="single-quote__author h4" />
                  )}
                </div>
                <blockquote className="single-quote__text">
                  <Text field={quote} tag="p" />
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Default(props: QuoteProps) {
  return <QuoteView {...props} />;
}

export function Blue(props: QuoteProps) {
  return <QuoteView {...props} background="u-bg--darkblue" />;
}

export function Grey(props: QuoteProps) {
  return <QuoteView {...props} background="u-bg--grey" />;
}

export default Default;