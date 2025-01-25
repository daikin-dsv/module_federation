const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const { HtmlRspackPlugin } = require('@rspack/core');
const { merge } = require('webpack-merge');
const { rspack } = require('@rspack/core');

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
                        Layout: `${LAYOUT.NAME}@http://localhost:${LAYOUT.PORT}/remoteEntry.js`,
                        Widget: `${WIDGETS.NAME}@http://localhost:${WIDGETS.PORT}/remoteEntry.js`
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
                        }
                    }
                }),
                new HtmlRspackPlugin({
                    template: './index.html',
                    inject: 'body'
                }),
                new rspack.CssExtractRspackPlugin({})
            ]
        },
        modeConfig(mode)
    );
    return config;
};
