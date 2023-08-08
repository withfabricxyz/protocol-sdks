/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  root: true,
  rules: {

    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    semi: [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'prettier/prettier': ['error', {
      singleQuote: true,
    }],
  },
};
