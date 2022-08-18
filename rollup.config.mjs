import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-exclude-dependencies-from-bundle';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      externals(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: { target: 'es5' },
      }),
    ],
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [externals(), typescript()],
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
];
