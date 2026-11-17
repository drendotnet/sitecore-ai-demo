import { RichText, type Field } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

type PageContentProps = ComponentWithContextProps & {
  fields?: {
    Content?: Field<string>;
  };
};

export default function PageContent({ fields, params, page }: PageContentProps) {
  if (!fields?.Content && !page.mode.isEditing) return null;

  const styles = params.styles ?? [params.GridParameters, params.Styles].filter(Boolean).join(' ');

  return (
    <div
      className={['component', 'rich-text', styles].filter(Boolean).join(' ')}
      id={params.RenderingIdentifier || undefined}
    >
      <div className="component-content">
        <RichText field={fields?.Content ?? { value: '' }} />
      </div>
    </div>
  );
}