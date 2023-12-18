//@ts-check
import { writeFileSync } from 'fs';
import path from 'path';
import { TEMPORARY_DIRECTORY_NAME } from './consts.js';
import { AccelerantConfig } from '../types/config.js';

const merged = (src: any, dst: any): any => {
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

export const createPluginManifest = (params: {
  config: AccelerantConfig;
  env: keyof AccelerantConfig['manifest'];
}) => {
  const { config, env } = params;

  const base = config.manifest.base;

  const extention = config.manifest[env];

  const manifestPath = path.join(process.cwd(), TEMPORARY_DIRECTORY_NAME, 'manifest.json');

  writeFileSync(manifestPath, JSON.stringify(merged(base, extention)));
};
