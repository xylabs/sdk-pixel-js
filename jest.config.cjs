const generateJestConfig = ({ esModules }) => {
  const esModulesList = Array.isArray(esModules) ? esModules.join('|') : esModules
  return {
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testRegex: String.raw`(/__tests__/.*|(\.|/)(test|spec))\.tsx?$`,
    transform: {
      [`(${esModulesList}).+\\.js$`]: 'babel-jest',
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.test.json',
          useESM: true,
        },
      ],
    },
    transformIgnorePatterns: [`./node_modules/(?!${esModulesList})`],
  }
}

// eslint-disable-next-line no-undef
module.exports = generateJestConfig({ esModules: ['is-ip', 'ip-regex'] })
