const ReactRefreshWebpackPlugin = require('@rspack/plugin-react-refresh');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

const { REGIONAL_APP_2, LAYOUT, WIDGETS } = require('../../config');
const shared = require('./moduleFederationShared');

module.exports = () => ({
    devServer: {
        historyApiFallback: true, // Redirects all requests to index.html
        port: REGIONAL_APP_2.PORT
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
                            },
                            transform: {
                                react: {
                                    development: true,
                                    refresh: true
                                }
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
        new ReactRefreshWebpackPlugin(),
        new ModuleFederationPlugin({
            name: REGIONAL_APP_1.NAME,
            remotes: {
                Layout: `${LAYOUT.NAME}@${process.env.LAYOUT_URL}/remoteEntry.js`,
                Widget: `${WIDGETS.NAME}@${process.env.WIDGETS_URL}/remoteEntry.js`
            },
            shared
        })
    ]
});
