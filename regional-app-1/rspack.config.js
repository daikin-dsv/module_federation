const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const { HtmlRspackPlugin } = require('@rspack/core');
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
                        }
                    }
                }),
                new HtmlRspackPlugin({
                    template: './index.html',
                    inject: 'body'
                })
            ]
        },
        modeConfig(mode)
    );
    return config;
};
