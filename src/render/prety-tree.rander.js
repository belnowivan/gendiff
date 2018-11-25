/* eslint-disable lodash/prefer-lodash-method */
const actions = {
  plus: '+ ',
  dell: '- ',
  notChanged: '  ',
};

const strifyObj = (elem, depth = 2, prefix = ' ') => {
  const arrStr = Object.keys(elem).reduce((acc, key) => {
    if (elem[key] instanceof Object) {
      return [...acc, `${' '.repeat(depth)}${prefix}${key}: {`,
        `${strifyObj(elem[key], depth + 4)}\n${' '.repeat(depth + 2)}}`];
    }
    return [...acc, `${' '.repeat(depth)}${prefix}${key}: ${elem[key]}`];
  }, []);
  return arrStr.join('\n');
};

const prettyDif = (arr, depth = 4) => {
  const res = arr.reduce((acc, obj) => {
    if (obj.type === 'node') {
      return [...acc, `  ${' '.repeat(depth)}${obj.name} : {`, ...prettyDif(obj.child, depth + 2),
        `  ${' '.repeat(depth)}}`];
    }
    const prefix = actions[obj.action];
    const objContent = { [obj.name]: obj.value };
    return [...acc, strifyObj(objContent, depth, prefix)];
  }, []);
  return res;
};

export default prettyDif;
