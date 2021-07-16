import _ from 'lodash';
import {
  getKey,
  getStatus,
  getChildren,
  getValue,
  getFirstValue,
  getSecondValue,
} from '../getter.js';

const checkValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (Number.isNaN(Number(value))) {
    return `'${value}'`;
  }
  return value;
};

export default (diff) => {
  const iter = (data, path) => data.flatMap((item) => {
    const key = getKey(item);
    const status = getStatus(item);
    const children = getChildren(item);
    const value = getValue(item);
    const firstValue = getFirstValue(item);
    const secondValue = getSecondValue(item);

    const newPath = `${path}.${key}.slice(1)`;

    switch (status) {
      case 'added':
        return `Property '${newPath}' was added with value: ${checkValue(value)}`;
      case 'deleted':
        return `Property '${newPath}' was removed`;
      case 'modified':
        return `Property '${newPath}' was updated. From ${checkValue(firstValue)} to ${checkValue(secondValue)}`;
      case 'merged':
        return iter(children, newPath);
      case 'unmodified':
        return [];
      default:
        throw new Error(`Unknown status ${status}`);
    }
  });

  return iter(diff, '').join('\n');
};
