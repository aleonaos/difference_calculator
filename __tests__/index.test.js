import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, path } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expected = '{\n- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

test('flat', () => {
  const before = readFile(file1.json);
  const after = readFile(file1.json);
  expect(genDiff(before, after)).toEqual(expected);
});
