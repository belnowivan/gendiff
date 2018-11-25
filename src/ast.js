/* eslint-disable lodash/prefer-lodash-method */
import union from 'lodash/union';
import has from 'lodash/has';

const getArrDiff = (obj1, obj2) => {
  const arrKey = union(Object.keys(obj1), Object.keys(obj2));
  const arrDiff = arrKey.reduce((acc, key) => {
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return [...acc, {
        children: getArrDiff(obj1[key], obj2[key]), type: 'node', key,
      }];
    }
    if (has(obj1, key) && !has(obj2, key)) {
      return [...acc, { value: obj1[key], type: 'deleted', key }];
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return [...acc, { value: obj2[key], type: 'added', key }];
    }
    if (obj1[key] !== obj2[key]) {
      return [...acc, {
        type: 'modifed', key, oldValue: obj1[key], newValue: obj2[key],
      }];
    }
    return [...acc, { value: obj1[key], type: 'notChanged', key }];
  }, []);
  return arrDiff;
};

export default getArrDiff;
