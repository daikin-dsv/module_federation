import { createRequire } from 'module';

import appConfig from '../config.js';
import developmentConfig from './build-utils/rspack.development.js';
import productionConfig from './build-utils/rspack.production.js';

const require = createRequire(import.meta.url);
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const { HtmlRspackPlugin, CssExtractRspackPlugin } = require('@rspack/core');
const { merge } = require('webpack-merge');
const { dependencies } = require('./package.json');

const { LAYOUT } = appConfig;

const envConfigMap = {
    development: developmentConfig,
    production: productionConfig
};

export default ({ mode }) => {
    const envOverrides = (envConfigMap[mode] ?? (() => ({})))(mode);

    return merge(
        {
            mode,
            entry: './src/index.js',
            output: {
                uniqueName: 'layout_provider',
                // publicPath must be configured if using manifest
                publicPath: `http://localhost:${LAYOUT.PORT}/`
            },
            module: {
                rules: [
                    {
                        test: /\.js?$/,
                        use: {
                            loader: 'builtin:swc-loader',
                            options: {
                                jsc: {
                                    parser: {
                                        syntax: 'ecmascript',
                                        jsx: true
                                    }
                                }
                            }
                        },
                        type: 'javascript/auto',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.css$/,
                        resourceQuery: /inline/,
                        use: [
                            {
                                loader: 'css-loader',
                                options: { exportType: 'string' }
                            },
                            'postcss-loader'
                        ]
                    },
                    {
                        test: /\.css$/i,
                        resourceQuery: { not: /inline/ },
                        use: [
                            CssExtractRspackPlugin.loader,
                            'css-loader',
                            'postcss-loader'
                        ],
                        type: 'javascript/auto'
                    },
                    {
                        test: /\.png$/,
                        type: 'asset'
                    }
                ]
            },
            plugins: [
                new ModuleFederationPlugin({
                    name: LAYOUT.NAME,
                    filename: 'remoteEntry.js',
                    exposes: {
                        './auth': './src/context/Auth/index.js',
                        './footer': './src/components/Footer.js',
                        './header': './src/components/Header.js',
                        './navmenu': './src/components/NavMenu.js',
                        './user': './src/components/User.js'
                    },
                    shared: {
                        '@daikin-oss/design-system-web-components': {
                            singleton: true,
                            requiredVersion:
                                dependencies['@daikin-oss/design-system-web-components']
                        },
                        '@daikin-oss/dds-tokens': {
                            singleton: true,
                            requiredVersion: dependencies['@daikin-oss/dds-tokens']
                        }
                    }
                }),
                new HtmlRspackPlugin({
                    template: './index.html',
                    inject: 'body'
                }),
                new CssExtractRspackPlugin({})
            ]
        },
        envOverrides
    );
};
