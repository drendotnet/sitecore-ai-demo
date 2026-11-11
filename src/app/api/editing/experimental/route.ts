import { createExperimentalFeaturesRouteHandler } from '@sitecore-content-sdk/nextjs/route-handler';

export const dynamic = 'force-dynamic';

export const { GET, OPTIONS } = createExperimentalFeaturesRouteHandler();