import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
const mark = (await readFile('public/brand/mark.svg', 'utf8')).replace(
  '<svg ',
  '<svg x="70" y="62" width="39" height="43" ',
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f5ef"/>${mark}<text x="125" y="93" fill="#242522" font-family="Arial,sans-serif" font-size="30" font-weight="bold" letter-spacing="-1">negotiatedtruth.</text><path d="M70 145H1130" stroke="#d9d8ce"/><text x="70" y="270" fill="#242522" font-family="Arial,sans-serif" font-size="65" letter-spacing="-2">Strategy, technology</text><text x="70" y="350" fill="#242522" font-family="Arial,sans-serif" font-size="65" letter-spacing="-2">and the decisions between.</text><circle cx="82" cy="480" r="7" fill="#242522"/><text x="107" y="487" fill="#242522" font-family="Arial,sans-serif" font-size="21">A personal journal by Cătălin Criveteanu</text><path d="M1010 412H1130V540H970Z" fill="#f36a1d"/></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/brand/social.png');
