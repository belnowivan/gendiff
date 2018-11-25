/* eslint-disable lodash/prefer-lodash-method */
import path from 'path';
import fs from 'fs';
import arrDiff from './ast';
import toJsFormat from './parsers';
import prettyDif from './render/prety-tree.rander';

const a = (firstPath, secondPath) => {
  const readFirstFile = fs.readFileSync(firstPath, 'utf8');
  const readSecondFile = fs.readFileSync(secondPath, 'utf8');
  const dataFirstFile = toJsFormat(readFirstFile, path.extname(firstPath));
  const dataSecondtFile = toJsFormat(readSecondFile, path.extname(secondPath));
  const diff = arrDiff(dataFirstFile, dataSecondtFile);
  return prettyDif(diff);
};

export default a;

console.log(a('./__tests__/__fixtures__/before-file.tree.json', './__tests__/__fixtures__/after-file.tree.json'));