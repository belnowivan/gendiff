#!/usr/bin/env node
import programm from '../CLI';
import genDiff from '..';

programm.action((firstPath, secondPath) => {
  console.log(genDiff(firstPath, secondPath));
});

programm.parse(process.argv);
