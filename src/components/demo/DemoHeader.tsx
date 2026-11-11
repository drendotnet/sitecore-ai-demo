import { Image, Link, Text, type Field, type ImageField, type LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

type DemoNavigationItem = {
  id: string;
  fields?: { Link?: LinkField };
};

export type DemoHeaderFields = {
  Brand?: Field<string>;
  Logo?: ImageField;
  HomeLink?: LinkField;
  UtilityLinks?: DemoNavigationItem[];
  NavigationLinks?: DemoNavigationItem[];
  LanguageLink?: LinkField;
};

type DemoHeaderProps = ComponentWithContextProps & { fields?: DemoHeaderFields };

export default function DemoHeader({ fields, params, page }: DemoHeaderProps) {
  if (!fields) return null;

  const brand = fields.Logo && (fields.Logo.value?.src || page.mode.isEditing) ? (
    <Image field={fields.Logo} className="demo-header__logo" />
  ) : fields.Brand ? (
    <Text field={fields.Brand} tag="span" className="demo-header__brand" />
  ) : null;

  return (
    <div className="demo-header" id={params.RenderingIdentifier || undefined}>
      <div className="demo-header__inner">
        <div className="demo-header__top">
          <nav className="demo-header__utility" aria-label="Utility navigation">
            {fields.UtilityLinks?.map((item) => item.fields?.Link && (
              <Link key={item.id} field={item.fields.Link} />
            ))}
          </nav>
          {fields.LanguageLink && <Link field={fields.LanguageLink} className="demo-header__language" />}
        </div>
        <div className="demo-header__main">
          {fields.HomeLink?.value.href ? (
            <Link field={fields.HomeLink} className="demo-header__home">{brand}</Link>
          ) : brand}
          <nav className="demo-header__navigation" aria-label="Main navigation">
            {fields.NavigationLinks?.map((item) => item.fields?.Link && (
              <Link key={item.id} field={item.fields.Link} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}