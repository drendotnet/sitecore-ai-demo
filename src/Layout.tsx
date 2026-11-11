import { AppPlaceholder, DesignLibraryApp, type Page } from '@sitecore-content-sdk/nextjs';
import SitecoreHead from 'src/SitecoreHead';
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
            <header id="header">
              {route && <AppPlaceholder page={page} componentMap={componentMap} name="headless-header" rendering={route} />}
            </header>
            <main id="content">
              {route && <AppPlaceholder page={page} componentMap={componentMap} name="headless-main" rendering={route} />}
            </main>
            <footer id="footer">
              {route && <AppPlaceholder page={page} componentMap={componentMap} name="headless-footer" rendering={route} />}
            </footer>
          </>
        )}
      </div>
    </>
  );
}