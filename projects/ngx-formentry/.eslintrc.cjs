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
      rules: {
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
        '@angular-eslint/prefer-standalone': 'off'
      }
    },
    {
      files: ['*.html'],
      rules: {}
    }
  ]
};
