//@ts-check

import { readFileSync, writeFileSync } from 'fs';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import chokidar from 'chokidar';
import configConfig from './tailwind.config.config.mjs';
import configDesktop from './tailwind.config.desktop.mjs';
import { join } from 'path';
import { TEMPORARY_DIRECTORY_NAME } from '../lib/consts.mjs';
import chalk from 'chalk';

export const watchCss = () => {
  const inputFilePath = join('src', 'styles', 'global.css');
  const inputCss = readFileSync(inputFilePath, 'utf8');

  /**
   * @param { 'config' | 'desktop' } env
   */
  const build = async (env) => {
    try {
      const config = env === 'config' ? configConfig : configDesktop;
      const result = await postcss([tailwindcss(config), autoprefixer]).process(inputCss, {
        from: 'input.css',
        to: 'output.css',
      });
      const outputFilePath = join(TEMPORARY_DIRECTORY_NAME, 'dev', `${env}.css`);
      writeFileSync(outputFilePath, result.css);
      console.log(
        chalk.hex('#d1d5db')(`${new Date().toLocaleTimeString()} `) +
          chalk.cyan(`[css] `) +
          `変更を反映しました`
      );
    } catch (error) {
      console.error('Tailwind CSS build failed:', error);
    }
  };

  const watchFunc = () => Promise.all([build('config'), build('desktop')]);

  const watchPath = './src/**/*.{ts,js,jsx,tsx}';
  const watcher = chokidar.watch(watchPath, { ignored: /(^|[\/\\])\../ });
  watcher.on('add', watchFunc).on('change', watchFunc);
};
