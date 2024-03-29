import _ from 'lodash';
import parseContent from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const currentContent1 = parseContent(filePath1);
  const currentContent2 = parseContent(filePath2);

  const iter = (content1, content2) => {
    const keys = _.union(Object.keys(content1), Object.keys(content2));
    const sortedKeys = keys.sort((a, b) => a.localeCompare(b));
    const result = {};
    sortedKeys.map((key) => {
      const currentValue1 = content1[key];
      const currentValue2 = content2[key];

      if (Object.hasOwn(content1, key) && !Object.hasOwn(content2, key)) {
        result[key] = 'removed';
      } else if (!Object.hasOwn(content1, key) && Object.hasOwn(content2, key)) {
        result[key] = 'added';
      } else if (Object.hasOwn(content1, key) && Object.hasOwn(content2, key)) {
        if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
          const res = iter(currentValue1, currentValue2);
          result[key] = res;
        } else if (currentValue1 === currentValue2) {
          result[key] = 'unchanged';
        } else if (currentValue1 !== currentValue2) {
          result[key] = 'updated';
        }
      }
      return key;
    });
    return result;
  };
  const diff = iter(currentContent1, currentContent2);
  return diff;
};

export default genDiff;
