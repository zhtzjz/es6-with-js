module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  globals: {
    window: true,
    $: true
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', require.resolve('eslint-config-prettier')],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // SEE https://eslint.org/docs/rules/no-unused-vars
    // SEE https://eslint.org/docs/rules/no-empty
    'no-empty': ['error', { allowEmptyCatch: true }],
    'getter-return': 'error',
    'no-await-in-loop': 'error',
    'no-template-curly-in-string': 'warn',
    'array-callback-return': 'warn',
    'class-methods-use-this': 'warn',
    'default-case': 'warn',
    'dot-notation': 'error',
    'guard-for-in': 'warn',
    'no-alert': 'warn',
    'no-else-return': 'warn',
    'no-empty-function': 'warn',
    'no-implicit-coercion': 'warn',
    'no-implicit-globals': 'warn',
    'no-loop-func': 'warn',
    'no-param-reassign': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-return': 'error',
    'array-bracket-newline': [
      'error',
      {
        multiline: true
      }
    ],
    'max-depth': ['error', 5],
    'max-len': 'warn',
    'max-lines': ['error', 1000],
    'max-params': ['error', 3],
    'max-statements': ['error', 100],
    'multiline-ternary': ['warn', 'always-multiline'],
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'nonblock-statement-body-position': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-rest-params': 'error',
    'prefer-template': 'warn',
    'no-shadow': 0,
    'no-process-exit': 0,
    'no-magic-numbers': 0
  },
  parser: 'babel-eslint'
}
