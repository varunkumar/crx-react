import { FlatCompat } from '@eslint/eslintrc'; // eslint-disable-line

const compat = new FlatCompat({
  recommendedConfig: { settings: { 'eslint:recommended': true } },
});

export default [
  {
    ignores: ['build/*', 'node_modules/*'],
  },
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb',
      'prettier',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'import/extensions': ['off', 'ignorePackages'],
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx'],
        },
      ],
      'operator-linebreak': ['error', 'after'],
    },
  }),
];
