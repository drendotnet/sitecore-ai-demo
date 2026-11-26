import type { ComponentWithContextProps } from 'lib/component-props';
import IconPropertiesCard, { type IconPropertiesCardFields } from './IconPropertiesCard';

type IconPropertiesCardContainerProps = ComponentWithContextProps & {
  fields?: {
    Cards?: Array<{ fields?: IconPropertiesCardFields }>;
  };
};

export default function IconPropertiesCardContainer({
  fields,
  params,
  page,
  rendering,
}: IconPropertiesCardContainerProps) {
  if (!fields?.Cards || fields.Cards.length === 0) return null;

  return (
    <div
      className="icon-properties-card-container"
      id={params.RenderingIdentifier || undefined}
    >
      {fields.Cards.map((card, index) => (
        <IconPropertiesCard
          key={index}
          fields={card.fields}
          params={{ RenderingIdentifier: `card-${index}` }}
          page={page}
          rendering={rendering}
        />
      ))}
    </div>
  );
}
