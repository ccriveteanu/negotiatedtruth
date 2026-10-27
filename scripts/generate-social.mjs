import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
const mark = (await readFile('public/brand/mark.svg', 'utf8')).replace(
  '<svg ',
  '<svg x="70" y="62" width="39" height="43" ',
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fafbf7"/>${mark}<text x="125" y="93" fill="#183e3b" font-family="Arial,sans-serif" font-size="30" font-weight="bold" letter-spacing="-1">negotiatedtruth.</text><path d="M70 145H1130" stroke="#d9dfd4"/><text x="70" y="285" fill="#183e3b" font-family="Arial,sans-serif" font-size="76" letter-spacing="-3">Better questions.</text><text x="70" y="380" fill="#183e3b" font-family="Georgia,serif" font-style="italic" font-size="78" letter-spacing="-3">Clearer decisions.</text><rect x="70" y="467" width="1060" height="80" fill="#183e3b"/><text x="100" y="517" fill="#d4ed64" font-family="Arial,sans-serif" font-size="19" letter-spacing="3">STRATEGY / TECHNOLOGY / AI</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/brand/social.png');
