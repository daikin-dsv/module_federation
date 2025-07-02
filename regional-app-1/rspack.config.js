const { HtmlRspackPlugin, rspack, DefinePlugin } = require('@rspack/core');
const { merge } = require('webpack-merge');

const modeConfig = (env) => require(`./build-utils/rspack.${env}`)(env);
const { REGIONAL_APP_1 } = require('../config');

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
