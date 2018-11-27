/* eslint-disable lodash/prefer-lodash-method */
import flatten from 'lodash/flatten';

const toStr = (val, depth) => {
  if (!(val instanceof Object)) { return val; }
  const arrStr = Object.keys(val)
    .map(key => (val[key] instanceof Object ? `${'    '.repeat(depth)}${key}: ${toStr(val[key], depth + 1)}`
      : `${'    '.repeat(depth)}${key}: ${val[key]}`));
  return `{\n${arrStr.join('\n')}\n${'    '.repeat(depth - 1)}}`;
};

const strifyObj = (objKey, objVal, depth, prefix = '  ') => `${'    '.repeat(depth).slice(2)}${prefix}${objKey}: ${toStr(objVal, depth + 1)}`;

const arrPrettyDiff = (arr, depth = 1) => {
  const resultArr = arr.map((obj) => {
    switch (obj.type) {
      case 'node':
        return [`${'    '.repeat(depth)}${obj.key}: {`, ...arrPrettyDiff(obj.children, depth + 1),
          `${'    '.repeat(depth)}}`];
      case 'modifed':
        return [strifyObj(obj.key, obj.newValue, depth, '+ '),
          strifyObj(obj.key, obj.oldValue, depth, '- ')];
      case 'added':
        return strifyObj(obj.key, obj.value, depth, '+ ');
      case 'deleted':
        return strifyObj(obj.key, obj.value, depth, '- ');
      default:
        return strifyObj(obj.key, obj.value, depth, '  ');
    }
  });
  return flatten(resultArr);
};

export default (arr, depth) => `{\n${arrPrettyDiff(arr, depth).join('\n')}\n}`;
