import { CommandOptions } from '.';
import { importConfig } from './lib/import-config.js';
import { buildWithEsbuild } from './lib/esbuild.js';
import upload from './lib/upload.js';
import { createPluginManifest } from './lib/create-plugin-manifest.js';

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
