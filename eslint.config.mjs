import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// Flat config (ESLint v9)
export default [
  // Ignore build artifacts
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/modules/algorithm/seed/**',
      'coverage/**',
      '.husky/**'
    ]
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tsPlugin.configs['flat/recommended'],

  // Project-specific TS settings and overrides
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
      globals: {
        node: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',

      // Console rules - use proper logger instead
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // Prettier integration
      'prettier/prettier': 'error',
    },
  },

  // Prettier config (disables conflicting rules)
  prettierConfig,
];
