/* eslint-disable lodash/prefer-constant */
/* eslint-disable lodash/prefer-lodash-typecheck */
/* eslint-disable lodash/prefer-lodash-method */
const choiceValue = (value) => {
  const purport = typeof value === 'string' ? `'${value}'` : value;
  return purport instanceof Object ? '[complex value]' : purport;
};

const typeRenderOptions = {
  node: (obj, parentName, funct) => funct(obj.children, `${parentName}${obj.key}.`),
  added: (obj, parentName) => `Property '${parentName}${obj.key}' was added with value: ${choiceValue(obj.value)}`,
  modifed: (obj, parentName) => `Property '${parentName}${obj.key}' was updated. From ${choiceValue(obj.oldValue)} to ${choiceValue(obj.newValue)}`,
  deleted: (obj, parentName) => `Property '${parentName}${obj.key}' was removed`,
  notChanged: () => '',
};

const render = (arr, parentName = '') => {
  const arrResult = arr.reduce((acc, obj) => [...acc,
    typeRenderOptions[obj.type](obj, parentName, render)], []);
  return arrResult.felter(elem => elem !== '').join('\n');
};

export default render;
