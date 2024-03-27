#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';
import chooseFormater from '../src/formatters/index.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .action((file1, file2) => {
    const formatName = program.opts().format;
    const diff = gendiff(file1, file2);
    const result = chooseFormater(file1, file2, diff, formatName);
    console.log(result);
  });

program.parse();
