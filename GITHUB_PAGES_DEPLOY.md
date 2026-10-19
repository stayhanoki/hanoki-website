# Hanoki — GitHub Pages deployment

This version is prepared for GitHub Pages instead of Cloudflare Pages.

## Build

```bash
npm ci
npm run build
```

The Vite output is `out/`. The build script also creates `out/404.html` from `out/index.html` so React Router routes can load when a visitor opens or refreshes a deep URL on GitHub Pages.

## GitHub Actions

`.github/workflows/deploy-pages.yml` builds and deploys the site whenever `main` changes.

Before the first deployment, add these **Repository Variables** under:
Settings → Secrets and variables → Actions → Variables

- `VITE_PUBLIC_GOOGLE_SHEET_GUIDE_URL`
- `VITE_PUBLIC_GOOGLE_SHEET_COVER_URL`
- `VITE_PUBLIC_GOOGLE_SHEET_ROOMS_URL`
- `VITE_PUBLIC_GOOGLE_SHEET_URL`

These values are frontend/public configuration, not private secrets. Do not put private credentials or API keys in `VITE_*` variables.

`VITE_SITE_URL` is set by the workflow to `https://hanoki.com.vn`.

## Custom domain

The repository includes `public/CNAME` containing:

```text
hanoki.com.vn
```

With the GitHub Actions Pages workflow, the authoritative custom-domain setting is still configured in:
Settings → Pages → Custom domain.

For `hanoki.com.vn`, configure the DNS at your domain registrar/DNS provider with GitHub Pages' apex-domain A records and optionally the `www` CNAME as documented by GitHub.

## Readdy dependency

The source may still contain unused references to Readdy-hosted image URLs. Per the project audit, the images actually used by the active site are sourced from Google Sheets, so those unused Readdy image URLs do not need to be migrated for this deployment.

Before going live, search the repository for `readdy.ai` and `storage.readdy-site.link` and confirm they are not used by active UI paths.

## Important admin note

The current `/admin/bookings` page reads booking data from the configured Google Sheet. Do not treat the sheet URL as a secret. If the sheet contains personal booking information, the admin route should eventually be protected with authentication/access control before production use.
