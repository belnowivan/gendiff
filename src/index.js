import fs from 'fs';
import has from 'lodash/has';

const diff = (dataOne, dataTwo) => {
  const arrDiff = Object.keys(dataOne)
    .reduce((acc, elem) => {
      if (!has(dataTwo, elem)) { return [...acc, `- ${elem}: ${dataTwo[elem]}`]; }
      if (dataOne[elem] !== dataTwo[elem]) {
        return [...acc, `- ${elem}: ${dataOne[elem]}`, `+ ${elem}: ${dataTwo[elem]}`];
      }
      return `  ${dataTwo[elem]}`;
    });
  return arrDiff.join('\n');
};

const genDiff = (firstPath, secondPath) => {
  const firstContentFile = fs.readFileSync(firstPath);
  const secondContentFile = fs.readFileSync(secondPath);
  const dataFirstFile = JSON.parse(firstContentFile);
  const dataSecondtFile = JSON.parse(secondContentFile);
  return diff(dataFirstFile, dataSecondtFile);
};

export default genDiff;
