import Link from 'next/link';
import { ErrorPage, getCachedPageParams } from '@sitecore-content-sdk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

export default async function NotFound() {
  const cached = getCachedPageParams();
  const site = cached.site || scConfig.defaultSite;
  const locale = cached.locale || scConfig.defaultLanguage;
  setRequestLocale(`${site}_${locale}`);

  const page = await client.getErrorPage(ErrorPage.NotFound, { site, locale });
  if (page) {
    return (
      <NextIntlClientProvider>
        <Providers page={page}>
          <Layout page={page} />
        </Providers>
      </NextIntlClientProvider>
    );
  }

  return (
    <main>
      <h1>Page not found</h1>
      <Link href="/">Go to the Home page</Link>
    </main>
  );
}