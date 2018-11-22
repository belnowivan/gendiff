import fs from 'fs';
import genDiff from '../src';

const pathMinusFormatFirst = './__tests__/__fixtures__/before-file';
const pathMinusFormatSecond = './__tests__/__fixtures__/after-file';
const expectedFilePath = './__tests__/__fixtures__/expectedJSON.txt';

const functTesDifftManyFormat = extName => genDiff(`${pathMinusFormatFirst}${extName}`, `${pathMinusFormatSecond}${extName}`);
const expectedValue = fs.readFileSync(expectedFilePath, 'utf8');

test('test yml format', () => {
  const resultDiffYml = functTesDifftManyFormat('.yml');
  expect(resultDiffYml).toBe(expectedValue);
});

test('test json format', () => {
  const resultDiffJson = functTesDifftManyFormat('.json');
  expect(resultDiffJson).toBe(expectedValue);
});
