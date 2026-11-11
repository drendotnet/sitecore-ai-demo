import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';
import {
  defineProxy,
  PreviewProxy,
  BotTrackingProxy,
  LocaleProxy,
  AppRouterMultisiteProxy,
  RedirectsProxy,
  PersonalizeProxy,
} from '@sitecore-content-sdk/nextjs/proxy';
import sites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';
import { routing } from './i18n/routing';
import client from './lib/sitecore-client';

const unauthorized = () =>
  new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'Cache-Control': 'no-store',
      'WWW-Authenticate': 'Basic realm="SCHOTT pilot", charset="UTF-8"',
    },
  });

const hash = (value: Uint8Array | string) =>
  createHash('sha256').update(value).digest();

function authenticate(request: NextRequest) {
  if (process.env.VERCEL !== '1') {
    return null;
  }

  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;

  if (!username || !password) {
    return new NextResponse('Basic Auth is not configured', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const authorization = request.headers.get('authorization') ?? '';
  const match = /^Basic\s+([A-Za-z0-9+/]+={0,2})$/i.exec(authorization);

  if (!match || match[1].length > 4096) return unauthorized();

  const decoded = Buffer.from(match[1], 'base64');
  const separator = decoded.indexOf(0x3a);

  if (separator < 0) return unauthorized();

  const suppliedUsername = decoded.subarray(0, separator);
  const suppliedPassword = decoded.subarray(separator + 1);
  const validUsername = timingSafeEqual(hash(suppliedUsername), hash(username));
  const validPassword = timingSafeEqual(hash(suppliedPassword), hash(password));

  return validUsername && validPassword ? null : unauthorized();
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const authentication = authenticate(request);
  if (authentication) return authentication;

  const preview = new PreviewProxy({ client, ...scConfig.api.edge });
  const botTracking = new BotTrackingProxy({ ...scConfig.api.edge, sites, fetchEvent: event });
  const locale = new LocaleProxy({
    sites,
    locales: routing.locales.slice(),
    defaultLanguage: scConfig.defaultLanguage,
    skip: () => false,
  });
  const multisite = new AppRouterMultisiteProxy({
    sites,
    ...scConfig.multisite,
    skip: () => false,
  });
  const redirects = new RedirectsProxy({
    sites,
    ...scConfig.api.edge,
    ...scConfig.api.local,
    ...scConfig.redirects,
    skip: () => false,
  });
  const personalize = new PersonalizeProxy({
    sites,
    ...scConfig.api.edge,
    ...scConfig.personalize,
    skip: () => false,
  });

  return defineProxy(preview, botTracking, locale, multisite, redirects, personalize).exec(request);
}

export const config = {
  matcher: [
    '/',
    '/((?!api/|sitemap|robots|_next/|healthz|sitecore/api/|-/|.*[.](?:svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|eot|css|js|map|webmanifest)$).*)',
  ],
};