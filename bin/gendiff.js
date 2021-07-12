#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')

program.parse(process.argv);