//@ts-check
import { exec } from 'child_process';
import chalk from 'chalk';
import { TEMPORARY_DIRECTORY_NAME } from '../lib/consts.mjs';

export const zipAndUploadAsDev = () => {
  let command = `kintone-plugin-packer --out ${TEMPORARY_DIRECTORY_NAME}/dev.zip`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
  console.log(
    chalk.hex('#d1d5db')(`${new Date().toLocaleTimeString()} `) +
      chalk.cyan(`[zip] `) +
      `プラグインをアップロードしました`
  );
};
