const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const { HtmlRspackPlugin, rspack } = require('@rspack/core');
const { merge } = require('webpack-merge');

const modeConfig = (env) => require(`./build-utils/rspack.${env}`)(env);
const dependencies = require('./package.json').dependencies;
const { WIDGETS } = require('../config');

module.exports = ({ mode }) => {
    const config = merge(
        {
            mode,
            entry: './src/index.js',
            output: {
                uniqueName: 'widget_provider',
                // publicPath must be configured if using manifest
                publicPath: `http://localhost:${WIDGETS.PORT}/`
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
                    name: WIDGETS.NAME,
                    filename: 'remoteEntry.js',
                    exposes: {
                        './Alarm': './src/components/Alarm.js',
                        './EnergyGauge': './src/components/EnergyGauge.js',
                        './InfoCard': './src/components/InfoCard.js'
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
                new rspack.CssExtractRspackPlugin({})
            ]
        },
        modeConfig(mode)
    );
    return config;
};
