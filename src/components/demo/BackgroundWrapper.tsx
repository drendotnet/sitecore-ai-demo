import { AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import componentMap from '.sitecore/component-map';
import type { ComponentWithContextProps } from 'lib/component-props';

type BackgroundWrapperProps = ComponentWithContextProps;

function BackgroundWrapperView({
  page,
  params,
  rendering,
  variantClass,
}: BackgroundWrapperProps & { variantClass?: string }) {
  return (
    <div
      className={`component section background-wrapper${variantClass ? ` ${variantClass}` : ''}`}
      id={params.RenderingIdentifier || undefined}
    >
      <div className="container">
        <div className="overlapped-content">
          <div className="row">
            <AppPlaceholder
              name="phbackgroudwrapper"
              page={page}
              componentMap={componentMap}
              rendering={rendering}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Default(props: BackgroundWrapperProps) {
  return <BackgroundWrapperView {...props} />;
}

export function Blue(props: BackgroundWrapperProps) {
  return <BackgroundWrapperView {...props} variantClass="u-bg--darkblue" />;
}

export function Grey(props: BackgroundWrapperProps) {
  return <BackgroundWrapperView {...props} variantClass="u-bg--grey" />;
}

export default Default;
