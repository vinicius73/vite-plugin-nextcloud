import type { ResolvedConfig } from 'vite';
import { resolve } from 'node:path';

export interface PluginConfig {
  /**
   * PHP Namespace of Vite Manifest
   */
  namespace: string;
}

const getManifestName = (viteConfig: ResolvedConfig): string => {
  return viteConfig.build?.manifest === true
    ? 'manifest.json'
    : (viteConfig.build.manifest as string);
};

const getManifestPath = (viteConfig: ResolvedConfig): string => {
  return resolve(
    viteConfig.root,
    viteConfig.build.outDir,
    getManifestName(viteConfig)
  );
};

const getManifestTargetPath = (viteConfig: ResolvedConfig): string => {
  return resolve(viteConfig.root, 'lib/Manifest/Vite.php');
};

export { getManifestPath, getManifestTargetPath };
