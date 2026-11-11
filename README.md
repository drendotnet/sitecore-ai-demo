# SitecoreAI Pilot

Next.js App Router application connected to SitecoreAI through the Content SDK.
The example site is `demo`, with English (`en`) as its default language.
Pages, dictionaries, preview, and editing use the Sitecore client and generated maps.

## Local Development

Use Node.js 24 LTS and npm.

Use `.env.example` as the variable reference and set the connection values from
SitecoreAI Deploy > Environment > Developer Settings in `.env.local`.
Set `NEXT_PUBLIC_DEFAULT_SITE_NAME` to your site's actual system name (for example,
`demo`) and `NEXT_PUBLIC_DEFAULT_LANGUAGE=en`.
Never commit `.env.local` or share its secrets in chat.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run type-check
npm run build
npm start
```

The dev and build scripts generate `.sitecore` metadata, site information,
component maps, and import maps before running Next.js. The generated directory
is ignored by Git. Run `npm run sitecore-tools:generate-map` before a standalone
type check on a fresh checkout. A valid Sitecore connection is needed for generation.

## Vercel

Import this repository and use these project settings:

- Framework preset: Next.js
- Root directory: repository root (`.`), not `sitecore-starter`
- Node.js: 24.x
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: Next.js default (do not override)
- Environment variables: configure the Sitecore values listed in `.env.example`
- Basic Auth: set both `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` on Vercel

The existing GitLab pipeline remains unchanged. For deployment through GitLab CI,
configure `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as GitLab CI/CD
variables. Mask the token and ensure variable protection matches the branches that
should deploy. Alternatively, use Vercel's Git integration if it supports your GitLab instance.

The page uses `noindex` metadata and robots.txt disallows crawling. This is not access
control; use Vercel Deployment Protection when the pilot must not be public.

## SitecoreAI Deployment

The repository root contains `xmcloud.build.json`, required by SitecoreAI Deploy
to recognize the source as a compatible project. Its rendering host points to `./`
and uses Node.js 24, `npm run build`, and `npm start` for the active application.
Do not point the deployment at `sitecore-starter/`.

The main environment deployment also needs an authoring project. The configuration
sets `authoringPath` to `./authoring`, containing `XmCloudAuthoring.sln` and the
.NET Framework 4.8 web application `platform/Platform.csproj`. This structure,
the NuGet feeds, package versions, publishing exclusions, and Sitecore CLI manifest
follow the official [SitecoreAI starter](https://github.com/Sitecore/xmcloud-starter-js).
No demo content, site IDs, credentials, or content serialization modules are included.
The project does not replace the platform's web.config or deploy built-in Sitecore DLLs.

Commit and push all authoring files, `nuget.config`, `sitecore.json`,
`.config/dotnet-tools.json`, and `xmcloud.build.json` with the application. Then
redeploy the corresponding branch in SitecoreAI. With split deployment, run the
main environment deployment for authoring and the separate editing-host deployment
for the frontend. The editing host must be named exactly `demo-editinghost` in
the portal and in `renderingHosts`.

For a local authoring build, use Visual Studio 2022 Build Tools with the ASP.NET
web build tools and .NET Framework 4.8 targeting pack:

```powershell
MSBuild.exe authoring/XmCloudAuthoring.sln /restore /p:Configuration=Release
```

No Sitecore API key or project/environment ID is needed to compile this baseline.
The Deploy portal supplies the deployment connection; CLI login is only needed
for authenticated CLI operations. Do not commit generated `.sitecore` login data.

The active app exposes `/api/editing/config`, `/api/editing/render`, and
`/api/editing/experimental`, protected by `SITECORE_EDITING_SECRET` through the SDK.
Configure the Sitecore connection values on the editing host too: your local
`.env.local` is not uploaded to SitecoreAI or Vercel. Associate your configured site
with `demo-editinghost` in SitecoreAI and verify it in Page Builder after deployment.
Existing environments must use an editing host with this exact name before deploying
the renamed configuration; update or recreate the portal host as necessary. The CMS
site's actual system name remains an environment setting and need not be renamed.

The SDK proxy resolves public URLs to `[site]/[locale]/[[...path]]` and preserves
the preview, bot tracking, locale, multisite, redirects, and personalization order.
Preview and page metadata both use draft-mode data rather than published content.
Keep connection values in local environment files or deployment environment
variables, never in source control or chat. Basic Auth only runs on Vercel;
it does not protect the SitecoreAI rendering host.

## Demo Header

`src/components/demo/DemoHeader.tsx` is an editable Server Component registered
automatically as `DemoHeader`. Place it in `headless-header`; place `DemoHero` in
`headless-main`. The layout renders these placeholders in that order. The header
stays in normal document flow and does not overlap the hero on mobile or desktop.

The generated component map does not create CMS templates, datasources, or rendering
items. Create these in your Sitecore environment before adding the header:

1. Create a `Demo Navigation Link` datasource template with a `Link` field of type
	General Link. Create the required menu items from this template under your site's
	shared Data folder, using real page destinations and link descriptions.
2. Create a `Demo Header` datasource template with the following fields. Configure
	the Multilist source to point to your navigation link items.

| Field | Sitecore Field Type | Purpose |
| --- | --- | --- |
| `Brand` | Single-Line Text | Text wordmark, for example `DEMO` |
| `Logo` | Image | Optional logo; takes precedence over the text wordmark |
| `HomeLink` | General Link | Logo or brand destination, normally the Home page |
| `UtilityLinks` | Multilist | Links in the upper row |
| `NavigationLinks` | Multilist | Main navigation links |
| `LanguageLink` | General Link | Language destination and displayed label, for example `EN` |

3. Create and populate a header datasource from `Demo Header` in the shared Data
	folder. Use descriptive image alt text or a descriptive home-link title for the logo.
4. Create a JSON Rendering with Component Name `DemoHeader`, using the header
	datasource template and its Data location. Add the rendering to the allowed
	controls of the `headless-header` placeholder settings used by your page design.
5. Add `DemoHeader` to the header placeholder in Page Builder or the shared header
	partial design, select its datasource, and publish the rendering, templates,
	datasource, linked navigation items, and affected page/design for public delivery.

The component renders no hardcoded navigation or brand when its datasource is
missing. Adding the source file alone therefore does not fill an empty CMS page.

## Sitecore Starter and Next Steps

Generated with the official `create-content-sdk-app` CLI version 2.4.2, using the
`nextjs-app-router` template. The generated Sitecore-dependent source, configuration,
environment examples, and original package manifest are preserved in `sitecore-starter/`
as a reference, excluded from the active application's TypeScript build.
This reference directory is not configured as a standalone application.

The active application is under `src/app/`. Do not deploy the reference directory.
The reference client's App Router, i18n, placeholders, and editing route handlers
are now integrated into the active app. The original standalone root-page source
is retained, but public `/` is rewritten to the configured Sitecore site.

A site created with Start from scratch initially has empty header, main, and footer
placeholders. An empty page is expected until renderings are added in Page Builder.
Custom renderings belong in `src/components/`; component maps regenerate automatically.
Design Library authentication requires the optional client ID and secret variables
listed in `.env.example`. The reference BYOC setup has not been activated.

Documentation: https://doc.sitecore.com/sai/en/developers/content-sdk/sitecore-content-sdk-for-sitecoreai.html

## Dependency Audit

At setup, `npm audit --omit=dev` reported five moderate findings in transitive SDK
dependencies (`glob` and `minimatch`, including dependent packages). The suggested
automatic fix downgrades the Content SDK and was not applied. Review upstream fixes
before production use. The full audit also includes development-tool dependencies.
