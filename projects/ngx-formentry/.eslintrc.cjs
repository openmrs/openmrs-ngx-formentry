module.exports = {
  extends: '../../.eslintrc.json',
  ignorePatterns: ['!**/*', '**/*.spec.ts', '**/date-time-picker-input.directive.ts'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.lib.json', './tsconfig.spec.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { args: 'none', caughtErrors: 'none' }
        ],
        '@angular-eslint/directive-selector': [
          'warn',
          {
            type: 'attribute',
            prefix: 'ofe',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'warn',
          {
            type: 'element',
            prefix: 'ofe',
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/prefer-standalone': 'off',
        '@angular-eslint/prefer-inject': 'off',
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'lodash',
                message: 'Use lodash-es so bundlers can tree-shake it.'
              }
            ]
          }
        ],
        'no-restricted-syntax': [
          'error',
          {
            // no-restricted-imports with importNames: ['default'] would also flag `import * as _`.
            selector:
              "ImportDeclaration[source.value='lodash-es'] > ImportDefaultSpecifier",
            message:
              "The lodash-es default export is all of lodash. Use `import * as _ from 'lodash-es'`."
          }
        ]
      }
    },
    {
      files: ['*.html'],
      rules: {}
    }
  ]
};
