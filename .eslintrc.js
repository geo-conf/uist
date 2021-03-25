module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'comma-dangle': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/no-mutable-exports': 0,
    'object-curly-newline': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
