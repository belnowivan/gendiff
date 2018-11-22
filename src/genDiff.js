/* eslint-disable lodash/prefer-lodash-method */
import union from 'lodash/union';
import has from 'lodash/has';
import toJsFormat from './parse';

const diff = (dataOne, dataTwo) => {
  const arrKey = union(Object.keys(dataOne), Object.keys(dataTwo));
  const diffArr = arrKey.reduce((acc, key) => {
    if (has(dataOne, key) && !has(dataTwo, key)) { return [...acc, `  - ${key}: ${dataOne[key]}`]; }
    if (!has(dataOne, key) && has(dataTwo, key)) { return [...acc, `  + ${key}: ${dataTwo[key]}`]; }
    if (dataOne[key] !== dataTwo[key]) {
      return [...acc, `  + ${key}: ${dataTwo[key]}`, `  - ${key}: ${dataOne[key]}`];
    }
    return [...acc, `    ${key}: ${dataTwo[key]}`];
  }, []);
  return `{\n${diffArr.join('\n')}\n}`;
};

export default (firstPath, secondPath) => {
  const dataFirstFile = toJsFormat(firstPath);
  const dataSecondtFile = toJsFormat(secondPath);
  return diff(dataFirstFile, dataSecondtFile);
};
