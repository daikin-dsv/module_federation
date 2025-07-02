const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const { HtmlRspackPlugin, rspack, DefinePlugin } = require('@rspack/core');
const { merge } = require('webpack-merge');

const modeConfig = (env) => require(`./build-utils/rspack.${env}`)(env);
const dependencies = require('./package.json').dependencies;
const { REGIONAL_APP_1, LAYOUT, WIDGETS } = require('../config');

module.exports = ({ mode }) => {
    const config = merge(
        {
            mode,
            entry: './src/index.js',
            output: {
                uniqueName: 'regional_app_1',
                // publicPath must be configured if using manifest
                publicPath: `http://localhost:${REGIONAL_APP_1.PORT}/`
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
                        test: /\.css$/i,
                        use: [
                            rspack.CssExtractRspackPlugin.loader, // Injects styles into DOM
                            'css-loader', // Resolves @import and url()
                            'postcss-loader'
                        ],
                        type: 'javascript/auto'
                    }
                ]
            },
            plugins: [
                new ModuleFederationPlugin({
                    name: REGIONAL_APP_1.NAME,
                    remotes: {
                        Layout: `${LAYOUT.NAME}@${mode === 'production' ? process.env.LAYOUT_URL : `http://localhost:${LAYOUT.PORT}`}/remoteEntry.js`,
                        Widget: `${WIDGETS.NAME}@${mode === 'production' ? process.env.WIDGETS_URL : `http://localhost:${WIDGETS.PORT}`}/remoteEntry.js`,
                    },
                    shared: {
                        react: {
                            singleton: true,
                            requiredVersion: dependencies.react
                        },
                        'react-dom': {
                            singleton: true,
                            requiredVersion: dependencies['react-dom']
                        },
                        'react-router': {
                            singleton: true,
                            requiredVersion: dependencies['react-router']
                        },
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
                new rspack.CssExtractRspackPlugin({}),
                new DefinePlugin({
                    'process.env.APP_PATH': JSON.stringify(process.env.APP_PATH || '')
                })
            ]
        },
        modeConfig(mode)
    );
    return config;
};
