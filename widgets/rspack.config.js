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
                // publicPath: `${process.env.WIDGETS_URL || `http://localhost:${WIDGETS.PORT}`}/`
                publicPath: 'https://turbo-doodle-2nm87nq.pages.github.io/widgets/'
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
                                        syntax: 'ecmascript'
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
                    filename: 'widgetsRemoteEntry.js',
                    exposes: {
                        './Alarm': './src/components/Alarm.js',
                        './DatabricksDashboard':
                            './src/components/DatabricksDashboard.js',
                        './EnergyGauge': './src/components/EnergyGauge.js',
                        './InfoCard': './src/components/InfoCard.js',
                        './Light': './src/components/Light.js'
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
                new rspack.CssExtractRspackPlugin({})
            ]
        },
        modeConfig(mode)
    );
    return config;
};
