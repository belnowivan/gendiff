/* eslint-disable lodash/prefer-lodash-method */
import path from 'path';
import fs from 'fs';
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
  const readFirstFile = fs.readFileSync(firstPath, 'utf8');
  const readSecondFile = fs.readFileSync(secondPath, 'utf8');
  const dataFirstFile = toJsFormat(readFirstFile, path.extname(firstPath));
  const dataSecondtFile = toJsFormat(readSecondFile, path.extname(secondPath));
  return diff(dataFirstFile, dataSecondtFile);
};
