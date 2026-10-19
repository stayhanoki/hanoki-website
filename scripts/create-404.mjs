import { copyFileSync } from 'node:fs';
copyFileSync('out/index.html', 'out/404.html');
console.log('Created out/404.html for GitHub Pages SPA fallback.');
