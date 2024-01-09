//@ts-check

import { readFileSync, writeFileSync } from 'fs';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import configConfig from './tailwind.config.config.mjs';
import configDesktop from './tailwind.config.desktop.mjs';
import { join } from 'path';
import { TEMPORARY_DIRECTORY_NAME } from '../lib/consts.mjs';
import chalk from 'chalk';

export const buildCss = () => {
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
      const outputFilePath = join(TEMPORARY_DIRECTORY_NAME, 'prod', `${env}.css`);
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

  return Promise.all([build('config'), build('desktop')]);
};
