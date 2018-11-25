import fs from 'fs';
import genDiff from '../src';

describe('test many format', () => {
  const pathMinusFormatFirst = './__tests__/__fixtures__/before-file';
  const pathMinusFormatSecond = './__tests__/__fixtures__/after-file';
  const expectedFlatFile = './__tests__/__fixtures__/expected';

  const functTesDifftManyFormat = (extName, format) => genDiff(`${pathMinusFormatFirst}${extName}`, `${pathMinusFormatSecond}${extName}`, format);
  const expectedFlatValue = fs.readFileSync(`${expectedFlatFile}.flat.txt`, 'utf8');
  const expectedTreeValue = fs.readFileSync(`${expectedFlatFile}.tree.txt`, 'utf8');
  const expectedPlainValue = fs.readFileSync(`${expectedFlatFile}.plain.txt`, 'utf8');

  test('test yml falat format', () => {
    const resultDiff = functTesDifftManyFormat('.yml', 'pretty');
    expect(resultDiff).toBe(expectedFlatValue);
  });

  test('test json flat format', () => {
    const resultDiff = functTesDifftManyFormat('.json', 'pretty');
    expect(resultDiff).toBe(expectedFlatValue);
  });

  test('test ini flat format', () => {
    const resultDiff = functTesDifftManyFormat('.ini', 'pretty');
    expect(resultDiff).toBe(expectedFlatValue);
  });

  test('test json tree format', () => {
    const resultDiff = functTesDifftManyFormat('.tree.json', 'pretty');
    expect(resultDiff).toBe(expectedTreeValue);
  });
  test('test yml tree format', () => {
    const resultDiff = functTesDifftManyFormat('.tree.yml', 'pretty');
    expect(resultDiff).toBe(expectedTreeValue);
  });

  test('test ini tree format', () => {
    const resultDiff = functTesDifftManyFormat('.tree.ini', 'pretty');
    expect(resultDiff).toBe(expectedTreeValue);
  });
  test('test ini tree format diff plain', () => {
    const resultDiff = functTesDifftManyFormat('.tree.ini', 'plain');
    expect(resultDiff).toBe(expectedPlainValue);
  });
});
