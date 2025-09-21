import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import astroPlugin from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist', '.astro', '.dist', 'node_modules', 'scripts']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}', '**/*.astro', '**/*.astro/*.ts', '**/*.astro/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  prettier
];
