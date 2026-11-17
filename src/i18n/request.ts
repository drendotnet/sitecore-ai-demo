import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import client from 'src/lib/sitecore-client';
import scConfig from 'sitecore.config';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const [parsedSite, parsedLocale] = requested?.split('_') || [];
  const site = parsedSite || scConfig.defaultSite;
  const locale = hasLocale(routing.locales, parsedLocale) ? parsedLocale : routing.defaultLocale;

  return {
    locale,
    messages: { [site]: await client.getDictionary({ locale, site }) },
  };
});