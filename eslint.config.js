import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', 'certs/**', 'data/**', 'content/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  { files: ['**/*.{js,mjs}'], languageOptions: { globals: globals.node } },
  { files: ['apps/server/**', 'tools/**'], languageOptions: { globals: globals.node } },
  {
    files: ['apps/tv/**', 'apps/phone/**', 'packages/ui-*/**'],
    languageOptions: { globals: globals.browser },
  },
);
