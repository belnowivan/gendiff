import fs from 'fs';
import genDiff from '../src';

describe('test many format', () => {
  const pathMinusFormatFirst = './__tests__/__fixtures__/before-file';
  const pathMinusFormatSecond = './__tests__/__fixtures__/after-file';
  const expectedFlatFile = './__tests__/__fixtures__/expected';

  const functTesDifftManyFormat = extName => genDiff(`${pathMinusFormatFirst}${extName}`, `${pathMinusFormatSecond}${extName}`);
  const expectedFlatValue = fs.readFileSync(`${expectedFlatFile}.flat.txt`, 'utf8');
  const expectedTreeValue = fs.readFileSync(`${expectedFlatFile}.tree.txt`, 'utf8');

  test('test yml falat format', () => {
    const resultDiffYml = functTesDifftManyFormat('.yml');
    expect(resultDiffYml).toBe(expectedFlatValue);
  });

  test('test json flat format', () => {
    const resultDiffJson = functTesDifftManyFormat('.json');
    expect(resultDiffJson).toBe(expectedFlatValue);
  });

  test('test ini flat format', () => {
    const resultDiffJson = functTesDifftManyFormat('.ini');
    expect(resultDiffJson).toBe(expectedFlatValue);
  });

  test('test json tree format', () => {
    const resultDiffJson = functTesDifftManyFormat('.tree.json');
    expect(resultDiffJson).toBe(expectedTreeValue);
  });
/*
  test('test yml tree format', () => {
    const resultDiffJson = functTesDifftManyFormat('.tree.ini');
    expect(resultDiffJson).toBe(expectedTreeValue);
  });

  test('test ini tree format', () => {
    const resultDiffJson = functTesDifftManyFormat('.tree.ini');
    expect(resultDiffJson).toBe(expectedTreeValue);
  });
  */
});
