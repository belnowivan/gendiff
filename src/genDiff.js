/* eslint-disable lodash/prefer-lodash-method */
import path from 'path';
import fs from 'fs';
import arrDiff from './ast';
import pars from './parsers';
import getFormat from './renders';

export default (firstPath, secondPath, format) => {
  const readFirstFile = fs.readFileSync(firstPath, 'utf8');
  const readSecondFile = fs.readFileSync(secondPath, 'utf8');
  const dataFirstFile = pars(readFirstFile, path.extname(firstPath));
  const dataSecondtFile = pars(readSecondFile, path.extname(secondPath));
  const diff = arrDiff(dataFirstFile, dataSecondtFile);
  return getFormat(format)(diff);
};
