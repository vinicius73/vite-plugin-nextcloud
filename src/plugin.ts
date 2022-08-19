import type { BuildOptions, Manifest, Plugin, ResolvedConfig } from 'vite';
import type { PluginConfig } from './config';
import { relative } from 'node:path';
import { readFile } from 'node:fs/promises';
import { createLogger } from 'vite';
import { getManifestPath, getManifestTargetPath } from './config';
import { buildEntries } from './manifest';
import { buildVitePHPClass, writeFile } from './template';

const logger = createLogger('info', { prefix: 'nextcloud' });

const warn = (msg: string): void => logger.warn(msg, { timestamp: true });
const info = (msg: string): void => logger.info(msg, { timestamp: true });

export default (config: PluginConfig): Plugin => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!config.namespace) {
    throw new Error('namespace must be defined');
  }

  let viteConfig: ResolvedConfig;

  return {
    name: 'vite:nextcloud',

    config(config) {
      const original: BuildOptions = config.build ?? {};
      const build: BuildOptions = {};

      if (config.base !== './') {
        warn('you should define base as `./`');
      }

      if (original?.manifest != null) {
        warn('build manifest is already declared');
      } else {
        info('enabling manifest');
        build.manifest = true;
      }

      if (original.polyfillModulePreload != null) {
        warn('build polyfillModulePreload is already declared');
      } else {
        info('disabling polyfillModulePreload');
        build.polyfillModulePreload = false;
      }

      return {
        build,
      };
    },
    configResolved(config) {
      viteConfig = config;
    },

    async closeBundle() {
      const manifestPath = getManifestPath(viteConfig);
      const manifestTargetPath = getManifestTargetPath(viteConfig);

      const raw = JSON.parse(await readFile(manifestPath, 'utf-8')) as Manifest;

      info(
        `vite manifest was loaded: ${relative(viteConfig.root, manifestPath)}`
      );

      const entries = buildEntries(raw);

      await writeFile(
        manifestTargetPath,
        buildVitePHPClass(config.namespace, entries)
      );

      info(
        `nextcloud App Manifest generated: ${relative(
          viteConfig.root,
          manifestTargetPath
        )}`
      );
    },
  };
};
