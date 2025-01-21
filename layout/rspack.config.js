const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const { HtmlRspackPlugin } = require('@rspack/core');
const { merge } = require('webpack-merge');

const modeConfig = (env) => require(`./build-utils/rspack.${env}`)(env);
const dependencies = require('./package.json').dependencies;
const { LAYOUT } = require('../config');

module.exports = ({ mode }) => {
    const config = merge(
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
                    }
                ]
            },
            plugins: [
                new ModuleFederationPlugin({
                    name: LAYOUT.NAME,
                    filename: 'remoteEntry.js',
                    exposes: {
                        './header': './src/components/Header.js',
                        './footer': './src/components/Footer.js',
                        './auth': './src/context/Auth/index.js'
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
