import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode, headers } from 'next/headers';
import { getPageMetadata } from '@sitecore-content-sdk/nextjs';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import sites from '.sitecore/sites.json';
import { routing } from 'src/i18n/routing';
import scConfig from 'sitecore.config';
import client from 'src/lib/sitecore-client';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

type RouteParams = { site: string; locale: string; path?: string[] };
type PageProps = { params: Promise<RouteParams> };

async function loadPage({ site, locale, path }: RouteParams) {
  setRequestLocale(`${site}_${locale}`);
  const draft = await draftMode();

  if (draft.isEnabled) {
    const previewData = client.getPreviewData(await headers());
    return isDesignLibraryPreviewData(previewData)
      ? client.getDesignLibraryData(previewData)
      : client.getPreview(previewData);
  }

  return client.getPage(path ?? [], { site, locale });
}

export default async function Page({ params }: PageProps) {
  const page = await loadPage(await params);
  if (!page) notFound();

  return (
    <NextIntlClientProvider>
      <Providers page={page}>
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV !== 'development' && scConfig.generateStaticPaths) {
    return client.getAppRouterStaticParams(
      [...new Set(sites.map((site) => site.name))],
      routing.locales.slice()
    );
  }
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await loadPage(await params);
  return getPageMetadata(page?.layout.sitecore.route);
}