import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['json', 'expectedJSON.txt'],
  ['yml', 'expectedJSON.txt'],
];

describe('gendiff', () => {
  test.each(cases)(
    'compare two %s files',
    (type, expectedResult) => {
      const expected = readFile(expectedResult).trim();
      const before = getFixturePath(`file1.${type}`);
      const after = getFixturePath(`file2.${type}`);
      const generate = genDiff(before, after).trim();
      expect(generate).toEqual(expected);
    },
  );
});
