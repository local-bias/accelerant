#!/usr/bin/env node

//@ts-check
import { Command } from 'commander';
import dev from './dev.mjs';
import build from './build.mjs';

const program = new Command();

program.name('accelerant').description('CLI to manage kintone plugin development').version('0.1.0');

program
  .command('dev')
  .description('start development')
  .option('--config', 'config file path')
  .option('--ppk', 'ppk file path')
  .action(dev);

program
  .command('build')
  .option('--config', 'config file path')
  .option('--ppk', 'ppk file path')
  .description('build plugin')
  .action(build);

program.parse();
