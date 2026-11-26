import { AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import componentMap from '.sitecore/component-map';
import type { ComponentWithContextProps } from 'lib/component-props';

type IconPropertiesCardContainerProps = ComponentWithContextProps;

function IconPropertiesCardContainerView({
  page,
  params,
  rendering,
}: IconPropertiesCardContainerProps) {
  return (
    <div
      className="icon-properties-card-container"
      id={params.RenderingIdentifier || undefined}
    >
      <AppPlaceholder
        name="phiconpropertiescard"
        page={page}
        componentMap={componentMap}
        rendering={rendering}
      />
    </div>
  );
}

export function Default(props: IconPropertiesCardContainerProps) {
  return <IconPropertiesCardContainerView {...props} />;
}

export default Default;
