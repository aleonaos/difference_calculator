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
  ['stylish', 'json', 'expectedStylish.txt'],
  ['stylish', 'yml', 'expectedStylish.txt'],
  ['plain', 'json', 'expectedPlain.txt'],
  ['plain', 'yml', 'expectedPlain.txt'],
];

describe('gendiff', () => {
  test.each(cases)(
    'files formatted as %p',
    (format, type, expectedResult) => {
      console.log(expectedResult);
      const result = readFile(expectedResult);
      const first = getFixturePath(`file1.${type}`);
      const second = getFixturePath(`file2.${type}`);
      const generate = genDiff(first, second, format);
      expect(generate).toEqual(result);
    },
  );
});
