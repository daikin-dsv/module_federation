const ReactRefreshWebpackPlugin = require('@rspack/plugin-react-refresh');

const { WIDGETS } = require('../../config');

module.exports = () => ({
    devServer: {
        port: WIDGETS.PORT
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
    plugins: [new ReactRefreshWebpackPlugin()]
});
