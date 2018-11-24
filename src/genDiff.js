/* eslint-disable lodash/prefer-lodash-method */
import path from 'path';
import fs from 'fs';
import flatten from 'lodash/flatten';
import arrDiff from './ast';
import toJsFormat from './parsers';

const badgesDiff = {
  dell: '-',
  plus: '+',
  notChanged: ' ',
};

const prettyDif = (arr) => {
  const result = arr.reduce((acc, elem) => {
    if (elem.type === 'node') {
      return flatten([...acc, `  ${badgesDiff[elem.action]} ${elem.name}: ${prettyDif(elem.children)}`]);
    }
    return flatten([...acc, `  ${badgesDiff[elem.action]} ${elem.name}: ${elem.value}`]);
  }, []);
  return `{\n${result.join('\n')}\n}`;
};


export default (firstPath, secondPath) => {
  const readFirstFile = fs.readFileSync(firstPath, 'utf8');
  const readSecondFile = fs.readFileSync(secondPath, 'utf8');
  const dataFirstFile = toJsFormat(readFirstFile, path.extname(firstPath));
  const dataSecondtFile = toJsFormat(readSecondFile, path.extname(secondPath));
  const diff = arrDiff(dataFirstFile, dataSecondtFile);
  return prettyDif(diff);
};
