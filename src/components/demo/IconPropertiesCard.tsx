import { RichText, type Field } from '@sitecore-content-sdk/nextjs';
import type { ComponentWithContextProps } from 'lib/component-props';

export type IconPropertiesCardFields = {
  Icon?: string;
  Title?: Field<string>;
  Description?: Field<string>;
};

type IconPropertiesCardProps = ComponentWithContextProps & { fields?: IconPropertiesCardFields };

export default function IconPropertiesCard({ fields, params }: IconPropertiesCardProps) {
  if (!fields) return null;

  return (
    <div
      className="icon-properties-card"
      id={params.RenderingIdentifier || undefined}
    >
      <div className="icon-properties-card__icon-wrapper">
        {fields.Icon && <div dangerouslySetInnerHTML={{ __html: fields.Icon }} />}
      </div>
      {fields.Title && <h3 className="icon-properties-card__title">{fields.Title.value}</h3>}
      {fields.Description && (
        <div className="icon-properties-card__description">
          <RichText field={fields.Description} />
        </div>
      )}
    </div>
  );
}
