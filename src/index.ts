import type { Plugin } from 'vite';

export interface PluginConfig {
  baseNamespace: string;
}

const nextcloudPlugin = (config: PluginConfig): Plugin => {
  return {
    name: 'vite:nextcloud',
  };
};

export { nextcloudPlugin as nextcloud };
