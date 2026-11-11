import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';

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

export function proxy(request: NextRequest) {
  if (process.env.VERCEL !== '1') {
    return NextResponse.next();
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

  return validUsername && validPassword ? NextResponse.next() : unauthorized();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};