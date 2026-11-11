# SCHOTT SitecoreAI Pilot

Minimal Next.js App Router application with a Hello World page, ready for Vercel.
No Sitecore credentials or environment variables are required for this first deployment.
The Sitecore Content SDK is installed but is not yet connected or used to render content.

## Local Development

Use Node.js 24 LTS and npm.

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

## Vercel

Import this repository and use these project settings:

- Framework preset: Next.js
- Root directory: repository root (`.`), not `sitecore-starter`
- Node.js: 24.x
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: Next.js default (do not override)
- Environment variables: none needed for the application yet

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
for the frontend. The editing host must be named exactly `schott-ai-editihost` in
the portal and in `renderingHosts`.

For a local authoring build, use Visual Studio 2022 Build Tools with the ASP.NET
web build tools and .NET Framework 4.8 targeting pack:

```powershell
MSBuild.exe authoring/XmCloudAuthoring.sln /restore /p:Configuration=Release
```

No Sitecore API key or project/environment ID is needed to compile this baseline.
The Deploy portal supplies the deployment connection; CLI login is only needed
for authenticated CLI operations. Do not commit generated `.sitecore` login data.

Content SDK rendering and editing still require the integration described below;
deploying this baseline alone does not make the Hello World page editable.
Keep connection values in local environment files or deployment environment
variables, never in source control or chat. Basic Auth only runs on Vercel;
it does not protect the SitecoreAI rendering host.

## Sitecore Starter and Next Steps

Generated with the official `create-content-sdk-app` CLI version 2.4.2, using the
`nextjs-app-router` template. The generated Sitecore-dependent source, configuration,
environment examples, and original package manifest are preserved in `sitecore-starter/`
as a reference, excluded from the active application's TypeScript build.
This reference directory is not configured as a standalone application.

The active application is under `src/app/`. Do not deploy the reference directory.
Starter agent guidance and capability documentation refer to the full Sitecore template,
not the current standalone Hello World implementation.

Once connection details are available, integrate the reference client, Sitecore routes,
proxy and build-time generation into the active app; configure the site, Edge context,
editing secret, language and editing host. The archived root page is not a fallback or
an automatic Sitecore integration switch. Never commit credentials or `.env.local`.

Documentation: https://doc.sitecore.com/sai/en/developers/content-sdk/sitecore-content-sdk-for-sitecoreai.html

## Dependency Audit

At setup, `npm audit --omit=dev` reported five moderate findings in transitive SDK
dependencies (`glob` and `minimatch`, including dependent packages). The suggested
automatic fix downgrades the Content SDK and was not applied. Review upstream fixes
before production use. The full audit also includes development-tool dependencies.
