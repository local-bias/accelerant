//@ts-check
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { TEMPORARY_DIRECTORY_NAME } from './consts.mjs';

/**
 * 2つのオブジェクトをマージします。
 *
 * @param {any} src - マージ元のオブジェクト
 * @param {any} dst - マージ先のオブジェクト
 * @returns {any} マージされたオブジェクト
 */
const merged = (src, dst) => {
  return Object.entries(src).reduce((acc, [key, value]) => {
    if (!dst[key]) {
      return { ...acc, [key]: value };
    }

    if (typeof dst[key] === 'string') {
      return { ...acc, [key]: dst[key] };
    }

    if (Array.isArray(value) && Array.isArray(dst[key])) {
      return { ...acc, [key]: [...value, ...dst[key]] };
    }

    return { ...acc, [key]: merged(src[key], dst[key]) };
  }, {});
};

/**
 * プラグインのマニフェストを作成します。
 *
 * @param { Object } params - パラメータオブジェクト
 * @param { import("../types/config").AccelerantConfig } params.config - Accelerantの設定オブジェクト
 * @param { keyof import("../types/config").AccelerantConfig['manifest'] } params.env - マニフェストの環境キー
 */
export const createPluginManifest = (params) => {
  const { config, env } = params;

  const base = config.manifest.base;

  const extention = config.manifest[env];

  const temporaryFolderPath = path.join(process.cwd(), TEMPORARY_DIRECTORY_NAME, env);

  if (!existsSync(temporaryFolderPath)) {
    mkdirSync(temporaryFolderPath, { recursive: true });
  }

  const manifestPath = path.join(process.cwd(), TEMPORARY_DIRECTORY_NAME, 'manifest.json');

  writeFileSync(manifestPath, JSON.stringify(merged(base, extention)));
};
