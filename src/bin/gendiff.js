#!/usr/bin/env node
import getDiff from '..';
import programm from 'commander';

programm
  .version('0.1.0')
  .option('-f', '--format [type]', 'Output format', 'tree')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv)
  .action((firstPath, secondPath, format) => console.log(getDiff(firstPath, secondPath, format)));

programm.parse(process.argv);
