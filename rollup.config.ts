import typescript from '@rollup/plugin-typescript'

export default [
  {
    external: [
      'axios',
      'bowser',
      'tslib',
      'async-mutex',
      'js-cookie',
      'md5',
      'randombytes',
      'lodash/isEqual',
      '@xyo-network/sdk-xyo-js',
    ],
    input: 'src/index.ts',
    output: [
      {
        exports: 'auto',
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.cjs.json' })],
  },
]
