import { AppPlaceholder, DesignLibraryApp, type Page } from '@sitecore-content-sdk/nextjs';
import SitecoreHead from 'src/SitecoreHead';
import DemoHeader from 'components/demo/DemoHeader';
import DemoFooter from 'components/demo/DemoFooter';
import componentMap from '.sitecore/component-map';

export default function Layout({ page }: { page: Page }) {
  const { route } = page.layout.sitecore;

  return (
    <>
      <SitecoreHead page={page} />
      <div className={page.mode.isEditing ? 'editing-mode' : 'prod-mode'}>
        {page.mode.isDesignLibrary ? (
          route && (
            <DesignLibraryApp
              page={page}
              rendering={route}
              componentMap={componentMap}
              loadServerImportMap={() => import('.sitecore/import-map.server')}
            />
          )
        ) : (
          <>
            <div id="header">
              <DemoHeader />
            </div>
            <main id="content">
              {route && <AppPlaceholder page={page} componentMap={componentMap} name="headless-main" rendering={route} />}
            </main>
            <DemoFooter />
          </>
        )}
      </div>
    </>
  );
}