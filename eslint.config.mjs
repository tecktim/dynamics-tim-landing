import js from '@eslint/js';

export default [
  {
    ignores: ['dist', '.astro', 'node_modules', 'scripts']
  },
  js.configs.recommended
];