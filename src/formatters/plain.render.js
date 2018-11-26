/* eslint-disable lodash/prefer-lodash-typecheck */
/* eslint-disable lodash/prefer-lodash-method */
const strByType = {
  deleted: '\' was removed',
  added: '\' was added with value: ',
  modifed: '\' was updated. From ',
};

const choiceValue = (value) => {
  const purport = typeof value === 'string' ? `'${value}'` : value;
  return purport instanceof Object ? '[complex value]' : purport;
};

const typeRenderOptions = {
  node: (obj, parentName, funct) => funct(obj.children, `${parentName}${obj.key}.`),
  added: (obj, parentName) => `Property '${parentName}${obj.key}${strByType[obj.type]}${choiceValue(obj.value)}`,
  modifed: (obj, parentName) => `Property '${parentName}${obj.key}${strByType[obj.type]}${choiceValue(obj.oldValue)} to ${choiceValue(obj.newValue)}`,
  deleted: (obj, parentName) => `Property '${parentName}${obj.key}${strByType[obj.type]}`,
};

const render = (arr, parentName = '') => {
  const arrResult = arr.reduce((acc, obj) => {
    if (!(typeRenderOptions[obj.type])) {
      return acc;
    }
    return [...acc, typeRenderOptions[obj.type](obj, parentName, render)];
  }, []);
  return arrResult.join('\n');
};

export default render;
