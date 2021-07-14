import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    external: [
      'axios',
      'bowser',
      'tslib',
      'async-mutex',
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
      },
      {
        exports: 'auto',
        file: 'dist/index.js',
        format: 'es',
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' }), commonjs()],
  },
]
