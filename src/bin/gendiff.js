#!/usr/bin/env node
import getDiff from '..';
import programm from 'commander';

programm
  .version('0.1.0')
  .option('-f, --format [type]', 'Output format: pretty, plain', 'plain')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv)
  .action((firstPath, secPath, optionFormat) => {
    const resultProcess = getDiff(firstPath, secPath, optionFormat.format);
    return console.log(resultProcess);
  });

programm.parse(process.argv);
