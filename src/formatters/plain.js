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
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (diff) => {
  const iter = (data, path) => {
    const result = data.flatMap((item) => {
      const key = getKey(item);
      const status = getStatus(item);
      const children = getChildren(item);
      const value = getValue(item);
      const firstValue = getFirstValue(item);
      const secondValue = getSecondValue(item);

      const newPath = `${path}.${key}`;

      switch (status) {
        case 'added':
          return `Property '${newPath.slice(1)}' was added with value: ${checkValue(value)}`;
        case 'deleted':
          return `Property '${newPath.slice(1)}' was removed`;
        case 'modified':
          return `Property '${newPath.slice(1)}' was updated. From ${checkValue(firstValue)} to ${checkValue(secondValue)}`;
        case 'merged':
          return iter(children, newPath);
        case 'unmodified':
          return [];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    });

    return result.join('\n');
  };

  return iter(diff, '');
};
