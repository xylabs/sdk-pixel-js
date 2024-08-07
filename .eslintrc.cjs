const finalConfig = {
  "extends": ["@xylabs"],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', project: './tsconfig.json', sourceType: 'module', tsconfigRootDir: null },
  "root": true,
  "ignorePatterns": [
    "dist",
    "dist-esm",
    "node_modules",
    "docs",
    "coverage",
    "docker",
    "nftData",
    "testData.json",
    "*.stories.*",
    "swagger.json",
    ".yarn",
    ".*"
  ],
  "rules": {
    "@typescript-eslint/explicit-member-accessibility": ["warn", { accessibility: "no-public" }],
    "no-restricted-imports": [
      "warn",
      {
        "paths": [
          "@xyo-network/bridge",
          "@xyo-network/core",
          "@xyo-network/module",
          "@xyo-network/modules",
          "@xyo-network/node",
          "@xyo-network/sdk",
          "@xyo-network/plugins",
          "@xyo-network/protocol",
          "@xyo-network/witness",
          "react-player",
          "filepond",
          "aos",
          "react-icons",
          ".",
          "..",
          "../..",
          "../../..",
          "../../../..",
          "../../../../..",
          "../../../../../..",
          "../../../../../../.."
        ]
      }
    ],
    "import/no-internal-modules": [
      "off"
    ]
  }
}

module.exports = finalConfig
