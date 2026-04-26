/**
 * Next.js 16+ reads `.next/cache/next-devtools-config.json` on dev HMR sync.
 * `disableDevIndicator: true` turns off the floating Next logo / dev tools entry
 * (see next-devtools shared schema). The `nextjs-portal` host may still exist in
 * the DOM for the error overlay pipeline — that cannot be removed from app source.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const cacheDir = path.join(root, '.next', 'cache');
const configPath = path.join(cacheDir, 'next-devtools-config.json');

const desired = { disableDevIndicator: true };

fs.mkdirSync(cacheDir, { recursive: true });

let merged = { ...desired };
if (fs.existsSync(configPath)) {
  try {
    const current = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      merged = { ...current, ...desired };
    }
  } catch {
    merged = { ...desired };
  }
}

fs.writeFileSync(configPath, JSON.stringify(merged, null, 2), 'utf8');
