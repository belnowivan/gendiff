/* eslint-disable lodash/prefer-lodash-method */

const strifyObj = (obj, depth, prefix = '') => {
  const arrStr = Object.keys(obj).reduce((acc, key) => {
    if (obj[key] instanceof Object) {
      return [...acc, `${' '.repeat(depth - 2)}${prefix}${key}: {`,
        `${strifyObj(obj[key], depth + 4, '  ')}\n${' '.repeat(depth)}}`];
    }
    return [...acc, `${' '.repeat(depth - 2)}${prefix}${key}: ${obj[key]}`];
  }, []);
  return arrStr.join('\n');
};

const arrPrettyDiff = (arr, depth = 4) => {
  const resultArr = arr.reduce((acc, obj) => {
    switch (obj.type) {
      case 'node':
        return [...acc, `${' '.repeat(depth)}${obj.key}: {`, ...arrPrettyDiff(obj.children, depth + 4),
          `${' '.repeat(depth)}}`];
      case 'modifed':
        return [...acc, strifyObj({ [obj.key]: obj.newValue }, depth, '+ '),
          strifyObj({ [obj.key]: obj.oldValue }, depth, '- ')];
      case 'added':
        return [...acc, strifyObj({ [obj.key]: obj.value }, depth, '+ ')];
      case 'deleted':
        return [...acc, strifyObj({ [obj.key]: obj.value }, depth, '- ')];
      default:
        return [...acc, strifyObj({ [obj.key]: obj.value }, depth, '  ')];
    }
  }, []);
  return resultArr;
};

export default (arr, depth) => `{\n${arrPrettyDiff(arr, depth).join('\n')}\n}`;
