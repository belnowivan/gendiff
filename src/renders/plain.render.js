/* eslint-disable lodash/prefer-lodash-method */
const strByType = {
  delete: ' was removed',
  added: ' was added with value ',
  modifed: ' was updated. From ',
};

const render = (arr) => {
  const arrResult = arr.reduce((acc, obj) => {
    if (obj.type === 'node') {
      return [...acc, `Property ${obj.key}.${render(obj.children)}`];
    }
    if (obj.type === 'modifed') {
      const oldVal = obj.oldValue instanceof Object ? '[complex value]' : obj.oldValue;
      const newVal = obj.newValue instanceof Object ? '[complex value]' : obj.newValue;
      return [...acc, `Property ${obj.key} ${strByType[obj.type]}${oldVal} to ${newVal}`];
    }
    if (obj.type === 'added') {
      const newVal = obj.value instanceof Object ? '[complex value]' : obj.value;
      return [...acc, `Property ${obj.key}${strByType[obj.type]}${newVal}`];
    }
    return [...acc, `Property ${obj.key}${strByType[obj.type]}`];
  });
  return arrResult.join('');
};

export default arr => render(arr).join('\n');
