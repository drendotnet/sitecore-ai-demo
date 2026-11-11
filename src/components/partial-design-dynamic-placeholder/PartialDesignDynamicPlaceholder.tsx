import { AppPlaceholder } from '@sitecore-content-sdk/nextjs';
import componentMap from '.sitecore/component-map';
import type { ComponentWithContextProps } from 'lib/component-props';

export default function PartialDesignDynamicPlaceholder(props: ComponentWithContextProps) {
  return (
    <AppPlaceholder
      name={props.rendering?.params?.sig || ''}
      rendering={props.rendering}
      page={props.page}
      componentMap={componentMap}
    />
  );
}