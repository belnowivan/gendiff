import fs from 'fs';
import genDiff from '../src';

test('test absolute & relative path', () => {
/*
  const resultAbsolutePath =
    genDiff('/home/ivan/project-lvl2-s365/__test__/__fixtures__/before_file.json',
      '/home/ivan/project-lvl2-s365/__test__/__fixtures__/after_file.json');
travis-ci не знает абсолютного пути,
  тестил на локалной машине , решил не удалять код.
      */
  const resultRelativePath = genDiff('./__test__/__fixtures__/before_file.json',
    './__test__/__fixtures__/after_file.json');
  const expected = fs.readFileSync('./__test__/__fixtures__/expectedJSON.txt', 'utf8');
  // expect(resultAbsolutePath).toBe(expected);
  expect(resultRelativePath).toBe(expected);
});
