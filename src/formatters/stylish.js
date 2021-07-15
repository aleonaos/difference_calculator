import _ from 'lodash';

const getName = (object) => object.name;
const getStatus = (object) => object.status;
const getChildren = (object) => object.children;
const getValue = (object) => object.value;
const getFirstValue = (object) => object.firstValue;
const getSecondValue = (object) => object.secondValue;

const expandValue = (initialValue) => {
  if (!_.isObject(initialValue)) {
    return initialValue;
  }
  const keys = Object.keys(initialValue);
  return keys
    .map((key) => ({ name: key, status: 'merged', children: expandValue(initialValue[key]) }));
};

export default (diff) => {
  const iter = (data, depth) => data.flatMap((item) => {
    const key = getName(item);
    const status = getStatus(item);
    const children = getChildren(item);
    const value = getValue(item);
    const firstValue = getFirstValue(item);
    const secondValue = getSecondValue(item);

    const indent = ' ';
    const regularIndent = indent.repeat(2 + depth * 4);
    const increasedIndent = indent.repeat(4 + depth * 4);

    const valueWithIndent = (val) => (Array.isArray(val) ? `{\n${iter(val, depth + 1).join('\n')}\n${increasedIndent}}` : val);
    const formatValue = (valueforFormat) => valueWithIndent(expandValue(valueforFormat));

    switch (status) {
      case 'added':
        return `${regularIndent}+ ${key}: ${formatValue(value)}`;
      case 'deleted':
        return `${regularIndent}- ${key}: ${formatValue(value)}`;
      case 'unmodified':
        return `${increasedIndent}${key}: ${formatValue(value)}`;
      case 'merged':
        return `${increasedIndent}${key}: ${valueWithIndent(children)}`;
      case 'modified':
        return [
          `${regularIndent}- ${key}: ${formatValue(firstValue)}`,
          `${regularIndent}+ ${key}: ${formatValue(secondValue)}`,
        ];
      default:
        throw new Error(`Unknown status ${status}`);
    }
  });

  return `{\n${iter(diff, 0).join('\n')}\n}`;
};
