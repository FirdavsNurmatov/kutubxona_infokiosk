/*
 * Exe yoniga qo'yiladigan `config.json` namunasini yozadi.
 *
 * Namunani qo'lda yozib qo'ymaymiz: u `electron/config.cjs` dagi DEFAULTS
 * dan hosil qilinadi. Shunda yangi sozlama qo'shilganda namuna o'z-o'zidan
 * yangilanadi va ikkalasi bir-biridan uzoqlashib ketmaydi.
 */

import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { template } = require('../electron/config.cjs');

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'build/config.json');

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, template(), 'utf8');
console.log(`config.json namunasi yozildi: ${target}`);
