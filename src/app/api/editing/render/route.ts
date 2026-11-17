import { createEditingRenderRouteHandlers } from '@sitecore-content-sdk/nextjs/route-handler';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const handlers = createEditingRenderRouteHandlers({});

export const { GET, OPTIONS } = handlers;

export async function POST(request: NextRequest) {
	const origin = request.headers.get('origin');
	const originUrl = origin ? URL.parse(origin) : null;

	if (!originUrl || !['http:', 'https:'].includes(originUrl.protocol)) {
		return Response.json(
			{ error: 'Editing POST requests require a valid HTTP(S) Origin header.' },
			{ status: 400 }
		);
	}

	return handlers.POST(request);
}