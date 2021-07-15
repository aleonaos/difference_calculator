import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const makeFileData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const type = path.extname(filepath).slice(1);

  return { data, type };
};

const operators = ['-', '+'];

const genDiff = (filepath1, filepath2) => {
  const fileData1 = makeFileData(filepath1);
  const fileData2 = makeFileData(filepath2);

  const parsedFile1 = parse(fileData1.type, fileData1.data);
  const parsedFile2 = parse(fileData2.type, fileData2.data);

  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const combineKeys = _.union(keys1, keys2).sort();

  const arrayOfKeys = combineKeys.reduce((acc, key) => {
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];
    const indent = '  ';

    if (!keys2.includes(key)) {
      return [...acc, `${indent}${operators[0]} ${key}: ${value1}`];
    }
    if (!keys1.includes(key)) {
      return [...acc, `${indent}${operators[1]} ${key}: ${value2}`];
    }
    if (value1 === value2) {
      return [...acc, `${indent.repeat(2)}${key}: ${value2}`];
    }

    return [...acc, `${indent}${operators[0]} ${key}: ${value1}`, `${indent}${operators[1]} ${key}: ${value2}`];
  }, []);

  const result = [
    '{',
    ...arrayOfKeys,
    '}',
  ];

  return result.join('\n');
};

export default genDiff;
