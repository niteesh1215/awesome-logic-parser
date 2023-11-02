module.exports = {
  extends: 'standard-with-typescript',
  overrides: [
    {
      env: {
        node: true,
        jest: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
