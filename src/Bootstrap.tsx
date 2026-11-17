'use client';

import { useEffect } from 'react';
import { initContentSdk } from '@sitecore-content-sdk/nextjs';
import { eventsPlugin } from '@sitecore-content-sdk/events';
import { analyticsBrowserAdapter, analyticsPlugin } from '@sitecore-content-sdk/analytics-core';
import config from 'sitecore.config';

export default function Bootstrap({ siteName, isPreviewMode }: { siteName: string; isPreviewMode: boolean }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' || isPreviewMode || !config.api.edge.clientContextId) {
      return;
    }

    initContentSdk({
      config: {
        contextId: config.api.edge.clientContextId,
        edgeUrl: config.api.edge.edgeUrl,
        siteName: siteName || config.defaultSite,
      },
      plugins: [
        analyticsPlugin({
          options: { enableCookie: true, cookieDomain: window.location.hostname.replace(/^www\./, '') },
          adapter: analyticsBrowserAdapter(),
        }),
        eventsPlugin(),
      ],
    });
  }, [siteName, isPreviewMode]);

  return null;
}