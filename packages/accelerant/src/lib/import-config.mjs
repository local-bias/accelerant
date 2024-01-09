//@ts-check

import { join } from 'path';
import { pathToFileURL } from 'url';
import { DEFAULT_PLUGIN_CONFIG_FILE_NAME } from './consts.mjs';

/**
 * 指定された設定ファイルをインポートします。
 * @param {string} configFilePath - 設定ファイルのパス（デフォルト値: DEFAULT_PLUGIN_CONFIG_FILE_NAME）
 * @returns { Promise<import("../types/config").AccelerantConfig> } - インポートされた設定オブジェクトのPromise
 */
export const importConfig = async (configFilePath = DEFAULT_PLUGIN_CONFIG_FILE_NAME) => {
  try {
    const configPath = join(process.cwd(), configFilePath);
    const configUrl = pathToFileURL(configPath);

    /** @type { { default: import("../types/config").AccelerantConfig } } */
    const { default: pluginConfig } = await import(configUrl.href);

    return pluginConfig;
  } catch (error) {
    console.error(error);
    throw new Error(
      'プラグインの設定ファイルが見つかりませんでした。デフォルトでプロジェクトルートに「plugin.config.mjs」を配置してください。設定ファイルのパスは「--config」オプションで指定できます。'
    );
  }
};
