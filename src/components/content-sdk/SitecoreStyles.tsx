'use client';

import type { LayoutServiceData } from '@sitecore-content-sdk/nextjs';
import client from 'src/lib/sitecore-client';

export default function SitecoreStyles({ layoutData }: { layoutData: LayoutServiceData }) {
  return client.getHeadLinks(layoutData).map(({ rel, href }) => (
    <link rel={rel} key={href} href={href} />
  ));
}