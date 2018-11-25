/* eslint-disable lodash/prefer-lodash-method */
import path from 'path';
import fs from 'fs';
import arrDiff from './ast';
import toJsFormat from './parsers';
import prettyDif from './render/prety-tree.rander';

export default (firstPath, secondPath) => {
  const readFirstFile = fs.readFileSync(firstPath, 'utf8');
  const readSecondFile = fs.readFileSync(secondPath, 'utf8');
  const dataFirstFile = toJsFormat(readFirstFile, path.extname(firstPath));
  const dataSecondtFile = toJsFormat(readSecondFile, path.extname(secondPath));
  const diff = arrDiff(dataFirstFile, dataSecondtFile);
  return prettyDif(diff);
};
