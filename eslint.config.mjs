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
    eslintConfigPrettier,
    {
        rules: {
            'no-duplicate-imports': 'warn'
        }
    },
    {
        files: ['{regional-app-1,regional-app-2,eva,docs}/**/*.{js,mjs,cjs,jsx}'],
        ...pluginReact.configs.flat.recommended,
        rules: {
            ...pluginReact.configs.flat.recommended.rules,
            'react/prop-types': 'off'
        }
    },
    {
        files: ['{regional-app-1,regional-app-2,eva,docs}/**/*.{js,mjs,cjs,jsx}'],
        ...reactHooks.configs['recommended-latest']
    },
    {
        files: ['{regional-app-1,regional-app-2,eva,docs}/**/*.{js,mjs,cjs,jsx}'],
        ...jsxA11y.flatConfigs.recommended,
        rules: {
            ...jsxA11y.flatConfigs.recommended.rules,
            'jsx-a11y/click-events-have-key-events': 'off'
        }
    },
    {
        files: ['{layout,widgets}/**/*.js'],
        ...wcConfigs['flat/recommended']
    },
    {
        files: ['{layout,widgets}/**/*.js'],
        ...litConfigs['flat/recommended']
    }
];
