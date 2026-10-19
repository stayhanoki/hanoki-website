import { copyFile } from "node:fs/promises";

await copyFile("out/index.html", "out/404.html");
console.log("Created out/404.html for GitHub Pages SPA routing.");
