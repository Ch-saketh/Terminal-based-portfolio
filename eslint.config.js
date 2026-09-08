import js from '@eslint/js';
import tsPlugin from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default tsPlugin.config(
  {
    ignores: ['dist', 'node_modules', '*.config.js', '*.config.ts', 'tests/**/*']
  },
  js.configs.recommended,
  ...tsPlugin.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
    }
  },
  prettierConfig
);
