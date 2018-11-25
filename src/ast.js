/* eslint-disable lodash/prefer-lodash-method */
import union from 'lodash/union';
import has from 'lodash/has';

const getArrDiff = (obj1, obj2) => {
  const arrKey = union(Object.keys(obj1), Object.keys(obj2));
  const arrDiff = arrKey.reduce((acc, key) => {
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return [...acc, {
        child: getArrDiff(obj1[key], obj2[key]), type: 'node', name: key,
      }];
    }
    if (has(obj1, key) && !has(obj2, key)) {
      return [...acc, { value: obj1[key], action: 'dell', name: key }];
    }
    if (!has(obj1, key) && has(obj2, key)) {
      return [...acc, { value: obj2[key], action: 'plus', name: key }];
    }
    if (obj1[key] !== obj2[key]) {
      return [...acc,
        { value: obj2[key], action: 'plus', name: key },
        { value: obj1[key], action: 'dell', name: key }];
    }
    return [...acc, { value: obj1[key], action: 'notChanged', name: key }];
  }, []);
  return arrDiff;
};

export default getArrDiff;
