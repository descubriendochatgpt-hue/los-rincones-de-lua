// Genera las imágenes de ejemplo en public/images:
//  - ilustraciones del diseño de Claude Design (hero y antes/después)
//  - huecos rotulados "[FOTO: …]" para las fotos que faltan
// Sustitúyelas por fotos reales con el mismo nombre, o cambia las rutas en src/content/.
// Uso: node scripts/placeholders.mjs
import sharp from "sharp";
import { mkdirSync, readFileSync } from "node:fs";

const read = (f) => readFileSync(new URL(`./design/${f}`, import.meta.url), "utf8");
const size = (svg, w, h) => svg.replace(/ width="\d+" height="\d+"/, "").replace("<svg ", `<svg width="${w}" height="${h}" `);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

async function out(path, svg, w, h) {
  await sharp(Buffer.from(size(svg, w, h))).jpeg({ quality: 82, mozjpeg: true }).toFile(path);
  console.log("✓", path);
}

// Hueco de foto con el tono del sistema visual y un rótulo
const slot = (label, bg = "#F2EBDF", fg = "#6B6158", h = 900) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${h}" viewBox="0 ${(900 - h) / 2} 1200 ${h}">
  <rect y="${(900 - h) / 2}" width="1200" height="${h}" fill="${bg}"/>
  <path d="M520 560V400a80 80 0 0 1 160 0v160z" fill="none" stroke="#A9543A" stroke-width="10" stroke-linejoin="round" opacity="0.55"/>
  <path d="M610 390a34 34 0 1 0 25 54 28 28 0 0 1-25-54z" fill="#B8927A" opacity="0.7"/>
  <rect x="${600 - label.length * 11}" y="620" width="${label.length * 22}" height="56" rx="28" fill="#FFFDF9" opacity="0.9"/>
  <text x="600" y="657" font-family="Arial, sans-serif" font-size="26" fill="${fg}" text-anchor="middle">${esc(label)}</text>
</svg>`;

mkdirSync("public/images/proyectos", { recursive: true });
mkdirSync("public/images/presupuesto", { recursive: true });

await out("public/images/hero.jpg", read("hero.svg"), 1200, 1500);
await out("public/images/angela.jpg", slot("[FOTO: Ángela, vertical 4:5]", "#E3E9DC", "#6B6158", 1500), 1200, 1500);

const before = read("antes.svg");
const after = read("despues.svg");
const variants = {
  "proyecto-1": [],
  "proyecto-2": [["#B7C4AE", "#C9D6DE"], ["#A3B299", "#A9BCC8"]],
  "proyecto-3": [["#B7C4AE", "#EBCDBE"], ["#A3B299", "#C98B6E"]],
};
for (const [name, swaps] of Object.entries(variants)) {
  const a = swaps.reduce((s, [from, to]) => s.replaceAll(from, to), after);
  await out(`public/images/proyectos/${name}-antes.jpg`, before, 1600, 900);
  await out(`public/images/proyectos/${name}-despues.jpg`, a, 1600, 900);
  for (let i = 1; i <= 3; i++) await out(`public/images/proyectos/${name}-proceso-${i}.jpg`, slot(`[FOTO: proceso ${i}]`), 1200, 900);
}

const pairs = [
  ["armario-antes", "[FOTO: armario existente]", "#E4D9C7"],
  ["armario-despues", "[FOTO: armario pintado + tiradores]", "#F5E8C8"],
  ["muebles-antes", "[FOTO: muebles antiguos]", "#E4D9C7"],
  ["muebles-despues", "[FOTO: muebles renovados]", "#E4ECF0"],
];
for (const [file, label, bg] of pairs) await out(`public/images/presupuesto/${file}.jpg`, slot(label, bg), 1200, 900);
