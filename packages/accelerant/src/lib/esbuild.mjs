//@ts-check
import chalk from 'chalk';
import esbuild from 'esbuild';
import { join } from 'path';
import readline from 'readline';
import sassPlugin from './esbuild-sass-plugin.mjs';
import { TEMPORARY_DIRECTORY_NAME } from './consts.mjs';

export const buildWithEsbuild = async () => {
  const srcRoot = 'src';

  let entryPoints = [];

  entryPoints = ['desktop', 'config'].map((dir) => join(srcRoot, dir, 'index.ts'));

  const context = await esbuild.context({
    entryPoints,
    bundle: true,
    sourcemap: 'inline',
    platform: 'browser',
    outdir: join(TEMPORARY_DIRECTORY_NAME, 'dev'),
    plugins: [
      {
        name: 'on-end',
        setup: ({ onEnd }) =>
          onEnd(() => {
            readline.cursorTo(process.stdout, 0);
            readline.clearLine(process.stdout, 0);

            console.log(
              chalk.hex('#d1d5db')(`${new Date().toLocaleTimeString()} `) +
                chalk.cyan(`[js] `) +
                `変更を反映しました`
            );
          }),
      },
      sassPlugin,
    ],
  });

  context.watch();
};
