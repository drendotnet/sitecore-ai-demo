export function GET() {
  return new Response('Healthy', {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}