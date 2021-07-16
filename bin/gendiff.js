#!/usr/bin/env node
import commander from 'commander';
import compareFiles from '../src/index.js';

const program = commander.createCommand();

const genDiff = program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'choose output format: stylish, plain, json', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(compareFiles(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);

export default genDiff;
