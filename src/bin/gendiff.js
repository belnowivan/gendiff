#!/usr/bin/env node
import genDiff from '..';
import programm from 'commander';

programm
  .version('0.1.0')
  .option('-f', '--format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv)
  .action((firstPath, secondPath) => console.log(genDiff(firstPath, secondPath)));

programm.parse(process.argv);
