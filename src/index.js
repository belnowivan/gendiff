import fs from 'fs';
import union from 'lodash/union';
import has from 'lodash/has';

const diff = (dataOne, dataTwo) => {
  // eslint-disable-next-line lodash/prefer-lodash-method
  const arrKey = union(Object.keys(dataOne), Object.keys(dataTwo));
  // eslint-disable-next-line lodash/prefer-lodash-method
  const diffArr = arrKey.reduce((acc, key) => {
    const icnlOneKey = has(dataOne, key);
    const icnlTwoKey = has(dataTwo, key);
    if (icnlOneKey && !icnlTwoKey) { return [...acc, `  - ${key}: ${dataOne[key]}`]; }
    if (!icnlOneKey && icnlTwoKey) { return [...acc, `  + ${key}: ${dataTwo[key]}`]; }
    return dataOne[key] !== dataTwo[key]
      ? [...acc, `  + ${key}: ${dataTwo[key]}`, `  - ${key}: ${dataOne[key]}`]
      : [...acc, `    ${key}: ${dataTwo[key]}`];
  }, []);
  return `{\n${diffArr.join('\n')}\n}`;
};

const genDiff = (firstPath, secondPath) => {
  const firstContentFile = fs.readFileSync(firstPath);
  const secondContentFile = fs.readFileSync(secondPath);
  const dataFirstFile = JSON.parse(firstContentFile);
  const dataSecondtFile = JSON.parse(secondContentFile);
  return diff(dataFirstFile, dataSecondtFile);
};

export default genDiff;
