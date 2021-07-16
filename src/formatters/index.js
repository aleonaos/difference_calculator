import plain from './plain.js';
import stylish from './stylish.js';

export default (format, diff) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    default:
      return stylish(diff);
  }
};
