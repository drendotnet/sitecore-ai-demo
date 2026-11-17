import { defineRouting } from 'next-intl/routing';
import sitecoreConfig from 'sitecore.config';

export const routing = defineRouting({
  locales: [sitecoreConfig.defaultLanguage],
  defaultLocale: sitecoreConfig.defaultLanguage,
  localePrefix: sitecoreConfig.redirects?.appLocalePrefix || 'as-needed',
});