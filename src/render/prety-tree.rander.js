/* eslint-disable lodash/prefer-lodash-method */
const actions = {
  plus: '+ ',
  dell: '- ',
  notChanged: '  ',
};

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

const prettyDif = (arr, depth = 4) => {
  const res = arr.reduce((acc, obj) => {
    if (obj.type === 'node') {
      return [...acc, `${' '.repeat(depth)}${obj.name}: {`, ...prettyDif(obj.child, depth + 4),
        `${' '.repeat(depth)}}`];
    }
    const prefix = actions[obj.action];
    const objContent = { [obj.name]: obj.value };
    return [...acc, strifyObj(objContent, depth, prefix)];
  }, []);
  return res;
};
const getPretty = (arr, depth) => `{\n${prettyDif(arr, depth).join('\n')}\n}`;

export default getPretty;
