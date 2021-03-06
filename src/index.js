import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const makeFileData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const type = path.extname(filepath).slice(1);

  return { data, type };
};

const buildDiff = (firstObject, secondObject) => {
  const combineKeys = _.union(_.keys(firstObject), _.keys(secondObject));
  const sortedKeys = _.sortBy(combineKeys);

  const result = sortedKeys.map((key) => {
    const firstValue = firstObject[key];
    const secondValue = secondObject[key];

    if (!_.has(secondObject, key)) {
      return { name: key, status: 'deleted', value: firstValue };
    }
    if (!_.has(firstObject, key)) {
      return { name: key, status: 'added', value: secondValue };
    }
    if (firstValue === secondValue) {
      return { name: key, status: 'unmodified', value: secondValue };
    }
    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return { name: key, status: 'merged', children: buildDiff(firstValue, secondValue) };
    }
    return {
      name: key,
      status: 'modified',
      firstValue,
      secondValue,
    };
  });

  return result;
};

const genDiff = (filepath1, filepath2, outputFormat) => {
  const fileData1 = makeFileData(filepath1);
  const fileData2 = makeFileData(filepath2);

  const parsedFile1 = parse(fileData1.type, fileData1.data);
  const parsedFile2 = parse(fileData2.type, fileData2.data);

  const diff = buildDiff(parsedFile1, parsedFile2);
  const result = format(outputFormat, diff);

  return result;
};

export default genDiff;
