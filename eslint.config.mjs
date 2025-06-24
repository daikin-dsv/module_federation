import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { configs as litConfigs } from 'eslint-plugin-lit';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { configs as wcConfigs } from 'eslint-plugin-wc';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    { ignores: ['**/dist/'] },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    jsxA11y.flatConfigs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            'react/prop-types': 'off',
            'no-duplicate-imports': 'warn',
            'jsx-a11y/click-events-have-key-events': 'off'
        }
    },
    {
        files: ['layout/**/*.js'],
        ...wcConfigs['flat/recommended']
    },
    {
        files: ['layout/**/*.js'],
        ...litConfigs['flat/recommended']
    }
];
