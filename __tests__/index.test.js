import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);

describe('gendiff', () => {
  test('flat json files', () => {
    const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
    const before = getFixturePath('file1.json');
    const after = getFixturePath('file2.json');
    expect(genDiff(before, after)).toEqual(expected);
  });
  test('flat yml files', () => {
    const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
    const before = getFixturePath('file1.yml');
    const after = getFixturePath('file2.yml');
    expect(genDiff(before, after)).toEqual(expected);
  });
});
