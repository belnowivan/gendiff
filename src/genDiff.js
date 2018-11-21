/* eslint-disable lodash/prefer-lodash-method */
import fs from 'fs';
import union from 'lodash/union';
import has from 'lodash/has';

const diff = (dataOne, dataTwo) => {
  const arrKey = union(Object.keys(dataOne), Object.keys(dataTwo));
  const diffArr = arrKey.reduce((acc, key) => {
    const firstDataIsSecondIsNot = has(dataOne, key) ? ` ${key}: ${dataOne[key]}` : false;
    const SecondDataIsfirstIsNot = has(dataTwo, key) ? ` ${key}: ${dataTwo[key]}` : false;
    if (firstDataIsSecondIsNot) { return [...acc, `  - ${firstDataIsSecondIsNot}`]; }
    if (SecondDataIsfirstIsNot) { return [...acc, `  + ${SecondDataIsfirstIsNot}`]; }
    if (dataOne[key] !== dataTwo[key]) {
      return [...acc, `  + ${SecondDataIsfirstIsNot}`, `  - ${firstDataIsSecondIsNot}`];
    }
    return [...acc, `    ${SecondDataIsfirstIsNot}`];
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
