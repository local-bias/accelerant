import { join } from 'path';
import { DEFAULT_PLUGIN_CONFIG_FILE_NAME } from './consts';
import { AccelerantConfig } from '../types/config';

export const importConfig = async (
  configFilePath: string = DEFAULT_PLUGIN_CONFIG_FILE_NAME
): Promise<AccelerantConfig> => {
  const configPath = join(process.cwd(), configFilePath);

  const pluginConfig: AccelerantConfig = await import(configPath);

  return pluginConfig;
};
