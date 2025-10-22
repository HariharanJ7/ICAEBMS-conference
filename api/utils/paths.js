import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const rootDir = path.resolve(__dirname, '..');
export const publicDir = path.join(rootDir, 'public');
export const assetsDir = path.join(publicDir, 'assets');
export const uploadsDir = path.join(publicDir, 'uploads');

export function ensureDirs() {
  [publicDir, assetsDir, uploadsDir].forEach((d) => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });
}
