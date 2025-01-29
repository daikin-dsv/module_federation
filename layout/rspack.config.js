const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const { HtmlRspackPlugin, CssExtractRspackPlugin } = require('@rspack/core');
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
                    },
                    {
                        test: /\.css$/i,
                        use: [CssExtractRspackPlugin.loader, 'css-loader', 'postcss-loader'],
                        type: 'javascript/auto',
                    },
                    {
                        test: /\.png$/,
                        type: 'asset',
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
                new CssExtractRspackPlugin({})
            ],
        },
        modeConfig(mode)
    );
    return config;
};
