import YAML from 'js-yaml';

const parse = (type, data) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return YAML.safeLoad(data);
    default:
      throw new Error(`Unknown data type! ${type} is not supported!`);
  }
};

export default parse;
