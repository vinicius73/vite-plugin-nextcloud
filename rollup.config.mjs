import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-exclude-dependencies-from-bundle';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const plugins = [nodeResolve(), externals(), typescript()];

export default [
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        file: 'dist/index.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
];
