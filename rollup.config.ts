import typescript from '@rollup/plugin-typescript'

export default [
  {
    external: ['axios', 'tslib', 'async-mutex', 'md5', 'randombytes', 'lodash/isEqual', '@xyo-network/sdk-xyo-js'],
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
]
