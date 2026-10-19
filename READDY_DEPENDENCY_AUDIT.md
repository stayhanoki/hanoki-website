# Readdy dependency audit

## Direct Readdy runtime/code dependency: NONE found in active source
No active source file imports a Readdy SDK or calls a Readdy backend API for application logic.

## Readdy-specific build leftovers
The original `vite.config.ts`, `vite-env.d.ts`, and ESLint config contained Readdy-specific compile-time variables (`__READDY_PROJECT_ID__`, `__READDY_VERSION_ID__`, `__READDY_AI_DOMAIN__`) and preview scaffolding. They were not consumed by the application. The Cloudflare-ready copy removes those unused references.

## Remaining Readdy-hosted assets
The active source references:
- `https://readdy.ai/api/search-image?...`
- `https://storage.readdy-site.link/project_files/...`

These URLs are used as image sources / SEO image metadata. They are the main remaining dependency that should be migrated to local or independent image hosting.

## Third-party services that are actually active
- Google Sheets published CSV endpoints: active and required for dynamic room/cover/stay-guide/booking data.
- Google Drive image links: supported by `src/utils/driveImageUrl.ts` when supplied through the Sheets.
- Google Fonts / Font Awesome / Remix Icon CDN: active external presentation dependencies.
- WhatsApp / Zalo / Instagram / TikTok / Facebook / Google Maps links: normal external links.

## Installed but currently unused application libraries
The package declares Stripe, Firebase, and Supabase packages. A source-level search found no active imports of Stripe or Firebase. `src/utils/supabase.ts` exists, but it is not imported by the active application.
