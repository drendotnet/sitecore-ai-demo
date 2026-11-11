import { type Page, JsonLdSchema } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'components/content-sdk/SitecoreStyles';

export default function SitecoreHead({ page }: { page: Page }) {
  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={page.layout} />
      <JsonLdSchema page={page} />
    </>
  );
}