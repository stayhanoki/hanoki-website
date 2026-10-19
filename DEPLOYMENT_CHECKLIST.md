# Hanoki deployment checklist

1. Push this project to a private GitHub repository.
2. Do NOT commit `.env`; use Cloudflare Pages environment variables.
3. Run `npm install` and `npm run build` locally if possible.
4. Cloudflare Pages: `npm run build` → `out`.
5. Verify the `*.pages.dev` preview before changing DNS.
6. Verify `/`, `/rooms`, `/room/ha`, `/stay-guide`, `/contact`, `/journey`.
7. Verify Vietnamese/English language switching.
8. Verify room data, cover images, stay-guide images and booking CSV loading.
9. Verify WhatsApp/Zalo/Instagram/TikTok/Google Maps links.
10. Add `hanoki.com.vn` as a custom domain.
11. Test HTTPS, mobile layout, OG preview and canonical URL.
12. Before ending Readdy subscription, migrate all remaining Readdy-hosted images.
13. Secure or remove `/admin/bookings` before exposing it publicly.
