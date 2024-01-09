//@ts-check
import { importConfig } from './lib/import-config.mjs';
import { buildWithEsbuild } from './lib/esbuild.mjs';
import upload from './lib/upload.mjs';
import { createPluginManifest } from './lib/create-plugin-manifest.mjs';
import { buildCss } from './tailwindcss/prod.mjs';

/**
 * 非同期でデフォルトのエクスポート関数を実行します。
 *
 * @param { string } _ - ダミーパラメータ
 * @param { import("./types/cli").CommandOptions } options - コマンドのオプション
 * @returns { Promise<void> } - Promiseオブジェクト
 */
export default async (_, options) => {
  const { config } = options;

  const pluginConfig = await importConfig(config);

  await createPluginManifest({ config: pluginConfig, env: 'prod' });

  await Promise.all([
    buildWithEsbuild(),
    buildCss(),
    // upload(),
  ]);

  console.log('dev');
};
