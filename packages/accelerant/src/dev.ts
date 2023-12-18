import { CommandOptions } from '.';
import { join } from 'path';
import { importConfig } from './lib/import-config';
import { buildWithEsbuild } from './lib/esbuild';
import upload from './lib/upload';
import { createPluginManifest } from './lib/create-plugin-manifest';

export default async (_: string, options: CommandOptions) => {
  const { config } = options;

  const pluginConfig = await importConfig(config);

  await createPluginManifest({ config: pluginConfig, env: 'dev' });

  await Promise.all([
    buildWithEsbuild(),
    //  tailwindcss(),
    upload(),
  ]);

  console.log('dev');
};
