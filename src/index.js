import path from 'path';
import fs, { access } from 'fs';
import _ from 'lodash';

const readJSON = (file) => {
  const jsonFile = fs.readFileSync(path.resolve(file), 'utf-8');
  const parseFile = JSON.parse(jsonFile);

  return parseFile;
};

const operators = ['-', '+'];

const genDiff = (filepath1, filepath2) => {
  const parse1 = readJSON(filepath1);
  const parse2 = readJSON(filepath2);

  const keys1 = Object.keys(parse1);
  const keys2 = Object.keys(parse2);
  const combineKeys = _.union(keys1, keys2).sort();

  const arrayOfKeys = combineKeys.reduce((acc, key) => {
    const value1 = parse1[key];
    const value2 = parse2[key];
    const indent = '  ';

    if (!keys2.includes(key)) {
      return [...acc, `${indent}${operators[0]} ${key}: ${value1}`];
    }
    if (!keys1.includes(key)) {
      return [...acc, `${indent}${operators[1]} ${key}: ${value2}`];
    }
    if (value1 === value2) {
      return [...acc, `${indent.repeat(2)}${key}: ${value1}`];
    }
    return [...acc, `${indent}${operators[0]} ${key}: ${value1}`, `${indent}${operators[1]} ${key}: ${value2}`];
  }, []);

  const result = [
    '{',
    ...arrayOfKeys,
    '}',
  ]
  return result.join('\n');
};

export default genDiff;
