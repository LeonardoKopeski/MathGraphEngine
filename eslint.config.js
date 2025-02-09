import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    languageOptions: {
	  globals: {
	    ...globals.browser,
	    ...globals.node
	  }
	}
  },
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    rules: {
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/block-spacing': ['error', 'always'],
      '@stylistic/ts/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      '@stylistic/ts/comma-dangle': ['error', 'never'],
      '@stylistic/ts/comma-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/type-annotation-spacing': ['error', { "before": false, "after": true }],
      '@stylistic/ts/keyword-spacing': ['error', { 'before': true, 'after': true }]
    }
  }
);
