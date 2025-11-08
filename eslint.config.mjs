import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';

// Flat config (ESLint v9)
export default [
  // Ignore build artifacts
  { ignores: ['dist/**', 'node_modules/**', 'src/modules/algorithm/seed/**', '**/*.spec.ts'] },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (non type-checked for broader compatibility)
  ...tsPlugin.configs['flat/recommended'],

  // Project-specific TS settings and overrides
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    // No parserOptions.project to avoid type-aware lint requiring TS project inclusion
    languageOptions: {},
    rules: {
      // Local adjustments
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
