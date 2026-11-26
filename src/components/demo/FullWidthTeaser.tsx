import { Image, Link, Text, RichText, type Field, type ImageField, type LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

export type FullWidthTeaserFields = {
  Category?: Field<string>;
  Headline?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
  MobileImage?: ImageField;
  TabletImage?: ImageField;
  CTALink?: LinkField;
};

type FullWidthTeaserProps = ComponentWithContextProps & { fields?: FullWidthTeaserFields };

function FullWidthTeaserView({
  fields,
  page,
  params,
  variant,
}: FullWidthTeaserProps & { variant: string }) {
  if (!fields) return null;

  const isEditing = page.mode.isEditing;
  const { Category, Headline, Description, Image: desktopImage, MobileImage, TabletImage, CTALink } = fields;
  const fallbackImage = [desktopImage, TabletImage, MobileImage].find((image) => image?.value?.src);
  const image = isEditing ? desktopImage ?? fallbackImage : fallbackImage;
  const mobileSrc = MobileImage?.value?.src;
  const tabletSrc = TabletImage?.value?.src;

  return (
    <section className="section fullwidth-teaser-section" id={params.RenderingIdentifier || undefined}>
      <div className={`component fullwidth-teaser fullwidth-teaser--${variant}`}>
        {image && (
          <div className="fullwidth-teaser__media">
            {isEditing ? (
              <Image field={image} className="fullwidth-teaser__image" />
            ) : (
              <picture>
                {mobileSrc && <source media="(width < 720px)" srcSet={mobileSrc} />}
                {tabletSrc && <source media="(width < 1280px)" srcSet={tabletSrc} />}
                <Image field={image} className="fullwidth-teaser__image" loading="lazy" />
              </picture>
            )}
          </div>
        )}
        <div className="fullwidth-teaser__wrapper">
          {Category && (Category.value || isEditing) && (
            <Text field={Category} tag="span" className="fullwidth-teaser__category" />
          )}
          {Headline && (Headline.value || isEditing) && (
            <Text field={Headline} tag="h2" className="fullwidth-teaser__headline" />
          )}
          {Description && (Description.value || isEditing) && (
            <RichText field={Description} className="fullwidth-teaser__description" />
          )}
          {CTALink && (CTALink.value?.href || isEditing) && (
            <div className="fullwidth-teaser__actions">
              <Link field={CTALink} className="fullwidth-teaser__button btn btn--primary" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function FullWidthTeaser(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="default" />;
}

export function FadedImageDarkText(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="faded-image-dark-text" />;
}

export function FadedImageLightText(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="faded-image-light-text" />;
}

export function NoOverlay(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="no-overlay" />;
}

export function OverlayLight(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="overlay-light" />;
}

export function ContentWidth(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="content-width" />;
}

export function DarkText(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="dark-text" />;
}

export function FocusImage(props: FullWidthTeaserProps) {
  return <FullWidthTeaserView {...props} variant="focus-image" />;
}
