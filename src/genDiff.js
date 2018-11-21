/* eslint-disable lodash/prefer-lodash-method */
import fs from 'fs';
import union from 'lodash/union';
import has from 'lodash/has';

const diff = (dataOne, dataTwo) => {
  const arrKey = union(Object.keys(dataOne), Object.keys(dataTwo));
  const diffArr = arrKey.reduce((acc, key) => {
    if (has(dataOne, key) && !has(dataTwo, key)) { return [...acc, `  - ${key}: ${dataOne[key]}`]; }
    if (!has(dataOne, key) && has(dataTwo, key)) { return [...acc, `  + ${key}: ${dataTwo[key]}`]; }
    return dataOne[key] !== dataTwo[key]
      ? [...acc, `  + ${key}: ${dataTwo[key]}`, `  - ${key}: ${dataOne[key]}`]
      : [...acc, `    ${key}: ${dataTwo[key]}`];
  }, []);
  return `{\n${diffArr.join('\n')}\n}`;
};

export default (firstPath, secondPath) => {
  const firstContentFile = fs.readFileSync(firstPath);
  const secondContentFile = fs.readFileSync(secondPath);
  const dataFirstFile = JSON.parse(firstContentFile);
  const dataSecondtFile = JSON.parse(secondContentFile);
  return diff(dataFirstFile, dataSecondtFile);
};
