#!/usr/bin/env node
import formatDiff from '..';
import programm from 'commander';

programm
  .version('0.1.0')
  .option('-f', '--format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv)
  .action((firstPath, secondPath, format) => {
    const getFormat = formatDiff(format);
    return console.log(getFormat(firstPath, secondPath));
  });

programm.parse(process.argv);
